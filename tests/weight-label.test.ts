import assert from 'node:assert/strict';
import { test } from 'node:test';
import { weightLabel } from '../src/lib/weightLabel.ts';

test('unfilled equipment load is not mislabeled as bodyweight', () => {
  for (const equipment of ['地雷管','啞鈴','曲槓','牧師椅彎舉機'] as const) assert.equal(weightLabel(null,equipment),'重量未填');
  for (const equipment of ['徒手','單槓','瑜珈墊'] as const) assert.equal(weightLabel(null,equipment),'自重');
  assert.equal(weightLabel(null,'彈力帶'),'阻力見備註');
  assert.equal(weightLabel(null),'重量未填');
  assert.equal(weightLabel(0,'地雷管'),'0 kg');
  assert.equal(weightLabel(10,'地雷管'),'10 kg');
});
