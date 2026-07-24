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


- スクリプト解析を強化。skynovel_esmプロジェクトのtestを順にテスト駆動で実装したい
	- Grammar.test.ts
	- Variable.test.ts
	- PropParser.test.ts
- [x] **スクリプト解析の強化：本家testのテスト駆動移植**（2026-07-24 完了）
  - `Grammar.test.ts`（84件）：本家 `test/Grammar.test.ts` を無改変で移植。`src/sn/Grammar.ts`へ本家の字句解析部（`resolveScript`/`setEscape`/`char2macro`/`bracket2macro`/`splitAmpersand`/`tagToken2Name_Args`/ワイルドカード展開）を移植
  - `Variable.test.ts`（`test/VarStore.test.ts`後半へ統合）：JSON下位階層の参照、`["キー"]`記法、`@str`、`def`/`touch`、自動キャストを実装
  - `PropParser.test.ts`（261件 → `test/ExprEval.test.ts`）：`src/ts/ExprEval.ts`を本家PropParserの全面移植へ差し替え。三項演算子・ビット演算・`¥`（整数除算）・16進・`int/parseInt/Number/ceil/floor/round/isNaN`・`#〜#`文字列・`$変数`/`#{式}`埋め込み・`hA[春夏][ひきす]`添字解決に対応
  - **仕様変更**：未定義変数の取得結果が `null` → `undefined` になった（本家準拠。`null`は「nullが入っている」の意）。`1 + 未定義 → NaN` で未定義を検出する本家の流儀に必要
  - ユニット533件・E2E15件・`tsc --noEmit` すべてクリーン


- 徐々に試作から本番にスライドしていく方針
- こちらのスクリプトにだいたいの文法が入っているように思う。簡略化してテスト化＆テスト通しを
	https://github.com/famibee/tmp_esm_uc/blob/main/doc/prj/frames/_yesno.sn
- [x] **`ScriptEngine`の字句解析・タグ引数解析を本家実装へ差し替え**（2026-07-24 完了）
  - `ScriptEngine.tokenize()`/`RE_TOKEN`を廃止し、`Grammar.resolveScript()`へ委譲
  - `ScriptEngine.parseTag()`の`RE_ARG`も廃止し、本家`tagToken2Name_Args()`＋`AnalyzeTagArg`へ委譲
  - `step()`のトークン振り分けを本家`Main.ts#main()`と同じ「先頭一文字」方式へ（`\t`/`\n`読み飛ばし、`[`タグ、`&`変数操作、`;`コメント、`*`ラベル、それ以外は文字表示）。`trimStart()`は不要になったので全廃
  - `Grammar`の`cfg`を省略可にした（ワイルドカード展開にしか使わないため）
  - これにより新たに使えるようになったもの：複数行タグ、タグ内`;`コメント、文字列リテラル中の`[`/`]`/`;`、`&名前 = 式`代入（`&&式 = 式`で変数名側も式評価）、`&式&`表示
  - 注意：属性値に引用符を含む場合は値全体を引用符で囲む必要がある（`[if exp="mp:v=='X'"]`）。旧`RE_ARG`は`\S+`で雑に拾っていたが、`AnalyzeTagArg`（本家）は引用符の手前で値を切る
  - ユニット546件・E2E15件・`tsc --noEmit` すべてクリーン

- [x] **`[let_ml]`〜`[endlet_ml]`（複数行テキスト代入）の実行時対応**（2026-07-24 完了）
  - `ScriptEngine.#execTag()`に`let_ml`/`endlet_ml`を追加（本家`ScriptIterator.ts:718 #let_ml()`相当）。本文トークンをそのまま変数へ入れ、`[endlet_ml]`の次から実行を続ける
  - ラベル収集も本家`in_let_ml`と同様に本文を読み飛ばす（本文中の`*〜`をラベルとして拾わない）
  - 本家より厳しくした点：`[endlet_ml]`が無ければ例外。本文が空（`[let_ml …][endlet_ml]`）なら空文字を代入（本家はこの2ケースで本文位置がずれる）
  - 差異：本家は`cast='str'`を付けて`[let]`へ渡すが、bluesnovelの自動キャストは読み出し側（`VarStore.get()`）なので書き込み時の指定に相当するものが無い。数値だけの本文を文字列のまま読みたい場合は`名前@str`で参照する

