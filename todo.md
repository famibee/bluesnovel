#TODO 優先順位順

> **タグ／変数の実装済・未済の一覧は `docs/tag.html`（タグ一覧）と `docs/dev.html`（save:/sys:/tmp:変数）に集約**。
> 名称先頭のマークで表す：🟢実装済／🟡実装中・機能未達／🔴未済。本家からの変更点・メモは各タグの詳細部に。
> このtodo.mdは**作業計画・段取り**に絞る（個々のタグ状況はdocs側を参照・更新）。

## 本家サンプル（`tmp_esm_uc`）の`main.sn`をたどってタグを実装

対象は `tmp_esm_uc/doc/prj/` の実行経路
`script/main.sn` →`[call]` `theme/setting.sn` / `theme/ext_*.sn` / `script/sub.sn` /
`frames/_yesno.sn` →`[jump]` `theme/title.sn`。**いったん`title.sn`の`[s]`までを目標**とする。
タグリファレンス：<https://famibee.github.io/skynovel_esm/tag.html>（ローカル実体は
`skynovel_esm/docs/tag.html`。全タグ一覧は `skynovel_esm/src/sn/Grammar.ts` の `T_HTag`）。
上記ファイル群で使われるタグのうち、`ext_fg*`の`fg`/`img`、`sub.sn`の`sys_menu`/`txt_lay_*`、
`_yesno.sn`の`ask_ync`等は**プロジェクト側マクロ**なので、実装が要るのはその中身のタグのみ。
`[notice]`はプロジェクト側プラグイン（`tmp_esm_uc/src/plugin/humane`）なのでプラグイン機構ごと対象外。
表示アーキテクチャがpixi.js→Reactに変わるため、タグの変更・追加・削除・保留は随時判断する。

**✅ 目標（`title.sn`の`[s]`まで）はエンジン上で到達済み**（2026-07-24）。
`test/uc_goal.test.ts` が本家サンプルの実シナリオを`main.sn`から`[s]`まで走らせて回帰を防いでいる
（`../tmp_esm_uc`が無い環境ではスキップ）。**ただしこれはシナリオ解釈が通ることの確認**で、
ブラウザで実際に絵と音が出るところまでは別途。残っているのは以下。
- ブラウザで実際に動かす。**実テンプレ`tmp_blues`がブラウザで title の`[s]`まで到達済み**（背景`title.jpg`＋ボタン4つ描画、2026-07-25。`const.sn.lay.*`存在判定＋`[button]`既定back＋空メッセージ窓の非表示で実現）。確認用フィクスチャ`prj_uc`（`?prj=uc`）でも描画可。音声・立ち絵・文字装飾など先の表示は下記各項目
  - タイトルの4ボタンすべて到達済み（2026-07-25）。「アルバム」「ロード」「設定」はそれぞれ`frames/_album.sn`・`_archive.sn`・`_config.sn`の`[s]`まで、**「最初から」は本編`script/ss_000.sn`を通ってタイトルへ戻るまで**（クリック68回。背景・立ち絵の切り替え、和風メッセージ窓、縦書き本文が表示される）。残るのは音声と文字装飾（下記）
    - 同じ経路を**オート読み（`a`）でも既読スキップ（`ctrl+f`）でも完走**（2026-07-25。手動クリックは`ss_000.sn:101`の`[waitclick]`の1回だけ＝本家と同じ仕様）
  - 3画面とも、フレーム内幅が本家960に対しこちら1024なので bootstrap の`row-cols`が1列多くなる（不具合ではない）。合わせるならステージ実寸とフレーム幅の関係を再検討
- 音声（`[bgm]`＝`[playbgm]`。一旦無視の対象）
- `[ch]`・`[span]`・`[link]`（文字装飾系。`sub.sn`の文字組みマクロが使う。下記「文字組み」項目へ）
- `[window]`・`[close]`（Electron専用）
- **組み込み変数`const.sn.lay.*`** … **実装済み**（2026-07-25。存在判定`const.sn.lay.<名前>`＋詳細ツリー`const.sn.lay[N].<fore|back>.visible/.alpha/.left/.top/.width`。`ScriptMng`がストアの表裏からレイヤ木JSONを`defBuiltin`供給、`VarStore`のJSON潜り込みを組み込み変数にも拡張）。`width`/`height`のみストアに実寸が無く「表示物があるか」を1/0で代用（立ち絵`[fg2]`GCの`width>0`判定用）。残る組み込み変数は`const.sn.sound.*`・`const.sn.key.*`など

