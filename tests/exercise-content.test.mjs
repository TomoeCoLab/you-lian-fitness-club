import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { contentHash, effectiveReviews, validateRecord, assertPromptReady, sha256 } from '../scripts/exercise-content-lib.mjs';

const root = new URL('../',import.meta.url);
const ids = JSON.parse(readFileSync(new URL('content/catalog.json',root),'utf8'));
const read = id => JSON.parse(readFileSync(new URL(`content/exercises/${id}.json`,root),'utf8'));

test('v1.9.0 expansion preserves legacy IDs and individually reviewed media', () => {
  const release=JSON.parse(readFileSync(new URL('content/releases/v1.9.0.json',root),'utf8'));
  assert.equal(release.added.length,53);
  assert.equal(release.replaced.length,21);
  assert.equal(release.excluded.length,1);
  for(const entry of [...release.added,...release.replaced]) {
    const r=read(entry.id);
    assert.equal(r.exercise.video.watchUrl,entry.video);
    assert.equal(r.review.video.status,'spot-checked');
    assert(r.review.video.check.seconds.length>=3,entry.id);
    assert(r.review.video.check.observation.length>10,entry.id);
  }
  for(const entry of release.added) {
    const r=read(entry.id);
    assert(r.illustration.generation.prompt.length>100,entry.id);
    assert.equal(r.illustration.plan.status,'ready');
    for(const h of r.illustration.history) assert.equal(sha256(readFileSync(new URL(h.path,root))),h.sha256,entry.id);
  }
  for(const entry of release.replaced) assert(read(entry.id).review.video.history.length>0,entry.id);
  assert(!ids.includes('machine-triceps-extension'));
  assert(ids.includes('dumbbell-triceps-extension'),'historical alias is retained');
});

test('every canonical exercise validates and image digest matches inspected original', () => {
  assert.equal(ids.length,129);
  assert.equal(new Set(ids).size,ids.length);
  for (const id of ids) {
    const r=read(id); validateRecord(r,id);
    const hash=sha256(readFileSync(new URL(r.illustration.path,root)));
    assert.equal(hash,r.illustration.sha256,id);
    assert.equal(hash,r.review.image.reviewedImageSha256,id);
    assert.equal(effectiveReviews(r,hash).text,'source-checked',id);
    assert.equal(effectiveReviews(r,hash).image,'visual-checked',id);
    assert.notEqual(effectiveReviews(r,hash).video,'stale',id);
    assert.equal(r.review.video.fullPlaybackReviewed,false,id);
  }
});

test('teaching edits invalidate independent text, image and video review checkpoints', () => {
  const r=read('chair-sit-to-stand');
  assert.deepEqual(effectiveReviews(r,r.illustration.sha256),{text:'source-checked',image:'visual-checked',video:'spot-checked'});
  r.exercise.instructions[0]+=' 修改';
  assert.deepEqual(effectiveReviews(r,r.illustration.sha256),{text:'stale',image:'stale',video:'stale'});
});

test('image replacement and video URL replacement cannot reuse prior approval', () => {
  const r=read('chair-sit-to-stand');
  assert.equal(effectiveReviews(r,'0'.repeat(64)).image,'stale');
  r.exercise.video.embedUrl+='?start=300';
  assert.equal(effectiveReviews(r,r.illustration.sha256).video,'stale');
});

test('repaired images retain rejected originals, reasons and independent checks', () => {
  for (const id of ['leg-curl','assisted-pull-up','machine-hip-adduction','machine-chest-press','figure-four-stretch']) {
    const r=read(id);
    assert.equal(r.review.image.status,'visual-checked',id);
    assert(r.illustration.history.some(h=>['blocked','needs-revision'].includes(h.review.status)),id);
    assert(r.review.image.findings[0].length>15,id);
    assert.match(r.illustration.path,/-v2-zh-tw\.png$/);
  }
  assert.equal(read('bird-dog').review.image.status,'visual-checked');
  for (const id of ['dead-bug','doorway-chest-stretch','supine-twist']) {
    const r=read(id); assert.equal(r.review.video.status,'spot-checked');
    assert(r.review.video.history.some(h=>h.review.status==='blocked'));
  }
});

