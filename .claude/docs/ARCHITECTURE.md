# ARCHITECTURE.md

`CLAUDE.md` から分離した詳細版。主要ファイルの役割・設計判断・実装済みタグ一覧・タグ属性の
共通前処理・属性既定値ルールの判定基準をまとめる。ハマりどころ（落とし穴）は [PITFALLS.md](PITFALLS.md)、
E2E テストの書き方は [TESTING.md](TESTING.md) を参照。

## データフロー

**純粋なシナリオエンジンと UI の分離**が中心。だからシナリオ処理はブラウザ無しで単体テストできる。

```
SysWeb (web.ts) ─▶ SysBase.loaded ─▶ ScriptMng.load(fn)
                                          │
   'ev_next' CustomEvent on heStage ◀─────┤  (Main.tsx が listen し scrMng.go)
                                          ▼
                              ScriptEngine.step()  ── pure ──▶ T_ENGINE_ACTION[]
                                          │
                              ScriptMng.#applyAction() が store へ反映
                                          │
                                    React (Stage/…) が store から再描画
```

## 主要ファイル

- **`src/ts/ScriptEngine.ts`** — 試作版の実行器。DOM も fetch も持たない。次の `[l]`/`[p]`/`[s]`
  まで進めて `T_ENGINE_ACTION[]` を返す。実行状態（トークン位置、if スタック、コールスタック、
  マクロ表、変数）を全部持つ。**エンジンはただ 1 つ**で、ファイル跨ぎは `switchScript()` による
  `Script` 差し替えなので変数もスタックも生き残る。他ファイルが要るときは
  `{t:'loadScript',…}` を出して停止し、fetch は `ScriptMng` の仕事（`step()` を同期に保つため）。
  `step()` の分岐は本家 `Main.ts#main()` そのまま＝トークン先頭 1 文字で決める。だから
  **`trimStart()` してはいけない**（Grammar が先頭タブ・改行・コメントを別トークンに割る前提）。
- **`src/ts/Script.ts`** — `.sn` 1 ファイルのパース結果（トークン配列＋ラベル表）。読み取り専用。
  `Grammar` は `ScriptMng` が**1 個だけ**作って全 `Script` に渡す。
- **`src/sn/Grammar.ts`** — 本家のトークナイザを**そのまま移植**。`test/Grammar.test.ts` は本家の
  テストファイルを無改変で持ってきたもの。唯一の相違は `cfg` が optional なこと。
- **`src/ts/VarStore.ts`** — 本家 `Variable` から save/dirty を除いたもの。名前空間は
  `tmp`/`game`/`sys`/`mp`（本家の `save:` は `game:`。ただし `save:` も**別名として受ける**、
  上流シナリオが全部そう書くので。`ExprEval` 側にも別名が要る、でないと `:` が三項演算子に読まれる）。
  `get()` は**未定義変数に `undefined`**、格納された null にのみ `null` を返す（`1 + 未定義` → `NaN`
  が本家の未定義検出法なので、この区別が効いている）。読み取り時に自動キャスト（`@str` 終端は除く）、
  prefix が JSON 文字列ならその中へ降りる（`const.db.紀子.fn`）。
- **`src/ts/ExprEval.ts`** — 本家 `PropParser` を丸ごと移植（parsimmon）。`T_VAR_GET` を取るので
  テストは本家 `ValTest` 的なフラット表を渡せる。
