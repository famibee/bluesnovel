# KAG3(吉里吉里2) → BlueSNovel テンプレ 移植ガイド

KAG3/KAGEX で書かれた既存ノベルゲームを、分家テンプレ（縦書きサンプル構成 =
`main.sn`＋`sub.sn`＋`theme/`＋`frames/`）へ載せ替えるための知見。
特定作品に依存しない、再利用できる部分だけを置く。

---

## 1. 全体戦略：ツール駆動 + 3層

手作業で `.ks` を書き直すのは非現実的（フルゲームで100万字級）。
**機械変換できる所はスクリプトに寄せ、エンジン差はマクロで吸収**する。

| 層 | 実体（移植先プロジェクト側） | 役割 |
|---|---|---|
| ① 変換器 | `src/batch/cnv_ks2sn.mjs` | `.ks`(SJIS) → `.sn`(UTF-8)。字句・タグ・座標・ルビ記法の機械変換 |
| ② 互換マクロ層 | `doc/prj/script/kag_compat.sn` | KAG3 独自マクロ／バッファ名／字下げ等を BlueSNovel タグの薄いラッパで再現。`main.sn` から `[call fn=kag_compat]` |
| ③ 素材パイプライン | `src/batch/cnv_ks_*.mjs` | 画像の画面サイズ変更＋webp化、音声コピー、`*_const.ks` の差分辞書 → `[add_face]` 生成 |

変換器は**内容非依存**（タグ構文だけを触る）。プロジェクト固有の対応表
（`storage`/`target` のリネーム、発言色、座標係数）は `cnv_ks2sn.mjs` 冒頭の
定数に切り出し、ロジックは共通。

---

## 2. タグ対応表

**変換器で書き換え** / **互換マクロで吸収** / **そのまま** の3分類。

### 2-1. 変換器が書き換える

