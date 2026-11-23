import type { CustomExerciseRecord } from "./types";

type Row = { id: string; name: string; body_part: CustomExerciseRecord["bodyPart"]; tracking: CustomExerciseRecord["tracking"]; rest_seconds: number; created_at: string };
const bodyParts = new Set(["胸", "背", "腿", "肩", "手臂", "核心"]);

function mapRow(row: Row): CustomExerciseRecord {
  return { id: row.id, name: row.name, bodyPart: row.body_part, tracking: row.tracking, restSeconds: row.rest_seconds, createdAt: row.created_at };
}

export function parseCustomExercise(value: unknown): Omit<CustomExerciseRecord, "id" | "createdAt"> | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  const name = typeof item.name === "string" ? item.name.trim() : "";
  if (!name || name.length > 50 || typeof item.bodyPart !== "string" || !bodyParts.has(item.bodyPart) || (item.tracking !== "reps" && item.tracking !== "time")) return null;
  const restSeconds = typeof item.restSeconds === "number" && Number.isInteger(item.restSeconds) && item.restSeconds >= 0 && item.restSeconds <= 3600 ? item.restSeconds : 60;
  return { name, bodyPart: item.bodyPart as CustomExerciseRecord["bodyPart"], tracking: item.tracking, restSeconds };
}

export async function listCustomExercises(env: Env, _userId?: string): Promise<CustomExerciseRecord[]> {
  const rows = await env.DB.prepare("SELECT id, name, body_part, tracking, rest_seconds, created_at FROM custom_exercises ORDER BY created_at DESC, id").all<Row>();
  return rows.results.map(mapRow);
}

export async function createCustomExercise(env: Env, userId: string, input: Omit<CustomExerciseRecord, "id" | "createdAt">): Promise<CustomExerciseRecord> {
  const normalized = input.name.normalize('NFKC').trim().toLowerCase();
  const existing = (await listCustomExercises(env)).find(item => item.name.normalize('NFKC').trim().toLowerCase() === normalized && item.bodyPart === input.bodyPart && item.tracking === input.tracking);
  if (existing) return existing;
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify([normalized, input.bodyPart, input.tracking])));
  const id = `custom-${Array.from(new Uint8Array(digest)).map(b=>b.toString(16).padStart(2,'0')).join('').slice(0,40)}`;
  const createdAt = new Date().toISOString();
  await env.DB.prepare("INSERT OR IGNORE INTO custom_exercises (id, user_id, name, body_part, tracking, rest_seconds, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(id, userId, input.name, input.bodyPart, input.tracking, input.restSeconds, createdAt).run();
  const stored = await env.DB.prepare('SELECT id, name, body_part, tracking, rest_seconds, created_at FROM custom_exercises WHERE id = ?').bind(id).first<Row>();
  if (!stored) throw new Error('自訂動作保存失敗');
  return mapRow(stored);
}
