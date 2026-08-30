# 不可視 back ページの最適化（調査：2026-08-28）

`[trans]` は foreIdx を反転するだけで、表裏 2 ページとも常に DOM にマウントされたまま
（`src/store/store.tsx` aPage のコメント。文字送り演出のやり直しを避けるため）。
`[trans]` 後、**不可視になった back ページの上でも動き続けるもの**を洗い出した。

図解は **[backpage-perf.html](backpage-perf.html)**（ブラウザで開く）。中身：スクリプト→表示の
パイプライン全体図、登場人物の採番表（各コンポーネントとファイルパス・役割、`(10)`〜`(210)`）、
可視シグナルの 3 経路、`[tsy]` の書き先が役割相対な理由（図3）、memo 化の効き方（図4）、
逆流イベント一覧。このドキュメントに無い前提知識はそちらの「読み解きメモ」にある。

## 一覧

| 対象 | 不可視 back で回るもの | 深刻度 | 状態／修正の難度 |
|---|---|---|---|
| **`[add_fx]`** | rAF＋WebGL（シェーダのフレーム描画） | — | **対応済み**（2026-08-28）。`Stage` が `GrpLayer` へ `fxActive = (i === foreIdx \|\| !!trans)` を渡し、`FxRunner` が全パス凍結＋rAF 停止。可視復帰で tick の続きから |
| **プラグイン拡張レイヤ**（3d_layer / live2d 等） | プラグイン自前の rAF（`ThreeDLayer.#tick` の `renderer.render()` など） | 高（WebGL render がページ数ぶん＝2 本走る） | **対応済み**（2026-08-28）。`sn/Layer` 基底に `setActive(active)`（既定 no-op）。`PlgLayMng` が `#foreIdx`／trans 状態から各インスタンスの可視を算出し `setActive()` で通知（`add`／`playback`／`finishTrans`／`ScriptMng.#beginTrans` から）。gallery 側は `ThreeDLayer`／`Live2DLayer` が `override setActive` で `#tick` を止める／再開（`#active` ガード追加。本家 skynovel_esm には `setActive` が無く呼ばれない＝従来動作）。`test/PlgLayMng.test.ts`＋`test/e2e/plg.e2e.ts`。cubism3／emote は未移植なので対象外 |
| **`[tsy]`（無限 `repeat=0`）** | motion の内部 rAF ＋ `onUpdate`→`chgLay`→store→**Stage 全体（表裏レイヤ全部）**の React 再描画（`GrpLayer`/`TxtLayer` は memo 化なし） | 中（無限のみ。有限 `[tsy]` は数百 ms で自己完了するので実害ほぼ無し） | **方針決定（2026-08-30）→ (c) の memo 化で対応。実装は次セッション（TODO.md）**。下記「[tsy] 無限トゥイーンの結論」参照 |
| **動画（`[lay fn=movie]`）** | `<video autoPlay>` のデコード継続 | 中 | **対応済み**（2026-08-28）。`GrpLayer` が `fxActive`（＝ページ可視。fx 有効時は `visibility:hidden` でも FxImg がテクスチャ源にするので「隠れているか」でなく「ページが可視か」で判定）で `video.pause()`／`play()`。**再開位置は pause 点から**（頭出しなし＝HTML 既定）。`[wv]` は「終わるまで待つ」タグなので、待ち対象が pause されていたら可視状態に関わらず `#waitVideoPlay` が `play()` で前へ進める（本家 pixi の常時再生へ寄せる）。`test/e2e/movie.e2e.ts` |
| **アニメ png シート**（CSS animation） | `@keyframes` の style 再計算。`visibility:hidden` の要素はブラウザが概ね最適化する | 低 | **対応済み**（2026-08-28）。`Sprite.ts aniSpriteCss` が `animation-play-state: var(--sn-ani-play, running)` を出し、`Stage.tsx` が不可視 back ページの div へ `--sn-ani-play:paused` を撒く（子孫の grp 基本画像・face・`[graph]`・待ちマークへ一括）。`test/e2e/anime.e2e.ts` |
| `[quake]` | Stage 側 rAF | — | 対象外。quake は短命かつ `#finishQuake` で停止、ステージ全体を揺らすので back ページ固有ではない |

## 推奨順（自己完結度・費用対効果）

1. ~~プラグイン `Layer` の可視シグナル API~~ 済み（2026-08-28）
2. ~~CSS シート~~ 済み（2026-08-28）
3. ~~動画の pause~~ 済み（2026-08-28。pause 点から再開・`[wv]` は前へ進める）
4. `[tsy]` 無限トゥイーン → **(c) memo 化で対応**（2026-08-30 方針決定。下記）。実装は次セッション

＝残るは `[tsy]` の memo 化（TODO.md に個別項目）。