| KAG3 | BlueSNovel | メモ |
|---|---|---|
| （SJIS 全体） | UTF-8 | `iconv -f CP932`。CP932（Windows拡張）で。`Shift_JIS` 指定だと機種依存文字が落ちる |
| `*ラベル名｜コメント` | `*ラベル名  ; コメント` | KAG3 のラベル別名（`｜`以降）は BlueSNovel だとラベル名の一部として食われる |
| `[xchggrp bg= l0= ds0= pos0= time= txt_time= rule= se= nofo_txt= nofi_txt=]` | `[grp bg= l0= f0= pos0= time= t_time= rule= se= fo_txt= fi_txt=]` | `txt_time→t_time`。`nofo_txt=true→fo_txt=false`（反転）。`ds0/de0`（差分セット）→ `f0`。`dsb/deb`→`fb`。`filter=evening/night/…` は非対応→ドロップ（§8） |
| `[xchg_fg fn=X ds=Y de=Z layer=N]` | `[fg layer=N fn=X face=<Y を add_face 名へ>]` | `layer` 省略時 0。`ds`＝差分セット、`de`＝退場時差分（v1 は捨てる）。§5 |
| `pos0=lc` `pos=rcc` 等（位置コード） | `pos0=&pos.lc` `pos=&pos.rcc` | `c` は組込みなので素通し。`l/r/lc/rc` はテンプレ `sub.sn` に定義済。`llc/lcc/rcc/rrc` は `kag_compat.sn` で `(pos.l+pos.lc)/2` 等を追加 |
| `o0=128` `o=255`（不透明度 0〜256） | `o0=0.5` `o=1` | KAG3 は 128/256＝半透明。`255→1` に丸め、他は `/256`。`[xchg_fg o=]` は `[fg alpha=]` へ |
| dic_face の合成モード `ds=Y mode="psscreen"` | `[add_face … blendmode=screen]` | BlueSNovel（分家）は `blendmode` に CSS `<blend-mode>` 全種＋`plus-lighter`/`plus-darker` を受ける（`Blendmode.ts`）。`psadd→add`(=`plus-lighter`) `psmul→multiply` `psscreen→screen` `psoverlay→overlay` `pshardlight→hard-light` `psdodge→color-dodge` … と 1:1。CSS に無い `pssub`（減算）等のみ落とす |
| 素材名の表記ゆれ（`高所Wide` vs ファイル `高所wide`） | ファイル名に合わせる | KAG3 は Windows で大小文字無視。web は区別する。変換器の `ASSET_FIX` 表で個別補正 |
| `[xchgbgm2 fn=X time=T]` | `[bgm fn=X time=T]` | ほぼ同義（テンプレの `bgm` マクロ） |
| `[sub_img fn=X layer=N left= top= ds=]` | 互換マクロ `sub_img` → `[lay/fg]`（+ face）。§5 | |
| `[sub_trans time=T rule=R]` | `[trans time=T rule=R]` | 直後の `[wt]` はそのまま `[wt]` に |
| `[txt_lay_3line_bottom / _top / _center]` | `[txt_lay_window_bottom / _top / _middle]` | テンプレ標準の同等マクロ（`sub.sn`） |
| `[txt_lay_fullscreen o=N ls=N]` | `[txt_lay_fullscreen b_alpha=N]` | `o`（文字窓濃度 0-255）→ `b_alpha`（0-1）。`ls`（行間）はドロップ |
| `[voice2 fn=X]` / `[voice fn=X]` | `[voice fn=X]` | テンプレ `ext_voice.sn` の `voice` マクロ。音声エフェクト差し替え（`_e1`..）は v1 で捨てる（§8） |
| `[se fn=X]` | `[playse fn=X buf=SE join=false]` | KAG3 の `se` は SE バッファ（buf=1）。テンプレ `se` マクロは既定 VOICE なので使わず直 `playse` |
| `[se]`（引数なし＝停止） | `[stopse buf=SE]` | |
| `[ws buf=0]` / `[fadeoutse buf=0]` … | `buf=VOICE` / `SE` / `SYS` | KAG3 バッファ番号 → 名前。`0→VOICE`, `1→SE`, `2→SYS` |
| `[jump storage="x.ks" target=*y]` | `[jump fn=x label=*y]` | `storage`→`fn`（拡張子除去）、`target`→`label`。`[call]` も同様 |
| `[eval exp="f.x = y"]` | `&save:x = y` | KAG3 変数スコープ変換（下）。条件付き `[eval cond=]` は手変換 |
| KAG3 変数 `sf.` `f.` `tf.` `kag.scWidth/scHeight` | `sys:` `save:` `tmp:` `const.sn.config.window.width/height` | `&`式・`exp=`・`cond=` 内 |
| `[ruby text="R"]B`（連続） | `｜B…《R…》`（グループルビへ結合） | §4-2 |
| `[font size= face= color= edgecolor=]` | `[span style='…']` / `[resetfont]`→`[span]` | 旧Windowsフォント名（`ＭＳ 明朝` 等）は解決しないので `face` は落とす |
| SE ファイル名の `@`（`ChaimB2@08`） | `_`（`ChaimB2_08`） | `@`/`@@` は多言語マーカー。素材リネームと同時に `[se fn=]` も置換 |

### 2-2. 互換マクロで吸収（`kag_compat.sn`）