- **`src/ts/ScriptMng.ts`** — 橋渡し。`#runStep()` が `engine.step()` を呼び、`#applyAction()` が
  各アクションを store 更新に翻訳、`loadScript` なら fetch してループ。**アセットパス解決
  (`path.json`→`searchPath`) もここ**で、store は論理名 `fn` と解決後 URL `src` の両方を持つ。
  `searchPath` は見つからないと throw し、render 中の throw は React ごと落とすため。画像欠損は
  `'E'`（表示のみ）、スクリプト欠損は致命的。
  **停止/再開の中枢**でもあり、`[s]` 停止（`#stopped`）・DOM 非同期（`#procing`）・本編 step 実行中
  （`#busy`）・ホバーコール中（`#hovering`）に加え、**待ち合わせタグ 8 種**
  （`[wt]`/`[wait]`/`[wait_tsy]`/`[wait_fx]`/`[wq]`/`[ws]`-`[wl]`/`[wf]`-`[wb]`/`[wv]`）は
  `#curWait` 単一トークン（`T_WAIT`）で表す。各サブシステムの `#beginXxx`/`#finishXxx`
  （タイマー・`#hTw`・rAF ポーリング等）は個別に残るが、「今なにを待っているか」はこの 1 個で、
  `#goSafe()`／`hoverCall()` は種別を知らない（`#armWait()` で待ちに入り、終了口が
  `#resumeWait(kind, key, deferred)` で戻す）。`bypassOnCall`（`[wait_tsy]`/`[wait_fx]` だけ）は
  `[button call=]`/`[event]` が待ちを跨いで実行してよいことを表す。
- **`src/store/store.tsx`** — zustand。単一の真実。`aPage: [T_LAY[], T_LAY[]]` が fore/back 2 ページ
  （本家 `Pages.ts`）で `foreIdx` がどちらが fore かを示す。`[add_lay]` は**両ページ**に作る。
  **レイヤ `nm` は `grp`/`txt` を跨いで一意**（重複は throw、React key も衝突する）。
- **`src/components/`** — React 19 + `@emotion/react` JSX。`Main.tsx` がキー/クリックと `ev_next`
  ループ、`Stage.tsx` が `aLay` 描画、`TxtLayer`/`GrpLayer`/`BtnLayer` が 3 役。`Stage` は
  モジュールトップで `lazy()`。**`Stage.tsx` を静的 import してはいけない**（value import 1 つで
  分割が効かなくなる／rolldown が `INEFFECTIVE_DYNAMIC_IMPORT` を言う）。共有部品は
  **`src/components/Lay.ts`**（`T_LAY` 等、`styLay`、ドラッグフラグ）に置く。
- **`src/ts/PageLog.ts`** — 読み戻り（`[page to=…]`・PageUp/Down）。停止点ごとに**そのページを
  演じ直すのに要るもの**（本文が出る前の位置 `fn`/`idx` ＋ しおり）を積む。戻るときは
  `ScriptMng` がしおりを復元してその位置から動かし直す＝本家 `loadFromMark()` と同じ方式で、
  画面のスナップショットを貼り直す方式では `[page to=load]`（見ているページから再開）で
  エンジンの位置が繋がらない。ボタンジャンプはこの履歴を**触らない**。
- **`src/sn/`** — 本家から持ってきた土台（`SysBase`, `Config`, `Grammar`, `CmnLib`,
  `AnalyzeTagArg`, `Areas`, `CallStack`）。
- **`src/ts/SndMng.ts`/`src/ts/SndBuf.ts`** — 音声層。DOM/WebAudio を直接触るのは `ScriptMng` から
  見てここだけ（`ScriptEngine.ts` は属性の解釈と `save:`/`sys:` の帳簿付けだけを行う）。本家は
  howler（Howl）を積むが、こちらは Web Audio API を直接使う自前の薄い層。**1 バッファ＝1
  インスタンス、停止＝破棄**という単純な作りで、本家の状態機械（`StLoading`〜`StStop` の 6
  クラス。退場処理が無く不備の温床だった）は持たない。`[ws]`/`[wl]`/`[wf]`/`[wb]` の待ち合わせは
  `SndBuf` ではなく **`ScriptMng` が持つ**（`[trans]`/`[tsy]` と同じ設計。詳細は
  [PITFALLS.md](PITFALLS.md)）。
- **`src/ts/Tw.ts`** — トゥイーン本体。`motion`（2026-08-19 に GSAP から移行、経緯・罠は
  [PITFALLS.md](PITFALLS.md)）の薄いラッパーで、本家 `CmnTween.ts` の `Tw` クラスを移植した。
  `[tsy]`/`[tsy_frame]`（store のレイヤ属性・`FrameMng` の見た目）と `[fadese]`/`[fadebgm]`
  （`GainNode.gain`）が使う。`motion` の import はこのファイルに閉じ込める。
