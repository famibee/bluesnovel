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
- [ ] 【不使用かも・凍結】**`[quake]`の残り**：`layer=`（揺らす対象レイヤの限定。今は常に画面全体）。立ち絵を震わせる`[fg_shake]`/`[fg2_shake]`が使っているかと思ったが、あれは**`[tsy path=]`で実現**していた（実装済み）ので、`layer=`の実需が見当たらない。サンプル <https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/ext_fg2>。`delay`/`repeat`/`ease`/`yoyo`は本家でも揺れ幅がランダムで効かないため見送り
- [ ] **`[ch_out_style]`の適用**（定義と`[lay out_style=]`・`[span ch_out_style=]`は受け付けるが、消去のアニメをまだ行なっていない＝本家の既定`wait=0`と同じ結果）。文字が消えるのはページ切替や`[er]`でReactが要素を捨てる場面なので、消えていく間だけ古い文字を生かす仕組みが要る。出現演出（`src/ts/ChStyle.ts`）とは別の作りになる
- [ ] **履歴（ログ）の残り**。本体（`const.sn.log.json`・`save:sn.doRecLog`・`save:const.sn.sLog`・`[rec_ch]`/`[rec_r]`/`[reset_rec]`）は`src/ts/Log.ts`で対応済み。サンプル <https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/log_and_play>
  - [ ] `[rec_ch]`の`style`/`r_style`と**任意属性**（本家は`const.sn.log.json`の各ページへそのまま載せ、フレーム側のJSが読む）。今は`text`のみ
  - [ ] `[log]`（本家`DebugMng.ts:57`）は**履歴とは別物**で、`downloads/log.txt`へ追記するデバッグ用。ファイル書き出しの置き場所が要るのでアプリ版の整備と一緒に
  - [ ] テンプレの`frames/_log.sn`＋`_log.htm`を実際に通すE2E（フレームへ`&const.sn.log.json`を流し込む経路）
- [ ] **`[trans]`の残り**：`delay=`・`ease=`（進度は常に等速）。`glsl=`（自前シェーダ）はWebGLを使わないため実現しようがないので対象外
- [ ] **トゥイーンの残り**：`width`/`height`（レイヤ属性側に無い）・`render=`（pixi前提なので保留）・`filter=`・`backlay=`
- [ ] **フィルターの残り**：本家22種のうち`noise`以外の21種に対応済み（CSSの`filter`が9種、SVGの`feColorMatrix`が12種。`src/ts/Filter.ts`）。サンプル <https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/filter>
  - [ ] `noise`はCSSにもSVGの単純な組合せにも無いので、対応するならcanvas等で別途。<https://ics.media/entry/241122/> が参考になるかも
  - [ ] `[add_filter blendmode=…]`（フィルター単位のブレンド）・`[lay blur_x=/blur_y=]`（CSSの`blur()`は半径1つしか持てない）
  - [ ] ギャラリーの`filter`サンプルと実機で見比べ、色の出方が本家と揃っているか確認（pixiはシェーダ、こちらはSVGフィルタなので端の丸めが違いうる）
- [ ] **文字組みの残り**
  - [ ] `max_row`（最大行数を超えたら自動改ページ）・`r_size`（ルビサイズ）・`break_fixed`系。**行分割そのものはブラウザ任せ**にした帰結で、禁則文字の指定（`kinsoku_sol`/`kinsoku_eol`/`kinsoku_dns`/`kinsoku_bura`）も渡す手段が無い。ギャラリーの`line_breaking_rules`と実機で見比べ、必要なら本家`Hyphenation.ts`のような自前計算へ寄せる
  - [ ] `bura`はChromeが`hanging-punctuation`未対応なので実質Safariのみ効く
  - [ ] ルビの位置指定（`《center｜るび》`等の`r_align`。今は指定を落としてルビ文字だけ出す）と`[lay sesame=…]`（傍点文字の変更）
  - [ ] ルビ付き行の行間が広がる（CSSの`<ruby>`任せ）。`ruby-position`等の詰めは縦書き・`max_row`と合わせて
  - [ ] 縦書き時の行数・余白が本家と完全一致ではない（`padding`の解釈差）
  - [ ] `[span]`/`[ch]`/`[link]`/`[tcy]`/`[graph]`共通の残り属性：`layer`/`page`（今は既定文字レイヤの表ページ固定）
  - [ ] `[link]`の残り：`global`・`onenter`/`onleave`・`style_clicked`/`r_style_hover`/`r_style_clicked`
