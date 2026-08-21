#TODO 優先順位順

> **済んだことは `CHANGELOG.md`**（作業ごとの経緯・判断つき）。
> このtodo.mdは**これからやること**だけを持つ（＝いずれ空になるのが正しい）。

## 進め方

対象は本家サンプル `tmp_esm_uc/doc/prj/` と、実テンプレ `tmp_blues/doc/prj/` の実行経路。
タグリファレンス：<https://famibee.github.io/skynovel_esm/tag.html>（ローカル実体は
`skynovel_esm/docs/tag.html`。全タグ一覧は `skynovel_esm/src/sn/Grammar.ts` の `T_HTag`）。
シナリオ中の `fg`/`img`/`sys_menu`/`txt_lay_*`/`ask_ync` 等は**プロジェクト側マクロ**なので、
実装が要るのはその中身のタグのみ。`[notice]` はプロジェクト側プラグインなので対象外。
表示アーキテクチャがpixi.js→Reactに変わるため、タグの変更・追加・削除・保留は随時判断する。
ギャラリー（<https://github.com/famibee/SKYNovel_gallery>）の `public/prj/<機能>/` が機能ごとの仕様。

## sn_gallery をbluesnovel駆動にする

`../sn_gallery`を本家（skynovel_esm）ではなくbluesnovelで動かし、本家ギャラリー
<https://famibee.github.io/SKYNovel_gallery/>（動作の正解）と突き合わせて未実装のタグ・機能を
洗い出す。runSN/stop（プロジェクト切替・停止。`data-prj`クリック導線含む）は2026-08-21に
SysBase/SysWeb/ScriptMng/storeへ実装・動作確認済み（`bluesnovel/src/sn/SysBase.ts`の`run()`/
`stop()`、`web.ts`の`SysWeb.runSN()`、`ScriptMng.destroy()`、`store/store.tsx`の`resetStore()`）。
残りは以下：

