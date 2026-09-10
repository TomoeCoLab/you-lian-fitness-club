# 有練 · YOU LIAN

以 Discord 私人伺服器作為會員名單的健身打卡網站，部署於 Cloudflare Workers。

## 已完成

- Discord OAuth 登入（`identify guilds`），只允許指定伺服器成員進入。
- 訪客模式不需要帳號；打卡資料留在版本化 localStorage，照片留在 IndexedDB，不會送往 Worker、D1、R2 或 Discord。
- 月曆打卡與伺服器成員動態；同一天可追加多場訓練，不覆蓋舊紀錄。
- 快速、一般、完整訓練三種打卡模式。
- 57 個訓練動作、23 種徒手／自由重量／器械／瑜珈墊篩選，以及器材簡圖、中文假人分解、動作重點與嵌入影片。
- 內建「每日徒手」與「睡前柔軟度」等套餐及自訂課表；Discord 使用者同步至 D1，訪客課表只保存在瀏覽器。
- 依個人歷史紀錄提供下一次重量、次數或時間建議。
- 好友可對單場訓練留下「有力、燃燒、拍手」回應；每人每場只保留一個回應。
- 可安裝 PWA、更新提示與離線應用殼；離線時訪客本機紀錄仍可開啟。
- D1 儲存使用者與打卡紀錄。
- R2 私有照片；圖片只能經過已登入的 Worker API 讀取。
- 每次新增打卡都透過 Discord webhook 發送獨立 embed；既有打卡不提供覆蓋編輯。

目前設定的 Discord 資源：

- Guild：`1545351675471073342`
- 打卡頻道：`1545352171950837770`
- Release notes 頻道：`1547308531210920057`

## 版本與發佈

本專案採用 [Semantic Versioning](https://semver.org/lang/zh-TW/) 與 Conventional Commits：

- `fix:`：修正問題，增加 patch 版本（例如 `1.0.0` → `1.0.1`）。
- `feat:`：新增相容功能，增加 minor 版本（例如 `1.0.0` → `1.1.0`）。
- `BREAKING CHANGE:` 或 `!`：不相容變更，增加 major 版本。
- `docs:`、`test:`、`refactor:`、`chore:`：依實際影響併入下一次版本。

每次正式更新都必須先更新 `CHANGELOG.md`，再完成測試與 Cloudflare 部署，最後推送版本 commit 與 `vX.Y.Z` tag。Tag 會建立 GitHub Release，並將同一份中文重點發送到 Discord 的 `release-notes` 頻道。完整步驟請見 `RELEASING.md`。

## 本機開發

```bash
npm install
npm run cf-typegen
npm run db:migrate:local
npm run dev
```

先將 `.dev.vars.example` 複製為 `.dev.vars` 再填入本機值；其中 `LOCAL_DEMO=true` 只供本機視覺測試。這個檔案已被 Git 忽略。CI 只使用範例中的空值產生型別，不會接觸正式 secrets。

## 正式部署前設定

1. 在 Cloudflare Dashboard 啟用 R2，接著執行：

   ```bash
   npx wrangler r2 bucket create you-lian-rep-club-photos
   ```

2. 在 Discord Developer Portal 建立 OAuth2 application，將正式網站的
   `https://<網域>/api/auth/callback` 加入 Redirects。
3. 將 Client ID 寫入 `wrangler.jsonc` 的 `vars.DISCORD_CLIENT_ID`。
4. 以互動式命令設定 secrets，不要把值寫進檔案或貼到聊天：

   ```bash
   npx wrangler secret put DISCORD_CLIENT_SECRET
   npx wrangler secret put DISCORD_WEBHOOK_URL
   npx wrangler secret put SESSION_SECRET
   ```

   `SESSION_SECRET` 請使用至少 32 bytes 的隨機值。
5. 套用 migration 並部署：

   ```bash
   npm run db:migrate:remote
   npm run deploy
   ```

曾公開貼出的 webhook URL 應先在 Discord 刪除並重新建立，舊 URL 不應再使用。

## 安全邊界

- 網站依「是否仍為指定 Discord 伺服器成員」決定登入資格；不讀取私人好友名單。
- Discord 成員使用雲端同步、好友動態及頻道通知；訪客只有本機個人日曆與「我的紀錄」。
- Discord 登入 Cookie 有效期為 30 天；部署新版本不會清除登入。清除網站資料、手動登出或更換 `SESSION_SECRET` 仍會使 session 失效。
- Webhook secret、Discord Client Secret 與 Session Secret 只放 Cloudflare secrets。
- Discord 訊息停用所有 mentions，避免輸入內容觸發 `@everyone` 或角色通知。
- 上傳僅接受 JPEG、PNG、WebP，單檔上限 5 MB。
- 應用程式會在 8 GiB 儲存量、每月 1 萬次照片上傳或 5 萬次照片讀取時停止新的照片操作。這個保守上限同時避免安全計數本身消耗過多 D1 免費額度。
- Cloudflare Budget Alert 只會寄送通知，不是硬性費用上限；建議另在 Dashboard 設定低額警示。
