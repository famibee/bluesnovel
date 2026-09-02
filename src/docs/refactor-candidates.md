# リファクタ候補（/simplify 分家全体スイープ 2026-09-03）

`/simplify` を分家独自コード全体（`src/ts/**`＋`src/components/**`＋`src/store/store.tsx`）に
かけた際に挙がった**構造リファクタ案**の控え。掃除でなく「作り直し」の範疇なので即着手せず
ここに置く。適用済みの軽微な整理（`mutatePages`/`eachTargetLay` 共通化、`aMat`/`aBlur` の
`useMemo`、ホットパスの `new RegExp` キャッシュ、残骸除去）はコミット済み。

いずれも**動作確認済みのコードの書き換え**で、既存テストは視覚・挙動の回帰を拾えない。
着手するなら 1 項目ずつ、E2E とサンプル実走で確認しながら。

## Altitude（下の機構を一般化する）

- **ScriptMng の待ち合わせが 8 サブシステム平行実装。** `[trans]`/`[wait]`/`[tsy]`/`[fx]`/
  `[quake]`/`[ws-wl]`/`[wf-wb]`/`[wv]` がそれぞれ `#xxxWaiting` フィールド＋`#xxxRunning`
  フラグ＋`#waitXxx()`＋`#endXxx`/`#skipXxxWait`＋`#goSafe()` の分岐＋`#runStep()` の
  `if (last?.t === 'waitXxx')` を持ち、待ちタグ 1 個追加で 4〜5 箇所を触る。`viaCall`
  バイパスは tsy/fx だけ手で `&& ! viaCall` が付く。
  → `#curWait` 単一フィールドに `WaitToken {canskip; isRunning(); skip(); settleOn(cb);
  bypassOnCall}` を持たせ、`#goSafe()`/`#runStep()` は種別を知らずトークン経由で扱う。
  ARCHITECTURE.md が「終わりを宣言するのは ScriptMng」と 1 概念で語っているのに抽象が
  切り出されていない。
- **レイヤ表示属性の「キー集合」が 4 箇所手書きで既に食い違っている。** `A_LAY_STY_KEY`
  （`components/Lay.ts`）／`A_ER_RESET_KEY`（`store.tsx`）／文字専用ガード（`store.tsx` の
  `chgLay`）／`[clear_lay]` の文字リセット（`store.tsx` clearLay の `clr1` インライン
  `delete e.b_color; …`）／`H_TSY_DEF`（`Tsy.ts`）に散在。ガードは `bura/kinsoku_*/
  break_fixed*` を文字専用と列挙するのに `[clear_lay]` のリセットはそれらを外し逆に
  `b_src/b_alpha_isfixed` を足す＝2 リストが不一致。
  → 属性 1 個＝1 レコードの単一表 `{key: {owner:'common'|'grp'|'txt', clearLay:bool,
  er:bool, tsyDef?:number}}` を作り、全部そこから導出する。
- **`sys:` → store のミラーを停止点ごとにポーリング。** `ScriptMng` が `[l]/[p]/[s]` の
  たびに `sys:TextLayer.Back.Alpha`・`tmp:sn.button.fontFamily`・chWait をエンジンから
  読み直して store へ push。一方 `VarStore.defSetTrigger()`（代入時 push）が既にあり
  `sn.sound.global_volume` 等は init で登録済み（本家も `val.defValTrg` 処理）。
  → `Back.Alpha`・`button.fontFamily` を init で `defSetTrigger` 登録し停止点の読み直しを
  消す。既定値 `DEF_BTN_FONT` の `||` フォールバックもトリガ登録側 1 箇所へ。chWait は
  既読状態依存なので停止点評価のままでよい。
