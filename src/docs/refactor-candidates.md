# リファクタ候補（/simplify 分家全体スイープ 2026-09-03）

`/simplify` を分家独自コード全体（`src/ts/**`＋`src/components/**`＋`src/store/store.tsx`）に
かけた際に挙がった**構造リファクタ案**の控え。掃除でなく「作り直し」の範疇なので即着手せず
ここに置く。

いずれも**動作確認済みのコードの書き換え**で、既存テストは視覚・挙動の回帰を拾えない。
着手するなら 1 項目ずつ、E2E とサンプル実走で確認しながら。

**分家側の掃き出しは第 1〜9 弾で完了**（下記「適用済み」＋各節の ~~取り消し線~~ 参照）。
残っていた「本家由来部分（`src/sn/**` ほか）の /simplify＋modern-web-guidance 分析」は
2026-09-03 に**本家リポ（`skynovel_esm`）側で実施**と決定（分家で分析だけしても本家との
再取り込み衝突が増えるだけ・適用先が本家なので本家で回す方が素直）。この項目は分家 TODO
から落とし、以降は `skynovel_esm` の TODO で扱う。

## 適用済み

- `c5ece67`（第1弾・軽微な整理）… `mutatePages`/`eachTargetLay` 共通化、`aMat`/`aBlur` の
  `useMemo`、ホットパスの `new RegExp` キャッシュ、残骸除去
- `（第2弾・Reuse 一部）` … 下記 Reuse のうち **色分解 `rgb01`**（Filter.ts ローカル）、
  **`applyTransform`**（Lay.ts へ切り出し、[lay]・[button] 共通）、**`classifyAsset`**（ScriptMng、
  拡張子判定の反復を解消）、**`#stageWH()`**（ScriptEngine、ステージ寸法読みの 4 箇所重複を集約）、
  **`CmnLib.parseArgNum`**（ScriptEngine.#argNum と Filter.num の数値パースを統合）、
  ChStyle の出現/消去キーフレーム重複（`kfStyled`/`KF_BARE`）
- `（第3弾・Altitude 一部）` … **`ScriptEngine.#bufOf(name, args)`＋`#A_BGM_TAG`**（SE/BGM
  バッファ名解決の 5 箇所と「どのタグが BGM か」の台帳を 1 箇所に）、**`#BTN_SE_BUF='SYS'`**
  （ボタン・リンク SE の既定を 6 箇所の生文字列から定数へ）、**`chStyIn`/`chStyOut`**（TxtLayer、
  文字演出スタイルのフォールバックチェーンを 1+2 箇所 → helper 2 個へ）
- `4288118`（第3-4弾）… **`ChStyle.CH_DEF_NM`**（組み込み演出名 `'default'` の生文字列 4 箇所を
  定数へ）
- `（第5弾）` … **`Main.tsx` のセレクタ手配線撤去**（33 個の `useStore(s=>s.x)` →
  `{...useStore.getState(), isTyping}` の 1 行。-31 行。`T_INIT_FNCS` の Pick リストは
  「エンジンが store に依存する範囲」の契約として残す）
- `（第6弾・Altitude）` … **`left`/`align_x` 排他ルールの `reposition` payload 明示**。
  `store.chgLay` が「`left` があって `align_x` が無い＝絶対再配置」とキーの有無から推測し、
  `ScriptMng.#beginTsy` の `withAlign` が相対 `[tsy]` のたび現在の寄せを再注入して打ち消す、
  の 2 段推論を廃止。`T_CHGLAY` に `reposition?: 'x'|'y'|'xy'`（＝寄せを落とす軸）を足し、
  `[lay]` は `ScriptEngine`（`sty.left && ! sty.align_x` を 1 回判定）、`[tsy]` は
  `ScriptMng`（区間に絶対指定があるか）がそれぞれ文脈を持って決める。store は
  `reposition` だけを見る。既存 E2E（`tsy.e2e.ts` の [fg2_squat] 回帰・`uc.e2e.ts`・
  `pic.e2e.ts`）で挙動不変を確認。対象 3 ファイル（store / ScriptEngine / ScriptMng）
