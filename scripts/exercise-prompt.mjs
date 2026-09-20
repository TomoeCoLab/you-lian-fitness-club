import { readFile } from 'node:fs/promises';
import { assertPromptReady, contentHash } from './exercise-content-lib.mjs';

// Emits a reviewed plan only. It never calls a generator or changes review status.
const id = process.argv[2];
if (!id || !/^[a-z0-9-]+$/.test(id)) throw new Error('用法：npm run content:prompt -- bird-dog');
const root = new URL('../', import.meta.url);
const catalog = JSON.parse(await readFile(new URL('content/catalog.json', root), 'utf8'));
if (!catalog.includes(id)) throw new Error('動作不存在');
const r = JSON.parse(await readFile(new URL(`content/exercises/${id}.json`, root), 'utf8'));
assertPromptReady(r);
const e = r.exercise;
const plan = {
  exercise_name_zh: e.name,
  variation: r.definition.variation,
  subtitle_zh: `${e.bodyParts.join('、')}動作指引`,
  intro_zh: e.summary,
  target_areas: e.bodyParts,
  step_count: r.illustration.plan.frames.length,
  camera: r.illustration.plan.camera,
  steps: r.illustration.plan.frames.map((f,i)=>({step_number:i+1,step_title_zh:f.title,pose_description:f.pose,coaching_note_zh:f.caption})),
  summary: {
    key_points_zh: e.cues,
    suggested_reps_zh: [`起始參考：${e.recommendation.sets} 組 × ${e.tracking==='time'?`${e.recommendation.durationSeconds} 秒`:`${e.recommendation.reps} 次`}`,r.definition.counting,'實際份量依本次課表調整'],
    breathing_zh: [r.definition.breathing],
  },
};
console.log(`內容版本：${r.revision}\n來源文字 SHA-256：${contentHash(r)}\n`);
console.log('使用 fitness-movement-infographic skill，先閱讀 skill 全文。附上使用者核准的成年角色三視圖，不能只靠文字猜測角色。\n保持每格同一角色、服裝與比例；4:3 橫向、寫實人物、淺色背景，繁體中文。視線自然沿頭部方向，不刻意看鏡頭。\n不要成功標語。姿勢與器械正確性高於美觀；固定鏡頭、清晰支撐點、完整回程。不得把每側次數當成左右合計，也不得自行增加組數。\n以下是分鏡規格；生成後仍須人工逐格比較成品，未通過不可上架。\n');
console.log(JSON.stringify(plan, null, 2));
