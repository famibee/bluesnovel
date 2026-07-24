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

- [x] **`[return]`のlabel指定による戻り先変更**（2026-07-24 完了）
  - 本家`ScriptIterator.ts:994 #return()`の`{fn, label}`相当。`[return label=*x]`でコール元ではなく`*x`へ進む
  - 指定の有無にかかわらずコールスタックの巻き戻し・ifスタック復元・`mp:`復元は行う（本家と同じ順序）。壁(-1)も外れるので、戻り先で出会う`[endif]`はコール元の`[if]`に対応する
  - `[endmacro]`経由（マクロ本体からの`[return label=…]`）でも同じ
  - **`fn`指定（別スクリプトへ戻る）は例外にした**。複数ファイル対応待ちだが、黙って無視すると「戻ったつもりが元の位置」という分かりにくい挙動になるため
  - テスト6件追加（戻り先変更／スタックは通常どおり1段外れる／ifスタック復元／マクロから／未定義ラベル／fn指定）

- [x] **複数ファイル（`jump fn=…`/`call fn=…`）対応**（2026-07-24 完了）
  - `src/ts/Script.ts`を新設し、1ファイル分のパース結果（トークン列＋ラベル表）を`ScriptEngine`から分離。`ScriptEngine`は実行状態（`#idx`/`#aIfStk`/`#aCallStk`/`#hMacro`/変数）だけを持ち、`switchScript()`でファイルを切り替える
  - **`ScriptMng`が持つエンジンは1つだけに**（旧：ファイルごとに`ScriptEngine`を作っていたため、ファイルを跨ぐと変数もスタックも別物になっていた）。`ScriptMng`はfetchとパース結果のキャッシュだけを担当
  - 別ファイルが要るタイミングで`step()`は`{t:'loadScript', fn, label, idx}`を返して一旦止まる。`step()`自体は同期のまま＝DOM/fetch非依存でユニットテストできる設計を維持
  - 対応した経路：`[jump fn=…]`・`[call fn=…]`（`[return]`で呼び出し元のファイルへ戻る）・`[return fn=…]`・別ファイルで定義されたマクロの呼び出し
  - コールスタックに`fn`、マクロ表に定義元`fn`を追加。組み込み変数`const.sn.scriptFn`は遅延評価なので切替に自動追随する
  - `#runStep()`を非同期化。ロード待ち中に来た進行要求は**捨てずに回数を数えて後で消化**する（ロード無しならクリック1回＝1停止点ぶん進むのに合わせた）
  - テスト：ユニット`test/ScriptEngine_multifile.test.ts`（11件、擬似ファイル表でloadScriptプロトコルを回す）、E2E`test/e2e/multi.e2e.ts`（3件、`prj_multi/main.sn`＋`sub.sn`で実際のfetchを通す）
  - E2Eの注意：ファイル切替はfetchを挟むため、進行の途中でも「ストアもDOMも一致し文字送りも終わっている」瞬間（`[er]`直後のロード待ち等）が生まれる。`waitIdle()`はそれを停止点と区別できないので、`multi.e2e.ts`では`expect.poll`で「その表示に落ち着くまで待つ」形にしている

- [x] **`[button]`の`fn`指定（別ファイルのラベルへ飛ぶボタン）**（2026-07-24 完了）
  - `addBtn`アクション・store の`T_ADDBTN`/`T_BTN`・`TxtLayer`/`BtnLayer`/`Stage`の`onActivate`まで`fn`を通した
  - `ScriptMng.jumpToLabelAndGo()`を非同期化（ロード→`switchScript`／`callToScript`）。クリックハンドラ側は投げっぱなしで良いよう、例外はここで握る
  - `ScriptEngine.callToScript()`を追加。`[button fn=… call=true]`用で、戻り先は`callToLabel()`と同じく「今いる停止点そのもの」＝`[return]`で`[l]`のイベント待ちへ戻る
  - `[button]`の必須属性が「label」から「fnまたはlabel」に。`fn`のみ指定ならそのファイルの先頭へ飛ぶ（`nm`省略時は`label`、無ければ`fn`を流用）
  - テスト：ユニット3件（`fn`の受け渡し・`nm`のフォールバック・`callToScript`の往復）、E2E2件（`prj_button/sub2.sn`を追加）

- [x] **`Grammar`をプロジェクト単位で共有＋エスケープ文字の実装**（2026-07-24 完了）
  - `Script`が使った`Grammar`を公開し、`ScriptMng`が1つだけ作って全`Script`へ渡すようにした。エスケープ文字や`[char2macro]`/`[bracket2macro]`の定義は`Grammar`インスタンスが抱えるので、ファイルごとに別だと設定が行き渡らない
  - `ScriptEngine`も自前の`Grammar`をやめ、実行中`Script`のものを使う
  - `ScriptMng`が`Grammar`に`sys.cfg`を渡すようになったので、`[call fn=…*]`/`[loadplugin fn=…*]`のワイルドカード展開も効くようになった（従来はcfg無しで生成していて無効）
  - **prj.jsonの`init.escape`を実際に適用**。`Grammar.setEscape()`を呼ぶようにし、表示時にエスケープ文字1文字を落とす処理を`ScriptEngine.step()`へ追加した（本家は表示側`RubySpliter.putTxt()`が同じことをしている。bluesnovelにRubySpliterはまだ無いのでエンジン側で行う）。`Grammar`に`get ce()`を追加
  - テスト：ユニット3件（Grammar共有／`\[`等のエスケープ表示／未設定時は従来どおり）、E2E1件（`prj_expr`の`init.escape`を`\`にし、`\[esc\]`がタグにならず`[esc]`と表示されることを確認）

- [x] **E2E `multi.e2e.ts` のフレーク修正**（2026-07-24）
  - 症状：`[jump fn=…]で別ファイルへ移動して停止する`等が3回に1回ほど落ち、表示が停止点1つ手前で止まっていた
  - 原因：ファイル切替のfetch待ちの間に「ストアもDOMも一致し、文字送りも終わっている」瞬間ができる。`waitIdle()`はそれを停止点と区別できないため次のキーを早く打ちすぎ、そのキーがロード完了後に始まった文字送り演出の**「瞬時完了」として消費**されて（`Main.tsx` `next()`は`isTyping`中の入力を進行に使わない）、進行が1回分まるごと失われていた
  - 対処：`snPage.ts`に`pressKeyToWaitMark()`を追加。待ちマーカー（`store.wait`）は`#runStep()`の各反復の頭でnullに戻り`[l]`/`[p]`でだけ立つので、これを見れば「本物の停止点」だと確実に分かる。`[s]`では立たないため、そこだけ従来の`pressKey`＋`expect.poll`で受ける
  - `multi.e2e.ts`単体10回反復＋全E2E6回連続で緑を確認（修正前は約1/3で落ちていた）