- **`src/ts/Tsy.ts`** — `[tsy]`/`[tsy_frame]` のうち DOM も `motion` も触らない純粋部分（属性値→
  目標値、31 種の ease 関数、tween 命名）。`ScriptEngine` から呼べるので属性の書き間違いをその場で
  例外にできる。
- **`src/ts/Trans.ts`** — `[trans rule=]`（ルール画像ワイプ）のうち DOM も `motion` も触らない
  純粋部分。本家のフラグメントシェーダ（`LayerMng.ts` の `#srcRuleTransFragment`）を、WebGL を
  使わず SVG フィルタ＋CSS マスクへ置き換えるための「進度→見た目」計算だけを切り出してある。
- **`src/ts/Swipe.ts`** — スワイプ判定（`swipeleft`/`swiperight`/`swipeup`/`swipedown`）の純粋関数
  `detectSwipe`。本家は `tinygesture` の一括処理だが、bluesnovel は tap/longpress を React 標準/
  `react-use` で代替済みのため未実装だったスワイプ判定だけを自作した（2026-08-19）。
- **本家互換プラグイン機構（`[add_lay class=…]`→`addLayCls`）** — 本家では Pixi 前提の 3D/Live2D 等の
  プラグイン（`sn_gallery/src/plugin/3d_layer`・`live2d_layer` 等）を DOM 版へ書き換えて移植できる
  ようにする土台（2026-08-24）。
  - `src/sn/LayCls.ts` — cls 名（`grp`/`txt`/プラグイン独自名）→ Layer 工場のレジストリ。本家
    `SysBase.hFactoryCls` 相当だが、`ScriptEngine`（`sys` を持たない）・`Stage.tsx`・`SysBase`
    の 3 者から見えるようモジュールレベルの `Map` にしてある。
  - `src/sn/Layer.ts` — 本家 `Layer` 基底クラスの DOM 版。本家は `ctn` が Pixi の `Sprite` で
    位置・alpha・回転・拡縮の委譲プロパティを持つが、その役割は bluesnovel では
    **`components/Layer.tsx`（箱）** が既に担うため、ここに残る `ctn` は「中身を入れるための
    素の `div`」だけ（`this.ctn.appendChild(canvas)` 等をプラグイン側が行う）。
  - `src/ts/PlgLayMng.ts` — プラグインレイヤーの DOM 側実体。`[add_frame]` の `FrameMng` と同じ
    **store 外・DOM 側管理**パターンで、1 レイヤ名につき `Layer` インスタンスを fore/back 2 個
    持つ（本家 `Pages` と同じ）。3D シーン等の重い可変状態を `structuredClone`
    （`addLayer`/`finishTrans`）に載せずに済む。
  - `src/components/PlgLayer.tsx` — React 側の箱。`GrpLayer`/`TxtLayer` と同格の第 3 の描画先で、
    中身は `PlgLayMng.attachBox()` が出し入れする置き場所の `div` を渡すだけ。
  - `src/components/Lay.ts` の `T_LAY_IDX.cls` は `'grp'|'txt'|(string & {})` へ拡張。判別ユニオン
    `T_LAY` にプラグイン型 `T_PLGLAY_DATA`（`plg: true` の判別マーカー必須。無いと構造的に
    grp/txt もこの型に代入可能になり型ガードが壊れる）を追加し、`isGrpLay`/`isTxtLay`/`isPlgLay`
    という型ガード関数を経由して絞り込む（`e.cls === 'grp'` のようなインライン比較では、
    `(string & {})` を含む緩い判別プロパティを TS が正しく絞り込めないため）。
  - `SysBase.#initPlg()`（`run()` 内、`Config.generate()` の後・`initMain()` の前）が `hPlg` の
    各プラグインの `init()` を一括実行し、`T_PluginInitArg.addLayCls`/`addTag` を実際に機能させる。
    `render` は未対応（no-op。pixi.js 専用の RenderTexture 焼きなので bluesnovel に消費先が無い）。
  - `src/sn/PlgTag.ts`（2026-08-26）— プラグインが `addTag` で足すタグ名 → 処理関数のレジストリ。
    本家 `hTag[name] = tag_fnc` に相当するが、`ScriptEngine.step()` がタグ名を `switch` で捌く
    構造のため、`hTag` のような「呼べば済む辞書」に乗せられない。`LayCls.ts` と同じ形で
    モジュールレベルの `Map` に置き、`ScriptEngine`（名前の存在検査だけ）・`ScriptMng`
    （実際の関数呼び出し）・`SysBase.#initPlg()`（登録口）の 3 者から見えるようにしてある。
    - `ScriptEngine.#execTag()` の `default` ケースが `hasPlgTag(name)` で存在を検査し、真なら
      属性ハッシュを丸ごと `{t: 'plgTag', name, hArg}` として `aAct` に積んで `'stop'` を返す
      （`layPlg` と同じ設計：中身の解釈もタグ関数の呼び出し＝副作用も、エンジンでなく
      `ScriptMng` 側に閉じ込める。`step()` の純粋性はここで保たれる）。
    - `ScriptEngine.registerPlgTag(name, fnc)`（静的メソッド）が `addTag` の実際の登録口。
      `RESERVED_TAGS`（既存タグ名の一覧を持つのは `ScriptEngine` 側）との衝突検査をしてから
      `PlgTag.addPlgTag()` へ委譲する（本家 `if (name in hTag) throw` と同じ意図）。
    - `ScriptMng.#procPlgTag()` が唯一の実行口。タグ関数の戻り値は本家同様 isWait（`[lay]` の
      isWait 対応・`Pages.lay()` 相当）で、`true` なら `#procing` を立てたまま処理完了を待ち、
      プラグインが `T_PluginInitArg.resume`（`ScriptMng.resumePlg()`）を呼ぶまで再開しない。
      `resumePlg()` は `#procing` を下ろしてから `#goSafe()` する点が素の `go()` と違う
      （`#procing` が立ったままだと `#goSafe()` の「DOM 絡みの非同期処理中はクリックを
      捨てる」判定に引っかかって無視されてしまうため）。
  - E2E 疎通確認は `test/e2e/plg.e2e.ts`（`test/e2e/app/prj_plg/` ＋ `test/e2e/app/dmyPlg.ts`）。
    `[s]`（シナリオ本当の終端）の停止はクリックでは越えられないため、`addTag` のテストタグは
    `[l]`〜`[s]` の間（クリック 1 回で通過する区間）に置いてある。

