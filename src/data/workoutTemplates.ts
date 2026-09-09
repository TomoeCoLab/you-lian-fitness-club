import type { WorkoutTemplate } from "../types";

const stamp = "2026-09-05T00:00:00.000Z";

export const builtInWorkoutTemplates: WorkoutTemplate[] = [
  {
    id: "builtin-full-body",
    name: "全身基礎",
    builtIn: true,
    createdAt: stamp,
    updatedAt: stamp,
    items: [
      { exerciseId: "bodyweight-squat", exerciseName: "徒手深蹲", bodyPart: "腿", tracking: "reps", restSeconds: 75, sets: 3, weight: null, reps: 10, durationSeconds: null },
      { exerciseId: "dumbbell-chest-press", exerciseName: "啞鈴胸推", bodyPart: "胸", tracking: "reps", restSeconds: 90, sets: 3, weight: null, reps: 10, durationSeconds: null },
      { exerciseId: "seated-row", exerciseName: "坐姿划船", bodyPart: "背", tracking: "reps", restSeconds: 75, sets: 3, weight: null, reps: 12, durationSeconds: null },
      { exerciseId: "front-plank", exerciseName: "前臂棒式", bodyPart: "核心", tracking: "time", restSeconds: 60, sets: 3, weight: null, reps: null, durationSeconds: 30 },
    ],
  },
  {
    id: "builtin-push",
    name: "上肢推力",
    builtIn: true,
    createdAt: stamp,
    updatedAt: stamp,
    items: [
      { exerciseId: "machine-chest-press", exerciseName: "器械胸推", bodyPart: "胸", tracking: "reps", restSeconds: 75, sets: 3, weight: null, reps: 12, durationSeconds: null },
      { exerciseId: "dumbbell-shoulder-press", exerciseName: "坐姿啞鈴肩推", bodyPart: "肩", tracking: "reps", restSeconds: 90, sets: 3, weight: null, reps: 10, durationSeconds: null },
      { exerciseId: "cable-triceps-pushdown", exerciseName: "滑輪三頭下壓", bodyPart: "手臂", tracking: "reps", restSeconds: 60, sets: 3, weight: null, reps: 12, durationSeconds: null },
    ],
  },
  {
    id: "builtin-lower-body",
    name: "下肢入門",
    builtIn: true,
    createdAt: stamp,
    updatedAt: stamp,
    items: [
      { exerciseId: "leg-press", exerciseName: "腿推", bodyPart: "腿", tracking: "reps", restSeconds: 90, sets: 3, weight: null, reps: 12, durationSeconds: null },
      { exerciseId: "leg-extension", exerciseName: "腿屈伸", bodyPart: "腿", tracking: "reps", restSeconds: 60, sets: 3, weight: null, reps: 12, durationSeconds: null },
      { exerciseId: "leg-curl", exerciseName: "坐姿腿彎舉", bodyPart: "腿", tracking: "reps", restSeconds: 60, sets: 3, weight: null, reps: 12, durationSeconds: null },
      { exerciseId: "standing-calf-raise", exerciseName: "站姿提踵", bodyPart: "腿", tracking: "reps", restSeconds: 60, sets: 3, weight: null, reps: 15, durationSeconds: null },
    ],
  },
  {
    id: "builtin-daily-bodyweight",
    name: "每日徒手套餐",
    builtIn: true,
    createdAt: stamp,
    updatedAt: stamp,
    items: [
      { exerciseId: "bodyweight-squat", exerciseName: "徒手深蹲", bodyPart: "腿", tracking: "reps", restSeconds: 45, sets: 2, weight: null, reps: 12, durationSeconds: null },
      { exerciseId: "incline-push-up", exerciseName: "斜板伏地挺身", bodyPart: "胸", tracking: "reps", restSeconds: 45, sets: 2, weight: null, reps: 10, durationSeconds: null },
      { exerciseId: "reverse-lunge", exerciseName: "反向弓箭步", bodyPart: "腿", tracking: "reps", restSeconds: 45, sets: 2, weight: null, reps: 8, durationSeconds: null },
      { exerciseId: "glute-bridge", exerciseName: "臀橋", bodyPart: "腿", tracking: "reps", restSeconds: 45, sets: 2, weight: null, reps: 12, durationSeconds: null },
      { exerciseId: "bird-dog", exerciseName: "鳥狗式", bodyPart: "核心", tracking: "reps", restSeconds: 30, sets: 2, weight: null, reps: 8, durationSeconds: null },
      { exerciseId: "dead-bug", exerciseName: "死蟲式", bodyPart: "核心", tracking: "reps", restSeconds: 30, sets: 2, weight: null, reps: 8, durationSeconds: null },
    ],
  },
  {
    id: "builtin-bedtime-flexibility",
    name: "睡前柔軟度套餐",
    builtIn: true,
    createdAt: stamp,
    updatedAt: stamp,
    items: [
      { exerciseId: "cat-cow", exerciseName: "貓牛式", bodyPart: "背", tracking: "time", restSeconds: 15, sets: 1, weight: null, reps: null, durationSeconds: 45 },
      { exerciseId: "child-pose", exerciseName: "嬰兒式", bodyPart: "背", tracking: "time", restSeconds: 15, sets: 1, weight: null, reps: null, durationSeconds: 45 },
      { exerciseId: "kneeling-hip-flexor-stretch", exerciseName: "跪姿髖屈肌伸展", bodyPart: "腿", tracking: "time", restSeconds: 15, sets: 2, weight: null, reps: null, durationSeconds: 30 },
      { exerciseId: "figure-four-stretch", exerciseName: "仰躺四字臀部伸展", bodyPart: "腿", tracking: "time", restSeconds: 15, sets: 2, weight: null, reps: null, durationSeconds: 30 },
      { exerciseId: "supine-twist", exerciseName: "仰躺脊椎扭轉", bodyPart: "背", tracking: "time", restSeconds: 15, sets: 2, weight: null, reps: null, durationSeconds: 30 },
      { exerciseId: "butterfly-stretch", exerciseName: "蝴蝶式伸展", bodyPart: "腿", tracking: "time", restSeconds: 15, sets: 1, weight: null, reps: null, durationSeconds: 45 },
    ],
  },
];
