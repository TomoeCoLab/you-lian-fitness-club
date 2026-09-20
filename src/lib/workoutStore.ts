import type { ExerciseSetEntry, WorkoutDraft, WorkoutItem } from "../types";
import { taipeiDateKey, todayKey } from "./date";

const STORAGE_KEY = "you-lian:active-workout:v1";

function isEntry(value: unknown): value is ExerciseSetEntry {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return typeof item.id === "string"
    && (item.weight === null || typeof item.weight === "number")
    && (item.reps === null || typeof item.reps === "number")
    && (item.durationSeconds === null || typeof item.durationSeconds === "number")
    && typeof item.completed === "boolean";
}

function isItem(value: unknown): value is WorkoutItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return typeof item.exerciseId === "string"
    && typeof item.exerciseName === "string"
    && typeof item.bodyPart === "string"
    && (item.tracking === "reps" || item.tracking === "time")
    && typeof item.restSeconds === "number"
    && Array.isArray(item.entries)
    && item.entries.every(isEntry);
}

export function emptyWorkout(): WorkoutDraft {
  const now = new Date().toISOString();
  return { workoutDate: todayKey(), startedAt: now, updatedAt: now, items: [] };
}

export function loadWorkout(owner = "unclaimed"): WorkoutDraft {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(owner === "unclaimed" ? STORAGE_KEY : `${STORAGE_KEY}:${owner}`) ?? "null");
    if (!parsed || typeof parsed !== "object") return emptyWorkout();
    const item = parsed as Record<string, unknown>;
    if (typeof item.startedAt !== "string" || typeof item.updatedAt !== "string" || !Array.isArray(item.items)) {
      return emptyWorkout();
    }
    const startedAt = item.startedAt;
    return {
      workoutDate: typeof item.workoutDate === "string" ? item.workoutDate : taipeiDateKey(startedAt),
      startedAt: item.startedAt,
      trainingStartedAt: typeof item.trainingStartedAt === "string" ? item.trainingStartedAt : null,
      checkoutRequestId: typeof item.checkoutRequestId === "string" ? item.checkoutRequestId : undefined,
      updatedAt: item.updatedAt,
      items: item.items.filter(isItem),
    };
  } catch {
    return emptyWorkout();
  }
}

export function saveWorkout(workout: WorkoutDraft, owner: string): void {
  localStorage.setItem(`${STORAGE_KEY}:${owner}`, JSON.stringify({ ...workout, updatedAt: new Date().toISOString() }));
}

export function clearWorkout(owner: string): WorkoutDraft {
  localStorage.removeItem(`${STORAGE_KEY}:${owner}`);
  return emptyWorkout();
}