- [ ] **ページ裏表の残り**（`[lay page=…]`・`[trans]`・`[wt]`・`[button page=…]`・`[er]`の両面消去は実装済み）
  - [ ] `[trans]`の`rule=`（ルール画像によるワイプ）・`glsl=`・`vague=`は未対応（現状は一様なクロスフェードのみ）。ルール画像を読む必要があるのでアセットパイプライン整備と合わせて
- [ ] **`[page]`（読み戻り用のページログ）の残り**（`clear`は実装済み）
  - [ ] `to=`（指定ページへ移動）・`style=`（ページ移動中の見た目）・`key=`（移動中に有効なキーの限定）。bluesnovelの読み戻りはPageUp/PageDown＋`Caretaker`で本家と別の作りなので、対応させるなら設計から
- [ ] **レイヤ操作タグの残り**（`[lay]`の`visible`/`alpha`/`left`/`top`/`rotation`/`scale_x`/`scale_y`/`pivot_x`/`pivot_y`/`blendmode`/`b_color`/`style`/`index`/`float`/`dive`と`[clear_lay]`は実装済み）
  - [ ] `[lay bura=…]`（ぶら下げ禁則処理）。CSSプロパティ1つで済む話ではなく行分割の実装が要るので、文字組み（縦書き・`r_size`・`max_col`等）とまとめて
  - [ ] `[lay b_pic=…]`の残り：**枠画像に合わせた文字表示領域の自動サイズ調整**（本家は`setMySize(sp.width, sp.height)`）と`b_left`/`b_top`（枠画像のずらし）・`back_clear`。テンプレは`style=`でwidth/heightを明示するので実害は出ていない
  - [ ] `[add_face blendmode=…]`はCSSの値をそのまま通しているので、`[lay blendmode=…]`（本家の4種だけを受けてCSS値へ変換）へ揃える（`ScriptEngine.ts`に`//TODO:`あり）
- [ ] **`[set_focus]`の残り**（`to=null`/`next`/`prev`・`add=`/`del='dom=…'`は実装済み）
  - [ ] 本家 `FocusMng` のゲームパッド対応（`range`のstepUp/Down、テキストのカーソル移動、ラジオボタンの選択移動）は未対応。ゲームパッド入力そのものが未着手なので同時に
  - [ ] `[button]`のフォーカス時の見た目（本家は`hv()`/`nr()`でホバー状態を切り替える）。`[button]`の見た目・レイアウト検討と一緒に
- [ ] **トゥイーンアニメの残り**（`[tsy]`/`[wait_tsy]`/`[stop_tsy]`/`[pause_tsy]`/`[resume_tsy]`は実装済み）
  - [ ] `[tsy path=…]`（複数区間の経路指定。`ext_fg.sn`の`fg_shake`/`fg_jump`が使う）。本家は`(x,y,o)`の並びを正規表現で切り出して`chain()`で数珠つなぎにする（`CmnTween.ts:167`）。GSAPならtimelineで自然に書けるので、置き換え設計から
  - [ ] `[tsy chain=…]`（他レイヤのトゥイーン終了に続ける）も同様に未対応
  - [ ] `[tsy]`の`width`/`height`は、レイヤ属性側（`[lay]`）に無いので未対応（`pivot_x`/`pivot_y`は対応済み）
  - [ ] `[tsy render=…]`（レイヤを一枚に描画してから動かす）はpixi前提なので保留。`[tsy filter=…]`（トゥイーン開始と同時にフィルターを掛ける）は`[lay filter=…]`と同じ仕組みで足せる
  - [ ] `[tsy backlay=…]`（終了時に裏ページへ同じ値を写す）。bluesnovelは`page=`で対象ページを選べるようにしたので、必要かどうか判断してから