- [ ] **アニメpng（スプライトシート）の残り**
  - [ ] 【現状不使用・優先順位低】文字レイヤの枠画像（`[lay b_pic=…]`）でのシート再生。今はCSSの背景画像に直接URLを入れているので、.jsonが来ると絵が出ない
  - [ ] コマ数が格子に満たないシート（余りの位置で一瞬空白になる）
  - [ ] `[graph]`の`id`（本家は`id='break'`を待ちマークに使う内部用で、シナリオが書く場面が見当たらない）
  - [ ] `[l]`/`[p]`の待ちマークの`visible`（本家は`breakLine`/`breakPage`の入口で**属性ごと消している**＝常に表示。効かせる意味があるのか要確認）
- [ ] **`[button]`の残り**：効果音（`enterse`等。音声層と一緒に）。既定の見た目（色・余白）も仮のまま。`pic=`（画像ボタン）・`b_pic=`（背景画像）は対応済み。サンプル <https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/ch_button>
  - [ ] `hint_opt`は本家popperのオプションJSONだが`placement`しか見ていない（依存を増やさず自前で位置決めしているため）
  - [ ] `[button b_pic=…]`は箱の大きさを変えない（本家は絵の実寸ぶんに広げる）。テンプレで実害が出たら合わせる
- [ ] **`[lay b_pic=…]`の残り**：枠画像に合わせた文字表示領域の自動サイズ調整（本家`setMySize()`）・`b_left`/`b_top`・`back_clear`。テンプレは`style=`でwidth/heightを明示するので実害は出ていない
- [ ] **しおり・システム系の残り**
  - [ ] `[load]`の`index=`（ページ移動用）・`do_rec=`。**ロード時はページログを捨てている**（ロード後の位置は履歴と繋がらないため）。本家は`index=`でしおりの中の何ページ目かを選べるので、そこを繋ぐならページログ（`src/ts/PageLog.ts`）をしおりへ含める設計が要る
  - [ ] `[save pic=…]`のサムネイル保存（テンプレの`_archive.sn`が枠に出す想定）。置き場は`[snapshot fn='userdata:/…']`と同じセーブ層（`SaveMng.putFile()`）でよい
  - [ ] セーブデータの**暗号化**（本家`sys.arg.crypto`／`enc()`/`dec()`）。`[export]`/`[import]`も含む。アセット暗号化と一緒に
  - [ ] `[snapshot]`の残り：**HTMLフレームの中身が写らない**（`<img>`化したSVGはiframeを描画しないというブラウザ側の制約。本家web版も同じ結果）
  - [ ] **アプリ（Electron）版の残り**。`src/app.ts`（`SysApp`）は**ウインドウが出て本編が動くところまで**実装済み（`getInfo`→Config→`inited`）。`[close]`／`[window]`も接続済み。残りは下記
    - [ ] `[update_check]`の実処理（本家`SysApp.ts:306`。`_index.json`／`.yml`の取得・版比較・ダイアログ・ダウンロード・sha512検証）
    - [ ] しおり・`sys:`の保存先を`electron-store`（`userdata/storage/`）へ。今はブラウザ版と同じlocalStorage（`SaveMng`）のままで、アプリを消すと消える。`[export]`/`[import]`も本家は`.spd`（zip）
    - [ ] ウインドウ位置・大きさの復元。今は毎回「ステージ実寸で中央」。本家は`sys:const.sn.nativeWindow.*`から復元し、`save_win_inf`で動かすたび保存する（受け口は`appMain_cmn`に有る）
    - [ ] パッケージ版のアセット読み込み（`file://`になるので`fetch`が使えず、主処理の`fetch`/`readFile` IPC経由が要る）。今のところ`electron-vite dev`のみ確認
    - [ ] アプリ版の`[snapshot]`は`capturePage`（Electronがネイティブに撮る＝**HTMLフレームの中身も写る**）。web版のDOM→SVG方式はブラウザ制約でフレームが写らないので、ここは版ごとに実装が分かれる
  - [ ] `[dump_script]`（本家はVSCode拡張との連携）
