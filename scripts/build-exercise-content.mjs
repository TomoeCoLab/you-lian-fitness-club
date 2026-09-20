import { readFile, writeFile, readdir } from 'node:fs/promises';
import { contentHash, effectiveReviews, sha256, validateRecord } from './exercise-content-lib.mjs';
const root = new URL('../', import.meta.url);
const ids = JSON.parse(await readFile(new URL('content/catalog.json',root),'utf8'));
if (new Set(ids).size !== ids.length || !ids.every(id=>/^[a-z0-9-]+$/.test(id))) throw new Error('Invalid or duplicate catalog IDs');
const files = (await readdir(new URL('content/exercises/',root))).filter(f=>f.endsWith('.json'));
if (files.length !== ids.length || files.some(f=>!ids.includes(f.slice(0,-5)))) throw new Error('Orphan / missing exercise records');
const runtime = [], reviews = {}, documents = [], index = [];
const totals = { text: {}, image: {}, video: {} };
const labels = { pending:'待核對', 'source-checked':'文字來源已核對', 'visual-checked':'已視覺檢查（非專業認證）', 'needs-revision':'需修訂', blocked:'已停用', 'spot-checked':'僅片段抽查', stale:'內容變更，需重驗' };
for (const id of ids) {
  const r = JSON.parse(await readFile(new URL(`content/exercises/${id}.json`,root),'utf8'));
  validateRecord(r,id);
  const imageHash = sha256(await readFile(new URL(r.illustration.path,root)));
  if (imageHash !== r.illustration.sha256) throw new Error(`${id}: image changed; update asset metadata and re-review`);
  const hash = contentHash(r), status = effectiveReviews(r,imageHash);
  for (const part of ['text','image','video']) totals[part][status[part]] = (totals[part][status[part]] ?? 0) + 1;
  runtime.push(r.exercise);
  // Historical rejected mappings belong in the canonical record, not the client bundle.
  const { history: videoHistory, ...currentVideoReview } = r.review.video;
  reviews[id] = { revision:r.revision, contentHash:hash, ...r.definition, text:{...r.review.text,status:status.text}, image:{...r.review.image,status:status.image}, video:{...currentVideoReview,status:status.video} };
  index.push(`| [${r.exercise.name}](#${id}) | ${labels[status.text]} | ${labels[status.image]} | ${labels[status.video]} |`);
  documents.push(`<a id="${id}"></a>\n## ${r.exercise.name}\n\n- ID：\`${id}\`；內容修訂：${r.revision}\n- 內容 SHA-256：\`${hash}\`\n- 唯一編輯來源：[JSON](../content/exercises/${id}.json)\n- 指定版本：${r.definition.variation}\n- 器材：${r.exercise.equipment}\n- 計數：${r.definition.counting}\n- 呼吸：${r.definition.breathing}\n- 份量性質：${r.definition.doseBasis}\n\n### 教學\n\n${r.exercise.instructions.map((x,i)=>`${i+1}. ${x}`).join('\n')}\n\n### 重點與停止條件\n\n${[...r.exercise.cues,...r.definition.stopSignals].map(x=>`- ${x}`).join('\n')}\n\n### 起始參考份量\n\n${r.exercise.recommendation.sets} 組 × ${r.exercise.tracking==='time'?`${r.exercise.recommendation.durationSeconds} 秒`:`${r.exercise.recommendation.reps} 次`}；組間休息 ${r.exercise.recommendation.restSeconds} 秒。${r.exercise.recommendation.load}\n\n### 證據與限制\n\n${r.sources.map(s=>`- [${s.label}](${s.url}) — ${s.scope}；核對日期：${s.checkedAt??'尚未'}；支持：${s.supports.join('、')||'尚未確認'}。${s.note}`).join('\n')}\n\n${['text','image','video'].map(part=>`- ${part}：${labels[status[part]]}。${r.review[part].findings.join('；')}`).join('\n')}\n- 影片：[${r.exercise.video.title}](${r.exercise.video.watchUrl})；完整逐段觀看：${r.review.video.fullPlaybackReviewed?'是':'否'}。影片片段抽查不是整體內容認證。\n- 原圖：\`${r.illustration.path}\`；SHA-256：\`${imageHash}\`\n- 原圖生成所依文字版本：${r.illustration.generatedFromContentHash??'未知（歷史資產）'}，不得事後填成目前版本。\n\n### 後續產圖分鏡\n\n狀態：${r.illustration.plan.status}；鏡頭：${r.illustration.plan.camera??'待指定'}\n\n${r.illustration.plan.frames.length?r.illustration.plan.frames.map((f,i)=>`${i+1}. **${f.title}**：${f.pose}\n   - 圖中文字：${f.caption}`).join('\n'):'尚未核准；不得僅將現有教學句子貼成提示詞就標示產圖就緒。'}\n`);
  const clip = r.review.video.check;
  documents[documents.length-1] += `\n### 影片核對紀錄\n\n- 嵌入網址：${r.exercise.video.embedUrl}\n- 已核對嵌入網址：${r.review.video.reviewedEmbedUrl ?? '尚未'}\n- 實際檢查秒點：${clip?.seconds?.join('、') || '尚未'}\n- 播放區間：${clip ? `${clip.start ?? 0} 秒起，${clip.end ? `${clip.end} 秒止` : '原片結尾'}` : '尚未核准'}\n- 可見內容：${clip?.observation ?? '尚未取得足夠證據'}\n- 新舊影片配對與停用原因保留在 JSON 的 review.video.history；產圖實際提示詞、角色摘要及舊圖保留在 illustration。\n`;
}
const outputs = [
  ['src/data/exerciseCatalog.generated.ts', `// Generated from content/exercises/*.json. Do not edit.\nimport type { GuideExercise } from '../types';\nexport const exerciseCatalog: GuideExercise[] = ${JSON.stringify(runtime,null,2)};\n`],
  ['src/data/contentReviews.generated.ts', `// Generated from content/exercises/*.json. Do not edit.\nimport type { ContentAudit } from '../lib/contentAudit';\nexport const contentReviews: Record<string, ContentAudit> = ${JSON.stringify(reviews,null,2)};\n`],
  ['docs/exercise-content.md', `# 動作內容總冊\n\n此檔由 content/exercises/*.json 生成，不在此直接修改。共 ${ids.length} 項（含歷史相容項目）。各項狀態分開判斷；沒有任何項目因影片能播放便獲得醫療或專業認證。\n\n## 目前核對進度（自動計算）\n\n${Object.entries(totals).map(([part, counts])=>`- ${part}：${Object.entries(counts).map(([status,n])=>`${labels[status]} ${n} 項`).join('；')}。`).join('\n')}\n\n## 逐項索引\n\n| 動作 | 文字 | 圖片 | 影片 |\n|---|---|---|---|\n${index.join('\n')}\n\n${documents.join('\n')}\n`],
];
for (const [path,output] of outputs) {
  const text=output.trimEnd()+'\n';
  if (process.argv.includes('--check')) { if (await readFile(new URL(path,root),'utf8').catch(()=>null) !== text) throw new Error(`${path}: stale generated content; run npm run content:build`); }
  else await writeFile(new URL(path,root),text);
}
console.log(`Content ${process.argv.includes('--check')?'verified':'built'}: ${ids.length} records; no review statuses promoted automatically.`);