**本家由来ファイルは本家のテストを無改変で持っている**（`test/Grammar.test.ts`,
`test/ExprEval.test.ts`, `test/VarStore.test.ts` の後半）。これらを触るときはまず
`../skynovel_esm/src/sn/…` と diff を取る。テストが契約で、意図的な相違は各テストの冒頭コメント。

**文字列リテラルにエスケープを書かない。** `\'` や `\"` が要る文字列はテンプレートリテラルにする
（`` `[if exp="mp:v=='X'"]` ``）。`.sn` 断片は両方の引用符だらけで、バックスラッシュだと読めない。

## 実装済みタグ

`add_lay`, `current`, `add_face`, `lay`, `clear_lay`, `trans`/`wt`,
`add_filter`/`clear_filter`/`enable_filter`,
`add_fx`/`clear_fx`/`wait_fx`/`pause_fx`/`resume_fx`（**bluesnovel 独自**、2026-08-28 正式化。立ち絵・
背景 grp レイヤへ WebGL シェーダを重ねる。`src/ts/Fx.ts`＝純粋／`src/ts/FxRunner.ts`＋`src/ts/fxPresets.ts`＝lazy WebGL
（`FxRunner` は `T_FX_HANDLE`＝`{update,dispose}` を返す。パラメータ・`enabled` はもちろん、シェーダ
構成〈fx 名/glsl/パス数〉が変わっても canvas は作り直さず同じコンテキストでプログラムを組み直す
＝`FxImg` の `key` は基本画像＋face のみ。切替時に空白が出ない）。`wait_fx` は `ScriptMng` が
`[add_fx time>0]` のタイマーを持つ（`wait_tsy` と同型）。
プリセット wave/rgbShift/snow/rain または生 `glsl=`（契約は `[trans glsl=]` と統一＝`uSampler`/`vTextureCoord`/`tick`）。
face は `GrpLayer` の `makeFxSource()` が 2D canvas で合成して `runFx({source})` へ（静止＝一度きり、
アニメ png シート＝毎フレーム描き直す関数を渡し `FxRunner` が rAF ごと `texImage2D`。動画は未対応）。
`[trans]` 後の不可視 back ページは `Stage`→`GrpLayer` の `fxActive` で rAF 凍結。
詳細は `src/docs/ANIMATION_RESEARCH.md` §7），
`tsy`/`wait_tsy`/`stop_tsy`/`pause_tsy`/`resume_tsy`, `page`,
`let`, `let_ml`/`endlet_ml`, `let_abs`/`let_round`/`let_length`/`let_char_at`/`let_index_of`/
`let_substr`/`let_replace`/`let_search`, `if`/`elsif`/`else`/`endif`, `r`, `er`, `trace`,
`jump`, `call`/`return`, `macro`/`endmacro`, `char2macro`/`bracket2macro`, `button`,
`event`/`clear_event`, `enable_event`, `wait`, `clearvar`/`clearsysvar`, `pop_stack`, `title`,
`rec_ch`/`rec_r`/`reset_rec`（本文履歴。`src/ts/Log.ts`），
`ch_in_style`/`ch_out_style`/`autowc`（文字出現演出と文字ごとのウェイト。`src/ts/ChStyle.ts`。
**消去演出はまだ適用していない**），
`toggle_full_screen`, `dump_lay`, `add_frame`/`frame`/`set_frame`/`let_frame`, `set_focus`,
`close`/`window`（アプリ版のタグ。**ブラウザ版では何もしない**＝エンジンは属性の検査までで、
実処理は `SysBase` の no-op メソッドを `SysApp` が上書きする形。本家も同じ。`update_check` は
属性の検査だけで実処理は未実装），
`playse`/`playbgm`/`stopse`/`stopbgm`/`stop_allse`/`volume`/`fadese`/`fadebgm`/`fadeoutse`/
`fadeoutbgm`/`stopfadese`/`ws`/`wl`/`wf`/`wb`（ＢＧＭ・効果音。`src/ts/SndMng.ts`/`SndBuf.ts`。
`xchgbuf` と音声の復元（`[load]`）・ボタン効果音は未対応），
停止点 `l`/`p`/`s`/`waitclick`。

