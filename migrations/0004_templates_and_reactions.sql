PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS workout_templates (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL CHECK (length(name) BETWEEN 1 AND 40),
  items_json TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(discord_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_workout_templates_user_updated
  ON workout_templates(user_id, updated_at DESC);

CREATE TABLE IF NOT EXISTS checkin_reactions (
  checkin_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  reaction TEXT NOT NULL CHECK (reaction IN ('strong', 'fire', 'clap')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (checkin_id, user_id),
  FOREIGN KEY (checkin_id) REFERENCES checkins(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(discord_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_checkin_reactions_checkin
  ON checkin_reactions(checkin_id);
