import { test, expect, type Page } from "@playwright/test";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { exercises } from "../../src/data/exercises";

const repairedVideoIds = ["dumbbell-squat","dumbbell-curl","band-row","cable-triceps-pushdown","dumbbell-lateral-raise","assisted-pull-up","machine-hip-thrust","hack-squat","reverse-pec-deck","dumbbell-lunge","mountain-climber","standing-calf-raise","reverse-lunge","machine-hip-adduction","wall-sit","superman","kneeling-hip-flexor-stretch","cobra-pose","downward-dog","seated-forward-fold"];

async function guest(page: Page) {
  await page.route("**/api/me", route => route.fulfill({ status: 401, json: { error: "Unauthorized" } }));
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page).toHaveTitle(/今天有練|YOU LIAN/);
  await page.getByRole("button", { name: "以訪客模式使用" }).click();
  await page.getByRole("button", { name: "健身指引", exact: true }).filter({ visible: true }).first().click();
  await expect(page).toHaveURL(/#\/guide$/);
  await expect(page.locator("vite-error-overlay")).toHaveCount(0);
}
async function apply(page: Page, type: string) {
  await page.getByRole("button", { name: "課表與進度" }).click();
  await page.getByLabel("課表類型").selectOption(type);
  await page.getByRole("button", { name: "查看課表", exact: true }).first().click();
  await page.getByRole("dialog", { name: "課表與進度", exact: true }).getByRole("button", { name: "加入今日課表", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "今日課表", exact: true })).toBeVisible();
}

test("all 20 repaired videos are available without public audit panels", async ({page}) => {
  await page.setViewportSize({width:1366,height:900}); await guest(page);
  for (const id of repairedVideoIds) {
    const exercise=exercises.find(e=>e.id===id)!;
    await page.getByPlaceholder('搜尋動作、部位或器材').fill(exercise.name);
    await page.getByRole('button',{name:`查看${exercise.name}指引`,exact:true}).click();
    const detail=page.locator('.exercise-detail');
    await expect(detail.getByText(/來源已核對|來源與檢查紀錄|計數方式|僅片段抽查|已檢視/)).toHaveCount(0);
    await detail.getByRole('button',{name:`播放 ${exercise.name} 示範影片`,exact:true}).click();
    await expect(detail.locator('iframe')).toHaveAttribute('src',exercise.video.embedUrl+(exercise.video.embedUrl.includes('?')?'&':'?')+'autoplay=1');
    await expect(detail.getByRole('link',{name:'開啟原始影片',exact:true})).toHaveAttribute('href',exercise.video.watchUrl);
  }
});

for (const width of [360,390,1366]) test(`Shorts use readable portrait frames at ${width}`, async ({page}) => {
  await page.setViewportSize({width,height:844}); await guest(page);
  for (const id of ['cable-triceps-pushdown','hack-squat','reverse-pec-deck']) {
    const exercise=exercises.find(e=>e.id===id)!;
    await page.getByPlaceholder('搜尋動作、部位或器材').fill(exercise.name);
    await page.getByRole('button',{name:`查看${exercise.name}指引`,exact:true}).click();
    const scope=width<700?page.getByRole('dialog',{name:exercise.name,exact:true}):page.locator('.exercise-detail');
    if(width<700) await scope.getByRole('button',{name:'示範影片',exact:true}).click();
    else await scope.getByRole('button',{name:`播放 ${exercise.name} 示範影片`,exact:true}).click();
    const frame=scope.locator('.exercise-video__frame--portrait');
    await expect(frame).toBeVisible();
    const box=await frame.boundingBox();
    expect(box!.width/box!.height).toBeCloseTo(9/16,2);
    expect(box!.width).toBeGreaterThanOrEqual(200);
    expect(box!.height).toBeLessThanOrEqual(844*.7+1);
    if(width<700) {
      const footer=await scope.locator('.training-sheet__footer').boundingBox();
      expect(box!.y+box!.height).toBeLessThanOrEqual(footer!.y);
    }
    await expect(scope.getByText(/來源與檢查紀錄|計數方式|僅片段抽查|已檢視/)).toHaveCount(0);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
    if(width<700) await scope.getByRole('button',{name:'返回動作庫',exact:true}).click();
  }
});

