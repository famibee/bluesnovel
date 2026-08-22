#TODO 優先順位順

> **済んだことは `CHANGELOG.md`**（作業ごとの経緯・判断つき）。
> このtodo.mdは**これからやること**だけを持つ（＝いずれ空になるのが正しい）。
> 例外：sn_gallery突き合わせ（下記）の`[x]`は、洗い出しフェーズ進行中は**削除せず、他の
> 項目と同じ1〜2行に縮めて残す**（どこまで洗い出したかの記録として一覧の価値があるため）。
> **消すのは親項目（洗い出しフェーズ自体）が完了した時に一括**：1件ずつ消すと「どこまで
> 済んだか」の一覧性が失われるため。詳しい経緯は消す時のコミットメッセージへ（本文を厚く
> 書いてよい）。未着手フォルダは`[ ]`の明示リストを持つ（`ls sn_gallery/public/prj/`との
> 毎回の目視突き合わせをしない。1件終えたらそのフォルダ名をこのリストから消し、上の`[x]`へ）。

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
      bluesnovel未対応のタグ・機能を洗い出すフェーズへ。2026-08-21、`top`から着手（コアタグ系→
      プラグイン系の優先順）。詳細はコミットメッセージ参照、以下はフォルダ名と要点のみ：
  - [x] `ch_button`：[button]label/fn両省略時throw、`[prj.json init.bg_color]`未反映を修正
  - [x] `[link]`ホバー：本家一致確認（コード変更無し）。文字レイヤ既定font-sizeを24pxへ修正
  - [x] `[event key='dom=セレクタ']`（コロン無し）がメイン文書対象にならない不具合を修正
  - [x] `sn_gallery/index.html`のマウント先`<canvas>`→`<div>`に修正
  - [x] `[button]`の`arg`属性が`&sn.eventArg`へ渡らない不具合を修正
  - [x] `wheel.y<0`/`gamepadconnected`：本家自体が死んでいる記法のため対応不要と判断
  - [x] ステージ拡大の`isGallery`分岐が丸ごと未実装だった不具合を実装
  - [x] `[lay]`のstyle属性が特定のシーン遷移後に丸ごと消える不具合を修正
  - [x] `ruby`：`isGallery`分岐が広い画面で本家より過剰拡大していたバグを修正
  - [x] `ruby`の残り（tcy幅・r_align）：本家一致確認（コード変更無し）
  - [x] `filter`：タイトル未更新、[button]文字ボタンの重なり表示を修正
  - [x] `blendmode`：`[add_lay]`自身のfn/blendmode等の属性が反映されない不具合を修正
  - [x] `tag_tsy`：`[wait_tsy]`待機中に`[button call=true]`が反映されない不具合を修正
  - [x] `tag_lay_face`：`[fg face=]`差分絵へのアニメpngシート指定が壊れる不具合を修正
  - [x] `tag_lay_mov`：本家一致確認（コード変更無し）
  - [x] `sound`：arg省略時に`&sn.eventLabel`が常にundefinedになる不具合を修正
  - [x] `anime_png`：`[graph]`本文中画像のアニメpngシートが文字サイズへ縮小されない不具合を修正
  - [x] `anon_label`：本家一致確認（コード変更無し）
  - [x] `debug`：`[link]`の既定赤背景ハイライトが欠落していた不具合を修正
  - [x] `escape`：エスケープ文字直後の`《…》`がルビ記法に誤解釈される不具合を修正
  - [x] `frame`：本家一致確認（コード変更無し）
  - [x] `import`：本家一致確認（バグ無し。文字レイヤ幅70%既定でリンクがクリック不能になる実害を確認、見送り継続）
  - [x] `tag_page`：`[event key=… arg=…]`でargが握りつぶされる不具合を修正
  - [x] `mul_ev`：[trans]対象外レイヤ複製でvideo要素が2重化し`[wv]`が進まなくなる不具合を修正。
        「`p`で始まる7パターン」も本家バグ（トゥイーン枠共有起因）の非該当をE2Eで実測確認済み
        （詳細は本項目を消すコミットのメッセージ参照）
  - [x] `top`：上記`[link]`ホバー〜`[lay]`style消える等一連の不具合はここ（ギャラリー本体の
        メニュー画面）を突き合わせて発見したもの
  - [x] 凍結：`3d_base`/`3d_efk`/`3d_gltf`/`3d_theta`/`77slide`
  - [ ] 残り未着手フォルダ（2026-08-23、`ls sn_gallery/public/prj/`と上記`[x]`を突き合わせて
        洗い出し。以後はこの`[ ]`を消す形で進捗管理する——毎回全件再突き合わせをしない）：
        `ch_in_out`/`cubism3_layer`/
        `emote_layer`/`ext_fg`/`ext_fg2`/`ext_for_call`/`font`/`glsl_slide`/`icons`/`kidoku`/
        `let_zenkaku`/`line_breaking_rules`/`log_and_play`/`multiline`/`simple_novel`/`tag_if`/
        `tag_quake`/`txt_back`/`txt_back2`
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
- [ ] 文字レイヤの既定幅70%（本家はステージ幅いっぱい）：`ch_button`/`sound`/`import`のsn_gallery実機比較で繰り返し発見された意図的な既定差。`import`では実際にリンクがクリック不能になる実害を確認済みだが、全プロジェクトの文字レイヤに影響するため見送り継続

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
