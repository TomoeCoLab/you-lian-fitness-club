# 更新紀錄

所有值得記錄的變更都會整理在此。版本遵循 [Semantic Versioning](https://semver.org/lang/zh-TW/)，提交訊息遵循 [Conventional Commits](https://www.conventionalcommits.org/zh-hant/v1.0.0/)。

## [1.2.0] - 2026-09-11

### 新增

- 為全部 57 個訓練動作加入繁體中文真人分解圖，涵蓋徒手、自由重量、固定器械與瑜珈伸展。
- 新增男女兩位一致角色的動作示範；本次新增項目平均採用男性與女性角色。
- 每張圖解整合動作階段、方向、姿勢重點、建議次數或時間，以及呼吸提醒。

### 改善

- 健身指引統一使用真人圖解，取代原有的簡易假人示意圖。
- 圖解支援響應式縮放與另開完整大圖，改善桌機及手機閱讀體驗。
- 建立後續新增動作的圖解規範：沿用核准角色、繁體中文、生物力學檢查及無標語版面。

## [1.1.0] - 2026-09-10

### 新增

- 新增坐姿大腿內收、坐姿大腿外展與啞鈴過頭三頭肌伸展，共 57 個訓練動作與 23 種器材分類。
- 所有動作詳情新增響應式假人分解圖，以起始／完成姿勢、器材圖示與三項中文重點輔助理解。

### 修正

- 羅馬椅背伸改用實際示範羅馬椅的中文影片，並改以國立中興大學體育室資料交叉核對。
- 新增影片先核對 YouTube 標題、發布頻道、內容說明與實際畫面，再加入訓練資料庫。

## [1.0.1] - 2026-09-10

### 修正

- Discord 登入 Cookie 有效期由 24 小時延長為 30 天，部署新版不會主動清除登入狀態。
- 保留 `HttpOnly`、正式環境 `Secure` 與 `SameSite=Lax`，避免前端程式讀取 session Cookie。

### 維護

- 建立公開 GitHub repository、Semantic Versioning、Conventional Commits、CI、中文 GitHub Release 與 Discord release-notes 自動通知流程。

## [1.0.0] - 2026-09-10

### 新增

- Discord OAuth 登入與私人伺服器成員驗證；訪客模式資料完全保存在瀏覽器。
- 日曆、個人紀錄及好友動態，支援同一天連續追加多場打卡。
- 好友動態詳情、完整照片顯示，以及「有力、燃燒、拍手」社群回應。
- 快速、一般、完整訓練三種打卡模式與 Discord webhook 訊息。
- 54 個訓練動作、21 種器材分類、器材簡圖、中文教學及嵌入影片。
- 逐組重量、次數、時間紀錄與自動休息倒數。
- 內建及自訂課表、個人進度建議、每日徒手套餐與睡前柔軟度套餐。
- PWA 安裝、更新提示與離線應用殼。
- Cloudflare D1、私有 R2 照片儲存與免費額度保護。

### 改善

- 完成桌機與手機響應式版型、訓練抽屜、日期活動呈現及跨日未完成訓練處理。
- 品牌名稱統一為「有練 / YOU LIAN」，首頁訓練照片支援輪播。

### 安全

- 限制 Discord 伺服器成員才能使用雲端與社群功能。
- 限制上傳格式與大小，照片只能經登入後的 Worker API 存取。
- Discord 訊息停用 mentions，所有 credentials 僅使用 Cloudflare 或 GitHub Secrets。

[1.0.1]: https://github.com/TomoeCoLab/you-lian-fitness-club/releases/tag/v1.0.1
[1.2.0]: https://github.com/TomoeCoLab/you-lian-fitness-club/releases/tag/v1.2.0
[1.1.0]: https://github.com/TomoeCoLab/you-lian-fitness-club/releases/tag/v1.1.0
[1.0.0]: https://github.com/TomoeCoLab/you-lian-fitness-club/releases/tag/v1.0.0
