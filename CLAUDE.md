# CLAUDE.md

## What this is

`@famibee/bluesnovel` — ESM TypeScript の**ノベルゲームフレームワーク**。作者の旧エンジン
**SKYNovel**（コード中では **本家**、`skynovel_esm/src/…:line` の形で参照）を簡素化して書き直し
たもの。シナリオエンジンは明示的に**試作版**で、機能は意図的に最小限。

移植時は、コメントの `本家 <file>:<line>` が仕様書。関連コードを足すときもこの記法を踏襲する。

1 ソースツリーから **browser 版 (`dist/`)** と **Electron 版 (`dist_app/`)** を出力。どちらも
ビルド成果物ごとコミットされている。

## Commands

Bun（テスト＋ビルドドライバ）+ Vite 8 / rolldown。

```bash
bun test                                # 単体テスト
bunx tsc --noEmit --incremental false   # 型チェック（bun test では走らない）
bunx tsc --noEmit -p test/e2e           # E2E ツリーは別プロジェクト
bun run test:e2e                        # Playwright（自前で vite:5199 を起動/停止）
bun run docs                            # docs/ プレイグラウンド
```

`bun run build` / `watch` は `src/build.ts` が Vite の `build()` を 4 回呼ぶ
（`src/web.ts`→`dist/`、`src/{app,appMain,preload}.ts`→`dist_app/`）。`.d.ts` はその後
`tsc -p tsconfig.dts.json` で**`dist/` にだけ**出す（watch 時はスキップ＝`watch` だけ回していると
`.d.ts` は古いまま）。本家と違い `vite-plugin-dts` は使わない（build 単位で走るので `dist_app/` にも
同じ木が出て型が2組になる／`test/**` まで公開物に混じる）。`dist_app/*.js` の型は `package.json` の
`exports` の `types` 条件で `dist/` 側を指す。lint スクリプトは無い。

**ブラウザ手動確認は `playwright-cli` スキルを使う**（playwright MCP は deny 済み。応答が全部
コンテキストに載って高い）。ストア確認は `window.__sn.store.getState()`。

## Architecture（概要）

**純粋なシナリオエンジンと UI の分離**が中心。だからシナリオ処理はブラウザ無しで単体テストできる。

```
SysWeb (web.ts) ─▶ SysBase.loaded ─▶ ScriptMng.load(fn)
                                          │
   'ev_next' CustomEvent on heStage ◀─────┤  (Main.tsx が listen し scrMng.go)
                                          ▼
                              ScriptEngine.step()  ── pure ──▶ T_ENGINE_ACTION[]
                                          │
                              ScriptMng.#applyAction() が store へ反映
                                          │
                                    React (Stage/…) が store から再描画
```

主要ファイルの役割・設計判断・実装済みタグ一覧・タグ属性の共通前処理・属性既定値の判定基準は
**[ARCHITECTURE.md](.claude/docs/ARCHITECTURE.md)**。

**属性ごとの詳細と実装状況は `docs/tag.html`**（変数は `docs/dev.html`。いずれも公開ドキュメントで
`bun run docs` で確認）。名前に 🟢実装済 / 🟡一部 / 🔴未実装 のマークが付いており、**タグや変数を
実装・変更したらこのマークを更新する**（「何が動くか」の唯一の情報源。おかげで `todo.md` は
状況一覧でなく作業計画のままでいられる）。

## 最重要の落とし穴

詳細と根拠は **[PITFALLS.md](.claude/docs/PITFALLS.md)**。ここは索引だけ:

- 「ページ」は**レイヤページ**(fore/back, `aPage`) と**テキストページ**(`[p]` 区切り, `PageLog`) の
  2 つの別物。`[page]` は名前に反して後者を操作する。
- `[trans]` は `foreIdx` を反転するだけ。store は**2 配列間でレイヤデータを動かさない**。
- `[tsy]` は `[trans]` と逆で DOM でなく **store 経由**。GSAP のターゲットをそのまま store に
  渡すと `structuredClone`/`JSON` が壊れる。
