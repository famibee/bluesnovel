# 着手保留の基盤

## デザインモード（無効化中）

`Stage.tsx` の `ENA_DESIGN_MODE = false`。長押しで入れてしまうが、中で触れるのはレイヤの位置・
サイズだけで、触った結果をシナリオへ書き戻す先が無い。本家機能の大部分（音声・履歴・文字演出）が
揃い、「調整 → 保存」の行き先を決めてから戻す。

- **グループ位置指定/移動**：face 合成した画像群を1つの単位として、デザインモードで位置調整・
  移動する仕様の検討。再設計時、Moveable リサイズで差分画像（face）の `dx`/`dy` が絶対 px 指定
  のため拡大縮小に追随しない問題（`GrpLayer.tsx`）も併せて直す（書き戻し先が無いため今は保留。
  2026-08-10 調査）。
- `react-moveable` は凍結扱い。デザインモード着手までは不具合修正不要、コメントアウトで放置可。

## ESLint（塩漬け中）

`typescript-eslint`（8.65.0 時点で最新）が TS 7 非対応と明示的に throw する
（[issue #10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940)）ため、
`eslint.config.mts` を置いても VSCode 拡張は動かない。パーサが無いと `.ts` を解析できないので
回避策も無し。TS 7.1 対応が出たら復活する。`@typescript/typescript6` は
`import ts6 from '@typescript/typescript6'` と明示的に書けるツールにしか効かず、
`require('typescript')` 決め打ちの typescript-eslint には届かない（bun の `resolutions` による
ネスト解決も無視される）。

- 復活したら `eslint-plugin-import`（2.32.0 のまま更新停止、ESLint 10 対応 PR が未マージ）を
  `eslint-plugin-import-x` へ切替。peerDependency が ESLint 10 を公式サポート済みで移行も軽微
  （このリポジトリの `import/no-unresolved: 'off'` 1行だけ `import-x/` にプレフィックスを変える
  程度）。本家 `skynovel_esm` も eslint 関連が全く同じバージョン構成・同じ1行なので同時に対応可能。

## `test/e2e/app/prj_vertglyph/` のフィクスチャ

`ipamjm.ttf` は 46MB のため**未コミット・`.gitignore` 対象**。
`tmp_blues/doc/prj/script/ipamjm.ttf` からローカルコピーすれば動く。縦書きグリフ描画不具合の
調査再開時に再利用可能。

## フレーム内幅 960 vs 1024（不具合ではない）

フレーム内幅が本家 960 に対しこちら 1024 なので bootstrap の `row-cols` が1列多くなる。合わせる
ならステージ実寸とフレーム幅の関係を再検討。
