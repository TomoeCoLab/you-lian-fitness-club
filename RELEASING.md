# YOU LIAN 發佈流程

正式版本採 Semantic Versioning，只有完成測試與正式部署的版本可以推送 tag。

## 1. 撰寫提交訊息

使用 Conventional Commits，例如：

```text
feat(guide): 新增睡前肩頸伸展套餐
fix(checkin): 修正跨日訓練日期判斷
docs: 更新部署說明
```

不相容變更使用 `feat!:`，並在內文補上 `BREAKING CHANGE:`。

## 2. 決定版本

- 問題修正：`npm run release:patch`
- 相容的新功能：`npm run release:minor`
- 不相容變更：`npm run release:major`

執行前先把此次中文調整重點新增至 `CHANGELOG.md` 對應版本。`npm version` 會同步更新 `package.json`、建立 release commit 與 tag。

## 3. 驗證、部署、推送

```bash
npm ci
npm run check
npm run release:check
npm run deploy
git push origin main --follow-tags
```

順序不可交換：只有線上部署與驗證完成後才推送 GitHub。

## 4. GitHub 與 Discord

推送 `vX.Y.Z` tag 後，`.github/workflows/release.yml` 會：

1. 再次執行建置及版本一致性檢查。
2. 從 `CHANGELOG.md` 擷取該版本的中文內容。
3. 建立 GitHub Release。
4. 使用 repository secret `DISCORD_RELEASE_WEBHOOK_URL` 發送至 Discord `release-notes` 頻道。

Webhook 必須在 Discord 頻道 `1547308531210920057` 中建立；不同頻道的 webhook 無法只靠 channel ID 轉送。