test('mountain climber repair is traceable; unaccepted figure-four attempts cannot approve an image', () => {
  const r=read('mountain-climber');
  assert.equal(r.review.image.status,'visual-checked');
  assert.notEqual(r.illustration.generatedFromContentHash,contentHash(r));
  const beforeVideoRepair=structuredClone(r);
  beforeVideoRepair.exercise.video=r.review.video.history.at(-1).video;
  assert.equal(r.illustration.generatedFromContentHash,contentHash(beforeVideoRepair));
  assert.equal(r.illustration.history[0].review.status,'blocked');
  assert(r.illustration.generation.prompt.includes('NEAR right leg bends'));
  assert.equal(sha256(readFileSync(new URL(r.illustration.history[0].path,root))),r.illustration.history[0].sha256);
  const f=read('figure-four-stretch');
  assert.equal(f.illustration.generationAttempts.length,2);
  assert(f.illustration.generationAttempts.every(a=>a.status==='rejected'));
  assert.deepEqual(effectiveReviews(f,f.illustration.sha256),{text:'source-checked',image:'visual-checked',video:'spot-checked'});
  assert(f.illustration.generation.prompt.length>100);
  const rejected=structuredClone(f); rejected.review.image.status='blocked';
  assert.equal(effectiveReviews(rejected,rejected.illustration.sha256).image,'blocked');
});

test('repaired hip abduction asset retains rejected original and exact generation provenance', () => {
  const r=read('supported-hip-abduction');
  assert.equal(r.review.image.status,'visual-checked');
  assert.equal(r.illustration.generatedFromContentHash,contentHash(r));
  assert(r.illustration.generation.prompt.includes('NO sideways trunk lean'));
  assert.equal(r.illustration.history[0].review.status,'blocked');
  assert.notEqual(r.illustration.path,r.illustration.history[0].path);
  assert.equal(sha256(readFileSync(new URL(r.illustration.history[0].path,root))),r.illustration.history[0].sha256);
});

test('prompt export requires current source evidence AND an explicit ready plan', () => {
  assert.doesNotThrow(()=>assertPromptReady(read('bird-dog')));
  assert.throws(()=>assertPromptReady(read('chair-sit-to-stand')),/分鏡/);
  const pending=read('leg-curl'); pending.review.text.status='pending';
  assert.throws(()=>assertPromptReady(pending),/文字來源/);
  const changed=read('bird-dog'); changed.definition.counting='changed';
  assert.throws(()=>assertPromptReady(changed),/重驗/);
});

test('validation rejects invalid dose, path traversal and unsupported review claims', () => {
  const r=read('bird-dog');
  r.exercise.recommendation.reps=0;
  assert.throws(()=>validateRecord(r,'bird-dog'),/dose/);
  const image=read('bird-dog'); image.illustration.path='public/exercise-guides/skill-final/../other.png';
  assert.throws(()=>validateRecord(image,'bird-dog'),/path/);
  const v=read('bird-dog'); v.review.video.fullPlaybackReviewed=true;
  assert.throws(()=>validateRecord(v,'bird-dog'),/full playback/);
  const text=read('bird-dog'); text.sources=[];
  assert.throws(()=>validateRecord(text,'bird-dog'),/sources/);
  const provenance=read('supported-hip-abduction'); delete provenance.illustration.generation;
  assert.throws(()=>validateRecord(provenance,'supported-hip-abduction'),/provenance/);
});

test('content hash is independent of object key order and review-only annotations', () => {
  const r=read('bird-dog'), hash=contentHash(r);
  r.review.text.findings.push('A note does not change the teaching itself');
  r.exercise=Object.fromEntries(Object.entries(r.exercise).reverse());
  assert.equal(contentHash(r),hash);
});

test('checked video mappings preserve IDs and chapter boundaries; pending entries are explicit', () => {
  let pending=0,checked=0;
  for(const id of ids) {
    const r=read(id),v=r.review.video;
    if(v.status==='pending') { pending++; assert(v.findings.length,id); continue; }
    assert.equal(v.status,'spot-checked',id); checked++;
    const url=new URL(r.exercise.video.embedUrl);
    assert.equal(url.pathname,`/embed/${v.check.videoId}`,id);
    assert.equal(Number(url.searchParams.get('start')??0),v.check.start??0,id);
    assert.equal(Number(url.searchParams.get('end')??0),v.check.end??0,id);
    assert.equal(v.reviewedEmbedUrl,r.exercise.video.embedUrl,id);
    assert.equal(v.auditBaselineContentHash,contentHash(r),id);
  }
  assert.equal(pending,0); assert.equal(checked,129);
});
