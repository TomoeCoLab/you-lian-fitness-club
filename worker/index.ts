import { beginLogin, completeLogin, getSession, logout } from "./auth";
import { appLoginTestPage } from "./app-login-test";
import { deleteCheckin, getPhoto, listMonth, listUserHistory, parseCheckinInput, parseReaction, saveCheckin, setReaction } from "./checkins";
import { sendCheckinWebhook } from "./discord";
import { assertSameOrigin, json } from "./http";
import { reservePhotoRead, reservePhotoUpload } from "./r2-quota";
import { createTemplate, deleteTemplate, listTemplates, parseTemplateInput } from "./templates";
import { createCustomExercise, listCustomExercises, parseCustomExercise } from "./custom-exercises";

async function handleApi(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  const url = new URL(request.url);
  if (request.method === "GET" && url.pathname === "/api/auth/app-test") return appLoginTestPage();
  if (request.method === "POST" && url.pathname === "/api/auth/app-test/prepare") return beginLogin(request, env, true);

  if (request.method === "GET" && url.pathname === "/api/config") {
    return json({
      configured: Boolean(env.DISCORD_CLIENT_ID && env.DISCORD_CLIENT_SECRET && env.SESSION_SECRET),
      demo: env.LOCAL_DEMO === "true",
      guildId: env.DISCORD_GUILD_ID,
      channelId: env.DISCORD_CHANNEL_ID,
    });
  }
  if (request.method === "GET" && url.pathname === "/api/auth/login") return beginLogin(request, env);
  if (request.method === "GET" && url.pathname === "/api/auth/callback") return completeLogin(request, env);

  if (request.method === "POST" && url.pathname === "/api/auth/logout") {
    if (!assertSameOrigin(request)) return json({ error: "Invalid origin" }, 403);
    return logout(request);
  }

  const user = await getSession(request, env);
  if (!user) return json({ error: "Unauthorized" }, 401);

  if (request.method === "GET" && url.pathname === "/api/me") return json({ user });

  if (request.method === "GET" && url.pathname.startsWith("/api/photos/")) {
    const checkinId = decodeURIComponent(url.pathname.slice("/api/photos/".length));
    if (!(await reservePhotoRead(env))) return json({ error: "本月照片讀取額度已達安全上限" }, 429);
    const object = await getPhoto(env, checkinId);
    if (!object) return json({ error: "Photo not found" }, 404);
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("ETag", object.httpEtag);
    headers.set("Cache-Control", "private, max-age=3600");
    return new Response(object.body, { headers });
  }

  if (request.method === "GET" && url.pathname === "/api/calendar") {
    const month = url.searchParams.get("month") ?? "";
    const checkins = await listMonth(env, month, user.id);
    return checkins ? json({ checkins }) : json({ error: "Invalid month" }, 400);
  }

  if (request.method === "GET" && url.pathname === "/api/progress") {
    return json({ checkins: await listUserHistory(env, user.id) });
  }

  if (request.method === "GET" && url.pathname === "/api/templates") {
    return json({ templates: await listTemplates(env, user.id) });
  }

  if (request.method === "GET" && url.pathname === "/api/custom-exercises") {
    return json({ exercises: await listCustomExercises(env, user.id) });
  }

  if (request.method === "POST" && url.pathname === "/api/custom-exercises") {
    if (!assertSameOrigin(request)) return json({ error: "Invalid origin" }, 403);
    const input = parseCustomExercise(await request.json().catch(() => null));
    if (!input) return json({ error: "Invalid custom exercise" }, 400);
    return json({ exercise: await createCustomExercise(env, user.id, input) }, 201);
  }

  if (request.method === "POST" && url.pathname === "/api/templates") {
    if (!assertSameOrigin(request)) return json({ error: "Invalid origin" }, 403);
    const body = await request.json().catch(() => null);
    const input = parseTemplateInput(body);
    if (!input) return json({ error: "Invalid workout template" }, 400);
    return json({ template: await createTemplate(env, user.id, input) }, 201);
  }

  const reactionMatch = url.pathname.match(/^\/api\/checkins\/([^/]+)\/reaction$/u);
  if (request.method === "PUT" && reactionMatch) {
    if (!assertSameOrigin(request)) return json({ error: "Invalid origin" }, 403);
    const body: unknown = await request.json().catch(() => null);
    const reaction = parseReaction(body && typeof body === "object" ? (body as Record<string, unknown>).reaction : undefined);
    if (reaction === undefined) return json({ error: "Invalid reaction" }, 400);
    const reactions = await setReaction(env, user.id, decodeURIComponent(reactionMatch[1]), reaction);
    return reactions ? json({ reactions }) : json({ error: "Check-in not found" }, 404);
  }

  if (request.method === "DELETE" && url.pathname.startsWith("/api/templates/")) {
    if (!assertSameOrigin(request)) return json({ error: "Invalid origin" }, 403);
    const templateId = decodeURIComponent(url.pathname.slice("/api/templates/".length));
    const deleted = await deleteTemplate(env, user.id, templateId);
    return deleted ? new Response(null, { status: 204 }) : json({ error: "Workout template not found" }, 404);
  }

  if (request.method === "POST" && url.pathname === "/api/checkins") {
    if (!assertSameOrigin(request)) return json({ error: "Invalid origin" }, 403);
    const contentLength = Number(request.headers.get("Content-Length") ?? "0");
    if (contentLength > 6_000_000) return json({ error: "Request too large" }, 413);
    const contentType = request.headers.get("Content-Type") ?? "";
    let body: unknown = null;
    let photoFile: File | null = null;
    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      const payload = form.get("payload");
      const photo = form.get("photo");
      if (typeof payload === "string") {
        try {
          body = JSON.parse(payload);
        } catch {
          return json({ error: "Invalid check-in payload" }, 400);
        }
      }
      if (photo instanceof File && photo.size > 0) photoFile = photo;
    } else {
      body = await request.json().catch(() => null);
    }
    const input = parseCheckinInput(body);
    if (!input) return json({ error: "Invalid check-in" }, 400);

    let storedPhoto: { key: string; contentType: string; size: number } | null = null;
    if (photoFile) {
      const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
      if (!allowedTypes.has(photoFile.type) || photoFile.size > 5_000_000) {
        return json({ error: "Photo must be JPEG, PNG, or WebP and at most 5 MB" }, 400);
      }
      const quota = await reservePhotoUpload(env, photoFile.size);
      if (quota === "storage-limit") return json({ error: "照片儲存量已達免費額度安全上限" }, 507);
      if (quota === "operation-limit") return json({ error: "本月照片上傳額度已達安全上限" }, 429);
      const extension = photoFile.type === "image/png" ? "png" : photoFile.type === "image/webp" ? "webp" : "jpg";
      const key = `${user.id}/${input.date}/${crypto.randomUUID()}.${extension}`;
      await env.PHOTOS.put(key, photoFile.stream(), { httpMetadata: { contentType: photoFile.type } });
      storedPhoto = { key, contentType: photoFile.type, size: photoFile.size };
    }

    let result: Awaited<ReturnType<typeof saveCheckin>>;
    try {
      result = await saveCheckin(env, user, input, storedPhoto);
    } catch (error) {
      if (storedPhoto) await env.PHOTOS.delete(storedPhoto.key).catch(() => undefined);
      throw error;
    }
    if (env.DISCORD_WEBHOOK_URL) {
      ctx.waitUntil(
        sendCheckinWebhook(env, result.record).catch((error: unknown) => {
          console.error(JSON.stringify({
            message: "discord_webhook_failed",
            checkinId: result.record.id,
            error: error instanceof Error ? error.message : String(error),
          }));
        }),
      );
    }
    return json({ ...result, notificationQueued: Boolean(env.DISCORD_WEBHOOK_URL) }, 201);
  }

  if (request.method === "DELETE" && url.pathname.startsWith("/api/checkins/")) {
    if (!assertSameOrigin(request)) return json({ error: "Invalid origin" }, 403);
    const checkinId = decodeURIComponent(url.pathname.slice("/api/checkins/".length));
    const deleted = await deleteCheckin(env, user.id, checkinId);
    return deleted ? new Response(null, { status: 204 }) : json({ error: "Check-in not found" }, 404);
  }

  return json({ error: "Not found" }, 404);
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (!url.pathname.startsWith("/api/")) return env.ASSETS.fetch(request);
    try {
      return await handleApi(request, env, ctx);
    } catch (error) {
      console.error(JSON.stringify({
        message: "request_failed",
        method: request.method,
        path: url.pathname,
        error: error instanceof Error ? error.message : String(error),
      }));
      return json({ error: "Internal server error" }, 500);
    }
  },
} satisfies ExportedHandler<Env>;