| KAG3 | 実装方針 |
|---|---|
| `[speak name= col=]` … `[ei]` | 名前を本文冒頭に色付き1行（`simple_novel` の `hu` マクロ準拠）＋ `[span style='color:…']` push。`[ei]` は `[span]`（pop）。色は `spcol.<キー>` 辞書引き |
| `[indent]` / `[endindent]` | 「」内ぶら下げ字下げ。v1 は no-op（可読性は保てる）。将来 `[span style='padding-…']` |
| `[plc]` | テンプレ `plc` マクロがほぼ同義（`[ws VOICE][wq][p][er][record_place]…`）。**改名だけ**でよい |
| `[dash]` / `[heart]` | `[ch text='─']` / `[ch text='♥']`。KAG3 は専用グリフ画像だった |
| `[sign_exp fn=]` / `[sign_exp_save fn=]` | `&sys:album.<fn> = true` ＋ `&sys:kaisou.<fn> = true`（回想解放）。`_save` 版は `save:` スコープ |
| `[scenario_start no= title= bg= dsb= bgm=]` | 章題カード（`[grp bg=]` ＋ 改ページ）。`sys_scenario_end` 用に `&Ｎｏ` 保持 |
| `[scenario_end]` / `[root_end bg= bgm= txt_grp=]` | 章末・ルート末処理。BGM/SE フェード ＋ `[grp bg=black]` ＋ クリア記録 |
| `[m_begin layer= time= path="(x,y,op)"]` / `[m_end]` / `[m_cancel]` | `[tsy layer= left=x top=y alpha=op/255 time=]` / `[wait_tsy]` / `[stop_tsy]+[wait_tsy]`。KAG3 `path` 第3値は透明度(0-255)。converter は `[tsy]`/`[wait_tsy]` を直に並べる |
| `[blur layer= x= y=]` / `[blur_all]` | `[add_filter layer= filter=blur blur_x= blur_y=]`（SVG 経路） |
| `[start_select]` / `[end_select]` / `[after_select]` | 選択肢の枠。履歴に「=== 選択肢 ===」／`[s]`／`[record_place]` |
| `[flash_start fn="X.swf?ret=…"]` … `[flash_end]` | `[flash fn=X]`（`[lay fn=black face=X]`＋`[wv fn=X]` の暫定）。§7 |
| `[z_begin fn= layer=]` / `[z_end]` | ズーム。`[fg]` ＋ `[tsy scale_x/scale_y]`（fgzoom の厳密移植ではない） |
| `[sl]` | 行末クリック待ち ≒ `[l]` |

### 2-3. そのまま（同名・同義）

`[l]` `[r]` `[p]` `[s]` `[wt]` `[wq]` `[wait time=]` `[quake time= hmax= vmax=]`
`[fadeoutbgm time=]` `[link]`/`[endlink]` `[if exp=]`/`[elsif]`/`[else]`/`[endif]`
`[trans]` `[er]` `[sys_scenario_start]`

> `[quake]` は KAG3 と引数（`time`/`hmax`/`vmax`）まで一致。`[wq]` で待てるのも同じ。
> 画面拡大に合わせ `hmax`/`vmax` は係数倍する。

### 2-4. 意図的にドロップ（テンプレ側で担保 or 些細）

`[rclick]` `[nextskip]` `[history]`（テンプレのイベント／PageLog）、
`[glyph]`（改ページ記号）、`[startanchor]`、`[seopt]`、`[hact]`、
`[nowait]`/`[endnowait]`、`[position]`/`[current]`/`[locate]`/`[button]`
（メニュー画面は `frames/` で作り直す）。変換器は `;⇢` でコメント化しつつ集計。

---

## 3. 字句・ファイルの差異

- **文字コード**：`.ks` は SJIS(CP932)。`iconv -f CP932 -t UTF-8`。BOM 不要。KAGEX 製は
  UTF-8 のこともある。
- **改行**：CRLF → LF。
- **ラベル**：KAG3 `*name|説明` の `|説明` は BlueSNovel パーサだとラベル名に含まれる
  （`^\*[^\s\[&;\\]+`）。`*name  ; 説明` へ。
- **行構造**：ADV 系の本文 `.ks` は 1行1タグ・タグは行内で閉じる・`[iscript]`/`[eval]`/
  `[if]`/`&` は本文側にほぼ無くマクロ定義ファイルに集中、というものが多い。→ 行単位変換で足りる。
  KAGEX や作品によっては本文に `[iscript]` が混じる。その場合は該当ブロックだけ手変換。
- **`@` 文字**：KAG3 では本文中の `@` は特別扱いされない（行頭 `@` のみタグ省略記法）。
  一方 BlueSNovel テンプレは `[char2macro char=@ name=lr]` で本文 `@`＝クリック待ち。
  → 変換後 `.sn` の**本文に生 `@` を残さない**。KAG3 素材名の `@`（`StepB@11`）は
  タグ属性内なので c2m 展開対象外だが、**素材ファイル名としては `@`→`_` にリネーム**。

