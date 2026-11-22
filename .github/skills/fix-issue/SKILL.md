---
name: fix-issue
description: 依 GitHub issue 編號修正待辦清單 App，驗證變更並建立 Pull Request。
---

# 修復 GitHub Issue 並建立 PR

使用者提供要處理的 issue 編號後，嚴格依照以下順序執行，不要跳步。若未提供 issue 編號，先詢問使用者。

## 1. 讀取 issue

使用 GitHub 工具讀取本 repo 的指定 issue，並以繁體中文摘要：
- 這是 bug 還是新功能？
- 使用者實際遇到的問題或想要的行為是什麼？
- 預期修改哪些檔案？

## 2. 提出計畫並等待確認

用條列式列出預計修改的檔案與變更內容，然後停下來詢問使用者是否同意。在使用者明確同意之前，不要修改任何檔案。

## 3. 建立分支

確認同意後，從 `main` 建立並切換到對應分支：

```sh
git switch -c fix/issue-<issue-number>
```

## 4. 進行修改

- 遵守 `.github/copilot-instructions.md` 中的所有專案規則。
- 只修改必要檔案，不要順手重構其他部分。
- 完成後執行適當的驗證，並明確說明驗證結果。

## 5. 說明瀏覽器驗證方式

告訴使用者打開 `index.html` 後要進行哪些操作，以及應看到什麼結果，才能確認 issue 已修好。

## 6. 提交並推送

依照本次修改建立簡潔明確的提交訊息，並在訊息中包含 issue 編號：

```sh
git add .
git commit -m "fix: <修正摘要> (#<issue-number>)"
git push -u origin fix/issue-<issue-number>
```

## 7. 建立 Pull Request

使用 GitHub 工具，以 `fix/issue-<issue-number>` 為來源分支、`main` 為目標分支建立 PR：

- **標題**：一句話描述這次的修正。
- **內文**必須包含：
  - `Closes #<issue-number>`，讓 PR 合併時自動關閉 issue。
  - **修改內容**：條列這次改了什麼。
  - **如何驗證**：列出第 5 步的驗證步驟。

最後將 PR 網址提供給使用者。
