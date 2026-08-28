# TODO 優先順位順

> 済んだことは `../../CHANGELOG.md`（作業ごとの経緯・判断つき）。
> ここは**これからやること**だけを持つ（＝いずれ空になるのが正しい）。
> 設計判断の経緯・調査結果・実測値・凍結理由は **[開発者向けドキュメント](README.md)** へ
> 分離済み（2026-08-27、本家 sn_extension の `src/docs/` 構成に倣った）。

## 進め方

対象は本家サンプル `tmp_esm_uc/doc/prj/` と、実テンプレ `tmp_blues/doc/prj/` の実行経路。
タグリファレンス：<https://famibee.github.io/skynovel_esm/tag.html>（ローカル実体は
`skynovel_esm/docs/tag.html`。全タグ一覧は `skynovel_esm/src/sn/Grammar.ts` の `T_HTag`）。
シナリオ中の `fg`/`img`/`sys_menu`/`txt_lay_*`/`ask_ync` 等は**プロジェクト側マクロ**なので、
実装が要るのはその中身のタグのみ。`[notice]` はプロジェクト側プラグインなので対象外。
ギャラリー（<https://github.com/famibee/SKYNovel_gallery>）の `public/prj/<機能>/` が機能ごとの仕様。

## sn_gallery をbluesnovel駆動にする

経緯・完了記録は [sn-gallery.md](sn-gallery.md)。残りの行動項目：

- [ ] 依存の付け替え（`sn_gallery/package.json` の
      `"@famibee/skynovel_esm": "file:../bluesnovel"` という本家のフリをどうするか）は
      本格移行時に改めて判断（2026-08-21時点は現状維持と決定）。詳細 [sn-gallery.md](sn-gallery.md)

## タグ・変数の残り

- [ ] 不可視 back ページの最適化調査。各種プラグインによる拡張レイヤ、[tsy]処理などを行っていないか。[trans]中のみ動かせばよいはず
- [ ] `[ch]`/`[span]` の `ch_in_style`/`ch_out_style` 未接続（定義は `[ch_in_style]`/
      `[ch_out_style]` で受け付けるが `[ch]`/`[span]` 側の属性として未接続）。詳細 [text-rendering.md](text-rendering.md)
- [ ] フィルタ `noise`：CSS にも SVG の単純な組合せにも無いので、対応するなら canvas 等で別途。
      詳細 [filters.md](filters.md)
- [ ] フィルタ `predator`/`color_tone` の色味差、`[add_filter] blur` の `repeat_edge_pixels`
      近似余地（いずれも優先度低・未実機検証）。詳細 [filters.md](filters.md)

## WebGL エフェクト

コードを追った実現性検討は [ANIMATION_RESEARCH.md](ANIMATION_RESEARCH.md) の §6・§7。gl-react/R3F は不要。
`[trans] glsl=` は実装済み（`src/ts/TransGlsl.ts`。§7）。

### シェーダエフェクト（`[add_fx]` 一族）— 正式化決定（2026-08-28、判断ゲート通過）

最小スパイク（`[add_fx]`/`[clear_fx]`、プリセット wave / rgbShift、`aFx: T_FX[]` seam、
無名レイヤスコープ採番、`test/ScriptEngine_fx.test.ts`＋`test/e2e/fx.e2e.ts`）は実装済み。
sn_gallery `prj/add_fx/` の実演で費用対効果を測る判断ゲートを通過し**正式化**。設計・用途
カタログ・GLSL 契約・棲み分けは [ANIMATION_RESEARCH.md](ANIMATION_RESEARCH.md) §7（推奨度 ★★★☆）。

実装順（2→3→4→5→7→8→6。6 は終わりのない作業なので最後・随時）：

- [ ] 2. `[pause_fx]`/`[resume_fx]`（描画を止める/戻す。記述子は残す）。`[pause_tsy]`/`[resume_tsy]`
      に倣う（`enable` はイベント語彙・`stop` は不可逆なので不採用）。`FxRunner` に制御ハンドルを
      持たせ、canvas を作り直さず rAF を停止/再開（`enabled` 切替で `key` 再生成すると tick=0 へ
      戻ってしまう）。この「再生成せず止める/戻す」機構を 5（不可視 back ページ停止）が流用。
      ※`[wait_fx]`（終了待ち）は実装済み（`ScriptMng` が `[add_fx time>0]` のタイマーを持つ）
