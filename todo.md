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

- [ ] 左ボタンでのフォーカス移動は順番通りだが、右ボタンだと本文フォーカスから先に進まない。キーボードの矢印キーでも再現
  - 端的な再現方法。右ボタン一回で本文からシステムボタンへ。左ボタン一回で本文、この状態で右ボタン一回を押しても、さっきフォーカスが移った先のボタンへ移動しない
  - ↑の調査で分かったこと：`[l]`/`[p]`待ちマーカーは`ArrowRight`/`ArrowLeft`を押すたび（自分がフォーカス対象か否かに関わらず、まだ同じ`[l]`/`[p]`で止まっている間ずっと）`FocusMng`の輪から`remove()`→`add()`され直しており、`add()`は常に`#aEl`の**末尾**へ積む（`FocusMng.ts:102`）。マーカーが輪の途中にいる構成だと、キーを押すたびに輪の並び順が崩れていく可能性がある。今回のフォーカス消失修正（CHANGELOG.md 2026-08-11参照）とは別に、この「並び順が動く」こと自体が本件の原因になっていないか、次回はここから疑う
- [ ] **アプリ（Electron）版のウインドウ位置復元・electron-store化・`app://`パッケージ版読み込みを実機で確認**（サンドボックス環境にディスプレイが無くGUI起動できず未検証。ロジックは型チェック・単体テスト・E2E（ブラウザ版のみ）でしか確認していない）
  - [ ] `tmp_blues`等で`npm run app`起動（dev、`app://`登録が邪魔していないか）→ウインドウを動かして閉じる→再起動して同じ位置・大きさで開くか
  - [ ] Electronの`userData`直下に`<save_ns>.json`（electron-storeのファイル）が作られ、しおり・sys:・既読が正しく読み書きされるか（`[save]`/`[load]`一式）
  - [ ] `npm run app_bld`→`out/`起動、`npm run pkg:mac`→パッケージ版で`app://bundle/index.html`が開き、`prj.json`/`path.json`/シナリオ/画像/音声/フォント/`[add_frame]`のiframeが読めるか（`file://`のままだと`fetch`がスキームを受け付けず起動できなかった問題への対応。DevTools Consoleにエラーが出ていないことも）
- [ ] 文字送りの速さを`tmp_blues`実機（実アセット）で体感確認。`sys:sn.tagCh.msecWait`（既定10ms）・
      `[ch_in_style]`の`default`（既定500ms）が仕様通り動くことはE2Eフィクスチャでの数値検証
      （GSAPタイムライン凍結→時刻ごとの`opacity`/`transform`確認）で済んでいる（詳細はCHANGELOG.md
      2026-08-10参照）。残っているのは実アセット・実際の読書体感としての確認

## タグ・変数の残り

- [ ] **文字組みの残り**
  - [ ] ルビ付き行が1つ前の行/列に重なる問題は`margin-block-start`補正で解消したが、行間そのものは
        ルビ行だけ広がったまま（CSSの`<ruby>`任せ）。対称に配分するCSS調整では治らない
        （前後どちらかに寄せて配分しても「ルビ行だけ行送りが違う」不揃いさ自体は消えない）。
        本当に直すには全行の行送りをルビ想定の高さで最初から均一に確保する設計が要り、
        「行」を扱う基盤が無い現状では`max_row`実装と同時にやるのが筋（詳細はセッション
        2026-08-10のCHANGELOG.md参照）
- [ ] **フィルターの残り**：本家22種のうち`noise`以外の21種に対応済み（`src/ts/Filter.ts`）。サンプル <https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/filter>
  - [ ] `predator`/`color_tone`は実機比較でやや色味に差が出た（本家と同じ行列のはずだが原因未特定。優先度低）
- [ ] **組み込み変数の残り**
  - [ ] `const.sn.lay[N].<fore|back>.width/.height`は`[lay width=/height=]`で明示したレイヤはその値を返すが、未指定レイヤは依然「表示物の有無」を1/0で代用中。実寸そのものが要る用途が出たら描画側から集める設計に