- [ ] **組み込み変数の残り**
  - [ ] `const.sn.lay[N].<fore|back>.width/.height`は実寸ではなく「表示物の有無」を1/0で代用中。実寸が要る用途が出たら描画側から集める設計に
  - [ ] `save:const.sn.layer.（文字レイヤ名）.enabled`
  - [ ] **sys:変数は読み書きも保存もできるが、その値を使う機能が無いものが多い**（`sn.sound.*`＝音声、`const.sn.nativeWindow.*`。`sn.tagCh.*`・`TextLayer.Back.Alpha`・`const.sn.aPageLog`は接続済み）。docs/dev.htmlで🟡。各層の実装時に繋ぐ
- [ ] **`[set_focus]`の残り**：ゲームパッド対応（本家`FocusMng`の`range`のstepUp/Down、テキストのカーソル移動、ラジオボタンの選択移動）。ゲームパッド入力そのものが未着手なので同時に

## 挙動の詰め・実機確認

- [ ] オート読み・既読スキップの残課題
  - [ ] スキップモード`'p'`（改ページで止まる）は`#calcResume()`まで実装したが、`Main.tsx`が手動操作のたびに`cancelAuto()`を呼ぶため、ユーザーがその改ページをクリックで越えるとスキップも解除される（本家は継続）。「モード'p'の改ページ停止」を手動停止と区別する必要がある。既定`'s'`は正しく動く
  - [ ] オート読みの待ち時間カウントは停止点の時点から開始（本家は文字送り演出の完了後）。演出が待ち時間より長いと途中で進む
- [ ] 文字送りの速さを実機（`tmp_blues`）で確認。1文字あたりの遅れは`sys:sn.tagCh.msecWait`（既定10ms）、1文字のアニメ時間は`[ch_in_style]`の`default`（既定500ms）で、どちらも本家の既定値にした
- [ ] 読み戻り（PageUp/PageDown）から戻った際、既読部分が瞬時表示されない（実機確認）
- [ ] 全画面時の見た目（中央寄せは実装済み）を実機で確認
- [ ] フレーム内幅が本家960に対しこちら1024なので bootstrap の`row-cols`が1列多くなる（不具合ではない）。合わせるならステージ実寸とフレーム幅の関係を再検討
- [ ] **デザインモードは無効化中**（`Stage.tsx`の`ENA_DESIGN_MODE = false`）。長押しで入れてしまうが、中で触れるのはレイヤの位置・サイズだけで、触った結果をシナリオへ書き戻す先が無い。本家機能の大部分（音声・履歴・文字演出）が揃い、「調整→保存」の行き先を決めてから戻す
- [ ] グループ位置指定/移動（face合成した画像群を1つの単位として、デザインモードで位置調整・移動する仕様の検討）
  - [ ] デザインモードでのMoveableリサイズ時、差分画像（face）は`dx`/`dy`が絶対px指定のため拡大縮小に追随しない（`GrpLayer.tsx`）
  - [ ] 本家のように「`face`のみ指定して直前の`fn`を維持する」独立更新には未対応

## アセット・基盤