- [ ] `sn_gallery/public/prj/<機能>/`を本家ギャラリーの同名プロジェクトと1つずつ突き合わせ、
      bluesnovel未対応のタグ・機能を洗い出すフェーズへ。2026-08-21、`top`（一目で複数機能が
      確認できるトップページ）から着手し、playwright-cliでの実機確認により以下のバグを
      発見・修正済み（コアタグ系→プラグイン系の優先順で継続中。次は`ruby`の残り
      （[tcy]横書き時の描画幅が本家よりやや広い・right/121/even/1ruby未比較）または`filter`等）：
  - [x] `ch_button`（文字ボタン・リンク）で2件発見・修正。
        1つ目：`[button]`が`label`・`fn`両方省略時に一律`throw`していたが、本家
        `LayerMng.ts:1101`は`hArg.fn ??= this.scrItr.scriptFn`でfnを常にカレントスクリプトへ
        既定化するため実質不要な制約で、`[button pic=... enabled=false]`（クリック先を持たない
        画像表示専用ボタン、main.sn:31の「非ボタン、画像表示するだけの使い方」）が読み込み時点で
        例外落ちしていた。`ScriptEngine.ts`の`case 'button'`で`fn`を`args.fn ?? this.fn`へ変更し
        throwを削除（`test/ScriptEngine.test.ts`・`test/ScriptEngine_btn.test.ts`の関連テストも
        「fnは常にaddBtnアクションへ載る」前提に更新）。
        2つ目：`[prj.json init.bg_color]`（ステージ全体の背景色。本家`LayerMng.ts:172-178`が
        `#fore`/`#back`両方に敷くステージ大の塗り）が実質未実装だった。`SysBase.ts`の
        `document.body.style.backgroundColor = String(cfg.oCfg.init.bg_color)`は、bg_colorが
        prj.json由来の生の数値（例：4231232）のとき`String(4231232)`="4231232"という無効な
        CSS値になり、代入がブラウザに黙って無視されるため常時デフォルトの黒のままだった。加えて
        `Stage.tsx`の`styStage`/`styPage`はステージ・ページ背景を`black`に直書きしており、
        bg_colorを反映する経路がそもそも無かった（コメントで「素通しの黒」と明記されていたが
        本来は設定色であるべきだった）。`CmnLib.ts`に`cssColorOf()`（数値のときだけ`#RRGGBB`へ
        変換、文字列はCSSがそのまま解釈できるので素通し）と`CmnLib.bgColor`を追加、
        `Config.ts`の`load()`で`super.load()`後（＝`this.oCfg.init`が既定値とマージ済みの後）に
        設定するようにし、`SysBase.ts`・`Stage.tsx`（styStage/styPage）はそれぞれ
        `CmnLib.bgColor`を参照するよう修正。ch_buttonのmat/main.snは背景画像を一切使わず
        `bg_color`だけに頼る作りだったため、本家実機（緑一色のステージ）とbluesnovel（常に黒）の
        差が一目瞭然だった。修正後、playwright-cliで本家実機と同じ緑（`#409040`）がステージ全体
        （文字レイヤの箱より外側も含む）に敷かれることを確認済み。Q1（[button]4種＋[link]2種＋
        既読スキップ・画像ボタン2種）→Q2（[link]2種、`にっぽんばし`の`style=`背景ハイライトも
        含む）→終端まで一通りクリックで通し、誤答・正解いずれの分岐も本家と同じ文言・遷移に
        なることを確認済み。`bun test`（1684件）・`tsc --noEmit`とも回帰無し
  - [x] `[link]`のホバー（`style_hover`・`hint`ツールチップ）自体は本家ギャラリー実機と
        playwright-cliで比較し正しく動作することを確認済み。ただし確認の過程で、`top`の
        本文（`[add_lay layer=mes class=txt]`のみで`[lay style=…]`を一度も受けていない
        fore面）が横に暴走してステージ外（実測x=-1556px）へはみ出し、[link]自体が
        画面外になっていて最初は検証不能だった。原因は本家`TxtLayer.ts:272`
        （文字レイヤ生成時に`width/height=stageW/stageH, font-size:24px`等を必ず一度
        セットするコンストラクタ既定）に対応する初期化がbluesnovelに無く、
        `TxtLayer.tsx`のCSS既定（`font-size: xxx-large`≒48px、自身のコメントでも
        「試作の目印であってテンプレが期待する見た目ではない」と自認）へフォールバック
        していたため。`width: 70%`は`test/argdef_parity.test.ts`の`A_CSS_DEF`で
        本家と意図的に違えた既定と明記されているため触らず、**未整理だった
        `font-size`のみ**を本家の24pxへ修正（`src/components/TxtLayer.tsx`の`styTxt`、
        `xxx-large→24px`。デザインモード入力欄側の`xxx-large`は別用途のため維持）。
        修正後、playwright-cliで本家ギャラリー実機と同一箇所（`top`の「文字リンク」）へ
        マウスを合わせ、赤い破線アウトラインとツールチップ「目を輝かせる」が同一表示に
        なることを確認済み。`bun test`（1684件）・`tsc --noEmit`とも回帰無し
  - [x] `[event key='dom=セレクタ']`（コロン無し＝メイン文書対象）が誤動作。`FrameMng.ts`の
        `elms()`がコロンの有無を見ずセレクタ全体を「フレームid」として`#hIfrm`を引いていたため、
        `need_err=false`指定でも例外が飛んでいた。本家`Reading.ts:79`の`getHtmlElmList()`は
        コロン無しなら`document.querySelectorAll()`でメイン文書を対象にする仕様。修正済み
        （`src/ts/FrameMng.ts`）
  - [x] `sn_gallery/index.html`のマウント先が`<canvas id="skynovel">`のままだった。bluesnovelは
        React DOM描画に移行済みだが、受け皿がpixi.js時代の`<canvas>`タグ（子要素はブラウザ仕様上
        フォールバック扱いで描画されない）だったため、DOM構造は正しいのに画面が真っ黒になって
        いた。`<div id="skynovel">`に修正（`sn_gallery/index.html`、フルスクリーン用CSS
        セレクタも合わせて修正）
  - [x] `[button]`の`arg`属性がクリック時に`&sn.eventArg`へ渡らず`undefined`になっていた。
        `[event]`/`[link]`は対応済みだったが`[button]`だけ2箇所で欠落：`ScriptEngine.ts`の
        アクション生成（`T_ENGINE_ACTION`の`addBtn`型と生成コード）と、`ScriptMng.ts`
        `#applyAction()`のaddBtnケース（storeへ渡す直前）。本家実機は`push button !`、修正前の
        bluesnovelは`undefined !`になることをplaywright-cliで確認して特定した。修正済み
        （`src/ts/ScriptEngine.ts`・`src/ts/ScriptMng.ts`・`src/store/store.tsx`・
        `src/components/TxtLayer.tsx`・`src/components/BtnLayer.tsx`）。`global`属性は
        `[link]`と同様「本家でも効果を持たない扱い」の可能性が高いが未検証のため対象外のまま
  - [x] `main.sn`の`[event key=wheel.y<0]`・`[event key=gamepadconnected]`はbluesnovelで
        反応しないが、本家ギャラリー実機（playwright-cliでホイールダウン送出）でも反応しない
        ことを確認済み。コード上も本家`EventMng.ts`は`downwheel`/`upwheel`という別名で発火して
        おり`wheel.y<0`という名前のイベントは存在しない（`wheel.y>0`は`waitRsvEvent()`内部の
        読み進め待ち専用キーで別物）。`gamepadconnected`も本家`GamepadMng.ts`はポーリング方式
        （コメントに「移植元 bluesnovel」とあり、むしろこちらが本家へ逆輸入された側）で該当
        イベント名の発火が無い。**どちらも本家自体で死んでいる記法のため、bluesnovel側の対応
        不要**と判断
  - [x] **ステージ拡大ロジックに本家の「ギャラリー埋め込み」分岐（`isGallery`）が丸ごと未実装**
        だった（レイヤ配置崩れの主因）。本家`SysBase.cvsResize()`
        （`skynovel_esm/src/sn/SysBase.ts:231`）は`isGallery = cvs.parentElement !== document.body`
        を判定し、埋め込み時（sn_galleryのような左メニュー付きレイアウト）は幅方向だけを
        制約として拡縮する（`mh-100`＝max-height:100%は、親要素の高さがCSS上`height: auto`＝
        不定のため実質無効。効いているのは`mw-100`による幅の制約と、canvas固有のintrinsic
        aspect ratioで高さが幅に追随する仕組みだけ）。2026-08-21、`src/components/Stage.tsx`の
        `calcScale()`/`innWH()`に`isGallery`分岐を実装（`heStage.parentElement !== document.body`
        で判定し、幅は`heStage.parentElement.clientWidth`、高さはステージのアスペクト比から
        導出）。**親要素の高さ（`clientHeight`）を基準にする実装を最初に試したところ、
        `.container-fluid.p-0`が`#skynovel`自身にしか子を持たず`height: auto`のため、
        前回セットした高さがそのまま読み返されて値がドリフトする不具合になった**（実測で
        430px→673pxへ増加）ため、高さは使わず幅のみを基準にする方式へ変更。playwright-cliで
        本家ギャラリー実機（`famibee.github.io/SKYNovel_gallery`）と同一ビューポート(1010×800)
        比較し、幅792pxを基準にbluesnovel側が792×528（アスペクト比750:500と一致）で安定
        （リロード3回・幅リサイズ3回とも比率維持を確認）することを確認済み。非ギャラリー時
        （`tmp_blues`）はwindow基準のまま回帰無しも確認
  - [x] `[lay]`のstyle属性が特定のシーン遷移後に丸ごと消え、コンポーネント既定CSSへ
        フォールバックする不具合。原因は`store.tsx`の`chgLay()`が`style`属性を**文字列まるごと
        Object.assignで置き換えていた**こと。本家`TxtStage.ts:194`の`lay()`は一時`<span>`へ
        `cssText`を流し込みCSSOMでプロパティを取り出し、既存の`CSSStyleDeclaration`へ**プロパティ
        単位で**上書きする（cssText全体を消すのは空文字指定時＝elseの1行のみ）。つまり
        `[lay style='text-shadow:...']`のような一部プロパティだけの指定は、本家では既存の
        `width`/`height`/`writing-mode`等を残したまま`text-shadow`だけ上書きする「差分マージ」で、
        bluesnovelの「全置換」とは意味が違っていた。`sn_gallery`の`top`（`main.sn:67-68`で
        `layer=mes`にwidth/height/writing-mode込みのstyleを設定→`[trans]`で表裏へ複製→
        `main.sn:27`の`b_alpha=0`だけ変える意図の`[lay style='text-shadow:...']`が、本来残すべき
        width/height/writing-modeを巻き添えで消していた）で再現・修正・実機確認済み。
        `store.tsx`はzustandの`create()`がDOM非依存という設計（`store_lay.test.ts`参照）のため、
        DOM APIではなく`mergeCssText()`という文字列パースの自前実装でプロパティ単位マージを行う
        （`chgLay()`内、`e.cls === 'txt' && sty.style !== undefined`のときだけ適用。空文字指定は
        本家同様の全消去として扱う）。playwright-cliで本家ギャラリー実機と`sn_gallery`（bluesnovel
        駆動）を同じシナリオ位置（`[trans]`後の「各種イベント検知」セクション）まで進めて比較し、
        どちらも`writing-mode: vertical-rl`・`width: 718px`・`height: 480px`を保持したまま
        `text-shadow`だけ新しい値になっていることを確認済み
  - [x] `ruby`で発見：**ステージ拡大ロジック（isGallery分岐）が広い画面で本家より過剰に
        拡大していた**（`[lay]`style差分マージ修正時に実装した分岐そのもののバグ）。本家
        `SysBase.ts:cvsResize()`は289行目`if (! isGallery) {ps.width=...; ps.height=...;}`
        でJSによるcanvasサイズ設定をisGallery時は素通りし、canvasは`mw-100`
        （max-width:100%）とHTML width/height属性＝intrinsicサイズ（`prj.json`の`window`、
        rubyなら750×500）だけで表示サイズが決まる。max-width:100%は「はみ出る時だけ縮小、
        拡大はしない」CSSの通常挙動なので、親要素がどれだけ広くてもintrinsicサイズを超えない。
        しかし`Stage.tsx`の`calcScale()`は`cvsWidth = w`（親要素の`clientWidth`）を常に
        採用しており、親要素が広い時も無条件にそこまで拡大してしまっていた。狭いビューポート
        （親要素686px<750px）ではたまたま両者一致するため、8/21先述の792×528確認時
        （親要素792px辺りで偶然近い値）は見抜けなかった。1280px幅の広いビューポートで
        本家が750×500のまま変わらないのに対しbluesnovel側は1053×702まで拡大され、
        文字も過大表示（一見ステージ全体が緑色に見えるほど）になっていたのをplaywright-cliで
        発見。`cvsWidth = Math.min(w, CmnLib.stageW)`（狭い時だけ縮小、広い時はintrinsic
        サイズのまま）に修正（`src/components/Stage.tsx`の`calcScale()`）。狭い/広い両方の
        ビューポートで本家と実測一致することを確認済み。`bun test`（1684件）・`tsc --noEmit`
        とも回帰無し
