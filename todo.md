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

- [ ] **`[lay b_pic=…]`の残り**：枠画像に合わせた文字表示領域の自動サイズ調整（本家`setMySize()`）。`[lay width=/height=]`自体が未実装なのが前提として要る。テンプレは`style=`でwidth/heightを明示するので実害は出ていない。`b_left`/`b_top`は調査の結果、本家`#drawBack()`が一切読んでおらず**実質未配線**と判明（実プロジェクトのシナリオ（`tmp_esm_uc/doc/prj/theme/title.sn`）が指定していても本家上で効いていない）ので、bluesnovel側でも対応不要と判断
- [ ] **しおり・システム系の残り**
  - [ ] **暗号化の残り（第3〜4段階）**：セーブデータの暗号化と画像・動画アセットの暗号化（`decAB`・Blob URL化・`GrpLayer.tsx`の拡張子スニッフィング修正）は完了（CHANGELOG参照）。残りは下記
    - [ ] 音声・アニメpngシート・`[add_frame]`のHTML/フレーム内画像
    - [ ] E2Eフィクスチャ生成（本家`mkPrjCrypto.mjs`相当）＋改竄検査の実証。暗号化mp4はffmpeg依存が重いので対象外
  - [ ] 一般プラグインの配線（`addTag`/`addLayCls`/`getInfo`/`getVal`/`resume`/`render`/`searchPath`）。`[loadplugin]`がCSS専用で受け皿が無いため今回は`T_PluginInitArg`から外した
  - [ ] `arg.dip`がどこからも参照されていない（`web.ts`/`app.ts`で渡すだけ）
  - [ ] `[snapshot]`の残り：**HTMLフレームの中身が写らない**（`<img>`化したSVGはiframeを描画しないというブラウザ側の制約。本家web版も同じ結果）
  - [ ] **アプリ（Electron）版の残り**。`src/app.ts`（`SysApp`）は**ウインドウが出て本編が動くところまで**実装済み（`getInfo`→Config→`inited`）。`[close]`／`[window]`も接続済み。残りは下記
    - [ ] `[update_check]`の実処理（本家`SysApp.ts:306`。`_index.json`／`.yml`の取得・版比較・ダイアログ・ダウンロード・sha512検証）
  - [ ] `[dump_script]`（本家はVSCode拡張との連携）
- [ ] **トゥイーンの残り**：`width`/`height`（レイヤ属性側に無い。`[lay width=/height=]`自体が未実装なのが前提）・`render=`（pixi前提なので保留）
- [ ] **文字組みの残り**
  - [ ] `max_row`（最大行数を超えたら自動改ページ）・`break_fixed`系。**行分割そのものはブラウザ任せ**にした帰結で、禁則文字の指定（`kinsoku_sol`/`kinsoku_eol`/`kinsoku_dns`/`kinsoku_bura`）も渡す手段が無い。ギャラリーの`line_breaking_rules`と実機で見比べ、必要なら本家`Hyphenation.ts`のような自前計算へ寄せる。`r_size`（ルビサイズ）は本家にもない属性で、`r_style="font-size:…"`で代替できるため専用属性は追加しない
  - [ ] `bura`はChromeが`hanging-punctuation`未対応なので実質Safariのみ効く
  - [ ] ルビ付き行の行間が広がる（CSSの`<ruby>`任せ）。`ruby-position`等の詰めは縦書き・`max_row`と合わせて
  - [ ] 縦書き時の行数・余白が本家と完全一致ではない（`padding`の解釈差）
  - [ ] `[span]`/`[ch]`/`[link]`/`[tcy]`/`[graph]`共通の残り属性：`layer`/`page`（今は既定文字レイヤの表ページ固定）
  - [ ] `[link]`の残り：`onenter`/`onleave`（本家はラベルをコールし`[return]`で戻る仕様。素朴に`[button call=true]`と同じ経路（`callToLabel`→通常のstep実行継続）を流用すると、マウスが乗っただけで本編が読み進んでしまうバグになる——`[return]`後にそのまま次のトークンへ進む設計のため。正しく作るには「サブルーチンを`[return]`まで走らせたらそこで止め、読み進めには使わない」専用の実行経路をエンジンに新設する必要があり、`[button]`と共通の中規模な追加実装になる。`global`は対応済み（受理はするが効果を持たない扱いで決着。理由はdocs/tag.htmlの`[link]`欄）
- [ ] **フィルターの残り**：本家22種のうち`noise`以外の21種に対応済み（CSSの`filter`が9種、SVGの`feColorMatrix`が12種。`src/ts/Filter.ts`）。サンプル <https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/filter>
  - [ ] `noise`はCSSにもSVGの単純な組合せにも無いので、対応するならcanvas等で別途。<https://ics.media/entry/241122/> が参考になるかも
  - [ ] ギャラリーの`filter`サンプルと実機で見比べ、色の出方が本家と揃っているか確認（pixiはシェーダ、こちらはSVGフィルタなので端の丸めが違いうる）
- [ ] **アニメpng（スプライトシート）の残り**
  - [ ] 【現状不使用・優先順位低】文字レイヤの枠画像（`[lay b_pic=…]`）でのシート再生。今はCSSの背景画像に直接URLを入れているので、.jsonが来ると絵が出ない
