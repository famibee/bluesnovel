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


## 2026/07/26

- hint・ツールチップと[button]残件など
- [set_focus]残件。frameにもまたがるフォーカス移動

- [x] **ツールチップ（`hint`）と、`[set_focus]`のフレーム跨ぎまわり**。
	- **`hint`／`hint_style`／`hint_opt`**を`[button]`と`[link]`の両方に。吹き出しは**画面に1つ**を
	  使い回す（本家 EventMng.ts:131 も`.sn_hint`を1つ作る）。マウスを乗せた時とフォーカスが
	  入った時に出し、外れた時とクリック時に消す（本家 EventMng.ts:418〜424 と同じ出し入れ）。
	  **本家はpopper.jsで位置を決めるが、こちらは依存を増やさず自前で置く**ので、`hint_opt`は
	  `placement`（top／bottom／left／right。`bottom-start`のような修飾付きも本体だけ拾う）だけ見る。
	  `src/ts/Hint.ts`。位置計算とhint_optの読み取りは純粋なのでユニット（6件）、
	  実際の出し入れ・`hint_style`の反映・placementはE2E（2件）。
	- **`[button]`はフォーカス時もホバーと同じ見た目**になった（本家 EventMng.ts:435 が
	  FocusMngへ`hv()`/`nr()`を渡しているのに対応）。既定のフォーカスリングは画面に合わないので消す。
	- **`[set_focus]`のフレーム跨ぎ**：フレーム内の要素とステージ上のボタンが同じ輪に並ぶのは
	  元から動いていた（`focus.e2e.ts`が`frm:ok`→`frm:close`→`btn:ボタン1`→`btn:ボタン2`を確認済み）。
	  **抜けていたのは「隠したフレームの中へフォーカスが落ちる」こと**——フレームの文書は自分が
	  隠れていることを知らないので`getClientRects()`が普通に返ってしまう。`FocusMng.#canFocus()`が
	  `frameElement`を辿って**親側まで遡って確かめる**ようにした（同一originのsrcdocなので辿れる）。
	  E2E1件（`[frame visible=false]`の後は[button]だけを巡る）。
	- ユニット1242・E2E105 パス、`tsc` クリーン。
	- 残り：`[button]`の`style`/`style_hover`（**pixiのTextStyle JSON**なのでCSSへの読み替え設計から）・
	  `pic`/`b_pic`・効果音、`[link]`の`global`/`onenter`/`onleave`、`[set_focus]`のゲームパッド操作。


- [button]のフォーカス・ホバー状態などのcss指定
- [toggle_full_screen]の残り
- const.sn.platform について
  - Public archive の platform.js https://github.com/bestiejs/platform.js 由来なので、インストールしない方針
  - ただ src/sn/CmnLib.ts:175 で import('platform')し、isSafari, isFirefox, isMac, isMobile を設定したいのが本質。組み込み変数として公開しているが使う予定はない。UA文字列でもよい
- todo.md、tag.html、dev.html などの資料の整合性と🔴更新
  - たとえばtodo.mdの実績や「実装済み」記述の削除（他への移動）や軽量化。todoはカラになる運命

- [x] **`[button]`の見た目CSS・全画面の中央寄せ・platform.js廃止・資料の整理**（まとめて4件）。
	- **`[button style=/style_hover=/style_clicked=]`をCSSで書けるようにした**（通常・ホバー/フォーカス中・
	  押下中の3状態）。本家はpixiのTextStyle JSONだが、こちらはDOMなのでCSSをそのまま当てるほうが素直。
	  ただしギャラリーのサンプルは`{"fill": "plum"}`と書くので、**`{`で始まる値だけ主要キーをCSSへ読み替える**
	  （`fill`→`color`、`fontSize`は数値ならpx付与、等。`dropShadow`など未対応キーは落とす）。
	  既定はこれまでどおり本家寄り（ホバーは`fill:'white'`相当、押下中は影を消す）。
	- **全画面時にステージを画面の中央へ寄せる**（本家 SysBase.cvsResize() 相当）。ステージは実寸固定＋
	  `transform: scale()`で拡縮する作りなので、全画面要素になっても画面いっぱいには広がらず、
	  放っておくと左上に寄っていた。E2Eは**実際に全画面へ入って**中心座標を見る（予約キーの押下＝
	  本物のユーザー操作から`requestFullscreen()`を呼べるため、ヘッドレスでも通る）。
	- **platform.js への依存をやめた**（bestiejs/platform.js は Public archive）。本当に要るのは
	  `CmnLib`の`isSafari`/`isFirefox`/`isMac`/`isMobile`の4つだけなので、UA文字列から出すようにし、
	  `CmnLib.init()`は同期になった（動的importが消えた）。組み込み変数`const.sn.platform`はUA文字列
	  （本家はplatform.jsのJSONで`.os.family`のように引けるが、使う予定が無いので割り切り）。
	  判別は`test/CmnLib.test.ts`が代表的なUA5種で押さえる（Chrome系もUAに"Safari"を含む、
	  iOSのUAは"like Mac OS X"を含む、といった引っかかりどころ込み）。package.jsonからは外したので、
	  次の`bun install`で`platform`と`@types/platform`が落ちる。
	- **資料の整理**：`todo.md`を「これからやること」だけに絞った（120行→88行。実績・実装済みの記述は
	  CHANGELOG.mdとdocsへ寄せ、章立ても タグ／挙動の詰め／アセット基盤／本家へ確認 に整理）。
	  `docs/tag.html`は`[add_face]`を🟢へ、`[button]`・`[toggle_full_screen]`のメモを更新。
	  `docs/dev.html`は`const.sn.platform`を🟢＋方針の理由を明記。
	  現状のマーク集計は **🟢61／🟡20／🔴34**（🔴は音声・動画・画面揺らし・文字出現演出・履歴など、
	  層ごと未着手のものだけで、実装済みなのに🔴のまま残っている取りこぼしは無い）。
	- ユニット1251・E2E108 パス、`tsc` クリーン。


- 🟡 [tsy]残件、[tsy path=…]など？　と[tsy_frame]
- HTMLフレーム系タグの残り
- [event key='dom=…']
- もう実装できそうなタグ、組み込み変数を実装
- [quake][stop_quake][wq] https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/tag_quake

- [x] **`[tsy path=]`/`[tsy chain=]`・`[tsy_frame]`・`sn.event.domdata.*`**（トゥイーンとフレームの残り）。
	- **`[tsy path=…]`（複数区間の経路）**。本家の正規表現（`CmnTween.#REG_TSY_PATH`）をそのまま移植し、
	  `(x,y,alpha)` 並べ書きと `{…}` のJSON書式の両方を受ける。**相対値（先頭`=`）はどの区間も
	  「トゥイーン開始時の値」が基準**——だからテンプレの`fg_squat`が書く`(,=50) (,=0)`が
	  「50下げてから元へ戻す」になる（区間ごとの相対だと戻らない）。本家はtween.jsの`chain()`で
	  区間を繋ぐが、こちらはGSAPのtimeline。JSONの誤りは本家がconsole.errorで流してその区間を
	  捨てるのに対し、こちらはその場で例外にした（他の属性の扱いと揃えるため）。
	- **`[tsy chain=…]`**（他トゥイーンの終了に繋ぐ）。止めた状態で作り、繋ぎ元の終了時に動かし始める。
	  目標値・開始値は**タグ実行時**に解決する（本家も同じで、繋ぎ元が動かした後の値は見ない）。
	- **`[tsy_frame]`**。`[tsy]`と同じ組み立てを共有し、動かす先だけストアのレイヤ→`FrameMng`が抱える
	  iframeに差し替える形にした（`#tsyVals()`/`#runTsy()`を共通化）。フレームは`x`/`y`/`rotate`が実名
	  なので属性表を分けてある。トゥイーン名は本家同様`frm\nID`なので`[wait_tsy id=…]`等で指せる。
	  併せて**`FrameMng`が各フレームの現在の見た目を持つ**ようにした：`transform`は
	  scale_x/scale_y/rotateの3つで1つの値なので、現在値を持たないと`[frame scale_x=…]`だけの指定が
	  残り2つを既定値へ戻してしまう（`[tsy_frame]`の開始値も同じ場所から取る）。
	- **`sn.event.domdata.*`**：`[event key='dom=…']`の発火時、その要素の`data-*`を組み込み変数へ
	  （本家 EventMng.ts:591）。フレーム内の「どの項目が押されたか」をシナリオへ渡す口になる。
	- ユニット1263・E2E111 パス。`docs/tag.html`は`[tsy_frame]`を🟢へ、`[tsy]`と`[event]`のメモを更新、
	  `docs/dev.html`は`sn.event.domdata.*`を🟢へ。

- [x] **画面揺らし `[quake]`/`[stop_quake]`/`[wq]`**。
	- 本家（LayerMng.ts:754）はレイヤを板テクスチャへ描いてそのスプライトを揺らすが、こちらは
	  **表裏のページ箱そのもの**を動かす（ステージ側の`overflow: hidden`が端を切るので絵は同じ）。
	  **毎フレーム`[-hmax,+hmax]`／`[-vmax,+vmax]`のランダム位置へ跳ぶ**（補間しない）のも本家どおり。
	- **揺れ幅はストアに入れない**：毎フレームのランダム値なのでストア更新には重すぎ、かつ最後は
	  必ず0へ戻る一時的な見た目なので読み戻し（Memento）にも要らない。ストアが持つのは
	  「揺れているか・幅はいくつか」だけで、`[trans]`と同じ役割分担にした——揺らすのはStage側、
	  **終了を宣言するのはScriptMng**（時間切れ／`[wq]`中のクリック／`[stop_quake]`）。
	- 本家は`[trans]`と同じトゥイーン枠（`TW_NM_TRANS`）を使い回すので`[stop_quake]`＝`[finish_trans]`・
	  `[wq]`＝`[wt]`だが、**こちらの`[trans]`は表裏の交換を伴う別処理**なので、同じ形の別の待ち行列に
	  した（揺らしながらの`[trans]`が破綻しないという副産物つき）。
	- 未対応は`layer=`（揺らす対象の限定。常に画面全体）と`delay`/`repeat`/`ease`/`yoyo`
	  （本家でも揺れ幅がランダムなのでイージングは効かず、実質「揺らす長さ」しか変わらない）。
	- ユニット1275・E2E115 パス。E2Eは揺れ幅がストアに無いのでDOMの`transform`を直接読む。

- [x] **すぐ実装できるタグ・組み込み変数**（`[finish_trans]`・`[set_cancel_skip]`・`sn.tagL.enabled`・
  `const.sn.key.*`・`sn.button.fontFamily`）。docs の🔴を実装可能なものから消す回。
	- **`[finish_trans]`**：演出を終了状態へ送り、**表裏の交換まで**済ませる（`[wt]`中のクリックと同じ
	  着地点）。本家のタグ本体は空で、実処理は「一部タグの直前に演出を畳む」共通処理
	  （ScriptIterator.ts:504 `#setTag2FinishTrans`）。こちらはその畳み込みをScriptMng側に置き、
	  このタグと**`[trans]`自身**だけに掛けた——演出中に次の`[trans]`が来ると、交換されないまま
	  裏ページが書き換わって前の場面が表に出ないまま消えるため（これは実装漏れの修正でもある）。
	  本家は`[quake]`/`[stop_quake]`/`[add_filter]`にも掛けるが、それは`[quake]`が`[trans]`と同じ
	  トゥイーン枠を使う都合であって意図ではないので追随していない。
	- **`[set_cancel_skip]`**：本家同様**何もしない**（本家も2023/05/27に廃止済みで中身が空）。
	  上流シナリオに残る記述を通すためにタグ名だけ受ける。
	- **`sn.tagL.enabled`**：falseの間は`[l]`で止まらず頁末（`[p]`/`[s]`）まで一気に進む。
	  **3フラグと違い既定がtrue**なので「未設定＝true」として読む。手動操作・`[s]`到達での
	  `cancelAutoSkip()`でtrueへ戻すのも本家どおり。ギャラリーの`tag_quake`が既読スキップの
	  永久ループ対策に使う書き方。
	- **`const.sn.key.*`**（修飾キー等の今の押下状態）：押下表を持てるのはDOM側だけなので、
	  Main.tsxのkeydown/keyupが`setKeyDown()`でエンジンへ教え、変数側は他の組み込み変数と同じ
	  遅延評価にした。blurで全部落とす（押したままウインドウを離れると押しっぱなしで残るため）。
	  `back`はAndroidのBackキーで、ブラウザに相当するキーイベントが無いので常にfalse（🟡）。
	- **`sn.button.fontFamily`**：`sys:TextLayer.Back.Alpha`と同じく停止点ごとにストアへ写し、
	  BtnLayerが`font-family`として当てる（全ボタン共通）。
	- ユニット1285・E2E118 パス。


- ルール画像による[trans]
  - ゲーム中での[trans]によるトランジション中の様子はテストしづらい？ トゥイーンdt変化機構とdt値に対するトランジション進度を切り分けられれば、任意のdt値で出力->スナップショットを撮れると思うが

- [x] **ルール画像による`[trans]`（`rule=`／`vague=`）**。ご提案どおり「トゥイーンのdt変化機構」と
  「dt値→トランジション進度（＝見た目）」を切り分けた。
	- **WebGLを使わずSVGフィルタ＋CSSマスクで実装**。本家のフラグメントシェーダ（LayerMng.ts:548）を
	  読み解くと、結局は「ルール画像の赤チャンネル R → 表ページの不透明度」の一次関数
	  `clamp(R/(2*vague) + (vague - tick)/(2*vague))` でしかない。SVGの`feComponentTransfer`の
	  `feFuncA type="linear"`（`slope`/`intercept`、結果は0〜1へクランプ）がまさにこの形なので、
	  シェーダ相当の絵がそのまま出せる。マスクは`feColorMatrix`でRを不透明度へ移し（RGBは白固定）、
	  色空間は`sRGB`固定（既定のlinearRGBだと赤チャンネルが変換されて本家と合わない）。
	- **切り分け**：進度`tick`を0→1へ動かすのがStage側のGSAP、`tick`と`vague`から係数を出すのが
	  純粋関数 `src/ts/Trans.ts`。おかげで
	  ・進度の計算は単体テストで**全域**を確かめられる（`test/Trans.test.ts`は本家シェーダをTSへ
	  　書き写したものと、R・tick・vagueの全組み合わせで突き合わせる）
	  ・E2Eは`gsap.globalTimeline.pause()`で時間を止め、**任意の進度の係数を流し込んで画を撮れる**
	  という形になった。演出の途中という一番撮りにくい瞬間が、時間待ちに頼らず決定的に検証できる。
	- E2Eの画素検証は、表裏を単色の板で塗り分け→`page.screenshot()`→**PNGのデコードはブラウザの
	  canvasにやらせる**（依存を増やさない）。tick=0/0.5/0.8/1で境界が左から右へ動くこと、
	  境界のvague幅で中間色が出ることを見る。ルール画像は横グラデーションのPNGを生成して同梱。
	  gsapは`test/e2e/app/main.ts`から公開する（src/にテスト専用フックは足さない方針のまま）。
	- `glsl=`（自前シェーダの差し替え）はWebGLを使わないため実現しようがないので、
	  黙って無視せず**その場でエラー**にする（フィルターと同じ扱い）。`delay`/`ease`は未対応。
	- ユニット1291・E2E120 パス。

