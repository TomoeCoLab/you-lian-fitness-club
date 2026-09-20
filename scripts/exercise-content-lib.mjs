import { createHash } from 'node:crypto';
export const sha256 = value => createHash('sha256').update(value).digest('hex');
const stable = value => Array.isArray(value) ? value.map(stable) : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(key => [key, stable(value[key])])) : value;
export const contentHash = record => sha256(JSON.stringify(stable({ exercise: record.exercise, definition: record.definition, sources: record.sources, plan: record.illustration.plan })));
export function effectiveReviews(record, actualImageHash) {
  const hash = contentHash(record);
  const { text, image, video } = record.review;
  return {
    text: text.status === 'source-checked' && text.reviewedContentHash !== hash ? 'stale' : text.status,
    image: image.status !== 'pending' && image.status !== 'blocked' && (image.reviewedContentHash !== hash || image.reviewedImageSha256 !== actualImageHash) ? 'stale' : image.status,
    video: video.status === 'spot-checked' && (video.reviewedEmbedUrl !== record.exercise.video.embedUrl || video.auditBaselineContentHash !== hash) ? 'stale' : video.status,
  };
}
export function validateRecord(record, id) {
  const fail = message => { throw new Error(`${id}: ${message}`); };
  if (record.schemaVersion !== 1 || record.exercise?.id !== id || !Number.isInteger(record.revision) || record.revision < 1) fail('invalid identity / schema');
  const e = record.exercise;
  if (!e.name || !['time','reps'].includes(e.tracking) || !Array.isArray(e.instructions) || e.instructions.length < 2 || !e.instructions.every(t=>typeof t==='string' && t.length) || !Array.isArray(e.cues) || !e.cues.length) fail('missing teaching content');
  const d = e.recommendation;
  if (!d || !Number.isInteger(d.sets) || d.sets < 1 || d.sets > 20 || !Number.isInteger(d.restSeconds) || d.restSeconds < 0 || !(e.tracking === 'time' ? Number.isInteger(d.durationSeconds) && d.durationSeconds > 0 && d.reps === null : Number.isInteger(d.reps) && d.reps > 0 && d.durationSeconds === null)) fail('invalid dose');
  if (!record.definition?.variation || !record.definition?.counting || !record.definition?.breathing || !record.definition.stopSignals?.length) fail('missing variation/counting/breathing/stop signals');
  if (!record.sources?.length || !record.sources.every(s=>/^https:\/\//.test(s.url) && Array.isArray(s.supports))) fail('invalid sources');
  for (const part of ['text','image','video']) if (!record.review?.[part]?.status || !Array.isArray(record.review[part].findings)) fail(`missing ${part} review`);
  if (!['pending','source-checked','blocked'].includes(record.review.text.status) || !['pending','visual-checked','needs-revision','blocked'].includes(record.review.image.status) || !['pending','spot-checked','blocked'].includes(record.review.video.status)) fail('unknown review status');
  if (record.review.text.status === 'source-checked' && !record.sources.some(s=>s.scope==='movement-specific' && s.checkedAt && s.supports.length)) fail('source-checked requires movement-specific evidence');
  for (const part of ['text','image','video']) {
    const review = record.review[part];
    if (review.status !== 'pending' && !/^\d{4}-\d{2}-\d{2}$/.test(review.reviewedAt ?? '')) fail(`${part}: reviewed status requires review date`);
  }
  if (record.review.video.fullPlaybackReviewed) fail('full playback approval is not supported by the current snapshot-only review schema');
  if (record.review.video.status === 'spot-checked') {
    const v = record.review.video;
    if (!v.check?.videoId || !v.check.seconds?.length || !v.check.seconds.every(n=>Number.isFinite(n) && n>=0) || !v.check.observation || !v.reviewedEmbedUrl) fail('spot check requires URL, timestamps and observations');
  }
  if (!record.illustration.path.startsWith('public/exercise-guides/skill-final/') || record.illustration.path.includes('..') || !/^[a-f0-9]{64}$/.test(record.illustration.sha256)) fail('invalid image path / hash');
  if (record.illustration.generatedFromContentHash !== null) {
    const generation=record.illustration.generation;
    if (!/^[a-f0-9]{64}$/.test(record.illustration.generatedFromContentHash) || !generation?.tool || !generation.prompt || !generation.generatedAt || !generation.characterReference?.name || !/^[a-f0-9]{64}$/.test(generation.characterReference.sha256)) fail('new image requires generation provenance and character reference digest');
  }
  const plan = record.illustration.plan;
  if (!['draft','ready'].includes(plan.status) || !Array.isArray(plan.frames)) fail('invalid illustration plan');
  if (plan.status === 'ready' && (!plan.camera || plan.frames.length < 2 || !plan.frames.every(f=>f.title && f.pose && f.caption))) fail('ready plan needs camera and explicit frame poses/captions');
}
export function assertPromptReady(record) {
  validateRecord(record, record.exercise.id);
  const status = effectiveReviews(record, record.illustration.sha256);
  if (status.text !== 'source-checked') throw new Error('文字來源尚未核對，或內容修改後未重驗；禁止直接產出正式圖解提示詞。');
  if (record.illustration.plan.status !== 'ready') throw new Error('分鏡尚未核准；先逐格寫清楚姿勢、視角與圖中文字。');
}
