#TODO 優先順位順

> **タグ／変数の実装状況は `docs/tag.html`（タグ一覧）と `docs/dev.html`（save:/sys:/tmp:変数）に集約**。
> 名称先頭のマークで表す：🟢実装済／🟡実装中・機能未達／🔴未済。本家からの変更点・メモは各タグの詳細部に。
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

## タグ・変数の残り

- [ ] **音声・動画**（一括で未着手）：`[playbgm]` `[stopbgm]` `[fadebgm]` `[fadeoutbgm]` `[playse]` `[stopse]` `[fadese]` `[fadeoutse]` `[volume]` `[xchgbuf]` `[ws]` `[wb]` `[wf]` `[wl]`、`[wv]`（動画待ち）。`ext_voice.sn`の`voice`系マクロも同じ
  - [ ] 音声が入ると繋がるもの：`[button]`/`[link]`の効果音（`enterse`/`clickse`等）・`[load]`の音声復元（本家`playLoopFromSaveObj()`）・組み込み変数`const.sn.sound.*`・sys:の音量設定
- [ ] **`[quake]`の残り**：`layer=`（揺らす対象レイヤの限定。今は常に画面全体）。`delay`/`repeat`/`ease`/`yoyo`は本家でも揺れ幅がランダムで効かないため見送り
- [ ] **文字出現・消去演出** `[ch_in_style]`/`[ch_out_style]`（＋各タグの`ch_in_style`/`ch_out_style`属性）。`[autowc]`（自動ウェイト）も同じ枠
- [ ] **履歴（ログ）** `[log]`・`const.sn.log.json`・`save:sn.doRecLog`。テンプレの`frames/_log.sn`が使う
- [ ] **`[page]`の残り**：`to=`（指定ページへ移動）・`style=`・`key=`。bluesnovelの読み戻りはPageUp/PageDown＋`Caretaker`で本家と別の作りなので、対応させるなら設計から
- [ ] **`[trans]`の残り**：`delay=`・`ease=`（進度は常に等速）。`glsl=`（自前シェーダ）はWebGLを使わないため実現しようがないので対象外
- [ ] **トゥイーンの残り**：`width`/`height`（レイヤ属性側に無い）・`render=`（pixi前提なので保留）・`filter=`・`backlay=`
- [ ] **フィルターの残り**：本家22種のうちCSSの`filter`で素で書ける9種だけ対応済み。残りは`noise`以外すべてpixiの`ColorMatrixFilter`のプリセットなので、**SVGの`feColorMatrix`へpixiと同じ5x4行列を流し込めば同じ絵が出せる**（`color_matrix`・`browni`・`color_tone`・`kodachrome`・`lsd`・`night`・`polaroid`・`predator`・`technicolor`・`tint`・`to_bgr`・`vintage`）。行列はpixiのソースから拾う必要があり、SVGフィルタ要素をDOMへ挿す仕組みも要る
  - [ ] `noise`はCSSにもSVGの単純な組合せにも無いので、対応するならcanvas等で別途
  - [ ] `[add_filter blendmode=…]`・`[lay blur_x=/blur_y=]`（CSSの`blur()`は半径1つしか持てない）
- [ ] **文字組みの残り**
  - [ ] `max_row`（最大行数を超えたら自動改ページ）・`r_size`（ルビサイズ）・`break_fixed`系。**行分割そのものはブラウザ任せ**にした帰結で、禁則文字の指定（`kinsoku_sol`/`kinsoku_eol`/`kinsoku_dns`/`kinsoku_bura`）も渡す手段が無い。ギャラリーの`line_breaking_rules`と実機で見比べ、必要なら本家`Hyphenation.ts`のような自前計算へ寄せる
  - [ ] `bura`はChromeが`hanging-punctuation`未対応なので実質Safariのみ効く
  - [ ] ルビの位置指定（`《center｜るび》`等の`r_align`。今は指定を落としてルビ文字だけ出す）と`[lay sesame=…]`（傍点文字の変更）
  - [ ] ルビ付き行の行間が広がる（CSSの`<ruby>`任せ）。`ruby-position`等の詰めは縦書き・`max_row`と合わせて
  - [ ] 縦書き時の行数・余白が本家と完全一致ではない（`padding`の解釈差）
  - [ ] `[span]`/`[ch]`/`[link]`/`[tcy]`/`[graph]`共通の残り属性：`layer`/`page`（今は既定文字レイヤの表ページ固定）・`wait`（一時的な文字表示速度）・`ch_in_style`/`ch_out_style`、`[ch record=false]`
  - [ ] `[link]`の残り：`global`・`onenter`/`onleave`・`style_clicked`/`r_style_hover`/`r_style_clicked`