- [ ] 暗号化アセット（`sys.arg.crypto`／`sys.dec()`）。本家は`Loader`で復号してBlob URLへ差し替える。`[add_frame]`のHTMLとフレーム内画像も同じ仕組み
- [ ] 画像の**先読み**（本家`SpritesMng`）は未対応。`<img>`のsrcを差し替えるだけなので切替時に一瞬空白になりうる。実機で要確認
- [ ] `tmp_esm_uc/doc/prj/`の実アセットで通す（`prj.json`/`path.json`はそのまま使えるはず）
- [ ] npmリリース処理を`skynovel_esm`に合わせる。`semantic-release`本体が依存に無く、`.github/workflows`も未整備
- [ ] **ESLintは塩漬け中**。`typescript-eslint`（8.65.0時点で最新）がTS 7非対応と明示的にthrowする（[issue #10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940)）ため、`eslint.config.mts`を置いてもVSCode拡張は動かない。パーサが無いと`.ts`を解析できないので回避策も無し。TS 7.1対応が出たら復活する。`@typescript/typescript6`は`import ts6 from '@typescript/typescript6'`と明示的に書けるツールにしか効かず、`require('typescript')`決め打ちのtypescript-eslintには届かない（bunの`resolutions`によるネスト解決も無視される）

## 本家からの引き継ぎ（リソースリーク調査 2026-07-30）

本家 `skynovel_esm` でリソースリークを洗い出し、8ファイルを修正した。**こちらに関係するのは下記だけ**
（音声・PixiJS・`EventListenerCtn`・`CmnTween` は移植対象外か未実装のため、大半は該当しない）。

- [x] `src/ts/FocusMng.ts` の `add`/`remove` 非対称を修正済（本家と同じ問題）。重複チェックが `#aEl`
  しか見ないので `remove()`→`add()` が素通りし、`'focus'` リスナが積み上がっていた。`BtnLayer` 経由は
  Reactが要素ごと作り直すので無害だが、`[set_focus add/del='dom=…']` が相手にするフレーム内の要素は
  生き続けるため往復した回数だけ増える。**`dist/` は未ビルド**なので `bun run build` が要る
- [x] `src/sn/gamepad.js.d.ts` に、ゲームパッド移植時の注意（`stop()` 必須・`window` の `'error'`
  リスナを自分で外す）を追記済。本家はどちらも漏れていて、画面を作り直すたび rAF ループが増えていた
- [ ] **ビルドとコミットが未了**。ソース修正だけ入れた状態で `dist/` は古いまま。
  `bun run build` してから下記でコミットする（文面は本家側で用意した）：

  ```
  fix(focus): [set_focus]の往復で'focus'リスナが積み上がる

  重複チェックが #aEl しか見ないので remove()の後の add()が素通りし、
  add()で張った 'focus' リスナが外れないまま増える。BtnLayer 経由は React が
  要素ごと作り直すので無害だが、[set_focus add/del='dom=…']が相手にする
  フレーム内の要素は生き続けるため、往復した回数だけ溜まる。
  解除関数を #hOff に持ち、remove()と clear()で外す。

  本家 skynovel_esm の同じ非対称から見つけたもの（あちらは EventListenerCtn が
  解除関数を保持し続けるので、要素ごと掴んだままになる違いがある）。

  あわせて gamepad.js.d.ts に移植時の注意（stop()必須・window の 'error' リスナを
  自分で外す）と、todo.md に本家からの引き継ぎ・確認事項への回答を追記。
  ```
- [ ] **音声を実装するとき**（このtodoの筆頭項目）は本家 `SndBuf.ts` の下記に注意。今の本家は修正済み
  - 停止経路は必ず `Howl.unload()` を通す。howler は `Howler._howls` にインスタンスを持ち続け、
    `unload()` でしか除去しない。本家は「ロード完了前に停止」した時だけ解放漏れになっていた
  - **`unload()`後は `loaderror` が来る**。howler は `_sounds` が空だとデコード成功でも
    `loaderror` を出す（`howler.js:2468`）。捨てた音のエラーを画面に出さないよう握り潰すこと
  - 恒久的に残るのは**ループ再生**だけ。非ループは再生終了の `onend` で結局解放される
  - ロード完了通知（`join` の待ち解除）は**成否・停止済みを問わず必ず一度出す**。出さないと
    `[load]`（本家 `playLoopFromSaveObj()` の `Promise.allSettled`）が永久に待ってスクリプトが止まる

### E2Eの作り方について（こちらの資産を本家へ輸入した）

本家に `test/e2e/` を新設した。`playwright.config.ts` と fixture の構成はこちらを丸写ししている
（ポートは 5198 にして bluesnovel の 5199 と分離）。ただし検証方法は変えざるを得なかった：

- こちらは zustand ストアが唯一の真実なので `window.__sn.store.getState()` を読めば済むが、
  本家は状態が各クラスの私有フィールドに散っていて同等物が無い
- そこで **fixture 側でブラウザAPIを計装**する方式にした（`test/e2e/app/probe.ts`）。
  `addEventListener`/`requestAnimationFrame`/`URL.createObjectURL` を包んで生存数を数え、
  「同じ操作をN回繰り返しても増えないこと」だけを見る。`src/` には一切手を入れない
- **`once: true` のリスナは数えない**。ブラウザが内部で外し `removeEventListener` を経由しないため、
  数えると際限なく増えて偽陽性になる（本家 `TxtStage` が1文字ごとに使う）
- 逆に、ブラウザが要らないものはE2Eにしない。rAFループの多重化と `FocusMng` の add/remove は
  `bun test`（happy-dom＋rAF差し替え）で完結する。こちらの `FocusMng` にも同じ単体テストが書ける

なお、こちらの `src/ts/FrameMng.ts:236` の `#hDomLsn`（キー単位で `removeEventListener`）は
**本家より先行していた**。本家の `EventMng` には同等の仕組みが無く、`[event key='dom=…' del=true]` で
リスナが外れていなかったので、同じ設計を輸入した。

**「本家へ確認したいこと」の3件には回答済み**（この下の節の末尾「本家からの回答」を参照）。
3件とも当方の判断で正しく、いずれも移植不要という結論。

## 本家へ確認したいこと

- [ ] `[jump count=false]`が消すのは「`[jump]`タグの次のトークン位置」で、そこは通常そのまま読み進める先ではないため実質効かない（本家の実装をそのまま移植した状態）
- [ ] `[call]`の`clear_local_event`属性（本家でも`popLocalEvts()`の直後に`clear_event({})`を呼ぶ形で実質no-opに見える）
- [ ] `[button]`に配置属性（`center`/`middle`/`right`/`bottom`/`s_right`/`s_bottom`）は**本家にも無い**と判断した。`Button.ts:79-80`が読むのは`left`/`top`だけで`Layer.setXY()`を通らず、本家のタグリファレンスも`[button]`には`left`/`top`しか載せていない。`Layer.setXY()`の`isButton`分岐（幅の1/3で計算）は**呼び出し元が無い死んだコード**（`isGrp=true`の2箇所と`TxtLayer`からしか呼ばれない）。AIRNovel時代の名残に見えるが、意図的に残しているのかどうか

### 本家からの回答（2026-07-30）

- [x] **`[jump count=false]`** — 指摘のとおり `[jump]` では実質効かない。`#nextToken_Proc()` は
  ①`#recordKidoku()`（**今から返すトークンの位置**に既読を記録）→②トークン取得→③`++#idxToken`
  の順なので、タグ実行中の `#idxToken` は**そのタグの次**を指す。`#eraseKidoku()` はその
  `#idxToken` を消すため、`[jump]` 自身の既読は残り、消えるのは「[jump]の次のトークン」＝
  ジャンプ後に読まれない位置。
  ただし **`[call]` では意味がある**。`count` の既定が `[jump]` は `true`、`[call]` は `false`
  （＝callは既定で消す）と非対称で、`[call]` の「次のトークン」は `#callSub()` が
  `new CallStack(fn, #idxToken, …)` で積む**戻り先**そのもの。2回目以降の `[call]` で戻り先を
  未読に戻す動きになる。`#eraseKidoku()` は `[call]` の戻り先を想定した作りで、`[jump]` は
  同じ処理を使い回しているだけ、と読むのが妥当。移植時は `[call]` 側だけ再現すれば足りる
- [x] **`[call clear_local_event]`** — 指摘のとおり no-op。`#call()` は
  `#callSub({...hArg}, ReadingState.popLocalEvts())` で**ローカルイベントを取り出して空にし**、
  コールスタックの `':hEvt1Time'` へ退避する。その後に呼ぶ `clear_event({})` が見る
  `#hLocalEvt2Fnc` は既に `{}` なので何も起きない。退避したぶんは `[return]` 時
  （`ScriptIterator.ts:1014` の `pushLocalEvts`）に復元されるが、この属性はそちらにも触らない。
  属性の意図（復元させない、が本来か）に対して実装が追いついていない状態。移植不要
- [x] **`[button]` の配置属性と `Layer.setXY()` の `isButton`** — 判断は正しい。`setXY()` の
  呼び出しは3箇所（`GrpLayer.ts:94`／`:164`、`TxtLayer.ts:300`）だけで、**どれも `isButton` を
  渡していない**＝常に `false`。`b_width/3` の分岐は到達しない死んだコード。`Button.ts` も
  `hArg.left`/`hArg.top` を `uint()` で読むだけで `setXY()` を通らない。AIRNovel時代の名残で、
  意図的に残しているというより消し忘れ。移植不要（本家側で別途整理する）

