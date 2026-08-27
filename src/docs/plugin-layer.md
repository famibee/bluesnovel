# プラグインレイヤ機構（addLayCls）

## 実装メモ

`src/sn/LayCls.ts`（cls レジストリ）・`src/sn/Layer.ts`（本家 Layer 基底の DOM 版。`ctn` は
素の div）・`src/ts/PlgLayMng.ts`（`[add_frame]` の FrameMng と同じ「store 外・DOM 側」で
Layer インスタンスを fore/back 2個持つ管理クラス）・`src/components/PlgLayer.tsx`（React の箱。
中身は PlgLayMng が `attachBox()` で出し入れ）で構成。

`T_LAY`（`src/components/Lay.ts`）は `cls: 'grp'|'txt'|(string & {})` へ拡張し、判別ユニオンの
絞り込みは `isGrpLay`/`isTxtLay`/`isPlgLay` という型ガード関数を経由させる（インライン比較
`e.cls==='grp'` ではプラグイン型を絞り込めないため）。

`SysBase.#initPlg()` が `Config.generate()` の後・main.sn 起動前にプラグインの `init()` を
一括実行し、`addLayCls` を実際に機能させる。E2E 疎通確認は `test/e2e/plg.e2e.ts`
（`prj_plg` ＋ `test/e2e/app/dmyPlg.ts`）。

## 3d_layer（DOM 版へ移植済み・2026-08-24）

`sn_gallery/src/plugin/3d_layer/ThreeDLayer.ts`。pixi.js の Sprite/Texture ブリッジを外し、
three.js の WebGLRenderer の canvas を直接 `this.ctn.appendChild()` する形に変更。
`3d_base`/`3d_gltf` で実機確認：グリッド表示・立方体の生成/移動/追加/個別削除、gltf モデルの
表示・アニメ切替まで正常動作。本家 (pixi 版) との実機比較で見た目のスケールが完全一致すること
も画像 diff で確認済み。ビルドは `sn_gallery` 単体で `vite build` が通る。

同日、devicePixelRatio=2 環境で「サイズが違う」報告を受けて追跡：原因は `this.ctn`
（position:relative）に width/height 未指定だったため、中身の canvas（position:absolute）が
通常のフロー計算に参加せず `ctn` の高さが 0 のままになり、canvas の `top:50%` 中央寄せの基準が
ずれて実際より上にオフセットして描画されていたこと。`this.ctn.style.width/height = '100%'` を
追加して解決。3D 自体のカメラ・投影計算にバグは無く、dpr 起因や three.js の
setSize/setPixelRatio 呼び出し順序は無関係と確認済み。

残る emote_layer/live2d_layer も同じ方針（three.js/Live2D 本体の依存は bluesnovel 本体には
追加しない＝ユーザー判断。sn_gallery 側で個別にインストールし DOM 版へ書き換える）。

## live2d_layer（保留）

`cubism3_layer` から切り出し（同名だったが emote_layer とは別物）。表情差分・まばたき目的なら
emote_layer の代替になる見込み。Live2D 本体依存は sn_gallery 側のみに入れ、3d_layer と同じく
DOM 版へ書き換える方針。

## emote_layer（凍結・2026-08-26 判断）

本家で動作させる動機が薄いため凍結。

- 現状 `gallery/?cur=emote_layer` はエラー。2026-08-27、`sn_gallery/index.html` 左サイドバーの
  導線をコメントアウトして非表示化済み（`cubism3_layer` は元からサイドバーに導線が無かった）。
  `?cur=emote_layer` 直指定では引き続き動く（エラーになるだけで到達は可能）。
- 2026-08-26 調査：公式 SDK は CheeseWare E-mote（有限会社エムツー、
  <https://emote.mtwo.co.jp/download/sdk/>）。`EmoteLayer.ts` が使う
  `plugin_lib/emoteplayer.min.js` ＋ `emotedriver.js`（1.0MB、`ccall`/`Module._malloc` あり
  Emscripten 生成）は「WebGL」向けサンプル SDK のビルドと見られる＝pixi.js 非依存で素の WebGL
  で動くため、3d_layer と同じく「呼び出し側だけ書き換えて pixi 依存を外す」方針自体は技術的に
  成立しそう。ただし 3d_layer より1段複雑：E-mote は `EmotePlayer.createRenderCanvas()` で
  **単一のグローバル共有 canvas** に WebGL コンテキストを1つだけ持つ設計（レイヤーごとに個別
  canvas を持てない）。複数キャラ・複数レイヤーを出すには共有 canvas の中身を都度各レイヤー用に
  コピーする処理が必須で、現状は pixi の `RenderTexture`＋`Sprite`＋`Texture(new BaseTexture(cvs))`
  がその役目。DOM 版でもこのコピー処理（`<canvas>` 2D コンテキストへの `drawImage` 等）は必要。
- ライセンス（`最初にお読み下さい.txt`、ダウンロードページ双方）は個人・同人利用限定／商用
  利用禁止／解析・リバースエンジニアリング禁止と明記。SDK 内部（emoteplayer.min.js/
  emotedriver.js）への深入りした解析は避け、呼び出し側の書き換えに留める必要がある。
- 2026-08-26 調査：E-mote 相当（パーツ差分の自動切替＋まばたき/口パク＋パーツ単位の簡易変形・
  物理揺れ）を実現できるフリー OSS を比較。DragonBones（Tencent 製・完全無料 OSS）はボーン+
  メッシュ変形だが開発が事実上停止しメンテナンスリスクあり。Spine はランタイム（`spine-ts` 等）
  のみ MIT/OSS でエディタ（データ制作ツール）が有料。Rive はランタイム（`@rive-app/canvas` 等）
  が MIT/OSS で活発に更新されているが、ベクターシェイプ+ボーン中心で E-mote の「静止画パーツを
  そのまま差し替える」設計とは性質が異なる。結論：emote_layer を新規に DOM 移植するより、
  表情差分・まばたき目的なら Live2D で代替できる見込み（上記 live2d_layer）。emote_layer 自体は
  凍結のまま。
