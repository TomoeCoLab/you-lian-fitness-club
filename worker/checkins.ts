import type { CheckinInput, CheckinMode, CheckinRecord, Exercise, ExerciseSetEntry, ReactionKind, ReactionSummary, SessionUser } from "./types";

type CheckinRow = {
  submission_hash?: string | null;
  id: string;
  user_id: string;
  checkin_date: string;
  mode: CheckinMode;
  workout_type: string | null;
  duration_minutes: number | null;
  note: string | null;
  exercises_json: string;
  photo_key: string | null;
  photo_content_type: string | null;
  photo_size_bytes: number;
  created_at: string;
  updated_at: string;
  username: string;
  global_name: string | null;
  avatar_hash: string | null;
};

type ReactionRow = {
  checkin_id: string;
  reaction: ReactionKind;
  count: number;
  mine: number;
};

const modes = new Set<CheckinMode>(["quick", "standard", "detailed"]);
const datePattern = /^\d{4}-\d{2}-\d{2}$/u;
const monthPattern = /^\d{4}-\d{2}$/u;
const reactionKinds = new Set<ReactionKind>(["strong", "fire", "clap"]);

function emptyReactions(): ReactionSummary {
  return { counts: { strong: 0, fire: 0, clap: 0 }, mine: null };
}

function nullableText(value: unknown, maxLength: number): string | null | undefined {
  if (value === null || value === "") return null;
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= maxLength ? trimmed : undefined;
}

function nullableInteger(value: unknown, minimum: number, maximum: number): number | null | undefined {
  if (value === null || value === "") return null;
  if (typeof value !== "number" || !Number.isInteger(value) || value < minimum || value > maximum) {
    return undefined;
  }
  return value;
}

function nullableNumber(value: unknown, minimum: number, maximum: number): number | null | undefined {
  if (value === null || value === "") return null;
  if (typeof value !== "number" || !Number.isFinite(value) || value < minimum || value > maximum) return undefined;
  return value;
}

function parseExerciseEntry(value: unknown): ExerciseSetEntry | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  const id = nullableText(item.id, 80);
  const weight = nullableNumber(item.weight, 0, 1000);
  const reps = nullableInteger(item.reps, 1, 1000);
  const durationSeconds = nullableInteger(item.durationSeconds, 1, 86400);
  if (!id || weight === undefined || reps === undefined || durationSeconds === undefined || typeof item.completed !== "boolean") return null;
  if (reps === null && durationSeconds === null) return null;
  return { id, weight, reps, durationSeconds, completed: item.completed };
}

function parseExercise(value: unknown): Exercise | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  const name = nullableText(item.name, 50);
  const sets = nullableInteger(item.sets, 1, 100);
  const weight = typeof item.weight === "number" && item.weight >= 0 && item.weight <= 1000 ? item.weight : undefined;
  const reps = nullableInteger(item.reps, 1, 1000);
  if (!name || sets === null || sets === undefined || weight === undefined || reps === null || reps === undefined) return null;
  const phase = item.phase === undefined ? undefined : ["warmup", "main", "cooldown"].includes(String(item.phase)) ? item.phase as Exercise["phase"] : null;
  const note = item.note === undefined ? undefined : nullableText(item.note, 200);
  const exerciseId = item.exerciseId === undefined ? undefined : nullableText(item.exerciseId, 100);
  if (phase === null || item.note !== undefined && note === undefined || item.exerciseId !== undefined && !exerciseId) return null;
  const context = { ...(phase ? { phase } : {}), ...(note ? { note } : {}), ...(exerciseId ? { exerciseId } : {}) };
  const rawEntries = item.entries;
  if (rawEntries === undefined) return { name, sets, weight, reps, ...context };
  if (!Array.isArray(rawEntries) || rawEntries.length > 100) return null;
  const entries = rawEntries.map(parseExerciseEntry);
  if (entries.some((entry) => entry === null)) return null;
  return { name, sets, weight, reps, ...context, entries: entries.filter((entry): entry is ExerciseSetEntry => entry !== null) };
}