- [x] **E2Eを「ブラウザでしか確かめられないもの」だけに整理**（2026-07-24）
  - 判定基準：DOM/算出CSS/`document.title`・入力イベント（クリック/キー）・React描画に依存する仕組み（Caretaker/Memento）・fetch/非同期・prj.json等の設定配線、のいずれかを含むものだけE2Eに残す
  - `mesStr()`/`snap()`はストアを読むだけなので、それしか見ていないテストは実質「エンジン＋ScriptMngのブリッジ」テスト。エンジン側のロジックがユニットで担保済みなら重複と判断した
  - 削除4件：`expr.e2e.ts`の「`[let]`と`&計算`」「`[if]`分岐」「マクロ引数`mp:`」（それぞれ`amp_*`／`ScriptEngine_if`36件／`macro_args_passedViaMpNamespace`が担保）、`wait.e2e.ts`の「`[p]`の次の進行でページがクリアされる」（`step_p_clearsOnResume`が担保）
  - `prj_expr`のシナリオも、残した3件（`[trace]`のDOM表示／`b_alpha`の算出CSS／`init.escape`の配線）だけを扱う最小構成へ縮小。停止点が1つになり押下操作も不要に
  - E2E 26件 → 22件。ユニット602件は変更なし

- [x] **`[char2macro]`/`[bracket2macro]`（一文字マクロ・括弧マクロ）に対応**（2026-07-24）
  - 地の文の中の「一文字」「括弧で囲んだ範囲」を、タグ・マクロ呼び出しへ読み替える仕組み。`[char2macro char=@ name=ハート]`以降の`@`は`[ハート]`に、`[bracket2macro text="〔〕" name=セリフ]`以降の`〔梨香〕`は`[セリフ text='梨香']`（＝マクロ側は`mp:text`で受け取れる）になる
  - 置換処理そのものは移植済みの`Grammar`が持っていた（`test/Grammar.test.ts`）ので、`ScriptEngine`にタグを足して繋いだ。`name`は「定義済みのタグかマクロ」でなければならず、本家は`hTag`を引くだけで済むが、試作はタグをswitch文で捌くため`#hTagNames()`（`RESERVED_TAGS`＋`#hMacro`）を都度組み立てて渡す
  - `Grammar`はトークン列を**その場で書き換える**（1トークンが複数へ割れる）ため、`Script`はトークン配列だけでなくGrammarの`Script`構造ごと保持する形へ変更し、置換のたびにラベル表を作り直すようにした（作り直さないと定義位置より後ろの`[jump label=…]`の飛び先がずれる）
  - 同じ理由で`step()`のループ条件も、先頭で1回読んだトークン数のキャッシュから`this.#script.len`の都度参照へ変更（実行中にトークン数が増減しうるため、キャッシュだと以降のトークンを取りこぼす）
  - 定義は共有`Grammar`が抱えるので、これ以降にパースされるファイルは`resolveScript()`の時点で置換済みになる。既にパース済みの他ファイルには及ばない（本家も同じ）
  - `char2macro`/`bracket2macro`を`RESERVED_TAGS`へ追加（マクロ名として使用不可に）
  - `test/ScriptEngine_macro.test.ts`に9件追加（定義前の文字は地の文のまま／未定義name・重複char・使用不可文字・2文字以外のtextはthrow／置換後もラベルが解決できる 等）。ユニット602件→611件

- [x] **`bunx tsc --noEmit -p test/e2e`が対象0件だったのを修正**（2026-07-24）
  - `extends`元（ルート`tsconfig.json`）の`exclude: ["test/e2e"]`は**extends元からの相対パス**として解決されるため、そのまま継承すると`test/e2e`自身が除外され、`error TS18003: No inputs were found`で1ファイルも型チェックされていなかった
  - `test/e2e/tsconfig.json`で`"exclude": []`と上書き。E2E側のソースは型エラー無しを確認

- [x] **ローカルイベント予約（`[event]`/`[clear_event]`）に対応**（2026-07-24）
  - `[event key=enter label=*x]`で「そのキーが押されたら読み進めではなく*xへ飛ぶ」予約ができる。`call=true`なら`[call]`扱い（`[return]`でその停止点へ戻る＝再びイベント待ちになる）、`fn=`で別ファイル、`del=true`で取り消し、`arg=`は`tmp:sn.eventArg`へ。発火時に`tmp:sn.eventLabel`/`tmp:sn.eventArg`をセットするのも本家（`Main.ts` `resumeByJumpOrCall()`）と同じ
  - **ローカルとグローバル**（本家 `ReadingState`の`#hLocalEvt2Fnc`/`#hGlobalEvt2Fnc`）：ローカル予約はjump系の発火で消える一回きりのもので、`[call]`時にコールスタックへ退避され`[return]`で書き戻される。**マクロ呼び出しだけは退避しない**（本家 `ScriptIterator.ts:957`「':hEvt1Time'の扱いだけは[macro]と異なる」）。`global=true`の予約はこれらの影響を受けない
  - エンジンはDOMに触れない方針を守り、予約は「飛び先の素データ」の表として持つ（本家はキー->コールバック関数の表）。キー名の取り決め（`KeyboardEvent.key`の小文字／クリックは`'click'`）と実際の入力との結び付けは`Main.tsx`の担当で、移動そのものは`[button]`クリックと同じ経路（`ScriptMng.jumpToLabelAndGo()`）を通す
  - `Main.tsx`のキー処理を、コード別の`useKey`4つから「まず予約を引き、無ければ従来の読み進め/読み戻り」の1つへ統合。クリックも同様に`fireEvent('click')`を先に見る
  - `ScriptMng.#jumpToLabelAndGo()`：`fn`指定かつ`label`省略（＝そのファイルの先頭へ）を、同一ファイルでもロード経由で扱うよう修正（`jumpToLabel('')`はラベル未定義でthrowになるため）
  - `test/ScriptEngine_event.test.ts`（新規23件）＋`test/e2e/event.e2e.ts`（新規4件・`prj_event`フィクスチャ）。ユニット611件→634件、E2E 22件→26件
  - E2Eに残したのは「ユニットでは届かないもの」だけ＝キー名の対応付け・クリック経路・予約が無いキーが従来どおり読み進めになること。予約表の挙動はすべてユニット側


- ok, 次の【既読処理】
- タグや機能のテスト・動作について参考になるかも
  - https://github.com/famibee/SKYNovel_gallery/blob/master/index.html
  - https://github.com/famibee/SKYNovel_gallery
  例えば既読処理は
    - https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/kidoku
    - https://github.com/famibee/SKYNovel_gallery/blob/master/public/prj/kidoku/mat/main.sn

