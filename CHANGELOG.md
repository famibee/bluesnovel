## 知見
![alt text](<test/Claude Schedule.svg>)
- /compact はコンテキスト80～90%程度で実行が推奨
- brew upgrade -y && bun update && bun outdated


## 後ほど
- SKYNovel拡張機能( https://github.com/famibee/SKYNovel-vscode-extension )のLSP部分にmcpサーバー機能を追加したい。いずれはあなたに接続し、マクロ定義位置などわかるようにしたい
- 「MCPサーバーをVSCode拡張そのものに埋め込む」よりも、VSCode拡張とMCPをメッセージでつなぐ（IPC / stdio / WebSocket）構成で保守しやすく

- 【electron-vite を廃止し Vite + vite-plugin-electron 構成に移行するツール】
- 【ARINovelプロジェクトをSKYNovelに移行するツール】
とかを作らせるといいかも

- Web（claude.ai/code）: ブラウザから Claude Code を使える環境
- サブエージェント
	- Claude Code には Explore・Plan・general-purpose といった組み込みのサブエージェントが用意されています。自分でカスタムサブエージェントを作ることも可能


## 2026/07/24
- ts上にTODOを残す場合は【//TODO: 】形式でコメント。Todo+( https://github.com/fabiospampinato/vscode-todo-plus )で一覧できるため
- serena疎通確認
- ブラウザUIテスト（Claudeを経由しないE2E）の導入

- [x] **ブラウザUIテスト（Claudeを経由しないE2E）の導入**（2026-07-24 完了）
	- `@playwright/test` を devDependency 追加。`webServer` でvite起動/待受/終了を自動化
	- **一式を`test/e2e/`配下へ集約**（ルートを汚さないため）。設定も`test/e2e/playwright.config.ts`なので`playwright test -c test/e2e`で起動する
	- 専用ポート**5199**・`reuseExistingServer: false`。5173/5174は他プロジェクト（`tmp_blues`等）のdevサーバーが居座っており、掴むと別アプリを叩いてしまうため
	- spec名は`*.e2e.ts`（`*.spec.ts`だと`bun test`が拾ってしまうため）。`button` / `wait` / `readback` の15件
	- `test/e2e/app/`に自己完結したフィクスチャ（`prj_basic` / `prj_button`）。画像アセット不要。`src/`にはテスト用フックを入れず、`test/e2e/app/main.ts`が`window.__sn`でzustandストアを公開する
	- `package.json`に`test:e2e` / `test:e2e:ui`を追加。ユニット（`bun test`）とは完全分離
	- ルート`tsconfig.json`は`test/e2e`を`exclude`（`vite-plugin-dts`が`dist/`へE2Eの`.d.ts`を吐くため）。型チェックは`bunx tsc --noEmit -p test/e2e`
	- 判明した注意点：`Stage`は`lazy()`ロードのため、ストアだけ見て操作するとSuspenseの`Loading`表示中に追い越してしまい、`Caretaker.update()`が呼ばれず読み戻しMementoが記録されない。`test/e2e/snPage.ts`の`waitIdle()`でDOMの追随を待つこと
- 23%->comp->1%, 36%, 6%

























## v0.2.1
- 一部最新 SKYNovel コードを導入
## v0.2.0
- いったん SKYNovel をほとんど含まないシンプルな状態へ戻す。（スクリプト末尾エラーは出てる）
## v0.1.1
- electron-store は v8.2.0 止まりで。v9.0.0・v10.0.0 で「window.」が含まれており、アプリ版でエラーになる。
	- v1.53.13 の頃にも
## v0.1.0
- Initial commit