- [ ] **しおり・システム系の残り**（`[title]`・`[toggle_full_screen]`・`[dump_lay]`・`[dump_val]`・`[dump_stack]`・`[pop_stack]`・`[navigate_to]`・`[loadplugin]`・`[snapshot]`・`[record_place]`・`[save]`・`[load]`・`[reload_script]`・`[copybookmark]`・`[erasebookmark]`・`[export]`・`[import]`は実装済み）
  - [ ] `[load]`の残り：**音声の復元**（本家`playLoopFromSaveObj()`。音声層と一緒に）、`index=`（ページ移動用）・`do_rec=`。また**読み戻し履歴（PageUp/PageDown）は捨てている**——ロード後の位置は履歴と繋がらないため。ページログ（`[page to=…]`）を作るときに設計し直す
  - [ ] `[save]`の残り：**サムネイル画像の保存**（`userdata:/`へのファイル保存が要る。テンプレの`_archive.sn`は`[save pic=…]`で撮った画像を枠に出す想定）。ブラウザ版は本家も代替画像を出すので、まずは`[snapshot]`の結果をどこへ置くかから
  - [ ] セーブデータの**暗号化**（本家`sys.arg.crypto`／`enc()`/`dec()`）は`[export]`/`[import]`も含めて未対応。アセット暗号化と一緒に
  - [ ] `[window]`（アプリウインドウ設定）・`[close]`（アプリ終了）はElectron専用。本家もブラウザ版（`SysWeb`）では何もしないno-opなので、`dist_app`側の整備と一緒に
  - [ ] `[snapshot]`の残り：**HTMLフレーム（`[add_frame]`）の中身が写らない**（`<img>`化したSVGはiframeを描画しないというブラウザ側の制約。本家web版もpixiステージだけを撮るので結果は同じ）。`smoothing=`・`fn`の拡張子によるフォーマット指定（常にpng）・`userdata:/`保存・`b_color`の透過2桁は未対応
  - [ ] `[toggle_full_screen]`の残り：本家は全画面時にステージを画面中央へ寄せる（`SysBase.cvsResize()`）。bluesnovelは`transform: scale()`での拡縮なので、全画面時の見た目は実機で要確認
- [ ] **HTMLフレームの残り**（`[add_frame]`/`[frame]`/`[set_frame]`/`[let_frame]`と`[event key='dom=…']`は実装済み）
  - [ ] `[tsy_frame]`（フレームのトゥイーン）。フレームはストアに載っていないので`[tsy]`の仕組みをそのまま使えず、`FrameMng`側にGSAPを持つ形になる。`[tsy]`の`path=`対応と一緒に
  - [ ] フレーム内画像の差し替え（本家 `sn_repRes()`＋`data-src`。暗号化アセットをBlob URLに差し替える仕組み）はアセットパイプライン整備と一緒に。暗号化（`sys.arg.crypto`）も同様
  - [ ] `[event key='dom=…']`の`sn.event.domdata.*`（発火した要素の`data-*`を変数へ）は未対応
- [ ] **フィルターの残り**（`[add_filter]`/`[clear_filter]`/`[enable_filter]`と`[lay filter=…]`は実装済み）
  - [ ] **本家22種のうち、CSSのfilterで素で書ける9種だけ対応**（`blur`/`brightness`/`contrast`/`grayscale`/`black_and_white`/`negative`/`saturate`/`hue`/`sepia`）。残りは`noise`以外すべてpixiの`ColorMatrixFilter`のプリセットなので、**SVGの`feColorMatrix`へpixiと同じ5x4行列を流し込めば同じ絵が出せる**（`color_matrix`・`browni`・`color_tone`・`kodachrome`・`lsd`・`night`・`polaroid`・`predator`・`technicolor`・`tint`・`to_bgr`・`vintage`）。行列の実体はpixiのソースから拾ってくる必要があり、SVGフィルタ要素をDOMへ挿す仕組みも要るので別項目とする
  - [ ] `noise`（ノイズ）はCSSにもSVGの単純な組合せにも無いので、対応するならcanvas等で別途
  - [ ] `[add_filter blendmode=…]`（フィルター自体のブレンドモード）は未対応
  - [ ] `[lay blur_x=/blur_y=]`（軸別のぼかし強度）はCSSの`blur()`が半径1つしか持てないので表現できない