**属性ごとの詳細と実装状況は `docs/tag.html`**（変数は `docs/dev.html`）。名前に
🟢実装済 / 🟡一部 / 🔴未実装 のマークが付いており、bluesnovel 固有の相違・メモは各タグの詳細部に
書く。**タグや変数を実装・変更したらこのマークを更新する**（「何が動くか」の唯一の情報源。おかげで
`src/docs/TODO.md` は状況一覧でなく作業計画のままでいられる）。

`jump`/`call`/`return`/`button` は `fn=` でファイルを跨げる。マクロは定義元と別ファイルからも
呼べる。マクロ名は `ScriptEngine.RESERVED_TAGS` と `REG_NG4MAC_NM` で弾く。`[macro]` の入れ子は
ここでは動くが本家では動かない。

## 非タグ構文

本家互換（Grammar 由来）: 複数行タグ、`;` コメント、`[`/`]`/`;` を含む文字列リテラル、
`&名前 = 式 [= cast]` 代入（`&&式 = 式` は名前も式評価）、`&式&` インライン表示。`&` 系はトークンが
`&` で**始まる**ときだけ発火（行頭かタグ直後）。引用符を含む属性値は値全体を引用する
（`[if exp="mp:v=='X'"]`）。`AnalyzeTagArg` は無引用値を最初の引用符で切るため。

## タグ属性の共通前処理

`ScriptEngine.#resolveTag()`（本家 `ScriptIterator.ts:418 タグ解析()` 前半の移植）が全タグ共通で
処理するので、個別タグ側でやってはいけない:

