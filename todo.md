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

## 挙動の詰め・実機確認

- [ ] **縦書きで禁則により送られた文字の2文字目グリフが描画されないことがある不具合**：`tmp_blues`
      実機で`ss_000.sn:24`（分割禁止文字「─」の対「──」が禁則で次の列頭へ送られる箇所）を確認した
      ところ、送られた対の2文字目がDOM上は存在し座標・`opacity`・`font-*`系computedStyleもすべて
      前後の（正常に描画される）同じ「─」文字と完全一致するのに、グリフだけが描画されない（列内に
      1文字ぶんの空白に見える）。`tmp_esm_uc`（本家）の同じ箇所は実機確認では再現しない（詳細は
      CHANGELOG.md 2026-08-17参照。優先度低の「縦書き時の行数・余白が本家と完全一致ではない」＝
      折り返し**位置**そのものの差とは別の、**描画**が欠落する不具合）。切り分け済み：
        - 対象spanへの`textContent`書き換え・`display:none↔inline-block`トグル・`opacity`トグル・
          `transform`除去、いずれを試しても再現後は直らない（＝取りこぼしたペイントの単純な
          再フラッシュでは直らない）
        - 最小HTML再現（同じ`.sn_ch`相当スタイル・`writing-mode: vertical-rl`・`<br>`直後に
          「──」）は**システムフォントでは再現せず**。実アプリはプロジェクト同梱フォント`ipamjm`を
          使うため、フォント固有の縦書きグリフ差し替え（OpenTypeの`vert`/`vrt2`）絡みを疑っている
          が未検証
        - 同じ「─」文字でも禁則の影響を受けない箇所（同じページの別の「──」）では正常に描画される
          →文字そのものでも禁則ロジック（`src/ts/Hyphenation.ts`、`test/Hyphenation.test.ts`で
          本家とのパリティ確認済み）でもなく、特定の1インスタンスに限った描画欠落と判明
      - 再現手順：`tmp_blues`で`npm run web`→タイトル「最初から」→クリックで`ss_000.sn`冒頭を
        読み進め、「…千里眼のやうに思ひ浮んで来るのか」の次の列（「──お前はそれが…」）の先頭を確認
      - 分割禁止で対が`<br>`を跨がないこと自体（DOM構造）は`test/e2e/kinsoku.e2e.ts`「実データ回帰」
        に回帰テスト済み（2026-08-17）。ただし上記はDOM構造でなく**描画**の欠落なので、現状のDOM
        検証テストでは検知できない（ピクセル比較の仕組みが要る）
- [ ] **アプリ（Electron）版の`app://`パッケージ版読み込みを実機で確認**（サンドボックス環境にディスプレイが無くGUI起動できず未検証。ロジックは型チェック・単体テスト・E2E（ブラウザ版のみ）でしか確認していない。ウインドウ位置復元・electron-store化は実機確認済み＝CHANGELOG.md 2026-08-12参照）
  - [ ] `npm run app_bld`→`out/`起動、`npm run pkg:mac`→パッケージ版で`app://bundle/index.html`が開き、`prj.json`/`path.json`/シナリオ/画像/音声/フォント/`[add_frame]`のiframeが読めるか（`file://`のままだと`fetch`がスキームを受け付けず起動できなかった問題への対応。DevTools Consoleにエラーが出ていないことも）。electron-builderのビルド自体（`unable to copy, file is symlinked outside the package`エラー）は原因判明・解消確認済み（`tmp_blues`の`file:../bluesnovel`ローカル依存によるシンボリックリンクが原因で、npm公開後は自然に解消する見込み。詳細はCHANGELOG.md 2026-08-12参照）。残るのはパッケージ版を実機で開いての動作確認のみ
- [ ] 文字送りの速さを`tmp_blues`実機（実アセット）で体感確認。`sys:sn.tagCh.msecWait`（既定10ms）・
      `[ch_in_style]`の`default`（既定500ms）が仕様通り動くことはE2Eフィクスチャでの数値検証
      （GSAPタイムライン凍結→時刻ごとの`opacity`/`transform`確認）で済んでいる（詳細はCHANGELOG.md
      2026-08-10参照）。残っているのは実アセット・実際の読書体感としての確認

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

