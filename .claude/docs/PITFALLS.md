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
- **opacity のリセットは演出「終了時」でなく「開始のたび毎回」行う**。`[wt]` 直後に別レイヤ対象の
  `[trans]` を連続で打つと、`ScriptMng#runStep()` が同期の `for` ループ内で `finishTrans()`
  （`trans→null`）と直後の `startTrans()`（`null→次のtrans`）を続けて呼ぶため、React が両方を
  1 回のレンダリングへバッチし、`trans:null` という中間状態が一度もコミットされないことがある。
  「`trans` が `null` に戻ったときだけリセット」という実装だと、直前の演出で 0 まで下がった
  opacity がそのまま次の演出の下地に残り一瞬真っ黒になる（2026-08-18、
  `test/e2e/trans_seq.e2e.ts` + `prj_transflash`）。
- **表示属性はシナリオが書いたときだけ格納する**（`T_LAY_STY` は全 optional、本家の
  `'left' in hArg` 判定と同じ）。既定値を持たせると毎 render で全属性のインラインスタイルが出て、
  各レイヤ component 自身の CSS を黙って上書きする。`[clear_lay]` はキーを**削除**する（数値に
  戻すのではなく）。`visible` は触らない。
- 書き込みはページ単位。`[lay]` の既定は `fore`、`[button]` は本家同様 `back`、`[er]` は**両ページ**
  を消す（でないと `[trans]` で前シーンの本文が戻ってくる）。
- **遷移の完了を宣言するのは `ScriptMng`**（`Stage` 側の Web Animations API の `onfinish` ではない）。
  `Stage` は描くだけ。`finishTrans()` が同期的に `foreIdx` を反転し、その後シナリオが再開する。`[wt]` も同じ期限を待ち、
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

トゥイーン本体は **`src/ts/Tw.ts`**（`motion` の薄いラッパー。2026-08-19 に GSAP から移行、経緯は
下の「GSAP→motion移行」節）。プレーンな proxy オブジェクトを動かし、`onUpdate` が `chgLay` で
毎フレーム store に書き戻す。DOM だけ塗る方が安いが、それだと しおり と `[trans]` のレイヤ複製が
アニメ前の値を読む。帰結が 2 つ: 本家の `arrive` 属性は実質常時 on、そして **動かした対象
（`from`）をそのまま store に渡してはいけない**（`from` は `[tsy path=…]` の区間ごとに使い回す
作業用オブジェクトなので、そのまま渡すと後続区間の書き換えが store 側の値にも及ぶ。`ScriptMng`
はアニメ対象プロパティだけ切り出してコピーする）。純粋な部分（属性値→ターゲット、31 種の ease
関数、tween 命名）は **`src/ts/Tsy.ts`**。本家の `[tsy]` は `x`/`y` しか読まないが、ここでは
`left`/`top` の別名なのでどちらでも動く。

**`motion` の `ctrl.stop()` は同期的に止まらない**（stop 後もしばらく target への書き込みが裏で
続く）。`Tw.ts` は target へ直接 `animate()` させず、ダミーの proxy を動かして `onUpdate` 側で
`#finished` フラグを見て「以後 target へ触らせない」を保証する。`onComplete` も proxy が正確に
最終値へ到達した `onUpdate` の後に来るとは限らない（丸め誤差・順序のズレ）ため、`#finished` を
立てる前に目標値そのものを target へ代入して確定させる（先に本家がハマった罠を踏襲）。

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

`[button call=true]`/`[event call=true]` は `[l]`/`[p]` 待ち中への**一時的な割り込み**でもありうる。
`[p]` は次の進行時に現在レイヤをクリアする `clearOnResume` フラグを立てる（`ScriptEngine.ts:2353`、
試作の改ページ挙動）が、割り込み call の呼び出し中はこれを `false` に凍結する（`callToLabel()`/
`callToScript()` の `freezeClearOnResume` 既定 `true`）。凍結しないと、`[p]` 待ち中にサブルーチンへ
飛んだだけで本文が消えてしまう。`[return]` で `[p]` の位置まで戻れば、そのタグ自体の再実行で
自然に `true` へ戻るため、**`[return]` 側では明示的に復元しない**。`[load fn= label=]`（本家と同じ
「復元後そのラベルをコール」）だけは通常の call と同じ挙動でよいため `freezeClearOnResume=false`
で呼ぶ。この仕様変更（`dfe99ed`）にテスト用シナリオが追随できておらず、`waitev.e2e.ts` の
E2E が旧（バグ）挙動に依存して壊れていたことがある（2026-08-18、詳細は CHANGELOG.md）。

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
  に起因するハングは構造的に起きない。フェードは `Tw.ts`（`motion`。2026-08-19 に GSAP から移行）
  が `GainNode.gain` を時間で動かすだけで**音の再生状態と独立**しているため、フェード中に音が
  自然終了してもフェードの完了は影響を受けない（本家の「`[wf]`待機中の自然終了でハング」不備が
  起こり得ない理由）。
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

