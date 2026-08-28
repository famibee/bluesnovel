# 不可視 back ページの最適化（調査：2026-08-28）

`[trans]` は foreIdx を反転するだけで、表裏 2 ページとも常に DOM にマウントされたまま
（`src/store/store.tsx` aPage のコメント。文字送り演出のやり直しを避けるため）。
`[trans]` 後、**不可視になった back ページの上でも動き続けるもの**を洗い出した。

## 一覧

| 対象 | 不可視 back で回るもの | 深刻度 | 状態／修正の難度 |
|---|---|---|---|
| **`[add_fx]`** | rAF＋WebGL（シェーダのフレーム描画） | — | **対応済み**（2026-08-28）。`Stage` が `GrpLayer` へ `fxActive = (i === foreIdx \|\| !!trans)` を渡し、`FxRunner` が全パス凍結＋rAF 停止。可視復帰で tick の続きから |
| **プラグイン拡張レイヤ**（3d_layer / live2d 等） | プラグイン自前の rAF（`ThreeDLayer.#tick` の `renderer.render()` など） | 高（WebGL render がページ数ぶん＝2 本走る） | **対応済み**（2026-08-28）。`sn/Layer` 基底に `setActive(active)`（既定 no-op）。`PlgLayMng` が `#foreIdx`／trans 状態から各インスタンスの可視を算出し `setActive()` で通知（`add`／`playback`／`finishTrans`／`ScriptMng.#beginTrans` から）。gallery 側は `ThreeDLayer`／`Live2DLayer` が `override setActive` で `#tick` を止める／再開（`#active` ガード追加。本家 skynovel_esm には `setActive` が無く呼ばれない＝従来動作）。`test/PlgLayMng.test.ts`＋`test/e2e/plg.e2e.ts`。cubism3／emote は未移植なので対象外 |
| **`[tsy]`（無限 `repeat=0`）** | motion の内部 rAF ＋ `onUpdate`→`chgLay`→store→**Stage 全体（表裏レイヤ全部）**の React 再描画（`GrpLayer`/`TxtLayer` は memo 化なし） | 中（無限のみ。有限 `[tsy]` は数百 ms で自己完了するので実害ほぼ無し） | **保留**（2026-08-28 再調査）。当初案（back になったページの `#hTw` を pause）は**今の解決方式では成立しない**：`[tsy]` の `onUpdate` は毎フレーム `chgLay({page:'fore'})` を呼び、`chgLay` は**その時点の foreIdx** で物理ページを解決する（`store.tsx` `pickPage`）。つまり既定 `page=fore` のトゥイーンは常に可視ページを書く（`[trans]` 後は新しい表の同名レイヤへ書き先が乗り移る）＝止めると可視アニメが凍る。純粋に不可視なのは `page=back` のトゥイーンが trans 外のときだけ（ニッチ）。実コストは「不可視を動かすこと」でなく `chgLay`→`set()`→Stage 全再描画が 60fps で回ること＝pause では減らない。効かせるには (a) `page=back` 限定の pause（狭い）か (b) `[tsy]` を作成時の物理ページへ束縛（`chgLay` の動的解決を変える＝`[fg2]` の絶対再配置・`backlay` に影響しうる中規模変更）か (c) 不可視ページのコンポーネント memo 化、のいずれか |
| **動画（`[lay fn=movie]`）** | `<video autoPlay>` のデコード継続 | 中 | **対応済み**（2026-08-28）。`GrpLayer` が `fxActive`（＝ページ可視。fx 有効時は `visibility:hidden` でも FxImg がテクスチャ源にするので「隠れているか」でなく「ページが可視か」で判定）で `video.pause()`／`play()`。**再開位置は pause 点から**（頭出しなし＝HTML 既定）。`[wv]` は「終わるまで待つ」タグなので、待ち対象が pause されていたら可視状態に関わらず `#waitVideoPlay` が `play()` で前へ進める（本家 pixi の常時再生へ寄せる）。`test/e2e/movie.e2e.ts` |
| **アニメ png シート**（CSS animation） | `@keyframes` の style 再計算。`visibility:hidden` の要素はブラウザが概ね最適化する | 低 | **対応済み**（2026-08-28）。`Sprite.ts aniSpriteCss` が `animation-play-state: var(--sn-ani-play, running)` を出し、`Stage.tsx` が不可視 back ページの div へ `--sn-ani-play:paused` を撒く（子孫の grp 基本画像・face・`[graph]`・待ちマークへ一括）。`test/e2e/anime.e2e.ts` |
| `[quake]` | Stage 側 rAF | — | 対象外。quake は短命かつ `#finishQuake` で停止、ステージ全体を揺らすので back ページ固有ではない |

## 推奨順（自己完結度・費用対効果）

1. ~~プラグイン `Layer` の可視シグナル API~~ 済み（2026-08-28）
2. ~~CSS シート~~ 済み（2026-08-28）
3. ~~動画の pause~~ 済み（2026-08-28。pause 点から再開・`[wv]` は前へ進める）
4. `[tsy]` 無限トゥイーン → **保留**（上表参照。今の `chgLay` 動的解決だと pause が成立しない）

＝残るは `[tsy]`（保留）のみ。

## メモ

- ページ可視の信号は用途ごとに別経路：
  - **grp レイヤの fx**：`Stage` → `GrpLayer` prop `fxActive`（`i === foreIdx || !! trans`）
  - **アニメ png シート（CSS）**：`Stage` が back ページ div へ CSS 変数 `--sn-ani-play:paused`
  - **プラグイン拡張レイヤ**：`PlgLayMng` が `#foreIdx`／trans 状態を持ち `Layer.setActive()` で通知
    （`ScriptMng` が trans 開始・`add`・`playback` の要所で `setPageState()` を呼ぶ）
  - **動画（`<video>`）**：`GrpLayer` の `useEffect([fxActive, isMovie, src])` が `pause()`／`play()`
  - `[tsy]` は上表のとおり保留（`chgLay` の動的ページ解決と噛み合わない）
- 「可視復帰で続きから」を厳密にやるか（`[add_fx]` はやった）、単に止めて復帰で頭出しでよいかは
  対象ごとに違う（idle `[tsy]` は続きから、動画は？）。プラグインは `setActive(true)` で rAF を
  再開するだけ（各プラグインの `#tick` が自前の時計を持つ。Live2D は `#lastT` を捨てて dt=0 から）。
