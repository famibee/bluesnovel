# TESTING.md

`test/e2e/` 配下（Playwright E2E）の書き方と制約。エンジンの論理は `test/*.test.ts`（`bun test`）
で扱うべきで、ここに書くのはブラウザが要るものだけ。

spec もフィクスチャアプリも `playwright.config.ts` も `tsconfig.json` も全部 `test/e2e/` 下（ルート
を汚さないため）。単体テストと完全分離。

- **ブラウザが必要なものだけここに書く**: DOM／computed CSS／`document.title`、入力イベント、
  React 描画に依るもの、fetch とスクリプト切替の非同期経路（読み戻りもこれ）、`prj.json` 配線。
  エンジンの論理は `test/*.test.ts`。`mesStr()`/`snap()` は zustand を読むだけなので、それしか
  assert しない spec はブラウザの衣を着た単体テスト。
- spec 名は `*.spec.ts` でなく **`*.e2e.ts`**（`bun test` が `*.spec.*` を拾って単体実行を壊すため）。
  `testMatch` で強制。
- config がルートに無いので `-c test/e2e` が必要。`webServer` は**専用ポート 5199** で
  `reuseExistingServer: false`、`cwd` はリポジトリルート固定。vite 既定の 5173/5174 は他プロジェクト
  （`tmp_blues` 等）に占有されがちで、再利用すると黙って**別アプリをテスト**してしまう。
- `test/e2e/app/` は自己完結フィクスチャ。`?prj=…` でシナリオを選ぶ（`SysBase.loaded()` が常に
  `main` という名前のスクリプトを読むため）。追加は `prj_<name>/` ＋ `snPage.ts` の `T_PRJ` メンバ。
  バイナリは極力置かないが `prj_pic/` だけは実 PNG を持つ（`naturalWidth` は未ロード時 0 なので
  実ファイルでないと経路を検証できない）。**`src/` にテスト専用フックは足さない**方針:
  `test/e2e/app/main.ts` が `window.__sn` を公開し、デバッグ表示は id でなく `body > span` で拾う。
- ファイルを跨ぐシナリオは `pressKey()` でなく **`pressKeyToWaitMark()`** で進める。スクリプト fetch
  の最中に store も DOM も `isTyping` も落ち着いて見える瞬間があり、`waitIdle()` が本物の停止点と
  区別できず、そこで押したキーが「タイピングを終わらせる」方に食われて停止点を 1 つ失う。
  `store.wait` は `#runStep()` 毎にリセットされ `[l]`/`[p]` でのみ立つので停止点の信号として使える。
  `[s]` はマーカを立てないので最後の 1 歩だけ `pressKey()` ＋ `expect.poll`。
- `waitIdle()` はクリック/キー入力の**前に必ず await** する。`Stage` は `lazy()` なので、Suspense が
  `Loading` を出している間にテストが先走ると停止点を 1 つ取りこぼす。
- ルート `tsconfig.json` は `test/e2e` を**除外**している（さもないと `vite-plugin-dts` がテストの
  `.d.ts` を `dist/` に吐く）。型チェックは `test/e2e/tsconfig.json` 側。
