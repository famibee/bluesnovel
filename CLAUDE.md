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

## Architecture

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

- **`src/ts/ScriptEngine.ts`** — 試作版の実行器。DOM も fetch も持たない。次の `[l]`/`[p]`/`[s]`
  まで進めて `T_ENGINE_ACTION[]` を返す。実行状態（トークン位置、if スタック、コールスタック、
  マクロ表、変数）を全部持つ。**エンジンはただ 1 つ**で、ファイル跨ぎは `switchScript()` による
  `Script` 差し替えなので変数もスタックも生き残る。他ファイルが要るときは
  `{t:'loadScript',…}` を出して停止し、fetch は `ScriptMng` の仕事（`step()` を同期に保つため）。
  `step()` の分岐は本家 `Main.ts#main()` そのまま＝トークン先頭 1 文字で決める。だから
  **`trimStart()` してはいけない**（Grammar が先頭タブ・改行・コメントを別トークンに割る前提）。
- **`src/ts/Script.ts`** — `.sn` 1 ファイルのパース結果（トークン配列＋ラベル表）。読み取り専用。
  `Grammar` は `ScriptMng` が**1 個だけ**作って全 `Script` に渡す。
- **`src/sn/Grammar.ts`** — 本家のトークナイザを**そのまま移植**。`test/Grammar.test.ts` は本家の
  テストファイルを無改変で持ってきたもの。唯一の相違は `cfg` が optional なこと。
- **`src/ts/VarStore.ts`** — 本家 `Variable` から save/dirty を除いたもの。名前空間は
  `tmp`/`game`/`sys`/`mp`（本家の `save:` は `game:`。ただし `save:` も**別名として受ける**、
  上流シナリオが全部そう書くので。`ExprEval` 側にも別名が要る、でないと `:` が三項演算子に読まれる）。
  `get()` は**未定義変数に `undefined`**、格納された null にのみ `null` を返す（`1 + 未定義` → `NaN`
  が本家の未定義検出法なので、この区別が効いている）。読み取り時に自動キャスト（`@str` 終端は除く）、
  prefix が JSON 文字列ならその中へ降りる（`const.db.紀子.fn`）。
- **`src/ts/ExprEval.ts`** — 本家 `PropParser` を丸ごと移植（parsimmon）。`T_VAR_GET` を取るので
  テストは本家 `ValTest` 的なフラット表を渡せる。
- **`src/ts/ScriptMng.ts`** — 橋渡し。`#runStep()` が `engine.step()` を呼び、`#applyAction()` が
  各アクションを store 更新に翻訳、`loadScript` なら fetch してループ。**アセットパス解決
  (`path.json`→`searchPath`) もここ**で、store は論理名 `fn` と解決後 URL `src` の両方を持つ。
  `searchPath` は見つからないと throw し、render 中の throw は React ごと落とすため。画像欠損は
  `'E'`（表示のみ）、スクリプト欠損は致命的。
- **`src/store/store.tsx`** — zustand。単一の真実。`aPage: [T_LAY[], T_LAY[]]` が fore/back 2 ページ
  （本家 `Pages.ts`）で `foreIdx` がどちらが fore かを示す。`[add_lay]` は**両ページ**に作る。
  **レイヤ `nm` は `grp`/`txt` を跨いで一意**（重複は throw、React key も衝突する）。
- **`src/components/`** — React 19 + `@emotion/react` JSX。`Main.tsx` がキー/クリックと `ev_next`
  ループ、`Stage.tsx` が `aLay` 描画、`TxtLayer`/`GrpLayer`/`BtnLayer` が 3 役。`Stage` は
  モジュールトップで `lazy()`。**`Stage.tsx` を静的 import してはいけない**（value import 1 つで
  分割が効かなくなる／rolldown が `INEFFECTIVE_DYNAMIC_IMPORT` を言う）。共有部品は
  **`src/components/Lay.ts`**（`T_LAY` 等、`styLay`、ドラッグフラグ）に置く。
