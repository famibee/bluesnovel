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

- [ ] **文字組みの残り**
  - [ ] ルビ付き行が1つ前の行/列に重なる問題は`margin-block-start`補正で解消したが、行間そのものは
        ルビ行だけ広がったまま（CSSの`<ruby>`任せ）。対称に配分するCSS調整では治らない
        （前後どちらかに寄せて配分しても「ルビ行だけ行送りが違う」不揃いさ自体は消えない）。
        本当に直すには全行の行送りをルビ想定の高さで最初から均一に確保する設計が要り、
        「行」を扱う基盤が無い現状では`max_row`実装と同時にやるのが筋（詳細はセッション
        2026-08-10のCHANGELOG.md参照）
- [ ] **フィルターの残り**：本家22種のうち`noise`以外の21種に対応済み（CSSの`filter`が9種、SVGの`feColorMatrix`が12種。`src/ts/Filter.ts`）。サンプル <https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/filter>
  - [ ] ギャラリーの`filter`サンプルと実機で見比べ、色の出方が本家と揃っているか確認（pixiはシェーダ、こちらはSVGフィルタなので端の丸めが違いうる）
- [ ] **組み込み変数の残り**
  - [ ] `const.sn.lay[N].<fore|back>.width/.height`は`[lay width=/height=]`で明示したレイヤはその値を返すが、未指定レイヤは依然「表示物の有無」を1/0で代用中。実寸そのものが要る用途が出たら描画側から集める設計に
  - [ ] **sys:変数は読み書きも保存もできるが、その値を使う機能が無いものが多い**（`const.sn.nativeWindow.*`が残り。`sn.sound.*`基準音量・`global_volume`・`sn.sound.BGM.vol_mul_talking`・`sn.sound.movie_volume`・`sn.tagCh.*`・`TextLayer.Back.Alpha`・`const.sn.aPageLog`は接続済み）。docs/dev.htmlで🟡。各層の実装時に繋ぐ
- [ ] **`[set_focus]`の残り**：ゲームパッド対応（本家`FocusMng`の`range`のstepUp/Down、テキストのカーソル移動、ラジオボタンの選択移動）。ゲームパッド入力そのものが未着手なので同時に
- [ ] `[dump_script]`（本家はVSCode拡張との連携）
- [ ] `max_row`（最大行数を超えたら自動改ページ）・`break_fixed`系。禁則文字の指定（`kinsoku_sol`/`kinsoku_eol`/`kinsoku_dns`/`kinsoku_bura`）は本家`Hyphenation.ts`を移植して対応済み（`src/ts/Hyphenation.ts`）。`break_fixed`系は`[l]`/`[p]`待ちマーカーの位置決め用だが、bluesnovelは待ちマーカーをReactの兄弟spanで別管理しているため用途が無く対象外。`r_size`（ルビサイズ）は本家にもない属性で、`r_style="font-size:…"`で代替できるため専用属性は追加しない
- [ ] `[link]`の残り：`onenter`/`onleave`（本家はラベルをコールし`[return]`で戻る仕様。素朴に`[button call=true]`と同じ経路（`callToLabel`→通常のstep実行継続）を流用すると、マウスが乗っただけで本編が読み進んでしまうバグになる——`[return]`後にそのまま次のトークンへ進む設計のため。正しく作るには「サブルーチンを`[return]`まで走らせたらそこで止め、読み進めには使わない」専用の実行経路をエンジンに新設する必要があり、`[button]`と共通の中規模な追加実装になる。`global`は対応済み（受理はするが効果を持たない扱いで決着。理由はdocs/tag.htmlの`[link]`欄）

## 挙動の詰め・実機確認

- [ ] **アプリ（Electron）版のウインドウ位置復元・electron-store化・`app://`パッケージ版読み込みを実機で確認**（サンドボックス環境にディスプレイが無くGUI起動できず未検証。ロジックは型チェック・単体テスト・E2E（ブラウザ版のみ）でしか確認していない）
  - [ ] `tmp_blues`等で`npm run app`起動（dev、`app://`登録が邪魔していないか）→ウインドウを動かして閉じる→再起動して同じ位置・大きさで開くか
  - [ ] Electronの`userData`直下に`<save_ns>.json`（electron-storeのファイル）が作られ、しおり・sys:・既読が正しく読み書きされるか（`[save]`/`[load]`一式）
  - [ ] `npm run app_bld`→`out/`起動、`npm run pkg:mac`→パッケージ版で`app://bundle/index.html`が開き、`prj.json`/`path.json`/シナリオ/画像/音声/フォント/`[add_frame]`のiframeが読めるか（`file://`のままだと`fetch`がスキームを受け付けず起動できなかった問題への対応。DevTools Consoleにエラーが出ていないことも）
