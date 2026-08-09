# PITFALLS.md

`CLAUDE.md` の「最重要の落とし穴」の詳細版。実装で踏みやすい罠を、症状でなく理由まで書く。
設計の全体像は [ARCHITECTURE.md](ARCHITECTURE.md)。

## 「ページ」が 2 つの別物を指す

本家由来の語彙の罠。どちらか必ず明示すること。

- **レイヤページ (fore/back)** — 全レイヤが持つ 2 枚の描画面。`[lay page=…]`, `[trans]`, `[er]`。
  コード上は `aPage`/`foreIdx`/`T_PAGE`。
- **テキストページ (`[p]` 区切りの本文)** — 読み返しログの単位。`[p]`, `[page]`。
  コード上は `PageLog`。

両者は無関係。`[page]` は名前に反して**後者**を操作する。

## fore/back と `[trans]`

シナリオは back に次のシーンを組んで `[trans]` で入れ替える。

- store は**2 配列間でレイヤデータを動かさない**。`[trans]` は `foreIdx` を反転するだけ。中身を
  入れ替えると両コンテナの子が丸ごと差し替わり、`TxtLayer` が遷移と同時にタイピングを再生する。
- クロスフェードは fore の opacity **1→0**（下に back）。back を上にフェードインさせると、back が
  透明な箇所で最後にパチッと切り替わる。fore を消す方式なら遷移中の見た目が既に最終状態。
- **表示属性はシナリオが書いたときだけ格納する**（`T_LAY_STY` は全 optional、本家の
  `'left' in hArg` 判定と同じ）。既定値を持たせると毎 render で全属性のインラインスタイルが出て、
  各レイヤ component 自身の CSS を黙って上書きする。`[clear_lay]` はキーを**削除**する（数値に
  戻すのではなく）。`visible` は触らない。
- 書き込みはページ単位。`[lay]` の既定は `fore`、`[button]` は本家同様 `back`、`[er]` は**両ページ**
  を消す（でないと `[trans]` で前シーンの本文が戻ってくる）。
- **遷移の完了を宣言するのは `ScriptMng`**（GSAP の `onComplete` ではない）。`Stage` は描くだけ。
  `finishTrans()` が同期的に `foreIdx` を反転し、その後シナリオが再開する。`[wt]` も同じ期限を待ち、
  途中クリックは「今すぐ終われ」と読み替える（`#goSafe()`）ので必ず最終状態に着地する。
- **`ScriptEngine` も本文の蓄積（`#hTxt`/`#hTxtBk`。`[ch]`/`[span]`等の `layer=`/`page=` 対応で表裏
  2 面持ちにした）を store の交換に追随させる必要がある**。store は `foreIdx` 反転だけで済むが、
  エンジン側は「次に本文を追記するときの下地」を自分で持っているため、`[trans]` の**演出完了時**に
  `ScriptEngine#transDone(aLayNm)` を呼んで表裏を入れ替える（`ScriptMng` の `#beginTrans`/
  `#finishTrans` から。`time<=0` は演出を経ずに `#beginTrans()` 内でその場で呼ぶ）。呼び忘れると、
  `[er]` を挟まない `[trans]` で古い表の蓄積が残ったまま次の本文が継ぎ足され、前の場面の文が
  復活する（`test/e2e/trans.e2e.ts` の回帰テスト参照）。**タグ実行時に呼んではいけない**——`[trans]`
  自体は `'skip'` で読み進めが続くので、演出中に書いた本文が古い裏へ紛れ込む。

## `[tsy]` は `[trans]` と逆で、DOM でなく store を通す

GSAP はプレーンオブジェクトを動かし、`onUpdate` が `chgLay` で毎フレーム store に書き戻す。DOM
だけ塗る方が安いが、それだと しおり と `[trans]` のレイヤ複製がアニメ前の値を読む。帰結が 2 つ:
本家の `arrive` 属性は実質常時 on、そして **GSAP のターゲットをそのまま store に渡してはいけない**
（`_gsap` キャッシュが循環参照を作り `structuredClone` と `JSON` を壊す。`ScriptMng` はアニメ対象
プロパティだけコピーする）。純粋な部分（属性値→ターゲット、ease 名変換、tween 命名）は
**`src/ts/Tsy.ts`**。本家の `[tsy]` は `x`/`y` しか読まないが、ここでは `left`/`top` の別名なので
どちらでも動く。

## HTML フレーム (`[add_frame]`) は意図的に store の外

フレームは自前の JS 状態を持つ生きた HTML 文書なので JSON スナップショットでは復元できない（本家も
レイヤ/ページ系から外している）。`src/ts/FrameMng.ts` が DOM 側で所有し、`src` でなく `srcdoc` に
することで same-origin となり `[set_frame]`/`[let_frame]` が iframe 内の `var` を直接叩ける。
`Stage.tsx` はコンテナ div を出すだけ（**JSX 上は空**なので React が iframe を回収しない）。それを
スケール済みステージ箱の**内側**に置くのが本家より簡単な唯一の点＝座標がステージ単位で書け、
リサイズ追従がタダになる。`[add_frame]` と `[let_frame]` は**停止点**（DOM を触り、結果をシナリオが
読む前に変数へ書き戻す必要があるが、アクション適用は `step()` 復帰後なので）。忘れがちな 2 点:
**フレーム内のキーは親文書に届かない**ので `FrameMng` が `document` へ再 dispatch する（本家
`EventMng.resvFlameEvent`）。フレーム内要素の blur は親では iframe 自身が focus されたままになる
ので `[set_focus to=null]` は両側で blur する。