## 文字出現演出：GSAPでなくWeb Animations API、終端＝ブラウザの既定値

`[ch_in_style]`の実演出（`TxtLayer.tsx`／純粋部分は`src/ts/ChStyle.ts`）は元GSAPだったが、
GSAP既定の`force3D:"auto"`がアニメ中だけ`transform: matrix3d(...)`を書き込み、Chromiumのレイヤ
昇格/降格をアニメのたびに引き起こしていたことが、縦書き＋Webフォント環境でのグリフ描画欠落
（`CHANGELOG.md` 2026-08-17）の最有力容疑と判明したため、ブラウザ標準の`Element.animate()`へ
置き換えた。本家もCSSアニメ（クラス着脱）で完結しておりJSトゥイーンエンジンを要していない
（`skynovel_esm/src/sn/TxtStage.ts:590-597 skipChIn()`）。当時GSAP自体は`[tsy]`/`[trans]`/
`[quake]`/音声フェードに引き続き使っていたが、2026-08-19にライセンス対応で`motion`へ全面移行し
GSAP自体をリポジトリから除去した（詳細は次節「GSAP→motion移行」）。

- **`[ch_in_style]`の`to`は常にCSSの初期値（`opacity:1, transform:none`）と一致する設計**。
  `options.fill: 'backwards'`と組み合わせると、delay中/実行中は`from`の見た目を保ち、自然終了時・
  `.cancel()`時は効果が外れて素のDOM既定値へ**自動的に**戻る。この性質のおかげで「終端を明示的に
  確定させる」処理（GSAP版の`CH_END`定数＋`clearProps`）が丸ごと不要になった。`to`の値をこの前提
  から変える場合（消去演出`[ch_out_style]`を実装するときなど）は、素の既定値と一致しなくなるので
  `fill:'both'`＋`commitStyles()`＋`.cancel()`の組み合わせが要る点に注意。
- **完了検知の世代ガードが必要**：GSAPの`.kill()`は`onComplete`を発火**しない**ため、旧タイムライン
  をkillしてから新タイムラインを作るだけで完了通知の混線を避けられていた。Web Animations APIの
  `Animation.finished`は`.cancel()`されると**reject**するが、`Promise.allSettled()`で拾うと
  （未処理rejectionにはならないものの）**resolve自体は起きる**。つまり「古いバッチをキャンセルした
  直後の完了ハンドラ」が「新しいバッチが動き出した後」に呼ばれ、`isTyping`を誤って下ろす競合が
  起こりうる。`TxtLayer.tsx`は`useLayoutEffect`実行のたびに世代カウンタ（`genRef`）を進め、完了
  ハンドラは自分の世代がまだ最新かを確認してから`setIsTyping(false)`する。
- **easingはCSSの`<easing-function>`構文をそのまま渡せる**（GSAP版が持っていたCSS名→GSAPのease名
  変換テーブルは不要になり、`cubic-bezier()`/`steps()`も使えるようになった）。ただし
  `el.animate()`は構文的に無効なeasingを渡すと同期的に`TypeError`を投げる（CSSの`var()`のような
  「無効なら初期値へ黙って落とす」寛容さが無い）ため、`ChStyle.ts`の`chStyleEase()`が正規表現で
  妥当性を検査し、無効なら`'ease-out'`へ倒す。`CSS.supports()`は使わない——`bun test`にDOM/CSS
  グローバルが無く単体テストできなくなるため（`Hyphenation.ts:9`の「DOM非参照が契約」と同じ考え方）。
- **E2Eの「アニメを止めて手で時刻を進める」ヘルパにグローバルな凍結APIが無い**：GSAPは
  `globalTimeline.pause()`で「今後作られるトゥイーンも含めてまとめて凍結」できたが、
  `document.getAnimations()`は**呼び出し時点で存在するAnimationしか返さない**。そのため
  `test/e2e/chstyle.e2e.ts`の`freeze()`は**キー押下の直後**（Animationが生成された後）に呼ぶ
  必要がある。ReactのuseLayoutEffectはDOM更新と同じ同期区間でコミットされるためAnimationは
  生成済みのはずだが、`page.evaluate()`の往復ぶん数msは既に進行してしまう（既存アサーションは
  数十ms単位の余裕を持つ緩い比較なので実害は無い見込み。GSAP版に対する正確性の退行として記録）。

## `z-index: -1`は明示的なスタッキングコンテキストが要る（`transform`の副作用に頼らない）