- [ ] 依存の付け替え（`sn_gallery/package.json`の`"@famibee/skynovel_esm": "file:../bluesnovel"`
      という**本家のフリ**をどうするか）は本格移行時に改めて判断（2026-08-21時点は現状維持と決定）


## タグ・変数の残り

- [ ] **フィルターの残り**：本家22種のうち`noise`以外の21種に対応済み（`src/ts/Filter.ts`）。サンプル <https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/filter>
  - [ ] `predator`/`color_tone`は実機比較でやや色味に差が出た（優先度低）。2026-08-12に行列自体を
        再確認：`src/ts/Filter.ts`の数値は`@pixi/filter-color-matrix`の`predator()`/`colorTone()`と
        完全一致し、本家`Layer.ts`側の呼び出しも両方とも`multiply`既定`false`（＝オフセット列の
        `/255`変換は本家側もしていない）で揃っている。`Stage.tsx`の`colorInterpolationFilters="sRGB"`
        も設定済みで既定`linearRGB`への取り違えでもなく、素材画像のICCプロファイルも埋め込み無し／
        標準sRGBのみで色管理差という線も弱い。矛盾しない残りの可能性はpixiのGLSLシェーダが行う
        アルファのun-premultiply/premultiply（`c.a>0`時`c.rgb/=c.a`→行列適用→`rgb*=result.a`）と
        SVG `feColorMatrix`側のアルファ処理の違い、またはWebGLとSVGのラスタライズパイプライン差だが、
        これは実機でのピクセル値比較でしか切り分けられないため優先度低のまま保留