---

## 4. 本文の記法変換

### 4-1. 発言（名前＋色）

BlueSNovel に名前プレート機能は無い。テンプレ／作品側マクロで描く
（`sn_gallery` の `simple_novel/mat/main.sn` の `hu` マクロが定番）。
KAG3 の `[speak name= col=]「…」[ei]` は互換マクロ `speak`/`ei` で：

```
[speak name=A col=A]     →  色付きで "A[r]" を本文へ ＋ [span style='color: <col>;']
「セリフ」                （そのまま）
[ei]                     →  [span]（色 pop）
```

色は KAG3 の `tf.speak_color`（`%[ "A" => 0xRRGGBB, … ]`）を
`&spcol.A = '#RRGGBB'` の形で `kag_compat.sn` 冒頭へ展開（`cnv_ks_const.mjs`）。

### 4-2. ルビ

KAG3 `[ruby text="R"]` は「次の1文字」に付く。熟語ルビは
`[ruby text="ぐん"]群[ruby text="せい"]生` と**1文字ずつ**書かれる。
→ 連続する `[ruby]`＋直後1文字 の並びを検出し、**グループルビ**へ結合：

```
[ruby text="ぐん"]群[ruby text="せい"]生する
  →  ｜群生《ぐんせい》する
```

BlueSNovel の `RubySpliter`：`｜親文字《ルビ》`＝グループルビ、`漢字《ルビ》`＝
漢字＋送り仮名に自動でかかる、`《*》`＝傍点。

---

## 5. 立ち絵差分システム（`dic_face` → `[add_face]`）

KAG3 側（`*_const.ks`）は連想配列で「差分セット名 → [パーツ画像, dx, dy] の並び」：

```tjs
tf.dic_face["セットA"] = [["顔ベース", 120, 20], ["表情1", 155, 85]];
```

BlueSNovel の `[add_face name=X fn=Y dx= dy=]` は **1名 = 1パーツ画像 + 固定オフセット**
（`fn` 省略時は画像名＝name。`ScriptEngine.#hFace`）。`[fg fn=BASE face=a,b,c]` で
base の上に a,b,c を dx/dy 位置で重ねる。

→ `cnv_ks_const.mjs` が dic_face の1エントリを **パーツ数ぶんの `[add_face]`** に展開：

```
[add_face name=セットA◇0 fn=顔ベース dx=154 dy=26]   ; 120*1.28, 20*1.28
[add_face name=セットA◇1 fn=表情1   dx=198 dy=109]
```

変換器は `ds="セットA"` → `face="セットA◇0,セットA◇1"`。
`◇`（U+25C7）は素材ファイル名に出ない前提の内部セパレータ。単一パーツのセットは
`◇0` を付けず素通しでよい（add_face 未定義名はファイル名扱いされるフォールバックがある）。

- 座標は画像 ×係数 に合わせ **dx/dy も同係数**。
- 同じパーツ画像が別セットで別オフセットに出るケースがあるため、**dedup せずセット単位で命名**。
  add_face 定義行が増えるだけで、画像実体は共有（`fn=` が同一ファイルを指す）。
- `blendmode`：KAG3 の `mode="psadd"` 等 → `[add_face blendmode=]`（`Blendmode.ts` が
  名前を吸収）。dic_face の要素4つ目にあれば拾う。
- `dic_clip`（画像の一部だけ表示）：使っている作品は `[lay clip_*]` か、素材を事前に切り出す。

---

## 6. 素材