## `FocusMng` — `[set_focus]` のリング

`src/ts/FocusMng.ts`。モジュールレベルに 1 インスタンス置くのは、React ツリー (`BtnLayer`) と DOM
側 (`ScriptMng`) の両方から触る画面規模の状態だから（`Lay.ts` のドラッグフラグと同じ形）。要素が
入るのは本家同様 3 経路: マウント中の `[button]`、`[event key='dom=…']` の**最初の**一致、
`[set_focus add='dom=…']`。

## フィルタ: pixi→DOM の相違が最も出る箇所

本家は pixi フィルタ 22 種。`src/ts/Filter.ts` が 2 通りに振り分ける: CSS `filter` に同じ関数がある
9 種はそのまま、残りは `ColorMatrixFilter` のプリセットなので**同じ 5×4 行列を SVG
`feColorMatrix` へ流す**（pixi の `m[0..19]` と `values` は並びが同じ）。`<filter>` 要素を出すのは
`Stage.tsx`——CSS の `filter: url(#…)` は**同一文書内の要素しか指せない**（`data:` URL 不可）ので、
使われている行列を集めて出し、**id は行列の中身から決める**（同じ効果は 1 要素を共有）。未対応は
`noise` だけ。**`multiply` 属性は無視する**（CSS の `filter` に並べる時点で前の結果に順に掛かる）。
pixi は `multiply=true` のときだけオフセット列を 255 で割る＝同じプリセットでも明るさが変わるが、
こちらは最初から SVG の流儀（0〜1）で書く。`[lay filter=]` はリストを**置換**、`[add_filter]` は
追加。この非対称は本家由来。

## 重ね順

**`aPage[i]` の配列順**（後ろ＝手前）。pixi の child 順と同じ。`[lay float=/index=/dive=]` が
並べ替えるが、**必ず両ページ同一に**（`pickPage`/`putPage` と `[trans]` のレイヤ複製が、2 配列に
同じ名前が同じ順で並んでいることを前提にしている）。*現在の*順序が要るもの（これらと `[tsy]` の
`'=100'` 相対値）はエンジンでなく store で解決する。エンジンは意図を出し、store が算術をやる。

## ステージのスケーリング

`<div id="skynovel">`（本家と同じ語）。サイズは `prj.json` の `window.width`/`height` に固定、
`overflow: hidden`、画像の無い所は黒。`Stage.tsx` が内箱をその実寸で描き
`transform: scale(cvsScale)` で窓に合わせる。`transform` はレイアウトサイズを変えないので、
`useLayoutEffect` が**スケール後**のサイズを `#skynovel` 自身にも書く（でないと高さ 0 に潰れて
全レイヤがはみ出す）。

## `char2macro`/`bracket2macro`

**トークン配列をその場で書き換える**（`Grammar#replaceScr_C2M`）。定義タグ以降のみで、前のテキスト
はリテラルのまま。1 テキストトークンが複数に割れることもある。帰結 2 つ: `Script` は定義のたび
ラベル表を再導出する（`Script.defC2M()`）。`step()` は `this.#script.len` をキャッシュせず毎回
読み直す。定義は共有 `Grammar` に載るので、後からパースされるファイルは置換済みで出てくる
（パース済みファイルは遡らない。本家同様）。

## `[event]` のキー/クリック予約

`[event key=… label=… call=… global=… del=…]` はキー/クリックを予約する。エンジンは**表だけ**持ち
DOM を触らない。キー名を決めるのは `Main.tsx` の `keyName()`＝`KeyboardEvent.key` の小文字に
`alt+`/`ctrl+`/`meta+`/`shift+` をこの順で前置（本家 `SysBase.modKey()`）、それと `click`。
`[toggle_full_screen key=…]` も予約するが `ScriptMng` 上の別表で、`Main.tsx` はそちらを先に見る。
ローカル予約は 1 回限りで、`[call]` がコールスタックに退避し `[return]` が復元する。**マクロ呼び出し
では退避しない**（本家 `ScriptIterator.ts:957`）。`global=true` はこれら全部の対象外。

## 既読管理

`step()` が取る全トークンで走る。`#recordKidoku()` がファイル別 `Areas`（本家のクラスを移植）に
位置を記録し、組み込み `const.sn.isKidoku` を立てる。本家からそのまま来た規則が 2 つ: コールスタック
が空でない間はフラグを**更新しない**（サブルーチンは既読/未読どちらからも来るので記録だけする）。
`[call]` は `count=true` でない限り戻り位置を既読集合から消す（`[jump]` は既定が逆）。
`[clearsysvar]` で全消去。永続化層がまだ無いのでエンジンが表を持つ（`getKidoku()`/`setKidoku()` は
その日のため）。

