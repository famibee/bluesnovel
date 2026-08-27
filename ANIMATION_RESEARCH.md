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