| 種別 | 元（典型的 KAG3 レイアウト） | 先 | 変換 |
|---|---|---|---|
| 背景 | `bgimage/*.jpg,png` | `doc/prj/bg/*.webp` | ×係数（例 800×600→1024×768）→ webp。`cnv_ks_pic.mjs` → 既存 `cnv_mat_pic` |
| 立ち絵パーツ | `fgimage/*`（base + 差分パーツ） | `doc/prj/fg/*.webp` | ×係数 → webp |
| ルール画像 | `rule/*.png` | `doc/prj/rule/*.webp` | ×係数（トランジションマスクは画面サイズ基準）。**日本語＋括弧のファイル名は ASCII slug へリネーム推奨**（変換器の rule 名も同時置換） |
| （合成文字を含む名前） | 濁点/半濁点仮名を含む素材名 | 仮名部をローマ字化 | 下記「合成文字ファイル名」 |
| システムUI | `image/Mnu_*` | ほぼ不要（テンプレの `frames/` UI） | 章題画像など一部のみ採用 |
| BGM | `bgm/*.ogg` | `doc/prj/music/*` | そのまま（ogg 可）。必要なら m4a |
| 音声 | `sound/*.ogg`（連番／セリフキー） | `doc/prj/voice/*`（**新設フォルダ**） | そのままコピー。`@`→`_` リネーム |
| 動画 | Flash `.swf`（＋事前に mp4 化したもの） | `doc/prj/` | §7 |

- **画像拡大**：`sharp`（`resize(w*k, h*k, {kernel:'lanczos3'})`）が確実。
  移植先 package.json が `sharp` を slim out していれば `bun add -d sharp`。
  Bun 組込みの画像 API は resize が実験的で、`sharp` 推奨。
- webp 化は既存 `src/batch/cnv_mat_pic.js`（`src/prj_base/` に置くと拾う）に相乗り。
  拡大だけ先にやって `src/prj_base/{bg,fg,rule}/` へ吐き、あとは既存フローに乗せる。

### 合成文字ファイル名（濁点・半濁点仮名）

macOS はファイル名を NFD（分解形）で保持する。濁点/半濁点付きの仮名
（`が`＝`か`＋`゛`、`パ`＝`ハ`＋`゜`）は 2 コードポイントに割れる。
VSCode 拡張（SKYNovelLangSrv）はこれを検出して
**「ファイル名は濁点(゛)・半濁点(゜)など合成文字を避けて下さい」** と警告する
（`Config.ts` の `nm.normalize('NFC').length !== nm.normalize('NFD').length`。
物理ファイル名のみが対象。タグの属性値は見ない）。

対処：**その名前に含まれる仮名連続部をヘボン式ローマ字へ変換**する。
漢字・英数・記号はそのまま。   例）`<漢字>_セピア` → `<漢字>_sepia`、
`<接頭>_のんびり` → `<接頭>_nonbiri`、`m02_ぐうたらな<漢字>` → `m02_guutarana<漢字>`

- 合成文字を **1つも含まない** 名前は一切触らない（NFC 正規化だけ）。churn 最小化。
- 触る名前は、その中の仮名連続部を **全て** ローマ字化（`頭の...` の `の` だけ残すと
  見た目が中途半端。`頭no...` で統一）。
- 変換は素材コピー時（`cnv_ks_pic` / `cnv_ks_snd`）と **スクリプト内参照**
  （`cnv_ks2sn` の `bg=` `fn=` `l0-2=` `rule=`、`cnv_ks_const` の `[add_face] fn=`、
  `cnv_ks_album` の `fn=`）で同じ関数を通す。共有モジュール `src/batch/_kana2romaji.mjs`。
- `[add_face] name=`（＝差分セット内部名）や `bgmT.<キー>` は **物理ファイルでない**ので
  日本語のまま可。ローマ字化するのは実ファイルを指す `fn=` 側だけ。
- 旧・合成文字名の出力は再変換時に削除（`path.json` に両方載るのを防ぐ）。
- 促音 `っ`＝次子音重ね（`っち`→`tch`）、長音 `ー`＝直前母音、`ん`→`n`（`nb` でも `n` 維持）。

---

## 7. Flash → mp4

KAG3 の `[flash_start fn="X.swf?ret=Yラベル"]` … `*Y` … `[flash_end]` を、
事前に mp4 化した1本の再生へ。

```
[flash_start fn="movie1.swf?ret=exit_movie1"]
*exit_movie1
[flash_end]
  →  [flash fn=movie1]      ; 互換マクロ。[lay fn=black face=movie1]＋[wv fn=movie1]＋後始末
     *exit_movie1           ; ラベルは残す（無害）
```