- **`left`/`align_x` の排他ルールを 3 層で推論・逆推論。** `store.chgLay` が「`left` が来て
  `align_x` を伴わない＝絶対再配置」と解釈して `align_x` を消す。`ScriptMng` の `withAlign`
  は相対指定のみの `[tsy]` で消されると困るので現在値を再注入し store の推論を打ち消す。
  `styLay`（`Lay.ts`）が実描画。`[fg2]`→`[fg2_squat]` と不具合が出るたび推論に例外が
  足された。
  → 意図を payload に明示（`chgLay` に `reposition: 'absolute' | 'nudge'`）、エンジン／
  ScriptMng が 1 回だけ決める。store がキーの有無から推測し呼ぶ側が対策する構図をやめる。
- **エンジン→store ブリッジが ~35 個の名前付きセレクタ手配線（3 リスト同期）。**
  `Main.tsx` が `attachTsx` へ渡す store アクション ~35 個を `useStore(s=>s.x)` で個別取得
  しリテラルで束ね、同じ名前を `T_INIT_FNCS` の `Pick` でも列挙。追加＝3 箇所編集。
  zustand のアクションは安定参照なので ~30 個は一生発火しない購読。
  → `scrMng` に `useStore.getState`（またはバインド済み store）を 1 回渡す。リアクティブが
  要る値（`isTyping`）だけセレクタ購読。
- **拡張子によるアセット種別判定がインライン反復。** `ScriptMng.#applyAction` の `chgPic`
  内で `src.endsWith('.json')`（png シート）と `/\.(?:mp4|webm)$/i`（動画）が 3 回、`aFace`
  の map でも再計算。`Crypto.ts` にも独立した `.json` 特例（復号スキップ）。
  → 純粋関数 `classifyAsset(src) => {isSheet, isMovie}` を 1 個、crypto スキップ含む全箇所で
  使う。
- **サウンドバッファ既定名が ~10 箇所で場当たり解決。** `args.buf || 'SE'` と
  `isBgm ? 'BGM' : (args.buf || 'SE')` が playse/stopse/xchgbuf/volume/fadese/ws/wf の各
  case に散らばり、ボタン SE の既定 `'SYS'` も 2 箇所×計 5 回手書き。
  → `resolveBuf(tagName, args)` 単一ヘルパ＋`BTN_SE_DEF = 'SYS'` 定数。
- **文字演出スタイルの解決チェーン「cis → lay in_style → 'default'」が 3 レンダ経路に
  インライン。** `TxtLayer.tsx` の 3 描画経路に `hChOut[oldCh[i]?.cos ?? out_style ??
  'default'] ?? CH_OUT_DEF` がコピー。既定は store 初期値・エンジンの `#hChStyleNm`・
  component 定数の 3 箇所に実在。
  → `resolveChStyle(hMap, ch, layStyle, kind)` に集約、component は `hMap[name] ??
  hMap.default` だけ見る。store 初期値も `CH_IN_DEF` から seed。

## Reuse（横断ヘルパ抽出）

共通化先が本家由来 `src/sn/CmnLib.ts`（無改変原則）になりうる点は要判断。分家側の
新 util モジュールにするか、CmnLib への最小追加を許すか。

- **数値属性パース 4 実装。** `ScriptEngine.#argNum`／`Filter.ts num()`／`VarStore.#toNum`／
  `Fx.ts parseRGB` 内の hex 分岐。「0x 始まりは 16 進、他は数値、NaN/Infinity は例外」が
  コメントごと 4 回。空文字の扱い・`parseFloat` か `Number` かが微妙に食い違い。
- **`0xRRGGBB` → 8bit `[r,g,b]` 分解 5 実装。** `Fx.ts:95`／`Filter.ts:173`（tint）／
  `Filter.ts:202`（color_tone）／`Snapshot.ts rgbaOf`（AARRGGBB）／`TxtLayer.tsx rgbOf`。
  `CmnLib.cssColorOf()`（数値→`#RRGGBB`）の対になる分解関数が無い。※AARRGGBB と RRGGBB で
  バイト順が違うので統合時は引数で明示。
