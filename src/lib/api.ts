import type { AppConfig, Checkin, CheckinDraft, CustomExercise, ProgressOverview, ReactionKind, ReactionSummary, User, WorkoutTemplate, WorkoutTemplateItem } from "../types";

export class ApiError extends Error {
  public readonly status: number;
  constructor(
    status: number,
    message: string,
  ) {
    super(message);
    this.status = status;
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

type SaveResult = { record: Checkin; created: boolean; notificationQueued: boolean };
async function saveWithRecovery(draft: CheckinDraft, init: RequestInit): Promise<SaveResult> {
  const lookup = () => requestJson<Omit<SaveResult, "record"> & { record: Checkin | null }>(`/api/submissions/${encodeURIComponent(draft.submissionId!)}`);
  if (draft.submissionId) {
    const prior = await lookup();
    if (prior.record) return { ...prior, record: prior.record };
  }
  try { return await requestJson<SaveResult>("/api/checkins", init); }
  catch (error) {
    if (draft.submissionId && error instanceof ApiError && error.status === 409) {
      const prior = await lookup();
      if (prior.record) return { ...prior, record: prior.record };
    }
    throw error;
  }
}

export const api = {
  config: () => requestJson<AppConfig>("/api/config"),
  me: () => requestJson<{ user: User }>("/api/me"),
  calendar: (month: string) =>
    requestJson<{ checkins: Checkin[] }>(`/api/calendar?month=${encodeURIComponent(month)}`),
  progress: () => requestJson<{ checkins: Checkin[]; overview: ProgressOverview }>("/api/progress"),
  templates: () => requestJson<{ templates: WorkoutTemplate[] }>("/api/templates"),
  customExercises: () => requestJson<{ exercises: CustomExercise[] }>("/api/custom-exercises"),
  createCustomExercise: (input: Omit<CustomExercise, "id" | "createdAt">) => requestJson<{ exercise: CustomExercise }>("/api/custom-exercises", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input) }),
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
      return saveWithRecovery(draft, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(draft.submissionId ? { "Idempotency-Key": draft.submissionId } : {}) },
        body: JSON.stringify(draft),
      });
    }
    const form = new FormData();
    form.set("payload", JSON.stringify(draft));
    form.set("photo", photo);
    return saveWithRecovery(draft, {
      method: "POST",
      headers: draft.submissionId ? { "Idempotency-Key": draft.submissionId } : {},
      body: form,
    });
  },
  logout: () => fetch("/api/auth/logout", { method: "POST" }),
};