- `（第7弾・Efficiency）` … **禁則処理（`applyKinsoku`）の測り直しを走査範囲だけに限定**。
  実測（`test/e2e/app/prj_kinperf/`＋一時計装。下記 Efficiency 節参照）で、
  `<br>` を挿すたびに `kc` 全体を `getBoundingClientRect` していた（128 文字ページで
  1290 回・18.6ms、[l] をまたぐ追記の最終段で 2254 回・5.4ms）。`scan()` は開始位置
  `i`（走査のたび単調増加）以降の `xy` しか読まず、`<br>` 挿入で位置が動くのも `i` 以降
  だけなので、毎パス `j < i` の測り直しは無駄。`i` 以降だけ測るループへ変更（`xy` は
  パスをまたいで保持。低い添字は二度と読まれないので古い値のままでよい）。
  計測値：1290→424 回・13.2ms／2254→796 回・3.6ms（読み -66%、時間 -29%。
  残りは各呼び出しの初回強制リフローで、これは範囲を絞っても消えない）。挙動不変
  （`kinsoku.e2e.ts`＋`ruby.e2e.ts` 23 件で確認。長文回帰は `kinperf.e2e.ts` を追加）。
  `TxtLayer.tsx` 1 ファイル完結。
- `（第8弾・Efficiency）` … **禁則 `useLayoutEffect` の deps から `chWait`/`autowc` を外した**。
  この 2 つ（文字速度・[autowc] 表）は「新規追加文字の出現ディレイ」計算にしか使わず、
  その分岐は `aCh` が伸びたときだけ通る（伸びていなければ effect 冒頭で早期 return）。
  deps に入っていたため、設定画面での速度変更・既読フラグ切替のたびに、組み上がった
  ページ全体の `applyKinsoku` が無駄に走り直していた（1 回 ~13ms＝第7弾後）。
  `useStore(s=>s.chWait/autowc)` の購読をやめ effect 内で `useStore.getState()` から読む
  （新規文字は現在値を使う＝挙動同一。`autoskip`/`chstyle`/`ruby` 系 E2E 40 件で確認）。
  下 `splitCh` 実測の副産物。`TxtLayer.tsx` 1 ファイル完結。
- `（第9弾・Altitude）` … **ScriptMng の待ち合わせ 8 サブシステムを `#curWait` 単一トークンへ統一**。
  `[wt]`/`[wait]`/`[wait_tsy]`/`[wait_fx]`/`[wq]`/`[ws]`-`[wl]`/`[wf]`-`[wb]`/`[wv]` がそれぞれ
  `#xxxWaiting` フィールド＋`#waitXxx()`＋`#skipXxxWait()`＋終了口の identity 照合＋`#goSafe()` の
  分岐（約 40 行）＋`hoverCall()` のガード列を持ち、待ちタグ 1 個追加で 9 箇所を触っていた
  （`viaCall` バイパスは tsy/fx だけ手で `&& ! viaCall`、`hoverCall` は 8 個中 6 個だけ列挙）。
  → `T_WAIT {kind; key; canskip; bypassOnCall; skip}` の 1 フィールド `#curWait` に集約。
  待ちに入るのは `#armWait(w | undefined)`（`undefined`＝待つものが無い＝素通し）、終了口は
  `#resumeWait(kind, key, deferred)`。サブシステム固有の追加データ（`stop` 等）は `skip`
  クロージャ捕捉でトークン型を膨らませない。`#goSafe()`/`hoverCall()` は待ち種別を知らなくなった
  （ARCHITECTURE.md「終わりを宣言するのは ScriptMng」の 1 概念に抽象を合わせた）。各サブシステムの
  `#beginXxx`/`#finishXxx`（タイマー・`#hTw`・rAF ポーリング）と deferred の有無（trans/wait/
  quake/snd/video は即時、tsy/fx/fade は `setTimeout(0)`）は挙動保存のため不変。`ScriptMng.ts`
  正味 −55 行。**ついでに直した既存不具合**：`destroy()` が `#aFxTimer` の one-shot タイマーを
  畳み忘れており、プロジェクト切替後に `[add_fx time>0]` のタイマーが発火して `#goSafe()` まで
  走りうる（`#dropFxTimers(()=> true)` を追加）。単体 1771 件＋E2E 全件で挙動不変を確認。