- [ ] **組み込み変数の残り**（環境・設定まわり＝`const.sn.config.*`/`navigator.language`/`screenResolution*`/`isApp`等、および`const.sn.lay.*`（存在判定＋レイヤ木の詳細ツリー）は実装済み。`ScriptMng#defEnvBuiltins()`）
  - [ ] `const.sn.lay[N].<fore|back>.width/.height` は実寸ではなく「表示物の有無」を1/0で代用中。実寸が要る用途が出たら、描画側（GrpLayerの`<img>`のnaturalWidth等）から集める設計に差し替える
  - [ ] `const.sn.sound.*`（音声）・`const.sn.log.json`（履歴）は各層と一緒に。`const.sn.bookmark.json`（しおり）は実装済み
  - [ ] **システム変数(sys:)は初期値が入り、保存もされるようになった**（`VarStore`が生成時と[clearsysvar]時に`creSYS_DATA()`を適用。停止点ごとに`SaveMng`がlocalStorageへ）。読み書きはできるが、その値を使う機能が無いものが多い（`sn.tagCh.*`＝文字表示ウェイト、`TextLayer.Back.Alpha`＝テキスト窓の背景濃度、`sn.sound.*`/`const.sn.sound.*.volume`＝音声、`const.sn.nativeWindow.*`、`const.sn.aPageLog`）。docs/dev.htmlで🟡。設定画面から変更しても見た目に反映されないので、各層の実装時に繋ぐ
  - [ ] `const.sn.key.*`（修飾キーの押下状態。本家 `EventMng`）は未対応。`Main.tsx`でkeydown/keyupを見てエンジンへ書き戻す形になる
  - [ ] `const.sn.platform`はUA文字列で代用中。本家はPlatform.jsのjson（`const.sn.platform.os.family`のように下位を引ける）
  - [ ] `const.sn.isPaging`（ページ遷移状態か）・`save:const.sn.layer.（文字レイヤ名）.enabled`は未対応
- [ ] **`[button]`の残り**（`left`/`top`/`width`/`height`/`rotation`/`pivot_x`/`pivot_y`/`scale_x`/`scale_y`/`alpha`/`enabled`/`blendmode`は実装済み）
  - [ ] `pic=`（画像ボタン）・`b_pic=`（背景画像）はアセットパイプライン整備と一緒に
  - [ ] `style=`/`style_hover=`は**pixiのTextStyleのJSON**なのでCSSへ読み替える設計から。`[lay style=…]`（CSSそのまま）とは別物なので注意
  - [ ] `hint=`（ツールチップ。本家はヒント用レイヤを持つ）・`enterse=`/`clickse=`（効果音）は未対応。後者は音声対応と一緒に
  - [ ] 本家は`width`/`height`で文字そのものを引き伸ばす（pixiの`Text.width/height`は拡縮）。こちらは箱の大きさとして扱い`height`をフォントサイズの基準にしている。実機で見た目を要確認
- [ ] **音声（一旦無視）**：`[playbgm]` `[stopbgm]` `[fadebgm]` `[fadeoutbgm]` `[playse]` `[stopse]` `[fadese]` `[fadeoutse]` `[volume]` `[xchgbuf]` `[ws]` `[wb]` `[wf]` `[wl]`、`[wq]`（画面揺らし待ち）。`ext_voice.sn`の`voice`系マクロも同様。動画（`[wv]`）も同じく後回し

## その他

- [ ] オート読み・既読スキップの残課題
  - スキップモード`'p'`（改ページで止まる）は`#calcResume()`で`[p]`をstop扱いにするところまで実装したが、`Main.tsx`が手動操作のたびに`cancelAuto()`を呼ぶため、ユーザーがその改ページをクリックで越えるとスキップも解除されてしまう（本家はスキップ継続）。「モード'p'の改ページ停止」を手動停止と区別する必要がある。既定`'s'`（全部飛ばす）は正しく動く
  - 文字送りウェイト設定（`sys:sn.tagCh.*_Kidoku`）は、bluesnovelの文字送りがGSAP（duration/stagger）で秒単位のため未接続。既読スキップ中の瞬時表示（`store.skipping`→`TxtLayer`）だけ実装済み。文字送り演出パラメータ確定（別項目）と合わせて調整
  - オート読みの待ち時間カウントは停止点の時点から開始（本家は文字送り演出の完了後）。演出が待ち時間より長いと途中で進む。実機調整時に見直し
