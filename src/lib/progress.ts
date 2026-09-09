import type { Checkin, GuideExercise } from "../types";

type ExercisePerformance = {
  date: string;
  sets: number;
  maxWeight: number;
  maxReps: number;
  maxDuration: number;
};

export function exerciseHistory(exercise: GuideExercise, checkins: Checkin[]): ExercisePerformance[] {
  return checkins.flatMap((checkin) => checkin.exercises
    .filter((entry) => entry.name === exercise.name)
    .map((entry) => {
      const completed = entry.entries?.filter((set) => set.completed) ?? [];
      return {
        date: checkin.date,
        sets: completed.length || entry.sets,
        maxWeight: Math.max(entry.weight || 0, ...completed.map((set) => set.weight ?? 0)),
        maxReps: Math.max(entry.reps || 0, ...completed.map((set) => set.reps ?? 0)),
        maxDuration: Math.max(0, ...completed.map((set) => set.durationSeconds ?? 0)),
      };
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function progressSuggestion(exercise: GuideExercise, checkins: Checkin[]): { title: string; detail: string; meta: string } {
  const history = exerciseHistory(exercise, checkins);
  if (history.length === 0) return {
    title: "從建議值開始",
    detail: exercise.recommendation.load,
    meta: "完成第一次紀錄後，這裡會依你的歷史表現調整。",
  };
  const latest = history[0];
  if (exercise.tracking === "time") {
    const target = exercise.recommendation.durationSeconds ?? 30;
    const next = latest.maxDuration >= target ? latest.maxDuration + 5 : target;
    return { title: `下次試試 ${next} 秒`, detail: "姿勢穩定、呼吸自然時再增加 5 秒。", meta: `上次 ${latest.date} · ${latest.sets} 組 · 最長 ${latest.maxDuration || target} 秒` };
  }
  const target = exercise.recommendation.reps ?? 10;
  if (latest.maxWeight > 0 && latest.maxReps >= target) {
    const increment = exercise.equipment === "啞鈴" ? 1 : exercise.bodyParts.includes("腿") ? 5 : 2.5;
    return { title: `可嘗試 ${latest.maxWeight + increment} kg`, detail: `先做一組；若無法保留約 2 次餘力，就回到 ${latest.maxWeight} kg。`, meta: `上次 ${latest.date} · ${latest.maxWeight} kg × ${latest.maxReps} 次` };
  }
  return { title: latest.maxWeight > 0 ? `先維持 ${latest.maxWeight} kg` : `目標 ${target} 次`, detail: `先穩定完成 ${target} 次與建議組數，再考慮加重。`, meta: `上次 ${latest.date} · ${latest.sets} 組 · 最多 ${latest.maxReps} 次` };
}

export function progressOverview(checkins: Checkin[]) {
  const sessionCount = checkins.length;
  const totalSets = checkins.reduce((sum, checkin) => sum + checkin.exercises.reduce((exerciseSum, exercise) => exerciseSum + (exercise.entries?.filter((entry) => entry.completed).length || exercise.sets), 0), 0);
  const totalMinutes = checkins.reduce((sum, checkin) => sum + (checkin.durationMinutes ?? 0), 0);
  const exerciseCounts = new Map<string, number>();
  for (const checkin of checkins) for (const exercise of checkin.exercises) exerciseCounts.set(exercise.name, (exerciseCounts.get(exercise.name) ?? 0) + 1);
  const favorite = [...exerciseCounts].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "尚無資料";
  return { sessionCount, totalSets, totalMinutes, favorite };
}
