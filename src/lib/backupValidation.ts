const parts = ["胸", "背", "腿", "肩", "手臂", "核心"];
const text = (value: unknown, max = 200) => typeof value === "string" && value.length <= max;
const number = (value: unknown, max: number, min = 0) => typeof value === "number" && Number.isFinite(value) && value >= min && value <= max;
const nullableNumber = (value: unknown, max: number) => value === null || number(value, max);
const nullableCount = (value: unknown, max: number) => value === null || number(value, max) && Number.isInteger(value);
const phase = (value: unknown) => value === undefined || ["warmup", "main", "cooldown"].includes(String(value));
export function validBackupEntry(value: any): boolean {
  return Boolean(value && text(value.id, 80) && nullableNumber(value.weight, 1000) && nullableCount(value.reps, 1000) && nullableCount(value.durationSeconds, 86400) && typeof value.completed === "boolean");
}
export function validBackupExercise(value: any): boolean {
  return Boolean(value && text(value.name, 50) && number(value.sets, 100, 1) && number(value.weight, 1000) && number(value.reps, 1000, 1) && phase(value.phase)
    && (value.note === undefined || text(value.note)) && (value.entries === undefined || Array.isArray(value.entries) && value.entries.length <= 100 && value.entries.every(validBackupEntry)));
}
export function validBackupWorkout(value: any): boolean {
  return Boolean(value && text(value.startedAt) && text(value.updatedAt) && text(value.workoutDate) && Array.isArray(value.items) && value.items.length <= 20 && value.items.every((item: any) => item && text(item.exerciseId, 100) && text(item.exerciseName, 50) && parts.includes(item.bodyPart) && ["time", "reps"].includes(item.tracking) && number(item.restSeconds, 3600) && phase(item.phase) && (item.note === undefined || text(item.note)) && Array.isArray(item.entries) && item.entries.length <= 100 && item.entries.every(validBackupEntry)));
}
export function validBackupTemplate(value: any): boolean {
  return Boolean(value && text(value.id) && text(value.name, 40) && Array.isArray(value.items) && value.items.length <= 20 && value.items.every((item: any) => item && text(item.exerciseId, 100) && text(item.exerciseName, 50) && parts.includes(item.bodyPart) && ["time", "reps"].includes(item.tracking) && number(item.restSeconds, 3600) && number(item.sets, 20, 1) && phase(item.phase) && nullableNumber(item.weight, 1000) && nullableNumber(item.reps, 1000) && nullableNumber(item.durationSeconds, 86400) && (item.entries === undefined || Array.isArray(item.entries) && item.entries.length === item.sets && item.entries.every((entry: any) => validBackupEntry({ ...entry, id: "template", completed: false })))));
}
export function validBackupCustom(value: any): boolean {
  return Boolean(value && text(value.id) && text(value.name, 50) && parts.includes(value.bodyPart) && ["time", "reps"].includes(value.tracking) && number(value.restSeconds, 3600) && text(value.createdAt));
}