- **`src/ts/Memento.ts`** — `Caretaker` が停止点ごとに `${fn}:${idx}` キーでスナップショット。
  PageUp/Down の既読読み返し用。ボタンジャンプはこの履歴を**触らない**。
- **`src/sn/`** — 本家から持ってきた土台（`SysBase`, `Config`, `Grammar`, `CmnLib`,
  `AnalyzeTagArg`, `Areas`, `CallStack`）。

**本家由来ファイルは本家のテストを無改変で持っている**（`test/Grammar.test.ts`,
`test/ExprEval.test.ts`, `test/VarStore.test.ts` の後半）。これらを触るときはまず
`../skynovel_esm/src/sn/…` と diff を取る。テストが契約で、意図的な相違は各テストの冒頭コメント。

**文字列リテラルにエスケープを書かない。** `\'` や `\"` が要る文字列はテンプレートリテラルにする
（`` `[if exp="mp:v=='X'"]` ``）。`.sn` 断片は両方の引用符だらけで、バックスラッシュだと読めない。

### 実装済みタグ

`add_lay`, `current`, `add_face`, `lay`, `clear_lay`, `trans`/`wt`,
`add_filter`/`clear_filter`/`enable_filter`,
`tsy`/`wait_tsy`/`stop_tsy`/`pause_tsy`/`resume_tsy`, `page`（`clear=true` のみ）,
`let`, `let_ml`/`endlet_ml`, `let_abs`/`let_round`/`let_length`/`let_char_at`/`let_index_of`/
`let_substr`/`let_replace`/`let_search`, `if`/`elsif`/`else`/`endif`, `r`, `er`, `trace`,
`jump`, `call`/`return`, `macro`/`endmacro`, `char2macro`/`bracket2macro`, `button`,
`event`/`clear_event`, `enable_event`, `wait`, `clearvar`/`clearsysvar`, `pop_stack`, `title`,
`rec_ch`/`rec_r`/`reset_rec`（本文履歴。`src/ts/Log.ts`），
`ch_in_style`/`ch_out_style`/`autowc`（文字出現演出と文字ごとのウェイト。`src/ts/ChStyle.ts`。
**消去演出はまだ適用していない**），
`toggle_full_screen`, `dump_lay`, `add_frame`/`frame`/`set_frame`/`let_frame`, `set_focus`,
停止点 `l`/`p`/`s`/`waitclick`。

**属性ごとの詳細と実装状況は `docs/tag.html`**（変数は `docs/dev.html`）。名前に
🟢実装済 / 🟡一部 / 🔴未実装 のマークが付いており、bluesnovel 固有の相違・メモは各タグの詳細部に
書く。**タグや変数を実装・変更したらこのマークを更新する**（「何が動くか」の唯一の情報源。おかげで
`todo.md` は状況一覧でなく作業計画のままでいられる）。

`jump`/`call`/`return`/`button` は `fn=` でファイルを跨げる。マクロは定義元と別ファイルからも
呼べる。マクロ名は `ScriptEngine.RESERVED_TAGS` と `REG_NG4MAC_NM` で弾く。`[macro]` の入れ子は
ここでは動くが本家では動かない。

非タグ構文も本家互換（Grammar 由来）: 複数行タグ、`;` コメント、`[`/`]`/`;` を含む文字列リテラル、
`&名前 = 式 [= cast]` 代入（`&&式 = 式` は名前も式評価）、`&式&` インライン表示。`&` 系はトークンが
`&` で**始まる**ときだけ発火（行頭かタグ直後）。引用符を含む属性値は値全体を引用する
（`[if exp="mp:v=='X'"]`）。`AnalyzeTagArg` は無引用値を最初の引用符で切るため。

### タグ属性の共通前処理

`ScriptEngine.#resolveTag()`（本家 `ScriptIterator.ts:418 タグ解析()` 前半の移植）が全タグ共通で
処理するので、個別タグ側でやってはいけない:

- `cond=…` — 偽ならタグを**実行しない**。制御構文タグ含め全タグに効く。`exp` 同様、先頭 `&` は不可。
- `%属性名` — 現マクロに渡された属性値、`|省略値` がフォールバック。引数も既定値も無ければ
  **属性そのものが渡らない**（タグ自身の既定値に落ちるための仕組み）。マクロ外では throw。
- `[tag *]` — マクロが受けた属性を全部継承。明示指定が勝つ。マクロ外では throw。
- `&式` — 値を式評価。`undefined` なら属性を落として `|省略値` を試す。

`%` と `*` が読むのは `#aCallStk[].hArgs`＝呼び出し時に退避した**生の属性文字列**（本家 `csArg`）。
同じ値は `mp:` にもあるが `VarStore` が読み取り時に自動キャストする（`'1.20'`→`1.2`）ため。
`[call]` も属性を退避するので、素のサブルーチンでも `%` が使える。

トークンを**実行せず走査する** 2 箇所（`#if()` の `elsif`/`else`/`endif` 探索、`[macro]` の
`[endmacro]` 探索）は生の `ScriptEngine.parseTag()` を使う。本家もそこは `hPrm` を直読みしている。

## 落とし穴

**「ページ」が 2 つの別物を指す**（本家由来の語彙の罠）。どちらか必ず明示すること。

- **レイヤページ (fore/back)** — 全レイヤが持つ 2 枚の描画面。`[lay page=…]`, `[trans]`, `[er]`。
  コード上は `aPage`/`foreIdx`/`T_PAGE`。
- **テキストページ (`[p]` 区切りの本文)** — 読み返しログの単位。`[p]`, `[page clear=true]`。
  コード上は `Caretaker` の履歴。

両者は無関係。`[page]` は名前に反して**後者**を操作する。

**fore/back と `[trans]`。** シナリオは back に次のシーンを組んで `[trans]` で入れ替える。

- store は**2 配列間でレイヤデータを動かさない**。`[trans]` は `foreIdx` を反転するだけ。中身を
  入れ替えると両コンテナの子が丸ごと差し替わり、`TxtLayer` が遷移と同時にタイピングを再生する。
- クロスフェードは fore の opacity **1→0**（下に back）。back を上にフェードインさせると、back が
  透明な箇所で最後にパチッと切り替わる。fore を消す方式なら遷移中の見た目が既に最終状態。
- **表示属性はシナリオが書いたときだけ格納する**（`T_LAY_STY` は全 optional、本家の
  `'left' in hArg` 判定と同じ）。既定値を持たせると毎 render で全属性のインラインスタイルが出て、
  各レイヤ component 自身の CSS を黙って上書きする。`[clear_lay]` はキーを**削除**する（数値に
  戻すのではなく）。`visible` は触らない。
- 書き込みはページ単位。`[lay]` の既定は `fore`、`[button]` は本家同様 `back`、`[er]` は**両ページ**
  を消す（でないと `[trans]` で前シーンの本文が戻ってくる）。
- **遷移の完了を宣言するのは `ScriptMng`**（GSAP の `onComplete` ではない）。`Stage` は描くだけ。
  `finishTrans()` が同期的に `foreIdx` を反転し、その後シナリオが再開する。`[wt]` も同じ期限を待ち、
  途中クリックは「今すぐ終われ」と読み替える（`#goSafe()`）ので必ず最終状態に着地する。

**`[tsy]` は `[trans]` と逆で、DOM でなく store を通す。** GSAP はプレーンオブジェクトを動かし、
`onUpdate` が `chgLay` で毎フレーム store に書き戻す。DOM だけ塗る方が安いが、それだと Memento と
`[trans]` のレイヤ複製がアニメ前の値を読む。帰結が 2 つ: 本家の `arrive` 属性は実質常時 on、
そして **GSAP のターゲットをそのまま store に渡してはいけない**（`_gsap` キャッシュが循環参照を
作り `structuredClone` と `JSON` を壊す。`ScriptMng` はアニメ対象プロパティだけコピーする）。
純粋な部分（属性値→ターゲット、ease 名変換、tween 命名）は **`src/ts/Tsy.ts`**。本家の `[tsy]` は
`x`/`y` しか読まないが、ここでは `left`/`top` の別名なのでどちらでも動く。

