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

- [ ] **ページ裏表（fore/back）の概念**。`title.sn`は`[clear_lay layer=mes page=back]`→`[trans]`→`[wt]`で描画するため、これが無いと画面が出ない。React側の持ち方（裏ページ用のストア＋クロスフェード）から要検討
  - [ ] `[page]` ページ移動（`sub.sn`の`sys_title_start`が`[page clear=true key=...]`を使う）
  - [ ] `[trans]` ページ裏表を交換（`layer=`で対象指定、`time=`、`rule=`ルール画像）
  - [ ] `[wt]` トランス終了待ち
  - [ ] `[lay]`の`page=fore|back`属性
- [ ] **レイヤ操作タグ**
  - [ ] `[clear_lay]` レイヤ設定の消去（`layer=`/`page=`）
  - [ ] `[lay]`属性の拡充：`visible` `alpha` `rotation` `scale_x`/`scale_y` `left`/`top` `b_color` `style` `bura`（`img`/`txt_lay_*`マクロが使う）
- [ ] **イベント系タグ**
  - [ ] `[enable_event]` イベント有無の切替（18箇所と最多。`layer=`指定あり）
  - [ ] `[wait]` ウェイトを入れる
  - [ ] `[waitclick]` クリックを待つ
  - [ ] `[set_focus]` フォーカス移動（`to=null`で解除）
- [ ] **文字列操作タグ**（`ExprEval`の上に載るだけなのでエンジン内で完結。テストしやすい）
  - [ ] `[let_replace]` 正規表現で置換（6箇所）
  - [ ] `[let_substr]` 文字列から抜きだし
  - [ ] `[let_length]` 文字列の長さ
  - [ ] `[let_index_of]` 文字列で検索
  - [ ] `[let_char_at]` 文字列から一字取りだし
  - [ ] 同族で未使用だが揃えたい：`[let_abs]` `[let_round]` `[let_search]`
- [ ] **トゥイーンアニメ**（`ext_fg*.sn`の`fg_fi`/`fg_shake`等が使う。bluesnovelはGSAPなので置き換え設計から）
  - [ ] `[tsy]` トゥイーン開始
  - [ ] `[wait_tsy]` トゥイーン終了待ち
  - [ ] `[stop_tsy]` トゥイーン中断（＋`[pause_tsy]`/`[resume_tsy]`）
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