- `cond=…` — 偽ならタグを**実行しない**。制御構文タグ含め全タグに効く。`exp` 同様、先頭 `&` は不可。
- `%属性名` — 現マクロに渡された属性値、`|省略値` がフォールバック。引数も既定値も無ければ
  **属性そのものが渡らない**（タグ自身の既定値に落ちるための仕組み）。マクロ外では throw。
- `[tag *]` — マクロが受けた属性を全部継承。明示指定が勝つ。マクロ外では throw。
- `&式` — 値を式評価。`undefined` なら属性を落として `|省略値` を試す。

`%` と `*` が読むのは `#aCallStk[].hArgs`＝呼び出し時に退避した**生の属性文字列**（本家 `csArg`）。
同じ値は `mp:` にもあるが `VarStore` が読み取り時に自動キャストする（`'1.20'`→`1.2`）ため。
`[call]` も属性を退避するので、素のサブルーチンでも `%` が使える。

トークンを**実行せず走査する** 2 箇所（`#if()` の `elsif`/`else`/`endif` 探索、`[macro]` の
`[endmacro]` 探索）は生の `ScriptEngine.parseTag()` を使う。本家もそこは `hPrm` を直読みしている。

## 属性の既定値

**属性の既定値は 1 箇所**。エンジンの入口（タグの `case`）か CSS か、どちらかに決めて**両方には
書かない**。CSS も「宣言された 1 箇所」なので外側にあること自体は悪くない。悪いのは枝葉の
コンポーネントが場当たりに `??` で発明することで、そうなると同じ問いの答えが N 箇所に散る。

- **判定**: その値をストアが知らなくても、セーブ・読み戻し（`PageLog`）・`[dump_lay]` が正しいまま
  か。いいえなら入口、はいなら CSS に任せて格納しない。`[button]` の `width`/`height` は
  「いいえ」（本家 `Button.ts` も `#o` へ確定値を記録する）、`[lay left]` の 0 は「はい」。
- **入口は書き込み時に焼き付き、CSS は描画時に毎回評価される**。既定を後で変えたとき、入口方式は
  古いセーブが元の値のまま・CSS 方式は古いセーブも新しい既定で描き直される。どちらが欲しいかは
  属性ごとに違うので、これも選択の材料にする。
- どちらに決めたかの台帳は **`test/argdef_parity.test.ts`** の 3 つの表（`A_CSS_DEF` /
  `A_ELSEWHERE` / `A_NOT_YET`）。本家の `argChk_*` の既定を抜き出して突き合わせ、属性を 1 つも
  書かないタグを**実際に走らせて**既定が出ることまで見る。新しいタグを足したらここも足す。

## 参考資料

- **タグ仕様**: <https://famibee.github.io/skynovel_esm/tag.html>（ローカル
  `../skynovel_esm/docs/tag.html`）。本家の全タグ名の正典は
  `../skynovel_esm/src/sn/Grammar.ts` の `T_HTag` 型、実装は `../skynovel_esm/src/sn/*.ts` の
  `hTag.<name> = …`。
- **機能別サンプル**: [SKYNovel_gallery](https://github.com/famibee/SKYNovel_gallery) の
  `public/prj/<機能>/`。実シナリオでの属性の書かれ方の事実上の仕様。
- **フルサンプルゲーム**（本家形式）: `../tmp_esm_uc/doc/prj/`。`script/main.sn` が
  `theme/setting.sn` / `theme/ext_*.sn` / `script/sub.sn` / `frames/_yesno.sn` を呼び、
  `theme/title.sn` へ jump する。タグに見えるものの多くは**プロジェクト側マクロ**（`img`, `grp`,
  `fg*`, `txt_lay_*`, `sys_menu`, `ask_ync` …）で、`[notice]` はプラグイン由来でエンジンではない。
- **`test/uc_goal.test.ts` がプロジェクトの到達目標を測る**: 上記サンプルを `main.sn` から
  `title.sn` の `[s]` までエンジンだけで走らせる。`ScriptMng` が DOM 側でやる 3 つ（スクリプト
  fetch、フレーム読み込み、環境組み込み変数の登録）を偽装すれば足りる。兄弟チェックアウトが
  無ければ skip。タグを足したら走らせること。上流ソースを読むだけでは見えない穴が見つかる。