## [tsy] 無限トゥイーンの結論（2026-08-30）

**pause / resume は道具として不適で、そもそも不要。** `[tsy] page=fore`（既定）の書き先は
`store.tsx` の `pickPage` が**毎フレーム その時点の `foreIdx`** で物理ページ 0/1 に解決する
＝トゥイーンは物理ページにもレイヤオブジェクトにも束ねられておらず、**fore / back という役割**に
束ねられている。だから常に可視ページを書き、`[trans]` 後は新しい表へ自動追従する。
「止めるべき不可視アニメ」は存在しない（純粋に不可視なのは `page=back` 明示 × trans 外という
ニッチのみ）。正しさの問題でもない（`[trans]` はレイヤをクリアも `#hTw` の kill もしない
＝`[clear_lay]`/`[er]`/`[stop_tsy]` だけがトゥイーンを畳む）。

残るコストは 1 点だけ：`onUpdate`→`chgLay`→`set()`→ **Stage が表裏とも 60fps 再描画**すること
（`GrpLayer`/`TxtLayer` は memo 化なし）。不可視 back ページのレイヤ関数が毎フレーム呼び直され、
画面を変えない render 作業をしている。

**対応＝(c) back ページ `<div>` サブツリーの `React.memo` 化。**
- いまの `Stage.tsx` は「1 ページぶん」を `Stage` 関数の中で直接展開している。これを
  `<Page aLay={…} isFore={…} trans={…} …/>` に切り出し `React.memo` でくるむ。
- キモは `store.tsx` `putPage`：触ったページだけ新配列にし、**もう一方の配列参照は保つ**。
  `page=fore` 更新時、back Page の props（`aLay` = `aPage[backIdx]`、`isFore`、`trans`）は
  すべて参照安定 → memo の浅い比較が通り、**back サブツリーの再 render を丸ごとスキップ**。
  fore Page だけ再 render（正しい）。
- 効かせるには Stage が `<Page>` へ渡す**毎 render 新規の関数**を安定参照化する必要がある
  （`getVideoVol` / `onActivate` / `onSe` / `onNavigate` 等の inline arrow、および
  `sty4Moveable` 経路）。これが実作業。
- 純粋な最適化で挙動不変。props 安定化が不完全でも「今日のコストに戻るだけ」でリスク無し。
  だから (a) `page=back` 限定 pause（狭すぎ）や (b) `[tsy]` を作成時の物理ページへ束縛
  （`chgLay` の動的解決を変える＝`[fg2]` の絶対再配置・`backlay` に波及する中規模改修）より安全。

## メモ

- ページ可視の信号は用途ごとに別経路：
  - **grp レイヤの fx**：`Stage` → `GrpLayer` prop `fxActive`（`i === foreIdx || !! trans`）
  - **アニメ png シート（CSS）**：`Stage` が back ページ div へ CSS 変数 `--sn-ani-play:paused`
  - **プラグイン拡張レイヤ**：`PlgLayMng` が `#foreIdx`／trans 状態を持ち `Layer.setActive()` で通知
    （`ScriptMng` が trans 開始・`add`・`playback` の要所で `setPageState()` を呼ぶ）
  - **動画（`<video>`）**：`GrpLayer` の `useEffect([fxActive, isMovie, src])` が `pause()`／`play()`
  - `[tsy]` はこの信号を使わない（書き先が役割相対で可視ページへ自動追従するため）。
    対応は back Page の memo 化＝再描画コストの削減のみ（上記「[tsy] 無限トゥイーンの結論」）
  - 上の 4 つは物理ページ index 固定の実体なので信号で止める必要があるが、`[tsy]` は違う、が要点
- 「可視復帰で続きから」を厳密にやるか（`[add_fx]` はやった）、単に止めて復帰で頭出しでよいかは
  対象ごとに違う（idle `[tsy]` は続きから、動画は？）。プラグインは `setActive(true)` で rAF を
  再開するだけ（各プラグインの `#tick` が自前の時計を持つ。Live2D は `#lastT` を捨てて dt=0 から）。
- `[tsy]` の `onUpdate` が store を直接書かず `ScriptMng.apply()`→`chgLay({nm,page})` を通すのは、
  書き込み対象が安定して存在しないため。音声フェードの Tw は `new Tw(gn.gain)` で **GainNode を
  直接書く**（生オブジェクトで寿命が音と一致）。レイヤは `set()` のたび immutable update で作り直され
  `[trans]` で入れ替わるので、掴んだ参照は 1 フレームで陳腐化 → 毎フレーム名前引きし直すしかない。
  `apply()` がその「渡すクロージャ」そのもので、`#hTw` 台帳・`withAlign`・`backlay` を要するため
  `ScriptMng` の中にしか置けない（`Tw.ts` は数値補間だけの dumb なまま保つ）。
