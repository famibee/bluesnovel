# TODO 優先順位順

> 済んだことは `../../CHANGELOG.md`（作業ごとの経緯・判断つき）。
> ここは**これからやること**だけを持つ（＝いずれ空になるのが正しい）。
> 設計判断の経緯・調査結果・実測値・凍結理由は **[開発者向けドキュメント](README.md)** へ
> 分離済み（sn_extension の `src/docs/` 構成に倣った）。

## 進め方

対象は本家サンプル `tmp_esm_uc/doc/prj/` と、実テンプレ `tmp_blues/doc/prj/` の実行経路。
タグリファレンス：<https://famibee.github.io/skynovel_esm/tag.html>（ローカル実体は
`skynovel_esm/docs/tag.html`。全タグ一覧は `skynovel_esm/src/sn/Grammar.ts` の `T_HTag`）。
シナリオ中の `fg`/`img`/`sys_menu`/`txt_lay_*`/`ask_ync` 等は**プロジェクト側マクロ**なので、
実装が要るのはその中身のタグのみ。`[notice]` はプロジェクト側プラグインなので対象外。
ギャラリー（<https://github.com/famibee/SKYNovel_gallery>）の `public/prj/<機能>/` が機能ごとの仕様。

## タグ・変数の残り

（標準タグ121種すべて 🟢。本家に新タグは増えない前提なので、以降ここに積まれるのは
属性の凍結解除・不具合のみ。`docs/tag.html`／`docs/index.html` のカバー率表示は 100% で固定）

## ドキュメント

（`docs/{tag,macro_plg,dev}.html` は 2026-09-06 に AMP から案B へ刷新済。積み残しは無し）

## app版（`tmp_blues` の `bun run app` 実機テストで発覚 2026-09-07）

`tmp_blues` 側でエロゲ/ノベルゲUI標準機能フェーズ1（ボイスカット・`ask_ync` の「次から確認しない」）を
実装・web版で検証中に確認した既存不具合。フェーズ1の変更（`.sn`/`.htm`）とは無関係。検討メモ：`system-ui-research.md` §5。

- [ ] **preload レース（`window.electron` undefined）— 対策済み、コールドスタート実機での再検証待ち**。
      起動直後、非決定的に `[Unhandled rejection] TypeError: Cannot read properties of undefined (reading 'ipcRenderer')`。
      ESM preload（`preload.mjs`）の `contextBridge` 公開が renderer の `DOMContentLoaded`→`new SysApp()`→
      `SysApp.loaded()` に間に合わないレース。負けると `#em.invoke('getInfo')` が投げて `loaded()` が丸ごと死に、
      **Config 未生成＝`CmnLib.stageW/H` 0 のまま座標計算が全崩壊**する（フレーム入力も効かない）。app固有。
      **対策**：`SysApp.loaded()` 先頭で `waitElectronBridge()`（`src/IpcRenderer.ts`）を await、
      `window.electron.ipcRenderer` が生えるまで最大3秒ポーリング。CDP調査では10回リロードでレースを踏めず
      （コールドスタート限定）、`bun run app` の実機コールドスタート反復で再現しないことを確認したら消す。
- [ ] （テンプレ側・参考）`node_modules/electron/dist` 未インストールで `bun run app` が
      `Error: Electron uninstall`。`node node_modules/electron/install.js` で復旧。bun は
      `trustedDependencies` があっても postinstall を確実には走らせないので、`tmp_blues/package.json` に
      `"postinstall": "node node_modules/electron/install.js"` を足す手も。

## 保留

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
