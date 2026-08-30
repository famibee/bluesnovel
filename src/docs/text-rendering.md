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

### 出現（`ch_in_style`）

`[span ch_in_style=]`（per-char）／`[lay in_style=]`・`[span in_style=]`（レイヤ状態）／組み込み
`default` の順で 1 文字ずつ Web Animations API（`el.animate()`）へ翻訳して適用。純粋部分は
`src/ts/ChStyle.ts`、適用は `TxtLayer.tsx` の本文 effect。per-char は `T_CH.cis`（`Txt.ts` が載せる）。

`in_style`/`out_style` は `[span]` に書いても **本文ストリームに埋め込まず** `chgLay` で
ストアのレイヤ値へ書く（`ScriptEngine.ts` `case 'span'`）。本家 `TxtLayer.ts:357` の
`#$ch_in_style`（`#mergePushSpan` → `#set_ch_in` が `[lay in_style=]` と同じインスタンス値を
書き換え、`clearText()` も戻さない）に対応。埋め込み命令は `[clear_text]` で `#hTxt` ごと
捨てられるため、`[span in_style=X][clear_text][jump]`（`ch_in_out` ギャラリー `*ch_in`）で
演出指定が失われていた不具合の修正（回帰 `test/ScriptEngine_txt.test.ts`
`span_inStyle_outStyleはchgLayでレイヤ値へ書く`）。

### 消去世代 `clrGen` ―― 同内容の消去→再表示で演出を撃ち直す

`[span in_style=X][clear_text][jump]` の 2 つめの問題：`[clear_text]` の `chgStr('')` と
直後の再 `chgStr(本文)` は **同一の同期バッチ**で走り、React が中間の空状態をまとめて捨てる。
`TxtLayer.tsx` 本文 effect は `chRef`（表示済みキャッシュ）と新 `aCh` の前方一致で「作り直すか」を
決めるので、消去前と同じ本文が返ってくると差分ゼロ＝**出現演出を撃たない**（本家は
`[clear_text]` が毎回 `#txs.reNew()` で実体を作り直すのでこの問題が無い）。

対策：文字レイヤに `clrGen`（消去世代カウンタ）を持たせ、`[clear_text]`／`[er]`／`[p]` 再開クリア
（`chgStr` の `hard` フラグ）と `[clear_lay]`（`clearLay` ストア関数）で +1 する。`TxtLayer.tsx` は
前回見た `clrGen` を ref で覚え、変化していたら前方一致をスキップ（`same = 0`）してキャッシュを
捨て、ゴースト消去＋全文字の新規出現アニメを走らせる。時間切れの自然終了や通常のページ送りは
`hard` を立てないので従来どおり（差分だけアニメ）。回帰 `test/store_lay.test.ts`
`chgStr_hardで clrGen が進む`。実機は `sn_gallery ?cur=ch_in_out` の色つきボタンで確認。

### 消去（`ch_out_style`）— ゴースト span 方式

**2026-08-30 実装。** 本家 `TxtStage.#clearText()`
（`skynovel_esm/src/sn/TxtStage.ts:710`）の移植。純粋部分 `chStyleAnimOut()`（`src/ts/ChStyle.ts`）、
適用は `TxtLayer.tsx`。回帰は `test/ChStyle.test.ts` ＋ `test/e2e/choutstyle.e2e.ts`。

本家の仕組み：消去時、空の兄弟 `<span>` を新設して以後の新規文字はそちらへ回し、**旧コンテナは
live DOM に残したまま** 各 `.sn_ch` に `go_ch_out_<name>` の CSS アニメを当て、最後の子の
`animationend` で旧コンテナを破棄する。`wait===0` の文字は即 `display:none`。新ノードを作るのは
「消去中に同じレイヤへ届く新規文字」との衝突を避けるため。

分家の実装方針：