- [x] **既読処理**（2026-07-24）
  - `step()`がトークンを読むたび、その位置をスクリプト別の`Areas`（本家から移植済みのクラス）へ記録する（本家 `ScriptIterator.ts:1292 #recordKidoku()`）。組み込み変数`const.sn.isKidoku`で参照でき、`[if exp="const.sn.isKidoku"]`で既読・未読を分岐できる
  - 本家の2つのルールをそのまま移植：**コールスタックがある間（サブルーチン・マクロ内）は既読フラグを更新しない**（同じサブルーチンが未読・既読どちらの文脈からも呼ばれるため、記録だけ行う）／**`[call]`は既定で戻り先の位置を未読へ戻す**（`count=true`で維持）。`[jump]`は既定が逆で既読のまま（`count=false`で消す）
  - `[clearvar]`/`[clearsysvar]`タグを追加。`VarStore`側の`clearGame()`/`clearSys()`は前からあったが、タグとしては未接続だった。既読情報が消えるのは`[clearsysvar]`（本家 `Variable #clearsysvar()`。gallery の kidoku サンプルが「既読情報クリア」ボタンでこのタグを使っている）
  - 保存は未実装。本家は`Variable.saveKidoku()`→`SysBase.data.kidoku`→localStorageだが、bluesnovelにはまだセーブ層が無いので当面エンジンが抱える。繋ぎ込み用に`getKidoku()`/`setKidoku()`を用意した
  - `test/ScriptEngine_kidoku.test.ts`（新規17件）。同じ位置を2周させ、1周目=未読／2周目=既読で確かめる形。ユニット634件→651件。E2Eは追加なし（ブラウザ側の配線が無い＝純粋なエンジンロジックのため）
  - 判明した点：`[jump count=false]`が消すのは「`[jump]`タグの次のトークン位置」で、そこは通常そのまま読み進める先ではないため実質効かない。本家の実装をそのまま移した状態なので`todo.md`へ確認事項として残した
  - `CLAUDE.md`に**SKYNovel_gallery**（<https://github.com/famibee/SKYNovel_gallery>）への参照を追加。機能ごとのサンプルシナリオがあり、タグ属性の実際の使われ方を確かめるのに使える

- [x] **オート読み・既読スキップ**（2026-07-24）
  - `&sn.auto.enabled = true`（一定時間で自動進行）／`&sn.skip.enabled = true`（既読部分を素早く飛ばす）／`&sn.skip.all = true`（未読も含め全部飛ばす）。3つはただのtmp変数で、`[if exp="sn.auto.enabled"]`でモード分岐もできる
  - **判断はエンジン（純粋ロジック）／タイマーはScriptMng**という分担にした。停止点`[l]`/`[p]`でエンジンが`#calcResume()`を評価し、`stop`アクションに`resume`（`{mode:'auto', msec}` か `{mode:'skip', msec:0}`）を付けて返す。既読スキップは`skip.all=false`なら未読に来た時点で止めて解除（本家 `Reading.ts` l()/p()）、`[s]`は必ず止まって`cancelAutoSkip()`（本家 s()）
  - `ScriptMng.#scheduleResume()`が`resume`を受けてタイマーで`go()`を自分で呼ぶ。`cancelAuto()`（`Main.tsx`が手動キー・クリックのたびに呼ぶ）でタイマー解除＋エンジンの3フラグを倒す。`[s]`到達・未読での停止でも自然に止まる（`resume`が返らない＝タイマーを仕込まない）
  - オート読みの待ち時間は`sys:sn.auto.msec{Line,Page}Wait`（既読時は`_Kidoku`側）。sys変数未設定でも既定値（行50…実際は500ms／改ページ3500ms）で動く。`isKidoku`（前回実装）と連動
  - 既読スキップ中は文字送り演出を省いて瞬時表示：`store.skipping`フラグを`ScriptMng`が立て、`TxtLayer`が読み戻り時と同じ経路（GSAPを使わず`gsap.set`で終端状態へ）で描く
  - `T_INIT_FNCS`に`requestSkip`/`setSkipping`を追加。`Main.tsx`のキー・クリック処理の先頭で`scrMng.cancelAuto()`を呼ぶ
  - `test/ScriptEngine_autoskip.test.ts`（新規14件、resume判断・待ち時間・`isNextKidoku`・`cancelAutoSkip`）＋`test/e2e/autoskip.e2e.ts`（新規2件・`prj_autoskip`フィクスチャ、クリック無しで`[l]`を越えて`[s]`まで進むこと）。ユニット651件→665件、E2E 26件→28件
  - E2Eに入れたのは「ブラウザでしか確かめられないもの」＝ScriptMngのタイマーが実際に画面を進めること。どの停止点で自動進行するかの判断は全部ユニット側
  - 残課題（`todo.md`へ）：`isNextKidoku`のクロスファイル対応、`sys:sn.skip.mode`、文字送りウェイト（`_Kidoku`）のGSAPパラメータへの接続、オート待ち時間の起点（本家は演出完了後）

- [x] **オート読み・既読スキップの残課題：`isNextKidoku`のクロスファイル対応とスキップモード**（2026-07-24）
  - `isNextKidoku`（既読スキップを「未読に来たら止める」判定）を、サブルーチン内では本家同様「呼び出し元の続き（戻り先）」を見るようにした。呼び出し元が別ファイルでもよいよう、コールスタックのエントリに呼び出し元の`Script`を持たせ、そのトークン数（`scr.len`＝スクリプト終端判定用）を引く（本家 `ScriptIterator.isNextKidoku`の`#hScript[cs.fn]`相当）
  - スキップモード`sys:sn.skip.mode`（既定`'s'`）に対応。`'s'`は行`[l]`も改ページ`[p]`も飛ばす、`'p'`は行は飛ばすが改ページで止まる（本家 `Reading.ts` p() は`mode==='s'`のときだけ改ページを飛ばす）
  - `test/ScriptEngine_autoskip.test.ts`に4件追加（同一ファイル・別ファイルでの`isNextKidoku`、スキップモード`'s'`/`'p'`）。ユニット665件→669件、E2E追加なし（純粋エンジンの判断ロジックで、タイマー配線は前回のまま）
  - 残課題（`todo.md`へ）：モード`'p'`の改ページ停止を`Main.tsx`の手動停止（`cancelAuto()`）と区別できておらず、その改ページをクリックで越えるとスキップも解除される（既定`'s'`は問題なし）

