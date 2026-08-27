# sn_gallery を bluesnovel 駆動にする

`../sn_gallery` を本家（skynovel_esm）ではなく bluesnovel で動かし、本家ギャラリー
<https://famibee.github.io/SKYNovel_gallery/>（動作の正解）と突き合わせて未実装のタグ・
機能を洗い出す作業。ギャラリーの `public/prj/<機能>/` が機能ごとの仕様。

## 完了記録

- **runSN/stop**（プロジェクト切替・停止。`data-prj` クリック導線含む）は 2026-08-21 に
  SysBase/SysWeb/ScriptMng/store へ実装・動作確認済み
  （`src/sn/SysBase.ts` の `run()`/`stop()`、`web.ts` の `SysWeb.runSN()`、
  `ScriptMng.destroy()`、`store/store.tsx` の `resetStore()`）。
- `sn_gallery/public/prj/<機能>/` を本家ギャラリーの同名プロジェクトと1つずつ突き合わせる
  フェーズは 2026-08-23 に完了（`simple_novel` はユーザー判断により対象外）。発見した不具合は
  すべて都度修正済み（凍結・保留と判定したもの以外）。経緯・詳細は各修正コミットのメッセージ参照。
- 本家互換のプラグイン機構（`[add_lay class=…]` → `addLayCls`。3D/Live2D 等の Pixi 前提
  プラグインを sn_gallery から移植できるようにする土台）は 2026-08-24 に実装・実行時配線まで
  完了。実装メモは [plugin-layer.md](plugin-layer.md)。

## 残りの行動項目（[TODO.md](TODO.md) にも記載）

- **依存の付け替え**：`sn_gallery/package.json` の
  `"@famibee/skynovel_esm": "file:../bluesnovel"` という本家のフリをどうするか。本格移行時に
  改めて判断（2026-08-21 時点は現状維持と決定）。

  `ThreeDLayer.ts` を DOM 版へ書き換え済みのため、依存が本家 `skynovel_esm` のまま（現状維持）
  だと `[add_lay layer=3d class=3d]` が `Cannot set properties of undefined (setting 'position')`
  で例外になる（本家 `Layer.ctn` は pixi.js の Sprite、`ThreeDLayer.ts` は
  `this.ctn.style.position=…` と DOM 前提でアクセスするため）。2026-08-24、`[add_lay]` 例外
  報告を機に発覚・確認。