## アセット・基盤

- [ ] npmリリース処理を`skynovel_esm`に合わせる（2026-08-10調査、詳細はCHANGELOG.md参照）：
  - `skynovel_esm`は`semantic-release`から**`release-please`へ移行済み**（`.github/workflows/release-please.yml`+`publish.yml`、`release-please-config.json`、npm Trusted Publishing/OIDC）。本CLAUDE.mdの「semantic-release＋conventionalcommits」の記述は古い
  - bluesnovelの`package.json`にはsemantic-release用の`release`設定と`@semantic-release/changelog`/`@semantic-release/git`だけが中途半端に残存（本体`semantic-release`パッケージは無い）。release-please化するなら要削除
  - **`CHANGELOG.md`の手動運用（todo.md完了項目を日付見出し＋経緯付きで移す）とrelease-pleaseの自動書き換えが衝突する**ため、着手前に運用を決める必要あり（自動生成を別ファイルに逃がすか、手動運用をやめるか）
  - GitHub App作成・`RELEASE_APP_CLIENT_ID`/`RELEASE_APP_PRIVATE_KEY`登録・npm側Trusted Publishing設定はGitHub/npmjs.org管理画面での作業が要る（エージェント側では完結しない）

## 優先度低

- [ ] 縦書き時の行数・余白が本家と完全一致ではない：`[lay pl=/pr=/pt=/pb=]`は配線済みになったが、本家のborder-box解釈までは揃えていない（`content-box`のまま。理由はCHANGELOG.md参照）。厳密な行数一致はブラウザの自動折返しと本家のRange計測ベース折返しの差もあり達成が難しく、実用上の近似止まりでよい（実例：`ss_000.sn:24`の折返しが3列目で1文字ぶんズレる件を実機比較で確認済み、詳細はCHANGELOG.md 2026-08-12参照）
- [ ] フィルターの`noise`はCSSにもSVGの単純な組合せにも無いので、対応するならcanvas等で別途。<https://ics.media/entry/241122/> が参考になるかも
- [ ] 【現状不使用・優先順位低】アニメpng（スプライトシート）：文字レイヤの枠画像（`[lay b_pic=…]`）でのシート再生。今はCSSの背景画像に直接URLを入れているので、.jsonが来ると絵が出ない
- [ ] フレーム内幅が本家960に対しこちら1024なので bootstrap の`row-cols`が1列多くなる（不具合ではない）。合わせるならステージ実寸とフレーム幅の関係を再検討

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
- [ ] **ルビ付き行の行間不揃い**：ルビ行が1つ前の行/列に重なる問題は`margin-block-start`補正で
      解消したが、行間そのものはルビ行だけ広がったまま（CSSの`<ruby>`任せ）。対称に配分するCSS
      調整では治らない（前後どちらかに寄せて配分しても「ルビ行だけ行送りが違う」不揃いさ自体は
      消えない）。全spanへ一律でルビ想定の余白を強制すれば行間は揃うことを実機確認済み
      （2026-08-12、`test/e2e/app/prj_ruby`をPlaywrightで強制折返しさせ比較）だが、それだとルビの
      無い地の文の行間まで常時間延びするだけなので不採用と判断。「ルビがある行だけ」を判別して
      広げるには「行」を扱う基盤が要り、現状では実装できない（`max_row`と同時実装できれば
      ……という目算だったが、`max_row`は本家でも死んでいる属性と判明したため凍結行き＝
      道連れの実装機会も無い）。2026-08-12に本家`TxtStage.ts`/`TxtLayer.ts`側の行送り実装も確認
      したが、本家も同じHTML `<ruby>`任せのレンダリングで、行間不揃いを個別に解消する専用ロジック
      は存在しない（`#lh_half`はgの下端欠け対策で別問題）。本家にも解決策が無いと判明したため
      凍結（詳細はセッション2026-08-10・2026-08-12のCHANGELOG.md参照）
