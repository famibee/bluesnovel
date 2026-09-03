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
| **`[tsy]`（無限 `repeat=0`）** | motion の内部 rAF ＋ `onUpdate`→`chgLay`→store→**Stage 全体（表裏レイヤ全部）**の React 再描画（`GrpLayer`/`TxtLayer` は memo 化なし） | 中（無限のみ。有限 `[tsy]` は数百 ms で自己完了するので実害ほぼ無し） | **対応済み**（2026-08-30）。`Stage.tsx` の「1 ページぶん」を `<Page>` へ切り出し `React.memo` でくるんだ。無限 `[tsy] page=fore` の毎フレーム `set()` で Stage は再 render されるが、back Page の props（`aLay`＝`aPage[backIdx]`／`isFore`／`trans=null`／`cmn`＝`useMemo` 済み）は全て参照安定 → back サブツリーの再 render を丸ごとスキップ（実機で fore が毎フレーム再 render＝2955 回に対し back は 4 回で停止を確認）。純粋な最適化・挙動不変。下記「[tsy] 無限トゥイーンの結論」参照 |
| **動画（`[lay fn=movie]`）** | `<video autoPlay>` のデコード継続 | 中 | **対応済み**（2026-08-28）。`GrpLayer` が `fxActive`（＝ページ可視。fx 有効時は `visibility:hidden` でも FxImg がテクスチャ源にするので「隠れているか」でなく「ページが可視か」で判定）で `video.pause()`／`play()`。**再開位置は pause 点から**（頭出しなし＝HTML 既定）。`[wv]` は「終わるまで待つ」タグなので、待ち対象が pause されていたら可視状態に関わらず `#waitVideoPlay` が `play()` で前へ進める（本家 pixi の常時再生へ寄せる）。`test/e2e/movie.e2e.ts` |
| **アニメ png シート**（CSS animation） | `@keyframes` の style 再計算。`visibility:hidden` の要素はブラウザが概ね最適化する | 低 | **対応済み**（2026-08-28）。`Sprite.ts aniSpriteCss` が `animation-play-state: var(--sn-ani-play, running)` を出し、`Stage.tsx` が不可視 back ページの div へ `--sn-ani-play:paused` を撒く（子孫の grp 基本画像・face・`[graph]`・待ちマークへ一括）。`test/e2e/anime.e2e.ts` |
| `[quake]` | Stage 側 rAF | — | 対象外。quake は短命かつ `#finishQuake` で停止、ステージ全体を揺らすので back ページ固有ではない |

## 推奨順（自己完結度・費用対効果）

1. ~~プラグイン `Layer` の可視シグナル API~~ 済み（2026-08-28）
2. ~~CSS シート~~ 済み（2026-08-28）
3. ~~動画の pause~~ 済み（2026-08-28。pause 点から再開・`[wv]` は前へ進める）
4. ~~`[tsy]` 無限トゥイーン~~ 済み（2026-08-30。(c) `<Page>` の `React.memo` 化。下記）

＝一覧のすべてに対応済み。

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

**対応＝(c) back ページ `<div>` サブツリーの `React.memo` 化（実施済み。`Stage.tsx`）。**
- `Stage.tsx` の「1 ページぶん」（`<div data-page>` ＋ `aLay.map`）をモジュールスコープの
  `<Page idx isFore trans aLay cmn scrMng pgRef/>` へ切り出し `memo()` でくるんだ。
  trans 中の合成配列（`trans?.aLayNm && i !== foreIdx` の分岐）は `<Page>` の外で解決して
  `aLay` として渡す＝trans が無ければ `aPage[i]` をそのまま渡す（参照不変）。
- キモは `store.tsx` `putPage`：触ったページだけ新配列にし、**もう一方の配列参照は保つ**。
  `page=fore` 更新時、back Page の props（`aLay` = `aPage[backIdx]`、`isFore`、`trans=null`）は
  すべて参照安定 → memo の浅い比較が通り、**back サブツリーの再 render を丸ごとスキップ**。
  fore Page だけ再 render（正しい）。参照維持は `test/store_lay.test.ts`
  `chgLay_keepsUntouchedPageArrayRef` で担保。