## Altitude（下の機構を一般化する）

- ~~レイヤ表示属性の「キー集合」が 4 箇所手書きで食い違い~~ … **見送り**（2026-09-03 調査）。
  `A_LAY_STY_KEY`（共通スタイル）／`A_ER_RESET_KEY`（[er] が戻す変形サブセット）／`chgLay`
  ガード（grp/plg に来たらエラーにする文字専用属性）／`[clear_lay]` の `clr1` 文字リセット
  （[clear_lay] が既定へ戻す文字属性）は**それぞれ別の問い**を表しており、リストが違うのは
  主に意図的（`[clear_lay]` が `bura/kinsoku_*` を外すのはコメントに理由あり＝本家も
  Hyphenation に触らない。`b_src/b_alpha` を足すのは背景系がリセット対象だから）。単一表化は
  リセット意味論の回帰リスクが高い割に得るものが薄い。
- ~~`sys:` → store のミラーを停止点ごとにポーリング~~ … **見送り**（2026-09-03 調査）。
  `defSetTrigger` へ移す案だったが、`sys:` の復元経路（`#loadSaveData` の `setSys`／`[importData]`
  の `setSys`／`[load]` 系）はいずれも `VarStore.setNs()` 直書き＝**代入トリガをバイパスする**
  （line 350 のコメント「setSys()は…代入トリガを通らないため」）。トリガ化すると各 `setSys` の
  直後に手動 re-sync（`global_volume` が line 353 でやっているのと同じ）を 3+ 箇所足す羽目になり、
  「停止点で 1 回だけ engine を真実として突き合わせる」現状の方が浅くない。`tmp:sn.button.fontFamily`
  は `tmp:`＝保存対象外で `[let]` 経由のみ＝トリガでも足りるが、Back.Alpha と非対称になるので
  据え置き。chWait は既読状態依存で元から停止点評価が妥当。
- ~~**`left`/`align_x` の排他ルールを 3 層で推論・逆推論。**~~ … 済（第6弾）。`T_CHGLAY` に
  `reposition?: 'x'|'y'|'xy'` を足し、`store.chgLay` はキーの有無から推測せずこのフィールド
  だけを見る。判定は `[lay]`＝`ScriptEngine`（`sty.left && ! sty.align_x`）、`[tsy]`＝
  `ScriptMng.#beginTsy`（区間に絶対指定があるか）が文脈を持って行い、`withAlign` の
  現在値再注入は撤去。
- **エンジン→store ブリッジが ~35 個の名前付きセレクタ手配線。**（済・第5弾）`Main.tsx` の
  33 個の `useStore(s=>s.x)`（＋`attachTsx` へ渡すリテラル）を撤去し、`{...useStore.getState(),
  isTyping: ()=> isTypingRef.current}` の 1 行に。`T_INIT_FNCS` は全部 Pick された安定アクション
  なので `getState()` のスナップショットで恒久的に正しい。値が変わる `isReadBack`/`isTyping`
  だけ購読を残す（`requestSkip` は `next()` 内で `getState()` から）。`Main.tsx` -31 行、
  store 更新ごとの no-op セレクタ 33 個ぶんが消える。`T_INIT_FNCS` の `Pick` リストはそのまま
  （型として「エンジンが store に依存する範囲」を明示する契約なので残す価値がある）。
