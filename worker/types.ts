export type CheckinMode = "quick" | "standard" | "detailed";
export type ReactionKind = "strong" | "fire" | "clap";

export type ReactionSummary = {
  counts: Record<ReactionKind, number>;
  mine: ReactionKind | null;
};

export type SessionUser = {
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

export type CheckinInput = {
  date: string;
  mode: CheckinMode;
  workoutType: string | null;
  durationMinutes: number | null;
  note: string | null;
  exercises: Exercise[];
};

export type CheckinRecord = CheckinInput & {
  id: string;
  user: {
    id: string;
    username: string;
    displayName: string;
    avatarUrl: string | null;
  };
  photoUrl: string | null;
  createdAt: string;
  updatedAt: string;
  reactions: ReactionSummary;
};

export type WorkoutTemplateItem = {
  exerciseId: string;
  exerciseName: string;
  bodyPart: "胸" | "背" | "腿" | "肩" | "手臂" | "核心";
  tracking: "reps" | "time";
  restSeconds: number;
  sets: number;
  weight: number | null;
  reps: number | null;
  durationSeconds: number | null;
};

export type WorkoutTemplateRecord = {
  id: string;
  name: string;
  items: WorkoutTemplateItem[];
  createdAt: string;
  updatedAt: string;
};
