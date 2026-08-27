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

- [ ] `[ch]`/`[span]` の `ch_in_style`/`ch_out_style` 未接続（定義は `[ch_in_style]`/
      `[ch_out_style]` で受け付けるが `[ch]`/`[span]` 側の属性として未接続）。詳細 [text-rendering.md](text-rendering.md)
- [ ] フィルタ `noise`：CSS にも SVG の単純な組合せにも無いので、対応するなら canvas 等で別途。
      詳細 [filters.md](filters.md)
- [ ] フィルタ `predator`/`color_tone` の色味差、`[add_filter] blur` の `repeat_edge_pixels`
      近似余地（いずれも優先度低・未実機検証）。詳細 [filters.md](filters.md)

## アニメpng（スプライトシート）

- [ ] 【現状不使用・優先度低】文字レイヤの枠画像（`[lay b_pic=…]`）でのシート再生。今は CSS の
      背景画像に直接 URL を入れているので、`.json` が来ると絵が出ない

## WebGL エフェクト

コードを追った実現性検討は [ANIMATION_RESEARCH.md](ANIMATION_RESEARCH.md) の §6・§7。gl-react/R3F は不要。
`[trans] glsl=` は実装済み（`src/ts/TransGlsl.ts`。§7）。

### 立ち絵シェーダエフェクト（`[add_fx]` 一族）

C 方式（`aFlt` に倣った `aFx` コア seam ＋ lazy モジュール）。タグ案・規模内訳・プラグイン化 3 経路・
推奨度は [ANIMATION_RESEARCH.md](ANIMATION_RESEARCH.md) §7。**推奨度 ★★☆＝本家サンプル互換の後ろ盾が
無い分家独自機能。残りは要求が出てから着手。**

- [x] 最小スパイク（2026-08-28）：`[add_fx]`/`[clear_fx]` の 2 タグ、`aFx: T_FX[]` seam
      （`src/ts/Fx.ts`＝純粋／`src/ts/FxRunner.ts`＋`src/ts/fxPresets.ts`＝lazy WebGL）、
      GrpLayer が `aFx` 非空で `<img>`→`<canvas>` 分岐、`A_LAY_STY_KEY` 登録で
      `[clear_lay]`/しおり/`[trans]` 複製に追随
- [x] プリセット wave / rgbShift の 2 個
- [x] スタック（2 枚 FBO で ping-pong）／`time=` one-shot は経過後そのパス素通し＝凍結
- [x] 手動確認フィクスチャ `test/e2e/app/prj_fx/`
- [ ] `[enable_fx]`（pause/resume 相当）／`[wait_fx]`（終了待ち。`ScriptMng` に `waitFx`）
- [ ] 生 GLSL（`glsl=`。本家サンプル準拠の契約。今は `throw`）
- [ ] face 差分合成（`aFace`）を通す（今は基本画像だけ）／RGB シフトの箱外にじみ（`overflow:visible`）
- [ ] `name=` 無名時のレイヤスコープ採番（`#fx1`…。今は無名は常に push、`[clear_fx]` は
      `layer=` 単位のみ）／`[save]`/`[load]`・`[trans]` 複製の実挙動確認
- [ ] プリセット追加（glitch / pixelate 等）
- [ ] `test/e2e/app/prj_fx/` に対応する `.e2e.ts`（今は手動確認のみ）
- [ ] sn_gallery に実演を置いて費用対効果を測定
- [ ] `docs/tag.html` への追記（🟡）＋ [ARCHITECTURE.md](ARCHITECTURE.md) 実装済みタグ一覧へ追加
- [ ] 上記すべて完了 → この節を TODO.md から削除（試作の段階を脱し正式機能化。または
      測定の結果「試作止まり」と判断したら凍結として [ANIMATION_RESEARCH.md](ANIMATION_RESEARCH.md) へ集約）

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
