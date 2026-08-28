# タグ／変数単位の凍結・保留判断

対応コードが無い（または本家自体が未接続の）ものだけをここに置く。

## `[link]` の `onenter` / `onleave`（保留）

本家はラベルをコールし `[return]` で戻る仕様。素朴に `[button call=true]` と同じ経路
（`callToLabel` → 通常の step 実行継続）を流用すると、マウスが乗っただけで本編が読み進んでしまう
バグになる——`[return]` 後にそのまま次のトークンへ進む設計のため。正しく作るには「サブルーチンを
`[return]` まで走らせたらそこで止め、読み進めには使わない」専用の実行経路をエンジンに新設する
必要があり、`[button]` と共通の中規模な追加実装になる。

`global` は対応済み（受理はするが効果を持たない扱いで決着。理由は `docs/tag.html` の `[link]` 欄）。

## `[tsy]` の `render`（決着・CSS で等価）

子要素を合成してから不透明度を適用し、半透明時に差分画像の境界が二重に透けるのを防ぐ機能。
本家は pixi の RenderTexture へ焼く方式。bluesnovel は属性を読まないが、`alpha` を下げる `[tsy]`
では CSS の `opacity<1` が子要素をグループ不透明合成してから透過するため、render の主用途では
本家 `render=true` と同じ結果になる（2026-08-17 ピクセル比較で確認。`src/components/Lay.ts` の
`l.alpha` 直前のコメント参照）。位置・拡縮のみで親が不透明なケースはグループ化されないが、
その場合は境界の二重透け自体が起きないので実害なし。2026-08-20 発見、2026-08-27 決着。

## `[trans]` の `glsl=`（実装済み 2026-08-28）

`src/ts/TransGlsl.ts`（lazy import の生 WebGL モジュール）で実装。表・裏ページを `Snapshot.ts` で
1 枚ずつ画像化 → 全画面クワッドに裏を下地、user フラグメントシェーダ経由の表をアルファ合成 → rAF で
`tick` 0→1。本家サンプル `glsl_slide` の契約（`uSampler`／`tick`／`vTextureCoord`、rule 併用時は
`rule`／`vague`）＋分家で `resolution`（vec2）を追加して受ける。`delay=`・`ease=` はタグリファレンス
から属性説明ごと削除済み（2026-08-27）。

`glsl=` には**プリセット名**も書ける（2026-08-28）：`blur`（ぼかしながら消える）／`mosaic`（ブロックが
粗くなりながら消える）。実体は `src/ts/transPresets.ts`（`resolveTransGlsl()` が「名前ならそのシェーダ、
そうでなければソースそのもの」を返す＝`[add_fx]` の fx=/glsl= 分岐と同じ考え方だが属性 1 つで兼ねる）。
どちらも定番手法を再実装（MIT 相当）。回帰は `test/transPresets.test.ts`＋`test/e2e/trans.e2e.ts`。

設計の経緯は [ANIMATION_RESEARCH.md](ANIMATION_RESEARCH.md) §7、制約（iframe・動画が写らない等）は
`TransGlsl.ts` 冒頭コメント。

## `max_row`（凍結・本家自体が死んだ属性）

最大行数を超えたら自動改ページする想定の属性。本家 `skynovel_esm` でも `Grammar.ts` に
`max_row?: string` の型定義があるだけで、`TxtLayer.ts`/`TxtStage.ts` のどちらでも消費しておらず、
受理はするが黙って無視される死んだ属性と判明（2026-08-12 調査。`docs/tag.html` にも記載無し、
`test/argdef_parity.test.ts` にも既定値の記載無し）。`sys:sn.tagCh.canskip` と同じ構図で、本家
自体が未接続のため bluesnovel 側で先行実装するのは移植の範囲を超えるとして見送り。

## `sys:sn.tagCh.canskip`（凍結・本家自体が未接続）

クリック等でのテキストスキップ可否。本家でも読み書きできる変数として定義されているだけで、実際の
クリックスキップ処理（`TxtLayer.ts:816-818` の `click()`）はこの値を参照せず無条件にスキップする。
`msecWait` 等の兄弟変数のように起動時キャッシュへ読み込む処理も本家に無い
（`Variable.ts:126-132`）。本家自体が未接続のため、bluesnovel 側で先行接続するのは移植の範囲を
超えるとして見送り（2026-08-10 確認）。
