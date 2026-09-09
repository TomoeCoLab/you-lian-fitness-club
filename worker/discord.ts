import type { CheckinRecord } from "./types";

const modeLabels = {
  quick: "快速打卡",
  standard: "一般紀錄",
  detailed: "完整訓練",
} as const;

function escapeMarkdown(value: string): string {
  return value.replace(/[\\`*_{}\[\]()#+\-.!|>~]/gu, "\\$&");
}

export async function sendCheckinWebhook(env: Env, checkin: CheckinRecord): Promise<void> {
  if (!env.DISCORD_WEBHOOK_URL) return;
  const fields: Array<{ name: string; value: string; inline?: boolean }> = [
    { name: "打卡模式", value: modeLabels[checkin.mode], inline: true },
  ];
  if (checkin.workoutType) fields.push({ name: "訓練內容", value: escapeMarkdown(checkin.workoutType), inline: true });
  if (checkin.durationMinutes) fields.push({ name: "訓練時長", value: `${checkin.durationMinutes} 分鐘`, inline: true });
  if (checkin.exercises.length > 0) {
    fields.push({
      name: "動作紀錄",
      value: checkin.exercises
        .slice(0, 5)
        .map((exercise) => {
          const entries = exercise.entries?.filter((entry) => entry.completed).slice(0, 4) ?? [];
          const detail = entries.length > 0
            ? entries.map((entry) => entry.durationSeconds ? `${entry.durationSeconds}秒` : `${entry.weight ?? 0}kg×${entry.reps ?? 0}`).join(" / ")
            : `${exercise.sets} 組 × ${exercise.reps} 次 @ ${exercise.weight} kg`;
          return `• ${escapeMarkdown(exercise.name)} — ${detail}`;
        })
        .join("\n"),
    });
  }

  const response = await fetch(env.DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "有練 · YOU LIAN",
      allowed_mentions: { parse: [] },
      embeds: [
        {
          author: {
            name: checkin.user.displayName,
            icon_url: checkin.user.avatarUrl ?? undefined,
          },
          title: `🏋️ ${checkin.user.displayName} 今天有練`,
          description: checkin.note ? escapeMarkdown(checkin.note) : `${checkin.date} 完成訓練打卡。`,
          color: 1414215,
          fields,
          timestamp: new Date().toISOString(),
          footer: { text: "YOU LIAN · 私人健身打卡" },
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Discord webhook returned ${response.status}`);
  }
}