- [ ] **`[ch_out_style]`の適用**（定義と`[lay out_style=]`・`[span ch_out_style=]`は受け付けるが、消去のアニメをまだ行なっていない＝本家の既定`wait=0`と同じ結果）。文字が消えるのはページ切替や`[er]`でReactが要素を捨てる場面なので、消えていく間だけ古い文字を生かす仕組みが要る。出現演出（`src/ts/ChStyle.ts`）とは別の作りになる
- [ ] **組み込み変数の残り**
  - [ ] `const.sn.lay[N].<fore|back>.width/.height`は実寸ではなく「表示物の有無」を1/0で代用中。実寸が要る用途が出たら描画側から集める設計に
  - [ ] `save:const.sn.layer.（文字レイヤ名）.enabled`
  - [ ] **sys:変数は読み書きも保存もできるが、その値を使う機能が無いものが多い**（`const.sn.nativeWindow.*`が残り。`sn.sound.*`基準音量・`global_volume`・`sn.sound.BGM.vol_mul_talking`・`sn.sound.movie_volume`・`sn.tagCh.*`・`TextLayer.Back.Alpha`・`const.sn.aPageLog`は接続済み）。docs/dev.htmlで🟡。各層の実装時に繋ぐ
- [ ] **`[set_focus]`の残り**：ゲームパッド対応（本家`FocusMng`の`range`のstepUp/Down、テキストのカーソル移動、ラジオボタンの選択移動）。ゲームパッド入力そのものが未着手なので同時に
- [ ] 【凍結】`[trans]`の`delay=`・`ease=`（進度は常に等速）・`glsl=`（自前シェーダ）：現状使用していないため未実装のまま凍結。`glsl=`はWebGLを使わないため実現しようがないので対象外
- [ ] 【凍結】`[quake]`の`delay`/`repeat`/`ease`/`yoyo`は本家でも揺れ幅がランダムで効かないため見送り

## 挙動の詰め・実機確認

- [ ] **アプリ（Electron）版のウインドウ位置復元・electron-store化・`app://`パッケージ版読み込みを実機で確認**（サンドボックス環境にディスプレイが無くGUI起動できず未検証。ロジックは型チェック・単体テスト・E2E（ブラウザ版のみ）でしか確認していない）
  - [ ] `tmp_blues`等で`npm run app`起動（dev、`app://`登録が邪魔していないか）→ウインドウを動かして閉じる→再起動して同じ位置・大きさで開くか
  - [ ] Electronの`userData`直下に`<save_ns>.json`（electron-storeのファイル）が作られ、しおり・sys:・既読が正しく読み書きされるか（`[save]`/`[load]`一式）
  - [ ] `npm run app_bld`→`out/`起動、`npm run pkg:mac`→パッケージ版で`app://bundle/index.html`が開き、`prj.json`/`path.json`/シナリオ/画像/音声/フォント/`[add_frame]`のiframeが読めるか（`file://`のままだと`fetch`がスキームを受け付けず起動できなかった問題への対応。DevTools Consoleにエラーが出ていないことも）
- [ ] `test/e2e/pic.e2e.ts`の`[lay fn=…]がpath.json経由で解決され、画像が表示される`が時々`naturalWidth`を0で読んで落ちる（既存のflaky。暗号化アセット対応の作業中に発見、`git stash`で変更前コードに戻しても再現するので無関係。`beforeEach`直後に読みに行くタイミング依存と見られる）
- [ ] オート読み・既読スキップの残課題
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

- [ ] 画像の**先読み**（本家`SpritesMng`）は未対応。`<img>`のsrcを差し替えるだけなので切替時に一瞬空白になりうる。実機で要確認
- [ ] `tmp_esm_uc/doc/prj/`の実アセットで通す（`prj.json`/`path.json`はそのまま使えるはず）
- [ ] 暗号化アセット（`sys.arg.crypto`／`sys.dec()`）。本家は`Loader`で復号してBlob URLへ差し替える。`[add_frame]`のHTMLとフレーム内画像も同じ仕組み
- [ ] 【低優先度・技術的負債】`parsimmon`（README「UNMAINTAINED」明記、2021-12から更新停止）への依存を外す。使用箇所は`src/ts/ExprEval.ts`1ファイルのみで、優先順位クライミング（PREFIX/POSTFIX/BINARY_LEFT/BINARY_RIGHT）は既に自前実装済み。parsimmonが担っているのは正規表現マッチ・`alt`によるバックトラック・`lazy`による再帰・`seq`/`seqMap`の逐次合成という基礎部分のみで依存範囲が狭いため、他のパーサコンビネータ（parjs/ts-parsec等、これらも小規模で同種のリスクを抱える）へ乗り換えるより、howlerを外して自前Web Audio層にした`SndMng.ts`と同じ判断で**手書きのPratt parserに置き換えて依存自体を無くす**のが筋が良い。ただし現状動作に実害は無いので緊急対応は不要
- [ ] npmリリース処理を`skynovel_esm`に合わせる。`semantic-release`本体が依存に無く、`.github/workflows`も未整備
- [ ] **ESLintは塩漬け中**。`typescript-eslint`（8.65.0時点で最新）がTS 7非対応と明示的にthrowする（[issue #10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940)）ため、`eslint.config.mts`を置いてもVSCode拡張は動かない。パーサが無いと`.ts`を解析できないので回避策も無し。TS 7.1対応が出たら復活する。`@typescript/typescript6`は`import ts6 from '@typescript/typescript6'`と明示的に書けるツールにしか効かず、`require('typescript')`決め打ちのtypescript-eslintには届かない（bunの`resolutions`によるネスト解決も無視される）
  - [ ] 復活したら`eslint-plugin-import`（2.32.0のまま更新停止、ESLint 10対応PRが未マージ）を`eslint-plugin-import-x`へ切替。peerDependencyがESLint 10を公式サポート済みで移行も軽微（このリポジトリの`import/no-unresolved: 'off'`1行だけ`import-x/`にプレフィックスを変える程度）。本家`skynovel_esm`もeslint関連が全く同じバージョン構成・同じ1行なので同時に対応可能
