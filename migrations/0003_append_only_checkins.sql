PRAGMA defer_foreign_keys = true;

CREATE TABLE checkins_append_only (
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
  photo_size_bytes INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(discord_id) ON DELETE CASCADE
);

INSERT INTO checkins_append_only (
  id, user_id, checkin_date, mode, workout_type, duration_minutes, note,
  exercises_json, photo_key, photo_content_type, photo_size_bytes, created_at, updated_at
)
SELECT
  id, user_id, checkin_date, mode, workout_type, duration_minutes, note,
  exercises_json, photo_key, photo_content_type, photo_size_bytes, created_at, updated_at
FROM checkins;

DROP TABLE checkins;
ALTER TABLE checkins_append_only RENAME TO checkins;

CREATE INDEX idx_checkins_date ON checkins(checkin_date);
CREATE INDEX idx_checkins_user_date ON checkins(user_id, checkin_date);
CREATE INDEX idx_checkins_date_created ON checkins(checkin_date, created_at);
