import { readFile, writeFile } from "node:fs/promises";

const version = process.argv[2]?.replace(/^v/, "");
if (!version) throw new Error("請提供版本，例如 v1.0.0");

const changelog = await readFile(new URL("../CHANGELOG.md", import.meta.url), "utf8");
const escaped = version.replaceAll(".", "\\.");
const match = changelog.match(new RegExp(`## \\[${escaped}\\][^\\n]*\\n([\\s\\S]*?)(?=\\n## \\[|\\n\\[[^\\n]+\\]:|$)`));
if (!match) throw new Error(`找不到 v${version} 的更新紀錄`);

const notes = match[1].trim();
await writeFile(new URL("../.release-notes.md", import.meta.url), `${notes}\n`, "utf8");
console.log(notes);
