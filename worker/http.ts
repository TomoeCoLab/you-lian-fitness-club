const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

export function json(data: unknown, status = 200, headers?: HeadersInit): Response {
  return Response.json(data, {
    status,
    headers: { ...JSON_HEADERS, ...headers },
  });
}

export function redirect(location: string, headers?: HeadersInit): Response {
  return new Response(null, {
    status: 302,
    headers: { Location: location, ...headers },
  });
}

export function assertSameOrigin(request: Request): boolean {
  const origin = request.headers.get("Origin");
  return origin === null || origin === new URL(request.url).origin;
}

export function parseCookies(request: Request): Map<string, string> {
  const cookies = new Map<string, string>();
  const header = request.headers.get("Cookie");
  if (!header) return cookies;

  for (const item of header.split(";")) {
    const separator = item.indexOf("=");
    if (separator === -1) continue;
    const key = item.slice(0, separator).trim();
    const value = item.slice(separator + 1).trim();
    if (key) cookies.set(key, value);
  }
  return cookies;
}

export function cookie(
  name: string,
  value: string,
  requestUrl: string,
  options: { maxAge: number; path?: string },
): string {
  const secure = new URL(requestUrl).protocol === "https:" ? "; Secure" : "";
  return `${name}=${value}; Path=${options.path ?? "/"}; HttpOnly; SameSite=Lax; Max-Age=${options.maxAge}${secure}`;
}