test("missing media approval still hides images, playback and video links", async ({page}) => {
  await page.route(/\/src\/data\/contentReviews\.generated\.ts(?:\?.*)?$/,route=>route.fulfill({contentType:'text/javascript',body:'export const contentReviews = {};'}));
  await page.setViewportSize({width:390,height:844}); await guest(page);
  await page.getByPlaceholder('搜尋動作、部位或器材').fill('高腳杯深蹲');
  await page.getByRole('button',{name:'查看高腳杯深蹲指引',exact:true}).click();
  const sheet=page.getByRole('dialog',{name:'高腳杯深蹲',exact:true});
  await expect(sheet.getByText('圖解暫無提供',{exact:true})).toBeVisible();
  await expect(sheet.locator('.exercise-infographic img')).toHaveCount(0);
  await sheet.getByRole('button',{name:'示範影片',exact:true}).click();
  await expect(sheet.getByText('示範影片暫無提供，請先參考動作步驟與教學來源。',{exact:true})).toBeVisible();
  await expect(sheet.locator('iframe, a[href*="youtube"]')).toHaveCount(0);
  await expect(sheet.getByRole('heading',{name:'動作步驟',exact:true})).toBeVisible();
});
test("every visible exercise renders its current reviewed illustration", async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 900 });
  await guest(page);
  const visible=exercises.filter(exercise=>exercise.id!=='dumbbell-triceps-extension');
  await expect(page.locator('.exercise-list-row')).toHaveCount(visible.length);
  const errors: string[]=[]; page.on('pageerror',error=>errors.push(error.message));
  for(const exercise of visible) {
    await page.getByPlaceholder('搜尋動作、部位或器材').fill(exercise.name);
    await page.getByRole('button',{name:`查看${exercise.name}指引`,exact:true}).click();
    const detail=page.locator('.exercise-detail'), image=detail.locator('.exercise-infographic img');
    await image.scrollIntoViewIfNeeded();
    await expect.poll(()=>image.evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0),{message:exercise.id}).toBe(true);
    await expect(detail.getByText(/來源已核對|來源與檢查紀錄|計數方式|僅片段抽查|已檢視/)).toHaveCount(0);
  }
  expect(errors).toEqual([]);
});
for (const width of [360, 390, 1366, 2560]) {
  test(`guest training keeps phase doses, unfinished sets and readable guides at ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
    const errors: string[] = []; page.on("pageerror", error => errors.push(error.message));
    await guest(page);
    await apply(page, "warmup");
    await page.getByRole("button", { name: "關閉今日課表", exact: true }).click();
    await apply(page, "main");
    const count = await page.locator(".plan-exercise").count();
    expect(count).toBeGreaterThan(5);
    await page.getByRole("button", { name: "開始訓練", exact: true }).click();
    await page.getByLabel("第 1 組秒數", { exact: true }).fill("2");
    await page.getByRole("button", { name: "開始第 1 組倒數", exact: true }).click();
    await expect(page.getByText("動作進行中", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "完成第 1 組", exact: true }).click();
    await expect(page.getByRole("button", { name: "取消完成第 1 組", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "新增一組", exact: true }).click();
    await expect(page.getByLabel("第 2 組秒數", { exact: true })).toBeVisible();
    await page.getByRole("button", { name: "查看指引", exact: true }).click();
    await expect(page.getByRole("heading", { name: "動作步驟", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "返回訓練課表", exact: true }).click();
    await page.getByRole("button", { name: "儲存並打卡", exact: true }).click();
    await expect(page.getByText("這次會保存已完成的逐組紀錄；尚未完成的動作與組數會保留在今日課表。")).toBeVisible();
    await expect(page.getByRole("radiogroup", { name: "打卡深度" })).toHaveCount(0);
    await page.getByRole("button", { name: "完成打卡", exact: true }).click();
    await expect(page.getByRole("dialog", { name: "今天練了什麼？" })).toHaveCount(0);
    const saved = await page.evaluate(() => ({ records: JSON.parse(localStorage.getItem("rep-club:guest-checkins:v2")!).checkins, draft: JSON.parse(localStorage.getItem("you-lian:active-workout:v1:guest")!) }));
    expect(saved.records).toHaveLength(1);
    expect(saved.records[0].exercises[0].entries[0].durationSeconds).toBe(2);
    expect(saved.records[0].exercises[0].phase).toBe("warmup");
    expect(saved.draft.items.length).toBe(count);
    expect(saved.draft.items.flatMap((item: any) => item.entries).every((entry: any) => !entry.completed)).toBe(true);
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: /^今日課表 ·/ }).click();
    await expect(page.locator(".plan-exercise")).toHaveCount(count);
    expect(errors).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  });
}

test("guest backup imports photos and rejects malformed backup without overwriting data", async ({ page }) => {
  await guest(page);
  await page.locator(".profile-trigger").click();
  await page.getByRole("menuitem", { name: "資料備份與通知" }).click();
  const backup = { format: "you-lian-guest", version: 1, checkins: [{ id: "photo-backup-test", date: "2026-09-20", mode: "quick", workoutType: null, durationMinutes: null, note: null, exercises: [], hasPhoto: true, user: {}, createdAt: "2026-09-20T00:00:00Z", updatedAt: "2026-09-20T00:00:00Z" }], photos: { "photo-backup-test": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a5V8AAAAASUVORK5CYII=" }, local: {} };
  await page.locator(".backup-import input").setInputFiles({ name: "backup.json", mimeType: "application/json", buffer: Buffer.from(JSON.stringify(backup)) });
  await expect(page.getByText("已合併 1 筆打卡；既有資料未覆蓋。")).toBeVisible();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "下載含照片備份" }).click();
  const download = await downloadPromise;
  const stream = await download.createReadStream(); const chunks = []; for await (const chunk of stream!) chunks.push(chunk);
  expect(JSON.parse(Buffer.concat(chunks).toString()).photos["photo-backup-test"]).toContain("data:image/png;base64,");
  await page.locator(".backup-import input").setInputFiles({ name: "invalid.json", mimeType: "application/json", buffer: Buffer.from('{"format":"bad"}') });
  await expect(page.getByText("不是支援的 YOU LIAN 訪客備份。")).toBeVisible();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("rep-club:guest-checkins:v2")!).checkins.length)).toBe(1);
});

test("movement favorites persist and full illustration opens at desktop and mobile sizes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await guest(page);
  await page.getByRole("button", { name: "收藏椅子坐站", exact: true }).click();
  await page.getByRole("button", { name: "收藏動作", exact: true }).click();
  await expect(page.locator(".exercise-list-row")).toHaveCount(1);
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "收藏動作", exact: true }).click();
  await expect(page.locator(".exercise-list-row")).toHaveCount(1);
  await page.getByRole("button", { name: "查看椅子坐站指引", exact: true }).click();
  await page.getByRole("button", { name: "開啟椅子坐站完整大圖", exact: true }).click();
  await expect(page.locator(".diagram-reading")).toBeVisible();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "返回動作庫", exact: true }).click();
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.getByRole("button", { name: "開啟椅子坐站完整大圖", exact: true }).click();
  await expect(page.locator(".diagram-viewer img")).toBeVisible();
  await expect.poll(() => page.locator(".diagram-viewer img").evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
});

test("cross-day checkout keeps original date and does not erase incomplete sets", async ({ page }) => {
  await guest(page);
  await page.getByRole("button", { name: "加入椅子坐站", exact: true }).click();
  await page.evaluate(() => {
    const key = "you-lian:active-workout:v1:guest", draft = JSON.parse(localStorage.getItem(key)!);
    draft.workoutDate = "2026-08-01"; draft.startedAt = "2026-08-01T01:00:00Z"; draft.updatedAt = "2026-08-01T01:10:00Z";
    draft.items[0].entries[0].completed = true;
    draft.items[0].entries.push({ ...draft.items[0].entries[0], id: "unfinished-next", completed: false });
    localStorage.setItem(key, JSON.stringify(draft));
  });
  await page.reload({ waitUntil: "domcontentloaded" });
  const stale = page.getByRole("dialog", { name: "前次訓練還沒收尾" });
  await expect(stale).toBeVisible();
  await stale.getByRole("button", { name: /完成前次打卡/ }).click();
  await page.getByRole("button", { name: "完成打卡", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "今天練了什麼？" })).toHaveCount(0);
  const saved = await page.evaluate(() => ({ record: JSON.parse(localStorage.getItem("rep-club:guest-checkins:v2")!).checkins[0], draft: JSON.parse(localStorage.getItem("you-lian:active-workout:v1:guest")!) }));
  expect(saved.record.date).toBe("2026-08-01");
  expect(saved.draft.workoutDate).toBe("2026-08-01");
  expect(saved.draft.items[0].entries.some((entry: any) => entry.id === "unfinished-next")).toBe(true);
});

test("repaired band row plays and reviewed segments keep their boundaries", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await guest(page);
  await page.getByPlaceholder("搜尋動作、部位或器材").fill("彈力帶俯身划船");
  await page.getByRole("button", { name: "查看彈力帶俯身划船指引", exact: true }).click();
  const sheet = page.getByRole("dialog", { name: "彈力帶俯身划船", exact: true });
  await sheet.getByRole("button", { name: "示範影片", exact: true }).click();
  await expect(sheet.locator("iframe")).toHaveAttribute("src", /vR9KcvzLqVo/);
  await expect(sheet.getByText(/來源與檢查紀錄|計數方式|僅片段抽查/)).toHaveCount(0);
  await sheet.getByRole("button", { name: "返回動作庫", exact: true }).click();
  await page.getByPlaceholder("搜尋動作、部位或器材").fill("貓牛式");
  await page.getByRole("button", { name: "查看貓牛式指引", exact: true }).click();
  const reviewed = page.getByRole("dialog", { name: "貓牛式", exact: true });
  await reviewed.getByRole("button", { name: "示範影片", exact: true }).click();
  await expect(reviewed.locator("iframe")).toHaveAttribute("src", /JzU1lMR1Uzw\?start=65&end=180/);
});

for (const width of [390, 1366]) {
  test(`repaired leg curl and correctly matched dead bug render at ${width}`, async ({ page }) => {
    await page.setViewportSize({width,height:900}); await guest(page);
    const errors: string[]=[]; page.on("pageerror",error=>errors.push(error.message));
    await page.getByPlaceholder("搜尋動作、部位或器材").fill("坐姿腿彎舉");
    await page.getByRole("button",{name:"查看坐姿腿彎舉指引",exact:true}).click();
    const scope=width<700?page.getByRole("dialog",{name:"坐姿腿彎舉",exact:true}):page.locator(".exercise-detail");
    await expect(scope.getByText("圖解待修訂，暫不顯示舊圖",{exact:true})).toHaveCount(0);
    const image=scope.locator(".exercise-infographic img");
    await expect(image).toHaveAttribute('src',/fitness-leg-curl-v2-zh-tw/);
    await expect.poll(()=>image.evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
    await expect(scope.getByRole("button",{name:"開啟坐姿腿彎舉完整大圖",exact:true})).toBeVisible();
    await expect(scope.getByText(/來源已核對|來源與檢查紀錄|計數方式|僅片段抽查|已檢視/)).toHaveCount(0);
    await expect(scope.locator('.content-review')).toHaveCount(0);
    await scope.screenshot({path:join(tmpdir(),`you-lian-content-audit-${width}.png`)});
    if(width<700) await scope.getByRole("button",{name:"返回動作庫",exact:true}).click();
    await page.getByPlaceholder("搜尋動作、部位或器材").fill("死蟲式");
    await page.getByRole("button",{name:"查看死蟲式指引",exact:true}).click();
    const deadbug=width<700?page.getByRole("dialog",{name:"死蟲式",exact:true}):page.locator(".exercise-detail");
    if(width<700) await deadbug.getByRole("button",{name:"示範影片",exact:true}).click();
    else await deadbug.getByRole('button',{name:'播放 死蟲式 示範影片',exact:true}).click();
    await expect(deadbug.locator("iframe")).toHaveAttribute('src',/xZhwA0lgIs8\?start=110&end=180/);
    await expect(deadbug.getByText(/版本不符，暫停示範/)).toHaveCount(0);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);
    expect(errors).toEqual([]);
  });
}

test("repaired illustration uses canonical v2 asset and loads on mobile", async ({page}) => {
  await page.setViewportSize({width:390,height:844});
  await guest(page);
  await page.getByPlaceholder("搜尋動作、部位或器材").fill("扶椅站姿側抬腿");
  await page.getByRole("button",{name:"查看扶椅站姿側抬腿指引",exact:true}).click();
  const sheet=page.getByRole("dialog",{name:"扶椅站姿側抬腿",exact:true});
  const preview=sheet.locator(".exercise-infographic img");
  await expect(preview).toHaveAttribute("src",/fitness-supported-hip-abduction-v2-zh-tw/);
  await expect.poll(()=>preview.evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
  await expect(sheet.getByText("圖解待修訂，暫不顯示舊圖",{exact:true})).toHaveCount(0);
  await sheet.getByRole("button",{name:"開啟扶椅站姿側抬腿完整大圖",exact:true}).click();
  await page.locator(".diagram-viewer").getByRole("button",{name:"完整圖解與縮放",exact:true}).click();
  await expect(page.locator(".diagram-viewer img")).toHaveAttribute("src",/fitness-supported-hip-abduction-v2-zh-tw\.png/);
  await expect.poll(()=>page.locator(".diagram-viewer img").evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
});

test("repaired mountain climber and figure-four media render on mobile", async ({page}) => {
  await page.setViewportSize({width:390,height:844}); await guest(page);
  const errors: string[]=[]; page.on('pageerror',error=>errors.push(error.message));
  await page.getByPlaceholder("搜尋動作、部位或器材").fill("登山者");
  await page.getByRole("button",{name:"查看登山者指引",exact:true}).click();
  const mountain=page.getByRole("dialog",{name:"登山者",exact:true});
  const preview=mountain.locator(".exercise-infographic img");
  await expect(preview).toHaveAttribute("src",/fitness-mountain-climber-v2-zh-tw/);
  await expect.poll(()=>preview.evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
  await mountain.getByRole("button",{name:"開啟登山者完整大圖",exact:true}).click();
  const viewer=page.locator('.diagram-viewer');
  await viewer.getByRole("button",{name:"完整圖解與縮放",exact:true}).click();
  await expect.poll(()=>viewer.locator('img').evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
  await viewer.screenshot({path:join(tmpdir(),'you-lian-mountain-repair-390.png')});
  await page.keyboard.press('Escape');
  await mountain.getByRole("button",{name:"返回動作庫",exact:true}).click();
  await page.getByPlaceholder("搜尋動作、部位或器材").fill("仰躺四字臀部伸展");
  await page.getByRole("button",{name:"查看仰躺四字臀部伸展指引",exact:true}).click();
  const figure=page.getByRole("dialog",{name:"仰躺四字臀部伸展",exact:true});
  const figureImage=figure.locator('.exercise-infographic img');
  await expect(figureImage).toHaveAttribute('src',/fitness-figure-four-stretch-v2-zh-tw/);
  await expect.poll(()=>figureImage.evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
  await expect(figure.getByText(/來源已核對|來源與檢查紀錄|計數方式|僅片段抽查|已檢視/)).toHaveCount(0);
  await figure.getByRole("button",{name:"示範影片",exact:true}).click();
  await expect(figure.locator("iframe")).toHaveAttribute('src',/vdIugUHKGWg\?start=40&end=105/);
  expect(errors).toEqual([]);
});
