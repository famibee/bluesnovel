# 立ち絵アニメーション調査メモ

2026-08-27 のチャットで検討した内容のまとめ。「透過画像アニメ vs 透過動画の負荷」と、
実況・解説系動画でよく見る「立ち絵を小気味よく動かす」演出をbluesnovelでどう実現するかの調査結果。

## 1. 処理負荷：背景透過pngアニメ vs 背景透過動画

同じ表示面積・同じ内容なら、**対応環境が揃っているなら透過動画の方が総じて軽い**。

- 動画はGPUのハードウェアデコーダー（VP9/H.265等）を使えるためCPU負荷が小さく、フレーム間差分
  圧縮（P/Bフレーム）でデータ量・メモリ帯域も小さい。長尺・高解像度アニメほど差が開く。
- 弱点は透過動画のブラウザ対応が不揃いなこと（Chrome/ElectronはWebM VP9 alphaが安定、Safariは
  HEVC+alpha(mov)、Firefoxは限定的）。Electron版（Chromiumベース）なら問題になりにくい。
- Canvas/WebGL側でフィルタ（feColorMatrix等）や動的加工をかける場合は毎フレーム`texImage2D`で
  GPUテクスチャへ転送するコストが乗り、単純表示ほどの優位性は薄れる。
- pngアニメ（スプライト）は互換性の懸念がゼロで、bluesnovelのフィルタパイプラインや`motion`に
  よるトゥイーンとの相性が良い。半面フレーム数×解像度に比例してメモリ使用量が大きくなりがち。

結論：ただ再生するだけなら透過動画が有利、リアルタイムフィルタや細かい再生制御が絡むなら
pngアニメ（スプライト方式）の方が実装コストと制御性のバランスが良い。

## 2. 「小気味よく動く簡易アニメ」の作成ツール

実況・解説系動画で見かける、パーツ分けした透過画像をピコピコ・ふよふよ動かす演出のジャンル。

