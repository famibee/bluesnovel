# テキスト描画

## 禁則・`break_fixed` 系（対応済み）

禁則文字の指定（`kinsoku_sol`/`kinsoku_eol`/`kinsoku_dns`/`kinsoku_bura`）は本家
`Hyphenation.ts` を移植して対応済み（`src/ts/Hyphenation.ts`）。

`[lay break_fixed=/break_fixed_left=/break_fixed_top=]`（`[l]`/`[p]` 待ちマーカーの置き方）も
対応済み（2026-08-30）。bluesnovel の待ちマーカーは本文 span の兄弟 span（`TxtLayer.tsx` の
`waitRef`）で、既定（`break_fixed=false`）は `margin-inline-start` で「最後の文字の次」に流し込む
＝本家の false 相当。`break_fixed=true` のときだけ `position:absolute` にして
`break_fixed_left`/`break_fixed_top` の固定位置へ置く（本家 `Hyphenation.ts:87-89` ＋
`TxtStage.ts` の `#cntBreak.position.set()`）。座標原点は文字表示領域の左上＝padding の内側なので、
算出 `left`/`top` は `padding`（既定 16px、`pl`/`pt` 指定時はその値）＋指定値。属性は文字レイヤ専用
（`store.tsx` の `chgLay` ガード）で、`[clear_lay]`/`[clear_text]` では変更しない（`kinsoku_*` と同じ。
本家も `#clearLay()` は `Hyphenation` に触らない）。回帰は `test/ScriptEngine_lay.test.ts`＋
`test/store_lay.test.ts`＋`test/e2e/lay.e2e.ts`。

`r_size`（ルビサイズ）は本家にもない属性で、`r_style="font-size:…"` で代替できるため専用属性は
追加しない。

## `ch_in_style` / `ch_out_style`

- `[ch]`/`[span]` の `ch_in_style`/`ch_out_style` **未接続**：定義自体は `[ch_in_style]`/
  `[ch_out_style]` で受け付けるが、`[ch]`/`[span]` 側の属性としては未接続。（行動項目）
- **`[ch_out_style]` の適用（凍結）**：定義と `[lay out_style=]`・`[span ch_out_style=]` は
  受け付けるが、消去のアニメをまだ行なっていない＝本家の既定 `wait=0` と同じ結果。文字が消える
  のはページ切替や `[er]` で React が要素を捨てる場面なので、消えていく間だけ古い文字を生かす
  仕組みが要る。出現演出（`src/ts/ChStyle.ts`）とは別の作りになる。

## ルビ付き行の行間不揃い（縮小して残存・凍結）

2026-08-18、`ss_000.sn:24` 本題の修正（`margin-block-start` を「実際に列/行の先頭に来た表示
単位」だけへ絞る変更）により、**行/列の途中にルビがある場合の不揃いは解消したと実機確認済み**
（`ss_000.sn:24` の「安全｜剃刀《かみそり》」列で列内ピッチが完全に均一、marginTop 常に 0px を
実測。詳細は CHANGELOG.md 2026-08-18 参照）。

ただし**行/列の先頭にルビが来る場合は、直前との間隔が `<rt>` の高さぶん依然として広がる**
（`test/e2e/app/prj_ruby` で実測：marginTop 11px、他行ピッチ約 31.5px に対し約 48px）。これは
「`<rt>` が1つ前の行/列に食い込むのを防ぐ」ため物理的に必要な余白で、削除すると `ss_000.sn:24`
本題のバグへ逆戻りするため解消不可能。「ルビがある行だけ」を判別して全体を均等に広げる
（`max_row` と同時実装の目算だったが、`max_row` は本家でも死んでいる属性と判明済みのため道連れの
実装機会も無い。[tag-notes.md](tag-notes.md) 参照）か、先頭に来るケース自体を折返し計算で避ける、
といった対応が無い限りこれ以上は縮まらないため凍結継続（詳細はセッション 2026-08-10・
2026-08-12・2026-08-18 の CHANGELOG.md 参照）。

## 縦書きで `〈`/`〉`（U+3008/3009）だけ90°回転しない（凍結）

本家と異なる動作のまま凍結。2026-08-24、`line_breaking_rules` の本家比較で発覚・原因特定済み。

**bluesnovel のコードのバグではなく、ブラウザ（Chromium）と Hiragino Sans 系フォントの組み合わせ
に起因する外部バグ**：`font-feature-settings: "pwid"`（プロポーショナル幅グリフ）を指定すると、
Chromium の縦書き自動回転（`text-orientation: mixed` のフォールバック回転）が `〈`/`〉` にだけ
効かなくなる（`【`/`】` は影響されない）。bluesnovel 非依存の最小 HTML（`writing-mode:
vertical-rl` ＋ `font-family: 'Hiragino Sans', …` のみ）で再現：`ffs` 無し／`palt` → 両方正しく
回転、`pwid` → `〈〉` だけ回転しない。Unicode `VerticalOrientation.txt` では両コードポイントとも
同じ `Tr` 分類（unicode.org の UCD で確認済み）なので分類差ではない。

本家（skynovel_esm）で起きないのは、テキストをライブ DOM として直接ブラウザに描画せず、HTML を
SVG の `<foreignObject>` へ埋め込んで `<img>` として一度デコードしてから `canvas.drawImage()` で
ラスタライズし、pixi.js のテクスチャにしているため（`htm2tx.ts:334-349`）。同じ Chromium でも
「ライブ DOM の描画パイプライン」と「SVG data URI を img として読み込むオフスクリーンのデコード
経路」ではテキストシェイピングの内部コードパスが異なるらしく、後者はこのバグを踏まない。本家
ギャラリー（GitHub Pages、既定で縦書き・`pwid`）で `〈`/`〉` が正しく回転することを実機確認済み。

**対応：この挙動を受け入れて凍結**（ユーザー判断、2026-08-24）。`line_breaking_rules` の画面には
ffs を切り替えるデフォルト/palt/pwid ボタンがあり、触るユーザーには `pwid` 由来の副作用と伝わる
想定のため、「回転は付けない」という現行方針（`TxtLayer.tsx` のコメント参照）を崩してまで対症
療法の個別回転を入れる必要は無いと判断。
