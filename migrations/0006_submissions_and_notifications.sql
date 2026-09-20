ALTER TABLE checkins ADD COLUMN submission_hash TEXT;
CREATE TABLE notification_outbox (
  checkin_id TEXT PRIMARY KEY REFERENCES checkins(id) ON DELETE CASCADE,
  state TEXT NOT NULL DEFAULT 'pending' CHECK(state IN ('pending','processing','sent','failed')),
  attempts INTEGER NOT NULL DEFAULT 0,
  next_attempt INTEGER NOT NULL DEFAULT 0,
  lease_until INTEGER NOT NULL DEFAULT 0,
  last_error TEXT,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_notification_due ON notification_outbox(state, next_attempt);