- [ ] `break_fixed`系。禁則文字の指定（`kinsoku_sol`/`kinsoku_eol`/`kinsoku_dns`/`kinsoku_bura`）は本家`Hyphenation.ts`を移植して対応済み（`src/ts/Hyphenation.ts`）。`break_fixed`系は`[l]`/`[p]`待ちマーカーの位置決め用だが、bluesnovelは待ちマーカーをReactの兄弟spanで別管理しているため用途が無く対象外。`r_size`（ルビサイズ）は本家にもない属性で、`r_style="font-size:…"`で代替できるため専用属性は追加しない
- [ ] `[add_filter]`の`quality`/`kernel_size`/`resolution`/`repeat_edge_pixels`（`blur`のpixi専用パラメータ）未対応。2026-08-20、`docs/tag.html`整理時に`noise`の陰に隠れていたのを発見（`noise`のみ上記フィルターの残りに記載済みだった）
- [ ] `[ch]`/`[span]`の`ch_in_style`/`ch_out_style`未対応（定義自体は`[ch_in_style]`/`[ch_out_style]`で受け付けるが、`[ch]`/`[span]`側の属性としては未接続）。`[span]`は`wait`/`r_align`も未対応。`[graph]`は`wait`（`id`属性はGrammar.tsにも本家にも見当たらず出自不明、対象外とする）、`[tcy]`は`wait`が未対応。いずれも2026-08-20、`docs/tag.html`整理時に理由未記載のまま放置されていたのを発見。実装要否・理由の調査はこれから
- [ ] `[tsy]`の`render`未対応（[trans]のように絵を合成してから不透明度を適用する機能。pixi前提の合成方式のため）。2026-08-20、`docs/tag.html`整理時に発見

