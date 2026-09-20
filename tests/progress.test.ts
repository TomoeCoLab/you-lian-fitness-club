import assert from "node:assert/strict";
import { test } from "node:test";
import { progressOverview, progressSuggestion } from "../src/lib/progress.ts";
import type { Checkin, GuideExercise } from "../src/types.ts";
const exercise = { name: "測試", equipment: "啞鈴", tracking: "reps", recommendation: { reps: 10, load: "輕重量" } } as GuideExercise;
const checkin = { date: "2026-09-20", createdAt: "2026-09-20T08:00:00Z", exercises: [{ name: "測試", sets: 2, weight: 5, reps: 15, entries: [
  { id: "a", weight: 10, reps: 5, durationSeconds: null, completed: true },
  { id: "b", weight: 5, reps: 15, durationSeconds: null, completed: true },
] }] } as Checkin;
test("never combines weight and reps from different sets", () => {
  const result = progressSuggestion(exercise, [checkin]);
  assert.match(result.meta, /10 kg × 5 次/);
  assert.doesNotMatch(JSON.stringify(result), /11 kg|10 kg × 15/);
});
test("timed movements do not automatically increase duration", () => {
  assert.match(progressSuggestion({ ...exercise, tracking: "time" }, [checkin]).title, /維持或減量/);
});
test("zero completed sets is not replaced by planned sets", () => {
  const input = { ...checkin, exercises: checkin.exercises.map(e => ({ ...e, entries: e.entries!.map(s => ({ ...s, completed: false })) })) };
  assert.equal(progressOverview([input]).totalSets, 0);
  assert.equal(progressOverview([checkin, checkin]).trainingDays, 1);
});
