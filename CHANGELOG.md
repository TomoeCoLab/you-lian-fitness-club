# 更新紀錄

所有值得記錄的變更都會整理在此。版本遵循 [Semantic Versioning](https://semver.org/lang/zh-TW/)，提交訊息遵循 [Conventional Commits](https://www.conventionalcommits.org/zh-hant/v1.0.0/)。

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

[1.0.0]: https://github.com/TomoeCoLab/you-lian-fitness-club/releases/tag/v1.0.0
