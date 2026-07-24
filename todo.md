#TODO 優先順位順

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

- [ ] **ページ裏表の残り**（`[lay page=…]`・`[trans]`・`[wt]`・`[button page=…]`・`[er]`の両面消去は実装済み）
  - [ ] `[trans]`の`rule=`（ルール画像によるワイプ）・`glsl=`・`vague=`は未対応（現状は一様なクロスフェードのみ）。ルール画像を読む必要があるのでアセットパイプライン整備と合わせて
  - [ ] `[button]`の既定ページ。本家は`back`（`LayerMng.ts:1100`）だが、bluesnovelは既存シナリオが`[trans]`を挟まないため`fore`のまま。シナリオが`[trans]`前提になった時点で本家へ寄せる（`ScriptEngine.ts`に`//TODO:`あり）
- [ ] **`[page]`（読み戻り用のページログ）の残り**（`clear`は実装済み）
  - [ ] `to=`（指定ページへ移動）・`style=`（ページ移動中の見た目）・`key=`（移動中に有効なキーの限定）。bluesnovelの読み戻りはPageUp/PageDown＋`Caretaker`で本家と別の作りなので、対応させるなら設計から
- [ ] **レイヤ操作タグの残り**（`[clear_lay]`と`[lay]`の`visible`/`alpha`/`left`/`top`/`rotation`/`scale_x`/`scale_y`/`b_color`/`style`は実装済み）
  - [ ] `[lay bura=…]`（ぶら下げ禁則処理）。CSSプロパティ1つで済む話ではなく行分割の実装が要るので、文字組み（縦書き・`r_size`・`max_col`等）とまとめて
  - [ ] `[lay]`の`pivot_x`/`pivot_y`（回転・拡縮の原点。現状は左上固定）・`blendmode`・`filter`・`index`/`float`/`dive`（レイヤ重なり順の変更）は未対応
  - [ ] `[clear_lay]`の`layer`省略（＝全レイヤ）。エンジンが`[add_lay]`済みレイヤ名を覚えていないため現状は必須（`ScriptEngine.ts`に`//TODO:`あり）
- [ ] **`[set_focus]`（フォーカス移動）**。キーボードフォーカスの管理役（本家 `FocusMng`）が要り、`add=`/`del=`は`dom=セレクタ`でHTML要素を対象に取るので、下の`[event]`の`key='dom=…'`と同時に設計する。`to=null`だけ実装しても意味が無いので保留
  - [ ] 同族の`[enable_event]`（レイヤ単位のクリック可否）は実装済み。`[set_focus]`はそれとは別で、キーボード操作の順序管理
- [ ] **`[let]`の`val`属性（bluesnovel独自の「常に式評価」書式）を廃止する**。本家書式の
  `text=`（値そのもの。式にしたければ`text=&式`）を実装したので役目を終えている。既存テスト・
  E2Eシナリオが`val=`を多数使っているため一括置換が要る（`ScriptEngine.ts`に`//TODO:`あり）
- [ ] **トゥイーンアニメの残り**（`[tsy]`/`[wait_tsy]`/`[stop_tsy]`/`[pause_tsy]`/`[resume_tsy]`は実装済み）
  - [ ] `[tsy path=…]`（複数区間の経路指定。`ext_fg.sn`の`fg_shake`/`fg_jump`が使う）。本家は`(x,y,o)`の並びを正規表現で切り出して`chain()`で数珠つなぎにする（`CmnTween.ts:167`）。GSAPならtimelineで自然に書けるので、置き換え設計から
  - [ ] `[tsy chain=…]`（他レイヤのトゥイーン終了に続ける）も同様に未対応
  - [ ] `[tsy]`の`width`/`height`/`pivot_x`/`pivot_y`は、レイヤ属性側（`[lay]`）に無いので未対応。`[lay]`の`pivot_*`と同時に
  - [ ] `[tsy render=…]`（レイヤを一枚に描画してから動かす）・`[tsy filter=…]`はpixi前提なので、フィルター対応と同時に
  - [ ] `[tsy backlay=…]`（終了時に裏ページへ同じ値を写す）。bluesnovelは`page=`で対象ページを選べるようにしたので、必要かどうか判断してから
- [ ] **しおり・システム系**
  - [ ] `[record_place]` セーブポイント指定（既読永続化・セーブ層と一緒に）
  - [ ] `[reload_script]` スクリプト再読込
  - [ ] `[pop_stack]` コールスタック破棄
  - [ ] `[title]` タイトル指定（`setting.sn`が体験版表記で使う。ストアの`addTitle`は`prj.json`のbook.title用で、タグは未実装）
  - [ ] `[toggle_full_screen]` 全画面状態切替
  - [ ] `[window]` アプリウインドウ設定
  - [ ] `[close]` アプリの終了
  - [ ] `[snapshot]` スナップショット
  - [ ] `[dump_lay]` レイヤのダンプ（デバッグ用）
