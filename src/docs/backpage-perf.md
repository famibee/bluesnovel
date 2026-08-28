# 不可視 back ページの最適化（調査：2026-08-28）

`[trans]` は foreIdx を反転するだけで、表裏 2 ページとも常に DOM にマウントされたまま
（`src/store/store.tsx` aPage のコメント。文字送り演出のやり直しを避けるため）。
`[trans]` 後、**不可視になった back ページの上でも動き続けるもの**を洗い出した。

## 一覧

| 対象 | 不可視 back で回るもの | 深刻度 | 状態／修正の難度 |
|---|---|---|---|
| **`[add_fx]`** | rAF＋WebGL（シェーダのフレーム描画） | — | **対応済み**（2026-08-28）。`Stage` が `GrpLayer` へ `fxActive = (i === foreIdx \|\| !!trans)` を渡し、`FxRunner` が全パス凍結＋rAF 停止。可視復帰で tick の続きから |
| **プラグイン拡張レイヤ**（3d_layer / live2d 等） | プラグイン自前の rAF（`ThreeDLayer.#tick` の `renderer.render()` など）。`#running` は最初のモデル追加〜`[clear_lay]`／project 切替まで true で、**ページ可視性を一切見ない** | 高（WebGL render がページ数ぶん＝2 本走る） | 中〜大。`sn/Layer` 基底に可視シグナル（`setActive(visible: boolean)` 等）を足し、各プラグインが opt-in で rAF を止める。`PlgLayMng`＋`Stage` から `finishTrans`／foreIdx で呼ぶ。**bluesnovel＋gallery プラグインのクロスリポ変更** |
| **`[tsy]`（無限 `repeat=0`）** | motion の内部 rAF ＋ `onUpdate`→`chgLay`→store→**両ページ**の React 再描画。キャラの息づかい等 idle 演出でありがち | 中（無限のみ。有限 `[tsy]` は数百 ms で自己完了するので実害ほぼ無し） | 中。`ScriptMng.#finishTrans()` で、いま back になったページの `#hTw` を `pause()`／fore 復帰で `resume()`。`[add_fx]` の `fxActive` と同型。ただし `[tsy page=fore]` の `chgLay({page:'fore'})` は**毎回いまの foreIdx で解決**する（＝flip 後は新 fore を書く）ので、その意味論の整理が先に要る |
| **動画（`[lay fn=movie]`）** | `<video autoPlay>` のデコード継続 | 中 | 小だが要検討。`fxActive` で `video.pause()` は可能だが、`[wv]`（動画終了待ち）・ループ・再開位置（pause 点から？ 経過したものとして？）の意味論を決める必要がある |
| **アニメ png シート**（CSS animation） | `@keyframes` の style 再計算。`visibility:hidden` の要素はブラウザが概ね最適化する | 低 | 小。sprite の div へ `animation-play-state: paused`（`!fxActive` 時）を足すだけ |
| `[quake]` | Stage 側 rAF | — | 対象外。quake は短命かつ `#finishQuake` で停止、ステージ全体を揺らすので back ページ固有ではない |

## 推奨順（自己完結度・費用対効果）

1. **`[tsy]` 無限トゥイーンの back ページ pause**（bluesnovel 内で完結。`[add_fx]` の実装を踏襲）
2. プラグイン `Layer` の可視シグナル API（一番効くが一番重い。クロスリポ）
3. 動画の pause（`[wv]`／ループの意味論を決めてから）
4. CSS シート（軽微。ついでに）

## メモ

- `Stage` は既に `GrpLayer` へ `fxActive`（＝ページ可視）を渡している。`[tsy]`／動画／シート
  の対策はこの信号（または `TxtLayer` が受けている `isFore`）をそのまま流用できる。名前は
  `fxActive` のままだと用途が広がるので、着手時に `pageVisible` 等へ改名を検討。
- 「可視復帰で続きから」を厳密にやるか（`[add_fx]` はやった）、単に止めて復帰で頭出しでよいかは
  対象ごとに違う（idle `[tsy]` は続きから、動画は？）。