- [ ] `max_row`（最大行数を超えたら自動改ページ）・`break_fixed`系。禁則文字の指定（`kinsoku_sol`/`kinsoku_eol`/`kinsoku_dns`/`kinsoku_bura`）は本家`Hyphenation.ts`を移植して対応済み（`src/ts/Hyphenation.ts`）。`break_fixed`系は`[l]`/`[p]`待ちマーカーの位置決め用だが、bluesnovelは待ちマーカーをReactの兄弟spanで別管理しているため用途が無く対象外。`r_size`（ルビサイズ）は本家にもない属性で、`r_style="font-size:…"`で代替できるため専用属性は追加しない

## アセット・基盤

- [ ] `tmp_blues/doc/prj/`の実アセットで通す（`prj.json`/`path.json`はそのまま使えるはず。最近`src/main/main.ts`に本家との相違が生じたため要確認）
  - [ ] タイトル画面→「最初から」ボタン（`theme/title.sn`の`*start`→`[jump fn=ss_000]`）→本文開始→ゲーム内メニューから「タイトルに戻る」（`frames/_submenu.sn`の`*title`→`[jump fn=title]`）でタイトルに戻ってこられるか、実機で一連の実行テスト
- [ ] npmリリース処理を`skynovel_esm`に合わせる（2026-08-10調査、詳細はCHANGELOG.md参照）：
  - `skynovel_esm`は`semantic-release`から**`release-please`へ移行済み**（`.github/workflows/release-please.yml`+`publish.yml`、`release-please-config.json`、npm Trusted Publishing/OIDC）。本CLAUDE.mdの「semantic-release＋conventionalcommits」の記述は古い
  - bluesnovelの`package.json`にはsemantic-release用の`release`設定と`@semantic-release/changelog`/`@semantic-release/git`だけが中途半端に残存（本体`semantic-release`パッケージは無い）。release-please化するなら要削除
  - **`CHANGELOG.md`の手動運用（todo.md完了項目を日付見出し＋経緯付きで移す）とrelease-pleaseの自動書き換えが衝突する**ため、着手前に運用を決める必要あり（自動生成を別ファイルに逃がすか、手動運用をやめるか）
  - GitHub App作成・`RELEASE_APP_CLIENT_ID`/`RELEASE_APP_PRIVATE_KEY`登録・npm側Trusted Publishing設定はGitHub/npmjs.org管理画面での作業が要る（エージェント側では完結しない）

## 優先度低

- [ ] `render=`トゥイーン（pixi前提なので保留）
  -> 【絵を合成してから不透明度を適用するように（半透明時に差分境界が見えなくなる）】のが要求仕様であり、pixiは関係ない
    https://famibee.github.io/skynovel_esm/tag.html#trans
- [ ] 縦書き時の行数・余白が本家と完全一致ではない：`[lay pl=/pr=/pt=/pb=]`は配線済みになったが、本家のborder-box解釈までは揃えていない（`content-box`のまま。理由はCHANGELOG.md参照）。厳密な行数一致はブラウザの自動折返しと本家のRange計測ベース折返しの差もあり達成が難しく、実用上の近似止まりでよい
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

- [ ] `[ch_out_style]`の適用（定義と`[lay out_style=]`・`[span ch_out_style=]`は受け付けるが、消去のアニメをまだ行なっていない＝本家の既定`wait=0`と同じ結果）。文字が消えるのはページ切替や`[er]`でReactが要素を捨てる場面なので、消えていく間だけ古い文字を生かす仕組みが要る。出現演出（`src/ts/ChStyle.ts`）とは別の作りになる
- [ ] `[trans]`の`delay=`・`ease=`（進度は常に等速）・`glsl=`（自前シェーダ）：現状使用していないため未実装のまま凍結。`glsl=`はWebGLを使わないため実現しようがないので対象外
- [ ] `[quake]`の`delay`/`repeat`/`ease`/`yoyo`は本家でも揺れ幅がランダムで効かないため見送り
- [ ] `sys:sn.tagCh.canskip`（クリック等でのテキストスキップ可否）：本家でも読み書きできる変数として
      定義されているだけで、実際のクリックスキップ処理（`TxtLayer.ts:816-818`の`click()`）はこの値を
      参照せず無条件にスキップする。`msecWait`等の兄弟変数のように起動時キャッシュへ読み込む処理も
      本家に無い（`Variable.ts:126-132`）。本家自体が未接続のため、bluesnovel側で先行接続するのは
      移植の範囲を超えるとして見送り（2026-08-10確認）
