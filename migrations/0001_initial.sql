PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  discord_id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  global_name TEXT,
  avatar_hash TEXT,
  guild_verified_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS checkins (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  checkin_date TEXT NOT NULL,
  mode TEXT NOT NULL CHECK (mode IN ('quick', 'standard', 'detailed')),
  workout_type TEXT,
  duration_minutes INTEGER CHECK (duration_minutes IS NULL OR (duration_minutes BETWEEN 1 AND 1440)),
  note TEXT CHECK (note IS NULL OR length(note) <= 200),
  exercises_json TEXT NOT NULL DEFAULT '[]',
  photo_key TEXT,
  photo_content_type TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(discord_id) ON DELETE CASCADE,
  UNIQUE (user_id, checkin_date)
);

CREATE INDEX IF NOT EXISTS idx_checkins_date ON checkins(checkin_date);
CREATE INDEX IF NOT EXISTS idx_checkins_user_date ON checkins(user_id, checkin_date);