- [x] `package.json`の未使用依存を撤去、ESLintの設定不備を調査
	- 全依存をimportと突き合わせて撤去：`@tweenjs/tween.js`（GSAPへ置き換え済み）・`devtools-detect`・
	  `gamepad.js`（本家`EventMng.ts:249`で実使用だが移植前。`src/sn/gamepad.js.d.ts`のシムは
	  残し、実装時に`bun add`する旨をコメント）・`@happy-dom/global-registrator`・
	  `@types/electron-json-storage`（本体が依存に無い）・`@types/adm-zip`（adm-zip 0.6.0が
	  `types.d.ts`を同梱するので重複）。`skynovel_esm`からも`@types/electron-json-storage`を撤去
	- VSCodeのESLint拡張が出していた`Could not find config file.`は`eslint.config.mts`の欠落。
	  本家からdevDependenciesだけコピーされ設定ファイルが無かった。本家版をほぼそのまま移植
	  （相違は`.tsx`を対象に含める・`dist`/`dist_app`/`docs`を`globalIgnores`・
	  `quotes`に`allowTemplateLiterals`）。`eslint-plugin-jest`は外せない――本家から無改変で
	  持ってきた`test/Grammar.test.ts`に`eslint-disable-next-line jest/no-conditional-expect`が
	  残っており、プラグイン未ロードだと「そんなルールは無い」と怒られるため
	- ただし**ESLintは設定を置いても動かない**。`typescript-eslint`（8.65.0時点で最新）が
	  TypeScript 7 非対応と明示的にthrowする。TS 7の`typescript`パッケージはコンパイラのJS APIを
	  公開せず（`exports`が`version.cjs`と`unstable/*`のみ、`require('typescript')`の戻りは
	  `version`と`versionMajorMinor`の2個だけ）、パーサが無いと`.ts`を解析できないので回避策も無い。
	  `@typescript/typescript6`は`import ts6 from '@typescript/typescript6'`と明示的に書ける
	  ツールにしか効かず`require('typescript')`決め打ちには届かない（bunの`resolutions`による
	  ネスト解決も無視されることを実験で確認）。**TS 7のまま塩漬け**とし、TS 7.1対応を待つ。
	  設定ファイルを置いたままにするのは、拡張のエラーが「設定が無い」から本当の原因へ変わるため
	- 同じ原因で`vite-plugin-dts`も動けていないはず（`dist/`に`.d.ts`が1つも無い）。
	  `todo.md`に項目を追加

skynovel_esm方針、GSAP化は辞めtween.jsのまま触らないものとする


- tmp_bluesテンプレート操作時に気付いた点。本家テンプレtmp_esm_ucとの相違など
  - [toggle_full_screen]で最大化したさいにウインドウ内側いっぱいに拡大・センタリングしていない。タイトル画面で再現
    - 【<div data-page="fore" ...>】などが最大化を阻止しているのか。キャンバス外の追加要素があるのか。扱いに問題。それらごと含有する別要素の導入・操作・管理など、検討を
  - 「初めから」をクリックで
    - 暗転しホワイトアウトの[trans]するが、点々矩形の文字レイヤ枠が見え、システムボタンが見えている。
    - 二度の[trans]終了時に一瞬真っ黒画面になってちらつく
    - クリック待ち状態でも、点々矩形の文字レイヤ枠が見え、システムボタンが見えている。
      - 一度クリックした後のクリック待ち状態まで、システムボタンが見えてはいけない
    - 縦書きになっていない
  - 文字レイヤ、メッセージウインドウ（b_color テキスト背後の矩形）の位置とサイズの実装を。周囲に点々修飾も見える
  - 文字・クリック待ちアニメpngが縦書きになってない
  - システムボタン（doc/prj/script/sub.sn:111 マクロ [sysmenu_draw_v] による）は回転により縦になっているが、幅広い。タイトル画面ボタンのようにwidth幅（省略でデフォルト値）に収まっていないように見える
  - 右クリックメニューが開かない。イベントを処理しているか。Shiftキーで開く
  - システムボタンの「タイトル」を押し、「タイトルに戻りますか？」が出るが、
    - キャンセルすると本文が消えている
    - 戻るを選択すると、システムボタンが横書きになり[trans]する
  - アルバム画面で、本文で表示されたのに「語り手」 doc/prj/image/F_kuchimoto.jpg が表示されずリンク切れ

- [x] `[trans layer=…]`（一部レイヤだけの交換）が、交換対象外レイヤの**裏ページを破壊**していた
	- 症状：実テンプレ（`tmp_blues`）で本文が縦書きにならない・メッセージウインドウの枠画像が出ず
	  試作の点線枠のまま。`[txt_lay_v_center]`が組んだ設定が丸ごと消えていた
	- 原因：`startTrans()`が交換対象外レイヤについて**裏へ表をコピー**していた。本家
	  （`LayerMng.ts:617`「transしないために交換する」）がやっているのは**表と裏の入れ替え**で、
	  各レイヤ自身のfore/backの中身には触らない。裏には次の場面の組み立て途中が載っていることが
	  あるので、コピーだとそれを捨ててしまう。テンプレは
	  「文字レイヤの裏に次の設定を組む →`[sysmenu_draw_v]`が`[trans layer=mes_sysmenu]`を打つ」
	  という順なので、**別レイヤのtransが文字レイヤの組み立てを消す**という形で露見した
	- あわせて`finishTrans()`に`cpFore2Back()`を追加。本家`Pages.ts:74 transPage()`は
	  交換したレイヤについて交換後に`back.copy(fore)`をしており、こちらはそれが抜けていた
	  （＝新しい裏が1つ前の画面のまま残る）
	- 切り分けの経緯：エンジンは無実だった。`test/uc_goal.test.ts`の仕掛け（fetchとフレームだけ
	  偽装してエンジンを回す）を`tmp_blues`へ向けると、`writing-mode: vertical-rl`も`b_pic`も
	  正しくアクションに出ている。決め手は**実機のストアを購読して`mes`の変化を並べた**こと
	  （vite dev が配る`dist/store.js`のURLを`performance.getEntriesByType('resource')`から拾って
	  `import()`すれば同じインスタンスが取れる。`src/`にテスト用フックを足さずに済む）。
	  縦書きが裏に載った次の瞬間に表裏とも消えており、間にあるのが`[trans layer=mes_sysmenu]`だった
	- E2E `test/e2e/grp.e2e.ts` ＋ フィクスチャ`app/prj_grp/`を追加。テンプレの`[grp]`＝
	  1回の場面転換で`[trans]`を3回打つ並びを、上の`[trans layer=mes_sysmenu]`込みで最小再現する。
	  **旧挙動では`horizontal-tb`に巻き戻って落ちる**ことを確認済み

- 文字レイヤクリアでボタンをクリアしてほしいが、してない？

- [x] `[er]`が**ボタンを消していなかった**（文字だけ消していた）
	- 本家の`[er]`は`TxtLayer.clearLay()`（`TxtLayer.ts:855`）を表裏に呼び、本文と
	  **ボタンを両方**捨てる。こちらは`chgStr`で本文を空にするだけだったので、テンプレでは
	  タイトル画面のボタン4つが本編に入っても残り続けていた（`[grp]`の場面転換は`[er]`しか
	  打たないので、消える機会が他に無い）
	- `[clear_lay]`と同じにはできない。あちらはレイヤの見た目（`style`/`left`/`top`/`b_pic`…）まで
	  既定へ戻すが、本家の`[er]`はCSSを残す（戻すのはalpha/blendmode/pivot/angle/scaleだけ）。
	  そこで専用のアクション`clearBtn`＋ストアの`clearBtn()`を足し、ボタンだけを消す形にした
	- 本家が`[er]`で戻すalpha/blendmode/pivot/angle/scaleは**未対応**（todo.md）
	- `test/e2e/app/prj_trans/main.sn`に停止点を1つ足した。`[er]`の**手前**で
	  「裏のボタンが表へ出た」状態を見るため（通り過ぎるとボタンごと消えて確かめられない）

- [x] 文字レイヤの`[lay visible=false]`が**ボタンに効いていなかった**
	- テンプレの`[sys_menu visible=false]`でシステムボタンが消えず、`[trans]`中も
	  クリック待ち中も出っぱなしだった。ストアには`visible: false`が表裏とも正しく
	  入っており、届いていなかったのは描画側
	- 原因：本家はボタンが文字レイヤのコンテナ（`Layer.ctn`）の**子**なので、コンテナへ掛けた分が
	  そのままボタンにも乗る。こちらはボタンの箱を本文spanの**兄弟**にしているため
	  （本文側のwidth/writing-mode/paddingをボタンの座標計算へ持ち込まないための作り）、
	  `styLay()`が付けた`display: none`が本文にしか当たらなかった
	- 直し方：`[lay]`のうち**位置・変形以外**（visible→display / alpha→opacity / blendmode /
	  filter）をボタンの箱にも渡す。`left`/`top`/`transform`/`transformOrigin`は渡さない
	  （ボタンはステージ原点基準に置くという既存の作りを崩さないため）。
	  visibleだけでなくalpha・blendmode・filterも同時に効くようになった

- [x] 右クリック（`[event key=rightclick]`）が発火していなかった
	- テンプレは枠（アルバム・設定・履歴・確認ダイアログ）を`[event key=rightclick label=*exit]`で
	  閉じるが、どこでも開けず閉じられなかった。Shiftキーなど別の予約でしか出られない状態
	- 原因：右ボタンは`click`イベントに来ない。本家は`contextmenu`イベントで拾っている
	  （`EventMng.ts:145`）が、こちらは`click`しか見ていなかった
	- `Main.tsx`に`contextmenu`を追加。予約名は修飾キー＋`'rightclick'`で、修飾キーの前置は
	  `alt+` `ctrl+` `meta+` `shift+` の順（本家`EventMng.ts:355 #modKey4MouseEvent`）。
	  キー用の`keyName()`と違い「修飾キー自身か」の判定は要らない（押したのはマウスなので）
	- **予約が無くても`preventDefault()`する**（本家と同じ）。ブラウザのメニューが出ると
	  ゲーム画面の上に居座って操作を邪魔するため
	- フレーム内の右クリックも`FrameMng`が親の`document`へ投げ直す。キー入力と同じ事情で、
	  フレーム内のイベントは親まで飛んでこない（本家も`resvFlameEvent()`でフレームbodyへ張る）。
	  これが無いと枠の上で右クリックしても閉じられない（枠は画面全面なので実質どこでも閉じられない）
	- `document`に張るのは、ステージとフレーム再dispatchの両方を1本で受けられるため
	  （本家はcvsとフレームbodyの2箇所）
	- E2E 3件追加（`event.e2e.ts`）：右クリックで発火する・修飾キーが前置される・
	  予約が無くてもブラウザのメニューを出さない

- [x] アルバムの絵がリンク切れ（フレーム内の`<img data-src=…>`の解決先が違っていた）
	- テンプレのアルバムは解放済み項目の`data-src`に`F_kuchimoto`のような
	  **拡張子なしのアセット名**を書く。こちらは枠HTMLのディレクトリを前置していたので
	  `frames/F_kuchimoto`になって404。未解放のサムネ（`./_album_miken.jpg`＝枠と同じ
	  ディレクトリ）だけがたまたま当たっていた
	- 本家は`sn_repRes`で渡す関数の中で`cfg.searchPath()`に通している
	  （`FrameMng.ts:154`→`#loadPic2Img()`）。同じく**まずパス解決（path.json）へ通す**形に変更。
	  `./_album_miken.jpg`のような枠自身の相対ファイルもsearchPathが拾える（ファイル名＋拡張子で
	  引ける形なので）。絶対URL・ルート絶対・`data:`はそのまま通し、サーチパスに無ければ
	  従来どおりディレクトリ前置へ落とす（枠に同梱しただけでpath.jsonに載らない画像のため）
	- E2E追加（`frame.e2e.ts`）。フィクスチャの枠に画像2枚を置いた：
	  path.jsonに載る拡張子なしの名前と、載らない枠同梱ファイル。どちらも`naturalWidth > 0`まで見る
	  （`src`が入っただけでは絵が出たことにならないため）

- [x] `[button]`の`width`/`height`省略時に**既定寸法が入っていなかった**
	- テンプレのシステムメニューは`width`/`height`を書かずに並べるので、文字量なりの幅になって
	  隣と重なり、回転（`rotation=90`）と相まって「幅広い」状態だった
	- 本家は文字ボタンに**必ず既定値を当てる**（`Button.ts:122` height=30 /
	  `:151` width=100）。pixiの`Text.width`/`height`は文字スプライトそのものを拡縮するので、
	  文字数に関わらず必ずその大きさに揃う
	- こちらも同じ既定を入れ、`width`指定時だけ動いていた「文字を箱に収める倍率の実測」を
	  常に通すようにした（`btnSize()`を`styBtnArg()`と実測フックの両方から使う）。
	  実機のシステムメニューが100×30に揃い、縦一列に収まった
	- `todo.md`の「本家はwidth/heightで文字そのものを引き伸ばす。実機で見た目を要確認」を解消

- 割り込み作業。タグ属性において【bluesnovel は省略時に何も指定していませんでした】という衝撃的な文言があったが、他にもあり得るのか
  - 実装をする前にまず検討事項、タグ定義の省略時属性を、一箇所で定義できるか。そしてそれは効果的か。本家はタグ定義の入口メソッドでそれぞれ引数チェック・デフォルト値指定している

- [x] タグ属性の「省略時の既定値」を本家と突き合わせる仕組み（`[button]`の事故を受けて）
	- **既定を埋める場所をタグの入口（エンジン）へ**。`[button]`のwidth/heightは前回BtnLayer
	  （表示側）で埋めていたが、本家も`Button.ts`が`#o`へ確定値を記録する（dump・セーブに乗る）ので、
	  エンジンで埋める方が faithful。ブラウザ無しで単体テストできる利点も大きい。
	  定数は`src/components/Lay.ts`（共有部品）へ置き、表示側は古いセーブからの復元用に`??`で保険
	- **検査 `test/argdef_parity.test.ts` を追加**。本家の`argChk_Num/Boolean(hArg,'属性',既定)`を
	  機械的に抜き出し、(1)本家が既定を変えた/足したら落ちる (2)こちらが「どう扱うと決めたか」を
	  表で持ち、**属性を1つも書かないタグを実際に走らせて**既定が出ることを確かめる
	- 表は3つ。`A_CSS_DEF`（CSSに既定を任せると決めたもの＝埋めないのが正解）、
	  `A_ELSEWHERE`（別の場所で持つ。`vague`は`Trans.ts`のVAGUE_DEF）、
	  `A_NOT_YET`（同名の属性を別用途で触っているだけで未対応）。理由を書くのが要点で、
	  次に見た人が「書き忘れ」と区別できるようにする
	- **ソースの文字列照合による自動検出は諦めた**。同じ属性名でも既定はタグごとに違う
	  （本家のwidthは`[button]`=100／`[add_frame]`=ステージ幅／`[graph]`=0）のでタグ単位に
	  切る必要があるが、`[button]`のように属性を総称ループ（`#A_BTN_NUM`）で読む書き方だと
	  `args.width`という字面が現れず追えない。緩くすると誤検出だらけになる（試作では9件中ほぼ全部）。
	  **実際に走らせて出た値を見る**方が確実で読みやすい
	- 抜き出しの全体像：本家の既定は**120箇所・103属性**。うち相当数が「現在値」が既定
	  （`this.#b_alpha`・`this.scale.x`）で、静的な中央テーブルには原理的に書けない。
	  **本家と同じく入口で書くのが正しい**と裏付けられた

- 意見を。今回の「既定をエンジン入口へ移す」件は、React的にも正しいように思う。流し込まれる値・状態を内部で加工するのは、枝葉要素のあちこちで行うと収拾が付かなくなる。できれば入口付近の1箇所にすべきと考えるが

