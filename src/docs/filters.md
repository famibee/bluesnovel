# フィルタ

本家22種すべてに対応（`src/ts/Filter.ts`）。CSS 直変換9種 + `feColorMatrix` へ流す系統 +
`noise` だけ `feTurbulence`（下記）、`multiply` 属性は無視。
サンプル <https://github.com/famibee/SKYNovel_gallery/tree/master/public/prj/filter>

## `predator` は一致・`color_tone` は原理的に非一致（2026-09-04 実機ピクセル比較）

`gallery-engine-switch` で本家（pixi）と分家を同一シナリオ（`prj/filter` の `*color_tone` /
`predator` ボタン、bg_0.jpg に適用）で並べ、要素スクショの同座標ピクセルを突き合わせた。

**`predator`**：実質一致。6 点中バックグラウンド上の 5 点が完全一致（例
`[192,0,233]` / `[255,0,104]` が本家と同値）。2026-08-12 の「やや色味差」は誤差か文字
オーバーレイ位置の差で、**追う必要なし**。

**`color_tone`**：明確に不一致。本家は青チャンネルが高くパステル寄り
（`[182,255,177]` / `[232,255,216]`）、分家は青が `0.15*α`＝38 に張り付いた鮮やかな緑
（`[143,255,38]` / `[156,255,38]`）。暗部は近い（本家 `[10,47,19]` / 分家 `[14,61,15]`）。

原因は **pixi の ColorMatrixFilter シェーダが純粋な 4x5 アフィン変換ではない**こと：

```glsl
result.a = m[15..19]·(c,1);            // colorTone は行4 = [lR-dR, lG-dG, lB-dB, 0, 0]＝トーン位置
vec3 rgb = mix(c.rgb, result.rgb, uAlpha);
rgb *= result.a;                        // ← 行4 の結果を RGB へ乗せ戻す（非線形）
gl_FragColor = vec4(rgb, result.a);
```

大半のプリセットは行4が `0 0 0 1 0`＝`result.a = c.a = 1` なので `rgb *= 1` の無操作だが、
`color_tone` だけは行4が実データになり、**RGB にトーン値が乗算で二重に効く**。SVG
`feColorMatrix` は行4をそのままアルファとして扱う（＋各チャンネルを [0,1] へクランプしてから
premultiply）ので、この乗せ戻しは表現できない。

近似するなら `feColorMatrix`（行1–3）→ トーン値を全チャンネルへ出す 2 本目 → `feComposite`
`operator="arithmetic"` で RGB へ再乗算、というマルチプリミティブ構成が要る（クランプ順序も
pixi 側＝乗算後クランプに合わせないと合わない）。`color_tone` は使用頻度が低いため、実需が
出るまで未着手とする。

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

## `noise`（`feTurbulence` で近似・2026-09-04）

pixi の `NoiseFilter`（`@pixi/filter-noise` 6.5 系、`noise.frag`）は
**ピクセルごとに独立な・時間変化しないモノクロ加算ホワイトノイズ**だけ：

```glsl
float randomValue = rand(gl_FragCoord.xy * uSeed);   // rand は sin/fract の擬似乱数
float diff = (randomValue - 0.5) * uNoise;            // uNoise = noise 属性（既定 0.5）
color.rgb /= color.a;  color.rgb += diff;  color.rgb *= color.a;   // R/G/B に同じ量、α un-premultiply
```

CSS にも `feColorMatrix` にも無いが、SVG `feTurbulence`（`type="fractalNoise"`）で近似できる
（<https://ics.media/entry/241122/> と同じ手法）。`Stage.tsx` が既存の `feColorMatrix`/
`feGaussianBlur` と同じ形でフィルタ木を出す：

- `feTurbulence` `baseFrequency="0.9"` `numOctaves="1"` で細かい粒に寄せる → R チャンネルを N とする
  （octave を増やすと低周波の斑が乗って blotchy になり pixi の均一な白色ノイズから遠ざかる）
- `feColorMatrix` で `rgb = amount*N + (0.5 - amount/2)` のグレー画像へ。**下駄 `+0.5` は
  primitive の結果が [0,1] にクランプされ暗くする側のノイズが消えるのを防ぐため**
- `feComposite` `operator="arithmetic"` `k2=1 k3=1 k4=-0.5` で `src + amount*(N-0.5)`
- `feComposite` `operator="in"` `in2="SourceAlpha"` でクランプで潰れた α を戻す

**本家との差**（いずれも許容・実測でも問題無し）：

- `feTurbulence` は value ノイズで空間相関がある（pixi は完全独立の白色ノイズ）。
  `baseFrequency` を上げれば細かいフィルムグレイン風にはなるが**ピクセル一致はしない**
- `seed` 属性は受けるが**既定は固定 `0`**（本家は `Math.random()`）。`Math.random()` にすると
  `[tsy]` 等の再レンダーのたびに `<filter>` 要素が作り直される。PRNG も別物なので出目は一致しない
- `feComposite arithmetic` は premultiplied 空間で効くため、**半透明の縁ではノイズ量がずれる**
  （不透明部は一致）。立ち絵の縁に薄いハロが出うるが、全画面背景（gallery のサンプル）では無関係