**HTML フレーム (`[add_frame]`) は意図的に store の外**。フレームは自前の JS 状態を持つ生きた HTML
文書なので JSON スナップショットでは復元できない（本家もレイヤ/ページ系から外している）。
`src/ts/FrameMng.ts` が DOM 側で所有し、`src` でなく `srcdoc` にすることで same-origin となり
`[set_frame]`/`[let_frame]` が iframe 内の `var` を直接叩ける。`Stage.tsx` はコンテナ div を出すだけ
（**JSX 上は空**なので React が iframe を回収しない）。それをスケール済みステージ箱の**内側**に置く
のが本家より簡単な唯一の点＝座標がステージ単位で書け、リサイズ追従がタダになる。`[add_frame]` と
`[let_frame]` は**停止点**（DOM を触り、結果をシナリオが読む前に変数へ書き戻す必要があるが、
アクション適用は `step()` 復帰後なので）。忘れがちな 2 点: **フレーム内のキーは親文書に届かない**
ので `FrameMng` が `document` へ再 dispatch する（本家 `EventMng.resvFlameEvent`）。フレーム内要素の
blur は親では iframe 自身が focus されたままになるので `[set_focus to=null]` は両側で blur する。

**`src/ts/FocusMng.ts`** は `[set_focus]` のリング。モジュールレベルに 1 インスタンス置くのは、
React ツリー (`BtnLayer`) と DOM 側 (`ScriptMng`) の両方から触る画面規模の状態だから（`Lay.ts` の
ドラッグフラグと同じ形）。要素が入るのは本家同様 3 経路: マウント中の `[button]`、
`[event key='dom=…']` の**最初の**一致、`[set_focus add='dom=…']`。

**フィルタは pixi→DOM 相違が最も出る箇所。** 本家は pixi フィルタ 22 種、CSS `filter` でそのまま
書けるのは 9 種、それが `src/ts/Filter.ts` の実装範囲。残り 13 種は `noise` 以外すべて
`ColorMatrixFilter` プリセットなので、同じ 5×4 行列を SVG `feColorMatrix` に食わせれば後から到達
できる（エラーメッセージがそう言っており、「そんなフィルタは無い」と「本家にはあるが CSS で無理」
を区別している）。`[lay filter=]` はリストを**置換**、`[add_filter]` は追加。この非対称は本家由来。

**重ね順は `aPage[i]` の配列順**（後ろ＝手前）。pixi の child 順と同じ。`[lay float=/index=/dive=]`
が並べ替えるが、**必ず両ページ同一に**（`pickPage`/`putPage` と `[trans]` のレイヤ複製が、2 配列に
同じ名前が同じ順で並んでいることを前提にしている）。*現在の*順序が要るもの（これらと `[tsy]` の
`'=100'` 相対値）はエンジンでなく store で解決する。エンジンは意図を出し、store が算術をやる。

**ステージ**は `<div id="skynovel">`（本家と同じ語）。サイズは `prj.json` の `window.width`/`height`
に固定、`overflow: hidden`、画像の無い所は黒。`Stage.tsx` が内箱をその実寸で描き
`transform: scale(cvsScale)` で窓に合わせる。`transform` はレイアウトサイズを変えないので、
`useLayoutEffect` が**スケール後**のサイズを `#skynovel` 自身にも書く（でないと高さ 0 に潰れて
全レイヤがはみ出す）。

`char2macro`/`bracket2macro` は**トークン配列をその場で書き換える**（`Grammar#replaceScr_C2M`）。
定義タグ以降のみで、前のテキストはリテラルのまま。1 テキストトークンが複数に割れることもある。
帰結 2 つ: `Script` は定義のたびラベル表を再導出する（`Script.defC2M()`）。`step()` は
`this.#script.len` をキャッシュせず毎回読み直す。定義は共有 `Grammar` に載るので、後からパースされる
ファイルは置換済みで出てくる（パース済みファイルは遡らない。本家同様）。

