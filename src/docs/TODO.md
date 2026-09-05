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

## タグ・変数の残り

## 保留

- [ ] `[dump_script]`（本家は VSCode 拡張との連携）：sn_extension は公開停止中で再申請は8月下旬
      （8/25頃）。連携先が無い状態での実装は着手しない
- [ ] デザインモード再開（`Stage.tsx` の `ENA_DESIGN_MODE = false`）：調整結果の書き戻し先を
      決めてから。グループ位置指定・Moveable リサイズ追随も同時に。詳細 [deferred-infra.md](deferred-infra.md)
- [ ] ESLint 復活（TS 7.1 対応待ち）時に `eslint-plugin-import` → `eslint-plugin-import-x`
      へ切替。詳細 [deferred-infra.md](deferred-infra.md)
- [ ] `test/e2e/app/prj_vertglyph/` のフィクスチャは再開時に再利用可能（`ipamjm.ttf` は 46MB で
      非コミット）。詳細 [deferred-infra.md](deferred-infra.md)

## 凍結

詳細・理由は各ドキュメントへ。再検討はそちらの実測値を見てから。

- `max_row` / `sys:sn.tagCh.canskip`：本家自体が未接続の死んだ属性 → [tag-notes.md](tag-notes.md)
- `[tsy] arrive`：常に `true` 相当で固定（ストアを唯一の現在値とする設計と `false` が噛み合わない）。
  配線すれば可能だが優先度低 → [tag-notes.md](tag-notes.md)
- `[quake]` の `delay`/`repeat`/`ease`/`yoyo`：本家が `[trans]` と同じトゥイーン枠を使い回す副産物。
  こちらは毎フレームのランダムジャンプ実装でイージング／ヨーヨーの概念が無い。必要なら `[tsy]` で
  → [tag-notes.md](tag-notes.md)
- ルビ付き行の行間不揃い（行頭にルビが来る場合のみ残存） → [text-rendering.md](text-rendering.md)
- 縦書きで `〈`/`〉` だけ90°回転しない（Chromium + Hiragino の外部バグ） → [text-rendering.md](text-rendering.md)
- sn_gallery の emote_layer プラグイン（本家で動かす動機が薄い） → [plugin-layer.md](plugin-layer.md)
- フレーム内幅 960 vs 1024（不具合ではない） → [deferred-infra.md](deferred-infra.md)
- 文字レイヤ枠画像（`[lay b_pic=…]`）のアニメpngシート再生：文字が読みづらくなるため非サポート確定
  → [ANIMATION_RESEARCH.md](ANIMATION_RESEARCH.md) §7「fx でないもの」
- `ScriptMng.#refreshCryptoAssets()` の一般化（アクション経路を変える改修になる割に得るものが薄い）
  → [refactor-candidates.md](refactor-candidates.md) Altitude 節
- フィルタ `color_tone` の色味差（pixi の非線形補正をSVG feColorMatrixで再現できない）。
  色味を厳密に一致させる必要はないため凍結 → [filters.md](filters.md)
- `[add_filter] blur` の `repeat_edge_pixels`（SVG `feGaussianBlur` の `edgeMode` で近似余地は
  あるが優先度低。**静的フィルタの話で `[add_fx fx=blur]` とは別件**）→ [filters.md](filters.md)
