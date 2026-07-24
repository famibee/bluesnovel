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

- [ ]











- skynovel_esmプロジェクトのmain.snからたどり、callしているsetting.sn, ext_*.sn, sub.sn ... に登場するタグから優先で実装していきたい。
	- tmp_esm_uc/doc/prj/script/main.sn at main · famibee/tmp_esm_uc https://github.com/famibee/tmp_esm_uc/blob/main/doc/prj/script/main.sn
- タグごとにtodo.mdに追加
- 最後に呼ばれるのはtitle.sn。いったん[s]までとする
- 表示アーキテクチャがpixijsからReactに変更になるのでタグの変更・追加・削除・いったん無視などがありうるが、それはまた別項


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