- [ ] **HTMLフレーム**（`_yesno.sn`が全面的に使う。`[event key='dom=...']`とセット）
  - [ ] `[add_frame]` / `[frame]` / `[set_frame]` / `[let_frame]`（＋`[tsy_frame]`）
- [ ] **フィルター**
  - [ ] `[add_filter]` / `[clear_filter]`（＋`[enable_filter]`）
- [ ] **音声（一旦無視）**：`[playbgm]` `[stopbgm]` `[fadebgm]` `[fadeoutbgm]` `[playse]` `[stopse]` `[fadese]` `[fadeoutse]` `[volume]` `[xchgbuf]` `[ws]` `[wb]` `[wf]` `[wl]`、`[wq]`（画面揺らし待ち）。`ext_voice.sn`の`voice`系マクロも同様。動画（`[wv]`）も同じく後回し

## その他

- [ ] オート読み・既読スキップの残課題
  - スキップモード`'p'`（改ページで止まる）は`#calcResume()`で`[p]`をstop扱いにするところまで実装したが、`Main.tsx`が手動操作のたびに`cancelAuto()`を呼ぶため、ユーザーがその改ページをクリックで越えるとスキップも解除されてしまう（本家はスキップ継続）。「モード'p'の改ページ停止」を手動停止と区別する必要がある。既定`'s'`（全部飛ばす）は正しく動く
  - 文字送りウェイト設定（`sys:sn.tagCh.*_Kidoku`）は、bluesnovelの文字送りがGSAP（duration/stagger）で秒単位のため未接続。既読スキップ中の瞬時表示（`store.skipping`→`TxtLayer`）だけ実装済み。文字送り演出パラメータ確定（別項目）と合わせて調整
  - オート読みの待ち時間カウントは停止点の時点から開始（本家は文字送り演出の完了後）。演出が待ち時間より長いと途中で進む。実機調整時に見直し
- [ ] 既読情報の永続化（本家 `Variable.saveKidoku()` → `SysBase.data.kidoku` → localStorage）。`ScriptEngine.getKidoku()`/`setKidoku()`は用意済みなので、セーブ層ができ次第そこへ繋ぐ。保存タイミングは本家同様に停止点（`[l]`/`[p]`/`[s]`）
- [ ] `[jump count=false]`が消すのは「`[jump]`タグの次のトークン位置」で、そこは通常そのまま読み進める先ではないため実質効かない（本家の実装をそのまま移植した状態）。本家側の意図を確認したい
- [ ] `[call]`の`clear_local_event`属性（本家でも`popLocalEvts()`の直後に`clear_event({})`を呼ぶ形で実質no-opに見えるため、本家側の意図を確認してから）
- [ ] `[event]`の`url`（`[navigate_to]`）・`key='dom=セレクタ'`（HTML要素へのイベント割り当て）・`need_err`は未対応
- [ ] グループ位置指定/移動（face合成した画像群を1つの単位として、デザインモードで位置調整・移動する仕様の検討）
  - face合成そのもの（`add_face`/`[lay fn=... face=...]`）は実装・テスト済み
  - デザインモードでのMoveableリサイズ時、差分画像（face）は`dx`/`dy`が絶対px指定のため、拡大縮小に追随しない（`GrpLayer.tsx`）。比率換算の要否を検討
  - 本家のように「`face`のみ指定して直前の`fn`を維持する」独立更新には未対応
- [ ] 実機（`tmp_blues`）で以下を確認
  - [ ] 読み戻り（PageUp/PageDown）から戻った際、既読部分が瞬時表示されない
  - [ ] `main.sn`へ`[lay layer=mes b_alpha=...]`を仕込んで、文字レイヤ背景の不透明度変更の見た目を確認（`main.sn`には`[lay layer=mes b_alpha=0.4]`が既にあることを今回確認済み。表示結果の目視確認は未実施）
- [ ] `SAMPLE_SN`フォールバック（`ScriptMng.ts`）と`GrpLayer.tsx`の`try/catch`を撤去し、正規のアセットパイプライン（`path.json`）を用意した上で正しいロードエラー処理に戻す
- [ ] 文字送り演出のパラメータ（`duration: 0.25`, `stagger: 0.035`）は仮値。実機（`tmp_blues`）で調整
- [ ] 動画・音声対応
- [ ] npmリリース処理を`skynovel_esm`に合わせる（後々の対応・未着手）
- [ ] `package.json`から`store`, `socket.io-client`を除去（後々の対応・未着手）
- [ ] skynovel_esm側もGSAP化を検討中（bluesnovelの`@tweenjs/tween.js`は現状未使用のまま残置。撤去はnpmリリース処理整備と合わせて後日）
- [ ] `[button]`の見た目・レイアウト（現状は簡易スタイルのみ）は未検討