- `?ret=` 以降のクエリ（`&se0=…` 等の SE 同期）は捨てる。演出上必要なら mp4 側に焼く。
- **対応する mp4 が無い swf は削除**。冒頭ロゴ・しおりアニメ等はテンプレ機能で代替 or カット。
  削除したものは移植レポート（移植先プロジェクト側）に列挙する。
- 全画面動画の正式な出し方はエンジンで要確認。現状の `flash` マクロは `frames/_album.sn`
  の `*mov`（`[lay fn=black face=<動画名>]`＋`[wv]`）に倣った暫定。

---

## 7-2. 互換マクロ層を書くときの落とし穴（実機で踏んだもの）

- **タグ値の中に `[` `]` を書かない。** 連想配列アクセス `&dict[key]` を `[let text=&dict[key]]`
  のようにタグ属性値へ書くと、Grammar のトークナイザが最初の `]` でタグを閉じてしまい、
  壊れたトークン＋余った `]` になる（トークン化は例外を出さず通るが、実行時に
  `(ExprEval)文法エラー` になる）。→ 発言色のような「キー→値」は `cond` 連鎖で書く：
  ```
  [let name=_c text='white']
  [let name=_c text='#FFF9BD' cond="mp:key == '直木'"]
  …
  ```
- **`&名前 = %param|default` は動かない。** `%param` の置換はタグ属性の処理でだけ行われ、
  素の `&` 代入行では展開されない（`%no|''` がそのまま式に渡り文法エラー）。
  → `[let name=save:Ｎｏ text=%no|'']` のようにタグ形式で書く。素の `&` 内で
  マクロ引数を使うなら `mp:param`（デフォルト値は付けられない）。
- マクロの `%param='型|既定|説明'` 宣言は**VSCode 拡張のヒント用**で、ランタイムは
  `name` しか見ない（`[macro name=x][endmacro]` で動く）。ただし宣言なしの `%x` バラ書きは
  拡張のパーサが乱れることがあるので、書くなら `'型||説明'` 形式で揃える。

> Phase 1（変換器＋互換層）は合成テストシナリオを分家エンジンで実走させ、
> `[speak]`（名前＋色）・グループルビ・`[dash]`/`[heart]`・章題カード・`[kag_filter]`・
> `[fg]`+`[tsy]`・`[sub_img]`・`[blur]`・`[sign_exp]`・選択肢描画までエラーなし確認済み。

## 8. 未対応・持ち越し（v1）

- `[xchggrp filter=evening/rain/night/moonlight]`：時間帯フィルタ。元は bg 画像へ
  ガンマ or レイヤへ `f_evening` 等をスクリーン合成。→ `[add_filter]`（`color_tone` 系）
  か tint レイヤを1枚足す。変換器は今は**ドロップ＋警告出力**。
- 音声エフェクト差し替え（`_e1`..、`sf.音声効果[]`）：設定画面のアクセシビリティ機能。
  v1 は base 音声のみ。設定画面（`_config`）へ項目追加で復活可能。
- `[indent]` の実ぶら下げ：v1 no-op。
- `[m_begin]`〜`[m_end]` 間の `[sub_img]`（移動中クリア）：変換器は素直に順序を保つため、
  「動かしてからクリア」でなく「クリアしてから空レイヤを動かす」になる。500ms 級では
  ほぼ気付かない／スキップ時 0ms。厳密にやるなら間タグを wait 後へ回す。