- [ ] `[jump count=false]`が消すのは「`[jump]`タグの次のトークン位置」で、そこは通常そのまま読み進める先ではないため実質効かない（本家の実装をそのまま移植した状態）。本家側の意図を確認したい
- [ ] `[call]`の`clear_local_event`属性（本家でも`popLocalEvts()`の直後に`clear_event({})`を呼ぶ形で実質no-opに見えるため、本家側の意図を確認してから）
- [ ] `[event]`の`url`属性（ラベルへ飛ぶ代わりにURLを開く予約）は未対応。タグ単体の`[navigate_to]`は実装済みなので、`[event]`側から呼べるようにするだけ
  - 修飾キー付きのキー名（`alt+enter`・`meta+0`等。本家 `SysBase.modKey()`）は対応済み（`Main.tsx` `keyName()`）
  - `key='dom=フレームid:セレクタ'`・`need_err`も対応済み（HTMLフレームと同時に実装）
- [ ] グループ位置指定/移動（face合成した画像群を1つの単位として、デザインモードで位置調整・移動する仕様の検討）
  - face合成そのもの（`add_face`/`[lay fn=... face=...]`）は実装・テスト済み
  - デザインモードでのMoveableリサイズ時、差分画像（face）は`dx`/`dy`が絶対px指定のため、拡大縮小に追随しない（`GrpLayer.tsx`）。比率換算の要否を検討
  - 本家のように「`face`のみ指定して直前の`fn`を維持する」独立更新には未対応
- [ ] 実機（`tmp_blues`）で以下を確認
  - [ ] 読み戻り（PageUp/PageDown）から戻った際、既読部分が瞬時表示されない
  - [ ] `main.sn`へ`[lay layer=mes b_alpha=...]`を仕込んで、文字レイヤ背景の不透明度変更の見た目を確認（`main.sn`には`[lay layer=mes b_alpha=0.4]`が既にあることを今回確認済み。表示結果の目視確認は未実施）
- [ ] アセット周りの残り（`SAMPLE_SN`フォールバックと`GrpLayer.tsx`の`try/catch`撤去は完了）
  - [ ] 暗号化アセット（`sys.arg.crypto`／`sys.dec()`）。本家は`Loader`で復号してBlob URLへ差し替える。`[add_frame]`のHTMLとフレーム内画像（`sn_repRes()`）も同じ仕組み
  - [ ] 画像の**先読み**（本家 `SpritesMng`）は未対応。`<img>`のsrcを差し替えるだけなので、切替時に一瞬空白になりうる。実機で要確認
  - [ ] `tmp_esm_uc/doc/prj/`の実アセットで通す（目標経路の`[img]`が動くか。`prj.json`/`path.json`はそのまま使えるはず）
- [ ] 文字送り演出のパラメータ（`duration: 0.25`, `stagger: 0.035`）は仮値。実機（`tmp_blues`）で調整
- [ ] 動画・音声対応
- [ ] npmリリース処理を`skynovel_esm`に合わせる（後々の対応・未着手）
- [ ] skynovel_esm側もGSAP化を検討中（bluesnovelの`@tweenjs/tween.js`は現状未使用のまま残置。撤去はnpmリリース処理整備と合わせて後日）
- [ ] **文字装飾・文字組み**：`[ch]`（文字を追加）・`[span]`（インラインスタイル）・`[link]`/`[endlink]`（ハイパーリンク）・`[ruby2]`・`[tcy]`（縦中横）。`sub.sn`の`txt_lay_*`マクロが使う。`[lay bura=…]`（ぶら下げ禁則）や縦書き・`r_size`・`max_col`とまとめて設計する
  - [ ] **ルビ記法`《…》`・`｜…《…》`が生のまま表示される**のが本編で一番目立つ欠落（`ss_000.sn`の本文が「選《よ》りに」のように出る）。本家はGrammarではなくTxtLayer側の文字組みで処理するので、上記とまとめて。`const.sn.last_page_plain_text`が《》を除去していないのも同じ理由
  - [ ] 縦書き時の行数・余白が本家と完全一致ではない（`max_row`未対応、`padding`の解釈差）。実機で見ながら詰める
- [ ] `[button]`の既定の見た目（色・角丸・余白）は仮のまま。座標・寸法指定（`left`/`top`/`width`/`height`等）は実装済み
