# 待辦清單 Web App

這是在 **GitHub Copilot 實戰工作坊**完成的待辦清單 Web App。使用者可以記錄日常待辦、追蹤完成狀態，並透過篩選和主題切換調整檢視方式。

## 線上展示

GitHub 專案頁：[yoga22c/copilot-workshop-agent-mode-mcp](https://github.com/yoga22c/copilot-workshop-agent-mode-mcp)

## 功能

- 新增待辦事項，並可勾選完成或取消完成。
- 刪除單筆待辦事項。
- 一次清除所有已完成事項；操作前會顯示確認對話框，沒有已完成事項時按鈕會停用。
- 依「全部」、「未完成」、「已完成」篩選待辦事項，並在篩選結果為空時顯示提示。
- 顯示整份清單的未完成項目數量，不受目前篩選條件影響。
- 在淺色與深色模式間切換；選擇會保存，首次手動切換前會跟隨作業系統偏好。
- 待辦事項保存於瀏覽器 `localStorage`，重新載入頁面後仍可保留。
- 使用卡片式版面，並支援手機螢幕。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript，沒有引入框架或套件。
- 待辦資料與手動選擇的主題偏好保存於瀏覽器 `localStorage`。
- 以 CSS 變數管理主題色彩，並透過 `prefers-color-scheme` 讀取系統深淺色偏好。
- 主要檔案為根目錄的 `index.html`、`styles.css`、`app.js`。

## 開發方式

- 使用 GitHub Copilot Agent Mode，依需求建立並逐步更新前端功能。
- 透過 `.vscode/mcp.json` 設定 Microsoft Learn 與 GitHub MCP Server，供工作流程查詢官方文件及讀取 GitHub issue。
- 以 `.github/copilot-instructions.md` 記錄專案技術限制與協作規則。
- `.github/prompts/fix-issue.prompt.md` 將 issue 處理流程整理成可重複使用的劇本：讀取 issue、提出計畫並等待確認、修改與驗證、提交推送，再建立 Pull Request。

## 我學到什麼

- 把需求和限制先說清楚，有助於讓修改範圍聚焦，也減少不必要的變動。
- 篩選只影響畫面顯示時，計數仍應根據完整資料計算，才能維持統計正確。
- 使用 CSS 變數搭配 `prefers-color-scheme` 和 `localStorage`，可以兼顧主題客製、系統偏好與使用者選擇。
- MCP 能讓開發流程連結官方文件和 GitHub issue，減少只依賴本機程式碼的限制。
- 將 issue 處理步驟寫成 prompt，可重複執行計畫確認、修改、驗證與 PR 流程。