- 回想（メモリー）モード：KAG3 の「アルバム」は実質これ（`*_album.ks` の `mem_thumbnail` が
  シーン一覧、クリックで `[jump storage="ss_SS.ks" target=*mem_...]` で本編の該当シーンを再生）。
  → `cnv_ks_album.mjs` が `mem/bgm/mov/pic_thumbnail` 呼び出しを機械抽出し
  `frames/album_dic.sn`（`[let_ml name=dic]` の JSON 配列）を生成。`_album.sn` の `*val2ctrl` を
  `[call fn=album_dic]` に。mem は `{type:"mem", fn, title, enabled, jump:"ss_SS", label:"*mem_..."}`。
  `_album.sn` に `*mem` ハンドラ（`data-arg="ss_SS *mem_..."` を分解してジャンプ）＋
  `[event key='dom=album:.mem']`、`_album.htm` に mem 用 `data-arg` 分岐（2〜3行）を足す。
  回想サムネイル `others/mem_*.png` は `image/` へ（`frames/` サブディレクトリは path.json 未スキャン）。
- KAG3 `[link]`/選択肢：`exp=`（TJS）は手当て。実物を見て互換マクロを詰める。
- しおり（セーブ）データの移行：不可（フォーマット別物）。新規プレイ前提。

---

## 9. 実行手順（移植先プロジェクト）

```bash
# 1. 差分辞書・発言色（先に。cnv_ks2sn が face_map を読む）
bun src/batch/cnv_ks_const.mjs [my_const.ks のパス]
#    → doc/prj/face/face_witch.sn（[add_face]群、座標×1.28）
#    → doc/prj/face/_face_map.json（差分セット名→add_face名リスト）
#    → doc/prj/theme/kag_bgm_titles.sn（アルバム用）
#    → doc/prj/script/kag_compat.sn の #SPCOL_BEGIN〜END を書き換え

# 2. スクリプト変換
bun src/batch/cnv_ks2sn.mjs  <ksディレクトリ>  doc/prj/script
#    → doc/prj/script/ss_*.sn（UTF-8）と _cnv_ks2sn_report.md（未対応タグ一覧）

# 3. 画像（Bun.Image で ×1.28 リサイズ。sharp 不要）
bun src/batch/cnv_ks_pic.mjs [--webp] [--only bg|fg|rule]
#    Work/data/{bgimage,fgimage,rule} → doc/prj/{bg,fg,rule}
#    既定は元フォーマット維持。--webp で webp(q88) 化

# 4. 音声・BGM・動画
bun src/batch/cnv_ks_snd.mjs [--dry]
#    Work/data/sound → doc/prj/voice（セリフ NN_人物_連番）/ doc/prj/sound（効果音）
#    Work/data/bgm   → doc/prj/music     ogg のままコピー。'@'→'_' リネーム
cp <mp4ディレクトリ>/*.mp4 doc/prj/frames/

# 4b. アルバム／回想画面のデータ
bun src/batch/cnv_ks_album.mjs [my_album.ks のパス]
#    → doc/prj/frames/album_dic.sn（_album.sn が [call fn=album_dic]）

# 5. main.sn に互換層を読ませる（[call fn=sub] / [call fn=ext_*] の後）
#    [call fn=kag_compat]
```

path.json は VSCode 拡張が自動生成。手編集しない。

**Bun.Image**（`bun.com/docs/runtime/image`、libvips バックエンド）は `new Bun.Image(buf)`
→ `.metadata()` / `.resize(w,h)` / `.webp({quality})` / `.png()` / `.jpeg({quality})`
→ `.toBuffer()`。sharp と同等のことが依存追加なしで書ける（Bun 1.4 で確認）。

---

## 10. チェックリスト

- [ ] `.ks` の文字コード（SJIS か UTF-8 か。KAGEX 製は UTF-8 のことも）
- [ ] 本文に `[iscript]`/`[if]`/`[macro]` が混じっていないか（混じっていたら行単位変換不可）
- [ ] 独自マクロの棚卸し（`*_macro.ks` 全部）。テンプレ標準マクロで代替できるものを対応表に
- [ ] 立ち絵方式（1枚絵 / パーツ合成 / KAGEX の `[chara_*]`）
- [ ] 画面サイズ（`prj.json` の window と元の差 → 座標係数）
- [ ] 音声命名規則（連番 / セリフキー）と本数
- [ ] Flash の有無と代替素材（mp4 / 連番 png / カット）
- [ ] フレーム系画面（セーブ・設定・アルバム・回想・CG鑑賞・用語集）の要否
