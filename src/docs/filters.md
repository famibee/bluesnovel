# フィルタ

本家22種のうち `noise` 以外の21種に対応済み（`src/ts/Filter.ts`）。CSS 直変換9種 +
`feColorMatrix` へ流す残り2系統、`multiply` 属性は無視。
サンプル <https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/filter>

## `predator` / `color_tone` の色味差（優先度低・保留）

実機比較でやや色味に差が出た。2026-08-12 に行列自体を再確認：`src/ts/Filter.ts` の数値は
`@pixi/filter-color-matrix` の `predator()`/`colorTone()` と完全一致し、本家 `Layer.ts` 側の
呼び出しも両方とも `multiply` 既定 `false`（＝オフセット列の `/255` 変換は本家側もしていない）で
揃っている。`Stage.tsx` の `colorInterpolationFilters="sRGB"` も設定済みで既定 `linearRGB` への
取り違えでもなく、素材画像の ICC プロファイルも埋め込み無し／標準 sRGB のみで色管理差という線も
弱い。

矛盾しない残りの可能性は pixi の GLSL シェーダが行うアルファの un-premultiply/premultiply
（`c.a>0` 時 `c.rgb/=c.a` → 行列適用 → `rgb*=result.a`）と SVG `feColorMatrix` 側のアルファ処理の
違い、または WebGL と SVG のラスタライズパイプライン差だが、これは実機でのピクセル値比較でしか
切り分けられないため優先度低のまま保留。

## `[add_filter] blur` の pixi 専用パラメータ（対応不可・保留）

2026-08-27 調査（本家 `Layer.ts:115-127` と `src/ts/Filter.ts` を突き合わせ）。

- `quality`/`resolution`/`kernel_size` は WebGL レンダーパイプライン内部の実装詳細（ぼかしの
  パス数・内部レンダーテクスチャ解像度・ボックスぼかし近似のカーネル幅）で、CSS の
  `filter: blur()` にも SVG の `feGaussianBlur` にも対応する差し込み口が無いため**対応不可**。
- `repeat_edge_pixels`（既定 `false`。`true` でエッジをクランプ＝引き伸ばす）だけは SVG
  `feGaussianBlur` の `edgeMode` 属性（`"duplicate"`/`"none"`）で近似できる余地があるが、
  `blur_x`/`blur_y` 指定時（SVG の `feGaussianBlur` 経路。`src/ts/Filter.ts:254-257`）でしか
  効かせられない：`blur_x`/`blur_y` 未指定時に使う CSS の `blur()` 関数は CSS Filter Effects
  仕様上常に `edgeMode="duplicate"` 相当に固定されており、本家の既定 `repeat_edge_pixels=false`
  （エッジ透明）とは異なる見た目になっている可能性がある（未実機検証）。

2026-08-20、`docs/tag.html` 整理時に `noise` の陰に隠れていたのを発見。優先度低いため保留。

## `noise`（未対応）

CSS にも SVG の単純な組合せにも無いので、対応するなら canvas 等で別途。
<https://ics.media/entry/241122/> が参考になるかも。