- [x] 「CSSに既定を任せる」と決めた属性を、**算出値**で見張るE2E（`test/e2e/argdef.e2e.ts`）
	- `test/argdef_parity.test.ts` はソースの照合なのでCSS側のズレを見つけられない。ここが対になる検査。
	  属性を1つも書かないレイヤ（画像・文字）を置き、`visibility`/`opacity`/`transform`/
	  `mix-blend-mode`/`filter`と、ステージ内箱からの相対位置が本家の既定と一致するかを見る
	- 「エンジンが埋めていない」ことの裏取りも入れた。ストア側に`visible`/`alpha`/`left`/`top`/
	  `rotation`/`scale_*`/`blendmode`が1つも入っていないことを確かめる。ここに値が入り始めたら
	  CSSに任せる方針から外れた合図
	- 分かったこと：未指定でも`transform`の算出値は`none`にならない。デザインモードのMoveable用の
	  下地（`Stage.tsx` の`sty4Moveable`）が恒等変換を書いているため。見た目は等倍・無回転で
	  本家と同じなので、単位行列も許す形にしてコメントで理由を残した
	- 台帳の誤りも1件修正。`visible`を「既定あり」に分類していたが、エンジンがやっているのは
	  `args.visible !== 'false'`という**パース**であって既定ではない。CSSの`visibility: visible`が
	  既定を供給しているので`A_CSS_DEF`へ移した

- [x] `[lay left=]`/`[top=]`（と`[button]`の同属性）の**-1〜1をステージ幅・高さの割合として解釈**
	- 本家 `Layer.ts:513` `if (x > -1 && x < 1) x *= CmnLib.stageW`。テンプレやギャラリーは
	  `[lay left=0.5]`で画面中央を指す書き方をするが、こちらはpxとして扱っていたので
	  **0.5px**になっていた。エラーも出ず静かに違う絵になる類のズレ
	- 境界は本家と同じ**開区間**（`left=1`は1px、`left=-1`は-1px）。0はどちらの解釈でも0
	- ステージ寸法は組み込み変数（`const.sn.config.window.width/height`）から読む。
	  エンジンはDOMを見ないという原則のまま。組み込み変数が無い環境（単体テスト等）では素通し
	- `[button]`も同じ経路を通る（本家も`#argChkPos`を共有）。ただし**width/heightは割合解釈しない**
	  （寸法であって位置ではない）
	- 見つかった経緯は「タグ属性の既定値」の棚卸し（`argChk_*`の抽出）。既定値そのものではなく、
	  **値の解釈**の相違だが、同じ抽出作業で目に入った


- [x] `[lay]`の配置属性 `center=`/`middle=`/`right=`/`bottom=`/`s_right=`/`s_bottom=`（本家 `Layer.ts:513-552`）
	- 本家は「指定値から**表示物の幅・高さを引く**」で寄せを実現するが、エンジンは表示物の実寸を
	  知らない（知るにはDOMを見るしかなく、`const.sn.lay[N].width/height`も今は有無の1/0で代用中）。
	  そこで**CSSの独立`translate`プロパティ**で表した：`center`→`-50%`・`right`→`-100%`。
	  実寸を知らなくても同じ絵になる
	- `translate`は`transform`とは**別プロパティ**なので、`rotation`/`scale_*`（`transform`で組む）と
	  衝突しない。しかも適用は`transform`より前＝「位置を決めてから回す」という本家の順序と同じ
	- `s_right`/`s_bottom`はステージ右端・下端からの距離で、CSSの`right`/`bottom`がそのまま同義。
	  `left`/`top`とは排他にする（本家も else if で分岐）
	- 優先順位も本家どおり `left > center > right > s_right`（縦も同様）
	- `T_LAY_STY`に`align_x`/`align_y`/`s_right`/`s_bottom`を追加し、`A_LAY_STY_KEY`にも入れた
	  （`[clear_lay]`で消える・`getLaySty()`から見える）
	- E2Eは**実測**で見る（`argdef.e2e.ts`）。中心・右下端がステージのどこに来るかを
	  `getBoundingClientRect()`で確かめる。ステージは窓に合わせて`transform: scale`されるので、
	  距離の比較はその倍率で割る
	- **未対応**：`[button]`側の同属性。本家は`isButton`のとき幅の**1/3**で計算する（pixiの文字寸法
	  まわりの都合に見える）ので、そのまま持ってくると別の絵になる。テンプレのボタンは
	  `left`/`top`だけなので実害は出ていない


- [x] 場面転換のたびに**一瞬まっ黒がちらつく**（`[trans layer=…]`の演出中に表の見た目が先に変わる）
	- 原因：交換対象**外**のレイヤの入れ替えを`startTrans()`＝演出の**開始時**にやっていた。
	  そのため`[trans layer=mes]`を打った瞬間、表ページの背景レイヤが「裏に組みかけの状態」
	  （テンプレでは`[grp]`が用意する非表示の背景）に化け、演出の間ずっと背景が消えていた
	- 本家は演出中はストアに当たるものを触らず、**描画時に合成**している
	  （`LayerMng.ts:648` `const lay = sDoTrans.has(ln) ? back : fore`）。入れ替えは完了時
	  （`comp()`のコンテナ差し替え）。同じ形へ寄せた：
	  - `startTrans()`は**中身を一切いじらない**（time<=0なら即完了）
	  - `Stage.tsx`が演出中の裏ページを「交換対象は裏・それ以外は表」で合成して描く
	  - `finishTrans()`（＝新設の`finTrans()`）が、交換対象外レイヤの表裏入れ替え・foreIdx反転・
	    交換対象レイヤの`back.copy(fore)`をまとめて行う（本家 `comp()`＋`Pages.transPage()`）
	- E2E追加（`grp.e2e.ts`）。`[trans layer=mes time=3000]`の**最中**に、交換対象外の
	  背景レイヤが表・裏とも見えていることを算出CSSで確かめる。修正前は表側が`display:none`
	- 実機（tmp_blues）で場面転換をまたいで**810回サンプリングして背景が消えた回数0**


- [x] `[toggle_full_screen]`で**画面いっぱいに拡大されず、中央にも寄らない**
	- 原因が2つ重なっていた
	- (1) **全画面にする要素が内箱だった**。ブラウザのUAスタイルは全画面要素へ
	  `width/height: 100%` と **`transform: none`** を強制するので、拡縮している内箱を
	  全画面にすると倍率が丸ごと消え、等倍のまま画面いっぱいに引き伸ばされる
	  （実測：内箱が1280×800・`transform: none`）。**外側（`#skynovel`）を全画面にする**形へ変更。
	  中央寄せは外側のflexに任せ、内箱は拡縮だけを持つ（原点は全画面時のみ`center`。
	  flexが拡縮**前**の実寸で中央に置くので、左上原点だと右下へ伸びてしまう）
	- (2) **拡大する条件が落ちていた**。本家 `SysBase.cvsResize()` は
	  `argChk_Boolean(CmnLib.hDip, 'expanding', true)`＝**既定で拡大する**が、こちらは
	  「ステージが窓より大きいとき」だけ＝縮小しかしなかった。窓が広いと右に黒帯が残り、
	  全画面でも等倍のままだったのはこれ。本家と同じ条件へ戻した
	- E2E追加（`stage.e2e.ts`）。窓がステージより広いとき縦横比を保って拡大されること、
	  縦に余裕がない窓では高さ側が上限になることを見る。既存2件は「ステージちょうどの窓＝等倍」で
	  実寸を比べる形に直した（拡大が入ると倍率が掛かって比較できないため）
	- 実機（1280×800）で確認：窓モードで1066×800へ拡大、全画面でも同倍率で中央（x=107）


- [x] クリック待ちマークの余白を論理プロパティへ（縦書き対応）＋テンプレ報告分の残りを実機確認
	- 待ちマークの余白が`margin-left`（物理方向）だった。縦書きでは左＝「次の行の方向」なので
	  `margin-inline-start`（横書きなら左・縦書きなら上）へ。**理屈としては正しい修正だが、
	  実測では見た目の差は出ていない**（マークと直前の文字の横位置のズレは前後とも14.4pxで、
	  主因はマークの箱の幅37pxが文字24pxと違うこと）。E2Eは「縦書きなら次は下」「列をまたがない」
	  という意味のある不変条件だけを見る形にした
	- マークの向きは、これまでの縦書き修正で**文字方向を向くようになった**（実機で確認・OK）
	- メッセージウインドウ（`b_color`／枠画像の矩形）の位置とサイズは**すでに解消済み**だった。
	  実機で箱が310×768px・`vertical-rl`・`padding: 30px 36px 24px 26px`＝マクロの指定どおりで、
	  枠画像`wafuu1`も`::before`で敷かれている。縦書きを直した時点で一緒に直っていた
	- 「タイトルへ」まわりの2件（キャンセルで本文が消える／戻ると横書きになる）も解消済みを確認。
	  `[trans]`と`[er]`の修正の副産物


- [x] `.d.ts`が出ていない（npmライブラリとして必要）
	- **壊れてはいなかった**。`aa8643e`（React製シナリオ解析ループの試作実装）で`dist/*.d.ts`が
	  まとめて削除され、以後は`watch`しか走っていなかっただけ。`src/build.ts`は元から
	  `plugins: watch ? [] : [dts(oDts)]`＝**watch中は`.d.ts`を出さない**ので、
	  再生成される機会が無かった。`bun run build`を一度回せば出る状態だった
	  （TypeScript 7で`vite-plugin-dts`が動かなくなった、という当初の見立ては誤り。
	  本家`skynovel_esm`は同じ構成のまま今日のビルドで`.d.ts`を出している）
	- そのうえで**方式はtscへ変えた**（`tsconfig.dts.json`を新設し、`src/build.ts`が
	  ビルド完了後に`tsc -p`を起動して終了コードを反映）。プラグインはviteのbuild単位で走るため:
		- 4本すべてに付くので**`dist_app/`にも同じ木が出る**。共有モジュール（`src/ts/…`,
		  `src/sn/…`）の型が2組でき、`bluesnovel`と`bluesnovel/app`の両方をimportした利用者から
		  見て**別の型**になる
		- 出力範囲がtsconfigの`include`なりなので、**`test/**.d.ts`と`build.d.ts`まで公開物に
		  混じる**（実測79ファイル。tsc側は`src`だけの40ファイル）
		- ビルド1本につき8秒以上かかる（`[PLUGIN_TIMINGS]`の警告も出る）
	- `dist_app/*.js`の型はpackage.jsonの`exports`に`types`条件を書いて`dist/`側を指す。
	  ついでにサブパスの型が引けるようになった（従来は`.`しか型が付かなかった）
	- 宣言マップ（`declarationMap`）は出さない。参照先の`src/*.ts`は公開物に含まれない
	  （`files`は`dist`と`dist_app`だけ）ので必ず切れたリンクになるため
	- `vite-plugin-dts`を依存から削除。これで`tsc --noEmit`から`unplugin-dts`由来のエラー
	  （`typescript`のルートexportに`ts.CompilerHost`が無いという内容。**型解決の話で、
	  実行時には動いている**）8件も消えた
	- `skipLibCheck: true`を追加。`react-moveable`（JSX名前空間）・`react-use`（React 19で消えた型を
	  参照）が素で9件エラーを出し、こちらでは直せない。**`.d.ts`出力の成否が終了コードで
	  分からなくなる**ため落とした
	- 40ファイル出力を確認。別プロジェクトから`@famibee/bluesnovel`と`@famibee/bluesnovel/app`を
	  importする疑似利用者で型解決も通した


- 長押しでデザインモードに入るが、本家機能大部分の完成まで無効化＆TODO記載
- todo.md: 【不使用かも・凍結】**`[quake]`の残り**：`layer=`（揺らす対象レイヤの限定）
  - 立ち絵を震わせる [fg_shake][fg2_shake] で使用しているかと思ったが、[tsy path=]で実現していた
  - sample https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/ext_fg2

- [x] デザインモード（長押しで入る）を無効化＋todo.mdの棚卸し
	- `Stage.tsx`に`ENA_DESIGN_MODE = false`を置き、長押しハンドラを要素へ**渡さない**形に。
	  フック（`useLongPress`）の呼び出し自体は残す——条件付きにするとReactのフック規則に触れるため。
	  `sty4Moveable`（恒等変換の下地）はそのままなので算出値まわりのE2Eに影響なし
	- 理由：通常プレイ中の長押しで入れてしまうのに、中で触れるのはレイヤの位置・サイズだけで、
	  **触った結果をシナリオへ書き戻す先が無い**。本家機能の大部分（音声・履歴・文字演出）が
	  揃い、「調整→保存」の行き先を決めてから戻す。todo.mdに戻す条件つきで記載
	- `[quake]`の`layer=`を【不使用かも・凍結】へ。立ち絵を震わせる`[fg_shake]`/`[fg2_shake]`が
	  使っていると思っていたが、**`[tsy path=]`で実現**していた（実装済み）ので実需が無い
	- サンプルの在り処をtodo.mdへ追記：`[quake]`関連（`ext_fg2`）・履歴（`log_and_play`）・
	  フィルター（`filter`）・画像ボタン（`ch_button`）。`noise`の参考として
	  <https://ics.media/entry/241122/> も
	- アニメpngの「文字レイヤ枠画像でのシート再生」に【現状不使用・優先順位低】を付記
	- 文字出現・消去演出（`[ch_in_style]`系）と`[page]`の残りは、既にtodo.mdにある記述のままで
	  追記なし（次の着手候補としての読み上げ）


- todo.md: **履歴（ログ）** `[log]`・`const.sn.log.json`・`save:sn.doRecLog`。テンプレの`frames/_log.sn`が使う
  - sample https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/log_and_play

- [x] **本文履歴（ログ）**：`const.sn.log.json`・`save:sn.doRecLog`・`save:const.sn.sLog`・
	`[rec_ch]`/`[rec_r]`/`[reset_rec]`（本家 `Log.ts`）
	- **溜めるものが本家と違う**。本家はTxtLayerが組み立てた表示用HTMLそのものを記録し、
	  正規表現でアニメ用のstyleやdata-*属性を削り落として履歴テキストにする（`TxtLayer.ts:604`）。
	  こちらは表示単位（`T_CH`）へ割る**前の生の本文文字列**を溜め、読み出し時にHTMLへ起こす
	  （`src/ts/Log.ts` の `htmlOf()`）。理由は2つ——エンジンはDOMを持たないので
	  「表示されたHTML」が存在しない／`splitCh()`が既にルビ記法と埋め込み命令を解釈できるので、
	  **削り落とすのではなく組み立てられる**
	- 帰結の相違2つ（履歴表示の用途では困らないと判断）：`[link]`のリンクは落とす、
	  `[graph]`のインライン画像は本文と同じ全角空白1つになる（画像のパス解決はScriptMngの仕事で、
	  エンジンが持つ生文字列にはURLが入っていないため）
	- ログはエンジン側に置いた（本家は`LayerMng`が持つ）。記録するのが「シナリオが書いた本文」で
	  あって見た目ではないため。おかげで**履歴の検査がブラウザ抜きで全部書ける**（`test/Log.test.ts`）
	- 1ページの区切りは`#hTxt`（既定文字レイヤの表ページ）が捨てられる地点すべて＝`[p]`の再開時・
	  `[er]`・`[clear_text]`・`[clear_lay page=fore]`・`[current]`の切替。本家が
	  `LayerMng.ts:956/995/1006` と `TxtLayer.clearText()` で `pagebreak()` を呼ぶのと同じ位置。
	  **空ページは積まない**（本家 `Log.ts:105`）のでUI画面を出入りしただけでは履歴が増えない
	- `save:const.sn.sLog`は**しおりを保存する直前に1回だけ書く**。本家は本文を1トークン
	  追記するたびに書き直すが、この値を読むのはしおりの保存と復元だけ。`nowMarkPart()`／
	  `restoreMarkPart()`という口がエンジンにあるので、そこに寄せれば足りる
	  （本家がそうしているのは、あちらのLogがしおり処理から見えない場所に居るため）
	- `save:sn.doRecLog`がfalseの間は**積まない**。本家は記録を止めるのでなく
	  `<span class='offrec'>`で包んで履歴側で隠す（`TxtLayer.ts:494`）が、こちらは履歴の蓄積が
	  表示と別物なので単に積まない。既定はfalse（本家 `CmnInterface.ts:149`）
	- `[rec_ch]`は`text`のみ対応（`style`/`r_style`/任意属性は未対応→todo.md）。本家は
	  `display: none;`を付けた`[ch]`として本文へ流すが、こちらは履歴にだけ積む。そのため
	  **`doRecLog`がfalseでも記録する**（明示的な書き込みなので）。`[ch record=false]`も対応
	- 上限ページ数は`prj.json`の`log.max_len`（既定64）。`const.sn.config.log.max_len`として
	  ScriptMngから渡す（本家の`const.sn.config.（略）`はprj.jsonの中身をそのまま返す仕様）
	- 検査27件（`test/Log.test.ts`）。docs/tag.htmlは`[rec_ch]`🟡・`[rec_r]`🟢・`[reset_rec]`🟢、
	  docs/dev.htmlは`save:sn.doRecLog`🟢・`save:const.sn.sLog`🟢・`const.sn.log.json`🟢へ


