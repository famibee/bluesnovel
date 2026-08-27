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

### `[trans] glsl=` — 実現できる（中規模・フレームワーク不要）

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

### 立ち絵シェーダエフェクト — 実現できる。個別コンポーネント方式が正解

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

### まとめ

| | 実現性 | 方式 | 規模 |
|---|---|---|---|
| `[trans] glsl=` | ○ | Snapshot.ts で表裏 2 ページをラスタライズ → GL Transitions GLSL → rAF。lazy モジュール | 中（~200 行） |
| 立ち絵シェーダ | ○ | `aFlt` と同型の `aFx` seam。GrpLayer が `<canvas>` 分岐。GLSL は vfx-js から移植、パッケージ非依存 | 中〜大（コア seam + 外部モジュール） |

どちらも gl-react / R3F は不要。まず立ち絵側をプリセット 2〜3 個で試作するのが費用対効果が高い。
