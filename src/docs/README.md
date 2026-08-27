# 開発者向けドキュメント

- **[TODO.md](TODO.md)** … これからやる行動項目だけ。まずここを見る
- 以下は設計判断の根拠・調査結果・実測値・凍結理由の置き場
  （2026-08-27 に `todo.md` から分離。本家 sn_extension の `src/docs/` に倣った構成）

| ファイル | 内容 |
|---|---|
| [sn-gallery.md](sn-gallery.md) | sn_gallery を bluesnovel 駆動にする作業の経緯・完了記録 |
| [plugin-layer.md](plugin-layer.md) | プラグインレイヤ機構（`addLayCls`）の実装メモ、3D/emote/Live2D 各プラグイン |
| [filters.md](filters.md) | フィルタ22種の実装状況と保留分（`predator`/`color_tone`・`blur` 専用パラメータ・`noise`） |
| [text-rendering.md](text-rendering.md) | テキスト描画（ルビ行間・縦書き回転・禁則・`ch_in_style`/`ch_out_style`） |
| [tag-notes.md](tag-notes.md) | タグ／変数単位の凍結・保留・決着判断（`link`・`tsy render`・`max_row`・`canskip`・`trans glsl`） |
| [deferred-infra.md](deferred-infra.md) | 着手保留の基盤（デザインモード・ESLint・moveable・vertglyph フィクスチャ・フレーム幅） |

⚠️ 決着・凍結した判断のうち対応コードがあるものは、そのソースのコメントへ書いてある
（重複回避）。ここにあるのは対応コードが無い判断・未着手の宿題・再検討を避けるための実測値。