- [x] **`[lay b_alpha=…]`の値域（0.0〜1.0）クランプ**（2026-07-24）
  - 範囲外の指定を`Math.min(1, Math.max(0, v))`で正規化。`b_alpha=40`（0.4のつもりの打ち間違い）→1.0、`-0.5`→0.0、`Infinity`（`Number()`ではNaNにならず既存のNaN判定を素通りする）→1.0
  - **例外にはしない**方針とした：本家（`TxtLayer.ts:387` `argChk_Num`）はクランプせず素通しするため、例外にすると本家で動くスクリプトをbluesnovelだけが弾くことになる
  - クランプ先はエンジン（`chgBAlpha`アクションを積む時点）。本家はCSSの`rgba()`が描画時に丸めるだけなので、ストア（＝Memento・デザインモードが読む状態）には範囲外の値が残ってしまう。そこを正規化するのが目的
  - `test/ScriptEngine.test.ts`に4件追加（上限・下限・範囲内（境界含む）はそのまま・Infinity）。ユニット669件→673件、E2E 28件は変更なし


skynovel_esmプロジェクトのmain.snからたどり、callしているsetting.sn, ext_*.sn, sub.sn ... に登場するタグから優先で実装していきたい。
- tmp_esm_uc/doc/prj/script/main.sn at main · famibee/tmp_esm_uc https://github.com/famibee/tmp_esm_uc/blob/main/doc/prj/script/main.sn
- タグごとにtodo.mdに追加
- 最後に呼ばれるのはtitle.sn。いったん[s]までとする
- 表示アーキテクチャがpixijsからReactに変更になるのでタグの変更・追加・削除・いったん無視などがありうるが、それはまた別項
- たとえば動画・音声などは一旦無視でいい。スクリプト処理や画面表示に関わるモノのみ実装

- [x] **タグ属性の共通処理（`cond=` /「%属性名」/「*」/「&式」）**（2026-07-24）
  - 本家 `ScriptIterator.ts:418 タグ解析()` の前半を`ScriptEngine.#resolveTag()`として移植。個別タグの実装ではなく**全タグ横断の前処理**で、本家シナリオ（`tmp_esm_uc/doc/prj/`）では`cond=`85箇所・`%`111箇所・`*`39箇所と多用されるため、他のタグを足す前提として先に入れた
  - `cond=`：偽ならそのタグ自体を実行しない（`[jump]`や`[let]`のような処理系タグにも効く）。`exp`と同じく「&」は不要で、付いていたら例外。本家に合わせ`String(値)`が`'null'`/`'undefined'`でも偽、加えてbluesnovelの`[if]`（`ExprEval.evalBool()`）と揃えて文字列`'false'`も偽
  - `%属性名`：そのマクロが受け取った属性値を参照する。`|省略値`と組で使い、引数が無く省略値も無い（または`'null'`指定）なら**その属性自体を渡さない**（本家の規約）。マクロ外で使うと例外
  - `[タグ *]`：受け取った属性を丸ごと引き継ぐ。個別指定があればそちらが優先。マクロ外で使うと例外
  - `&式`：属性値を式として評価する。結果が`undefined`になる属性は渡さず、省略値があればそれを評価して使う。これまで`[trace text=]`だけが個別に`getValAmpersand()`を呼んでいたのを共通層へ移した
  - 参照元は**コールスタックへ積んだ生の属性文字列**（`#aCallStk[].hArgs`。本家の`csArg`相当）。`mp:`変数でも同じ値は引けるが、読み出し時に自動キャストが掛かり`'1.20'`→`1.2`になってしまうため別途持たせた。本家同様`[call]`の属性も積むので、マクロでないサブルーチンからも`%`で引ける
  - 実行を伴わない走査（`[if]`ブロックの`elsif`/`else`/`endif`探し、`[macro]`の`[endmacro]`探し）は従来どおり生の値を見る`ScriptEngine.parseTag()`のまま。本家もその2箇所では`#alzTagArg.hPrm`を直接参照している
  - 挙動変更が1件：`[trace text=&未定義変数]`はこれまで文字列`'undefined'`を表示していたが、本家準拠で「属性を渡さない」＝`[trace]`側の既定（空文字）になった。既存テスト`step_trace_ampPrefix_undefinedVar`を更新し、省略値へフォールバックする例を1件追加
  - `test/ScriptEngine_tagarg.test.ts`（新規26件）。ユニット673件→700件、E2E 28件は変更なし（属性解決は純粋なエンジンロジックでブラウザ要素が無いため）
  - `todo.md`の「本家サンプルの`main.sn`をたどってタグを実装」節を新設し、対象ファイル群のタグを棚卸しして優先順位付け（本項目はその1件目）。`CLAUDE.md`にタグリファレンス（<https://famibee.github.io/skynovel_esm/tag.html>、全タグ一覧は`skynovel_esm/src/sn/Grammar.ts`の`T_HTag`）とサンプルゲーム`tmp_esm_uc/doc/prj/`への参照を追加


ページ裏表（[lay]のpage属性）、[trans]、[wt]だけで大項目、実装
- [trans]: 裏表ページそれぞれ画像と動画を一枚の板テクスチャ？にし、属性timeの時間をかけて表ページを次第に透明にしていく。（裏ページを前面にして非透明にしていく手もある、負荷の軽そうな方で）
- [wt]: [trans]の終了を待つ。クリックで終了状態にskip、決して中途半端な状態で止めない
- 表示そのものなのでe2eテストも必要と思われる