## オート/スキップ

(`&sn.auto.enabled` / `&sn.skip.enabled` / `&sn.skip.all`)。エンジンは*判断*だけする＝`[l]`/`[p]`
ごとに `#calcResume()` が `T_RESUME` を返し `stop` アクションに乗せる。未読の停止点に来たらスキップ
を解除（`skip.all=false` 時）、`[s]` は常に `cancelAutoSkip()`。*タイミング*は `ScriptMng` の担当で、
`#scheduleResume()` のタイマが自分で `go()` を呼び、`cancelAuto()`（`Main.tsx` が手動入力時に呼ぶ）
が止める。`isNextKidoku` はサブルーチン内なら本家に倣って呼び出し元ファイルを見る。
`sys:sn.skip.mode` は既定 `'s'`（`[p]` を貫通）、`'p'` はページ毎停止。

## ＢＧＭ・効果音：状態機械を持たず、待ち合わせは `ScriptMng` が持つ

本家 `SndBuf.ts` は howler を積み、`StLoading`〜`StStop` の 6 状態を `sb.stt = new XXX(…)` の代入
だけで渡り歩く状態機械を持つ。退場処理が無いまま終端の `StStop` だけが副作用の塊で、
「`[wf]` 待機中に音が自然終了すると誰も終了通知を出さずスクリプトが永久停止する」
「フェード停止時に `StStop` が 2 回構築される」等の不備の温床になっていた（2026-08 の
skynovel_esm 調査で判明）。bluesnovel は howler を積まず、Web Audio API を直接使う自前の薄い層
（`src/ts/SndMng.ts`/`SndBuf.ts`）にして設計自体を変えた。

- **停止＝破棄**。`SndBuf` は 1 バッファ＝1 インスタンスで、状態は持たない（`#destroyed` フラグの
  みで冪等）。同じ `buf` への `[playse]` は**ファイルが違えば**前のインスタンスを即座に破棄して
  差し替えるが、`SndMng.play()` は**同じ `src` が既に生きていれば（デコード待ちも含め）何もせず
  return する**（`SndBuf.src` で比較）。これが無いと「同じ効果音の連打」「フェード中の同じ曲を
  もう一度 `[playbgm]`」のたびに頭から鳴り直し、フェード中の GainNode も差し替わってしまう
  （フェード自体はタイマーとして時間通り終わるので `[wf]`/`[wb]` はハングしないが、**新しい
  GainNode にはフェードが効かないまま鳴り続ける**という気付きにくい不具合になる。E2E は
  `gainNodeCount()`——`AudioContext.createGain()` の呼び出し回数を計装して覗く——でこれを検出
  している。`[wb]` の解決タイミングだけを見るテストでは検出できない点に注意）。
- **待ち合わせ（`[ws]`/`[wl]`/`[wf]`/`[wb]`）を持つのは `SndBuf` ではなく `ScriptMng`**
  （`[trans]`/`[tsy]` と同じ「終わりを宣言するのは ScriptMng」という設計に揃えた）。`SndBuf.stop()`
  は明示停止でも自然終了でも**必ず 1 回だけ** `onEnd` を発火するので、本家の「終了通知の出し忘れ」
  に起因するハングは構造的に起きない。フェードは GSAP が `GainNode.gain` を時間で動かすだけで
  **音の再生状態と独立**しているため、フェード中に音が自然終了してもフェードの完了は影響を
  受けない（本家の「`[wf]`待機中の自然終了でハング」不備が起こり得ない理由）。
- **`AudioContext` は初回のユーザー操作まで `suspended`**（自動再生ポリシー）。`Main.tsx` の
  クリック/キー入力ハンドラが毎回 `scrMng.unlockAudio()` を呼んで `resume()` する。`suspended` の
  まま再生すると `ended` イベントが来ないため、`SndBuf` は非ループ再生に限り擬似終了タイマー
  （`needClick2Play` 判定時のみ）を仕込んで `[ws]` のハングを防いでいる。
- **`[fadese]`/`[wf]` の既定バッファは `SE`**（`[fadebgm]`/`[wb]` は `BGM` 固定）。`[playbgm]` の
  あとに `buf=` を付け忘れて `[fadese]` を書くと、鳴っていない `SE` バッファを対象にした無音の
  no-op になる（`gainNode()` が `undefined` を返し、フェードもしないまま `[wf]` も待たずに素通り
  する）。BGM をフェードしたいときは `[fadebgm]`/`[wb]` を使うこと。
- **実効音量の計算はすべて `ScriptEngine` 側**（`save:const.sn.sound.<buf>.volume`＝目標音量 ×
  `sys:const.sn.sound.<buf>.volume`＝基準音量）。`ScriptMng`/`SndMng` は渡された数値をそのまま
  `GainNode` へ適用するだけで、二重に掛け算しない。`sys:sn.sound.global_volume` だけは
  `VarStore.defSetTrigger()`（本家の「代入トリガ関数」相当）で即時反映する専用経路を持つ——
  `buf` が動的なため per-buf の基準音量には同じ仕組みを使っていない（`[volume]` タグ経由のみ）。