## アセット・基盤

## 優先度低

- [ ] フィルターの`noise`はCSSにもSVGの単純な組合せにも無いので、対応するならcanvas等で別途。<https://ics.media/entry/241122/> が参考になるかも
- [ ] 【現状不使用・優先順位低】アニメpng（スプライトシート）：文字レイヤの枠画像（`[lay b_pic=…]`）でのシート再生。今はCSSの背景画像に直接URLを入れているので、.jsonが来ると絵が出ない
- [ ] フレーム内幅が本家960に対しこちら1024なので bootstrap の`row-cols`が1列多くなる（不具合ではない）。合わせるならステージ実寸とフレーム幅の関係を再検討

## 要検証（出自不確か・追跡工数を投じない）

**縦書きグリフ描画不具合**：2026-08-17、上記の改行位置ズレ調査中に**Claude自身が実機比較の
スクリーンショット目視で発見・自己判定**した現象（禁則で次列へ送られた対の2文字目のグリフが
描画されない）。**ユーザーによる観測報告は一度もない**（本人へ確認したところ「今初めて聞いた」
とのこと）。根拠は目視1回のみで、以後の追試（手動3回・フォント読み込み遅延注入17回・実アプリ
自動周回80回、累計100試行超）は**すべて非再現**。観測アーティファクト（Claudeの誤認）である
可能性を排除できていないため、**ユーザーまたは第三者が実機で再現を確認するまで追跡工数を
投じない**。詳細はCHANGELOG.md 2026-08-17の該当エントリ群を参照。

