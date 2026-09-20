import assert from "node:assert/strict";
import { test } from "node:test";
import { builtInWorkoutTemplates as main, preparationRoutines as prep, canonicalTemplateId } from "../src/data/curatedTemplates.ts";
import { exercises } from "../src/data/exercises.ts";
import { addTemplate } from "../src/lib/workoutPlan.ts";
import type { WorkoutDraft } from "../src/types.ts";

const all = [...main, ...prep];
test("curated library has 15 main programs and five preparation pairs with valid content", () => {
  assert.equal(main.length, 15);
  assert.equal(prep.filter(t => t.kind === "warmup").length, 5);
  assert.equal(prep.filter(t => t.kind === "cooldown").length, 5);
  assert.equal(new Set(all.map(t => t.id)).size, 25);
  assert.deepEqual(["居家肌力","核心活動","舒緩伸展","健身房"].map(c => main.filter(t => t.category === c).length), [4,2,3,6]);
  for (const t of all) {
    assert(t.description && t.durationLabel && t.equipmentNote && t.guidance?.length);
    assert.doesNotMatch(JSON.stringify(t), /先熱身打卡|反覆切換換/);
    for (const id of t.companionIds ?? []) assert(prep.some(p => p.id === id), id);
    assert.equal(new Set(t.items.map(i => i.exerciseId)).size, t.items.length);
    for (const i of t.items) {
      const e = exercises.find(e => e.id === i.exerciseId);
      assert(e, i.exerciseId);
      assert.equal(i.exerciseName, e.name);
      assert.equal(i.tracking, e.tracking);
      assert.equal(i.weight, null);
      assert(i.sets >= 1 && i.sets <= 2);
      assert(i.restSeconds >= 15 && i.restSeconds <= 120);
      assert((i.tracking === "reps" ? i.reps : i.durationSeconds)! > 0);
      assert.equal(i.tracking === "reps" ? i.durationSeconds : i.reps, null);
    }
  }
});
test("per-side, alternating-total and one-side-per-set counts stay explicit", () => {
  for (const t of all) for (const i of t.items) {
    if (["bird-dog","dead-bug","dumbbell-row","dumbbell-static-split-squat"].includes(i.exerciseId)) {
      assert.match(i.note!, new RegExp(`每側 ${i.reps} 次`));
      assert.match(i.note!, /左右都完成才算一組/);
    }
    if (i.exerciseId === "heel-slide") assert.match(i.note!, new RegExp(`左右合計 ${i.reps} 次`));
    if (["knee-side-plank","figure-four-stretch","supine-twist","kneeling-hip-flexor-stretch","scapular-glide","supported-hip-abduction","wall-ankle-mobility","wall-calf-stretch","chair-hamstring-stretch"].includes(i.exerciseId)) {
      assert.equal(i.sets, 2);
      assert.match(i.note!, /第一組左側、第二組右側/);
    }
  }
});
test("legacy identifiers resolve while custom identifiers remain unchanged", () => {
  for (const id of ["builtin-everyday-vitality","builtin-mat-basics","builtin-daily-bodyweight","builtin-core-control","builtin-desk-reset","builtin-neck-shoulder-ease","builtin-bedtime-flexibility","builtin-full-body","builtin-push","builtin-pull","builtin-lower-body","warmup-home","cooldown-home","warmup-full","cooldown-full","warmup-push","cooldown-push","warmup-pull","cooldown-pull","warmup-lower","cooldown-lower"]) {
    assert(all.some(t => t.id === canonicalTemplateId(id)), id);
  }
  assert.equal(canonicalTemplateId("my-custom-template"), "my-custom-template");
});
test("adding revised programs preserves existing set snapshots and separates phase doses", () => {
  const empty: WorkoutDraft = { workoutDate: "2026-09-21", startedAt: "", updatedAt: "", items: [] };
  const plan = main.find(t => t.id === "builtin-core-control")!;
  const draft = { ...empty, items: addTemplate(empty, plan) };
  draft.items[0].entries[0].reps = 17;
  draft.items[0].entries[0].completed = true;
  const before = JSON.stringify(draft);
  const same = addTemplate(draft, plan);
  assert.equal(same.length, draft.items.length);
  assert.equal(same[0].entries[0].reps, 17);
  assert.equal(same[0].entries[0].completed, true);
  const warm = prep.find(t => t.id === "warmup-mat")!;
  const joined = addTemplate(draft, warm);
  assert.deepEqual(joined.filter(i => i.exerciseId === "heel-slide").map(i => [i.phase, i.entries[0].reps]), [["warmup",6],["main",17]]);
  assert.equal(JSON.stringify(draft), before);
});
