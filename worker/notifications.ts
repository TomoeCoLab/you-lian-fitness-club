import { getCheckinById } from "./checkins";
import { sendCheckinWebhook } from "./discord";

export async function deliverNotification(env: Env, id: string): Promise<void> {
  if (!env.DISCORD_WEBHOOK_URL) return;
  const now = Date.now();
  const claimed = await env.DB.prepare(`UPDATE notification_outbox SET state = 'processing', attempts = attempts + 1, lease_until = ?, updated_at = CURRENT_TIMESTAMP
    WHERE checkin_id = ? AND attempts < 5 AND ((state = 'pending' AND next_attempt <= ?) OR (state = 'processing' AND lease_until < ?)) RETURNING attempts`)
    .bind(now + 120000, id, now, now).first<{ attempts: number }>();
  if (!claimed) return;
  try {
    const record = await getCheckinById(env, id);
    if (!record) return;
    await sendCheckinWebhook(env, record);
    await env.DB.prepare("UPDATE notification_outbox SET state = 'sent', last_error = NULL, updated_at = CURRENT_TIMESTAMP WHERE checkin_id = ?").bind(id).run();
  } catch (error) {
    // Do not persist webhook URLs, tokens or raw fetch errors.
    const reason = error instanceof Error && /^Discord webhook returned \d+$/.test(error.message) ? error.message : "通知發送失敗或逾時";
    await env.DB.prepare("UPDATE notification_outbox SET state = ?, last_error = ?, next_attempt = ?, updated_at = CURRENT_TIMESTAMP WHERE checkin_id = ?")
      .bind(claimed.attempts >= 5 ? "failed" : "pending", reason, now + Math.min(3600000, 60000 * 2 ** claimed.attempts), id).run();
    console.error(JSON.stringify({ message: "discord_notification_retry", checkinId: id, attempt: claimed.attempts, reason }));
  }
}

export async function retryNotifications(env: Env): Promise<void> {
  if (!env.DISCORD_WEBHOOK_URL) return;
  await env.DB.prepare("UPDATE notification_outbox SET state = 'failed', last_error = '發送結果未確認，請聯絡站主', updated_at = CURRENT_TIMESTAMP WHERE state = 'processing' AND attempts >= 5 AND lease_until < ?").bind(Date.now()).run();
  const due = await env.DB.prepare("SELECT checkin_id FROM notification_outbox WHERE attempts < 5 AND ((state = 'pending' AND next_attempt <= ?) OR (state = 'processing' AND lease_until < ?)) ORDER BY next_attempt LIMIT 10")
    .bind(Date.now(), Date.now()).all<{ checkin_id: string }>();
  await Promise.all(due.results.map(row => deliverNotification(env, row.checkin_id)));
}

export async function listNotifications(env: Env, userId: string) {
  const result = await env.DB.prepare(`SELECT n.checkin_id AS checkinId, c.checkin_date AS date, n.state, n.attempts, n.last_error AS error, n.updated_at AS updatedAt
    FROM notification_outbox n JOIN checkins c ON c.id = n.checkin_id WHERE c.user_id = ? ORDER BY c.created_at DESC LIMIT 20`).bind(userId).all();
  return result.results;
}