function validDate(value: string): boolean {
  if (!datePattern.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

export function parseCheckinInput(value: unknown): CheckinInput | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  const date = typeof item.date === "string" ? item.date : "";
  const mode = typeof item.mode === "string" && modes.has(item.mode as CheckinMode) ? (item.mode as CheckinMode) : null;
  if (!validDate(date) || !mode) return null;

  const workoutType = nullableText(item.workoutType, 40);
  const durationMinutes = nullableInteger(item.durationMinutes, 1, 1440);
  const note = nullableText(item.note, 200);
  if (workoutType === undefined || durationMinutes === undefined || note === undefined) return null;

  const rawExercises = item.exercises ?? [];
  if (!Array.isArray(rawExercises) || rawExercises.length > 20) return null;
  const exercises = rawExercises.map(parseExercise);
  if (exercises.some((exercise) => exercise === null)) return null;

  if (mode === "quick") {
    return { date, mode, workoutType: null, durationMinutes: null, note: null, exercises: [] };
  }
  if (mode === "detailed" && exercises.length === 0) return null;

  return {
    date,
    mode,
    workoutType,
    durationMinutes,
    note,
    exercises: exercises.filter((exercise): exercise is Exercise => exercise !== null),
  };
}

function avatarUrl(row: CheckinRow): string | null {
  return row.avatar_hash
    ? `https://cdn.discordapp.com/avatars/${encodeURIComponent(row.user_id)}/${encodeURIComponent(row.avatar_hash)}.png?size=128`
    : null;
}

function parseExercises(value: string): Exercise[] {
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(parseExercise).filter((exercise): exercise is Exercise => exercise !== null);
  } catch {
    return [];
  }
}

function mapRow(row: CheckinRow): CheckinRecord {
  return {
    id: row.id,
    date: row.checkin_date,
    mode: row.mode,
    workoutType: row.workout_type,
    durationMinutes: row.duration_minutes,
    note: row.note,
    exercises: parseExercises(row.exercises_json),
    photoUrl: row.photo_key ? `/api/photos/${encodeURIComponent(row.id)}` : null,
    user: {
      id: row.user_id,
      username: row.username,
      displayName: row.global_name ?? row.username,
      avatarUrl: avatarUrl(row),
    },
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    reactions: emptyReactions(),
  };
}

async function addReactionSummaries(
  env: Env,
  records: CheckinRecord[],
  userId: string,
  dateRange?: { start: string; end: string },
): Promise<CheckinRecord[]> {
  if (records.length === 0) return records;
  const query = dateRange
    ? `SELECT r.checkin_id, r.reaction, COUNT(*) AS count,
              MAX(CASE WHEN r.user_id = ? THEN 1 ELSE 0 END) AS mine
       FROM checkin_reactions r JOIN checkins c ON c.id = r.checkin_id
       WHERE c.checkin_date >= ? AND c.checkin_date < ?
       GROUP BY r.checkin_id, r.reaction`
    : `SELECT r.checkin_id, r.reaction, COUNT(*) AS count,
              MAX(CASE WHEN r.user_id = ? THEN 1 ELSE 0 END) AS mine
       FROM checkin_reactions r JOIN checkins c ON c.id = r.checkin_id
       WHERE c.user_id = ?
       GROUP BY r.checkin_id, r.reaction`;
  const statement = env.DB.prepare(query);
  const result = dateRange
    ? await statement.bind(userId, dateRange.start, dateRange.end).all<ReactionRow>()
    : await statement.bind(userId, userId).all<ReactionRow>();
  const byCheckin = new Map<string, ReactionSummary>();
  for (const row of result.results) {
    const summary = byCheckin.get(row.checkin_id) ?? emptyReactions();
    summary.counts[row.reaction] = Number(row.count);
    if (row.mine) summary.mine = row.reaction;
    byCheckin.set(row.checkin_id, summary);
  }
  return records.map((record) => ({ ...record, reactions: byCheckin.get(record.id) ?? emptyReactions() }));
}

export async function listMonth(env: Env, month: string, userId: string): Promise<CheckinRecord[] | null> {
  if (!monthPattern.test(month)) return null;
  const start = `${month}-01`;
  const end = `${nextMonth(month)}-01`;
  const result = await env.DB.prepare(
    `SELECT c.id, c.user_id, c.checkin_date, c.mode, c.workout_type,
            c.duration_minutes, c.note, c.exercises_json, c.photo_key, c.photo_content_type, c.photo_size_bytes,
            c.created_at, c.updated_at,
            u.username, u.global_name, u.avatar_hash
     FROM checkins c
     JOIN users u ON u.discord_id = c.user_id
     WHERE c.checkin_date >= ? AND c.checkin_date < ?
     ORDER BY c.checkin_date ASC, c.created_at ASC`,
  )
    .bind(start, end)
    .all<CheckinRow>();
  return addReactionSummaries(env, result.results.map(mapRow), userId, { start, end });
}

