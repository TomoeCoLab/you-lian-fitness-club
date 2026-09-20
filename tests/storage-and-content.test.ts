import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { loadWorkout, saveWorkout, clearWorkout, emptyWorkout } from "../src/lib/workoutStore.ts";
import { loadMovementPreferences, saveMovementPreferences } from "../src/lib/movementPreferences.ts";
import { exercises } from "../src/data/exercises.ts";
import { videoNeedsReview, videoFrameClass } from "../src/lib/exerciseGuidance.ts";
import { contentReviews } from "../src/data/contentReviews.generated.ts";
import { diagramNeedsReplacement } from "../src/lib/contentAudit.ts";
import { exerciseHistory } from "../src/lib/progress.ts";
import { api } from "../src/lib/api.ts";
import type { Checkin, CheckinDraft } from "../src/types.ts";

test("drafts and movement preferences are scoped; legacy drafts are never implicitly adopted", () => {
  const data = new Map<string, string>();
  const storage = { getItem: (key: string) => data.get(key) ?? null, setItem: (key: string, value: string) => data.set(key, value), removeItem: (key: string) => data.delete(key) };
  Object.defineProperty(globalThis, "localStorage", { value: storage, configurable: true });
  const draft = { ...emptyWorkout(), workoutDate: "2026-09-01", checkoutRequestId: "old-request" };
  storage.setItem("you-lian:active-workout:v1", JSON.stringify(draft));
  assert.equal(loadWorkout("unclaimed").checkoutRequestId, "old-request");
  assert.equal(loadWorkout("guest").checkoutRequestId, undefined);
  saveWorkout(draft, "discord:a");
  assert.equal(loadWorkout("discord:a").workoutDate, "2026-09-01");
  assert.equal(loadWorkout("discord:b").checkoutRequestId, undefined);
  clearWorkout("guest");
  assert.equal(loadWorkout("discord:a").checkoutRequestId, "old-request");
  saveMovementPreferences("discord:a", { favorites: ["wall-push-up"], recent: [] });
  assert.deepEqual(loadMovementPreferences("guest").favorites, []);
  assert.deepEqual(loadMovementPreferences("discord:a").favorites, ["wall-push-up"]);
});

test("content review covers every mapping and fails closed on changed or unmatched videos", () => {
  assert.equal(exercises.length, 76);
  for (const exercise of exercises) assert.equal(videoNeedsReview(exercise), false, exercise.id);
  const squat = exercises.find(e => e.id === "bodyweight-squat")!;
  assert.equal(videoNeedsReview(squat), false);
  assert.equal(videoNeedsReview({ ...squat, video: { ...squat.video, embedUrl: "https://www.youtube-nocookie.com/embed/unknown" } }), true);
  assert.equal(videoNeedsReview({ ...squat, id: "not-reviewed" }), true);
  assert.equal(videoNeedsReview(exercises.find(e => e.id === "kettlebell-swing")!), false);
  assert.equal(videoNeedsReview({ ...squat, video: { ...squat.video, embedUrl: `${squat.video.embedUrl}?start=300` } }), true);
});

test("Shorts have a portrait frame without changing the safe embed gate", () => {
  const short = exercises.find(e => e.id === 'hack-squat')!;
  assert.match(videoFrameClass(short), /--portrait/);
  assert.equal(videoNeedsReview(short), false);
  const landscape = exercises.find(e => e.id === 'band-row')!;
  assert.equal(videoFrameClass(landscape), 'exercise-video__frame');
  assert.equal(videoFrameClass({...short, video:{...short.video, watchUrl:'https://example.com/shorts/anything'}}), 'exercise-video__frame');
  const audit=contentReviews[short.id];
  assert.deepEqual(Object.keys(audit).sort(), ['image','video']);
  assert(!JSON.stringify(contentReviews).includes('findings'));
  const original=audit.video.status;
  try { for (const status of ['pending','blocked','stale'] as const) { audit.video.status=status; assert.equal(videoNeedsReview(short),true); } }
  finally { audit.video.status=original; }
});

test("renamed triceps movement retains old name-only history", () => {
  const exercise = exercises.find(e => e.id === "dumbbell-overhead-triceps-extension")!;
  const checkins = [{ date: "2026-09-01", createdAt: "2026-09-01T00:00:00Z", exercises: [{ name: "啞鈴三頭伸展", weight: 5, reps: 10, sets: 1 }] }] as Checkin[];
  assert.equal(exerciseHistory(exercise, checkins).length, 1);
});

test("diagram display fails closed for missing, pending, stale and erroneous reviews", () => {
  assert.equal(diagramNeedsReplacement(undefined),true);
  const checked=contentReviews['chair-sit-to-stand'];
  assert.equal(diagramNeedsReplacement(checked),false);
  for (const status of ['pending','stale','needs-revision','blocked'] as const) {
    assert.equal(diagramNeedsReplacement({...checked,image:{...checked.image,status}}),true);
  }
});

test("submission recovery returns original result without another POST", async () => {
  const original = globalThis.fetch;
  const calls: string[] = [];
  globalThis.fetch = async (url, init) => { calls.push(`${init?.method ?? "GET"} ${url}`); return Response.json({ record: { id: "saved" }, created: false, notificationQueued: true }); };
  try {
    const result = await api.saveCheckin({ submissionId: "known" } as CheckinDraft, null);
    assert.equal(result.record.id, "saved");
    assert.deepEqual(calls, ["GET /api/submissions/known"]);
  } finally { globalThis.fetch = original; }
});

test("service worker keeps unrelated caches and never intercepts auth or version requests", async () => {
  const handlers: Record<string, (event: any) => void> = {};
  const removed: string[] = [];
  runInNewContext(readFileSync(new URL("../public/sw.js", import.meta.url), "utf8"), {
    self: { addEventListener: (name: string, fn: (event: any) => void) => { handlers[name] = fn; }, clients: { claim: async () => {} }, location: { origin: "https://example.com" } },
    caches: { keys: async () => ["other-app", "you-lian-shell-v2", "you-lian-shell-v3"], delete: async (key: string) => { removed.push(key); } }, URL,
  });
  let promise: Promise<unknown> | undefined;
  handlers.activate({ waitUntil: (value: Promise<unknown>) => { promise = value; } }); await promise;
  assert.deepEqual(removed, ["you-lian-shell-v2"]);
  for (const path of ["/api/me", "/api/auth/discord", "/version.json"]) handlers.fetch({ request: { method: "GET", url: `https://example.com${path}` }, respondWith: () => assert.fail("private response must not be cached") });
});