`TxtLayer.tsx`の`[lay b_pic=…]`背景画像は`&::before`に`z-index: -1`を当てて本文の背後へ敷く
（`styTxt`）。この`-1`が効くのは**親要素が自分自身のスタッキングコンテキストを持っているとき**
だけで、持っていなければ`::before`は親の外（もっと祖先側のコンテキスト）まで沈み、他レイヤの
背後に回り込んで消える。一度これで実際の回帰を起こした：`Stage.tsx`の`sty4Moveable`（デザイン
モード用の下地）が全レイヤへ常時恒等`transform`を書いていたため、**`transform`はどんな値でも
新しいスタッキングコンテキストを作る**という副作用で偶然コンテキストが確保されており、
気付かれていなかった。`sty4Moveable`をデザインモード時のみに限定した際にこの副作用が消え、
背景画像が立ち絵の背後へ回り込んで見えなくなった。直したのは`styTxt`へ`isolation: isolate`を
明示的に追加すること——`isolation: isolate`は「新しいスタッキングコンテキストを作る」以外の
視覚的副作用を持たないプロパティで、`transform`のような偶然の依存を残さない。**負のz-indexを
使う箇所を増やすときは、対象要素が意図してスタッキングコンテキストを持っているか（`isolation`/
`position`+`z-index`/`opacity<1`/`transform`等のどれかを明示しているか）を必ず確認すること**。

## GSAP→motion移行（2026-08-19）

GreenSock(GSAP)のstandard licenseが非OSIで、MIT公開かつ`src/build.ts`が依存を`dist/`/`dist_app/`
へ丸ごとバンドルする構成とは相性が悪いため、本家`skynovel_esm`の同日の移行
（`@tweenjs/tween.js`→`motion@13.1.0`）に合わせて全面置換した（`package.json`から`gsap`は消え
`motion`のみになっている）。**GSAPを1対1でmotionへ置き換えたのではなく、役割ごとに適材適所へ
振り分けた**:

- `[tsy]`/`[tsy_frame]`（`ScriptMng`。store のレイヤ属性・`FrameMng` の見た目）と
  `[fadese]`/`[fadebgm]`（`GainNode.gain`）→ `src/ts/Tw.ts`（本家 `CmnTween.ts` の `Tw` クラスを
  移植した薄いラッパー。motion の `animate()` をこの 1 ファイルに閉じ込める）。
- `[trans]` のクロスフェード → 既に `[ch_in_style]` で採用済みの Web Animations API
  （`Element.animate()`、`Stage.tsx`）。
- `[trans rule=]` の進度・`[quake]` の毎フレーム乱数 → 素の `rAF` ループ（`Stage.tsx`）。
  どちらも GSAP を「時間を刻むだけの ticker」として使っていただけなので、ライブラリ自体が丸ごと
  不要になった。

`Tw.ts` が踏んでいる罠は「`[tsy]` は…」節を参照。付随する変更点:

- イージング名（本家 tween.js 形式）→ライブラリの ease 名への変換（`easeToGsap()`）を廃し、本家
  `CmnTween.#hEase` 相当の**31種の実関数**を `src/ts/Tsy.ts` へ直接移植した（tween.js は MIT なので
  式の流用可）。副次的に GSAP の `power1〜4`/`back`/`elastic` と tween.js の数値差が消え、本家と
  完全一致するようになった。
- `[tsy path=…]` の区間連結は `gsap.timeline` から `Tw.chain()`（tween.js の `chain()` 相当）へ。
  `pause_tsy`/`resume_tsy` が「今動いている区間」に効くよう、区間が切り替わるたびに `ScriptMng`
  側の登録参照を `Tw.onStart()` フックで張り替える対応を追加した（本家はこの対応が無く先頭区間
  にしか効かない）。
- repeat の無限表現が GSAP 規約の `-1` から motion 規約の `Infinity` へ変更（`ScriptEngine.ts`）。
  音声フェードの既定 ease も GSAP 時代の `power1.out` から等速へ変更（本家 howler の `fade()` も
  線形）。
- **E2Eの全体凍結手段が変わった**: `test/e2e/trans.e2e.ts` が `gsap.globalTimeline.pause()` で
  行っていた「以後作られる分も含めた全体凍結」は motion に相当 API が無いため、
  `globalThis.requestAnimationFrame` 自体を差し替える `__sn.freezeRaf()`（`test/e2e/app/main.ts`）
  へ置き換えた。`[trans rule=]`/`[quake]`（`Stage.tsx` の素の `rAF` ループ）だけが止まり、
  `[tsy]` 系・音声フェード（motion）はモジュール読み込み時に `rAF` を捕まえて自走するため影響を
  受けない、という非対称になる。凍結して数値検証する E2E を新設・修正するときはこの非対称を
  踏まえること。