- **拡張子によるアセット種別判定がインライン反復。**（済・第2弾＋2026-09-03 で決着）
  `ScriptMng` の `chgPic` 内の 2 箇所は `classifyAsset(src)` に集約済み。`Crypto.ts` の
  `.json` 特例（復号スキップ。`data:`/`blob:` も含む別条件）は**共通化しない**と確定：
  `classifyAsset` は「種別（＝アニメシート）」、`Crypto` は「復号可否（`sys.dec` で別処理）」で、
  たまたま同じ `.endsWith('.json')` になっているだけ。`Crypto.ts` のコメントに明記した
  （将来「共通化できる」と誤読されないため）。
- **サウンドバッファ既定名が ~10 箇所で場当たり解決。**（済・第3弾）SE/BGM 系 5 箇所は
  `ScriptEngine.#bufOf(name, args)`＋`#A_BGM_TAG` 台帳へ、ボタン・リンク SE の既定 `'SYS'` は
  `#BTN_SE_BUF` 定数へ。`xchgbuf`（buf/buf2）と `volume` は `args.buf || 'SE'` のまま（BGM 分岐が
  無く helper に載せる意味が薄い）。
- **文字演出スタイルの解決チェーン「cis → lay in_style → 'default'」が 3 レンダ経路に
  インライン。**（済・第3弾＋2026-09-03 で決着）`TxtLayer.tsx` 内の 3 箇所（out×1／in×2）を
  `chStyIn`/`chStyOut` helper 2 個に。既定値 `CH_IN_DEF`/`CH_OUT_DEF` は元々 store 初期値も
  参照していて重複なし（「3 実体」という指摘は不正確）。組み込み名 `'default'` の生文字列
  4 箇所（store 初期キー・エンジンの重複名チェック Set×2・TxtLayer フォールバック）は
  `ChStyle.CH_DEF_NM` に統一済み。**残りの「組み込みは default 1 個」が store 初期表と
  エンジン Set の 2 箇所に手書き、を `CH_BUILTIN_*` テーブルへ寄せる案は見送り**（2026-09-03）：
  値の重複は既に無く、寄せると `ChStyle` が独立チャンクに分離して 22 個の dist 差分が出る割に、
  組み込みは 1 個で増やす予定も無い＝churn > value。

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

- ~~**レイヤ子コンポーネントが非メモ化＋毎レンダー新規コールバック。**~~ … 計測して見送り
  （2026-09-03、TODO #62）。無限 `[tsy]` 中、fore の全レイヤ（1200 行 `TxtLayer` 含む）が
  60fps で再 render されるのは事実。だが 1 コミットの実コストを React `<Profiler>` で実測
  （満杯ページ＋無限 tsy・vite dev＝React development build・headless）すると
  `actualDuration` mean 1.9ms／p95 2.2ms、**フレーム間隔 mean 16.66ms＝フレーム落ちゼロ**。
  CPU 内訳は `React.createElement`＋emotion の `css` 再シリアライズ＋dev build 限定の計装が
  大半で、アプリ側コードは 0.1ms/frame 未満、重い `useLayoutEffect`（`applyKinsoku`）は
  deps 不変で再実行なし。production build ではさらに軽い見込み。一方 memo 化は `<Page>` の
  `aLay.map` がフックを置けず、`sty`（毎 render 新規）＋5 ハンドラの安定化に per-layer
  ラッパー新設＝設計変更が要り、`sty4Moveable` 合成の追随・折返しズレ回帰リスクを負う。
  数値・レシピ・結論の詳細は [backpage-perf.md](backpage-perf.md)「fore ページの毎フレーム
  再 render の実コスト」。
- ~~**禁則処理が毎テキスト追記で全文字を再測定。**~~ … 済（第7弾＝走査範囲限定、
  第8弾＝deps から `chWait`/`autowc` 除去。どちらも上「適用済み」参照）。
  **見送り（未着手）**：**呼び出しをまたぐ差分**。第7弾は 1 回の `applyKinsoku` 内の
  無駄を消しただけで、`[l]` をまたぐ追記のたび先頭から測り直す点は変えていない。
  DOM から直近の既存 `<br>` を探して `i` の初期値をそこへ、が案だが、番兵位置・前回
  `resumeAt` の持ち越し（`ins < i` で `<br>` が手前に挿さるケース）を跨いで挙動一致
  させるのが難しく、`applyKinsoku` は折返しズレの回帰実績が多い（2026-08-17/18）。
  `prj_kinperf` の実測では初回強制リフローが支配的で、この差分化で削れるのは
  追記あたり ~1ms。リスクに見合わないと判断し見送り。