- [ ] **アニメpng（スプライトシート）の残り**
  - [ ] 文字レイヤの枠画像（`[lay b_pic=…]`）でのシート再生。今はCSSの背景画像に直接URLを入れているので、.jsonが来ると絵が出ない
  - [ ] コマ数が格子に満たないシート（余りの位置で一瞬空白になる）
  - [ ] `[graph]`の`width`/`height`（今は全角空白の枠に`background-size: contain`で収める）・`x`/`y`・`id`
  - [ ] `[l]`/`[p]`の待ちマークの位置指定（`x`/`y`/`width`/`height`/`visible`）。今は本文の直後に流し込む位置に出る
- [ ] `[er]`が本家どおりに戻していない属性：alpha・blendmode・pivot・angle・scale（本家`Layer.ts clearLay()`。`[er]`→`TxtLayer.clearLay()`→`super.clearLay()`の経路）。本文とボタンの消去は対応済み
- [ ] **`[button]`の残り**：`pic=`（画像ボタン）・`b_pic=`（背景画像）はアセット整備と一緒に。既定の見た目（色・余白）も仮のまま
  - [ ] 本家は`width`/`height`で文字そのものを引き伸ばす（pixiの`Text.width/height`）。こちらは箱の大きさとして扱い`height`をフォントサイズの基準にしている。実機で見た目を要確認
  - [ ] `hint_opt`は本家popperのオプションJSONだが`placement`しか見ていない（依存を増やさず自前で位置決めしているため）
- [ ] **`[lay b_pic=…]`の残り**：枠画像に合わせた文字表示領域の自動サイズ調整（本家`setMySize()`）・`b_left`/`b_top`・`back_clear`。テンプレは`style=`でwidth/heightを明示するので実害は出ていない
- [ ] **しおり・システム系の残り**
  - [ ] `[load]`の`index=`（ページ移動用）・`do_rec=`。**読み戻し履歴は捨てている**（ロード後の位置は履歴と繋がらないため）。ページログ（`[page to=…]`）を作るときに設計し直す
  - [ ] `[save pic=…]`のサムネイル保存（`userdata:/`へのファイル保存が要る。テンプレの`_archive.sn`が枠に出す想定）。まず`[snapshot]`の結果をどこへ置くかから
  - [ ] セーブデータの**暗号化**（本家`sys.arg.crypto`／`enc()`/`dec()`）。`[export]`/`[import]`も含む。アセット暗号化と一緒に
  - [ ] `[snapshot]`の残り：**HTMLフレームの中身が写らない**（`<img>`化したSVGはiframeを描画しないというブラウザ側の制約。本家web版も同じ結果）・`smoothing=`・拡張子によるフォーマット指定（常にpng）・`userdata:/`保存・`b_color`の透過2桁
  - [ ] `[window]`（アプリウインドウ設定）・`[close]`（アプリ終了）・`[update_check]`はElectron専用。`dist_app`側の整備と一緒に
  - [ ] `[dump_script]`（本家はVSCode拡張との連携）・`[rec_ch]`/`[rec_r]`/`[reset_rec]`（履歴層と一緒に）
- [ ] **組み込み変数の残り**
  - [ ] `const.sn.lay[N].<fore|back>.width/.height`は実寸ではなく「表示物の有無」を1/0で代用中。実寸が要る用途が出たら描画側から集める設計に
  - [ ] `const.sn.isPaging`（ページ遷移状態か）・`save:const.sn.layer.（文字レイヤ名）.enabled`
  - [ ] **sys:変数は読み書きも保存もできるが、その値を使う機能が無いものが多い**（`sn.tagCh.*`＝文字表示ウェイト、`TextLayer.Back.Alpha`は接続済み、`sn.sound.*`＝音声、`const.sn.nativeWindow.*`、`const.sn.aPageLog`）。docs/dev.htmlで🟡。各層の実装時に繋ぐ
