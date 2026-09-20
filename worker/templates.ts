import type { WorkoutTemplateItem, WorkoutTemplateRecord } from "./types";

type TemplateRow = {
  id: string;
  name: string;
  items_json: string;
  created_at: string;
  updated_at: string;
};

const bodyParts = new Set(["胸", "背", "腿", "肩", "手臂", "核心"]);

function nullableNumber(value: unknown, minimum: number, maximum: number): number | null | undefined {
  if (value === null) return null;
  if (typeof value !== "number" || !Number.isFinite(value) || value < minimum || value > maximum) return undefined;
  return value;
}

function parseTemplateItem(value: unknown): WorkoutTemplateItem | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  const tracking = item.tracking === "reps" || item.tracking === "time" ? item.tracking : null;
  const weight = nullableNumber(item.weight, 0, 1000);
  const reps = nullableNumber(item.reps, 1, 1000);
  const durationSeconds = nullableNumber(item.durationSeconds, 1, 86400);
  const exerciseId = typeof item.exerciseId === "string" ? item.exerciseId.trim() : "";
  const exerciseName = typeof item.exerciseName === "string" ? item.exerciseName.trim() : "";
  if (
    exerciseId.length < 1 || exerciseId.length > 80 ||
    exerciseName.length < 1 || exerciseName.length > 50 ||
    typeof item.bodyPart !== "string" || !bodyParts.has(item.bodyPart) || !tracking ||
    typeof item.restSeconds !== "number" || !Number.isInteger(item.restSeconds) || item.restSeconds < 0 || item.restSeconds > 3600 ||
    typeof item.sets !== "number" || !Number.isInteger(item.sets) || item.sets < 1 || item.sets > 20 ||
    weight === undefined || reps === undefined || durationSeconds === undefined ||
    (tracking === "reps" && reps === null) || (tracking === "time" && durationSeconds === null)
  ) return null;
  if (item.note !== undefined && (typeof item.note !== "string" || item.note.length > 200)) return null;
  if (item.phase !== undefined && !["warmup", "main", "cooldown"].includes(String(item.phase))) return null;
  const entries: NonNullable<WorkoutTemplateItem["entries"]> = [];
  if (item.entries !== undefined) {
    if (!Array.isArray(item.entries) || item.entries.length !== item.sets) return null;
    for (const raw of item.entries) {
      if (!raw || typeof raw !== "object") return null;
      const set = raw as Record<string, unknown>;
      const weight = nullableNumber(set.weight, 0, 1000), reps = nullableNumber(set.reps, 1, 1000), durationSeconds = nullableNumber(set.durationSeconds, 1, 86400);
      if (weight === undefined || reps === undefined || durationSeconds === undefined ||
        (tracking === "reps" && (reps === null || !Number.isInteger(reps))) || (tracking === "time" && (durationSeconds === null || !Number.isInteger(durationSeconds)))) return null;
      entries.push({ weight, reps: tracking === "reps" ? reps : null, durationSeconds: tracking === "time" ? durationSeconds : null });
    }
  }
  return {
    ...(item.note !== undefined ? { note: item.note as string } : {}),
    ...(item.phase !== undefined ? { phase: item.phase as WorkoutTemplateItem["phase"] } : {}),
    ...(item.entries !== undefined ? { entries } : {}),
    exerciseId,
    exerciseName,
    bodyPart: item.bodyPart as WorkoutTemplateItem["bodyPart"],
    tracking,
    restSeconds: item.restSeconds,
    sets: item.sets,
    weight,
    reps,
    durationSeconds,
  };
}

export function parseTemplateInput(value: unknown): { name: string; items: WorkoutTemplateItem[] } | null {
  if (!value || typeof value !== "object") return null;
  const input = value as Record<string, unknown>;
  if (typeof input.name !== "string") return null;
  const name = input.name.trim();
  if (name.length < 1 || name.length > 40 || !Array.isArray(input.items) || input.items.length < 1 || input.items.length > 20) return null;
  const items = input.items.map(parseTemplateItem);
  if (items.some((item) => item === null)) return null;
  return { name, items: items.filter((item): item is WorkoutTemplateItem => item !== null) };
}

function parseStoredItems(value: string): WorkoutTemplateItem[] {
  try {
    const raw: unknown = JSON.parse(value);
    if (!Array.isArray(raw)) return [];
    return raw.map(parseTemplateItem).filter((item): item is WorkoutTemplateItem => item !== null);
  } catch {
    return [];
  }
}

function mapTemplate(row: TemplateRow): WorkoutTemplateRecord {
  return { id: row.id, name: row.name, items: parseStoredItems(row.items_json), createdAt: row.created_at, updatedAt: row.updated_at };
}

export async function listTemplates(env: Env, userId: string): Promise<WorkoutTemplateRecord[]> {
  const result = await env.DB.prepare(
    "SELECT id, name, items_json, created_at, updated_at FROM workout_templates WHERE user_id = ? ORDER BY updated_at DESC",
  ).bind(userId).all<TemplateRow>();
  return result.results.map(mapTemplate);
}

export async function createTemplate(
  env: Env,
  userId: string,
  input: { name: string; items: WorkoutTemplateItem[] },
): Promise<WorkoutTemplateRecord> {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  await env.DB.prepare(
    `INSERT INTO workout_templates (id, user_id, name, items_json, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
  ).bind(id, userId, input.name, JSON.stringify(input.items), now, now).run();
  return { id, name: input.name, items: input.items, createdAt: now, updatedAt: now };
}

export async function deleteTemplate(env: Env, userId: string, templateId: string): Promise<boolean> {
  const result = await env.DB.prepare("DELETE FROM workout_templates WHERE id = ? AND user_id = ?")
    .bind(templateId, userId).run();
  return result.meta.changes > 0;
}