- [x] **ページ裏表（`[lay page=…]`）・`[trans]`・`[wt]`**（2026-07-24）
  - **裏表2枚のページ**を導入（本家 `Pages.ts`）。ストアは`aPage: [T_LAY[], T_LAY[]]`と`foreIdx`を持ち、`[add_lay]`はレイヤを必ず両面へ作る。`[lay]`の`page`属性の既定は本家同様`'fore'`（`Pages.argChk_page(hArg, 'fore')`）
  - **配列の中身は決して入れ替えず、`foreIdx`だけを反転する**のが設計の要。中身を入れ替えるとReactから見て2つのコンテナの子が丸ごと差し替わり、`TxtLayer`が文字送り演出をやり直して交換の瞬間に画面がちらつく（レイヤ側のDOMキャッシュも作り直しになる）
  - `[trans]`のクロスフェードは**表ページを`time`かけて`opacity 1→0`にし、下から裏ページを出す**向き。「裏を前面に置いて`0→1`」でも枚数・負荷は同じだが、裏ページに絵の無い部分があるとそこから表が透けたまま最後に消える＝完了の瞬間にパッと消える。表を消す向きなら演出中に見えている下の絵が最終状態そのものなので破綻しない
  - `[trans layer=…]`（カンマ区切り、省略時は全レイヤ）に対応。交換対象外のレイヤは`startTrans()`で裏へ表の内容を写しておく（本家 `#trans()`の「transしないために交換する」相当）。こうすると裏ページ＝交換後のあるべき画面そのものになり、最後は`foreIdx`の反転だけで済む
  - `time=0`と既読スキップ中は演出せず即交換（本家 `#trans()`の`time === 0 || isSkipping`）
  - `[wt]`は`[trans]`の終了待ち。エンジンは`{t:'waitTrans', canskip}`を積んで一旦返り、待ちの主体は`ScriptMng`（`#waitTrans()`）。`canskip`の既定は`true`で、待ち中のクリック・キーは「読み進め」ではなく「演出を今すぐ終了状態へ」に読み替える（`#goSafe()`が横取りする）。飛ばしても必ず終了状態になるので、中途半端な見た目のまま止まることはない（本家 `CmnTween.stopEndTrans()`の`stop().end()`）
  - **設計上の要点：演出の終了を宣言するのは`ScriptMng`**（時間切れ or `[wt]`中のクリック）で、Stage側のGSAPは見た目を動かすだけ。実装途中でGSAPの`onComplete`に交換をやらせたところ、「交換」と「シナリオ再開」の前後が保証されず、**交換前のページへ次の文が書かれて画面が空のまま進む**不具合が出た（E2Eで検出）。zustandの`set`は同期なので、`finishTrans()`→`go()`の順で呼べば書き込み先は必ず新しい表ページになる
  - `[wt]`の有無に関わらず`[trans]`適用時に`time`ぶんのタイマーを仕込むので、`[wt]`を書かなくても演出はきちんと完了する
  - 待ちマーカー（🩷/✅）は表ページにだけ出す（`TxtLayer`に`isFore`を追加）。裏ページにも同名レイヤが常駐しているため、そのままだと二重に描画される
  - `test/ScriptEngine_trans.test.ts`（新規16件、page属性の既定・`layer=`の分解・`time`検査・スキップ時の即交換・`[wt]`の中断と再開）＋`test/e2e/trans.e2e.ts`（新規5件・`prj_trans`フィクスチャ）。ユニット700件→716件、E2E 28件→33件
  - E2Eに入れたのは見た目そのもの：演出中に表の`opacity`が下がり裏が`visible`になること、`[wt]`がその間シナリオを止めていること、クリックで飛ばしても終了状態に落ちること、`time=0`が即交換になること
  - E2Eヘルパ（`snPage.ts`）を裏表対応に更新。`snap()`は表・裏・`foreIdx`を返し、DOMを見る箇所は`[data-page="fore"]`配下に限定した。演出中は文字が変わらないため`waitIdle()`だけでは通過してしまうので、`waitTransRunning()`/`waitTransDone()`を追加


今回の更新でtmp_bluesの表示が崩れているので、以下の前提条件を徹底
- ノベルゲームシステムが表示を司る <div id="skynovel"></div>全体をstageと呼ぶ（skynovelと用語をあわせる）
- stageの縦横サイズをdoc/prj/prj.json から取得し、固定
"window": {
	"width": 1024,
	"height": 768
},
- 文字・画像レイヤなどはこの範囲内のみ表示とする
- [trans]はこのサイズで行い、画像がない部分は黒塗り潰しとする

- [x] **ステージ（`<div id="skynovel">`）の寸法固定・表示範囲の切り取り・黒地**（2026-07-24）
  - `tmp_blues`で表示が崩れていた件。実測すると`#skynovel`は**1280×0**、その中のステージ本体も**1200×0**で、レイヤは全部その外側へはみ出して描かれていた（`transform: scale()`はレイアウト上のサイズを変えないのに、幅・高さを与えていなかったため）
  - 用語を本家に合わせ、`<div id="skynovel">`＝**ステージ**と呼ぶことにした（`styParent`→`styStage`、`divRef`→`stageRef`）
  - ステージの寸法は`prj.json`の`window.width`/`height`固定（`Config.generate()`→`CmnLib.stageW`/`stageH`）。`overflow: hidden`で範囲外は表示しない
  - ブラウザウインドウに合わせた縮小（`transform: scale(cvsScale)`）は従来どおり。ただし`transform`はレイアウトサイズを変えないので、`useLayoutEffect`で`#skynovel`自身へ**拡縮後の実寸**も書く（これが無いと等倍ぶんの領域を確保したままになり、余白や不要なスクロールバーが出る）
  - 画像を置いていない領域は黒。ステージ本体と、`[trans]`でクロスフェードさせる表裏2枚の「ステージ大の板」の全部を不透明な黒地にした（本家がページごとに板テクスチャを作って重ねるのと同じ絵になる）
  - `test/e2e/stage.e2e.ts`（新規3件）で寸法・切り取り・黒地・縮小時の追随を固定。E2E 33件→36件。ユニット716件は変更なし（DOMのレイアウトなのでエンジン側に影響が無い）
  - 確認は`.claude/skills/playwright-cli/`で実際の`tmp_blues`（:5173）を開いて実測した

- [x] **ページ裏表の残り：`[button page=…]`・`[er]`の両面消去・`[page clear=true]`**（2026-07-24）
  - `[button]`に`page`属性を追加。裏ページへボタンを組んでおき`[trans]`で見せる、という本家の流儀（`title.sn`が`[clear_lay page=back]`→`[button]`→`[trans]`でやっていること）が書けるようになった
  - **既定は`fore`のままにした**。本家の既定は`back`（`LayerMng.ts:1100` の `argChk_page(hArg, 'back')`、コメントも「チェックしたいというよりデフォルトをbackに」）だが、bluesnovelの既存シナリオ（`tmp_blues`のmain.sn・E2Eフィクスチャ）は`[trans]`を挟まないものが多く、既定をbackにするとボタンが不可視の裏に置かれて消える。`ScriptEngine.ts`に`//TODO:`を残し、シナリオが`[trans]`前提になった時点で寄せる
  - `[er]`を**表裏どちらの文字も消す**ようにした（本家 `hTag.er`「ページ両面の文字消去」）。片面だけだと`[trans]`で裏が表に出た瞬間に前の場面の文字が蘇る。`chgStr`アクションに`page: 'fore'|'back'|'both'`を追加し、`'both'`は`[er]`だけが使う（本家 `LayerMng.ts:535` の `page='both'`相当）
  - `[page]`に対応（`clear`のみ）。**本家の`[page]`は裏表ではなく「読み戻り用のページログ」のタグ**で、`sub.sn`の`sys_title_start`が`[page clear=true key=…]`で本編開始時に履歴を捨てている。bluesnovelでは`Caretaker.clear()`を新設して繋いだ（タイトル画面まで読み戻れてしまうのを防ぐ用途）。`to=`/`style=`/`key=`は読み戻りの作りが本家と別なので未対応（`todo.md`へ）
  - 地の文・`[r]`は表ページ固定のまま。地の文には属性を書けない＝実質常に既定（本家`[ch]`も既定`fore`）なので、試作では表のみとする
  - `[trans layer=…]`の交換対象外レイヤを裏へ複製するコストを確認：`structuredClone`＋`nm`検索でレイヤ数ぶんのO(n²)だが、実シナリオのレイヤ数は5〜10程度（`tmp_esm_uc`の`dsp_lays`は5）なので問題なしと判断し、`todo.md`から落とした
  - `test/ScriptEngine_trans.test.ts`に7件追加（地の文のページ・`[er]`の両面・`[button]`の既定と`page=back`・`[page]`の3件）、`test/e2e/trans.e2e.ts`に2件追加（`[er]`が裏の文字も消すこと・`[button page=back]`が`[trans]`で表に出ること）。ユニット716件→723件、E2E 36件→38件

