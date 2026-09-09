function positiveLimit(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function currentUtcMonth(): string {
  return new Date().toISOString().slice(0, 7);
}

async function reserveMonthlyOperation(
  env: Env,
  kind: "class_a_ops" | "class_b_ops",
  limit: number,
): Promise<boolean> {
  const initialA = kind === "class_a_ops" ? 1 : 0;
  const initialB = kind === "class_b_ops" ? 1 : 0;
  const result = await env.DB.prepare(
    `INSERT INTO r2_monthly_usage (month, class_a_ops, class_b_ops)
     VALUES (?, ?, ?)
     ON CONFLICT(month) DO UPDATE SET
       ${kind} = ${kind} + 1,
       updated_at = CURRENT_TIMESTAMP
     RETURNING ${kind} AS usage`,
  )
    .bind(currentUtcMonth(), initialA, initialB)
    .first<{ usage: number }>();
  return Boolean(result && result.usage <= limit);
}

export async function reservePhotoUpload(
  env: Env,
  incomingBytes: number,
): Promise<"ok" | "storage-limit" | "operation-limit"> {
  const storage = await env.DB.prepare("SELECT COALESCE(SUM(photo_size_bytes), 0) AS bytes FROM checkins")
    .first<{ bytes: number }>();
  const currentBytes = storage?.bytes ?? 0;
  const storageLimit = positiveLimit(env.R2_STORAGE_LIMIT_BYTES, 8 * 1024 * 1024 * 1024);
  if (currentBytes + incomingBytes > storageLimit) return "storage-limit";

  const operationLimit = positiveLimit(env.R2_CLASS_A_MONTHLY_LIMIT, 10_000);
  return (await reserveMonthlyOperation(env, "class_a_ops", operationLimit)) ? "ok" : "operation-limit";
}

export async function reservePhotoRead(env: Env): Promise<boolean> {
  const operationLimit = positiveLimit(env.R2_CLASS_B_MONTHLY_LIMIT, 50_000);
  return reserveMonthlyOperation(env, "class_b_ops", operationLimit);
}