- [ ] 3. 生 `glsl=` を有効化（今は `throw`）。契約名を `[trans glsl=]` と統一
      （`src`→`uSampler`、`vUv`→`vTextureCoord`、`time`→`tick`。プリセット 2 本も書き直し）
- [ ] 4. face 差分合成（`aFace`）を通す。まず静止画（差分変化時のみ offscreen 2D canvas で合成）、
      次に sheet/動画（毎フレーム転写）。`FxImg` の `! isSheet && ! isMovie` 条件を緩める
- [ ] 5. 不可視 back ページで rAF 停止（`[trans]` 後の表裏 2 canvas の裏側）。`FxImg` に
      「表ページか / trans 中か」を渡す
- [ ] 7. プリセット追加（雪・雨・花火・タイルスクロール等）。MIT/CC0/商用可 明示のもの、
      または技法から再実装。1 個 20–50 行
- [ ] 8. `docs/tag.html` を 🟡→🟢、[ARCHITECTURE.md](ARCHITECTURE.md) 実装済みタグ一覧を更新、
      §7 の実装順リストを畳む
- [ ] 6. sn_gallery `prj/add_fx/` の実演拡充＋ギャラリー掲載候補の調査（ライセンス明示・
      動作確認ページ URL 付き。§7 の調査候補）。ノベル素材との組合せで役立つものだけ
      （全画面壮大風景は対象外）。**随時・終わりなし**

別件（本家 `[trans glsl=]` 契約側。§7 の棲み分け）：

- [ ] ぼかし `[trans glsl=]`（ガウスぼかしのトランジション版）
- [ ] モザイク `[trans glsl=]`

## 保留

- [ ] `[dump_script]`（本家は VSCode 拡張との連携）：sn_extension は公開停止中で再申請は8月下旬
      （8/25頃）。連携先が無い状態での実装は着手しない
- [ ] `[link]` の `onenter`/`onleave`：専用の実行経路をエンジンに新設する必要がある中規模実装。
      理由の詳細は [tag-notes.md](tag-notes.md)
- [ ] デザインモード再開（`Stage.tsx` の `ENA_DESIGN_MODE = false`）：調整結果の書き戻し先を
      決めてから。グループ位置指定・Moveable リサイズ追随も同時に。詳細 [deferred-infra.md](deferred-infra.md)
- [ ] ESLint 復活（TS 7.1 対応待ち）時に `eslint-plugin-import` → `eslint-plugin-import-x`
      へ切替。詳細 [deferred-infra.md](deferred-infra.md)
- [ ] `test/e2e/app/prj_vertglyph/` のフィクスチャは再開時に再利用可能（`ipamjm.ttf` は 46MB で
      非コミット）。詳細 [deferred-infra.md](deferred-infra.md)

## 凍結

詳細・理由は各ドキュメントへ。再検討はそちらの実測値を見てから。

- `max_row` / `sys:sn.tagCh.canskip`：本家自体が未接続の死んだ属性 → [tag-notes.md](tag-notes.md)
- `[ch_out_style]` の消去アニメ適用 → [text-rendering.md](text-rendering.md)
- ルビ付き行の行間不揃い（行頭にルビが来る場合のみ残存） → [text-rendering.md](text-rendering.md)
- 縦書きで `〈`/`〉` だけ90°回転しない（Chromium + Hiragino の外部バグ） → [text-rendering.md](text-rendering.md)
- sn_gallery の emote_layer プラグイン（本家で動かす動機が薄い） → [plugin-layer.md](plugin-layer.md)
- フレーム内幅 960 vs 1024（不具合ではない） → [deferred-infra.md](deferred-infra.md)
- 文字レイヤ枠画像（`[lay b_pic=…]`）のアニメpngシート再生：文字が読みづらくなるため非サポート確定
  → [ANIMATION_RESEARCH.md](ANIMATION_RESEARCH.md) §7「fx でないもの」