`[event key=… label=… call=… global=… del=…]` はキー/クリックを予約する。エンジンは**表だけ**持ち
DOM を触らない。キー名を決めるのは `Main.tsx` の `keyName()`＝`KeyboardEvent.key` の小文字に
`alt+`/`ctrl+`/`meta+`/`shift+` をこの順で前置（本家 `SysBase.modKey()`）、それと `click`。
`[toggle_full_screen key=…]` も予約するが `ScriptMng` 上の別表で、`Main.tsx` はそちらを先に見る。
ローカル予約は 1 回限りで、`[call]` がコールスタックに退避し `[return]` が復元する。**マクロ呼び出し
では退避しない**（本家 `ScriptIterator.ts:957`）。`global=true` はこれら全部の対象外。

**既読管理**は `step()` が取る全トークンで走る。`#recordKidoku()` がファイル別 `Areas`（本家のクラス
を移植）に位置を記録し、組み込み `const.sn.isKidoku` を立てる。本家からそのまま来た規則が 2 つ:
コールスタックが空でない間はフラグを**更新しない**（サブルーチンは既読/未読どちらからも来るので
記録だけする）。`[call]` は `count=true` でない限り戻り位置を既読集合から消す（`[jump]` は既定が逆）。
`[clearsysvar]` で全消去。永続化層がまだ無いのでエンジンが表を持つ（`getKidoku()`/`setKidoku()` は
その日のため）。

**オート/スキップ** (`&sn.auto.enabled` / `&sn.skip.enabled` / `&sn.skip.all`)。エンジンは*判断*
だけする＝`[l]`/`[p]` ごとに `#calcResume()` が `T_RESUME` を返し `stop` アクションに乗せる。
未読の停止点に来たらスキップを解除（`skip.all=false` 時）、`[s]` は常に `cancelAutoSkip()`。
*タイミング*は `ScriptMng` の担当で、`#scheduleResume()` のタイマが自分で `go()` を呼び、
`cancelAuto()`（`Main.tsx` が手動入力時に呼ぶ）が止める。`isNextKidoku` はサブルーチン内なら本家に
倣って呼び出し元ファイルを見る。`sys:sn.skip.mode` は既定 `'s'`（`[p]` を貫通）、`'p'` はページ毎停止。

## E2E テスト (`test/e2e/`)

spec もフィクスチャアプリも `playwright.config.ts` も `tsconfig.json` も全部この下（ルートを汚さない
ため）。単体テストと完全分離。

- **ブラウザが必要なものだけここに書く**: DOM／computed CSS／`document.title`、入力イベント、
  React 描画に依るもの（Caretaker/Memento）、fetch とスクリプト切替の非同期経路、`prj.json` 配線。
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
  `Loading` を出している間にテストが先走ると `Caretaker.update()` が Memento を記録せず、読み返しが
  黙って壊れる。
- ルート `tsconfig.json` は `test/e2e` を**除外**している（さもないと `vite-plugin-dts` がテストの
  `.d.ts` を `dist/` に吐く）。型チェックは `test/e2e/tsconfig.json` 側。

## 参考資料

- **タグ仕様**: <https://famibee.github.io/skynovel_esm/tag.html>（ローカル
  `../skynovel_esm/docs/tag.html`）。本家の全タグ名の正典は
  `../skynovel_esm/src/sn/Grammar.ts` の `T_HTag` 型、実装は `../skynovel_esm/src/sn/*.ts` の
  `hTag.<name> = …`。