export async function listUserHistory(env: Env, userId: string, limit = 120): Promise<CheckinRecord[]> {
  const result = await env.DB.prepare(
    `SELECT c.id, c.user_id, c.checkin_date, c.mode, c.workout_type,
            c.duration_minutes, c.note, c.exercises_json, c.photo_key, c.photo_content_type, c.photo_size_bytes,
            c.created_at, c.updated_at,
            u.username, u.global_name, u.avatar_hash
     FROM checkins c JOIN users u ON u.discord_id = c.user_id
     WHERE c.user_id = ?
     ORDER BY c.checkin_date DESC, c.created_at DESC
     LIMIT ?`,
  ).bind(userId, limit).all<CheckinRow>();
  return addReactionSummaries(env, result.results.map(mapRow), userId);
}

export async function getProgressOverview(env: Env, userId: string) {
  const [totals, sets, favorite] = await Promise.all([
    env.DB.prepare("SELECT COUNT(*) AS sessionCount, COUNT(DISTINCT checkin_date) AS trainingDays, COALESCE(SUM(duration_minutes), 0) AS totalMinutes FROM checkins WHERE user_id = ?").bind(userId).first<{ sessionCount: number; trainingDays: number; totalMinutes: number }>(),
    env.DB.prepare(`SELECT COALESCE(SUM(CASE WHEN json_type(e.value, '$.entries') = 'array'
      THEN (SELECT COUNT(*) FROM json_each(e.value, '$.entries') s WHERE json_extract(s.value, '$.completed') = 1)
      ELSE COALESCE(json_extract(e.value, '$.sets'), 0) END), 0) AS totalSets
      FROM checkins c, json_each(c.exercises_json) e WHERE c.user_id = ?`).bind(userId).first<{ totalSets: number }>(),
    env.DB.prepare(`SELECT json_extract(e.value, '$.name') AS name FROM checkins c, json_each(c.exercises_json) e
      WHERE c.user_id = ? GROUP BY name ORDER BY COUNT(*) DESC, name ASC LIMIT 1`).bind(userId).first<{ name: string }>(),
  ]);
  return { sessionCount: totals?.sessionCount ?? 0, trainingDays: totals?.trainingDays ?? 0, totalMinutes: totals?.totalMinutes ?? 0, totalSets: sets?.totalSets ?? 0, favorite: favorite?.name ?? "尚無資料" };
}

export function parseReaction(value: unknown): ReactionKind | null | undefined {
  if (value === null) return null;
  return typeof value === "string" && reactionKinds.has(value as ReactionKind) ? value as ReactionKind : undefined;
}

export async function setReaction(
  env: Env,
  userId: string,
  checkinId: string,
  reaction: ReactionKind | null,
): Promise<ReactionSummary | null> {
  const exists = await env.DB.prepare("SELECT 1 AS found FROM checkins WHERE id = ?").bind(checkinId).first<{ found: number }>();
  if (!exists) return null;
  if (reaction === null) {
    await env.DB.prepare("DELETE FROM checkin_reactions WHERE checkin_id = ? AND user_id = ?").bind(checkinId, userId).run();
  } else {
    await env.DB.prepare(
      `INSERT INTO checkin_reactions (checkin_id, user_id, reaction, created_at, updated_at)
       VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       ON CONFLICT(checkin_id, user_id) DO UPDATE SET reaction = excluded.reaction, updated_at = CURRENT_TIMESTAMP`,
    ).bind(checkinId, userId, reaction).run();
  }
  const rows = await env.DB.prepare(
    `SELECT reaction, COUNT(*) AS count,
            MAX(CASE WHEN user_id = ? THEN 1 ELSE 0 END) AS mine
     FROM checkin_reactions WHERE checkin_id = ? GROUP BY reaction`,
  ).bind(userId, checkinId).all<Omit<ReactionRow, "checkin_id">>();
  const summary = emptyReactions();
  for (const row of rows.results) {
    summary.counts[row.reaction] = Number(row.count);
    if (row.mine) summary.mine = row.reaction;
  }
  return summary;
}

function nextMonth(month: string): string {
  const [year, monthNumber] = month.split("-").map(Number);
  const next = new Date(Date.UTC(year, monthNumber, 1));
  return `${next.getUTCFullYear()}-${String(next.getUTCMonth() + 1).padStart(2, "0")}`;
}