- todo.md: **文字出現・消去演出**

- [x] **文字出現演出**：`[ch_in_style]`／`[ch_out_style]`（定義）と`[lay in_style=/out_style=]`
	- **本家はCSSの`@keyframes`を文字列で組み立ててスタイルシートへ挿す**（`TxtLayer.ts:148`）が、
	  こちらは同じ値を**GSAPのtweenへ翻訳**する（`src/ts/ChStyle.ts`）。文字送りを既にGSAPで
	  回しているため——2つの仕組みを併走させると、クリックでの瞬時完了（`progress(1)`で終端へ
	  飛ばす）が効かなくなる。`Tsy.ts`が`[tsy]`に対してやっているのと同じ立ち位置
	- **既定の見た目が変わった**。これまでの文字送りは仮値（`duration: 0.25`・`y: '0.3em'`）だったが、
	  組み込みの`default`を本家の既定（`wait=500`・`alpha=0`・`x='=0.3'`・`join=true`・`ease-out`。
	  本家 `TxtLayer.ts:120`）に合わせたので、**1文字あたりの時間が倍**になり、ずれる向きも
	  縦から横になった。todo.mdの「仮値」項目はこれで解消
	- **相対位置は`%`でなく`em`にした**。本家は`${nx * 100}%`だが、パーセントは要素自身の箱を
	  基準にするので、本家は文字spanへ`display: inline-block`を敷いて箱を作っている。
	  bluesnovelの文字spanはinlineのまま（行分割をブラウザに任せている前提を崩さないため）で
	  **幅が0＝パーセントが効かない**（実際に算出値が単位行列になるのを確認）。
	  `em`ならフォントサイズ基準なので箱に依らず、**全角文字では本家と同じ値**になる
	- `ease`はCSSの`animation-timing-function`名をGSAPのeaseへ読み替える。厳密には曲線が
	  一致しない（`ease-out`は cubic-bezier(0,0,.58,1) と二次イージングの差）が、数百ミリ秒では
	  見分けが付かない。`cubic-bezier()`／`steps()`はプラグインが要るので既定へ倒す
	- `join=false`はstaggerを0にする（本家は`animation-delay`を0msに潰す）。`wait=0`は
	  tweenを積まず`gsap.set`で終端を確定させる
	- **`[ch_out_style]`は定義だけ**（消去のアニメは未適用＝本家の既定`wait=0`と同じ結果）。
	  文字が消えるのはReactが要素を捨てる場面なので、消えていく間だけ古い文字を生かす仕組みが
	  別途要る。docs/tag.htmlで🟡、todo.mdに条件つきで記載
	- 検査：`test/ChStyle.test.ts`13件（属性の読み取りと値の翻訳）＋`test/e2e/chstyle.e2e.ts`4件。
	  E2Eは**「その場面の直前まで進めてGSAPを止め、1手だけ進めてから時間を手で送る」**形。
	  止めた直後はtweenがまだ1度も描いていないことがある（初回描画は親タイムラインのtickで
	  起きる）ので、`globalTimeline.time()`を進めてから撮る
	- 既存E2E3件の**競合を直した**（本件で顕在化）。いずれも「本文が出揃ったこと」だけを見て
	  次のキーを押しており、文字送りが続いている間に押すと瞬時完了へ食われる（`Main.tsx next()`）。
	  既定時間が倍になって表面化した。`expect.poll(mesStr)`の後に`waitIdle()`を足して解消
	  （`waitev`×2・`autoskip`）。`trans`の1件は演出時間の計測に`waitTransDone()`を使っており、
	  そちらが続く本文の文字送りまで待つため、**演出の終わりだけを待つ`waitTransCleared()`**を
	  分けた。全体を3回連続で通して安定を確認

- [x] **文字ごとの指定**：`[span]`/`[ch]`の`ch_in_style`/`ch_out_style`/`wait`属性、
	`[autowc]`（文字ごとのウェイト）、`sys:sn.tagCh.*`の接続
	- **文字送りの組み立てを1本のtween＋staggerから「1文字＝1tween」へ変えた**。
	  staggerでは「文字ごとに演出が違う」「文字ごとに待ちが違う」のどちらも表せないため。
	  timelineの位置（秒）で両方を表す＝本家が文字ごとに`animation-delay`を書くのと同じ形
	- 属性は既存の埋め込み命令（`add｜`／`span｜`）にそのまま乗っているので、`splitCh()`側で
	  読むだけで済んだ。`T_CH`に`cis`/`cos`/`w`を足し、**スタイルは重ねるが演出名と待ちは
	  「後の指定が勝つ」**（本家 `#o2domArg()` も `[ch]`の値 → 親`[span]`の値 → 既定 の順に落とす）
	- `[autowc]`：`text`の1文字目と`time`の1つ目…を対応させる表。本家と同じ検査
	  （同時指定必須・個数一致・`enabled`省略時は現在値を保つ）と`save:const.sn.autowc.*`への書き出し。
	  **待ちはその文字が出る前に入る**ので、表に載せた文字自身とそれ以降が後ろへずれる
	  （本家 `TxtLayer.ts:762` が`cumDelay`へ足してからその文字の`animation-delay`に書くのと同じ）。
	  表に無い文字の待ちは0（本家も`?? 0`）なので、有効な間は表の文字までが一気に出る
	- `sys:sn.tagCh.*`を繋いだ（todo.mdの「未接続」が解消）。**既読と未読で別の設定**を見る
	  本家の作り（`ScriptIterator.ts:1332 normalWait`）をそのまま移植し、`doWait*`がfalseなら0。
	  sys:未設定なら本家の初期値10ms。**これも既定の見た目が変わる**：これまでの1文字あたりの
	  遅れは仮値の35msだったので、**3.5倍速くなった**
	- エンジンは`chWait`ゲッタで値を出し、ScriptMngが停止点ごとにストアへ写す
	  （`backAlpha`/`btnFont`と同じ形）。**本家はトークンごとに読むが、こちらは停止点ごとに1回**
	  ——Reactが描くのは停止点の後なので、1停止点の間で値が変わっても絵には出ない
	- 検査：`test/ChStyle.test.ts`に15件追加（文字ごとの属性・`[autowc]`の検査・`chWait`の
	  既読/未読分岐）＋`test/e2e/chstyle.e2e.ts`に2件（文字ごとの演出・`[autowc]`の遅れ）。
	  ユニット1362 / E2E143、全体を2回連続で通して安定を確認
	- **`[ch_out_style]`の適用は保留**（todo.mdへ）。定義と`[lay out_style=]`・
	  `[span ch_out_style=]`は受け付けるが、消去のアニメはまだ行なっていない


- [ ]








- todo.md: **`[page]`の残り**：`to=`（指定ページへ移動）・`style=`・`key=`。bluesnovelの読み戻りはPageUp/PageDown＋`Caretaker`で本家と別の作りなので、対応させるなら設計から
- todo.md: **フィルターの残り**
  - ノイズはひょっとしてこちらが参考になるか https://ics.media/entry/241122/
  - sample https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/filter
- todo.md: **アニメpng（スプライトシート）の残り**
  - 【現状不使用・優先順位低】文字レイヤの枠画像でのシート再生
  - `[graph]`の`width`/`height`
  - `[l]`/`[p]`の待ちマークの位置指定
- todo.md: **`[button]`の残り**：画像ボタン
  - sample https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/ch_button






- **しおり・システム系の残り**
  - `[load]`の`index=`（ページ移動用）・`do_rec=`。**読み戻し履歴は捨てている**（ロード後の位置は履歴と繋がらないため）。ページログ（`[page to=…]`）を作るときに設計し直す
  - `[save pic=…]`のサムネイル保存（`userdata:/`へのファイル保存が要る。テンプレの`_archive.sn`が枠に出す想定）。まず`[snapshot]`の結果をどこへ置くかから




- 音系に着手。だがあなたはこちらのようなテスト可能か？
  - https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/sound

- イベント中に別のイベント https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/mul_ev








## 2026/07/25

