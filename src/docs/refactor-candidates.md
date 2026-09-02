# リファクタ候補（/simplify 分家全体スイープ 2026-09-03）

`/simplify` を分家独自コード全体（`src/ts/**`＋`src/components/**`＋`src/store/store.tsx`）に
かけた際に挙がった**構造リファクタ案**の控え。掃除でなく「作り直し」の範疇なので即着手せず
ここに置く。

いずれも**動作確認済みのコードの書き換え**で、既存テストは視覚・挙動の回帰を拾えない。
着手するなら 1 項目ずつ、E2E とサンプル実走で確認しながら。

## 適用済み

- `c5ece67`（第1弾・軽微な整理）… `mutatePages`/`eachTargetLay` 共通化、`aMat`/`aBlur` の
  `useMemo`、ホットパスの `new RegExp` キャッシュ、残骸除去
- `（第2弾・Reuse 一部）` … 下記 Reuse のうち **色分解 `rgb01`**（Filter.ts ローカル）、
  **`applyTransform`**（Lay.ts へ切り出し、[lay]・[button] 共通）、**`classifyAsset`**（ScriptMng、
  拡張子判定の反復を解消）、**`#stageWH()`**（ScriptEngine、ステージ寸法読みの 4 箇所重複を集約）、
  **`CmnLib.parseArgNum`**（ScriptEngine.#argNum と Filter.num の数値パースを統合）、
  ChStyle の出現/消去キーフレーム重複（`kfStyled`/`KF_BARE`）

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
- **拡張子によるアセット種別判定がインライン反復。**（一部済・第2弾）`ScriptMng` の `chgPic`
  内の 2 箇所は `classifyAsset(src)` に集約した。`Crypto.ts` の `.json` 特例（復号スキップ。
  `data:`/`blob:` も含む別条件）は「種別」でなく「復号可否」の判定なので統合は保留。
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

- **数値属性パース 4 実装。**（一部済・第2弾）`ScriptEngine.#argNum` と `Filter.ts num()` を
  `CmnLib.parseArgNum(v, errHead)` に集約（非破壊・0x=16進・空文字/NaN/Infinity は例外。
  Filter は従来 `Number('')→0` で空文字を素通ししていたのを例外に統一＝正式リリース前の
  意図的な破壊的変更）。`CmnLib.argChk_Num`（本家シグネチャ＝`hash` 破壊的更新・必須チェック・
  web.ts が公開 API 再 export）と `VarStore.#toNum`（式評価用に throw せず NaN を返す＝本家の
  未定義検出）はそのまま。`Fx.parseRGB` の hex 分岐は `#`/`0x`/素の3系統を受ける独自仕様で対象外。
- ~~`0xRRGGBB` → `[r,g,b]` 分解~~ … 済（第2弾）。実質重複は Filter.ts の tint/color_tone
  だけだったので同ファイルローカルの `rgb01()` に。`Fx.parseRGB` の 1 行は import を増やさ
  ないため据え置き、`Snapshot.rgbaOf`（AARRGGBB＋アルファ）・`TxtLayer.rgbOf`（0..255）は
  別フォーマットで対象外。
- ~~`rotation/scale/pivot` → CSS transform~~ … 済（第2弾）。`Lay.ts` に `applyTransform(o, sty)`
  を切り出し、`styLay`（Lay.ts）と `BtnLayer.tsx` から呼ぶ。`ChStyle.ts` は translate 込み・
  デフォルト無しで式が違うため対象外、`FrameMng.ts:211` のフレーム版も別実装のまま。
- ~~ステージ寸法の取得経路~~ … 済（第2弾）。`ScriptEngine` 内の 4 箇所（`#argPos`＋pos 系
  フォールバック 2＋plg フォールバック）を private `#stageWH()` に集約。純粋エンジンが
  DOM 側グローバル `CmnLib.stageW/H` でなく自分の var store から読む方針は維持。

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