- `[add_frame]` は意図的に**store の外**（`FrameMng` が DOM 側で所有、`srcdoc` で same-origin）。
- 重ね順は `aPage[i]` の配列順。`[lay float=/index=/dive=]` の並べ替えは**必ず両ページ同一に**。
- `ScriptEngine.step()` が読むトークンを **`trimStart()` してはいけない**（Grammar 前提が壊れる）。
- **`Stage.tsx` を静的 import してはいけない**（`lazy()` 分割が効かなくなる）。
- フィルタは CSS 直変換 9 種 + `feColorMatrix` へ流す残りの 2 系統、`multiply` 属性は無視。
- 音声は howler を積まず自前の Web Audio 層（`SndMng.ts`/`SndBuf.ts`）。**停止＝破棄**で状態機械を
  持たず、`[ws]`/`[wf]` の待ち合わせは `SndBuf` でなく `ScriptMng` が持つ。`[fadese]`/`[wf]` の既定
  バッファは `SE`（BGM には `[fadebgm]`/`[wb]`）。

## E2E テスト

`test/e2e/` 配下の書き方・制約は **[TESTING.md](.claude/docs/TESTING.md)**。単体テストとの使い分け
（ブラウザが要るものだけ e2e、それ以外は `test/*.test.ts`）が最重要。

## 規約

- コメントとコミットメッセージは**日本語**。周囲のコメント密度に合わせる（このコードベースは特に本家との相違について厚く書Co-Authored-By署名は不要く）。
- git add / git commit はユーザーが行う。
- **TODO は `.ts`/`.tsx` で `//TODO: ` の形ちょうど**（`//` の前に空白なし、コロンの後に 1 個）。
  VSCode 拡張 *Todo+* がこの prefix しか拾わない。
- **`todo.md`** がルートの作業計画（*Todo+* のチェックボックス形式、ほぼ優先度順）。セッション開始
  時に読む。**終わった項目は `todo.md` に残さず `CHANGELOG.md` へ移す**。`CHANGELOG.md` 末尾付近の
  単独の `- [ ]` マーカの位置に `- [x] …` ブロックを書き、後ろに空行 1 つ、**マーカはそのまま残す**
  （次回も同じ手順で追記できるように）。同じ作業で `todo.md` からは消す。
- **属性の既定値は 1 箇所**（エンジン入口の `case` か CSS、どちらか。両方には書かない）。判定基準・
  台帳は [ARCHITECTURE.md#属性の既定値](.claude/docs/ARCHITECTURE.md#属性の既定値) と
  `test/argdef_parity.test.ts`。
- **strict TypeScript**（`tsconfig.json` 参照。`noUncheckedIndexedAccess` 等）。未使用引数は `_`
  前置で許可（`noUnusedLocals`/`Parameters`）。
- **serena MCP はこのプロジェクトでハングした実績がある**（タイムアウトを返しつつ処理は実行された
  ことも）。まず軽い呼び出し（`get_current_config`）で生死を見る。タイムアウト後は再実行の前に
  状態を確認する。シンボル系ツールは `activate_project`（`bluesnovel`）が先に要る。
- リリースは `semantic-release` ＋ conventionalcommits プリセット。

## 参考資料

- タグ仕様の正典は本家 `../skynovel_esm/src/sn/Grammar.ts`（`T_HTag` 型）と各 `hTag.<name>`
  （`../skynovel_esm/src/sn/*.ts`）。サンプルは
  [SKYNovel_gallery](https://github.com/famibee/SKYNovel_gallery)（機能別）と `../tmp_esm_uc/doc/prj/`
  （フルゲーム、本家形式）。詳細は [ARCHITECTURE.md#参考資料](.claude/docs/ARCHITECTURE.md#参考資料)。
- **`test/uc_goal.test.ts`** がプロジェクトの到達目標（フルサンプルを `main.sn`→`title.sn` の `[s]`
  までエンジンだけで走らせる）。兄弟チェックアウトが無ければ skip。タグを足したら走らせること。