- skynovel_esm 版テンプレtmp_esm_uc( https://github.com/famibee/tmp_esm_uc/ ) のタイトル画面 snapshot20260724_tmp_esm_uc.jpg を渡す（pngもあるので必要なら伝えて）
- とりあえず tmp_esm_uc/doc/prj/bg/title.jpg の表示、文字ボタン表示（デザインが違ってもいい、場所だけ正確に）ができないか


ボタンの見た目をもう少し寄せられるか。すなわち

最初
から

ではなく　最初から　と横並びのままwidth=90に収め、https://famibee.github.io/SKYNovel/tag.html#button のデフォルト style(color: black;align: 'center';padding: 5;dropShadow: true;dropShadowAlpha: 0.7;dropShadowColor: white';などcss)


ok。ついでに「fontFamily: 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', '游ゴシック Medium', meiryo, sans-serif;」も


ボタン文字は tmp_blues/doc/prj/theme/ext_lang.sn:331-334 のように
	Start = '最初から'
	Load = ' ロード '
	Album = 'アルバム'
	Config = ' 設 定 '
として。こちらでやってみたがtrimなしにできるか。


かなり近くなった。ちなみにボタン文字、渡したjpgよりやや縦長で線も太いが、寄せられるか。なるべくfont-familyはそのままで。他に手段がなければ「-light」的なfont-family重み指定を使って良い


見た目はok。さて実テンプレtmp_blues上でe2e実行して[s]停止し、この見た目の状態まで実行できるか。tmp_blues/doc/prj/script/main.snはこちらでtmp_esm_ucのものに置換した。

- [x] **タイトル画面をブラウザで描画：実背景＋本家準拠の文字ボタン**（2026-07-25 完了）
	- 確認用フィクスチャ `test/e2e/app/prj_uc/`（`?prj=uc`）。本家 `tmp_esm_uc` の `theme/title.sn` のタイトルを core タグだけで再現。実 `bg/title.jpg`（1024×768）を実体で同梱し、`path.json`→`searchPath`→`<img>` の経路で背景表示
	- **`[button left=/top=]` の絶対配置バグ修正**（`TxtLayer.tsx`）。座標指定ボタンが流し込み用の箱（`top:70%`）を基準に配置され、`top:360` が画面外（y≈841）へ落ちていた。座標指定ボタンを**ステージ原点基準の箱**（`styChild`＝`top:0/left:0`）へ分離し、書いた `left/top` がそのままステージ座標になるように（本家 `Button.ts` はステージ左上からの絶対配置）
	- **ボタン既定の見た目を本家 `Button.ts` の TextStyle に準拠**（`BtnLayer.tsx`）。`fill:black`（無効時 gray）/`align:center`/Hiragino系 `fontFamily`/`dropShadow`（white・α0.7・blur7・distance0）→ CSS `text-shadow: 0 0 7px rgba(255,255,255,.7)`。以前の丸枠ピル装飾は撤去。hover は本家 `style_hover.fill='white'` に合わせ白へ。`font-weight` は本家が未指定＝normal（bold を撤去し線を細く）
	- **文字を箱に収めるフィット**。本家 pixi `Text.width/height`（文字スプライトを箱ちょうどに拡縮）に相当する機能が CSS に無いので、BtnLayer が素の文字寸法を `useLayoutEffect` で実測し `transform:scale` として合成（短い文字は広げ、長い文字は縮めて1行に収める）。`white-space:pre` でスペースを保持し、本家 `ext_lang.sn` の `' ロード '`/`' 設 定 '` のような余白入りラベルが効く
	- ステージ既定フォント（`Stage.tsx`）に同じ Hiragino スタックを追加（本家 `TxtLayer.ts:272` のメッセージ層デフォルト準拠）。メッセージ文字レイヤが継承する
	- E2E：`button.e2e.ts` の回転検証を、transform に fit スケールが合成される前提で「行列成分の生値」から `atan2` による角度復元へ更新。**全 E2E 77 件パス**、`tsc` は src/test エラーなし
	- **実プロジェクト（`tmp_blues`）通しの調査で `const.sn.lay.*` 未実装がブロッカーと判明**。`[add_lay layer=0 cond=!const.sn.lay.0]` の存在ガードが効かず（常に真）、重複追加でストアが throw → title 手前で停止。engine テスト（`uc_goal`）が通るのは純エンジンでストアの重複検査を通らないため。対応は todo.md の `const.sn.lay.*` 項目へ

- [x] **実テンプレ `tmp_blues` がブラウザでタイトルの `[s]` まで到達（`const.sn.lay.*` 存在判定＋見た目調整）**（2026-07-25 完了）
	- **`const.sn.lay.*`**。`VarStore.#getFromJson`（JSON潜り込み）の前方一致の起点を、格納変数(`#h`)だけでなく**組み込み変数(`#hBuiltin`、tmp:のみ)**にも広げ、`const.sn.lay` のように「JSONツリーを返す組み込み変数」の下位（`const.sn.lay.0`）を辿れるようにした。`ScriptMng` が**ストアの表裏ページからレイヤ木の JSON を返す builtin `const.sn.lay`** を登録。これで `[add_lay cond=!const.sn.lay.N]` の重複防止ガードと `*max_lay_lp`（`const.sn.lay[N]`）が効き、実テンプレの `main.sn → setting → ext_* → sub → _yesno(frame) → title` が**ブラウザで title の `[s]` まで走り切る**（背景 `title.jpg`＋ボタン4つ描画）。
	- **`const.sn.lay` の詳細ツリー**も同じ木で提供：`const.sn.lay[N].<fore|back>.visible/.alpha/.left/.top/.width`（立ち絵 `[fg2]` のGCが `visible && alpha>0 && width>0` で使う）。visible/alpha/left/top は `T_LAY_STY` の実値、**width/height はストアに実寸が無いので「表示物があるか（grp=画像src／txt=文字orボタン）」を 1/0 で代用**。存在判定（中間ノードはオブジェクト＝truthy）と両立。ユニット `getVal_33_builtin_json_descend`・`getVal_34_builtin_json_tree` 追加
	- **`[button]` の既定ページを本家準拠の `back` へ**（`ScriptEngine.argPage(args,'back')`）。本家サンプルの `title.sn` は「mesを裏で組んで `[trans]` で表へ」流儀で、既定 `fore` のままだとボタンが裏に取り残され、表の空 mes が既定の箱を出してボタン帯に被っていた。`[trans]` を挟まずその場で見せる E2Eフィクスチャ（`prj_button`/`prj_frame`/`prj_wait`/`prj_uc`）は `page=fore` を明示。関連ユニットの既定期待値も `back` へ更新（`button_defaultsToBack`、`uc_goal` に `page:'back'` 検証追加）
	- **空のメッセージ窓の見た目**（`TxtLayer.tsx`）。**文字が無くボタンだけ乗る層（＝メッセージ窓ではなくUIコンテナ）** は既定の箱（aquamarine背景＋オレンジ点線枠）を描かない（`isBtnOnly`）。タイトルの mes がまさにこれ。`[clear_lay]` 直後などボタンの無い空メッセージ窓は従来どおり既定の箱を出す（`lay.e2e` 維持）
	- 検証：ユニット **909件パス**、E2E **77件パス**、`tsc` クリーン。実 `tmp_blues` のタイトルがリファレンス snapshot とほぼ一致


tmp_esm_ucをvite実行できるようなので、見比べながら実装できるか
まずはタイトルの「アルバム」ボタンをクリックし doc/prj/frames/_album.sn:100 の[s]で停止するまで

  ① サムネイル画像が壊れる（最重要・根本1つ）
  src="_album_miken.jpg" が natW:0＝404。srcdoc の iframe は相対URLを親ページ基準で解決するため localhost:5273/_album_miken.jpg を見に行く（正しくは .../prj/frames/_album_miken.jpg）。しかもこの img はフレーム内JSが動的生成するので、静的HTMLだけ書き換える FrameMng#resolveUrls() が拾えない。
  → 修正案：srcdoc に <base href="<framesディレクトリ>/"> を1つ挿入。これで静的・動的問わず相対URLが frames 基準で解決する。FrameMng はフレームHTMLの解決パスを持っているので、その dirname を base にできます。

  ② 列数・ページネーション（本家3列＋1/2ページ、bluesnovel 4列・ページ無し）
  おそらく ①の副作用。壊れた画像は寸法0でカードが縮み、1行に多く入って全10件が1ページに収まる。サムネが正しく載れば本家同様3列＋ページ送りになるはず（要再確認）。

  ③ now playing: (No BGM)（本家は free0509）
  音声層が未実装のため。todo の「音声」項目どおり一旦保留。

  提案
  まずは ①の <base> 挿入を入れれば、②も連動して本家にかなり近づく見込みです。これを実装しますか？（①だけで区切る／②③も含めて詰める、いずれでも）

- ①②系丸文字は見づらいので控えて
- 1と2のみ
- ルートに以前のpngが残っている。今後ssはtest下に生成


- [x] **HTMLフレームで、JSが動的に付ける画像src（アルバムのサムネイル）が解決されず404だったのを本家 `sn_repRes` フックで修正**（2026-07-25 完了）
	- タイトルの アルバム クリック →`[call fn=_album]`→ `frames/_album.sn` の `[s]` まで、既存タグ（`[add_frame]`/`[set_frame]`/`[let_frame]`/`[frame visible=]`/`[event]`/`[set_focus]`/`[let_ml]`/マクロ）だけで到達済み。残る不具合はサムネイル画像だけだった。
	- 原因：`srcdoc` の iframe は相対URLの基準が**親ドキュメントのURL**になる。静的な `src`/`href` は `FrameMng.#resolveUrls()` が書き換えるが、**フレーム内JSが後から付ける `data-src="_album_miken.jpg"` を `.src` へコピーする分**は拾えず、`localhost/_album_miken.jpg` として404になっていた。
	- 対処：`<base>` 注入も試したが `defer` 付き `<script src>`（bootstrap）に効かず別の404を招くため不採用。**本家の `sn_repRes`（画像ロード関数の差し替えフック。関数名は本家仕様で固定）** をフレーム読込直後に呼び、`data-src` をフレームHTMLのディレクトリ基準で解決する `setImg` を注入した（グリッド構築＝`[let_frame init]` より前に差し替わる）。静的URLは従来の書き換えのまま。結果、サムネイル全10枚＋bootstrap すべて読込・エラー0で、本家どおりのグレースケール配置になった。
	- 補足：フレームの列数（本家3列／こちら4列）は、フレーム内部幅（こちらはステージ単位の1024px、本家は表示スケールの約960px）に対する bootstrap の `row-cols` レスポンシブの差で、不具合ではない（同じ有効幅なら一致）。
	- 手動確認スクショの置き場所として `.gitignore` に `/test/.ss/` を追加。検証：ユニット **909件パス**、E2E **77件パス**（frame/focus 系含む）、`tsc` クリーン

pixi 版が動くようになった後のbluesnovel版機能追加で、React版frameの新機能もあるやもだが、それはまた後日検討。
さて、「ロード」ボタン（保存機能なし状態）へ。

- [x] **タイトルの「ロード」→ しおり画面 `frames/_archive.sn` の `[s]` まで到達（保存機能なし状態）**（2026-07-25 完了）
	- 原因：`*main` の `[set_frame … text=&sys:const.sn.save.place]` で停止していた。`sys:const.sn.save.place` が未定義→`&式`がundefinedだと属性が落ちる→`[set_frame]`の「textは必須です」で throw（本家 set_frame も同じ throw なので、違いは**既定値の有無**）。
	- 対処：本家のしおり層の初期値だけ用意（保存機能はまだ無いので**プレースホルダ**）。`sys:const.sn.save.place`=1（本家 CmnInterface.ts:197）、組み込み変数 `const.sn.bookmark.json`=`'[]'`（同 290。空のしおり）。`ScriptMng#defEnvBuiltins()` に追加。
	- 結果：ロードクリック→`[call fn=_archive]`→`*title_load`→`*main`→`[frame id=archive visible=true]`→`[s]` に到達。**空のセーブ枠を表示するロード画面が本家と完全一致**（ヘッダ「× / ロード / 削除」＋空ボディ）。ユニット **909件パス**、E2E **77件パス**、`tsc` クリーン。

ok.次は「設定」ボタンだが、その前に。
- TODO.mdやらあちこちに実装済/未済情報が分散しているので、以下に記載を集約し随時更新。ヒトだけでなくあなたも参考にしやすいように
  + タグの実装済/未済情報: docs/tag.html:127 付近の【タグ一覧】
    - BluesNovelならではのSKYNovelからの変更点、メモは #clearsysvar などジャンプ先の詳細部に記載
  + セーブ変数(save:)、システム変数(sys:)、雑用変数(tmp:)は docs/dev.html ジャンプ先の詳細部に
    - #reserve_value_save save:
    - #reserve_value_sys sys:
    - #reserve_value_tmp tmp:
  + この件で＜table＞列数は増やさず、名称部にぱっと見で分かる色マークを。🔴:未済, 🟡:実装中・機能未達, 🟢:実装済

- [x] **実装済/未済の状況を docs に集約（タグ・変数へ色マーク）**（2026-07-25 完了）
	- `docs/tag.html` のタグ一覧（サイドバー）の各タグ名先頭へ **🟢実装済／🟡実装中・機能未達／🔴未済** を付与（🟢51・🟡9・🔴55）。🟡は既知の欠落があるもの（`add_face`/`add_filter`/`button`/`lay`/`let`/`page`/`set_focus`/`trans`/`tsy`）。判定は `ScriptEngine.RESERVED_TAGS` と todo.md/CLAUDE.md の記述に基づく。
	- `docs/dev.html` の変数表（save:/sys:/tmp:）の名称セル先頭へ同じマーク（🟢37・🟡2・🔴54）。列は増やさず名称内に。保存・音声・履歴・キー状態・native window 系は🔴、環境(`const.sn.config`等)・`const.sn.frm.*`・`const.sn.lay.*`・auto/skip 系は🟢、`const.sn.lay.*.width/height`（実寸なし1/0代用）は🟡。
	- 各ドキュメントに凡例を追加。本家からの変更点・メモは**各タグの詳細部**に記載する方針とし、雛形として `#clearsysvar`（既読も消す）・`#button`（既定ページback・座標時のみ絶対・pic/style未対応）・`#page`（clearのみ）・`#let`（text=とval=）へメモを記入。以降は随時。
	- `todo.md` 冒頭と `CLAUDE.md` に「タグ／変数の実装状況の一次情報は docs/tag.html・docs/dev.html」と明記（todo.mdは作業計画に集中）。
	- あわせて `const.sn.lay[N].<fore|back>` の詳細ツリーに **`x`/`y`（本家の座標名。left/top の別名）** を追加（`ScriptMng`）。`tsc` クリーン、ユニット・E2E 影響なし。


## Claude 5

- まずCLAUDE.md、過度な制約を大幅に減らす。当たり前のことは書かない。ツール説明をシンプルに。Auto memoryに任せる
- 「設定」ボタンクリックから[s]停止まで通す

- [x] **CLAUDE.md を大幅に整理**（2026-07-25 完了）
	- 493行 → 約240行。当たり前のこと（応答は日本語・ビルドやコミットの担当）は auto memory に任せて削除、ツール説明（`playwright-cli`・ビルド4本の表・E2E周辺）は要点だけに圧縮、コードを読めば分かる説明は落とした。
	- 残したのは**コードから読み取れない事実**＝本家との相違、そうしてある理由、踏むと分からなくなる落とし穴。日本語化して密度を上げ、「落とし穴」節へ集約。
	- ついでに古くなっていた記述を修正：`[button]`の既定ページは`fore`ではなく本家同様`back`。

- [x] **タイトルの「設定」→ `frames/_config.sn` の `[s]` まで到達**（2026-07-25 完了）
	- 原因は**システム変数(sys:)の初期値が入っていなかった**こと。`_config.sn`の`*val2ctrl`が
	  `[set_frame text=&sys:sn.tagCh.msecWait]`のように sys: を読むが、未定義だと`&式`が`undefined`になり
	  属性ごと落ちて「[set_frame] textは必須です」で停止していた。
	- `VarStore`が生成時と`clearSys()`（[clearsysvar]）時に `creSYS_DATA()` の初期値を入れるようにした
	  （本家 `Variable.ts#clearsysvar()` 相当）。`creSYS_DATA()`は本家から移植済みだったが**どこからも呼ばれていなかった**。
	  `sn.sound.global_volume`/`movie_volume` は本家では代入トリガ関数の型だが、値としては本家も起動時に1を入れる（`SoundMng.ts:67`）ので数値1を置く。
	  これに伴い `ScriptMng` の `sys:const.sn.save.place = 1` の個別初期化は不要になり削除。
	- `const.sn.isFirstBoot` を **false → true** に。sys: をまだ保存しないので毎回が初回起動。テンプレの
	  `theme/setting.sn` は `[if exp=const.sn.isFirstBoot]` の中で `sys:TextLayer.Back.Alpha = 0.7` 等の
	  初期値を設定しており、false のままだとそこを丸ごと素通りして設定画面が既定値のままだった。
	  `test/uc_goal.test.ts` の疑似環境も本番に合わせて true に。
	- 結果、設定画面は**バック不透明度70%・各待ち時間・スキップ・システム欄まで本家(pixi版)と一致**。
	  ×ボタンでタイトルへ戻るところまで確認。残差は「ボイスのみ」音量（`sys:const.sn.sound.VOICE.volume`は
	  本家では`[volume]`＝音声層が触れて初めて入る）と、フレーム内幅が本家960に対しこちらは1024なため
	  bootstrap の`row-cols`が1列多くなる点（アルバムと同じ、不具合ではない）。
	- `docs/dev.html` の sys: 表を更新：初期値が入るようになった変数を🔴→🟡（読み書きと初期値はあるが、
	  その値を使う機能＝音声層・文字表示ウェイト等がまだ無い、の意）とし、節の冒頭にその旨を明記。
	  `const.sn.isFirstBoot` の初期値も true に。
	- `test/VarStore.test.ts` に `getVal_35_sys_defaults`（初期値と[clearsysvar]後の入れ直し）を追加。
	  ユニット910・E2E77 パス、`tsc` クリーン。


- タグ実装
  - 🟡[let] 変数代入・演算
  - 🔴[loadplugin] プラグインの読み込み
  - 🔴[navigate_to] ＵＲＬを開く
  - 🔴[snapshot] スナップショット

- [x] **タグ実装：`[let]`の仕上げと`[loadplugin]`・`[navigate_to]`・`[snapshot]`**（2026-07-25 完了）
	- **`[let]` 🟡→🟢**：bluesnovel独自の`val=`（常に式評価）を廃止し、本家書式の`text=`（値そのもの。
	  式にしたいときだけ`text=&式`）へ一本化した。テスト・E2Eシナリオの34箇所を機械的に置換。
	  本家との違いは1点だけ残る＝本家は`text`省略を許すがこちらは必須（`text=&式`の評価が`undefined`
	  だと属性ごと落ちる仕組みがあるので、黙って空文字が入ると原因追跡が難しい）。
	- **`[navigate_to]` 🔴→🟢**：本家（`SysWeb.ts:239`）と同じく`open(url, '_blank')`で別タブに開く。
	- **`[loadplugin]` 🔴→🟢**：本家同様cssのみ（JSプラグインは本家でもビルド時取り込み）。fetchした
	  内容を`<style>`として`<head>`へ足す。`join=true`（既定）は読み込み完了までシナリオを止める。
	- **`[snapshot]` 🔴→🟡**：本家はpixiのレンダラで描き直すが、こちらの表示はDOMなので
	  **DOMを複製 → SVGの`<foreignObject>` → canvas → PNG** で撮る（`src/ts/Snapshot.ts`。
	  html2canvas等の外部ライブラリは足さない）。`<img>`化したSVGは外部リソースを取りにいけないので、
	  画像はdata URIへ埋め込み、ページのスタイルシートも文字列にして中へ入れている。
	  `fn`/`layer`/`page`/`width`/`height`/`b_color`に対応。**HTMLフレームの中身は写らない**
	  （iframeは描画されないというブラウザ側の制約。本家web版もpixiステージだけを撮るので結果は同じ）。
	  `smoothing=`・拡張子によるフォーマット指定・`userdata:/`保存・`b_color`の透過2桁は未対応。
	- `[loadplugin]`/`[snapshot]`は**非同期の停止点**として`[add_frame]`と同じ形で実装（エンジンは
	  意図をアクションに載せて止まり、`ScriptMng`が終わってから続きを回す）。`[snapshot layer=…]`の
	  絞り込み用に、`GrpLayer`/`TxtLayer`のルート要素へ`data-lay`属性を出すようにした
	  （表裏の`data-page`と同じ役割）。
	- テスト：`test/ScriptEngine_sys.test.ts`に3タグ分（属性解釈・停止するかどうか）。ブラウザでしか
	  確かめられない部分は新規E2E `test/e2e/snap.e2e.ts`＋フィクスチャ`prj_snap`で、cssが実際に効くこと・
	  PNGがダウンロードされ中身がPNGでステージ実寸なこと・popupのURLを見る。
	  `snPage.ts`に`waitWaitMark()`を追加（非同期タグを挟むシナリオは、キーを押す前に本物の停止点を
	  待たないと`waitIdle()`が処理中の一瞬を停止点と誤認する）。
	  ユニット920・E2E80 パス、`tsc`クリーン。


- そろそろデータ系に着手。修正・タグ実装
  - TODO.md:`package.json`から`store`を除去、など
  - 🔴[copybookmark] しおりの複写
  - 🔴[erasebookmark] しおりの消去
  - 🔴[load] しおりの読込
  - 🔴[record_place] セーブポイント指定
  - 🔴[reload_script] スクリプト再読込
  - 🔴[save] しおりの保存
  - 🔴[export] プレイデータをエクスポート
  - 🔴[import] プレイデータをインポート

- [x] **データ系：セーブ層（しおり・sys:・既読の永続化）とタグ8つ**（2026-07-25 完了）
	- **`src/ts/SaveMng.ts` を新設**。本家 `SysBase.data`（`{sys, mark, kidoku}`）＋ `SysWeb.flushSub()`/
	  `initVal()` にあたる層で、保存先は localStorage、キーは本家と同じ `skynovel.《save_ns》 - 《種別》`
	  （同じプロジェクトなら本家が書いたデータをそのまま読める）。書き込みは本家 `SysBase.flush()` と同じく
	  **最短500ms間隔にまとめる**（既読は停止点ごとに更新されるので、まとめないと1文字進むたびに書く）。
	- 置き場所の判断：エンジンは DOM も localStorage も触らない決まりなので持てず、ストア（zustand）は
	  「今の画面」であって保存データの器ではない。そこで `ScriptMng` がこれを1つ抱え、しおりの中身は
	  **エンジンから貰う分（save:変数・ifスタック・再開位置）とストアから貰う分（表裏ページのJSON）の合成**
	  として組み立てる。復元は `store.replace()`（読み戻しの Memento と同じ形）。
	- **`src/sn/localStore.ts`** を本家から移植（eval を使う `store.js` の置き換え）。これで
	  `package.json` から **`store` / `@types/store` / `socket.io-client` を除去**できた（todo.md の積み残し）。
	- タグ8つ：**`[record_place]` 🟢**（サブルーチン内なら本家同様*最上位の呼び元*を記録）、
	  **`[save]` 🟡**、**`[load]` 🟡**、**`[reload_script]` 🟡**、
	  **`[copybookmark]` 🟢**、**`[erasebookmark]` 🟢**、**`[export]` 🟡**、**`[import]` 🟡**。
	  `[load]`/`[reload_script]` は `[add_frame]` と同じ非同期の停止点（スクリプトを読み直してから続きを回す。
	  本家同様キャッシュを必ず捨てる）。`[export]`/`[import]` は終わったら `sn:exported`/`sn:imported` を発火する。
	  🟡 の残りは主に音声の復元・サムネイル画像の保存・暗号化で、いずれも各層が無いため。
	- **既読情報とsys:が停止点ごとに保存されるように**なった（todo.md の「既読情報の永続化」）。あわせて
	  `const.sn.isFirstBoot` が本家どおり「sys:の保存データが空だったか」で決まるようになり、
	  `const.sn.bookmark.json` が実データを返すようになった（テンプレのロード画面が実際に枠を並べる）。
	- `VarStore` に名前空間まるごとの `cloneNs()`/`setNs()` を追加（`cast=str` の記録も一緒に運ぶ。
	  でないと復元後に `'0123'` が `123` へ自動キャストされる）。ストアに `getPagesJson()` を追加。
	- **`Caretaker` のバグ修正**：`clear()` の直後に `Stage` が再描画されると
	  `#hScr2AState[''] ` が無いまま書き込もうとして React ごと落ちていた（`[page clear=true]` でも起きる。
	  今回 `[load]` が履歴を捨てるようになって表面化した）。
	- テスト：`test/ScriptEngine_save.test.ts`（属性解釈・save:変数とifスタックの出し入れ・停止するかどうか）、
	  `test/SaveMng.test.ts`（しおり表・bookmark.json・プロジェクトごとのキー分け。localStorage だけ最小の偽物を挿す）、
	  E2E `test/e2e/save.e2e.ts`＋フィクスチャ `prj_save`（[save]→[load] の往復で変数・再開位置・画面が戻ること、
	  localStorage への保存、`.swpd` のダウンロード）。
	  ユニット946・E2E84 パス、`tsc` クリーン。実テンプレ `tmp_blues` のロード画面が、しおりを入れた状態で
	  日付・本文つきの枠を並べるところまで確認。


- web版リロード時にかつての水色横長長方形文字レイヤが見えるのはなぜか。テンプレにもないので、デフォルト表示か
- しおり・システム系未実装により、中途半端に止めていた実装を再開

- [x] **空の文字レイヤに水色の箱を描かないようにし、しおり用の組み込み変数を実装**（2026-07-25 完了）
	- **水色（aquamarine）の横長矩形の正体**：`TxtLayer` の既定の見た目（aquamarine背景＋橙の点線枠）。
	  テンプレ由来ではなく **bluesnovel の試作用の目印**（本来見えない文字層の位置と大きさを分かるように
	  するもの）だった。文字が空の層でもこれを描いていたため、`[trans]` で裏ページが見える一瞬に
	  「空のメッセージ窓」が水色の帯として現れていた（タイトル画面のリロードで露見）。
	  **文字が1つも無い層には箱を描かない**ようにした（`[lay b_color=…]` で色を明示した層は「意図して
	  置いた板」なので従来どおり描く）。これまでの「ボタンだけ乗った層は描かない」条件を一般化した形。
	- E2Eヘルパ（`waitIdle()`/`txtBoxStyle()`）が文字レイヤの箱を**点線枠という見た目で**探していたので、
	  `data-lay` 属性で引くように変更（そもそもこちらの方が壊れにくい）。
	- **しおりが使う組み込み変数を実装**（セーブ層が無くて止めていたもの）：
	  `const.Date.getDateStr` 🟢 / `const.Date.getTime` 🟢 / `const.sn.last_page_plain_text` 🟡。
	  テンプレの `frames/_archive.sn` が
	  `[save dt=&const.Date.getDateStr text=&const.sn.last_page_plain_text]` と書くので、無いと
	  しおり枠の日付・本文が空になっていた（`&式` が undefined だと属性ごと落ちるため）。
	  `last_page_plain_text` は既定文字レイヤの蓄積文字列そのもので、文字装飾がまだ無いので
	  《》やルビの除去はしていない（そのぶん🟡）。
	- `sys:const.sn.cfg.ns` を本家（`SysBase.ts:152`）と同じく**毎回**入れ直すように修正
	  （初回起動時だけだと、`[clearsysvar]` の後に `[import]` が自分のデータまで弾いてしまう）。
	- セーブ層ができたことで古くなっていたコメント（「まだセーブ層が無いので」「将来のセーブ層用」等）を更新。
	  ユニット950・E2E84 パス、`tsc` クリーン。


- ゲーム本編ともいえる「最初から」ボタンクリックからタイトルに戻るまで通す
  - DOM・画像切り替えがきちんと表示されているか

- [x] **「最初から」＝ゲーム本編を、クリック68回でタイトルへ戻るまで通した**（2026-07-25 完了）
	- 実テンプレ `tmp_blues` の `theme/title.sn` *start → `script/ss_000.sn` → `[jump fn=title]` を
	  ブラウザで完走。**背景（black/white/yun_*/title.jpg）と立ち絵（F_kuchimoto/F_1024a/F_1024aFull/
	  F_1024b/kagero）の切り替えはすべて実画像が読めており**（`naturalWidth > 0` を各停止点で確認）、
	  和風メッセージ窓の中に縦書き本文が出る。
	- **`[lay b_pic=…]`（文字レイヤ背後の枠画像）を実装**。これが最大の欠落だった：テンプレの
	  `txt_lay_v_*` マクロは `b_pic=wafuu1` を渡し `b_color` はコメントアウトしているので、
	  未対応だと以前 `txt_lay_h_*` が置いた白の `b_color` が残り、**白地に白文字で本文が
	  まったく読めなかった**。本家どおり `b_pic` があれば `b_color` は無視する
	  （CSSでは擬似要素に `background-image` を敷き、`b_alpha` はその `opacity` に反映）。
	- **`sys:TextLayer.Back.Alpha` を実際に効かせた**（本家 `TxtLayer.ts:388`）。文字レイヤ背景の
	  不透明度は **`b_alpha` × この値**で、`b_alpha_isfixed=true` のレイヤだけが掛け算を免れる。
	  設定画面の「バック不透明度」スライダーがこれで実際に画面へ反映されるようになった（dev.htmlで🟡→🟢）。
	  値はストア（`backAlpha`）へ停止点ごとに写す（本家の `defValTrg` 相当）。
	- **競合バグを修正**：`[add_frame]`/`[let_frame]`/`[loadplugin]`/`[snapshot]`/`[load]` のような
	  「DOM絡みの非同期の停止点」の最中にクリックすると、処理の完了を待たずにシナリオが再開していた
	  （`#busy` は `#runStep()` を抜けた時点で下りるため）。本編で
	  `[add_frame id=album]` の直後の `[set_frame]` が「frame【album】が読み込まれていません」で
	  落ちるのを再現。`#procing` フラグで、その間のクリックは本家（`Reading.beginProc()`）同様に捨てる。
	- テスト：`test/ScriptEngine_lay.test.ts`（`b_pic`／`b_alpha_isfixed` の属性解釈）、
	  `test/store_lay.test.ts`（値の持ち方と `[clear_lay]` での破棄）。既存E2Eの背景色の期待値は
	  `× sys:TextLayer.Back.Alpha` を反映して更新した（`expr`/`lay`/`trans`）。
	  ユニット957・E2E84 パス、`tsc` クリーン。
	- **残る見た目の欠落**：ルビ記法 `《…》`／`｜…《…》` が生のまま表示される（文字装飾が未実装）、
	  縦書きの行数・余白が本家と完全一致ではない（`max_row`／`bura` 未対応）、音声なし。


- 手軽に実装できそうなタグ・組み込み変数に着手

- [x] **手軽に実装できるタグ・組み込み変数をまとめて**（2026-07-25 完了）
	- タグ3つ：**`[clear_text]` 🟡**（対象レイヤの*片面だけ*の文字を消す。[er]は表裏どちらも消す。
	  本家がここで行う履歴ログの改ページだけ未対応）、**`[dump_val]` 🟢**（名前空間ごとの変数一覧）、
	  **`[dump_stack]` 🟡**（現在位置・コールスタック・ifスタック）。後2つは本家がconsoleへ出すところを、
	  `[dump_lay]` と同じくデバッグ表示へ流す。
	- 組み込み変数：**`const.sn.Math.PI`** / **`const.sn.aIfStk.length`** /
	  **`const.sn.vctCallStk.length`** / **`const.sn.last_page_text`**（文字装飾が無いので
	  `last_page_plain_text` と同値なので🟡）/ **`const.sn.isDarkMode`**（`matchMedia`。遅延評価なので
	  切り替えの監視リスナは要らない）/ **`const.sn.platform`**（Platform.js を持たないのでUA文字列で代用、🟡）。
	- **`save:const.sn.mesLayer`** を `[current]` が更新するようにした（本家 `LayerMng.ts:958`）。
	  save: なのでしおりに含まれ、`[load]` で既定文字レイヤも一緒に戻る。
	- `sn.eventArg` / `sn.eventLabel` は既に実装済みだったのに docs/dev.html が🔴のままだったので訂正。
	- `VarStore` に `dump()` を追加（組み込み変数＝遅延評価は本家同様含めない）。
	  ユニット965・E2E84 パス、`tsc` クリーン。


- オートリード機能で本編完走test。ギャラリーにも簡易テスト雛形あり
- 同じくskip機能
- 既読skipテストサンプル、参考まで https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/kidoku

- [x] **オート読み・既読スキップで本編を完走**（実テンプレ `tmp_blues` の「最初から」→本編→タイトル）。
	止まっていた原因は自動進行の側ではなく、その途中で出ていた**例外が握り潰されていた**こと。
	- **`[button]` の `nm` を `label` 流用にしていたのをやめた**。テンプレの `[sys_menu]` は
	  `fn` 違い・`label=*main` のボタンを3つ並べる（字を隠す／履歴／設定）ので、
	  ストアの「ボタン名は同一レイヤ内で一意」に引っかかって本編開始直後に落ちていた。
	  本家にボタン名の概念は無く、ここの `nm` はReactの `key` のためだけの物なので、
	  **省略時はストア側で追加順の通し番号を振る**（`*main#0`…）。`[button nm=]` と明示した
	  場合の重複だけは従来どおりthrow（シナリオ側の誤りなので）。
	- **`[clear_lay]` がエンジン側の蓄積文字列を捨てていなかった**。`chgStr` は「そのレイヤの
	  全文字列」を毎回送る作りなので、ストアの `str` を空にしても次の本文が古い蓄積へ追記され、
	  消したはずの文が復活していた（本家 `TxtLayer.clearLay()` は中身も捨てる）。
	  蓄積が指すのは表ページなので `page=back` のときは触らない。
	- **投げっぱなし非同期の `.catch(()=> {})` をやめ、`#catchErr` で必ず表示する**ようにした。
	  `myTrace(…, 'ET')` が投げた値だけを識別して捨てる（`#tracedErr` と同一性比較）。
	  `#applyAction()` の例外は `step()` を包む try の外側なので、これが無いと
	  **画面もログも無反応のままシナリオが止まる**（今回まさにこれで原因を見失った）。
	- 回帰テスト：E2E `prj_autostory`（タイトル→`[button fn=]`で本編→`[p]`/`[l]`/`[waitclick]`→
	  `[jump fn=]`でタイトル）をオートと `skip.all` の両方で完走させる2本。ボタンは
	  **同じ飛び先を2つ**並べてあり、上記のボタン名衝突の回帰になっている。
	  ユニットは `store_lay.test.ts` にボタン名3件、`ScriptEngine_lay.test.ts` に蓄積文字列2件。
	- `[waitclick]` での手動クリック1回だけは仕様どおり（本家 `Reading.ts:313` と同じく
	  `[s]`/`[waitclick]` は必ず `cancelAutoSkip()` する）。テンプレは `ss_000.sn:101` にこれがある。
	  ユニット970・E2E87 パス、`tsc` クリーン。


- 文字レイヤ関係に着手
  - 順番・後回しは任せる。ただしすべてを一気にやらず、タグ2・3個ぐらいずつでコミットしていきたい（AI使用制限対策）
  - ルビ記法
  - 関連タグ
  - 本編
  - 文字とルビ https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/ruby
  - 改行、max_row、bura、追い出し、ぶら下がり仕様が意図通りか https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/line_breaking_rules
    - 本家にあるdumpHtm機能はhtmlテキスト出力によるプログラマルな比較目的。ドットレベルの比較というより文字配置と改行の確認用。使えそうなら使って
  - フォント https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/font

- [x] **ルビ記法**（`漢字《かんじ》`・`｜親文字《ルビ》`・傍点`《*》`）。文字レイヤ関係の1回目。
	- **本家 `RubySpliter.ts` をそのまま移植**（`src/sn/RubySpliter.ts`。相違は`T_PutCh`の置き場だけ）。
	  `test/RubySpliter.test.ts` も本家のテストを無改変で持ってきて**204件すべてパス**。
	  漢字の正規表現やサロゲートペア、`《* 》`傍点、空白での区切り指定など、自前で書き直したら
	  まず合わない類の仕様なので、Grammar/ExprEvalと同じく「テストが契約」の方式に揃えた。
	- **本文は「表示単位の並び」（`T_CH[] = {c, r?}`）としてストアへ入るようにした**。
	  割るのは`ScriptMng`（`src/ts/Txt.ts` `splitCh()`）で、**エンジンは生の文字列のまま**
	  （本家も文字組みはGrammarではなく表示側の仕事）。ストアは平文`str`と表示単位`aCh`の
	  両方を持つ＝`chgPic`の`fn`と`src`と同じ関係で、`str`はルビを含まない。
	- `TxtLayer`は1表示単位＝1spanのまま、ルビ付きなら中身を`<ruby>親文字<rt>ルビ</rt></ruby>`に。
	  文字送り演出のDOMキャッシュ（前方一致で差分だけアニメ）も単位単位の比較へ移した。
	- `const.sn.last_page_plain_text` が本家同様**ルビを除いた平文**を返すようになった（docs/dev.html 🟢）。
	- エスケープ文字（`prj.json`の`init.escape`）は本家 `ScriptIterator.ts:120-122` と同じく
	  Grammarと`RubySpliter`の両方へ配る。**`RubySpliter`は正規表現を`setEscape()`で組み立てるので、
	  これを忘れると`matchAll`が名前付きグループ無しで回って落ちる**（実際に踏んだ）。
	- 実テンプレ `tmp_blues` の本編で確認（`選《よ》りに`・`安全｜剃刀《かみそり》`が縦書きでルビ付きに）。
	  E2Eは `prj_ruby` で4本（3記法＋`[er]`で消える）。ユニット1174・E2E91 パス、`tsc` クリーン。
	- 未対応：ルビの位置指定（`《center｜るび》`の`r_align`。今は指定を落としてルビ文字だけ出す）、
	  `[lay sesame=…]`、ルビ付き行の行間の詰め。`[ch]`/`[span]`/`[link]`/`[ruby2]`/`[tcy]`は次回以降。

- [x] **文字装飾タグ `[span]` / `[ch]` / `[ruby2]`**。文字レイヤ関係の2回目。
	- **本家の「本文ストリームへ命令を埋め込む」方式をそのまま採った**（本家 LayerMng.ts:315
	  `#cmdTxt = cmd=> tl.tagCh('｜&emsp;《'+ cmd +'》')`）。ルビ記法の親文字＋ルビの形を借りて、
	  ルビ側にURIエンコードしたJSONを載せる仕掛けで、**移植済みの`RubySpliter`がそのまま1単位として
	  通してくれる**（`putTxtRb`にその分岐が元からある）。おかげで**エンジンは相変わらず文字列を
	  貯めるだけ**で済み、`chgStr`アクションの形も既存テストも一切変わっていない。
	- 解釈は`Txt.ts` `splitCh()`の小さな状態機械：`span｜`で以降のスタイルを差し替え（属性なしの
	  `[span]`は解除。本家 TxtLayer.ts:804 `#mergePushSpan`の「どちらも指定されてなければクリア」）、
	  `add｜`〜`add_close｜`の間だけ`[ch]`のスタイルを重ねる。命令は表示単位を作らないので
	  平文（`const.sn.last_page_plain_text`）にも残らない。
	- `T_CH`に`s`（本文側CSS）と`rs`（ルビ側CSS）が増え、`TxtLayer`が`<span style>`／`<rt style>`に反映。
	  文字送り演出のDOMキャッシュの前方一致判定もスタイル込みで比べる。
	- `[ruby2]`は本家同様`[ch]`へ書き換える。`t`/`r`をURIエンコードするので、**ルビに空白があっても
	  区切り指定と誤解されない**（`[ruby2 t=蜊 r="あさ り"]`が1つのルビになる）。
	- テスト：`Txt.test.ts`（命令解釈13件）・`ScriptEngine_txt.test.ts`（タグ12件。エンジンが積んだ
	  文字列を`splitCh`で割って表示単位を確かめる＝ScriptMngと同じ手順）・E2E `prj_ruby`に
	  computed styleで色を見る1件。ユニット1199・E2E92 パス、`tsc` クリーン。
	  実テンプレ `tmp_blues` は`[span]`/`[ch]`をマクロの説明文でしか使っていないので影響なし（完走を再確認）。
	- 未対応：`[link]`/`[endlink]`・`[tcy]`・`[graph]`（`Txt.ts`の命令解釈に足す形。`[link]`は入れ子＝
	  スタックが要る）、`[span]`/`[ch]`の`layer`/`page`・`wait`・`r_align`・`ch_in_style`/`ch_out_style`・`record`。

- [x] **`[link]` / `[endlink]` / `[tcy]`**。文字レイヤ関係の3回目。前回と同じく本文ストリームへ
	命令を埋め込む方式（`Txt.ts`が解釈）なので、エンジンとストアの形はまた変えずに済んだ。
	- **`[link]`〜`[endlink]`のリンク区間**。区間内の表示単位に飛び先（`label`/`fn`/`call`/`arg`）が
	  付き、クリックで**[button]と同じ経路**（`ScriptMng.jumpToLabelAndGo`）へ流れる。
	  `arg`は飛び先で`&sn.eventArg`として受け取れる（本家 Main.ts `resumeByJumpOrCall()` と同じ代入）。
	  本文DOMは文字送り演出のため**Reactの外**で組み立てているので、`BtnLayer`のようなJSXではなく
	  `TxtLayer`が直接リスナを付ける。読み進めへ伝播させない（`stopPropagation`）のは`[button]`と同じ。
	  `style`は区間の間だけ足し、`[endlink]`で`[span]`の指定へ戻す（スタックなので**入れ子でも壊れない**。
	  本家は入れ子不可の仕様）。`style_hover`はマウスが乗っている間だけ足す。
	- **`[tcy]`（縦中横）**は命令だが**表示単位を作る**唯一の命令。CSSの`text-combine-upright: all`で組む。
	- テスト：`Txt.test.ts`＋4件、`ScriptEngine_txt.test.ts`＋5件、E2E `prj_ruby`に
	  「リンクをクリックしてジャンプし、`arg`が飛び先へ渡る」1件。
	  ユニット1208・E2E93 パス、`tsc` クリーン。実テンプレ `tmp_blues` はこの3タグを使っていない。
	- 未対応：`[graph]`（インライン画像。パス解決が要るのでアセット周りと一緒に）、`[link]`の
	  `url`・`global`・`onenter`/`onleave`・`style_clicked`系・効果音・`hint`、各タグ共通の
	  `layer`/`page`・`wait`・`r_align`・`ch_in_style`/`ch_out_style`。

- [x] **プロジェクト同梱フォントの`@font-face`自動登録**（ギャラリーの`font`サンプル相当）。
	- path.jsonにあるフォント（woff2／woff／otf／ttf）を起動時に全部登録する。**シナリオ側に
	  読み込みタグは無く**、拡張子を除いたファイル名がそのまま`font-family`名になる
	  （本家 TxtLayer.ts:97 と同じ規約）。`src/ts/Font.ts`。
	- **実テンプレ `tmp_blues` の本文フォントがようやく効いた**。`theme/setting.sn` の
	  `&def_fonts = 'ipamjm, "Source Han Sans CN"'` が指す2つがpath.jsonにあり、
	  今まで`@font-face`が無いので既定のゴシックで出ていた本文が、指定どおりの明朝になった。
	  フォント名に空白を含むものがあるので、`font-family`もurlも引用符で囲む。
	- Webフォント（ギャラリーの`[loadplugin fn='https://fonts.googleapis.com/…']`）は
	  実装済みの`[loadplugin]`がそのまま使えるので、こちらは追加不要だった。
	- テスト：`Font.test.ts`（CSSの組み立て4件。DOM不要の純粋部分）＋E2Eで`<style data-sn="font">`の
	  中身を1件。**E2Eのフォント本体はわざと置いていない**（確かめたいのはpath.jsonから
	  `@font-face`を組み立てて`<head>`へ挿す配線だけで、そのシナリオはそのフォントを使わない＝
	  ブラウザは取りにも行かないため）。ユニット1212・E2E94 パス、`tsc` クリーン。
	- 残り（ギャラリー`line_breaking_rules`の範囲）：`[lay bura=…]`（ぶら下げ禁則）・`ffs`/`noffs`
	  （文字詰め）・`max_row`・`r_size`。本家は`Hyphenation.ts`で自前の行分割をしているので、
	  CSSの`line-break`/`hanging-punctuation`でどこまで代替できるかの見極めから。

- [x] **文字詰め `[lay ffs=/noffs=]` とぶら下げ禁則 `[lay bura=]`**（ギャラリーの`line_breaking_rules`の範囲）。
	**まず方針を決めた：行分割そのものはブラウザ任せにする。** 本家は`Hyphenation.ts`（431行）で
	Rangeを使って文字位置を実測し、禁則にかかる文字を見つけて自分で改行位置を決めている。
	pixiのテキストでは自前でやるしかないが、こちらはDOMなので**ブラウザの行分割がそのまま使える**。
	同じものを移植し直すより、CSSへ読み替えられる範囲を素直に当てるほうが筋が良いと判断した。
	- `ffs`（文字詰め）は表示単位ごとに`font-feature-settings`を当てる。**1文字ずつ当てる必要がある**
	  のは`noffs`で「この文字だけ詰めない」と外せる仕様のため（本家 TxtLayer.ts:480 #fncFFSStyle）。
	  全角空白を常に除くのも本家と同じ。前回までに本文を表示単位へ割ってあるので素直に書けた。
	- `bura`（ぶら下げ禁則）は文字レイヤ本体へ`hanging-punctuation: allow-end`＋`line-break: strict`。
	  **ぶら下げが実際に効くかは閲覧ブラウザ次第**（Safariは対応、Chromeは`hanging-punctuation`未対応）。
	  この割り切りの帰結として、禁則文字の指定（`kinsoku_sol`/`kinsoku_eol`/`kinsoku_dns`/`kinsoku_bura`）は
	  受け付けない——ブラウザに渡す手段が無いため。docs/tag.htmlの[lay]にその旨を明記した。
	- テスト：エンジン3件・ストア2件（文字レイヤ専用の検査と[clear_lay]での消去）・E2E1件
	  （`noffs`に挙げた文字だけ`font-feature-settings`が`normal`になること、`line-break`が`strict`になること）。
	  ユニット1217・E2E95 パス、`tsc` クリーン。
	- 残り：`max_row`（最大行数を超えたら自動改ページ）・`r_size`（ルビサイズ）・`break_fixed`系。
	  ギャラリーの`line_breaking_rules`と実機で見比べて、ブラウザ任せで足りなければ自前計算へ寄せる。


- アニメpng（APNGではなく独自スプライトシート）をサポート
  - これは[l][p][graph]に関係ある機能
  - サンプル https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/anime_png

- [x] **アニメpng（APNGではなく独自スプライトシート）の再生**。まず画像レイヤ`[lay fn=…]`から。
	ギャラリーの`anime_png`（SKYNovel_gallery/public/prj/anime_png）が仕様。
	- path.jsonでは**「論理名→.json」「論理名.列x行→.png」の2件に分かれて載る**（`clock`→`mat/clock.json`、
	  `clock.5x8`→`mat/clock.5x8.png`）ので、`[lay fn=clock]`のパス解決結果は**.jsonのURL**になる。
	  そこからjsonの`meta.image`を同じ場所で引いてpngへ辿る。ストアはURLまでを持ち、
	  コマ割りの読み込み（fetch）は画面側＝画像の自然サイズと同じ「アセットの中身」の扱いにした。
	- **本家はpixiの`AnimatedSprite`（テクスチャ差し替え）だが、こちらはCSSのstepsアニメ**で
	  背景位置をコマ送りする＝JSは1コマも跨がない。速い軸・遅い軸の2本を重ねることで格子を走査し、
	  コマの並びが縦優先か横優先かは**2コマ目の位置**から判定する（ギャラリーのclock/breaklineは縦優先）。
	  `meta.animationSpeed`は本家（pixi）と同じ「1tick=1/60秒あたりに進むコマ数」として秒へ直す。
	- テスト：`Sprite.test.ts`（定義jsonの読み取り6件。値はギャラリーのサンプルから取った）＋
	  E2E3件（CSSアニメの組み立て・シート画像が404にならないこと・**実際にコマが進むこと**）。
	  E2E用に20x20×4コマの小さなpngをその場で生成して置いた（113バイト）。
	  ユニット1223・E2E98 パス、`tsc` クリーン。
	- 次：**`[l]`/`[p]`の待ちマーク**（`breakline`/`breakpage`があれば🩷/✅の代わりに出す。
	  本家 LayerMng.ts:159）と`[graph]`（本文中のインライン画像）。要望の本題はそちら。
	  `[lay b_pic=…]`（文字レイヤの枠画像）でのシート再生も未対応。

- [x] **`[graph]`（本文中のインライン画像）と、`[l]`/`[p]`の待ちマークの画像化**。前回のアニメpngの土台を
	要望の本題である`[l]`/`[p]`/`[graph]`へ繋げた。どちらもアニメpng（スプライトシート）で動く。
	- **`[graph]`**は本家と同じく本文ストリームへ`grp｜…`を埋め込む方式（前回までの`[span]`/`[ch]`と同じ道）。
	  本文としては**全角空白1つぶんの場所を占め、そこへ画像を敷く**（本家も`&emsp;`を置いて重ねる）。
	  文字を残すのが要点で、こうしないと平文（`str`）とDOMの文字が食い違う。
	  パス解決は`splitCh()`を純粋なままにしたいので、割った後に`ScriptMng`が上から流し込む。
	- **`[l]`/`[p]`の待ちマーク**は、`breakline`/`breakpage`という名の画像・アニメpngがプロジェクトに
	  あればそれを出す（本家 LayerMng.ts:159 と`ConfigBase.existsBreakline`の規約）。無ければ従来の🩷/✅。
	  **実テンプレ `tmp_blues` は両方持っている**ので、改ページ待ちが本来の▼マーク（`breakpage_b.png`）に
	  なることを実機で確認した。
	- 再生CSSは`Lay.ts`のemotion版をやめ、`Sprite.ts`が**<head>へクラスを1つ作って使い回す**形にした。
	  文字送り演出のため本文DOMはReactの外で組み立てており、そこからも同じ物を当てたいため。
	- テスト：`Txt.test.ts`＋1件、`ScriptEngine_txt.test.ts`＋3件、E2E＋2件
	  （`[graph]`が本文に1文字ぶん占めて画像が敷かれること、`[l]`はアニメ・`[p]`は静止画で出ること）。
	  ユニット1227・E2E100 パス、`tsc` クリーン。
	- 未対応：`[lay b_pic=…]`でのシート再生、`[graph]`の`width`/`height`（今は全角空白の枠に収める）、
	  待ちマークの位置指定（`x`/`y`/`visible`等。今は本文の直後に流し込む位置）。


- 🔴 [link][endlink]は[navigate_to]やジャンプ系なので実装できると思う
- blendModeサポート。[lay][add_face][button]

- [x] **`[link]`/`[event]`の`url`属性**と、**blendmodeの扱いを3タグで統一**。
	- まず状況の訂正：**`[link]`/`[endlink]`は前々回に実装済み**（`label`/`fn`/`call`/`arg`＋`style`系。
	  docs/tag.htmlでは[link]🟡・[endlink]🟢）。🔴で残っていたのは**`url`属性**で、
	  ご指摘のとおり[navigate_to]と同じ話だったので今回入れた。
	- `[link url=…]`：クリックでラベルへ飛ばず**別タブでURLを開く**（本家も「指定時は fn・label を無視する」）。
	  ついでに`[event url=…]`（ラベルへ飛ぶ代わりにURLを開く予約）も同時に対応。
	  開く口を`ScriptMng.navigateTo()`に一本化し、[navigate_to]・[link]・[event]の3つがそこを通る。
	- **blendmode**：`[add_face]`だけCSSの値を素通ししていたのを、[lay]・[button]と同じ
	  「本家の4種（normal／add／multiply／screen）だけを受けてCSSの値へ直す」へ揃えた
	  （`add`はCSSに同名が無いので`plus-lighter`＝加算合成）。`ScriptEngine.ts`の`//TODO:`を消化。
	  3タグとも`mix-blend-mode`へ落ちることをE2Eで確認（画像レイヤの箱・差分絵の`<img>`・ボタン）。
	- テスト：エンジン4件（blendmodeの変換と例外）＋`[link url]`1件＋`[event url]`2件、
	  E2E2件（blendmode 3タグぶん、`[link url=…]`が別タブを開いてシナリオは進まないこと）。
	  ユニット1234・E2E102 パス、`tsc` クリーン。


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

- [x] **HTMLフレーム：`[add_frame]`・`[frame]`・`[set_frame]`・`[let_frame]`と`[event key='dom=…']`**（2026-07-24）
  - 本家 `FrameMng.ts` の移植。`main.sn`が`[call fn=_yesno]`する先が全面的にこれを使うので、目標経路上の大物
  - **フレームはストア（`aPage`）には載せない**。中身は自分のJS状態を持つ生きたHTML文書で、JSONへ写し取っても復元できないため（本家もiframeをcanvasの隣へ挿すだけでレイヤ・ページの仕組みには載せていない）。代わりに`src/ts/FrameMng.ts`がDOM側で抱え、`[set_frame]`/`[let_frame]`はiframeの`window`変数を直接読み書きする。`srcdoc`で作るので同一オリジン＝中の`var`変数・関数へ手が届く
  - **本家より簡単になった点**：本家は位置・寸法にステージの拡縮（`cvsScale`）を毎回自分で掛けてiframeへ書き、リサイズのたびに全フレームを書き直していた。こちらは`Stage.tsx`が**拡縮される箱の中**にフレーム置き場（JSXでは子を持たない空div）を用意するので、ステージ座標のまま書けばよくリサイズ追従も勝手に効く。Reactは自分が作った子しか触らないので、そこへ`FrameMng`がiframeを足しても衝突しない
  - `[add_frame]`は**停止点**にした（HTMLのfetchが要る。本家も`Reading.beginProc`で止める）。読み込み完了後、本家と同じ組み込み変数一式（`const.sn.frm.<id>`とその`.alpha`/`.x`/`.width`/`.visible`…）をエンジンへ書き戻してから再開する
  - `[let_frame]`も停止点にした。**アクションの適用は`step()`が返った後**なので、そうしないと取得した値が同じstep内では古いまま読まれてしまう（本家はタグを1つずつ同期実行するので起きない問題）
  - `[event key='dom=フレームid:セレクタ']`。**CSSセレクタは大小文字を区別する**ので、予約表の索引には小文字化した値を使いつつ、DOM側へは元の文字列（本家の`rawKeY`）を渡す。要素の種別でイベント名を変える（checkbox/rangeは`input`、text/textareaは`input`+`change`、他は`click`+Enter）のも本家どおり。発火は既存の`fireEvent`経路へ流し込むので、ラベルジャンプの扱いは通常のキー予約と同じ
  - `srcdoc`に入れる前にHTML内の相対パスをそのHTMLの置き場所基準へ直す（本家 `FrameMng.ts:122`。`srcdoc`の中では相対パスの基準がドキュメント自身でなくなるため）
  - **`Stage`は`lazy()`ロードなので、フレーム置き場はシナリオ開始より後に届く**（`[add_frame]`がスクリプト冒頭にあると確実にそうなる）。最初は「置き場所がまだありません」と例外にしていたが、待てば必ず来るので届くまで待つ形にした
  - `test/ScriptEngine_frame.test.ts`（新規22件）＋`test/e2e/frame.e2e.ts`（新規6件・`prj_frame`フィクスチャ。自前の`yesno.html`が`var`変数と関数を持ち、それを読み書きする）。ユニット844件→866件、E2E 60件→66件
  - E2Eの注意：このシナリオは`[add_frame]`/`[let_frame]`でstep()の途中から一旦返るため、その隙間が`waitIdle()`からは停止点と区別できない（複数ファイルと同じ事情）。表示の確定は`expect.poll`で待つ
  - `[tsy_frame]`・フレーム内画像の差し替え（本家`sn_repRes()`）・`sn.event.domdata.*`は未対応（`todo.md`へ）

- [x] **`[set_focus]`（キーボードフォーカスの順番管理）**（2026-07-24）
  - 本家 `FocusMng.ts` ＋ `EventMng.ts:640 #set_focus()` の移植。`[event key='dom=…']`が入って前提が揃ったので保留を解いた。`main.sn`が矢印キーの予約から`[set_focus to=&sn.eventArg]`を呼ぶ形で使う
  - 本家はpixiのContainer（ゲーム内ボタン）とHTML要素（フレーム内の部品）を混ぜて並べるが、bluesnovelはどちらもDOM要素なので`HTMLElement`だけの一本の輪になる。輪へ入る経路は本家と同じ3つ：`[button]`（表示中ずっと）・`[event key='dom=…']`の**最初の1件だけ**（本家 `EventMng.ts:596` の `if (i === 0)`）・`[set_focus add='dom=…']`
  - `src/ts/FocusMng.ts`はモジュール直下の単一インスタンス。画面全体で1つしかない状態で、Reactのツリー（BtnLayer）からもDOM側（ScriptMng）からも触るため。`Lay.ts`のドラッグ通知と同じ流儀
  - `[button]`は`<span>`なので`tabIndex={0}`を付けないと`focus()`が効かない。ついでにフォーカス中のEnter／Spaceで押下できるようにした（キーボードだけで操作できる）
  - **踏んだ穴その1**：フレーム内にフォーカスがある間、キー入力は**親のdocumentまで飛んでこない**。そのままだと`to=next`で一度フレームへ入ったら最後、矢印キーが効かなくなる。本家も同じ事情で各フレームのbodyへイベントを張っている（`EventMng.resvFlameEvent()`）ので、こちらは同じ内容のイベントを親のdocumentへ投げ直して`Main.tsx`の1本の経路へ合流させた
  - **踏んだ穴その2**：フレーム内の要素からフォーカスを外しても、**親から見るとiframe自身がフォーカスされたまま**でキー入力もそちらへ行く。`to=null`では親側のフォーカスも外す（本家も`blurSub()`で`globalThis.focus()`を呼んで画面へ戻している）
  - `add`/`del`が`dom=`以外なら例外にした（本家は黙って無視して`to`の処理へ落ちるが、書き間違いを見逃さないため）
  - `test/ScriptEngine_focus.test.ts`（新規8件）＋`test/e2e/focus.e2e.ts`（新規4件・`prj_frame`フィクスチャを拡張）。ユニット866件→874件、E2E 66件→70件
  - ゲームパッド対応（`range`のstepUp/Down等）とフォーカス時の見た目は未対応（`todo.md`へ）

- [x] **フィルター：`[add_filter]`・`[clear_filter]`・`[enable_filter]`と`[lay filter=…]`**（2026-07-24）
  - 本家 `LayerMng.ts:836 #add_filter()` ＋ `Layer.ts:101 bldFilters()`。**表示アーキテクチャ変更（pixi→React/DOM）の影響が一番大きかった項目**
  - 本家のフィルターはpixiの`BlurFilter`/`NoiseFilter`/`ColorMatrixFilter`で22種あるが、bluesnovelはCSSの`filter`プロパティなので**素で書ける9種だけ対応**した（`blur`/`brightness`/`contrast`/`grayscale`/`black_and_white`/`negative`/`saturate`/`hue`/`sepia`）。既定値は本家に合わせてあり、`saturate`だけはpixiが「1を基準にamountぶん増やす」形なのでCSSへ渡す際に足している
  - 未対応のものは**「名前を知らない」のか「本家にはあるがCSSで書けない」のか**を区別して知らせる。前者は本家と同じ`filter が異常です`、後者は書ける9種を挙げた専用メッセージ。残り13種のうち`noise`以外はすべて`ColorMatrixFilter`のプリセットなので、SVGの`feColorMatrix`へpixiと同じ5x4行列を流し込めば同じ絵が出せる（`todo.md`へ）
  - 対象レイヤの選び方（`layer`省略＝全レイヤ）とページの扱い（`page=both`可）は`[clear_lay]`と全く同じで、違うのは配列をどういじるかだけなので、3タグ＋`[lay filter=]`をストアの1アクション（`chgFilter`）にまとめた
  - `[lay filter=…]`は**置き換え**（本家 `Layer.lay()` の `c.filters = [bldFilters(hArg)]`）。重ねたいなら`[add_filter]`。この違いは本家由来なので残した
  - 純粋な部分（filter名→CSS関数、有効なものだけ並べる）は`src/ts/Filter.ts`へ。GSAPもDOMも触らないのでエンジンから呼べる＝filter名の書き間違いをシナリオ実行時にその場で例外にできる（`Tsy.ts`と同じ流儀）
  - `test/ScriptEngine_filter.test.ts`（新規15件）＋`test/store_lay.test.ts`に8件追加＋`test/e2e/lay.e2e.ts`に1件追加。ユニット874件→897件、E2E 70件→71件
  - 本家サンプルが使うのは`[add_filter filter=brightness page=both]`（`ext_fg2.sn`の「最後に変化した立ち絵以外を暗くする」演出）だけなので、対応範囲としては足りている

- [x] **`[button]`の配置・寸法・変形属性と、目標経路の残タグ洗い出し**（2026-07-24）
  - まず**目標（`title.sn`の`[s]`まで）に何が残っているか**を調べた。実行経路のファイル群から使用タグを全部抜き出し、実装済み一覧・プロジェクト側マクロ・音声系と突き合わせた結果、**一番効いている穴が`[button]`の座標指定**だと分かった。`title.sn`のタイトルボタン4つは`left`/`top`/`width`/`height`/`rotation`/`pivot_x`/`pivot_y`で絶対配置しており、bluesnovelの`[button]`は`text`/`label`/`call`/`fn`しか見ていなかった
  - `left`/`top`/`width`/`height`/`rotation`/`pivot_x`/`pivot_y`/`scale_x`/`scale_y`/`alpha`/`enabled`/`blendmode`を実装（本家 `Button.ts` のコンストラクタ相当）。**書かれた属性だけ**を持つのは`[lay]`と同じ流儀
  - **`left`/`top`が書かれた時だけ絶対配置**にした。本家は常に絶対配置（省略時0,0）だが、試作のシナリオは複数ボタンを座標指定なしで並べており、既定を(0,0)にすると全部重なってしまうため。書かなければ従来どおり流し込み
  - 本家は`width`/`height`で**文字そのものを引き伸ばす**（pixiの`Text.width/height`は拡縮）。こちらは箱の大きさとして扱い、`height`をフォントサイズの基準にして収める。見た目の詰めは実機で（`todo.md`へ）
  - `enabled=false`は文字を灰色にし`pointer-events: none`（本家も`fill`を`gray`にしてイベントを張らない）
  - `test/ScriptEngine_btn.test.ts`（新規7件）＋`test/e2e/button.e2e.ts`に3件追加。ユニット897件→904件、E2E 71件→74件
  - **洗い出しの結論を`todo.md`の冒頭へ記録した**：目標経路で未対応なのは音声・画像アセット・文字装飾（`[ch]`/`[span]`/`[link]`）・しおり層だけになり、**タグ単体の実装はおおむね一巡**。残りの山はアセットパイプラインとしおり層

- [x] **試作用フォールバックの撤去と、画像アセット経路の通し**（2026-07-24）
  - `path.json`／`Config.searchPath()`の仕組み自体は最初から移植済みだったが、**本物の画像を一度も通していなかった**（E2Eフィクスチャは意図的に画像なしで作ってあった）。その状態を2つの試作用フォールバックが覆い隠していたので、両方外して経路を通した
  - `ScriptMng`の`SAMPLE_SN`（スクリプト読込に失敗したらダミーシナリオへ差し替える）を撤去。`path.json`に無い・取れないならシナリオは続けられないので黙って代替せず止める。併せて`load()`が投げっぱなしだったのを握るようにした（未処理のPromise拒否になり、何が起きたか分からないまま画面が空になっていた）
  - **画像のパス解決を描画時から`ScriptMng`へ移した**のが要点。`GrpLayer`は`render`の中で`searchPath()`を呼んでおり、サーチパスに無いと例外＝**Reactごと落ちる**。だから`try/catch`で握り潰すしかなかった。シナリオ実行時（`chgPic`適用時）に解決すればエラーをデバッグ表示へ出せるので、`GrpLayer`は出来上がったURLを描くだけの素直な部品になった
  - ストアは論理名（`fn`）と解決済みURL（`src`）の両方を持つ。前者は`[dump_lay]`・デバッグ用
  - 画像1枚が見つからないだけでゲームごと止めるのはやり過ぎなので、そこは`'ET'`（表示して停止）ではなく`'E'`（表示のみ）にした
  - `test/e2e/app/prj_pic/`を新設。**実体のPNGを2枚置いて**`path.json`→`searchPath()`→`<img>`まで通し、`naturalWidth`で本当に読めていることまで見る（読めなければ0になる）。`[add_face]`の差分合成の重なりと、解決失敗時に画面が落ちないことも同じフィクスチャで確認
  - `test/e2e/pic.e2e.ts`（新規3件）。E2E 74件→77件、ユニットは変更なし904件

- [x] **✅ 目標到達：本家サンプルの`main.sn`から`title.sn`の`[s]`まで走り切った**（2026-07-24）
  - 前回「次はアセットを実プロジェクトで通すのが最短」と書いたので、まず**エンジンだけで実シナリオ（`../tmp_esm_uc/doc/prj/`）を走らせて、どこで止まるかを測った**。ScriptMngがDOM側で担う部分（スクリプトのfetch、HTMLフレームの読込、環境の組み込み変数）だけを最小限まねれば、DOMもfetchも画像・音声アセットも要らずにシナリオ解釈を通せる
  - 止まるたびに直して4回進めた。見つかった穴は以下の4つ、いずれも**推測では出てこなかったもの**：
  - **1. `save:`名前空間が通らない**。bluesnovelは本家の`save:`を`game:`という名前にしていたが、**本家シナリオはどれも`save:`と書く**。`VarStore`だけでなく`ExprEval`にも効いていて、後者では「`save:`の`:`」を三項演算子と誤認して`三項演算子の文法エラーです`になっていた。両方で`save:`を`game:`の別名として受けるようにした（同じ入れ物を指す。片方だけ直すと変数を見失う）
  - **2. 環境の組み込み変数が無い**（`const.sn.config.window.width`・`navigator.language`・`screenResolutionX/Y`・`isApp`/`isDebugger`/`needClick2Play`等）。エンジンは`prj.json`もブラウザも知らないので、`ScriptMng#defEnvBuiltins()`から登録する形にした（エンジンに`defBuiltin()`の口を開けた。本家 `SysBase.init()` の`val.defTmp(…)`群に対応）
  - **3. `mp:const.sn.me_call_scriptFn`が無い**（マクロを呼んだ側のスクリプト名）。マクロ本体は定義元ファイルの中にあるので、そのままではラベルの探索先が定義元になる。本家サンプルの`[for_call]`が`fn=%fn|&mp:const.sn.me_call_scriptFn`と書いてまさにこれを使っており、**無いと「ラベルが見つかりません」で止まる**。マクロ呼び出し時に`const.sn.macro`とあわせて`mp:`へ入れるようにした（本家 `ScriptIterator.ts:1384`）
  - **4. `[let]`にtextもvalも無いときのエラーが不親切**だった。「`&式`の評価がundefinedになって属性ごと落ちた」場合もここに来るのに、空文字を式として評価して`(ExprEval)文法エラー【】`になっていた。原因の分かる文言にした
  - `test/uc_goal.test.ts`（新規2件）で**目標そのものを回帰テストにした**。`[s]`に到達すること、経路上で実際に起きたこと（ファイル横断39回・フレーム1つ・`[trans]`1回・ボタン4つ）、タイトルのボタン4つが本家どおりの座標（`left=250/350/550/650 top=360 width=90 height=30`）と`call`指定で積まれることを見る。`../tmp_esm_uc`が無い環境では丸ごとスキップ
  - ユニット904件→906件、E2Eは変更なし77件
  - **これはシナリオ解釈が通ることの確認**であって、ブラウザで絵と音が出るところまでは別途（`todo.md`冒頭に整理した）


## v0.2.1
- 一部最新 SKYNovel コードを導入
## v0.2.0
- いったん SKYNovel をほとんど含まないシンプルな状態へ戻す。（スクリプト末尾エラーは出てる）
## v0.1.1
- electron-store は v8.2.0 止まりで。v9.0.0・v10.0.0 で「window.」が含まれており、アプリ版でエラーになる。
	- v1.53.13 の頃にも
## v0.1.0
- Initial commit