export async function saveCheckin(
  env: Env,
  user: SessionUser,
  input: CheckinInput,
  photo: { key: string; contentType: string; size: number } | null,
  submission?: { id: string; hash: string },
): Promise<{ record: CheckinRecord; created: boolean }> {
  const id = submission ? `${user.id}_${submission.id}` : crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const insert = env.DB.prepare(
    `INSERT OR IGNORE INTO checkins
       (id, user_id, checkin_date, mode, workout_type, duration_minutes, note, exercises_json,
        photo_key, photo_content_type, photo_size_bytes, created_at, updated_at, submission_hash)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      id,
      user.id,
      input.date,
      input.mode,
      input.workoutType,
      input.durationMinutes,
      input.note,
      JSON.stringify(input.exercises),
      photo?.key ?? null,
      photo?.contentType ?? null,
      photo?.size ?? 0,
      createdAt,
      createdAt,
      submission?.hash ?? null,
    );
  const statements = [insert];
  if (env.DISCORD_WEBHOOK_URL) statements.push(env.DB.prepare(
    "INSERT OR IGNORE INTO notification_outbox(checkin_id) SELECT id FROM checkins WHERE id = ? AND submission_hash IS ?",
  ).bind(id, submission?.hash ?? null));
  const results = await env.DB.batch(statements);

  const row = await env.DB.prepare(
    `SELECT c.submission_hash, c.id, c.user_id, c.checkin_date, c.mode, c.workout_type,
            c.duration_minutes, c.note, c.exercises_json, c.photo_key, c.photo_content_type, c.photo_size_bytes,
            c.created_at, c.updated_at,
            u.username, u.global_name, u.avatar_hash
     FROM checkins c JOIN users u ON u.discord_id = c.user_id
     WHERE c.id = ?`,
  )
    .bind(id)
    .first<CheckinRow>();
  if (!row) throw new Error("Saved check-in could not be loaded");
  if (submission && row.submission_hash !== submission.hash) throw new SubmissionConflict();
  return { record: mapRow(row), created: results[0].meta.changes > 0 };
}

export class SubmissionConflict extends Error {
  constructor() { super("這次送出的前一版本已儲存，請先查看紀錄；如需另一筆打卡，請重新開啟打卡視窗。"); }
}

export async function findSubmission(env: Env, userId: string, submissionId: string) {
  const row = await env.DB.prepare(`SELECT c.*, u.username, u.global_name, u.avatar_hash
    FROM checkins c JOIN users u ON u.discord_id = c.user_id WHERE c.id = ? AND c.user_id = ?`)
    .bind(`${userId}_${submissionId}`, userId).first<CheckinRow>();
  return row ? { hash: row.submission_hash, record: mapRow(row) } : null;
}

export async function getCheckinById(env: Env, id: string) {
  const row = await env.DB.prepare(`SELECT c.*, u.username, u.global_name, u.avatar_hash
    FROM checkins c JOIN users u ON u.discord_id = c.user_id WHERE c.id = ?`).bind(id).first<CheckinRow>();
  return row ? mapRow(row) : null;
}

export async function getPhoto(env: Env, checkinId: string): Promise<R2ObjectBody | null> {
  const row = await env.DB.prepare("SELECT photo_key FROM checkins WHERE id = ?")
    .bind(checkinId)
    .first<{ photo_key: string | null }>();
  return row?.photo_key ? env.PHOTOS.get(row.photo_key) : null;
}

export async function deleteCheckin(env: Env, userId: string, checkinId: string): Promise<boolean> {
  const existing = await env.DB.prepare("SELECT photo_key FROM checkins WHERE id = ? AND user_id = ?")
    .bind(checkinId, userId)
    .first<{ photo_key: string | null }>();
  const result = await env.DB.prepare("DELETE FROM checkins WHERE id = ? AND user_id = ?")
    .bind(checkinId, userId)
    .run();
  if (result.meta.changes > 0 && existing?.photo_key) {
    await env.PHOTOS.delete(existing.photo_key).catch((error: unknown) => {
      console.error(JSON.stringify({
        message: "deleted_photo_cleanup_failed",
        key: existing.photo_key,
        error: error instanceof Error ? error.message : String(error),
      }));
    });
  }
  return result.meta.changes > 0;
}