対策として行ったGSAP→Web Animations API置換（コミット`3b7eeb2`）は**取り消さない**：動機は
誤っていたが、副次的に実バグ2件（`sty4Moveable`の恒等transform常時適用、ルビ`marginBlockStart`の
`getBoundingClientRect`誤用）を修正済みで、E2E・単体テストとも回帰なしを実機確認済みのため

`test/e2e/app/prj_vertglyph/`のフィクスチャ（`ipamjm.ttf`は46MBのため**未コミット・
`.gitignore`対象**、`tmp_blues/doc/prj/script/ipamjm.ttf`からローカルコピーすれば動く）は
再開時に再利用可能

## 保留

- [ ] `[dump_script]`（本家はVSCode拡張との連携）：sn_extension（VSCode拡張）は公開停止中で、
      再申請できるのは8月下旬（8/25頃）。それまで拡張機能側に手を入れられないため、連携先が
      無い状態での実装は着手しない
- [ ] `[link]`の残り：`onenter`/`onleave`（本家はラベルをコールし`[return]`で戻る仕様。素朴に`[button call=true]`と同じ経路（`callToLabel`→通常のstep実行継続）を流用すると、マウスが乗っただけで本編が読み進んでしまうバグになる——`[return]`後にそのまま次のトークンへ進む設計のため。正しく作るには「サブルーチンを`[return]`まで走らせたらそこで止め、読み進めには使わない」専用の実行経路をエンジンに新設する必要があり、`[button]`と共通の中規模な追加実装になる。`global`は対応済み（受理はするが効果を持たない扱いで決着。理由はdocs/tag.htmlの`[link]`欄）
- [ ] **デザインモードは無効化中**（`Stage.tsx`の`ENA_DESIGN_MODE = false`）。長押しで入れてしまうが、中で触れるのはレイヤの位置・サイズだけで、触った結果をシナリオへ書き戻す先が無い。本家機能の大部分（音声・履歴・文字演出）が揃い、「調整→保存」の行き先を決めてから戻す
  - [ ] グループ位置指定/移動（face合成した画像群を1つの単位として、デザインモードで位置調整・移動する仕様の検討）。再設計時、Moveableリサイズで差分画像（face）の`dx`/`dy`が絶対px指定のため拡大縮小に追随しない問題（`GrpLayer.tsx`）も併せて直す（書き戻し先が無いため今は保留。2026-08-10調査）
