PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS custom_exercises (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL CHECK (length(name) BETWEEN 1 AND 50),
  body_part TEXT NOT NULL CHECK (body_part IN ('胸', '背', '腿', '肩', '手臂', '核心')),
  tracking TEXT NOT NULL CHECK (tracking IN ('reps', 'time')),
  rest_seconds INTEGER NOT NULL DEFAULT 60 CHECK (rest_seconds BETWEEN 0 AND 3600),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(discord_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_custom_exercises_user_created
  ON custom_exercises(user_id, created_at DESC);