- props 安定化：`cmn`（旧 `c.cmn`）を `useMemo([sys, isDesignMode])` に、`styChild`/`styPage` を
  モジュール定数に（`styPage` の `background-color` だけ `CmnLib.bgColor` がモジュール評価時に
  未確定のことがあるため `<Page>` の inline style へ移した）。`getVideoVol` / `needClick2Play` /
  `onActivate` / `onNavigate` / `onSe` の inline arrow は `<Page>` の内側（`scrMng` メソッド呼び）へ
  移した＝`<Page>` は memo でスキップされるので毎 render 新規でも実害なし。
- 効果確認（2026-08-30、`prj_tsy` に無限 `[tsy repeat=0]` シーンを一時追加＋`<Page>` に
  `console.count`）：無限トゥイーン中、fore Page が毎フレーム再 render（2955 回）に対し
  back Page は 4 回（シーン組み立て時のみ）で停止。
- 純粋な最適化で挙動不変。props 安定化が不完全でも「今日のコストに戻るだけ」でリスク無し。
  だから (a) `page=back` 限定 pause（狭すぎ）や (b) `[tsy]` を作成時の物理ページへ束縛
  （`chgLay` の動的解決を変える＝`[fg2]` の絶対再配置・`backlay` に波及する中規模改修）より安全。

## fore ページの毎フレーム再 render の実コスト（計測 2026-09-03、TODO #62 決着）

2026-08-30 は「fore の毎フレーム再 render は許容」を回数（2955 回）だけで判断していた。
**子コンポーネント（GrpLayer/TxtLayer/PlgLayer）も `React.memo` 化すべきか**を、1 コミットの
実コストで測り直した。

**計測方法（再現レシピ）**：使い捨てフィクスチャ（1280×720・背景＋立ち絵 3＋満杯の `mes`
TxtLayer〔約 200 字・ルビ 6・折返し多数〕＋ボタン 4）で立ち絵 1 枚に無限
`[tsy repeat=0 yoyo=true]` をかけ `[l]` で停止。`Stage.tsx` の `aPage.map` を React
`<Profiler id=…>` で一時的にくるみ、`onRender` の `actualDuration`/`baseDuration` を
`window.__renderProf` へ蓄積。Playwright（headless chromium＝**vite dev＝React development
build**）で 4 秒間収集。CPU 内訳は CDP `Profiler`（サンプリング 100µs）。

**結果**：

| 指標 | 値 |
|---|---|
| コミット頻度 | 60 /s（＝毎フレーム再 render 確定） |
| `actualDuration`（back は memo でスキップ済＝実質 fore のみ） | mean 1.9ms / p95 2.2ms / max 2.4ms |
| `baseDuration`（fore+back 全再 render 相当） | mean 2.9ms |
| コミット間隔 | mean 16.66ms＝**フレーム落ちゼロ・60fps 維持** |

CPU プロファイル内訳（非 idle 分）：大半が `React.createElement` ＋ emotion の `css`
再シリアライズ（`serializeStyles`/`murmur2`）＋ **development build 限定の計装**
（`jsxDEV`/`validateProperty`/`logComponentRender`/`runWithFiberInDEV` 等）。アプリ側
コード（TxtLayer/BtnLayer の本体）は合計でも 0.1ms/frame 未満。重い `useLayoutEffect`
（`applyKinsoku` ~13ms）は deps 不変で**再実行されていない**（4 秒で 240 回走れば
~3000ms 出るはずが出ていない＝effect は再実行なし、render 関数だけが回っている）。

**結論＝子コンポーネントの memo 化は見送り**：

- production build では dev 計装が消え emotion も最小化＝実コストは概ね 0.5〜1ms/frame と
  見込まれる。headless dev でもフレーム落ちゼロ。無限 `[tsy]` 自体がニッチ（有限 tsy は
  数百 ms で自己完了）。
- 一方 `<Page>` の `aLay.map` はフックを置けず、レイヤごとの `sty`（毎 render 新規オブジェクト）
  と 5 個のインライン arrow ハンドラを安定化するには **per-layer ラッパーコンポーネント新設**
  ＝「prop 安定化の設計変更」が要る。`sty` は `cmn.sty4Moveable`（デザインモード）との合成
  でもあり追随が必要で、リセット/演出系の回帰リスク（`applyKinsoku` の折返しズレ実績多数）を負う。
- 2026-08-30 の決着（fore の毎フレーム再 render は許容・back のみ `<Page>` memo 化）を
  計測で追認した。再検討は「production build の実測で 60fps 割れ」が出てからで十分。

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
