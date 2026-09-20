import { test } from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { readFileSync, readdirSync } from "node:fs";
import { saveCheckin, getProgressOverview, findSubmission, parseCheckinInput, SubmissionConflict } from "../worker/checkins.ts";
import { deliverNotification, retryNotifications } from "../worker/notifications.ts";

function database() {
  const sqlite = new DatabaseSync(":memory:");
  for (const file of readdirSync(new URL("../migrations/", import.meta.url)).sort()) sqlite.exec(readFileSync(new URL(`../migrations/${file}`, import.meta.url), "utf8"));
  const prepare = (sql: string) => {
    let values: any[] = [];
    const query = {
      bind(...args: any[]) { values = args; return query; },
      async first() { return sqlite.prepare(sql).get(...values) ?? null; },
      async all() { return { results: sqlite.prepare(sql).all(...values), success: true }; },
      async run() { const result = sqlite.prepare(sql).run(...values); return { success: true, meta: { changes: Number(result.changes) } }; },
    };
    return query;
  };
  const db = { prepare, async batch(statements: ReturnType<typeof prepare>[]) {
    sqlite.exec("BEGIN");
    try { const results = []; for (const statement of statements) results.push(await statement.run()); sqlite.exec("COMMIT"); return results; }
    catch (error) { sqlite.exec("ROLLBACK"); throw error; }
  } };
  sqlite.exec("INSERT INTO users(discord_id, username, guild_verified_at) VALUES ('a', 'test-a', CURRENT_TIMESTAMP), ('b', 'test-b', CURRENT_TIMESTAMP)");
  return { sqlite, env: { DB: db, DISCORD_WEBHOOK_URL: "mock-only" } as any };
}
const user = { id: "a", username: "test-a", displayName: "Test", avatarUrl: null, demo: true };
const input = { date: "2026-09-20", mode: "detailed" as const, workoutType: "測試", durationMinutes: 10, note: null, exercises: [{ name: "踏步", phase: "warmup" as const, note: "左右合計", sets: 1, weight: 0, reps: 1, entries: [{ id: "set-1", weight: null, reps: null, durationSeconds: 30, completed: true }] }] };
test("idempotency creates exactly one check-in and outbox row; key is owner-scoped", async () => {
  const { env, sqlite } = database();
  const first = await saveCheckin(env, user, input, null, { id: "request", hash: "one" });
  const retry = await saveCheckin(env, user, input, null, { id: "request", hash: "one" });
  assert.equal(first.created, true); assert.equal(retry.created, false); assert.equal(first.record.id, retry.record.id);
  assert.equal((sqlite.prepare("SELECT COUNT(*) AS n FROM notification_outbox").get() as any).n, 1);
  await assert.rejects(() => saveCheckin(env, user, input, null, { id: "request", hash: "changed" }), SubmissionConflict);
  assert.equal(await findSubmission(env, "b", "request"), null);
  assert.equal(first.record.exercises[0].phase, "warmup");
  sqlite.close();
});
test("historical totals include more than 120 sessions and count dates only once", async () => {
  const { env, sqlite } = database();
  for (let n = 0; n < 125; n++) await saveCheckin(env, user, input, null, { id: String(n), hash: String(n) });
  const result = await getProgressOverview(env, "a");
  assert.equal(result.sessionCount, 125); assert.equal(result.trainingDays, 1); assert.equal(result.totalSets, 125); assert.equal(result.totalMinutes, 1250);
  assert.equal((await getProgressOverview(env, "b")).sessionCount, 0);
  sqlite.close();
});
test("server rejects invalid dates, set values, phases and excessive counts", () => {
  assert(parseCheckinInput(input));
  assert.equal(parseCheckinInput({ ...input, date: "2026-02-30" }), null);
  assert.equal(parseCheckinInput({ ...input, exercises: [{ ...input.exercises[0], phase: "bad" }] }), null);
  assert.equal(parseCheckinInput({ ...input, exercises: [{ ...input.exercises[0], entries: [{ ...input.exercises[0].entries[0], durationSeconds: -1 }] }] }), null);
  assert.equal(parseCheckinInput({ ...input, exercises: Array(21).fill(input.exercises[0]) }), null);
});
test("Discord outbox retries failed delivery and never resends a sent row", async () => {
  const { env, sqlite } = database();
  const original = globalThis.fetch;
  let calls = 0;
  try {
    const saved = await saveCheckin(env, user, input, null, { id: "outbox", hash: "outbox" });
    globalThis.fetch = async () => { calls++; return new Response("mock failure", { status: 503 }); };
    await deliverNotification(env, saved.record.id);
    const failed = sqlite.prepare("SELECT state, attempts, next_attempt FROM notification_outbox").get() as any;
    assert.equal(failed.state, "pending"); assert.equal(failed.attempts, 1); assert(failed.next_attempt > Date.now());
    await deliverNotification(env, saved.record.id); assert.equal(calls, 1);
    sqlite.exec("UPDATE notification_outbox SET next_attempt = 0");
    globalThis.fetch = async () => { calls++; return new Response(null, { status: 204 }); };
    await retryNotifications(env);
    assert.equal((sqlite.prepare("SELECT state FROM notification_outbox").get() as any).state, "sent");
    await retryNotifications(env); assert.equal(calls, 2);
  } finally { globalThis.fetch = original; sqlite.close(); }
});
test("Discord retry limit ends in a visible failed state", async () => {
  const { env, sqlite } = database(); const original = globalThis.fetch;
  try {
    const saved = await saveCheckin(env, user, input, null, { id: "exhausted", hash: "exhausted" });
    sqlite.exec("UPDATE notification_outbox SET attempts = 4");
    globalThis.fetch = async () => { throw new Error("mock timeout with private details"); };
    await deliverNotification(env, saved.record.id);
    const row = sqlite.prepare("SELECT state, attempts, last_error FROM notification_outbox").get() as any;
    assert.equal(row.state, "failed"); assert.equal(row.attempts, 5); assert(!row.last_error.includes("private"));
  } finally { globalThis.fetch = original; sqlite.close(); }
});
