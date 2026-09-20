import assert from "node:assert/strict";
import { test } from "node:test";
import { addTemplate, remainingWorkout, templateItems } from "../src/lib/workoutPlan.ts";
import { parseTemplateInput } from "../worker/templates.ts";
import type { WorkoutDraft, WorkoutTemplate } from "../src/types.ts";
const empty: WorkoutDraft = { workoutDate: "2026-09-20", startedAt: "2026-09-20T00:00:00Z", updatedAt: "2026-09-20T00:00:00Z", items: [] };
const main: WorkoutTemplate = { id: "main", name: "主課表", kind: "main", createdAt: "", updatedAt: "", items: [{ exerciseId: "march", exerciseName: "踏步", bodyPart: "腿", tracking: "time", restSeconds: 15, sets: 1, weight: null, reps: null, durationSeconds: 60, note: "左右合計" }] };
test("warm-up is inserted before main without losing separate doses or notes", () => {
  const workout = { ...empty, items: addTemplate(empty, main) };
  const warmup = { ...main, id: "warm", kind: "warmup" as const, items: main.items.map(i => ({ ...i, durationSeconds: 90 })) };
  const items = addTemplate(workout, warmup);
  assert.deepEqual(items.map(i => i.phase), ["warmup", "main"]);
  assert.deepEqual(items.map(i => i.entries[0].durationSeconds), [90, 60]);
  assert.equal(items[0].note, "左右合計");
  assert.equal(addTemplate({ ...empty, items }, warmup).length, 2);
});
test("custom template keeps each set and server accepts the same shape", () => {
  const workout = { ...empty, items: addTemplate(empty, main) };
  workout.items[0].entries.push({ ...workout.items[0].entries[0], id: "b", durationSeconds: 35 });
  const items = templateItems(workout);
  const parsed = parseTemplateInput({ name: "自訂", items });
  assert(parsed);
  assert.deepEqual(parsed.items[0].entries?.map(e => e.durationSeconds), [60, 35]);
  assert.deepEqual(addTemplate(empty, { ...main, items: parsed.items })[0].entries.map(e => e.durationSeconds), [60, 35]);
});
test("checkout preserves incomplete sets and restarts elapsed time", () => {
  const workout = { ...empty, items: addTemplate(empty, main) };
  workout.items[0].entries.push({ ...workout.items[0].entries[0], id: "b", completed: true });
  const next = remainingWorkout(workout);
  assert.equal(next.items[0].entries.length, 1);
  assert.equal(next.trainingStartedAt, null);
});
test("retry cleanup removes only the saved entry IDs, not later completed sets", () => {
  const workout = { ...empty, items: addTemplate(empty, main) };
  workout.items[0].entries[0].completed = true;
  workout.items[0].entries.push({ ...workout.items[0].entries[0], id: "later" });
  const next = remainingWorkout(workout, "2026-09-20", new Set([workout.items[0].entries[0].id]));
  assert.deepEqual(next.items[0].entries.map(entry => entry.id), ["later"]);
});