- **フック地点は `TxtLayer.tsx` 本文 effect の clear 検出 1 箇所**。条件は
  `spansRef.current.length > 0 && same < spansRef.current.length`（＝キャッシュ済みの文字が
  丸ごと／一部消える。`same < min` の分岐と、`aCh` が空になる場合の両方を拾う）。文字が消える
  トリガ（`[er]`/`[cm]` の `chgStr({page:'both', str:''})`、`[p]`/`[c]` 再開時の
  `#clearOnResume` → `chgStr({str:''})`、`[clear_lay]`、ページ切替の別内容差し替え）は
  すべてここへ収束する。
- `el.textContent = ''` の代わりに、`charsRef` の子ノード（禁則 `<br>` ごと）を命令的に作った
  兄弟 `<span>`（React 管理外、`boxRef` 直下、`position:absolute` で本文位置に重ねる）へ move。
  レイアウト済み DOM をそのまま生かすのでルビ・縦書き・縦中横・禁則の再計算は不要（本家と同じ理屈）。
- per-char の out-style は **リセット直前の `chRef.current`（旧 `T_CH[]`）** から
  `hChOut[ch.cos ?? out_style ?? 'default'] ?? CH_OUT_DEF` で引く（`cos` は `Txt.ts` が
  既に載せている＝本家の `data-add` 相当。捕捉タイミングに注意：effect が走る時点で新 `aCh` は空）。
- 純関数 `chStyleAnimOut(sty)` を `ChStyle.ts` に新設。出現の逆（`from {opacity:1,
  transform:none}` → `to` が定義値）、`fill:'forwards'`。`join:true` は出現時の累積ディレイ
  （`delaysRef`。`spansRef` と並走）をそのまま流用＝本家 `#clearText:748` が inline
  `animation-delay` を残して使い回すのと同じ。`join:false` は全文字 delay 0。
- ハンドルを `ghostRef` に保持。`Promise.allSettled(anims.map(a=>a.finished))` で ghost を DOM
  除去。全 char が `wait<=0` なら ghost を作らず即除去＝**現状の瞬時消去の挙動を完全維持**
  （オーバーヘッドゼロ。既定 `CH_OUT_DEF.wait=0`）。
- ガード：`isReadBack`／`skipping` 中は消去アニメせず即除去（読み戻しの本文差し替えも
  `same < min` を踏むため必須）。新しい clear が来たら既存 ghost は cancel+即除去（本家は旧
  コンテナを積むが pileup を避けて捨てる）。effect/unmount の cleanup でも cancel。

**却下した代替案（ストア遅延クリア）**：`chgStr('')` で `aCh` を即空にせず既存 span を in-place
で animate → タイマーで空にする案。エンジンは既に `#hTxt` をクリアして先へ進んでおり、消去中に
同じ fore レイヤへ新規文字が来ると衝突する。本家が新ノードを作るのはまさにこの回避。

### `[trans]` クリックキャンセル時の即時終了

`[er]` は `'skip'` で待たないので消去アニメは撃ちっぱなし、直後に `[trans]` のクロスフェードが
被さる。`[wt]` 中クリックで `#finishTrans` が `foreIdx` を反転すると、消えかけ ghost が乗った
旧 fore が裏（不可視）へ回り、クロスフェード中に「消去＋フェードアウト」が二重に見える。

配線：既存の `skipReq` カウンタに相乗り。`TxtLayer.tsx` の `useEffect(… a.finish() …,
[skipReq])`（出現アニメ用）を **ghost の消去アニメも `.finish()`** するよう拡張し、
`ScriptMng.#goSafe()` の `[wt]` クリックキャンセル箇所（`#transWaiting.canskip` で
`#finishTrans()` する所）で続けて `this.$fncs.requestSkip()` を呼ぶ。`requestSkip` の意味を
「タイプ演出を終わらせる」から「本文表示を最終状態へスナップ（出現も消去も）」へ広げる解釈。
時間切れでの自然終了は対象外＝消去アニメは最後まで再生される。

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
