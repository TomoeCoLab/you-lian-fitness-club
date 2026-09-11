import type { CustomExercise } from "../types";

const STORAGE_KEY = "you-lian:custom-exercises:v1";

export function loadCustomExercises(): CustomExercise[] {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as CustomExercise[];
    return Array.isArray(value) ? value.filter((item) => item?.id && item?.name) : [];
  } catch {
    return [];
  }
}

export function saveCustomExercise(exercise: CustomExercise): CustomExercise[] {
  const next = [exercise, ...loadCustomExercises()];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}