- **2Dスケルタル/メッシュ変形系**（変形まで踏み込む場合）：
  - [Spine](https://en.esotericsoftware.com/)（Esoteric Software、ゲーム業界標準）
    - [Showcase](https://en.esotericsoftware.com/spine-showcase) / [Example Projects](https://en.esotericsoftware.com/spine-examples)
  - [Live2D Cubism](https://www.live2d.com/en/)（実況・VTuber文化の定番、Web SDKあり）
    - [Sample Data](https://www.live2d.com/en/learn/sample/) / [Showcase](https://www.live2d.com/en/showcase/)
  - DragonBones（無料のSpine代替）
- **モーショングラフィックス系**：After Effects＋パペットツール／Duik Bassel
- **配信・実況文化寄りの軽量手法**：AviUtl拡張編集の「振り子運動」「バウンド」等のイージング/
  揺れものプラグイン
- **Web実装に直結するツール**：[Rive](https://rive.app/)（`rive-react`でReactにそのまま組み込める）
  - [rive-react (GitHub)](https://github.com/rive-app/rive-react) / [awesome-rive（コミュニティ実例集）](https://github.com/rive-app/awesome-rive)

## 3. 動きのバリエーションが分かるページ

- [Twelve basic principles of animation（Wikipedia）](https://en.wikipedia.org/wiki/Twelve_basic_principles_of_animation)
  — squash & stretch、anticipation、follow throughなど、動きの元ネタが一通り揃う
- [easings.net](https://easings.net/) — イージング関数の一覧・可視化（Easing Functions Cheat Sheet）
- 上記Spine/Live2DのShowcase/Sampleページも、実際のキャラアニメパターンの参考になる

## 4. bluesnovel既存実装の確認結果

`sn_gallery` の `ext_fg2`（`gallery/?cur=ext_fg2`）で使われている `fg_squat`/`fg_shake`/
`fg_sidestep` は、`ext_fg.sn`（[sn_gallery/public/prj/ext_fg2/mat/ext_fg.sn:107-176](../sn_gallery/public/prj/ext_fg2/mat/ext_fg.sn#L107-L176)）で
**`[tsy]`の`path=`属性による複数キーフレーム列**として実装済みだった。

```
[tsy * name=&lay layer=&lay time=&t path=#&"(=-$x,=$y) (=0,=0) (=$x,=$y) (=0,=0)"# ease=Back.Out]
```

`(dx,dy) (dx,dy) ...` の形式で相対/絶対値混在のキーフレームを並べるだけで、震え（`fg_shake`は
同じ揺れ幅を20回連ねているだけ）・屈伸（`fg_squat`は沈む→戻るの2点）・反復横跳び（`fg_sidestep`は
左→中央→右→中央の4点）が表現できている。`Tw.ts`（`motion`の薄いラッパー）の拡張は不要で、
**キーフレーム列そのものは`[tsy path=]`で既にサポート済み**。

## 5. 今後の方針

- 新しい「動きのバリエーション」を増やすには、まず`path=`にどんな座標列を渡すかのレシピを
  増やす（12原則やeasings.netを参考にキーフレームパターンを設計する）だけで大半は賄える。
- イージング自体を区間ごとに変えたい（例：沈み込みはCubic.In、跳ね返りはBack.Out）場合にだけ
  `Tw.ts`/`motion`側の拡張が要る。
- パーツを実際に変形させたい（パペットワープ相当）要求が明確に出た場合のみ、Spine/Live2D/Rive
  導入を検討する。`[add_lay]`のプラグインレイヤー機構（[sn_gallery/src/plugin/3d_layer](../sn_gallery/src/plugin/3d_layer)と同系統）に載せる形になる想定。

## 6. WebGL 系 React ライブラリの評価（2026-08-28）

3Dレイヤ／`[trans] glsl=`（[TODO.md](TODO.md) 凍結）／立ち絵へのシェーダエフェクトの参考にと
挙がった 4 ライブラリを評価。前提として bluesnovel 本体は **DOM 合成**（コアに WebGL 無し。
フィルタは CSS 直変換 + SVG `feColorMatrix`）で、プラグインの口は `addTag(name, fnc)` と
`addLayCls(cls, factory)`（store 外・DOM 側。`FrameMng` と同系）の 2 つ。既存プラグインレイヤ
（3d_layer / live2d_layer）は**レイヤごとに自前 canvas + WebGL コンテキスト**を素 div へ
appendChild し、`[snapshot]` 対策で `preserveDrawingBuffer:true`。

### React Three Fiber — 採用しない

three.js 用の React レコンサイラ。3d_layer は意図的に React 外（`PlgLayMng`）で素の three.js を
命令的に叩き、本家 pixi 版とピクセル diff 一致まで取れている。R3F を入れると第 2 の React ルート
＋レコンサイラ overhead ＋バンドル増で、タグ機能としての利得ゼロ。JSX で 3D シーンを宣言的に
組みたい要求が出た時だけ再検討。

### gl-react v6 — フレームワークとしては採用しない

`<Surface>` + `<Node shader>` の React コンポジタで `gl-react-dom` 経由＝ React DOM 依存。
プラグインレイヤは非 React なので相性が悪い（第 2 React ルート問題）。v6.0.0 は 2026-05 頃、
npm dependents 13、歴史的に更新が飛び飛び（Gaëtan Renaudeau の個人プロジェクト）。
ただし `[trans] glsl=` に概念的には最も近い。→ [tag-notes.md](tag-notes.md) の該当凍結項目に
「やるなら gl-react でなく `gl-transitions` の GLSL ソース + 表裏 2 ページのラスタライズ結果を
一時 canvas へ描く生 WebGL 100 行程度のパス。`[trans]` を差し替える自己完結プラグインタグ」と
方針を追記済み。

### vfx-js（`@vfx-js/core` 1.1.0 ≈ 2026-06 ／ `@vfx-js/react` ／ MIT）

API の使い心地は要望どおり（`vfx.add(imgEl, {shader:'wave'})` / `vfx.remove(imgEl)`。プリセット
glitch / rgbShift / wave / pixelate / rainbow / spring / halftone / warp / duotone … ＋任意 GLSL。
React 不要で core 単体動作）。だが描画モデルが噛み合わない：

1. **単一グローバルオーバーレイ canvas。** `position:fixed` の全画面 canvas 1 枚に登録要素を毎
   フレーム転写し元要素は `opacity:0`。bluesnovel は `aPage[i]` 順で fg/txt/メッセージ窓/`[trans]`
   表裏を積むため、エフェクト付き立ち絵が単一 z に固まり**層間に挟めない**（emote_layer の共有
   canvas を凍結した理由と同じ構図。[plugin-layer.md](plugin-layer.md)）。
2. **CSS/SVG フィルタパイプラインと分離。** 出力 canvas がレイヤ DOM サブツリー外なので、後続の
   `[tsy]` transform / `opacity` / 親グループ不透明合成（`render=true` 等価トリック、
   [tag-notes.md](tag-notes.md)）がエフェクト済みピクセルに乗らない。
3. **`[trans]` foreIdx swap と `[snapshot]` toDataURL の経路外。** live2d_layer の
   toDataURL→`<img>` 差し替えに相当する処理が要るが、vfx-js は要素単位出力を出しにくい。
4. スケール／レターボックスされたステージ box に対し vfx-js は viewport 座標 +
   `getBoundingClientRect` 追従前提。ancestor の transform/zoom はハマりどころ。

### react-vfx — 使わない

vfx-js の旧版。GitHub リポジトリはリンク切れ。npm の `react-vfx` は残るが vfx-js へ誘導される。

### 結論

| 用途 | 判断 |
|---|---|
| 3D レイヤ | R3F 不要。現行の生 three.js プラグインで十分（parity 済） |
| `[trans] glsl=` | 凍結維持。やるなら `gl-transitions` GLSL + 生 WebGL パス（tag-notes.md に方針追記済み）。実現性の詳細は §7 |
| 立ち絵の簡易モーション | 新規コード不要。`[tsy path=]` レシピ増強（§5 の結論どおり） |
| 立ち絵にシェーダエフェクト（glitch/wave 等） | vfx-js を**依存に入れず**、短い GLSL プリセット数個を借りて実装。単一オーバーレイでなく**対象レイヤの DOM サブツリー内 `<canvas>`**方式（`[add_filter]` と同型の seam）。実現性の詳細は §7 |
| 全画面ポストエフェクト／タイトル／UI 演出 | 層間合成を気にしないので vfx-js core が単一オーバーレイのまま素直に使える。`addTag` 経由で低リスク＝**vfx-js の本当の適所** |

## 7. 実現性の詳細（2026-08-28、コードを追って確認）

### `[trans] glsl=` — 実装済み（2026-08-28、`src/ts/TransGlsl.ts`）

以下は着手前の実現性検討。実装は方針どおり生 WebGL の lazy モジュールで行った。ただし GLSL の契約は
「GL Transitions 仕様」ではなく**本家サンプル `glsl_slide` の契約**（`uSampler`／`tick`／
`vTextureCoord`、rule 併用時 `rule`／`vague`）をそのまま採用した——移植の目的は本家サンプルが動くこと
なので、既存 `.sn` のシェーダをそのまま流用できる方を優先した。

難所とされる 2 つがすでにこのコードベースに実装済み：

- **DOM のラスタライズ**：WebGL は `<div>` を直接テクスチャ化できない（`texImage2D` は
  img/canvas/video/ImageBitmap のみ）。だが [Snapshot.ts](Snapshot.ts の実体は
  `../../src/ts/Snapshot.ts`) が「DOM → cloneNode → foreignObject SVG → data-URL `<img>`」を
  外部ライブラリ無しで実装済み。CSS/SVG フィルタ・`mix-blend-mode`・emotion の `<style>`・
  プラグイン `<canvas>`（toDataURL 差し替え）まで面倒を見ている。
- **進度の駆動**：`src/components/Stage.tsx` のルール画像ワイプが「rAF で `tick` を 0→1、
  純粋関数（`src/ts/Trans.ts`）で見た目」という分離を持つ。glsl 版も同じ骨格。

実装の勘所：

- `[trans]` 開始時に表ページ・裏ページ（Stage.tsx の 2 枚の `styPage` div）を snapshot して
  2 枚の `HTMLImageElement` を得る → GL テクスチャへ。
- GL Transitions 仕様（`transition(uv)` + `getFromColor`/`getToColor` + `progress`）の GLSL を
  そのまま流用（[gl-transitions](https://github.com/gl-transitions/gl-transitions) は MIT）。
  エンドポイントは静的なので**フレームごとの再ラスタライズは不要**。
- ステージに重ねた一時 canvas で描画、rAF で `progress`、完了で canvas 破棄 →
  `store.finishTrans()`。
- **コアには載せず lazy import のオプションモジュール**にする（`glsl=` が使われた時だけ読む＝
  未使用時のバンドル影響ゼロ）。~150–250 行。

制約（いずれも `[snapshot]` の既知の穴をそのまま継承）：

- iframe（`[add_frame]`）は写らない。ただし本家 web 版の `[trans]` も同じなので結果は一致。
- `<video>`（動画 fg）は snapshot 時に落ちる → 再生中動画をまたぐ trans は一瞬止まる。
- 色管理はむしろ本家 pixi に**近づく**（現状の SVG 経路が `colorInterpolationFilters="sRGB"` で
  無理に合わせている部分）。
- 部分レイヤ trans（`aLayNm` 指定）+ glsl の合成はエッジケース。全画面クロスフェード置換が主用途。

### 立ち絵・背景シェーダエフェクト（`[add_fx]` 一族）— 正式化決定（2026-08-28）

最小スパイク（`[add_fx]`/`[clear_fx]`、プリセット wave / rgbShift）を実装し sn_gallery
（`prj/add_fx/`）で実機確認 → 費用対効果の判断ゲート（[TODO.md](TODO.md)）を通過。**正式化する。**
当初 ★★☆ に置いた凍結寄りの各論点は、再検討でほぼ崩れた：

| 当初の凍結論拠 | 再評価 |
|---|---|
| face 合成が実コスト大 | オフスクリーン 2D canvas を 1 段挟むだけ（静止画は差分変化時のみ合成、sheet/動画は毎フレーム転写）。~30–50 行 |
| 本家サンプル互換の後ろ盾なし | CLAUDE.md の禁止は「本家に足さない」「逆輸入しない」だけ。分家独自機能は方針通りで、むしろ本家→分家の移行動機になる |
| シェーダが要るのは「画素を歪める」系だけ | 生 `glsl=` でこそ要る。天候（雪・雨）・花火・タイルスクロール等、背景演出に実用途が多数（下記カタログ） |
| レイヤごと WebGL コンテキスト + rAF | 「数十枚は重い」は理論値。実運用は同時 1〜3。背景も grp レイヤなので既存 seam でそのまま効く（立ち絵専用ではない） |
| プリセット GLSL のメンテ負担 | GLSL ES 1.00 は凍結仕様でシェーダは腐らない。増えるのはテスト・ドキュメントの面積のみ |
| 外部要求がまだ無い | 新機能は作って「こう使える」と提示するもの。未使用時は lazy でコストゼロ、使用時コストはドキュメント明記で足りる |

未使用時コスト＝lazy モジュール＋GrpLayer の 1 分岐（~30 行）のみ。恒久 seam の傷は小さい。

#### GLSL 契約 — 分家ネイティブ（`[trans glsl=]` と名前を揃える）

「Shadertoy 対応」はエンジンに入れない。Shadertoy は GLSL の方言ではなく、エントリポイント
（`mainImage`）＋固定名 uniform（`iTime`/`iResolution`/`iChannel0`…）＋`main()` 自動連結という
**お膳立て**にすぎない。ランナーにシムを持つと `i*` uniform 台帳・未対応機能
（マルチパス/キューブマップ/音声）の踏み外し対策を抱える。

方針：**実行時でなく開発時に変換する**。FxRunner は分家独自の素の GLSL ES 1.00 契約のままとし、
Shadertoy シェーダはプリセット化・ギャラリー掲載時にこちらが手で移植する（1 本 ~5 行の機械置換）。
生 `glsl=` を直に書く作者も同じ変換を行い、マッピング表を `docs/tag.html` に載せる。

契約は `[trans glsl=]`（[TransGlsl.ts](../../src/ts/TransGlsl.ts)、本家 `glsl_slide` 契約）と名前を
揃える＝分家内で 1 回学べば両方書ける：

| uniform / varying | 意味 | Shadertoy 対応 |
|---|---|---|
| `uSampler`（sampler2D） | 入力画像（前パス結果 or レイヤ画像） | `iChannel0` |
| `vTextureCoord`（vec2） | 正規化 UV（0..1、y-up） | `fragCoord / iResolution` |
| `tick`（float） | 経過秒 × `speed=`（0 起点） | `iTime` |
| `resolution`（vec2） | canvas 実ピクセルサイズ | `iResolution.xy` |
| ＋プリセット固有（`amp`/`freq`/`shift`…） | 既定は [Fx.ts](../../src/ts/Fx.ts) の `H_FX_DEF` | — |

実装済み（2026-08-28、step 3）：スパイクの `src`/`vUv`/`time` を `uSampler`/`vTextureCoord`/`tick` へ
リネーム（`fxPresets.ts` の頂点・素通し・wave・rgbShift、`FxRunner.ts` の uniform 取得）。生 `glsl=` は
`Fx.bldFx()` が受理し（`fx=` と排他）、`FxRunner` が `fx.glsl || H_FX_FRAG[fx.fx]` でパスを組む。
`FxImg` の `structKey` に `f.glsl` を含むのでシェーダ差し替えは canvas 再生成。y-up のまま（`[trans]` は y-down）。

#### fx の 2 カテゴリ

| 種別 | 例 | `uSampler` の扱い |
|---|---|---|
| 歪み系（transform） | wave / rgbShift / mosaic / blur アニメ | 読んで変形 |
| 生成・重ね系（generative） | 雪 / 雨 / 花火 / タイル塗り＋スクロール | 主に生成し入力の上へ合成 |

どちらも「シェーダが `uSampler` を読み出力を書く」で表現でき、生成系は入力をほぼ無視して
上乗せするだけ。背景に雪＝bg（`class=grp`）の `aFx` へ積めば既存 seam でそのまま動く。
「砂雨が立ち絵の形に避ける」はシーン全体を入力にする別物＝構想メモ止まり。

#### セーブ・ロード

`aFx` は `getPagesJson`/`replace` で round-trip 済み（`test/store_lay.test.ts`）。生 `glsl=` は
**解決済み文字列を `T_FX.glsl` に焼いてセーブファイルへ**（`[add_filter]` と同じ「消すまで永続」。
`[trans]` のような transient ではない）。1 シェーダ ~1K のセーブ肥大は許容とドキュメント明記。
作者は `glsl=&mySnow` と変数経由で書く想定。

#### 不可視 back ページで停止

`[trans]` 後は fx レイヤごとに canvas が表裏 2 枚でき、裏は不可視なのに rAF+WebGL が回る。
`FxImg` に「表ページか / trans 中か」を渡し、非表示なら rAF 停止（コンテキスト保持・最終フレーム
凍結）、再表示で再開。[TODO.md](TODO.md) の「不可視 back ページの最適化調査」（プラグイン拡張
レイヤ・`[tsy]` も同様に裏ページで走っていないか）と統合して見る。

#### step 2（`[wait_fx]` ＋ `[pause_fx]`/`[resume_fx]`）— 完了（2026-08-28）

タグ名：pause/resume は `[pause_tsy]`/`[resume_tsy]` に倣って **`[pause_fx]`/`[resume_fx]`** とした
（初稿の `[enable_fx enabled=]` は不採用。`enable` はイベント語彙〈`[enable_event]`〉、`[enable_filter]`
は「何番目を効かせるか」の選択で再生の一時停止ではない。`stop` は `[stop_tsy]` が不可逆の終了専用語）。

- **`[wait_fx]` は `ScriptMng` が one-shot タイマーを持つ**（`[quake]` と同型。WebGL ランナーからの
  終了通知は作らない）。`[add_fx time>0]` で `ScriptMng` が `act.fx.time` のタイマーを張り
  （`#aFxTimer[]`）、`[wait_fx]` はセレクタに一致する未経過タイマーが尽きるまで待つ
  （`#tsyWaiting` の複数版 `#fxWaiting`。ids の Set）。`clearFx`/`clearLay`/ページ演じ直しの `replace()`
  で `#dropFxTimers()` がタイマーも落とす。`canskip` はクリックで即完了（`#skipFxWait()`）。
  ランナーの凍結との数 ms のズレは許容（`[add_fx]` は通常 `[lay]` 直後で画像ロード済み）。
  セレクタ照合（`#fxMatch`）は `[add_fx]` の `layer=` を具体レイヤへ解決せず、セレクタ同士の交差で
  判定する割り切り（`layer=` 省略＝全レイヤ＝`null` は常に一致）。無名 fx の `#fxN` はエンジンから
  見えないので名前 `''` 扱い＝`[wait_fx layer=…]` でのみ待てる。
- **`[pause_fx]`/`[resume_fx]` は canvas を作り直さない**。`FxImg`（`GrpLayer.tsx`）の再生成 `key` を
  「シェーダ構成（fx 名/glsl/パス数）」だけに絞り（`structKey`）、プリセットパラメータ・`speed`・
  `time`・`enabled` は `FxRunner` の制御ハンドル `update(aFx)` でホットスワップ（`contentKey` の
  変化で `useEffect`）。`FxRunner.setup()` は `()=>void` でなく `{update, dispose}`（`T_FX_HANDLE`）を
  返す。パスごとに `pausedAccMs`/`pausedAt` を持ち、無効化中の経過を tick から差し引く（＝tick 凍結。
  描画自体は続ける＝前段パスが動けば入力は変わる）。全パスが無効／経過なら `raf=0` にして停止、
  `update()` で再開できる。**この「再生成せず rAF を止める/戻す」機構を step 5（不可視 back ページ
  停止）が `update()` に `active` 引数を足して流用する。**
  一時停止中は `[wait_fx]` タイマーも止める（`#pauseFxTimers()` が残時間を保持。`[pause_tsy]` と対の
  タグなので）。`store.chgFx` に `mode:'enable'`（`index=`／`name=`／全部）。
- 触ったファイル：`Fx.ts`（`T_FX.enabled`）／`ScriptEngine.ts`（`wait_fx`＋`pause_fx`/`resume_fx`＋
  `waitFx`/`enableFx` アクション）／`ScriptMng.ts`（`#aFxTimer`＋`#fxWaiting`＋`#pauseFxTimers`）／
  `store.tsx`（`chgFx` の enable モード）／`FxRunner.ts`＋`GrpLayer.tsx`（`T_FX_HANDLE`）／
  `test/ScriptEngine_fx.test.ts`＋`test/store_lay.test.ts`＋`test/e2e/fx.e2e.ts`＋`docs/tag.html`。

#### step 4（face 差分合成）— 静止 face 分は完了（2026-08-28）

`GrpLayer.tsx` の `FxImg` が、基本画像＋**静止** face を offscreen 2D canvas へ `drawImage` で
1 枚に合成し（`compositeFace()`。blendmode→`globalCompositeOperation` は
`plus-lighter`→`lighter` / `multiply` / `screen` / 既定 `source-over`）、その canvas を
`FxRunner.runFx({source})` へ渡す。`runFx` の `source` は `string | HTMLCanvasElement | HTMLImageElement`。
合成は `structKey`（`src`＋face の `src@dx,dy,blendmode`＋シェーダ構成）が変わった時だけ＝毎フレームではない。
合成した静止 face は DOM オーバーレイから外す（`GrpLayer` の描画分岐）。**sheet／動画 face は未対応**＝
従来どおり手前に DOM で重なる（毎フレーム転写は残り）。外部ドメイン画像は 2D canvas を汚染し
`texImage2D` が落ちる（`[snapshot]` と同じ制約）。

#### 用途カタログ（背景演出中心。ギャラリー実演の母集団）

主に背景（bg grp レイヤ）に積む想定。**Shadertoy 既定ライセンスは CC BY-NC-SA 3.0（非商用）**
なので、バンドル用は「作者が商用可を明示」か「技法から再実装」に限る。技術ブログ公開の
GLSL/HTML/CSS は概ねフリー扱い可。

- 天候
  - 雪：[少](https://www.shadertoy.com/view/ldsGDn) / [多（codepen）](https://codepen.io/UstymUkhman/pen/jpZGZW) / [ふわっと降雪](https://www.shadertoy.com/view/4lfcz4) / `docs/simple snow.glsl`（自作の最小例）
  - 雨：[弱い雨](https://www.shadertoy.com/view/M3GfDV) / 豪雨（弱い雨の落下速度・密度・筋長を上げる派生）/ [砂の雨](https://www.shadertoy.com/view/wdGSzw) / [真上からの水面波紋](https://www.shadertoy.com/view/ldfyzl) / [運転中の車窓の雨](https://www.shadertoy.com/view/MdfBRX) / [ガラスを流れる水滴（総本山）](https://webgl.souhonzan.org/entry/?v=0412) / [ガラス越しの雨＋稲光](https://www.shadertoy.com/view/ltffzl)（稲光は単体 fx にして重ねがけが良さそう）
  - 花火：[Happy 2020!](https://www.shadertoy.com/view/tt3GRN) / [Fireworks Performance](https://www.shadertoy.com/view/tfXcz8)
- タイル塗り＋スクロール：画像をタイル状に敷き詰めて一定方向に無限スクロール。雨・棚引く煙・霧の中に
- 他エンジンで見るもの：ぼかしアニメ（`[add_filter] blur` に時間変化）／モザイク・ビットマップ状タイル塗り／Ren'Py・TyranoScript の公式プリセット相当

#### fx でないもの（棲み分け）

- **`[add_filter]` 候補**（動きが無い色加工）：夕焼け / 夜 / 月明かり
- **マクロで足りるもの**：`[ext_fg]`/`[ext_fg2]`、漫画表現拡張（[blog](https://famibee.blog.fc2.com/blog-entry-565.html)）
- **既にタグ化済み**：`[quake]`
- **非サポート確定**：文字レイヤ枠画像のシート再生（[TODO.md](TODO.md) 旧・アニメpng節）——文字が読みづらくなる
- 別件（本家 `[trans glsl=]` 契約側、TODO に独立項目）：ぼかし `[trans glsl=]` / モザイク `[trans glsl=]`

#### ギャラリー実演の調査（実装後）

- 全画面の壮大風景は対象外。雨・夕焼けのように**ノベル素材との組合せで役立つもの**だけ
- ライセンスを明示（MIT/CC0/商用可か、技法からの再実装か）
- 羅列でなく**動作確認できるページの URL 付き**（例：codepen / Shadertoy の該当ビュー）
- 調査候補：[ghostty-shaders（MIT）](https://github.com/0xhckr/ghostty-shaders) / [WebGL 総本山](https://webgl.souhonzan.org/) / [Shadertoy](https://www.shadertoy.com/)（人間認証で見られない場合あり）

---

以下は当初（スパイク着手前）の検討メモ。設計の背景として残す。

#### 個別コンポーネント方式が正解

「単一オーバーレイ canvas」で潰れた 4 つの問題（§6 の 1〜4：層間合成・フィルタパイプライン・
`[trans]`・`[snapshot]`）は、**エフェクト canvas を対象レイヤの DOM サブツリー内に置く**と全部消える：

- `src/components/GrpLayer.tsx` は今 `<img>` を `<div data-lay>` 内に描き、`styLay()`
  （`src/components/Lay.ts`）が transform/opacity/z 順/blendmode を与えている。`<img>` の代わりに
  **レイヤ実寸の `<canvas>`（WebGL）**を描けば、これら全部を自動で継承する。
- `[snapshot]` の `<canvas>` → toDataURL 差し替えは Snapshot.ts で対応済み
  （`preserveDrawingBuffer:true` は 3d/live2d と同様に必要）。
- `[trans]` でレイヤデータが両ページに複製され canvas が 2 つになる件は、3d_layer がすでに
  許容している設計（「通常 1 枚なので WebGL コンテキスト 2 個は許容」）。

実装の勘所 — `[add_filter]` の構造を踏襲する：

- `[add_filter]` は `T_LAY_STY.aFlt: T_FLT[]` + `chgFilter` store アクション +
  `styFilter`/`feColorMatrix` という**境界の切れたコア seam**。同じ形で `aFx: T_FX[]`
  （シェーダ記述子）を足す。
- コア seam は GrpLayer に ~20 行（`aFx` が非空なら `<FxImg>` = canvas コンポーネントへ分岐）。
  **シェーダ本体（プリセット GLSL + WebGL ランナー）は lazy import の外部モジュール**。
  プリセットは vfx-js の MIT シェーダソース（wave / rgbShift / glitch / pixelate …）を移植。
- face 差分合成（`aFace`）は、base + face `<img>` を一旦オフスクリーン 2D canvas へ `drawImage`
  して 1 テクスチャにまとめてからシェーダへ。1 ステップ増えるが素直。
- RGB シフト等の「箱外へにじむ」系は canvas をレイヤ box より大きめ + `overflow:visible`。

**vfx-js パッケージ自体は使えない**：`VFX` クラスは `position:fixed` 全画面 canvas +
`getBoundingClientRect` スキャンが前提で、個別要素/in-flow 化はフォーク相当。→ **依存に入れず
GLSL だけ借りる**が確定。

コスト：`[trans] glsl=` より高い。理由は (a) 純粋プラグインでなくコア seam が要る、
(b) face 合成の 1 ステップ、(c) エフェクト適用レイヤごとに WebGL コンテキスト + rAF ループ
（数枚なら可、数十枚は重い）。

### タグインターフェイス案 — `[add_filter]` の対象指定 + `[tsy]` のライフサイクル

**着眼**：「アニメのライフサイクルを持つ」＝ `[add_filter]`（静的値）より `[tsy]` に近い。
`[tsy]` 一族はライフサイクル語彙をすでに完備している（[ScriptEngine.ts:1536-1600](../../src/ts/ScriptEngine.ts#L1536)）：
`[tsy]` 開始（待たない・`skip` を返す）／`[wait_tsy name=]` 終了待ち／`[stop_tsy name=]` 中断／
`[pause_tsy]`・`[resume_tsy]`。`name=` で個体を識別（`tsyName()`）。**この形をそのまま借りる。**

一方、対象レイヤの選び方（`layer=` + `page=`）と「スタック可能な記述子配列」は `[add_filter]` の
`aFlt` seam が持つ。fx はこの 2 つの折衷になる：

```
[add_fx    layer=me name=w fx=wave amp=4 freq=1.5 speed=0.8]   ; 常時ゆらぎ（time= 省略＝無限）
[add_fx    layer=me name=g fx=glitch intensity=0.6 time=400]   ; time>0 で one-shot
[wait_fx   layer=me name=g]                                    ; me の g の終了待ち（[wait_tsy] と同形）
[wait_fx   name=shake]                                         ; どのレイヤであれ shake 全部が終わるまで
[wait_fx   layer=me]                                           ; me に載っている fx 全部の終了待ち
[add_fx    layer=me glsl=&mySrc]                               ; 生シェーダ
[pause_fx  name=shake]                                         ; 全レイヤの shake を一時停止
[resume_fx layer=me]                                           ; me の fx 全部を再開
[clear_fx  layer=me]                                           ; 全部剥がす（= stop + 撤去）
```

**タグは 5 つ**（pause/resume を対で数えれば 4 概念）。`wait=true` 属性は作らず、`[tsy]` の流儀どおり
別タグ `[wait_fx]` にする（コードベースの一貫性。`[tsy]` にも `wait=` は無い）：

| fx タグ | 対応する既存概念 |
|---|---|
| `[add_fx]` | `[tsy]` 開始 ＋ `[add_filter]`（`aFx[]` へ push） |
| `[clear_fx]` | `[stop_tsy]` ＋ `aFx[]` からの撤去（記述子を消せば rAF ループも止まる） |
| `[pause_fx]`／`[resume_fx]` | `[pause_tsy]`／`[resume_tsy]`（記述子は残し描画だけ止める） |
| `[wait_fx]` | `[wait_tsy]`（`ScriptMng` が `waitFx` アクションを持つ） |

#### 内部モデル：`aFx` はレイヤのレコード内、名前はレイヤスコープ

`aFlt?: T_FLT[]`（[Lay.ts:67](../../src/components/Lay.ts#L67)）が今レイヤの store レコードに直接ぶら下がって
いるのと同じく、`aFx: T_FX[]` も**各レイヤのレコードの中**にある。だから「layer スコープ」は別レジストリ
ではなく、**配列がそのレイヤに格納されている**というだけ。`[tsy]` のような単一トゥイーンレジストリ
（`tsyName()`）は持たない。

- 各 `T_FX` は `name: string` を持つ。同定は **「どのレイヤの `aFx` にいるか」＋ `name`**。
  → 別レイヤに同じ `name` を持てる（`[add_fx layer=me name=shake]` と `[add_fx layer=you name=shake]`
  は別物。同じレシピを複数キャラに使える）。
- `[add_fx name=w …]` の再指定は**同レイヤの同名要素を置換**（`[tsy]` の「同名で再開」と同じ）。
- `[add_fx …]`（`name=` 省略） → store の `chgFx` が**そのレイヤ内で**一意な `#fx1`, `#fx2` … を採番
  （`#` 前置＝人間が `name=` に書かない字。`[tsy_frame]` の `frm\nID` と同じ衝突回避）。**別カウンタは
  持たず**、そのレイヤの既存 `#fxN` の最大 +1 を使う——`aFx` は `getPagesJson()`／`replace()` で
  レイヤレコードごと round-trip するので、採番も `[save]`/`[load]` で自動的に復元される（実装 2026-08-28。
  round-trip は `test/store_lay.test.ts`）。`[trans]` の両ページ複製は `aFlt` 同様に自動追随
  （各ページのレイヤコピーが同名の `aFx` を持つ）。

`[wait_fx]`/`[pause_fx]`/`[resume_fx]`/`[clear_fx]` のセレクタは、この `aFx` 群に対する **AND で効く 2 フィルタ**
（少なくとも一方は必須）：

| 指定 | 対象 |
|---|---|
| `name=x,y`（`layer=` 省略） | 全レイヤの `aFx` から `name ∈ {x,y}` |
| `layer=A,B`（`name=` 省略） | レイヤ A・B の `aFx` 全要素（`#argLayNames` 共用）。無名 fx に触れる手段 |
| `layer=A name=x` | A の x だけ |
| `layer=A,B name=x,y` | {A,B} × {x,y} の一致分すべて |

- `[wait_fx]` は一致集合**全部**の終了通知が揃うまで `ScriptMng` が保持（`waitFx` アクションが
  一致キー配列を持つ。`waitTsy` の単数版を配列化しただけ）。「マージして待つ」＝この**結果集合の和**を
  待つという意味。`[wait_fx name=shake]` で「全員シェイク → 揃うまで待つ」が 1 行。
- `[pause_fx]`/`[resume_fx]` は加えて `index=`（`[enable_filter]` 由来。`layer=` 併用でそのレイヤの N 番目）も可。
- **無名 fx は `name=` でアドレスできない**（`#fx7` は生成順依存で予測不能。シナリオからは書かない）。
  後で個別に止めたい/待ちたい fx には `name=` を付ける。付けなければ「このレイヤの fx は `layer=` で
  まとめて管理する」という意思表示。
- `page=` は `[add_fx]` のみ（`#argPageBoth`。既定 `fore`）。

#### レイヤクリア（`[er]`／`[clear_lay]`）との関係 — `aFlt` に完全に倣う

前提として **fx は grp レイヤ（立ち絵）専用**（§7 は GrpLayer の `<img>`→`<canvas>` 差し替えが土台。
TxtLayer は別コンポーネントで seam が無い）。だから `[er]`（文字レイヤ操作。grp には触れない）は
そもそも fx に無関係。

`aFlt` の既存挙動をそのまま踏襲する：

| タグ | `aFlt` の今の挙動（[store.tsx:528-548](../../src/store/store.tsx#L528)） | `aFx` もこうする |
|---|---|---|
| `[er]` | `clearTxtLay`。`clear_filter=true` の時だけ `aFlt` を落とす（既定は残す） | 文字レイヤに fx を許すなら `clearFx` を `clearFilter` と並べる。grp 専用のうちは無関係 |
| `[clear_lay]` | `clearLay`。`A_LAY_STY_KEY`（**`'aFlt'` を含む**）を `visible` 以外全部 delete＝**無条件で `aFlt` が消える**。grp は `fn`/`src`/`aFace` も空に | `A_LAY_STY_KEY` に `'aFx'` を足す＝`[clear_lay]` で無条件に落ちる |

- **ユーザーの記憶（「`[tsy]`/`[add_filter]` は何もしなかった」）の内訳**：`[er]` については正しい
  （`aFlt` は残る）。`[clear_lay]` は違い、`aFlt` は `A_LAY_STY_KEY` 経由で既に無条件クリアされる。
  `[tsy]` は本家では `[er]`/`[clear_lay]` のどちらでも走行中トゥイーンを止めず、初期化した見た目を
  上書きし続ける（トゥイーン実体が `ScriptMng`/motion 側で store 外）。**分家では
  `#stopTsyByLayer()` を `clearLay`/`clearTxtLay`/ページ演じ直しの `replace()` に配線して修正済み**
  （本家 `skynovel_esm/TODO.md` に既知不具合として記載）。fx はこの配線に相乗りする——記述子撤去で
  `<FxCanvas>` が unmount するので追加の帳簿は不要（前述）。
- **fx の後始末は `[tsy]` と違って自動**：記述子が `aFx` から消える（`[clear_fx]`／`[clear_lay]`／
  `[trans]` のページ置換）と `<FxCanvas>` が unmount → `useEffect` cleanup が WebGL コンテキストと
  rAF ループを破棄する。`[stop_tsy]` のような明示 `.stop()` の帳簿を `ScriptMng` に持たせる必要が
  ない。だから「クリアされたレイヤに rAF が残る」リークは構造的に起きない。
- `[clear_lay]` が grp の `src` を空にしたのに `aFx` だけ残ると「テクスチャ源の無い canvas」に
  なるので、`A_LAY_STY_KEY` への追加は必須（任意ではない）。

#### `[add_filter]` から増える属性（`[add_fx]`）

- `name=`（任意。**そのレイヤの `aFx` 内で**一意な識別子。省略時は上記の内部採番。`[tsy]` と違い
  レイヤ名は既定にしない——`[tsy]` は 1 レイヤ 1 トゥイーンだが `aFx` はスタックなので衝突する）。
- `time=`（ms。省略/`0`=無限＝常時ゆらぎ、正数=one-shot）、`speed=` / `loop=`。one-shot 完了時は
  記述子を `aFx` から自動撤去（＝canvas/コンテキストも解放。`[add_filter]` の「消すまで永続」とは
  逆）。`keep=true` で最終フレームのまま凍結（撤去せず `enabled` を保つ）。`[wait_fx]` は撤去/凍結の
  どちらでも「完了」で待ちを解く。
- `fx=wave|rgbShift|glitch|pixelate…` or `glsl=&src`。生 GLSL の契約は `[trans glsl=]` と同じく
  **本家サンプル準拠**（`uSampler` / `vTextureCoord` / `tick`）。
- プリセット固有パラメータ `amp=` `freq=` `shift=` 等（`[add_filter blur_x=]` と同じノリ）。

store 経由なので `aFx` は `aFlt` 同様しおり（`[save]`/`[load]`）・`[trans]` の両ページ複製に自動追随。

> 初稿は `[enable_fx layer=]` だけ書いて `[wait_fx]` を `name=` 限定にしていたが、理由の無い非対称
> だった。pause/resume/wait いずれも `name=`（複数・全対象）／`layer=`（そのレイヤの fx 全部）を同じく受ける。

**本家には導入しない。** `[add_fx]` 一族・`aFx` seam は分家（bluesnovel）だけの新機能。本家
（`skynovel_esm`）へ逆輸入はしない（[CLAUDE.md](../../CLAUDE.md) 冒頭の方針）。よって `[trans glsl=]` の
ように「本家サンプルが動く」実利は無く、純粋に分家独自の演出強化。この点は推奨度に反映済み（下記）。

### 規模の内訳

| 部位 | 行数目安 | 備考 |
|---|---|---|
| コア seam（`aFx: T_FX[]`／`chgFx`／`[add_fx]`等 4 タグ／`T_ENGINE_ACTION`／Grammar 型） | ~170 | `aFlt` の seam ＋ `[wait_tsy]` の `waitFx` 版（`ScriptMng` ~15 行）。ほぼ定型 |
| GrpLayer 分岐 + `<FxCanvas>` コンポーネント | ~80 | `aFx` 非空で `<img>` を canvas に差し替え。サイズ同期・mount/unmount |
| lazy WebGL ランナー（`src/ts/FxRunner.ts`） | ~150–250 | `TransGlsl.ts`（~230 行）が土台。テクスチャ／コンパイル／rAF／uniform／破棄／終了通知（`[wait_fx]` 用） |
| プリセット GLSL（`src/ts/fxPresets.ts`） | ~150–250 | vfx-js（MIT）から移植。1 個 20–50 行 × 数個 |
| face 合成（offscreen 2D canvas で base+face を 1 枚に） | ~30 | |
| Snapshot 連携／`[trans]` 2 コンテキスト | ~0 | [Snapshot.ts:80](../../src/ts/Snapshot.ts#L80) の canvas→toDataURL がそのまま効く。`preserveDrawingBuffer:true` 必須 |

**コア ~250 行 + lazy モジュール ~350–530 行（うち半分はプリセット）**。`[trans glsl=]`（~230 行・
純粋 lazy）の 2〜3 倍。

### プラグイン化は可能か — 3 経路

| 経路 | 可否 | 評価 |
|---|---|---|
| **A. `addLayCls` で専用レイヤ class**（`[add_lay class=fx]`。3d_layer / live2d_layer と同型） | ○ | `PlgLayMng` が record/playback/trans/destroy を丸ごと持つのでコア無改変。**欠点**：既存 grp レイヤ（`[ch]` で置いた立ち絵）に**後がけできない**。エフェクト対象は最初から `class=fx` で置く約束を `.sn` に強いる。`aFace`（face 差分）も grp の機能なので fx レイヤ側に再実装が要る |
| **B. `addTag` だけで既存レイヤの `<img>` に canvas をかぶせる**（`[add_frame]`/FrameMng 発想） | △ | 位置問題は消えるが、`<img>` を React（GrpLayer）が所有しているため `[lay fn=]`／`[trans]`／`[hide]` のたびに MutationObserver で追う羽目に。§6 で vfx-js を落とした 4 問題が「React 所有 img との同期」の形で戻る。しおり・`[snapshot]` も自前。**非推奨** |
| **C. コア seam（`aFx`）+ ランナー/プリセットのみ lazy 外部モジュール**（§7 の本線） | ◎ | GrpLayer に恒久的な ~20 行の分岐が入る＝純粋プラグインではない。が重い部分は全部 lazy import で、`[add_fx]` 未使用時のバンドル影響はコア seam 数十行のみ。`[add_filter]` と同じ運用（後がけ可・face そのまま・clear/enable・しおり自動） |

「addTag だけの完全プラグイン」は B で技術的には可能だが同期地獄。A は綺麗にプラグイン化できるが
運用モデルが変わる。**C が費用対効果最良**（コアの傷は GrpLayer の 1 分岐だけ）。

### 推奨度

- `[trans glsl=]`（実装済み）：**★★★★☆**。純粋 lazy・リスク低・本家サンプルがそのまま動く実利。
- 立ち絵・背景シェーダ（C 方式）：**★★★☆☆**（2026-08-28、判断ゲート通過で ★★☆ から上方修正）。
  恒久 seam は GrpLayer の 1 分岐（~30 行）のみ・未使用時 lazy でコストゼロ。face 合成は 1 段の
  offscreen canvas で軽い。生 `glsl=` で天候・花火など背景演出に実用途があり（用途カタログ参照）、
  「作者がシェーダを持ち込める」実利が出る。★★★★ に届かないのは (a) レイヤごと WebGL
  コンテキスト + rAF（同時 1〜3 は可、それ以上は要注意）、(b) 本家サンプル互換の後ろ盾が無く
  仕様を自前で保証、(c) プリセット GLSL のテスト・ドキュメント面積、の 3 点。

### まとめ

| | 実現性 | 方式 | 規模 | 推奨度 |
|---|---|---|---|---|
| `[trans] glsl=` | ○（実装済み） | Snapshot.ts で表裏 2 ページをラスタライズ → 本家 `glsl_slide` 契約の GLSL → rAF。lazy モジュール | ~230 行・純粋 lazy | ★★★★☆ |
| 立ち絵・背景シェーダ | ○（正式化決定・実装中） | `[add_fx]`/`[clear_fx]`/`[wait_fx]`/`[pause_fx]`/`[resume_fx]` 実装済（対象指定は `[add_filter]`、ライフサイクルは `[tsy]` 一族に倣う）。`aFlt` と同型の `aFx` seam。GrpLayer が `<canvas>` 分岐。GLSL 契約は `[trans glsl=]` と名前統一（`uSampler`/`vTextureCoord`/`tick`）、Shadertoy は開発時に手変換。**本家には入れない分家独自機能** | コア ~250 行 + lazy ~350–530 行 | ★★★☆ |

どちらも gl-react / R3F は不要。プラグイン化は「専用レイヤ class（A）」なら可能だが後がけ不可・face
再実装が要る。GrpLayer に 1 分岐だけ入れる C 方式（コア seam + lazy モジュール）が費用対効果最良。
実装順は [TODO.md](TODO.md) の「シェーダエフェクト」節。
