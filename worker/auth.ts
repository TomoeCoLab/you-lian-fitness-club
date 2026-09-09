import { cookie, parseCookies, redirect } from "./http";
import type { SessionUser } from "./types";

const SESSION_COOKIE = "rep_session";
const OAUTH_STATE_COOKIE = "rep_oauth_state";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const textEncoder = new TextEncoder();

type SessionPayload = SessionUser & { exp: number };
type OAuthState = { nonce: string; exp: number };

type DiscordUser = {
  id: string;
  username: string;
  globalName: string | null;
  avatar: string | null;
};

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/u, "");
}

function base64UrlToBytes(value: string): Uint8Array | null {
  try {
    const padded = value.replaceAll("-", "+").replaceAll("_", "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
    const binary = atob(padded);
    return Uint8Array.from(binary, (character) => character.charCodeAt(0));
  } catch {
    return null;
  }
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function signObject(value: object, secret: string): Promise<string> {
  const payload = bytesToBase64Url(textEncoder.encode(JSON.stringify(value)));
  const signature = await crypto.subtle.sign("HMAC", await hmacKey(secret), textEncoder.encode(payload));
  return `${payload}.${bytesToBase64Url(new Uint8Array(signature))}`;
}

async function verifyObject(token: string, secret: string): Promise<unknown | null> {
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra) return null;
  const signatureBytes = base64UrlToBytes(signature);
  const payloadBytes = base64UrlToBytes(payload);
  if (!signatureBytes || !payloadBytes) return null;
  const signatureBuffer = new Uint8Array(signatureBytes).buffer;

  const valid = await crypto.subtle.verify(
    "HMAC",
    await hmacKey(secret),
    signatureBuffer,
    textEncoder.encode(payload),
  );
  if (!valid) return null;

  try {
    return JSON.parse(new TextDecoder().decode(payloadBytes));
  } catch {
    return null;
  }
}

function isSessionPayload(value: unknown): value is SessionPayload {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "string" &&
    typeof item.username === "string" &&
    typeof item.displayName === "string" &&
    (typeof item.avatarUrl === "string" || item.avatarUrl === null) &&
    typeof item.demo === "boolean" &&
    typeof item.exp === "number"
  );
}

function isOAuthState(value: unknown): value is OAuthState {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return typeof item.nonce === "string" && typeof item.exp === "number";
}

function parseDiscordUser(value: unknown): DiscordUser | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  if (typeof item.id !== "string" || typeof item.username !== "string") return null;
  return {
    id: item.id,
    username: item.username,
    globalName: typeof item.global_name === "string" ? item.global_name : null,
    avatar: typeof item.avatar === "string" ? item.avatar : null,
  };
}

function hasGuild(value: unknown, guildId: string): boolean {
  return (
    Array.isArray(value) &&
    value.some((item) => {
      if (!item || typeof item !== "object") return false;
      return (item as Record<string, unknown>).id === guildId;
    })
  );
}

function avatarUrl(user: DiscordUser): string | null {
  return user.avatar
    ? `https://cdn.discordapp.com/avatars/${encodeURIComponent(user.id)}/${encodeURIComponent(user.avatar)}.png?size=128`
    : null;
}

export async function getSession(request: Request, env: Env): Promise<SessionUser | null> {
  const token = parseCookies(request).get(SESSION_COOKIE);
  if (!token || !env.SESSION_SECRET) return null;
  const payload = await verifyObject(token, env.SESSION_SECRET);
  if (!isSessionPayload(payload) || payload.exp <= Math.floor(Date.now() / 1000)) return null;
  const { exp: _exp, ...user } = payload;
  return user;
}

async function createSessionCookie(request: Request, env: Env, user: SessionUser): Promise<string> {
  const token = await signObject(
    { ...user, exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS },
    env.SESSION_SECRET,
  );
  return cookie(SESSION_COOKIE, token, request.url, { maxAge: SESSION_MAX_AGE_SECONDS });
}

async function upsertUser(env: Env, user: DiscordUser): Promise<void> {
  await env.DB.prepare(
    `INSERT INTO users (discord_id, username, global_name, avatar_hash, guild_verified_at)
     VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
     ON CONFLICT(discord_id) DO UPDATE SET
       username = excluded.username,
       global_name = excluded.global_name,
       avatar_hash = excluded.avatar_hash,
       guild_verified_at = CURRENT_TIMESTAMP,
       updated_at = CURRENT_TIMESTAMP`,
  )
    .bind(user.id, user.username, user.globalName, user.avatar)
    .run();
}

export async function beginLogin(request: Request, env: Env): Promise<Response> {
  if (env.LOCAL_DEMO === "true") {
    await seedDemoData(env);
    const demoUser: SessionUser = {
      id: "demo-tomoe",
      username: "tomoe",
      displayName: "tomoe",
      avatarUrl: null,
      demo: true,
    };
    return redirect("/", { "Set-Cookie": await createSessionCookie(request, env, demoUser) });
  }

  if (!env.DISCORD_CLIENT_ID || !env.DISCORD_CLIENT_SECRET || !env.SESSION_SECRET) {
    return redirect("/?auth_error=discord_not_configured");
  }

  const nonceBytes = new Uint8Array(24);
  crypto.getRandomValues(nonceBytes);
  const nonce = bytesToBase64Url(nonceBytes);
  const state = await signObject({ nonce, exp: Math.floor(Date.now() / 1000) + 600 }, env.SESSION_SECRET);
  const callbackUrl = `${new URL(request.url).origin}/api/auth/callback`;
  const authorize = new URL("https://discord.com/oauth2/authorize");
  authorize.search = new URLSearchParams({
    client_id: env.DISCORD_CLIENT_ID,
    response_type: "code",
    redirect_uri: callbackUrl,
    scope: "identify guilds",
    state,
    prompt: "consent",
  }).toString();

  return redirect(authorize.toString(), {
    "Set-Cookie": cookie(OAUTH_STATE_COOKIE, nonce, request.url, {
      maxAge: 600,
      path: "/api/auth/callback",
    }),
  });
}