- **`rotation/scale/pivot` → CSS transform 文字列。** `Lay.ts:133` と `BtnLayer.tsx:134`
  がバイト一致、`ChStyle.ts` 内で同式 2 回、`FrameMng.ts:211` にフレーム版。
  → `Lay.ts` に `styTransformOf(o)` を切り出す。
- **ステージ寸法の取得経路 2 系統。** `ScriptEngine` だけ var store 越しに文字列キー
  `tmp:const.sn.config.window.width` で取得（同ファイル内 2 回コピー＋「下端中央寄せ」
  スニペットも 2 重）、他は `CmnLib.stageW/H` 直参照。
  → ScriptEngine 内も `CmnLib.stageW/H` に寄せ、下端中央寄せは private メソッド 1 つに。

※ `SaveMng.dateStr()` → `CmnLib.getDateStr()` は**誤指摘**（`getDateStr` は分までで秒を
出さない。セーブ名の一意性に秒が要るので現状維持）。

## Efficiency（アルゴリズム変更）

- **レイヤ子コンポーネントが非メモ化＋毎レンダー新規コールバック。** 無限 `[tsy]`（や音声
  フェード）で Stage が毎フレーム再レンダーされると表ページの全レイヤが再レンダー。
  `GrpLayer`/`TxtLayer`/`PlgLayer` は `memo` されておらず `getVideoVol={()=>…}` 等の
  クロージャをレイヤごと毎回生成。1 レイヤを tsy で動かすだけで同ページの他の立ち絵・
  1200 行 `TxtLayer`・`BtnLayer` 群が 60fps で全再レンダー。
  → 子を `React.memo`＋ハンドラ `useCallback`（`cmn` を `useMemo` した Stage の規律を子へ）。
  効果大だが prop 安定化の設計変更。
- **禁則処理が毎テキスト追記で全文字を再測定。** `applyKinsoku` が `chgStr` のたび、その
  時点でページに積まれた全表示単位の `getBoundingClientRect` を `<br>` を挿すたびに測り直し
  （挿入で強制リフロー）。1 ページ構築で概ね O(文字数 × 改行数) の強制レイアウト読み。
  依存配列に `chWait`/`autowc`（レイアウト非関係）も入っていて既読スキップ切替や設定変更で
  全再測定が走る。
  → 直近の既存 `<br>` 以降だけを測定・スキャン対象に。`chWait`/`autowc` は依存から外し
  新規追加分の分岐でだけ `useRef` ミラー参照。
- **`splitCh` がページ全文を毎チャンク再パース。** エンジンが `#appendTxt` で毎回全文の
  `chgStr` を積み、`ScriptMng` が `splitCh(act.str)`＋`plainOf` を実行。テキスト片・`[r]`・
  `[span]`・`[ch]`・`[graph]` のたび `new RubySpliter`＋全文走査＋全 `aCh` 再構築。1 ページで
  O(セグメント数 × ページ長)。組み込み変数 `const.sn.last_page_plain_text` も参照ごとに
  全文 `splitCh`（`last_page_text` は生文字列で安いのと非対称）。
  → 追記デルタだけパースして既存 `aCh` に連結（span/link のオープン状態はエンジンが追跡
  済み）。`#hTxt` 更新時に平文を並走キャッシュ。
- **`fireworks` GLSL のパーティクル計算がフラグメント不変なのに毎ピクセル再計算。**
  `starField` 内の頭ごと `h13`+`normalize`+`headPos`、火の粉ごと `E`/`sink`/`base`/`col`/
  `tight` はいずれも (フレーム, 頭, 火の粉) のみに依存。ピクセル依存は最後の `mote`/
  `headGlow` だけ。resolution LOD は数を減らすだけで冗長性自体は残る。
  → 頭・火の粉の位置/色/明るさを JS 側で毎フレーム 1 回計算し uniform 配列か小さなデータ
  テクスチャで渡す。フラグメントは splat のみに。※ ANIMATION_RESEARCH.md §7 で「非
  A_FX_PARAM uniform の配線」を見送った経緯あり、再検討はそこから。