- [x] **レイヤ操作タグ：`[clear_lay]`と`[lay]`の属性拡充**（2026-07-24）
  - `[lay]`に`visible`/`alpha`/`left`/`top`/`rotation`/`scale_x`/`scale_y`/`b_color`/`style`を追加。`rotation`は度（本家もflash由来で度。pixiのradianではない）、`alpha`はレイヤ全体の不透明度で文字レイヤ背景だけを透かす`b_alpha`とは別物。数値は本家`argChk_Num`同様`0x`始まりを16進として読む
  - **未指定の属性は値を持たせない**のが要点。最初は初期値（`left: 0`等）を全レイヤに持たせたが、それだと指定していない属性まで毎回インラインstyleへ書き出してしまい、`TxtLayer`のCSS既定（`top: 48%`）を潰して**文字レイヤが画面上部へ飛ぶ**回帰が出た（`tmp_blues`を`playwright-cli`で実測して発見。y=436→90）。本家 `Layer.lay()` も `'left' in hArg` で書かれたかどうかを見ているので、そちらへ合わせた
  - `[clear_lay]`を実装（本家 `LayerMng.ts:528`）。見た目を「未指定」へ戻し、中身（画像／文字＋ボタン）も捨てる。**`visible`だけは触らない**（本家 `Layer.clearLay()` のコメントそのまま）。`page`の既定は`back`、`page=both`で両面、`layer`はカンマ区切りで複数可
  - `b_color`は`0xRRGGBB`を8bit成分へ分解し、`b_alpha`をアルファとして`rgba()`に落とす（未指定時は試作の既定色＝aquamarine相当のまま）。`style`は文字レイヤの既定CSSの後ろに置き、上書きできるようにした
  - `test/ScriptEngine_lay.test.ts`（新規18件）＋`test/e2e/lay.e2e.ts`（新規5件・`prj_lay`フィクスチャ）。ユニット723件→741件、E2E 38件→43件
  - E2Eに入れたのは「アクションが算出CSSへ落ちているか」だけ（`transform`の行列成分・`rgba()`・`display`・`letter-spacing`）。どのアクションを積むかはユニット側
  - `CLAUDE.md`に**「ページ」という語が2つの別物を指す**注意書きを追加：レイヤの裏表（`[lay page=…]`/`[trans]`）と、`[p]`で区切られる文章のページ（`[page]`＝読み戻りログ）。本家由来の用語衝突で、コード上も`aPage`/`foreIdx`と`Caretaker`で別物

- [x] **イベント系タグ：`[enable_event]`・`[wait]`・`[waitclick]`（と`[s]`の完全停止）**（2026-07-24）
  - `[enable_event]`（対象ファイル群で18箇所と単体最多）。文字レイヤ単位でクリックの可否を切り替える（本家 `LayerMng.ts:1088`）。`layer`省略時は現在の文字レイヤ、`enabled`省略時はtrue。`TxtLayer`のボタン群へ`pointer-events: none`を掛ける形で実装し、本家同様に変数からも読める（本家は`save:const.sn.layer.<レイヤ名>.enabled`、bluesnovelは`game:`名前空間）。表裏どちらのページにも同じ値を入れる（レイヤ自体の状態なので`[trans]`で揺れないように）
  - `[wait time=…]`（本家 `Reading.ts:320`）。`[wt]`と同じ形で、待つのは`ScriptMng`。`canskip`の既定はtrueでクリックで打ち切れる。**既読スキップ中は待たない**（未読に来ていたらそこでスキップ解除）のも本家どおり
  - `[waitclick]`。本家では`[s]`と**同じ関数**を通り（`Reading.ts:712` `hTag.waitclick = o=> rs.s(o)`）、`ReadingState_wait4Tag`がタグ名で振り分けている。`'s'`はユーザー操作に反応せず予約イベントだけを受け、`'waitclick'`はクリックで進む。停止点の種類に`'waitclick'`を足して同じ構造にした
  - **その過程で`[s]`が実は素通りしていたのを発見**。bluesnovelの`[s]`は「止まる」と言いながらクリックすれば次のトークンへ進んでしまう状態で、既存E2Eが通っていたのは`[s]`が全てファイル末尾にあったため。`ScriptMng`に`#stopped`を持たせ、`[s]`以降は`go()`を無視するようにした。`[event]`/`[button]`の予約だけは停止を越えて動かせる（本家も予約イベントだけは受ける）
  - `[set_focus]`は保留にした。キーボードフォーカスの管理役（本家 `FocusMng`）が要り、`add=`/`del=`が`dom=セレクタ`でHTML要素を対象に取るため、既に保留中の`[event]`の`key='dom=…'`と同時に設計するのが筋。`to=null`だけ実装しても意味が無い
  - 併せて数値属性の検査を厳しくした：`Number('')`が0になるJSの癖で、`[wait]`のように必須の数値属性を書き忘れても0として通ってしまっていた
  - `test/ScriptEngine_wait.test.ts`（新規13件）＋`test/e2e/waitev.e2e.ts`（新規6件・`prj_wait`フィクスチャ）。ユニット741件→754件、E2E 43件→49件
  - E2Eに入れたのは「ユーザー操作にどう反応するか」だけ。`pointer-events: none`のボタンはPlaywrightの通常の`click()`だと「他要素が横取りする」と判断されて待ち続けるので、`{force: true}`でその位置を実際にクリックし、読み進めへ抜けることを確かめている

