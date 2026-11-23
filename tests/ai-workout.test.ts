import { test } from 'node:test';
import assert from 'node:assert/strict';
import { aiExample, parseAiWorkout, aiPrompt } from '../src/lib/aiWorkout.ts';
import { publicAiResponse } from '../worker/ai-docs.ts';

test('AI import preserves exact per-set doses, repeated movement order and code fences', () => {
  const input = structuredClone(aiExample);
  input.items[0].sets = [{ reps: 4 }, { reps: 9 }];
  input.items.push({ ...input.items[0], phase: 'cooldown' });
  const result = parseAiWorkout('```json\n'+JSON.stringify(input)+'\n```', []);
  assert.deepEqual(result.items.map(i=>i.phase), ['main','cooldown']);
  assert.deepEqual(result.items[0].entries.map(e=>e.reps), [4,9]);
  assert.ok(result.items.every(i=>i.entries.every(e=>!e.completed)));
  assert.notEqual(result.items[0].instanceId, result.items[1].instanceId);
});
test('AI import resolves existing custom IDs and stages new customs without saving', () => {
  const custom = {id:'old-permanent-id',name:'測試動作',bodyPart:'腿' as const,tracking:'time' as const,restSeconds:45,createdAt:''};
  const input = { ...aiExample, items: [{exerciseId:custom.id,phase:'main',restSeconds:15,sets:[{durationSeconds:20}]},{custom:{name:'新動作',bodyPart:'腿',tracking:'reps'},phase:'main',restSeconds:30,sets:[{reps:5,weight:2.5}]}] };
  const result = parseAiWorkout(JSON.stringify(input), [custom]);
  assert.equal(result.items[0].exerciseId, custom.id);
  assert.equal(result.items[0].restSeconds, 15);
  assert.equal(result.items[1].customDefinition?.name, '新動作');
});
test('AI import rejects unknown IDs, bad versions, mismatched tracking and invalid counts', () => {
  for (const patch of [{exerciseId:'hallucinated'},{sets:[{reps:0}]},{sets:[{reps:5,durationSeconds:20}]},{restSeconds:-1},{note:'a'.repeat(201)}]) {
    assert.throws(()=>parseAiWorkout(JSON.stringify({...aiExample,items:[{...aiExample.items[0],...patch}]}),[]), /第 1 個動作/);
  }
  assert.throws(()=>parseAiWorkout(JSON.stringify({...aiExample,version:2}),[]));
  assert.throws(()=>parseAiWorkout('{',[]));
});
test('public AI documents expose only official catalog and keep examples valid', async () => {
  const response = publicAiResponse('/api/exercise-catalog','https://example.com')!;
  const catalog = await response.json() as {count:number;exercises:{id:string}[]};
  assert.equal(catalog.count,128);
  assert.ok(catalog.exercises.some(e=>e.id==='dead-bug'));
  assert.match(await publicAiResponse('/ai-workouts.md','https://example.com')!.text(), /JSON v1/);
  assert.match(aiPrompt('https://example.com',[]),/https:\/\/example.com\/ai-workouts.md/);
});