export async function completeLogin(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const stateToken = url.searchParams.get("state");
  const stateCookie = parseCookies(request).get(OAUTH_STATE_COOKIE);
  if (!code || !stateToken || !stateCookie || !env.SESSION_SECRET) {
    return redirect("/?auth_error=invalid_oauth_state");
  }

  const state = await verifyObject(stateToken, env.SESSION_SECRET);
  if (!isOAuthState(state) || state.exp <= Math.floor(Date.now() / 1000) || state.nonce !== stateCookie) {
    return redirect("/?auth_error=invalid_oauth_state");
  }

  const callbackUrl = `${url.origin}/api/auth/callback`;
  const tokenResponse = await fetch("https://discord.com/api/v10/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: env.DISCORD_CLIENT_ID,
      client_secret: env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: callbackUrl,
    }),
  });

  if (!tokenResponse.ok) return redirect("/?auth_error=token_exchange_failed");
  const tokenData: unknown = await tokenResponse.json();
  if (!tokenData || typeof tokenData !== "object") return redirect("/?auth_error=token_exchange_failed");
  const accessToken = (tokenData as Record<string, unknown>).access_token;
  if (typeof accessToken !== "string") return redirect("/?auth_error=token_exchange_failed");

  const authHeaders = { Authorization: `Bearer ${accessToken}` };
  const [userResponse, guildsResponse] = await Promise.all([
    fetch("https://discord.com/api/v10/users/@me", { headers: authHeaders }),
    fetch("https://discord.com/api/v10/users/@me/guilds", { headers: authHeaders }),
  ]);
  if (!userResponse.ok || !guildsResponse.ok) return redirect("/?auth_error=discord_profile_failed");

  const [userData, guildsData]: [unknown, unknown] = await Promise.all([
    userResponse.json(),
    guildsResponse.json(),
  ]);
  const discordUser = parseDiscordUser(userData);
  if (!discordUser) return redirect("/?auth_error=discord_profile_failed");
  if (!hasGuild(guildsData, env.DISCORD_GUILD_ID)) return redirect("/?auth_error=not_in_rep_club");

  await upsertUser(env, discordUser);
  const sessionUser: SessionUser = {
    id: discordUser.id,
    username: discordUser.username,
    displayName: discordUser.globalName ?? discordUser.username,
    avatarUrl: avatarUrl(discordUser),
    demo: false,
  };
  const headers = new Headers({ Location: "/" });
  headers.append("Set-Cookie", await createSessionCookie(request, env, sessionUser));
  headers.append(
    "Set-Cookie",
    cookie(OAUTH_STATE_COOKIE, "", request.url, { maxAge: 0, path: "/api/auth/callback" }),
  );
  return new Response(null, { status: 302, headers });
}

export function logout(request: Request): Response {
  return new Response(null, {
    status: 204,
    headers: { "Set-Cookie": cookie(SESSION_COOKIE, "", request.url, { maxAge: 0 }) },
  });
}

async function seedDemoData(env: Env): Promise<void> {
  const users = [
    ["demo-tomoe", "tomoe", "tomoe"],
    ["demo-mika", "mika", "Mika"],
    ["demo-ari", "ari", "Ari"],
    ["demo-yuna", "yuna", "Yuna"],
  ];
  const statements = users.map(([id, username, globalName]) =>
    env.DB.prepare(
      `INSERT INTO users (discord_id, username, global_name, avatar_hash, guild_verified_at)
       VALUES (?, ?, ?, NULL, CURRENT_TIMESTAMP)
       ON CONFLICT(discord_id) DO UPDATE SET guild_verified_at = CURRENT_TIMESTAMP`,
    ).bind(id, username, globalName),
  );
  await env.DB.batch(statements);

  const demoCheckins = [
    ["demo-mika-0904", "demo-mika", "2026-09-04", "standard", "重訓", 65, "今天狀態很好", "[]"],
    ["demo-ari-0904", "demo-ari", "2026-09-04", "quick", null, null, null, "[]"],
    ["demo-yuna-0904", "demo-yuna", "2026-09-04", "detailed", "下肢訓練", 65, null, '[{"name":"深蹲","sets":5,"weight":60,"reps":5}]'],
    ["demo-mika-0908", "demo-mika", "2026-09-08", "standard", "跑步", 35, null, "[]"],
    ["demo-ari-0911", "demo-ari", "2026-09-11", "quick", null, null, null, "[]"],
    ["demo-yuna-0915", "demo-yuna", "2026-09-15", "standard", "上肢訓練", 55, null, "[]"],
    ["demo-mika-0921", "demo-mika", "2026-09-21", "detailed", "下肢訓練", 60, null, "[]"],
    ["demo-ari-0924", "demo-ari", "2026-09-24", "standard", "核心訓練", 40, null, "[]"],
  ];
  await env.DB.batch(
    demoCheckins.map((row) =>
      env.DB.prepare(
        `INSERT OR IGNORE INTO checkins
         (id, user_id, checkin_date, mode, workout_type, duration_minutes, note, exercises_json)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      ).bind(...row),
    ),
  );
}
