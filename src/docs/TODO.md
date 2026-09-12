# TODO 優先順位順

> 済んだことは `../../CHANGELOG.md`（作業ごとの経緯・判断つき）。
> ここは**これからやること**だけを持つ（＝いずれ空になるのが正しい）。
> 設計判断の経緯・調査結果・実測値・凍結理由は **[開発者向けドキュメント](README.md)** へ
> 分離済み（sn_extension の `src/docs/` 構成に倣った）。

## 進め方

対象は本家サンプル `tmp_esm_uc/doc/prj/`、実テンプレ `tmp_blues/doc/prj/`。
タグ仕様は <https://famibee.github.io/skynovel_esm/tag.html>（全タグ一覧は
`skynovel_esm/src/sn/Grammar.ts` の `T_HTag`）。`fg`/`img`/`sys_menu`/`txt_lay_*`/`ask_ync` 等は
プロジェクト側マクロ、`[notice]` はプロジェクト側プラグインなので対象外、中身のタグのみ実装が要る。
機能ごとの仕様はギャラリー（<https://github.com/famibee/SKYNovel_gallery>）の `public/prj/<機能>/`。

## 新機能

分家独自の新機能・新案件はここに積む（[本家には追加しない](../../CLAUDE.md)方針のため、
新タグ・新属性も含めここが唯一の置き場）。標準タグ121種は 🟢 済み。

- （現在なし）

## 保留

- [ ] デザインモード再開（`Stage.tsx` の `ENA_DESIGN_MODE=false`） → [deferred-infra.md](deferred-infra.md)
- [ ] ESLint 復活（TS 7.1 対応待ち）時に `eslint-plugin-import` → `-import-x` へ切替
      → [deferred-infra.md](deferred-infra.md)
- [ ] `test/e2e/app/prj_vertglyph/` フィクスチャ（`ipamjm.ttf` 46MB 非コミット）は再開時に再利用可能
      → [deferred-infra.md](deferred-infra.md)

## 凍結

詳細・理由は各ドキュメントへ。再検討はそちらの実測値を見てから。

- `max_row` / `sys:sn.tagCh.canskip`（本家自体が死んだ属性） → [tag-notes.md](tag-notes.md)
- `[tsy] arrive`（常に `true` 相当固定） → [tag-notes.md](tag-notes.md)
- `[quake]` の `delay`/`repeat`/`ease`/`yoyo` → [tag-notes.md](tag-notes.md)
- ルビ付き行の行間不揃い（行頭ルビのみ残存） → [text-rendering.md](text-rendering.md)
- 縦書きで `〈`/`〉` だけ90°回転しない（Chromium + Hiragino バグ） → [text-rendering.md](text-rendering.md)
- sn_gallery の emote_layer プラグイン → [plugin-layer.md](plugin-layer.md)
- フレーム内幅 960 vs 1024（不具合ではない） → [deferred-infra.md](deferred-infra.md)
- 文字レイヤ枠画像（`[lay b_pic=…]`）のアニメpngシート再生（非サポート確定）
  → [ANIMATION_RESEARCH.md](ANIMATION_RESEARCH.md) §7「fx でないもの」
- `ScriptMng.#refreshCryptoAssets()` の一般化 → [refactor-candidates.md](refactor-candidates.md) Altitude 節
- フィルタ `color_tone` の色味差（pixi の非線形補正を feColorMatrix で再現できない）
  → [filters.md](filters.md)
- `[add_filter] blur` の `repeat_edge_pixels`（`[add_fx fx=blur]` とは別件） → [filters.md](filters.md)
