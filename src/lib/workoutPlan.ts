import type { WorkoutDraft, WorkoutItem, WorkoutTemplate, WorkoutTemplateItem } from "../types";
import { canonicalExerciseId } from "./exerciseGuidance";

export const phaseLabels = { warmup: "熱身", main: "主訓練", cooldown: "收尾" };
export const itemKey = (item: WorkoutItem) => item.instanceId ?? item.exerciseId;
export const templateItemPresent = (workout: WorkoutDraft, template: WorkoutTemplate, item: WorkoutTemplateItem) =>
  workout.items.some(existing => canonicalExerciseId(existing.exerciseId) === canonicalExerciseId(item.exerciseId) && (existing.phase ?? "main") === (item.phase ?? template.kind ?? "main"));

export function addTemplate(workout: WorkoutDraft, template: WorkoutTemplate): WorkoutItem[] {
  const result = [...workout.items];
  for (const item of template.items) {
    const phase = item.phase ?? template.kind ?? "main";
    if (result.some(existing => canonicalExerciseId(existing.exerciseId) === canonicalExerciseId(item.exerciseId) && (existing.phase ?? "main") === phase)) continue;
    const entries = item.entries ?? Array.from({ length: item.sets }, () => ({ weight: item.weight, reps: item.tracking === "reps" ? item.reps : null, durationSeconds: item.tracking === "time" ? item.durationSeconds : null }));
    const next: WorkoutItem = { instanceId: crypto.randomUUID(), exerciseId: item.exerciseId, exerciseName: item.exerciseName,
      bodyPart: item.bodyPart, tracking: item.tracking, restSeconds: item.restSeconds, phase, note: item.note, templateName: template.name,
      entries: entries.map(entry => ({ ...entry, id: crypto.randomUUID(), completed: false })) };
    const rank = { warmup: 0, main: 1, cooldown: 2 };
    const insertion = result.findIndex(existing => rank[existing.phase ?? "main"] > rank[phase]);
    result.splice(insertion < 0 ? result.length : insertion, 0, next);
  }
  return result;
}

export function templateItems(workout: WorkoutDraft): WorkoutTemplateItem[] {
  return workout.items.map(item => ({ exerciseId: item.exerciseId, exerciseName: item.exerciseName, bodyPart: item.bodyPart,
    tracking: item.tracking, restSeconds: item.restSeconds, phase: item.phase, note: item.note, sets: item.entries.length,
    weight: item.entries[0]?.weight ?? null, reps: item.tracking === "reps" ? item.entries[0]?.reps ?? 10 : null,
    durationSeconds: item.tracking === "time" ? item.entries[0]?.durationSeconds ?? 30 : null,
    entries: item.entries.map(({ weight, reps, durationSeconds }) => ({ weight, reps, durationSeconds })) }));
}

export function remainingWorkout(workout: WorkoutDraft, now = new Date().toISOString(), savedEntryIds?: Set<string>): WorkoutDraft {
  return { ...workout, checkoutRequestId: undefined, startedAt: now, trainingStartedAt: null, updatedAt: now,
    items: workout.items.map(item => ({ ...item, entries: item.entries.filter(entry => savedEntryIds ? !savedEntryIds.has(entry.id) : !entry.completed) })).filter(item => item.entries.length > 0) };
}