- [ ] **ESLintは塩漬け中**。`typescript-eslint`（8.65.0時点で最新）がTS 7非対応と明示的にthrowする（[issue #10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940)）ため、`eslint.config.mts`を置いてもVSCode拡張は動かない。パーサが無いと`.ts`を解析できないので回避策も無し。TS 7.1対応が出たら復活する。`@typescript/typescript6`は`import ts6 from '@typescript/typescript6'`と明示的に書けるツールにしか効かず、`require('typescript')`決め打ちのtypescript-eslintには届かない（bunの`resolutions`によるネスト解決も無視される）
  - [ ] 復活したら`eslint-plugin-import`（2.32.0のまま更新停止、ESLint 10対応PRが未マージ）を`eslint-plugin-import-x`へ切替。peerDependencyがESLint 10を公式サポート済みで移行も軽微（このリポジトリの`import/no-unresolved: 'off'`1行だけ`import-x/`にプレフィックスを変える程度）。本家`skynovel_esm`もeslint関連が全く同じバージョン構成・同じ1行なので同時に対応可能

## 凍結

- [ ] `max_row`（最大行数を超えたら自動改ページ）：本家`skynovel_esm`でも`Grammar.ts`に
      `max_row?: string`の型定義があるだけで、`TxtLayer.ts`/`TxtStage.ts`のどちらでも消費して
      おらず、受理はするが黙って無視される死んだ属性と判明（2026-08-12調査。`docs/tag.html`にも
      記載無し、`test/argdef_parity.test.ts`にも既定値の記載無し）。`sys:sn.tagCh.canskip`と
      同じ構図で、本家自体が未接続のため bluesnovel 側で先行実装するのは移植の範囲を超えるとして
      見送り
- [ ] `[ch_out_style]`の適用（定義と`[lay out_style=]`・`[span ch_out_style=]`は受け付けるが、消去のアニメをまだ行なっていない＝本家の既定`wait=0`と同じ結果）。文字が消えるのはページ切替や`[er]`でReactが要素を捨てる場面なので、消えていく間だけ古い文字を生かす仕組みが要る。出現演出（`src/ts/ChStyle.ts`）とは別の作りになる
- [ ] `[trans]`の`delay=`・`ease=`（進度は常に等速）・`glsl=`（自前シェーダ）：現状使用していないため未実装のまま凍結。`glsl=`はWebGLを使わないため実現しようがないので対象外
- [ ] `[quake]`の`delay`/`repeat`/`ease`/`yoyo`は本家でも揺れ幅がランダムで効かないため見送り
- [ ] `sys:sn.tagCh.canskip`（クリック等でのテキストスキップ可否）：本家でも読み書きできる変数として
      定義されているだけで、実際のクリックスキップ処理（`TxtLayer.ts:816-818`の`click()`）はこの値を
      参照せず無条件にスキップする。`msecWait`等の兄弟変数のように起動時キャッシュへ読み込む処理も
      本家に無い（`Variable.ts:126-132`）。本家自体が未接続のため、bluesnovel側で先行接続するのは
      移植の範囲を超えるとして見送り（2026-08-10確認）
- [ ] **ルビ付き行の行間不揃い（縮小して残存）**：2026-08-18、`ss_000.sn:24`本題の修正
      （`margin-block-start`を「実際に列/行の先頭に来た表示単位」だけへ絞る変更）により、
      **行/列の途中にルビがある場合の不揃いは解消したと実機確認済み**（`ss_000.sn:24`の
      「安全｜剃刀《かみそり》」列で列内ピッチが完全に均一、marginTop常に0pxを実測。詳細は
      CHANGELOG.md 2026-08-18参照）。ただし**行/列の先頭にルビが来る場合は、直前との間隔が
      `<rt>`の高さぶん依然として広がる**（`test/e2e/app/prj_ruby`で実測：marginTop 11px、
      他行ピッチ約31.5pxに対し約48px）。これは「`<rt>`が1つ前の行/列に食い込むのを防ぐ」ため
      物理的に必要な余白で、削除すると`ss_000.sn:24`本題のバグへ逆戻りするため解消不可能。
      「ルビがある行だけ」を判別して全体を均等に広げる（`max_row`と同時実装の目算だったが、
      `max_row`は本家でも死んでいる属性と判明済みのため道連れの実装機会も無い）か、先頭に
      来るケース自体を折返し計算で避ける、といった対応が無い限りこれ以上は縮まらないため
      凍結継続（詳細はセッション2026-08-10・2026-08-12・2026-08-18のCHANGELOG.md参照）