- [x] **文字列・数値操作タグ：`[let_replace]`・`[let_substr]`・`[let_length]`・`[let_index_of]`・`[let_char_at]`・`[let_abs]`・`[let_round]`・`[let_search]`**（2026-07-24）
  - 本家 `Variable.ts:347-432` を移植。どれもDOMを触らずエンジン内で完結するので、テストはユニットのみ（E2Eは無し）
  - 本家と同じく「`text`属性を加工して`[let]`と同じ規則で`name`変数へ代入する」形。本家は加工結果を`hArg.text`へ書き戻してから`#let()`を呼ぶが、こちらは代入部分を`#letText()`へ切り出して加工結果の文字列を直接渡す
  - **`[let]`に本家書式の`text`属性を実装した**のが実質の要点。本家の`[let]`は`text`＝「値そのもの」で、式にしたい場合は`text=&式`と書く（＝共通の属性前処理`#resolveTag()`が評価する）。本家シナリオは`[let]`が計70箇所ほどあり全て`text=`なので、これが無いと`tmp_esm_uc`のシナリオは動かない。加えて`[let_replace]`/`[let_index_of]`は`val`を**別の意味**（置換文字列・検索文字列）で使うため、bluesnovel独自の`val`＝常に式評価という書式と衝突する
  - bluesnovel独自の`val`は既存テスト・E2Eシナリオが多数使っているので当面残し、`text`があればそちらを優先する。`val`の廃止は`todo.md`へ
  - `[let_abs]`が`Math.abs()`を使わないのは本家に合わせたもの（数値以外を渡した時にbooleanが0/1になる等、紛れの元になるため）。`[let_substr]`の`pos`負値（本家 `ext_voice.sn`のゼロ詰め3桁が使う）と`len=all`、`[let_replace]`/`[let_search]`の`flags`もそのまま移植
  - `[let_replace]`の`val`省略時が文字列`'undefined'`での置換になるのも本家そのまま（`String(hArg.val)`）。消したい場合は本家シナリオ同様`val=''`と明示する
  - 省略値つきの数値属性用に`#argNumDef()`を追加（本家 `argChk_Num()`の省略値あり呼び出しに対応）。`[let_char_at]`の`pos`、`[let_index_of]`の`start`、`[let_substr]`の`pos`/`len`など
  - `test/ScriptEngine_letstr.test.ts`（新規27件）。ユニット754件→781件、E2Eは変更なし

- [x] **トゥイーンアニメ：`[tsy]`・`[wait_tsy]`・`[stop_tsy]`・`[pause_tsy]`・`[resume_tsy]`**（2026-07-24）
  - 本家 `LayerMng.ts:798 #tsy()` ＋ `CmnTween.ts`。本家は`@tweenjs/tween.js`でpixiの`DisplayObject`を直接動かすが、bluesnovelは**GSAPでストアのレイヤ属性（`T_LAY_STY`）を動かす**形にした。つまり画面の現在値は常にストアが持つ
  - 見た目だけをDOMへ書く手もある（`[trans]`はそうしている）が、それだと**Memento（読み戻り）や`[trans]`のレイヤ複製が演出前の古い値を拾う**。副作用として、本家の`arrive`属性（終了時に目標値を確実に入れる）は常時ONと同じ挙動になる
  - **落とし穴**：GSAPは対象オブジェクトへ自分用のキャッシュ（`_gsap`。中から`target`を指し返す）を生やすので、トゥイーン対象をそのままストアへ渡すとレイヤが循環参照になり、`structuredClone`（`addLayer`/`[trans]`）も`JSON`化（Memento）も落ちる。動かす属性名は分かっているので、その分だけ拾って新しいオブジェクトを作る（E2Eが最初に踏んで発覚）
  - 純粋な部分（属性値→目標値、イージング名の解決、トゥイーン名）は`src/ts/Tsy.ts`へ分けた。GSAPもDOMも触らないのでエンジンから呼べる＝**書き間違いをシナリオ実行時にその場で例外にできる**（`[tsy ease=Nazo.Out]`等）
  - 属性値の書式は本家そのまま：`500`／`'=500'`（現在値からの相対）／`'250,500'`（ランダム）／`'=250,500'`。相対はレイヤの現在値が要るので、エンジンは`{v, rel}`のまま渡し、`ScriptMng`がストアの現在値（`getLaySty`を新設）と足し合わせる
  - イージングはtween.jsの31種をGSAPへ機械的に変換（`Quadratic`〜`Quintic`＝`power1`〜`power4`、`Sinusoidal`=`sine`、`Exponential`=`expo`、`Circular`=`circ`、`Linear.None`=`none`）
  - **本家の`[tsy]`は`x`/`y`しか見ない**（`CmnTween.aLayerPrpNm`）のに、`tmp_esm_uc`の`ext_fg.sn`は`[tsy left=… top=…]`と書いている＝本家では黙って無視されている。bluesnovelのレイヤ属性は`left`/`top`なので、`x`/`y`をその別名として受けて両方効くようにした
  - `[stop_tsy]`・`[wait_tsy]`中のクリックは、どちらも必ず「終了状態」へ送る（本家 `stop().end()` と同じ考え方）。中途半端な見た目のまま止まることはない
  - 既読スキップ中は`time`/`delay`を0にして即座に終了状態へ（本家 `CmnTween.tween()` の`isSkipping`判定）。`repeat`は本家が「`repeat=1`で計1回」なので`repeat-1`を渡す規約で、GSAPも同じ（0で1回、-1で無限）
  - 本家は同名トゥイーンの開始時に`#hTwInf`を上書きするだけで古いトゥイーンがGroupに残って動き続けるので、そこだけ変えて`kill()`している
  - `test/ScriptEngine_tsy.test.ts`（新規24件）＋`test/e2e/tsy.e2e.ts`（新規4件・`prj_tsy`フィクスチャ）。ユニット781件→805件、E2E 49件→53件
  - `path=`（複数区間の経路）・`chain=`・`render=`・`filter=`・`backlay=`・`width`/`height`/`pivot_*`は未対応（`todo.md`へ）