- ~~**`splitCh` がページ全文を毎チャンク再パース。**~~ … 実測して見送り（2026-09-03）。
  V8 実測（`__splitPerf` 一時計装／33 個の `[span]` を 1 パラグラフに詰めた極端ページ）で
  splitCh 33 回・約 11,000 文字ぶんの再パースが **合計 2.8ms**。通常ページは 0.1〜0.5ms。
  O(セグメント数 × ページ長) は事実だがセグメント数・ページ長とも実際は小さく、V8 では
  問題にならない。`[l]` をまたぐ追記は 1 クリック 1 回の splitCh に分散するのでさらに軽い。
  `last_page_plain_text` の全文 `splitCh` も 340 文字ページで 0.1ms 未満・参照は
  `[save]` 程度。**`splitCh` をステートフル化（span/link/[endlink] スタック等を外出し）
  ＋ScriptMng キャッシュ＋エンジン `#hPlainTxt` を 6 箇所のクリア地点と同期**、という
  改修のリスクに対してリターンが小さい。再検討は「1 パラグラフに数十個の装飾タグ」が
  実測でボトルネックに出てからで十分。
- ~~**`fireworks` GLSL のパーティクル計算がフラグメント不変なのに毎ピクセル再計算。**~~
  … 分析して見送り（2026-09-03）。冗長性の指摘は正しい：`starField` の頭ごと
  `h13`+`normalize`+`headPos`、火の粉ごと `E`/`sink`/`base`/`col`/`tight` は
  (フレーム, 頭, 火の粉) のみ依存で、ピクセル依存は最後の `mote`/`headGlow` splat だけ。
  1 画素あたり概ね `n頭(12〜32) × (頭splat + eLod(8〜18) × 2粒 splat)` ≒ 5〜5.5 万 ops、
  うち粒子シミュ再計算が ~4 割。**だが着手を見送る理由**：
  - **`mote` splat ループ自体（最大 44+44×18×2 ≒ 1600 回/画素）は削れない**＝
    パラメータを JS で持っても per-pixel の下限は ~3 万 ops。削減幅は理論上 ~4 割。
  - **配線コストが重い**：粒子データ ≒ 1600 × 8 float ＝ WebGL1 の uniform 配列上限
    （`MAX_FRAGMENT_UNIFORM_VECTORS` 数百 vec4）を超える → `OES_texture_float` か
    RGBA8 パックのデータテクスチャ＋2 本目のテクスチャユニット＋毎フレーム `texImage2D`
    が要る（`A_FX_PARAM` のスカラ 7 口設計の外）。しかも 1600 依存テクスチャフェッチ/画素は
    GPU によっては ALU 削減分を食い潰す。
  - **`fireworks` が「GLSL 文字列 1 個」でなくなる**：JS シミュレーション相棒つきの特殊
    プリセット化＝「プリセット追加＝GLSL を足すだけ」の設計（ANIMATION_RESEARCH.md §7）が崩れる。
  - **`fireworks` は `loop=false` の約 4 秒単発**＝持続負荷ではない。resolution LOD が
    大画面ぶんの粒数を既に段階的に落としている。
  - ANIMATION_RESEARCH.md §7 は fx 全般の重さ対策として「4K 背景で 60fps 割れの実報告が
    出たら `H_FX_MAX_MPX`（FBO 解像度クランプ・1 行のテーブル）で後付け」と決めており、
    そちらの方が 10 倍安い。JS 粒子化はその実報告が出て、かつ FBO クランプでも足りないと
    分かってから。
  - 実測は headless E2E では不可（SwiftShader ＝ 4K fireworks で rAF が数秒停止）。
    代表値は実 GPU（playwright-cli／手動プロファイル）が要る。
