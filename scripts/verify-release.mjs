import { readFile } from "node:fs/promises";

const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
const changelog = await readFile(new URL("../CHANGELOG.md", import.meta.url), "utf8");
const version = packageJson.version;

if (!/^\d+\.\d+\.\d+$/.test(version)) {
  throw new Error(`package.json 版本不是有效的 Semantic Version：${version}`);
}

if (!changelog.includes(`## [${version}]`)) {
  throw new Error(`CHANGELOG.md 找不到 ${version} 的版本段落`);
}

console.log(`Release metadata verified: v${version}`);