- [x] **システム系タグ：`[title]`・`[toggle_full_screen]`・`[dump_lay]`・`[pop_stack]`（＋修飾キー付きのキー名）**（2026-07-24）
  - `[title text=…]`（本家 `SysBase.ts:448`）。本家サンプルの`setting.sn:50`が体験版表記に使っていて、**`main.sn`から`title.sn`までの経路で実際に実行される数少ないシステム系タグ**。ストアの`title`→`useTitle`は既にあったのでタグを繋いだだけ
  - `[toggle_full_screen]`（本家 `SysBase.ts:462`）。ストアに「全画面にしたい」という**要求**（`fullScr`）を持たせ、`Stage.tsx`がreact-useの`useFullscreen`へ渡す。実際にそうなったかは戻り値で分かるので、それを組み込み変数`const.sn.displayState`へ書き戻す。**エンジンは自分ではこのフラグを倒さない**——Escでの解除などブラウザ都合の変化があるため（本家も`SysWeb`が`fullscreenchange`を拾って`isFullScr`を直している）
  - `[toggle_full_screen key=…]`は「そのキーで全画面を切り替えられるようにする」常駐予約。`[event]`の予約（ラベルへ飛ぶ）とは別枠なので`ScriptMng`が別表で持ち、`Main.tsx`が先に問い合わせる
  - **修飾キー付きのキー名に対応**（`Main.tsx` `keyName()`、本家 `SysBase.modKey()`の移植）。`alt+` `ctrl+` `meta+` `shift+`の順に前置する。本家サンプルの`main.sn`が`[event key=alt+enter]`や`[event key=Meta+0]`を使っており、それまでは`e.key.toLowerCase()`だけだったので引けなかった。修飾キー自身を押した時に`alt+alt`にならないよう、`e.key`と同じものは前置しない
  - `[pop_stack]`（本家 `ScriptIterator.ts:984`）。`[return]`せずにサブルーチンを抜ける。`clear=true`で全部捨てる。本家同様、ifスタックは「壁」(-1)だけに戻し、マクロ引数（`mp:`）も捨てる。**途中の`[if]`は無かったことになる**ので、抜けた先に残った`[endif]`へ辿り着くとエラーになる——これは本家と同じ挙動（本家 `#endif()` も `t === -1` なら投げる）
  - `[dump_lay]`（本家 `LayerMng.ts:1068`）。表裏まとめてデバッグ表示へ。ストアに`getPages`を追加
  - `test/ScriptEngine_sys.test.ts`（新規16件）＋`test/e2e/sys.e2e.ts`（新規4件・`prj_sys`フィクスチャ）。ユニット805件→821件、E2E 53件→57件
  - E2Eに入れたのはブラウザ側の結び付きだけ（`document.title`、予約キーが`fullScr`を切り替えること、`alt+enter`で`[event]`が引けること）。実フルスクリーンAPIはヘッドレスで当てにならないので、要求が立つところまでを見る
  - `[record_place]`/`[reload_script]`（セーブ層が要る）・`[window]`/`[close]`（Electron専用。本家もブラウザ版ではno-op）・`[snapshot]`（pixiのcanvas前提でDOM描画では取得手段から検討）は保留（`todo.md`へ）
- [x] **`Stage.tsx`の`lazy()`が効いていなかったのを修正（`INEFFECTIVE_DYNAMIC_IMPORT`）**（2026-07-24）
  - `Main.tsx`は`Stage`を`lazy()`（＝動的import）で読み込んでいるが、`GrpLayer`/`TxtLayer`が`noticeDrag`を、`store`が`A_LAY_STY_KEY`を`Stage.tsx`から**値として**静的importしていたため、`Stage`が同じチャンクへ引き戻されて分割が全く効いていなかった
  - 共有物（`T_LAY`・`T_LAY_STY`・`A_LAY_STY_KEY`・`T_LAY_IDX`・`T_LAY_CMN`・`styLay`・ドラッグ通知）を`src/components/Lay.ts`へ切り出し、`Stage.tsx`はコンポーネント本体だけにした。これで`Stage.tsx`を静的importするモジュールが無くなる
  - ドラッグ中フラグ（`isDrag`）は`Stage.tsx`が読み書きしていたので、`Lay.ts`側に置いて`noticeDrag()`/`clearDrag()`/`isDragging()`で触る形にした
  - `import type`だけなら型は消えるので警告の原因にならないが、区別が事故のもとなので参照先ごと`Lay.ts`へ寄せている。この制約は`CLAUDE.md`にも書いた
  - ユニット821件・E2E 57件とも変化なし（挙動は同じ）

- [x] **レイヤ操作タグの残り：`pivot_x`/`pivot_y`・`blendmode`・重なり順（`index`/`float`/`dive`）・`[clear_lay]`の`layer`省略**（2026-07-24）
  - `pivot_x`/`pivot_y`（本家 `Layer.lay()` のpivot＝pixiの`DisplayObject.pivot`）はCSSの`transform-origin`へ。既定の左上＝`0 0`なので、それまでの`transform-origin: left top`と互換。**pixiのpivotは表示位置そのものもずらす**が、こちらは原点を変えるだけ——回転・拡縮の中心を動かす用途では同じ絵になる
  - ついでに`[tsy]`のトゥイーン対象へも`pivot_x`/`pivot_y`を追加（本家 `CmnTween.aLayerPrpNm`にあった分）。残るは`width`/`height`だけ
  - `blendmode`はCSSの`mix-blend-mode`へ。本家（`Layer.getBlendmodeNum()`）が受け付けるのはpixiの`BLEND_MODES`へ引ける4種（`normal`/`add`/`multiply`/`screen`）だけなので、同じ名前だけを通して弾く文言も本家に合わせた。`add`はCSSに同名が無いので`plus-lighter`（加算合成）を当てる
  - 重なり順`float`（最前面へ）・`index`（指定位置へ）・`dive`（指定レイヤのすぐ下へ）。**表裏とも同じ順に動かす**（本家も`#fore`/`#back`の両方を`setChildIndex`する）ので`page`属性とは無関係。並び替えは現在の並びが要るので、エンジンは`{mode, index?, dive?}`を渡すだけにしてストア側で解決する（`[tsy]`の相対指定と同じ分担）
  - 本家の忠実な移植として**`index=0`は何も起きない**（`#lay()`が`if (hArg.index)`の内側でさらに数値の真偽を見るため、最背面へ送る指定にはならない）。`dive`が自分より後ろのレイヤなら、自分が抜けた分だけ行き先を1つ下げるのも本家どおり
  - `[clear_lay]`の`layer`省略（＝全レイヤ）に対応。エンジンはレイヤ一覧を持たないので、`[trans]`/`[dump_lay]`と同じく`aLayNm: null`のまま渡して「全部」の解決はストア側に任せる。**省略（＝全部）と、書いたのに空（＝書き間違い）は区別する**
  - **ストアのユニットテストを新設**（`test/store_lay.test.ts`）。並び替えの計算はストアにしか無く、E2Eで見るには細かすぎる。zustandの`create()`はDOMを要らないので`bun test`から直接触れる
  - `test/ScriptEngine_lay.test.ts`に11件追加・`test/store_lay.test.ts`（新規12件）＋`test/e2e/lay.e2e.ts`に3件追加。ユニット821件→844件、E2E 57件→60件

- [ ]





















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
