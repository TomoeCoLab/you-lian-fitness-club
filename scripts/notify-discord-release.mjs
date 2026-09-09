import { readFile } from "node:fs/promises";

const webhookUrl = process.env.DISCORD_RELEASE_WEBHOOK_URL;
const version = process.env.RELEASE_VERSION;
const repositoryUrl = process.env.REPOSITORY_URL;
if (!webhookUrl) throw new Error("缺少 DISCORD_RELEASE_WEBHOOK_URL");

const notes = await readFile(new URL("../.release-notes.md", import.meta.url), "utf8");
const description = notes.length > 3600 ? `${notes.slice(0, 3597)}...` : notes;
const response = await fetch(webhookUrl, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    username: "YOU LIAN Release Notes",
    allowed_mentions: { parse: [] },
    embeds: [{
      title: `有練 YOU LIAN · ${version}`,
      description,
      color: 13041408,
      url: `${repositoryUrl}/releases/tag/${version}`,
      footer: { text: "已完成測試、部署與 GitHub 推送" },
      timestamp: new Date().toISOString(),
    }],
  }),
});

if (!response.ok) throw new Error(`Discord 通知失敗：HTTP ${response.status}`);
console.log(`Discord release notification sent for ${version}`);
