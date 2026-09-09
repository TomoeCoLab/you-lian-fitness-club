export type CheckinMode = "quick" | "standard" | "detailed";

export type User = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string | null;
  demo: boolean;
};

export type Exercise = {
  name: string;
  sets: number;
  weight: number;
  reps: number;
  entries?: ExerciseSetEntry[];
};

export type ExerciseSetEntry = {
  id: string;
  weight: number | null;
  reps: number | null;
  durationSeconds: number | null;
  completed: boolean;
};

export type BodyPart = "胸" | "背" | "腿" | "肩" | "手臂" | "核心";
export type Equipment =
  | "徒手"
  | "啞鈴"
  | "槓鈴"
  | "壺鈴"
  | "彈力帶"
  | "史密斯機"
  | "滑輪機"
  | "胸推機"
  | "蝴蝶機"
  | "高位下拉機"
  | "坐姿划船機"
  | "肩推機"
  | "腿推機"
  | "腿屈伸機"
  | "腿彎舉機"
  | "輔助引體機"
  | "臀推機"
  | "哈克深蹲機"
  | "小腿訓練機"
  | "羅馬椅"
  | "瑜珈墊";

export type ReactionKind = "strong" | "fire" | "clap";

export type ReactionSummary = {
  counts: Record<ReactionKind, number>;
  mine: ReactionKind | null;
};

export type GuideVideo = {
  embedUrl: string;
  watchUrl: string;
  title: string;
  channel: string;
  language: "中文" | "英文";
};

export type GuideExercise = {
  id: string;
  name: string;
  bodyParts: BodyPart[];
  equipment: Equipment;
  difficulty: "入門" | "進階";
  tracking: "reps" | "time";
  summary: string;
  instructions: string[];
  cues: string[];
  recommendation: {
    sets: number;
    reps: number | null;
    durationSeconds: number | null;
    restSeconds: number;
    load: string;
  };
  video: GuideVideo;
  sourceUrl: string;
  sourceLabel: string;
};

export type WorkoutItem = {
  exerciseId: string;
  exerciseName: string;
  bodyPart: BodyPart;
  tracking: "reps" | "time";
  restSeconds: number;
  entries: ExerciseSetEntry[];
};

export type WorkoutDraft = {
  workoutDate: string;
  startedAt: string;
  updatedAt: string;
  items: WorkoutItem[];
};

export type WorkoutTemplateItem = {
  exerciseId: string;
  exerciseName: string;
  bodyPart: BodyPart;
  tracking: "reps" | "time";
  restSeconds: number;
  sets: number;
  weight: number | null;
  reps: number | null;
  durationSeconds: number | null;
};

export type WorkoutTemplate = {
  id: string;
  name: string;
  items: WorkoutTemplateItem[];
  builtIn?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Checkin = {
  id: string;
  date: string;
  mode: CheckinMode;
  workoutType: string | null;
  durationMinutes: number | null;
  note: string | null;
  exercises: Exercise[];
  photoUrl: string | null;
  user: Omit<User, "demo">;
  createdAt: string;
  updatedAt: string;
  reactions: ReactionSummary;
};

export type CheckinDraft = {
  date: string;
  mode: CheckinMode;
  workoutType: string | null;
  durationMinutes: number | null;
  note: string | null;
  exercises: Exercise[];
};

export type AppConfig = {
  configured: boolean;
  demo: boolean;
  guildId: string;
  channelId: string;
};