- [ ] **`[set_focus]`の残り**：ゲームパッド対応（本家`FocusMng`の`range`のstepUp/Down、テキストのカーソル移動、ラジオボタンの選択移動）。ゲームパッド入力そのものが未着手なので同時に

## 挙動の詰め・実機確認

- [ ] オート読み・既読スキップの残課題
  - [ ] スキップモード`'p'`（改ページで止まる）は`#calcResume()`まで実装したが、`Main.tsx`が手動操作のたびに`cancelAuto()`を呼ぶため、ユーザーがその改ページをクリックで越えるとスキップも解除される（本家は継続）。「モード'p'の改ページ停止」を手動停止と区別する必要がある。既定`'s'`は正しく動く
  - [ ] 文字送りウェイト設定（`sys:sn.tagCh.*`）は、bluesnovelの文字送りがGSAP（duration/stagger）で秒単位のため未接続
  - [ ] オート読みの待ち時間カウントは停止点の時点から開始（本家は文字送り演出の完了後）。演出が待ち時間より長いと途中で進む
- [ ] 文字送り演出のパラメータ（`duration: 0.25`, `stagger: 0.035`）は仮値。実機（`tmp_blues`）で調整
- [ ] 読み戻り（PageUp/PageDown）から戻った際、既読部分が瞬時表示されない（実機確認）
- [ ] 全画面時の見た目（中央寄せは実装済み）を実機で確認
- [ ] フレーム内幅が本家960に対しこちら1024なので bootstrap の`row-cols`が1列多くなる（不具合ではない）。合わせるならステージ実寸とフレーム幅の関係を再検討
- [ ] グループ位置指定/移動（face合成した画像群を1つの単位として、デザインモードで位置調整・移動する仕様の検討）
  - [ ] デザインモードでのMoveableリサイズ時、差分画像（face）は`dx`/`dy`が絶対px指定のため拡大縮小に追随しない（`GrpLayer.tsx`）
  - [ ] 本家のように「`face`のみ指定して直前の`fn`を維持する」独立更新には未対応

## アセット・基盤

- [ ] 暗号化アセット（`sys.arg.crypto`／`sys.dec()`）。本家は`Loader`で復号してBlob URLへ差し替える。`[add_frame]`のHTMLとフレーム内画像も同じ仕組み
- [ ] 画像の**先読み**（本家`SpritesMng`）は未対応。`<img>`のsrcを差し替えるだけなので切替時に一瞬空白になりうる。実機で要確認
- [ ] `tmp_esm_uc/doc/prj/`の実アセットで通す（`prj.json`/`path.json`はそのまま使えるはず）
- [ ] npmリリース処理を`skynovel_esm`に合わせる。`semantic-release`本体が依存に無く、`.github/workflows`も未整備
- [ ] **`dist/`に`.d.ts`が出ていない**（`package.json`の`types`は`./dist/web.d.ts`を指している）。TypeScript 7の`typescript`パッケージはコンパイラのJS APIを公開しない（`exports`が`version.cjs`と`unstable/*`のみ）ため、`vite-plugin-dts`→`unplugin-dts`→`@volar/typescript`が動けないのが原因と思われる。npmリリースまでに要解決
- [ ] **ESLintは塩漬け中**。`typescript-eslint`（8.65.0時点で最新）がTS 7非対応と明示的にthrowする（[issue #10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940)）ため、`eslint.config.mts`を置いてもVSCode拡張は動かない。パーサが無いと`.ts`を解析できないので回避策も無し。TS 7.1対応が出たら復活する。`@typescript/typescript6`は`import ts6 from '@typescript/typescript6'`と明示的に書けるツールにしか効かず、`require('typescript')`決め打ちのtypescript-eslintには届かない（bunの`resolutions`によるネスト解決も無視される）

## 本家へ確認したいこと

- [ ] `[jump count=false]`が消すのは「`[jump]`タグの次のトークン位置」で、そこは通常そのまま読み進める先ではないため実質効かない（本家の実装をそのまま移植した状態）
- [ ] `[call]`の`clear_local_event`属性（本家でも`popLocalEvts()`の直後に`clear_event({})`を呼ぶ形で実質no-opに見える）