- [x] **`cast`指定（`num`/`int`/`uint`/`bool`/`str`）の対応**（2026-07-24 完了）
  - `VarStore.set(name, val, cast)`＋`VarStore.castTo()`を追加（本家`Variable.ts:317 #let()`のswitch相当）。数値変換は本家`argChk_Num()`同様に`0x`始まりを16進として読み、数値でなければ例外
  - 適用先は`[let cast=…]`・`&名前 = 式 = キャスト`書式・`[let_ml]`（本家同様`str`固定）の3経路
  - `cast=str`は「読み出し時の自動キャストもしない」指定。bluesnovelの自動キャストは`get()`側にあるため、対象キーを`VarStore.#setNoCast`で覚える方式にした（cast無しで代入し直す／`clearvar`等で消すと解除）
  - これで`[let_ml]`に数値だけの本文を入れても文字列のまま保てるようになった（前回残していた差異を解消）
- [x] **`[trace]`の`&`評価を`ExprEval.getValAmpersand()`へ統合**（2026-07-24 完了）
  - `ScriptEngine.#evalAmpArg()`を廃止。未定義変数は空文字ではなく`undefined`と表示される（本家準拠。デバッグ用タグなので無言で消えるより分かりやすい）

- [x] **E2Eの拡充**（2026-07-24 完了）
  - フィクスチャ`test/e2e/app/prj_expr/`と`test/e2e/expr.e2e.ts`（6件）を追加。E2Eは計21件に
  - 検証内容：`[let]`＋`&計算`書式の結果が`&式&`で画面へ出る／`[trace]`がデバッグ表示へ出る／`[lay b_alpha=…]`が背景の不透明度になる／`[if]`/`[elsif]`/`[else]`の分岐／マクロ引数（`mp:`）／`[let_ml]`のJSON下位階層参照
  - `snPage.ts`に`traceText()`を追加（`ScriptMng`が`document.body`直下へ挿すspanを、`src/`にidを足さず「body直下のspan」という位置だけで特定）
  - シナリオを書く際の注意：`&代入`・`&式&`は「トークンの先頭が`&`」の位置（行頭かタグ直後）でしか効かない。地の文の途中に書くとそのまま表示される

- [x] **マクロ関連の残課題**（2026-07-24 完了）
  - マクロ名の禁止文字チェックを実装（`ScriptEngine.REG_NG4MAC_NM`。本家`ScriptIterator.ts:1362`をそのまま移植：`"` `'` `#` `;` `\` `]` と全角空白）
  - 入れ子の`[macro]`定義に対応。本家は最初に見つけた`[endmacro]`で終端とみなすため入れ子定義が壊れるが、こちらは深度を数えるので「outerを呼ぶとinnerが定義される」書き方ができる（＝本家より緩い。本家へ持っていくスクリプトでは使わないこと）
  - `[macro]`本体の読み飛ばしが`[let_ml]`本文を無視するようにした（本文中に`[endmacro]`と読める行があっても本体が切れない）
  - `#hLabel`/`#hTxt`/`#hFace`/`#hMacro`を`Object.create(null)`に。素の`{}`だと`toString`等の`Object.prototype`のキーが`in`や参照でヒットし、その名前のラベル・レイヤ・差分名・マクロが壊れていた
  - `ICallStackArg`統合：**不要と判断して見送り**。`src/sn/CallStack.ts`の`CallStack`クラスは本家から持ってきたものの一度も使っておらず、`CmnInterface.ts`が型`T_H_VAL_MP`をimportしているだけ。複数ファイル対応で戻り先に`fn`が要るようになった時点で改めて検討する

- [x] **`ScriptEngine.#if()`のトークン走査で`[let_ml]`本文を読み飛ばすように**（2026-07-24 完了）
  - 本文が`[endif]`/`[else]`等で始まると、ifブロックがそこで切れて本文を実行してしまっていた
  - これでラベル収集・`[macro]`本体の読み飛ばし・`[if]`走査の3箇所すべてが`[let_ml]`本文を無視するようになり、揃った
  - 回帰テスト2件を追加し、修正を外すと落ちることも確認済み

- [ ]



CmnTween.test.ts
Config.test.ts
HyphTest.test.ts
Log.test.ts
RubySpliter.test.ts
SysTest.ts
ValTest.ts


- skynovel_esmプロジェクトのmain.snからたどり、
	- tmp_esm_uc/doc/prj/script/main.sn at main · famibee/tmp_esm_uc https://github.com/famibee/tmp_esm_uc/blob/main/doc/prj/script/main.sn
- 表示アーキテクチャがpixijsからReactに変更になるのでタグの変更・追加・削除などがありうるが、それはまた別項


- tmp_bluesプロジェクトで
	- doc/prj/script/main.sn は main0.sn に退避






















## v0.2.1
- 一部最新 SKYNovel コードを導入
## v0.2.0
- いったん SKYNovel をほとんど含まないシンプルな状態へ戻す。（スクリプト末尾エラーは出てる）
## v0.1.1
- electron-store は v8.2.0 止まりで。v9.0.0・v10.0.0 で「window.」が含まれており、アプリ版でエラーになる。
	- v1.53.13 の頃にも
## v0.1.0
- Initial commit