- **機能別サンプル**: [SKYNovel_gallery](https://github.com/famibee/SKYNovel_gallery) の
  `public/prj/<機能>/`。実シナリオでの属性の書かれ方の事実上の仕様。
- **フルサンプルゲーム**（本家形式）: `../tmp_esm_uc/doc/prj/`。`script/main.sn` が
  `theme/setting.sn` / `theme/ext_*.sn` / `script/sub.sn` / `frames/_yesno.sn` を呼び、
  `theme/title.sn` へ jump する。タグに見えるものの多くは**プロジェクト側マクロ**（`img`, `grp`,
  `fg*`, `txt_lay_*`, `sys_menu`, `ask_ync` …）で、`[notice]` はプラグイン由来でエンジンではない。
- **`test/uc_goal.test.ts` がプロジェクトの到達目標を測る**: 上記サンプルを `main.sn` から
  `title.sn` の `[s]` までエンジンだけで走らせる。`ScriptMng` が DOM 側でやる 3 つ（スクリプト
  fetch、フレーム読み込み、環境組み込み変数の登録）を偽装すれば足りる。兄弟チェックアウトが
  無ければ skip。タグを足したら走らせること。上流ソースを読むだけでは見えない穴が見つかる。

## 規約

- コメントとコミットメッセージは**日本語**。周囲のコメント密度に合わせる（このコードベースは
  特に本家との相違について厚く書く）。
- **TODO は `.ts`/`.tsx` で `//TODO: ` の形ちょうど**（`//` の前に空白なし、コロンの後に 1 個）。
  VSCode 拡張 *Todo+* がこの prefix しか拾わない。
- **`todo.md`** がルートの作業計画（*Todo+* のチェックボックス形式、ほぼ優先度順）。セッション開始
  時に読む。**終わった項目は `todo.md` に残さず `CHANGELOG.md` へ移す**。`CHANGELOG.md` 末尾付近の
  単独の `- [ ]` マーカの位置に `- [x] …` ブロックを書き、後ろに空行 1 つ、**マーカはそのまま残す**
  （次回も同じ手順で追記できるように）。同じ作業で `todo.md` からは消す。
- **属性の既定値は 1 箇所**。エンジンの入口（タグの `case`）か CSS か、どちらかに決めて**両方には
  書かない**。CSS も「宣言された 1 箇所」なので外側にあること自体は悪くない。悪いのは枝葉の
  コンポーネントが場当たりに `??` で発明することで、そうなると同じ問いの答えが N 箇所に散る。
  - **判定**: その値をストアが知らなくても、セーブ・読み戻し（Memento）・`[dump_lay]` が正しいまま
    か。いいえなら入口、はいなら CSS に任せて格納しない。`[button]` の `width`/`height` は
    「いいえ」（本家 `Button.ts` も `#o` へ確定値を記録する）、`[lay left]` の 0 は「はい」。
  - **入口は書き込み時に焼き付き、CSS は描画時に毎回評価される**。既定を後で変えたとき、入口方式は
    古いセーブが元の値のまま・CSS 方式は古いセーブも新しい既定で描き直される。どちらが欲しいかは
    属性ごとに違うので、これも選択の材料にする。
  - どちらに決めたかの台帳は **`test/argdef_parity.test.ts`** の 3 つの表（`A_CSS_DEF` /
    `A_ELSEWHERE` / `A_NOT_YET`）。本家の `argChk_*` の既定を抜き出して突き合わせ、属性を 1 つも
    書かないタグを**実際に走らせて**既定が出ることまで見る。新しいタグを足したらここも足す。
- **strict TypeScript**: `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`,
  `noUnusedLocals`/`Parameters`（未使用引数は `_` 前置で許可）, `noImplicitOverride`。
  `strictPropertyInitialization` は off。
- **serena MCP はこのプロジェクトでハングした実績がある**（タイムアウトを返しつつ処理は実行された
  ことも）。まず軽い呼び出し（`get_current_config`）で生死を見る。タイムアウト後は再実行の前に
  状態を確認する。シンボル系ツールは `activate_project`（`bluesnovel`）が先に要る。
- リリースは `semantic-release` ＋ conventionalcommits プリセット。
