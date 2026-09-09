import type { AppConfig, Checkin, CheckinDraft, ReactionKind, ReactionSummary, User, WorkoutTemplate, WorkoutTemplateItem } from "../types";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) {
    const body: unknown = await response.json().catch(() => null);
    const message =
      body && typeof body === "object" && typeof (body as Record<string, unknown>).error === "string"
        ? String((body as Record<string, unknown>).error)
        : `Request failed (${response.status})`;
    throw new ApiError(response.status, message);
  }
  return response.json() as Promise<T>;
}

export const api = {
  config: () => requestJson<AppConfig>("/api/config"),
  me: () => requestJson<{ user: User }>("/api/me"),
  calendar: (month: string) =>
    requestJson<{ checkins: Checkin[] }>(`/api/calendar?month=${encodeURIComponent(month)}`),
  progress: () => requestJson<{ checkins: Checkin[] }>("/api/progress"),
  templates: () => requestJson<{ templates: WorkoutTemplate[] }>("/api/templates"),
  createTemplate: (name: string, items: WorkoutTemplateItem[]) =>
    requestJson<{ template: WorkoutTemplate }>("/api/templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, items }),
    }),
  deleteTemplate: (id: string) => fetch(`/api/templates/${encodeURIComponent(id)}`, { method: "DELETE" }),
  react: (checkinId: string, reaction: ReactionKind | null) =>
    requestJson<{ reactions: ReactionSummary }>(`/api/checkins/${encodeURIComponent(checkinId)}/reaction`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reaction }),
    }),
  saveCheckin: (draft: CheckinDraft, photo: File | null) => {
    if (!photo) {
      return requestJson<{ record: Checkin; created: boolean; notificationQueued: boolean }>("/api/checkins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
    }
    const form = new FormData();
    form.set("payload", JSON.stringify(draft));
    form.set("photo", photo);
    return requestJson<{ record: Checkin; created: boolean; notificationQueued: boolean }>("/api/checkins", {
      method: "POST",
      body: form,
    });
  },
  logout: () => fetch("/api/auth/logout", { method: "POST" }),
};