- [ ] `test/e2e/pic.e2e.ts`の`[lay fn=…]がpath.json経由で解決され、画像が表示される`が時々`naturalWidth`を0で読んで落ちる（既存のflaky。暗号化アセット対応の作業中に発見、`git stash`で変更前コードに戻しても再現するので無関係。`beforeEach`直後に読みに行くタイミング依存と見られる）
- [ ] 文字送りの速さを実機（`tmp_blues`）で確認。1文字あたりの遅れは`sys:sn.tagCh.msecWait`（既定10ms）、1文字のアニメ時間は`[ch_in_style]`の`default`（既定500ms）で、どちらも本家の既定値にした
- [ ] 全画面時の見た目（中央寄せは実装済み）を実機で確認
- [ ] グループ位置指定/移動（face合成した画像群を1つの単位として、デザインモードで位置調整・移動する仕様の検討）
  - [ ] デザインモードでのMoveableリサイズ時、差分画像（face）は`dx`/`dy`が絶対px指定のため拡大縮小に追随しない（`GrpLayer.tsx`）
  - [ ] 本家のように「`face`のみ指定して直前の`fn`を維持する」独立更新には未対応

## アセット・基盤

- [ ] `tmp_esm_uc/doc/prj/`の実アセットで通す（`prj.json`/`path.json`はそのまま使えるはず）
- [ ] npmリリース処理を`skynovel_esm`に合わせる。`semantic-release`本体が依存に無く、`.github/workflows`も未整備

## 保留・優先度低

- [ ] `render=`トゥイーン（pixi前提なので保留）
- [ ] 縦書き時の行数・余白が本家と完全一致ではない：`[lay pl=/pr=/pt=/pb=]`は配線済みになったが、本家のborder-box解釈までは揃えていない（`content-box`のまま。理由はCHANGELOG.md参照）。厳密な行数一致はブラウザの自動折返しと本家のRange計測ベース折返しの差もあり達成が難しく、実用上の近似止まりでよい
- [ ] フィルターの`noise`はCSSにもSVGの単純な組合せにも無いので、対応するならcanvas等で別途。<https://ics.media/entry/241122/> が参考になるかも
- [ ] 【現状不使用・優先順位低】アニメpng（スプライトシート）：文字レイヤの枠画像（`[lay b_pic=…]`）でのシート再生。今はCSSの背景画像に直接URLを入れているので、.jsonが来ると絵が出ない
- [ ] フレーム内幅が本家960に対しこちら1024なので bootstrap の`row-cols`が1列多くなる（不具合ではない）。合わせるならステージ実寸とフレーム幅の関係を再検討
- [ ] **デザインモードは無効化中**（`Stage.tsx`の`ENA_DESIGN_MODE = false`）。長押しで入れてしまうが、中で触れるのはレイヤの位置・サイズだけで、触った結果をシナリオへ書き戻す先が無い。本家機能の大部分（音声・履歴・文字演出）が揃い、「調整→保存」の行き先を決めてから戻す
- [ ] **ESLintは塩漬け中**。`typescript-eslint`（8.65.0時点で最新）がTS 7非対応と明示的にthrowする（[issue #10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940)）ため、`eslint.config.mts`を置いてもVSCode拡張は動かない。パーサが無いと`.ts`を解析できないので回避策も無し。TS 7.1対応が出たら復活する。`@typescript/typescript6`は`import ts6 from '@typescript/typescript6'`と明示的に書けるツールにしか効かず、`require('typescript')`決め打ちのtypescript-eslintには届かない（bunの`resolutions`によるネスト解決も無視される）
  - [ ] 復活したら`eslint-plugin-import`（2.32.0のまま更新停止、ESLint 10対応PRが未マージ）を`eslint-plugin-import-x`へ切替。peerDependencyがESLint 10を公式サポート済みで移行も軽微（このリポジトリの`import/no-unresolved: 'off'`1行だけ`import-x/`にプレフィックスを変える程度）。本家`skynovel_esm`もeslint関連が全く同じバージョン構成・同じ1行なので同時に対応可能

## 凍結

- [ ] `[ch_out_style]`の適用（定義と`[lay out_style=]`・`[span ch_out_style=]`は受け付けるが、消去のアニメをまだ行なっていない＝本家の既定`wait=0`と同じ結果）。文字が消えるのはページ切替や`[er]`でReactが要素を捨てる場面なので、消えていく間だけ古い文字を生かす仕組みが要る。出現演出（`src/ts/ChStyle.ts`）とは別の作りになる
- [ ] `[trans]`の`delay=`・`ease=`（進度は常に等速）・`glsl=`（自前シェーダ）：現状使用していないため未実装のまま凍結。`glsl=`はWebGLを使わないため実現しようがないので対象外
- [ ] `[quake]`の`delay`/`repeat`/`ease`/`yoyo`は本家でも揺れ幅がランダムで効かないため見送り
