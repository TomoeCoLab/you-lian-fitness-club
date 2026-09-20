# 動作內容的唯一來源

請編輯 `exercises/<id>.json`，不要直接改 `src/data/exerciseCatalog.generated.ts`、`src/data/contentReviews.generated.ts` 或 `docs/exercise-content.md`。

- [可閱讀的動作總冊](../docs/exercise-content.md)：所有步驟、重點、計數、份量、來源與問題清單。
- [維護與新增流程](../docs/exercise-content-workflow.md)：先文字、再分鏡、再媒體與驗收。
- `catalog.json`：顯示順序及歷史相容 ID；修改 ID 前先處理既有打卡與課表相容性。

`npm run content:build` 更新網站資料與總冊；`npm run content:check` 檢查是否同步。建置與 CI 已接入檢查。
