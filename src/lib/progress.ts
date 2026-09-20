import type { Checkin, GuideExercise } from "../types";
import { canonicalExerciseId } from "./exerciseGuidance";
import { weightLabel } from "./weightLabel";

export function exerciseHistory(exercise: GuideExercise, checkins: Checkin[]) {
  return [...checkins].sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt))
    .flatMap(checkin => checkin.exercises.filter(entry => entry.exerciseId ? canonicalExerciseId(entry.exerciseId) === canonicalExerciseId(exercise.id) : entry.name === exercise.name || canonicalExerciseId(exercise.id) === "dumbbell-overhead-triceps-extension" && entry.name === "啞鈴三頭伸展").map(entry => ({
      date: checkin.date,
      sets: entry.entries ? entry.entries.filter(set => set.completed) : [{ weight: entry.weight, reps: entry.reps, durationSeconds: null, completed: true }],
    })));
}

export function progressSuggestion(exercise: GuideExercise, checkins: Checkin[]): { title: string; detail: string; meta: string } {
  const latest = exerciseHistory(exercise, checkins).find(session => session.sets.length > 0);
  if (!latest) return { title: "先從舒服、可控制的份量開始", detail: exercise.recommendation.load, meta: "課表份量優先；單獨練習參考不是必須達成的目標。" };
  if (exercise.tracking === "time") {
    const seconds = Math.max(0, ...latest.sets.map(set => set.durationSeconds ?? 0));
    return { title: "依今天狀態維持或減量", detail: "計時包含熱身、伸展與核心練習，不會自動要求加秒。舒服幅度、穩定姿勢與自然呼吸優先。", meta: `最近 ${latest.date} · ${latest.sets.length} 組${seconds ? ` · 最長 ${seconds} 秒` : " · 舊紀錄未保存秒數"}` };
  }
  // Weight and repetitions must come from the same completed set.
  const best = [...latest.sets].sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0) || (b.reps ?? 0) - (a.reps ?? 0))[0];
  return { title: "先穩定完成，不自動加重", detail: exercise.equipment === "輔助引體機"
    ? "這裡記錄的是輔助重量：輔助越大通常越容易，不以公斤增加代表進步。"
    : "確認所有組都能控制、沒有不適並保留餘力，再依器材最小增量調整；單次最佳組不代表已適合加重。",
    meta: `最近 ${latest.date} · 實際一組：${weightLabel(best.weight, exercise.equipment)} × ${best.reps ?? "—"} 次` };
}

export function progressOverview(checkins: Checkin[]) {
  const sessionCount = checkins.length;
  const totalSets = checkins.reduce((sum, checkin) => sum + checkin.exercises.reduce((exerciseSum, exercise) => exerciseSum + (exercise.entries ? exercise.entries.filter(entry => entry.completed).length : exercise.sets), 0), 0);
  const totalMinutes = checkins.reduce((sum, checkin) => sum + (checkin.durationMinutes ?? 0), 0);
  const exerciseCounts = new Map<string, number>();
  for (const checkin of checkins) for (const exercise of checkin.exercises) exerciseCounts.set(exercise.name, (exerciseCounts.get(exercise.name) ?? 0) + 1);
  const favorite = [...exerciseCounts].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "尚無資料";
  return { sessionCount, trainingDays: new Set(checkins.map(checkin => checkin.date)).size, totalSets, totalMinutes, favorite };
}
