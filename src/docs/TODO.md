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

- [ ] フィルタ `noise`：CSS にも SVG の単純な組合せにも無いので、対応するなら canvas 等で別途。
      詳細 [filters.md](filters.md)
- [ ] フィルタ `predator`/`color_tone` の色味差、`[add_filter] blur` の `repeat_edge_pixels`
      近似余地（いずれも優先度低・未実機検証）。詳細 [filters.md](filters.md)

## WebGL エフェクト

コードを追った実現性検討は [ANIMATION_RESEARCH.md](ANIMATION_RESEARCH.md) の §6・§7。gl-react/R3F は不要。
`[trans] glsl=` は実装済み（`src/ts/TransGlsl.ts`。§7）。

### シェーダエフェクト（`[add_fx]` 一族）— 正式化（2026-08-28）

`[def_fx]`/`[add_fx]`/`[clear_fx]`/`[wait_fx]`/`[pause_fx]`/`[resume_fx]`、組み込みプリセット
wave / rgbShift / snow / rain / fireworks、生シェーダは `[def_fx name= glsl=]` でユーザープリセット定義
（契約は `[trans glsl=]` と統一・HEAD 自動前置・セーブ非対象＝起動スクリプトで再定義する運用）、
基本画像は静止画・アニメ png シート・動画
いずれも可、face 合成（静止＋アニメ png シート＋動画＝毎フレーム転写）、`[trans]` 後の不可視 back
ページで rAF 凍結、構成切替で一瞬消えない（fx 変化は canvas を作り直さず同コンテキストでプログラム
組み直し）——ここまで実装済み（`test/ScriptEngine_fx.test.ts`＋`test/store_lay.test.ts`＋
`test/e2e/fx.e2e.ts`）。設計・GLSL 契約・棲み分けは [ANIMATION_RESEARCH.md](ANIMATION_RESEARCH.md) §7。

残り：

- [ ] プリセット追加（**随時**）。技法から再実装（MIT 相当）。1 個 20–50 行。候補：
      タイル塗り＋スクロール／桜（花びら）／ぼかしアニメ／モザイク
      （花火 = `fireworks` は sn_gallery の `[def_fx name=花火2]` を組み込み化して済）
- [ ] sn_gallery `prj/add_fx/` の実演拡充＋ギャラリー掲載候補の調査（ライセンス明示・
      動作確認ページ URL 付き。§7 の調査候補）。ノベル素材との組合せで役立つものだけ
      （全画面壮大風景は対象外）。**随時・終わりなし**

## リファクタ候補（/simplify 分家全体 2026-09-03）

軽微な整理は第 1〜9 弾で適用済み（[refactor-candidates.md](refactor-candidates.md) の「適用済み」節）。
残りは 1 項目ずつ設計判断＋実機（E2E・サンプル実走）確認が要る規模。**オススメ順**：

- [ ] （別タスク）本家由来部分（`src/sn/**` ほか）の /simplify＋modern-web-guidance は
      **分析のみ**（適用しない）。本家との再取り込み衝突を増やさないため。対象を `src/sn/**` に
      絞るか本家側でやるか含めて要相談。

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
