import {test,expect} from '@playwright/test';
import {tmpdir} from 'node:os';
import {join} from 'node:path';

for (const width of [390,1366]) test(`AI prompt, validation, append, custom reuse and persisted sets at ${width}`, async ({page})=>{
  await page.setViewportSize({width,height:900});
  const errors:string[]=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/api/me',route=>route.fulfill({status:401,json:{error:'Unauthorized'}}));
  await page.goto('/');
  await page.getByRole('button',{name:'以訪客模式使用'}).click();
  await page.getByRole('button',{name:'健身指引',exact:true}).filter({visible:true}).first().click();
  await page.getByPlaceholder('搜尋動作、部位或器材').fill('徒手深蹲');
  await page.getByRole('button',{name:'加入徒手深蹲',exact:true}).click();
  await page.getByRole('button',{name:'請 AI 設計課表',exact:true}).click();
  const dialog=page.getByRole('dialog',{name:'請 AI 設計課表',exact:true});
  await expect(dialog.getByText('今天只有 30 分鐘，想練核心，肩頸有點緊。',{exact:true})).toBeVisible();
  await page.evaluate(()=>{ Object.defineProperty(navigator,'clipboard',{value:{writeText:async(text:string)=>{(window as any).__copied=text;}},configurable:true}); });
  await dialog.getByRole('button',{name:'複製提示詞',exact:true}).click();
  await expect(dialog.getByRole('status')).toContainText('已複製');
  expect(await page.evaluate(()=>(window as any).__copied)).toContain('/ai-workouts.md');
  await dialog.getByLabel('課表 JSON').fill('{');
  await dialog.getByRole('button',{name:'預覽課表',exact:true}).click();
  await expect(dialog.getByRole('alert')).toContainText('無法讀取 JSON');
  expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('you-lian:active-workout:v1:guest')!).items.length)).toBe(1);
  const custom={custom:{name:'測試自訂抬腿',bodyPart:'腿',tracking:'time'},phase:'cooldown',restSeconds:25,sets:[{durationSeconds:15}]};
  const payload={format:'you-lian-workout',version:1,name:'AI測試課表',items:[{exerciseId:'dead-bug',phase:'main',restSeconds:95,note:'每組每側 4 次',sets:[{reps:4,weight:null},{reps:7,weight:2.5}]},custom,{...custom,restSeconds:40}]};
  await dialog.getByLabel('課表 JSON').fill('```json\n'+JSON.stringify(payload)+'\n```');
  await dialog.getByRole('button',{name:'預覽課表',exact:true}).click();
  await expect(dialog.getByRole('region',{name:'匯入課表預覽'})).toContainText('休息 95 秒');
  await dialog.getByRole('region',{name:'匯入課表預覽'}).scrollIntoViewIfNeeded();
  await page.screenshot({path:join(tmpdir(),`you-lian-ai-preview-${width}.png`)});
  await dialog.getByRole('button',{name:'加入今日課表',exact:true}).click();
  await expect(dialog).toHaveCount(0);
  await expect(page.locator('.plan-exercise')).toHaveCount(4);
  const items=await page.evaluate(()=>JSON.parse(localStorage.getItem('you-lian:active-workout:v1:guest')!).items);
  expect(items.map((i:any)=>i.exerciseId).slice(0,2)).toEqual(['bodyweight-squat','dead-bug']);
  expect(items[1].entries.map((e:any)=>[e.reps,e.weight,e.completed])).toEqual([[4,null,false],[7,2.5,false]]);
  expect(items[2].exerciseId).toBe(items[3].exerciseId);
  expect(items[2].restSeconds).toBe(25); expect(items[3].restSeconds).toBe(40);
  expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('you-lian:custom-exercises:v1')!).length)).toBe(1);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
  await page.reload();
  await page.getByRole('button',{name:'今日課表 · 4',exact:true}).click();
  await expect(page.locator('.plan-exercise')).toHaveCount(4);
  expect(errors).toEqual([]);
});
test('AI public docs bypass login, private custom pool requires session',async({request})=>{
  for(const path of ['/ai-workouts.md','/llms.txt','/api/exercise-catalog']){
    const response=await request.get(path); expect(response.ok()).toBe(true);
    expect(response.headers()['content-type']).toMatch(/markdown|json/);
  }
  expect((await request.get('/api/custom-exercises')).status()).toBe(401);
});
