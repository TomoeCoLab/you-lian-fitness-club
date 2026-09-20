import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import sharp from "sharp";
const root = new URL("../", import.meta.url);
const output = new URL("../public/exercise-guides/preview/", import.meta.url);
await mkdir(output, { recursive: true });
const manifest = {};
let originalBytes = 0, previewBytes = 0;
const ids = JSON.parse(await readFile(new URL('content/catalog.json', root), 'utf8'));
for (const id of ids) {
  const record = JSON.parse(await readFile(new URL(`content/exercises/${id}.json`, root), 'utf8'));
  const source = await readFile(new URL(record.illustration.path, root));
  const file = record.illustration.path.split('/').at(-1);
  const hash = createHash("sha256").update(source).digest("hex").slice(0, 12);
  const name = file.replace(".png", `.${hash}.webp`);
  const preview = await sharp(source).resize({ width: 960, withoutEnlargement: true }).webp({ quality: 84 }).toBuffer();
  await writeFile(new URL(name, output), preview);
  const { width, height } = await sharp(source).metadata();
  manifest[id] = { preview: `/exercise-guides/preview/${name}`, full: `/${record.illustration.path.slice('public/'.length)}?v=${hash}`, width, height };
  originalBytes += source.length; previewBytes += preview.length;
}
await writeFile(new URL("../src/data/guideAssets.json", import.meta.url), JSON.stringify(manifest, null, 2) + "\n");
console.log(`Guide previews: ${Object.keys(manifest).length}, ${(originalBytes / 1e6).toFixed(1)} MB → ${(previewBytes / 1e6).toFixed(1)} MB. Originals preserved.`);
