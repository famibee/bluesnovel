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

- 不可視 back ページの最適化（詳細・一覧・深刻度は [backpage-perf.md](backpage-perf.md)）：
  `[add_fx]`／プラグイン拡張レイヤ／アニメ png シート／動画は対応済み（2026-08-28）。
  残る `[tsy]` 無限トゥイーンは下記「## 不可視 back ページ：[tsy] の memo 化」で対応（2026-08-30 方針決定）
- [ ] `[ch]`/`[span]` の `ch_in_style`/`ch_out_style` 未接続（定義は `[ch_in_style]`/
      `[ch_out_style]` で受け付けるが `[ch]`/`[span]` 側の属性として未接続）。詳細 [text-rendering.md](text-rendering.md)
- [ ] フィルタ `noise`：CSS にも SVG の単純な組合せにも無いので、対応するなら canvas 等で別途。
      詳細 [filters.md](filters.md)
- [ ] フィルタ `predator`/`color_tone` の色味差、`[add_filter] blur` の `repeat_edge_pixels`
      近似余地（いずれも優先度低・未実機検証）。詳細 [filters.md](filters.md)

## 不可視 back ページ：[tsy] の memo 化

方針・根拠は [backpage-perf.md](backpage-perf.md)「[tsy] 無限トゥイーンの結論（2026-08-30）」。
要点：`[tsy]` に可視 pause は不適・不要（書き先が fore/back の役割相対で可視ページへ自動追従）。
残るコストは無限 `[tsy]` 中の `set()` → **Stage が表裏とも 60fps 再描画**する 1 点だけ。
純粋な最適化・挙動不変。`putPage` が非対象ページの配列参照を保つのが効く前提。

- [ ] `Stage.tsx`：`aPage.map` の「1 ページぶん」（`<div data-page>` ＋ `aLay.map(l=> <GrpLayer/>/<TxtLayer/>/<PlgLayer/>)`）を
      `<Page>` コンポーネントへ切り出す。props は `aLay` / `isFore` / `trans` / `cmn` /
      各コールバック。trans マージ配列（`trans?.aLayNm && i !== foreIdx` の分岐）は `<Page>` の外で解決して `aLay` として渡す
- [ ] `Stage.tsx`：`<Page>` へ渡す**毎 render 新規の関数**を安定参照化。
      `getVideoVol` / `needClick2Play` / `onActivate` / `onNavigate` / `onSe` /
      `getVideoVol`（GrpLayer）等の inline arrow を `useCallback` かモジュール定数へ、
      または `scrMng` を渡してメソッド呼び出しは `<Page>` の内側で行う。
      `c.cmn` と `sty4Moveable` 経路の参照安定性も確認（デザインモード OFF なら固定のはず）
- [ ] `<Page>` を `React.memo` でくるむ。`page=fore` の `[tsy]` 更新時、back Page の
      props（`aLay` = `aPage[backIdx]`、`isFore`、`trans=null`）が全て参照安定 →
      back サブツリーの再 render がスキップされることを狙う。trans 中は back の `aLay` が
      毎 render 変わる＝再 render される想定でよい（可視なので正しい）
- [ ] 効果確認：無限 `[tsy]`（`[fg_sway]` / `[fg_squat]` 等、`sn_gallery` の作例）実行中に
      back ページのレイヤコンポーネントが再 render されないことを確認。
      `test/e2e/` の既存 tsy 系テストがあれば流用、無ければ React DevTools Profiler か
      `<Page>` 内 `console.count` で目視。単体テスト側は store の `putPage` 参照維持を
      `test/store_lay.test.ts` 系で担保（既にあれば追加不要）
- [ ] 完了したら [backpage-perf.md](backpage-perf.md) 一覧表の `[tsy]` 行を「対応済み」へ、
      本セクションを削除。コミットメッセージに経緯（pause 不採用の理由・memo が効く仕組み）を厚めに

## WebGL エフェクト

コードを追った実現性検討は [ANIMATION_RESEARCH.md](ANIMATION_RESEARCH.md) の §6・§7。gl-react/R3F は不要。
`[trans] glsl=` は実装済み（`src/ts/TransGlsl.ts`。§7）。

### シェーダエフェクト（`[add_fx]` 一族）— 正式化（2026-08-28）

`[add_fx]`/`[clear_fx]`/`[wait_fx]`/`[pause_fx]`/`[resume_fx]`、プリセット wave / rgbShift /
snow / rain、生 `glsl=`（契約は `[trans glsl=]` と統一）、基本画像は静止画・アニメ png シート・動画
いずれも可、face 合成（静止＋アニメ png シート＋動画＝毎フレーム転写）、`[trans]` 後の不可視 back
ページで rAF 凍結、構成切替で一瞬消えない（fx 変化は canvas を作り直さず同コンテキストでプログラム
組み直し）——ここまで実装済み（`test/ScriptEngine_fx.test.ts`＋`test/store_lay.test.ts`＋
`test/e2e/fx.e2e.ts`）。設計・GLSL 契約・棲み分けは [ANIMATION_RESEARCH.md](ANIMATION_RESEARCH.md) §7。

残り：

- [ ] プリセット追加（**随時**）。技法から再実装（MIT 相当）。1 個 20–50 行。候補：花火／
      タイル塗り＋スクロール／桜（花びら）／ぼかしアニメ／モザイク
- [ ] sn_gallery `prj/add_fx/` の実演拡充＋ギャラリー掲載候補の調査（ライセンス明示・
      動作確認ページ URL 付き。§7 の調査候補）。ノベル素材との組合せで役立つものだけ
      （全画面壮大風景は対象外）。**随時・終わりなし**

別件（本家 `[trans glsl=]` 契約側。§7 の棲み分け）：

- [x] ぼかし／モザイク `[trans glsl=]`（2026-08-28）。ギャラリー作例でなく**エンジンのプリセット名**に
      した（`[trans glsl=blur]` / `[trans glsl=mosaic]`。`src/ts/transPresets.ts`。`[add_fx fx=]` と同じ
      考え方だが属性 1 つで兼ねる）。契約に `resolution`（vec2）追加。`test/transPresets.test.ts`＋
      `test/e2e/trans.e2e.ts`。ギャラリー glsl_slide の `ml2` はカスタム GLSL の作例として残す

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
