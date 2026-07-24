# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`@famibee/bluesnovel` — an ESM JavaScript/TypeScript **novel-game framework**. It is a
ground-up simplification/rewrite of the author's earlier **SKYNovel** engine (referred to
throughout the code as **本家** = "upstream", often with `skynovel_esm/src/...:line` file
pointers in comments). The scenario engine is explicitly a **試作版 (prototype)** — many
features are intentionally minimal, single-file-only, or stubbed. When porting behavior,
the comments' `本家 <file>:<line>` references are the spec being followed; preserve that
naming when adding related code.

Ships two targets from one source tree: a **browser** build (`dist/`) and an **Electron
app** build (`dist_app/`). Both `dist/` and `dist_app/` are committed build artifacts.

## Commands

Runtime is **Bun** (tests + build driver) with **Vite 8 / rolldown** for bundling. Node >= 22.19.

```bash
bun run build      # build all 4 bundles via src/build.ts (web + electron app/appMain/preload)
bun run watch      # same, in Vite watch mode (no .d.ts emit in watch)
bun test           # run unit tests (bun:test)
bun test --only-failures   # what `bun run test` does; reruns only previously-failed
bun test test/ScriptEngine.test.ts   # single file
bun test -t "step_trace_ampPrefix"   # single test by name (it('...') label)
bunx tsc --noEmit --incremental false   # typecheck only — NOT run by `bun test`; run before committing
                                        # (`--incremental false` avoids littering dist/ with tsbuildinfo)
bunx tsc --noEmit -p test/e2e   # typecheck the E2E tree (separate project, see below)
bun run docs       # vite docs/ playground, opens /tag.html
bun run test:e2e   # browser E2E via Playwright (starts/stops its own vite on :5199)
bun run test:e2e:ui        # same, in Playwright's UI mode
bunx playwright test -c test/e2e button.e2e.ts   # single E2E file
```

There is **no `lint` script** despite ESLint devDependencies being present, and **no
`bunfig.toml`** — tests run with Bun defaults. Unit tests are deliberately DOM/fetch-free
so they need no happy-dom preload; `@happy-dom/global-registrator` exists for any future
component tests.

## E2E tests (`test/e2e/`)

Everything E2E lives under `test/e2e/` — specs, fixture app, `playwright.config.ts` and its own
`tsconfig.json` — deliberately keeping the repo root clean. Unit tests (`bun test`) and browser
E2E (`playwright test`) are **fully separated**:

- **Put a test here only if a browser is required for it**: DOM / computed CSS /
  `document.title`, input events (click, key), things driven by React rendering
  (`Caretaker`/Memento), fetch and the async script-switch path, or config wiring from
  `prj.json`. Engine logic belongs in `test/*.test.ts`. Note that `mesStr()`/`snap()` only
  read the zustand store — a spec asserting nothing else is really an engine test wearing a
  browser costume, so check whether a unit test already covers it.

- E2E specs are named `*.e2e.ts`, **not** `*.spec.ts` — `bun test` auto-collects `*.spec.*`, and
  it also scans `test/`, so the conventional name would break the unit-test run. `testMatch`
  enforces this.
- The config is not at the root, so Playwright needs `-c test/e2e` (both `test:e2e` scripts pass
  it). `webServer` starts/stops vite itself on a **dedicated port 5199** with
  `reuseExistingServer: false`, and pins `cwd` to the repo root so vite's root is the repo, not
  the config's folder. Vite's default 5173/5174 are routinely squatted by other projects' dev
  servers (e.g. `tmp_blues`), and reusing one silently tests the *wrong app*.
- `test/e2e/app/` is a self-contained fixture: `index.html` + `main.ts` boot `SysWeb` against
  `test/e2e/app/prj_<name>/` (`prj.json` / `path.json` / `main.sn`). `?prj=basic|button|expr|multi`
  picks the scenario, since `SysBase.loaded()` always loads the script named `main`. No image
  assets are used, so the fixtures need no binaries. Adding a scenario = new `prj_<name>/` +
  a `T_PRJ` member in `snPage.ts`. **`src/` contains no test-only hooks**:
  `test/e2e/app/main.ts` publishes `window.__sn = {store: useStore}` and assertions read the
  zustand store from there; `traceText()` finds the debug overlay as `body > span` rather than
  giving it an id.
- Writing fixture `.sn`: `&名前 = 式` and `&式&` only fire when the **token** starts with `&`
  (line start, or straight after a tag) — mid-sentence they render literally. See
  `prj_expr/main.sn`.
- Scenarios that cross files (`prj_multi/`) must advance with `pressKeyToWaitMark()`, not
  `pressKey()`: a script fetch leaves brief moments where store, DOM and `isTyping` all look
  settled mid-run, `waitIdle()` cannot tell those from a real stop point, and a key pressed
  then is swallowed as "finish the typing animation" (`Main.tsx` `next()`) instead of
  advancing — losing a whole stop point. `store.wait` is reset every `#runStep()` iteration
  and only set at `[l]`/`[p]`, so it is a reliable stop-point signal. `[s]` sets no marker,
  so that last hop still uses `pressKey()` + `expect.poll`.
- `test/e2e/snPage.ts` holds the helpers. `waitIdle()` must be awaited before every click or
  keypress: it waits until the DOM has caught up with the store, because `Stage` is `lazy()`-loaded
  and a test can otherwise race ahead while Suspense still shows `Loading` — in that window
  `Stage` never renders, so `Caretaker.update()` never records a Memento and read-back silently
  breaks.
- The root `tsconfig.json` **excludes `test/e2e`** from its `test/**/*` include (otherwise
  `vite-plugin-dts` emits `.d.ts` for the tests into `dist/`); `test/e2e/tsconfig.json` typechecks
  it instead.

## ブラウザ手動操作は playwright-cli スキルで（MCP は使わない）

E2E テストの実行ではなく「画面を開いて動作を目視確認する」用途では、**必ず
`.claude/skills/playwright-cli/` スキル（`playwright-cli` コマンド）を使う**。playwright MCP
は同じことができるが、ツール定義とスナップショット応答が丸ごとコンテキストに載るためトークン
消費が桁違いに多い。CLI 版は結果をファイル（`.playwright-cli/*.yml`）に落として要約だけ返すので
安い。`.claude/settings.local.json` で `mcp__playwright` を deny 済み。

```bash
playwright-cli open http://localhost:5199/test/e2e/app/?prj=basic  # vite は別途起動しておく
playwright-cli snapshot --depth=4        # 全部は取らず浅く。詳細は find/部分snapshot で掘る
playwright-cli find "テキスト"           # 大きい画面はこれで grep したほうが安い
playwright-cli --raw eval "JSON.stringify(window.__sn.store.getState().aLay)"
playwright-cli close
```

- ストア確認は `window.__sn.store.getState()`（E2E フィクスチャが公開しているもの。`src/` 側には
  テスト用フックを足さない方針は CLI 操作でも同じ）。
- `playwright-cli` はグローバル導入済み（`/usr/local/bin/playwright-cli`）。無ければ
  `npx playwright cli <command>` でローカルの playwright からも呼べる。
- 自動テストとして残すものは従来どおり `test/e2e/*.e2e.ts` に書く。CLI はあくまで手動確認用。

## Build system (`src/build.ts`)

`bun run build` executes `src/build.ts`, which calls Vite's `build()` programmatically
**four times** to emit four separate lib bundles:

| Entry           | Output dir  | Externals                          |
| --------------- | ----------- | ---------------------------------- |
| `src/web.ts`    | `dist/`     | (bundled for browser)              |
| `src/app.ts`    | `dist_app/` | node builtins                      |
| `src/appMain.ts`| `dist_app/` | `electron` + node builtins         |
| `src/preload.ts`| `dist_app/` | `electron` + node builtins         |

`.d.ts` files are emitted via `vite-plugin-dts` (skipped in watch mode) and rewritten to
drop the `/src/` path segment. `package.json` `exports` map points consumers at these.

## Architecture

The central design is a **strict separation between a pure scenario engine and the UI**,
so scenario logic can be unit-tested without a browser:

```
SysWeb (web.ts) ─▶ SysBase.loaded ─▶ ScriptMng.load(fn)
                                          │
   'ev_next' CustomEvent on heStage ◀─────┤  (Main.tsx listens, calls scrMng.go)
                                          ▼
                              ScriptEngine.step()  ── pure ──▶ T_ENGINE_ACTION[]
                                          │
                              ScriptMng.#applyAction() maps each action ──▶ zustand store
                                          │
                                    React (Stage/…) re-renders from store
```

- **`src/ts/Script.ts`** — one `.sn` file's parse result (token array + label table), read-only.
  Everything that varies per file lives here. It holds the `Grammar` that tokenized it;
  `ScriptMng` builds **one** shared instance (escape char from `prj.json`'s `init.escape`,
  plus `cfg` so `fn=…*` wildcards expand) and passes it to every `Script`.
- **`src/ts/ScriptEngine.ts`** — the prototype executor. No DOM, no fetch. Runs the current
  `Script` until the next `[l]`/`[p]`/`[s]` stop point (or EOF), and returns a
  `T_ENGINE_ACTION[]` describing what changed (add layer, change picture, append text, add
  button, trace, stop…). It owns **all execution state**: token index `#idx`, the if-stack
  `#aIfStk`, the call-stack `#aCallStk`, the macro table `#hMacro`, and variables (via
  `VarStore`/`ExprEval`). **There is exactly one engine**; crossing files swaps the `Script`
  via `switchScript()`, so variables and stacks survive. When a tag needs another file the
  engine emits `{t:'loadScript', fn, label, idx}` and stops — fetching is `ScriptMng`'s job,
  which keeps `step()` synchronous and unit-testable. This is the file most unit tests target.
  Tokenizing and tag-arg parsing are **delegated to 本家 code**: `Grammar.resolveScript()`
  and `tagToken2Name_Args()` + `AnalyzeTagArg`. `step()`'s dispatch mirrors 本家
  `Main.ts#main()` exactly — first char of the token decides (`\t`/`\n` skip, `[` tag,
  `&` assign-or-display, `;` comment, `*` label, else text) — so **no `trimStart()`**:
  Grammar always splits leading tabs, newline runs and comments into their own tokens.
- **`src/sn/Grammar.ts`** — 本家's tokenizer, **ported verbatim** (`resolveScript` →
  `Script{aToken,len,aLNum}`, `setEscape`, `char2macro`/`bracket2macro`, `splitAmpersand`,
  `tagToken2Name_Args`). Handles multi-line tags, string literals containing `[`/`]`/`;`,
  comments, `[let_ml]`…`[endlet_ml]`, labels, escape chars and `fn=…*` wildcard expansion.
  `test/Grammar.test.ts` is the 本家 test file moved over unchanged — keep it that way.
  Only divergence: `cfg` is optional (it drives wildcard expansion alone), so `ScriptEngine`
  can do `new Grammar` without a `T_Config`.
- **`src/ts/VarStore.ts`** — 本家 `Variable` minus save/dirty handling. Namespaces are
  `tmp`/`game`/`sys`/`mp` (本家's `save:` is `game:` here). `get(name, def?, touch?)`
  returns **`undefined` for an undefined variable** and `null` only when null was stored —
  the distinction is load-bearing (`1 + 未定義` → `NaN` is how 本家 detects undefined).
  Reads auto-cast (`'true'`→true, `'1.20'`→1.2) unless the name ends `@str`; a name whose
  prefix holds a JSON string descends into it (`const.db.紀子.fn`). `set()` takes 本家's
  `cast` (`num`/`int`/`uint`/`bool`/`str`); since auto-cast happens on *read* here,
  `cast=str` is remembered per key in `#setNoCast` rather than baked into the value.
- **`src/ts/ExprEval.ts`** — 本家 `PropParser` **ported whole** (parsimmon operator table).
  Ternary, bit ops, `¥` integer division, hex literals, `int`/`parseInt`/`Number`/`ceil`/
  `floor`/`round`/`isNaN`, `#…#` string literals, `$var` / `#{expr}` embedding, and
  `hA[春夏][ひきす]` index-to-name resolution. Takes a `T_VAR_GET` (`{get(name)}`), not a
  concrete `VarStore`, so tests can pass a flat table like 本家's `ValTest`.
- **`src/ts/ScriptMng.ts`** — the bridge. `#runStep()` (async) calls `engine.step()`, then
  `#applyAction()` translates each `T_ENGINE_ACTION` into a store mutation (the `T_INIT_FNCS`
  set passed in from `Main.tsx`); on `loadScript` it fetches, caches a `Script` and loops.
  Advance requests arriving mid-load are counted, not dropped. Also owns script fetching and the
  `myTrace` debug overlay. Contains a `SAMPLE_SN` fallback that renders a demo when assets
  are missing — this is prototype scaffolding to be removed once the asset pipeline exists.
- **Filters are the sharpest case of the pixi→DOM divergence.** Upstream has 22 pixi filters;
  CSS `filter` can express 9 of them natively, so that is what `src/ts/Filter.ts` implements.
  The other 13 are all `ColorMatrixFilter` presets except `noise`, so they *are* reachable
  later via an SVG `feColorMatrix` fed the same 5×4 matrix — the error message says so, and
  deliberately distinguishes "no such filter" (upstream's wording) from "upstream has it, CSS
  can't". Note `[lay filter=]` **replaces** the list while `[add_filter]` appends; that
  asymmetry is upstream's.
- **Stacking order is the array order** in `aPage[i]` (later = in front), matching pixi's
  child order upstream. `[lay float=/index=/dive=]` reorder it — **always both pages
  identically**, since `pickPage`/`putPage` and `[trans]`'s layer cloning all assume the two
  arrays hold the same names in the same order. Anything needing the *current* order (these,
  and `[tsy]`'s `'=100'` relative values) is resolved in the store, not the engine: the engine
  emits the intent and the store does the arithmetic. `test/store_lay.test.ts` covers that
  arithmetic directly — zustand's `create()` needs no DOM, so store logic is unit-testable.
- **`src/store/store.tsx`** — **zustand** store; single source of truth. `aPage: [T_LAY[],
  T_LAY[]]` holds the **two pages** (本家 `Pages.ts`) and `foreIdx` says which one is the
  fore. `[add_lay]` creates every layer on **both** pages. Store setters (`addLayer`,
  `chgPic`, `chgBAlpha`, `chgStr`, `addBtn`, `setWait`, …) are the only way the engine's
  actions reach the UI. **Layer `nm` must be globally unique across `grp` and `txt` classes**
  (lookups key on `nm` alone; duplicates throw and would collide React keys).
- **The stage** is `<div id="skynovel">` — same term as upstream. Its size is **fixed to
  `prj.json`'s `window.width`/`height`** (`Config.generate()` → `CmnLib.stageW`/`stageH`), it
  is `overflow: hidden` so nothing outside it draws, and it is black where no image is
  placed. `Stage.tsx` renders the inner box at that exact size and scales it with
  `transform: scale(cvsScale)` to fit the browser window; because `transform` does not change
  layout size, a `useLayoutEffect` also writes the **scaled** size onto `#skynovel` itself —
  without that the element collapses to height 0 and every layer spills outside it.
  `test/e2e/stage.e2e.ts` pins this down.
- **`src/components/`** — React 19 with **`@emotion/react` JSX** (`jsxImportSource` in
  tsconfig; `css` prop available). `Main.tsx` wires keyboard/click events and the `ev_next`
  progression loop. `Stage.tsx` renders `aLay`; `TxtLayer`/`GrpLayer`/`BtnLayer` render the
  three layer roles. `Stage` is `lazy()`-loaded at module top level (not inside a component)
  to avoid remount flicker. **Nothing may statically import `Stage.tsx`** — one value import
  from `GrpLayer`/`TxtLayer`/`store` pulls `Stage` back into the main chunk and the `lazy()`
  stops splitting anything (rolldown says `INEFFECTIVE_DYNAMIC_IMPORT`). The shared,
  component-free pieces therefore live in **`src/components/Lay.ts`** (`T_LAY`, `T_LAY_STY`,
  `A_LAY_STY_KEY`, `T_LAY_IDX`, `T_LAY_CMN`, `styLay`, the drag flag); `import type` from
  `Stage` would be fine since types erase, but there is no longer a reason to.
- **`src/ts/Memento.ts`** — `Caretaker` records a state snapshot at every stop point, keyed
  `${fn}:${idx}`. This powers read-back: PageUp/PageDown (`prevKey`/`nextKey`) walk history;
  `isReadBack` in the store drives the read-back visual (yellow text). Button jumps
  deliberately do **not** touch this history (they aren't "reading forward").
- **`src/sn/`** — support layer largely carried from 本家 SKYNovel: `SysBase`, `Config`/
  `ConfigBase`, `Grammar`, `CmnLib`, `AnalyzeTagArg`, `Areas`, `CallStack`.

**Ported-from-本家 files carry their 本家 tests verbatim** (`test/Grammar.test.ts`,
`test/ExprEval.test.ts`, the lower half of `test/VarStore.test.ts`). When touching those
modules, diff against `../skynovel_esm/src/sn/…` first: the tests are the contract, and
intentional divergences are listed in each test file's header comment. String-literal
quoting is the one thing normalized away from upstream — see below.

**No escaped quotes in string literals.** A string that would need `\'` or `\"` is written
as a template literal instead: `` `[if exp="mp:v=='X'"]` ``, not `'[if exp="mp:v==\'X\'"]'`.
`.sn` snippets in tests are full of both quote kinds, and the backslashes made them
unreadable. Plain `'…'` stays the default when no escaping is involved.

### The `.sn` scripting language (current prototype tag set)

`add_lay`, `current`, `add_face`, `lay` (pic/fn, `face=` diff-image compositing, `b_alpha=`
text-bg opacity, `b_color=`, `style=`, `visible`/`alpha`/`left`/`top`/`rotation`/`scale_x`/
`scale_y`/`pivot_x`/`pivot_y`/`blendmode`, `index`/`float`/`dive` for stacking order,
`filter=`, `page=fore|back`), `clear_lay`, `trans`/`wt` (page swap + its wait),
`add_filter`/`clear_filter`/`enable_filter`,
`tsy`/`wait_tsy`/`stop_tsy`/`pause_tsy`/`resume_tsy` (GSAP tweens of those same layer
attributes),
`page` (`clear=true` only — upstream's `[page]` is the read-back **page log**, not fore/back),

`let` (`cast=`; `text=` is the 本家 form — the value as-is, `text=&式` to evaluate —
while `val=` is a bluesnovel-only always-expression form kept for existing tests, and `text`
wins if both are given), `let_ml`/`endlet_ml` (raw multi-line text into a variable — no
expression eval, `[`/`]`/`;` in the body are literal),
`let_abs`/`let_round`/`let_length`/`let_char_at`/`let_index_of`/`let_substr`/
`let_replace`/`let_search`, `if`/`elsif`/`else`/`endif`, `r`,
`er`, `trace` (`text=&expr` for expression eval), `jump`, `call`/`return`,
`macro`/`endmacro` (`return label=` changes where a subroutine resumes),
`char2macro`/`bracket2macro`, `button` (`call=true` for
subroutine-call on click; `left`/`top`/`width`/`height`/`rotation`/`pivot_*`/`scale_*`/
`alpha`/`enabled`/`blendmode` — but it only goes absolute when `left`/`top` are written,
unlike upstream which always does), `event`/`clear_event`, `enable_event`, `wait`,
`clearvar`/`clearsysvar`, `pop_stack`, `title`, `toggle_full_screen`, `dump_lay`,
`add_frame`/`frame`/`set_frame`/`let_frame` (HTML frames), `set_focus`,
and the stop points `l`/`p`/`s`/`waitclick`. `jump`/`call`/`return`/`button`
all take `fn=` to cross files, and a macro can be called from a file other than the one that
defined it. Macro names are rejected
by `ScriptEngine.RESERVED_TAGS` (tag names) and `REG_NG4MAC_NM` (本家's forbidden chars).
Nested `[macro]` definitions **do** work here (depth-counted) but not upstream — don't use
them in scripts meant to run on 本家.

**"Page" means two unrelated things** — a trap inherited from 本家's vocabulary, so always say
which one you mean:

- **layer page (fore/back)** — the two drawing surfaces every layer has. `[lay page=…]`,
  `[clear_lay page=…]`, `[button page=…]`, `[trans]`, `[er]`. In code: `aPage`/`foreIdx`,
  `T_PAGE`.
- **text page (the `[p]`-delimited run of text)** — a unit of the read-back log. `[p]`,
  `[page clear=true]`. In code: the `Caretaker` history.

They never interact. `[page]` operates on the *second* kind despite its name.

**Pages (fore/back) and `[trans]`.** Every layer exists on both pages; a scenario builds the
next scene on the back page (`[lay … page=back]`) and then swaps with `[trans time=…]`. Three
rules make this work in React:

- The store **never moves layer data between the two arrays** — `[trans]` only flips
  `foreIdx`. Swapping the contents would replace both containers' children wholesale, so
  `TxtLayer` would replay its typing animation exactly as the transition lands.
- The cross-fade takes the fore page's opacity **1 → 0** over a back page rendered beneath.
  Fading the back page *in* on top costs the same but pops at the end wherever the back page
  is transparent; fading the fore *out* means what you see mid-transition is already the
  final state.
- **A layer's display attributes are stored only when the scenario writes them** (`T_LAY_STY`
  is all-optional, mirroring upstream's `'left' in hArg` checks). Giving them defaults means
  every layer emits a full inline style on every render, which silently overrides each
  layer component's own CSS — it once flung the text layer from `top: 48%` to the top of the
  stage. `[clear_lay]` deletes those keys rather than resetting them to numbers, and leaves
  `visible` alone.
- Writes are per-page: `[lay]` defaults to `fore`, `[button]` takes `page=` too, and `[er]`
  clears **both** pages (`chgStr` carries `'fore' | 'back' | 'both'`) — otherwise the previous
  scene's text comes back the moment `[trans]` brings that page forward. `[button]`'s default
  is `fore` here where upstream uses `back`; see the `//TODO:` in `ScriptEngine.ts`.
- **`ScriptMng` declares the transition finished**, not GSAP's `onComplete` — `Stage` only
  paints. `finishTrans()` (a synchronous zustand `set`) flips `foreIdx`, and only then does
  the scenario resume, so the next text always lands on the new fore page. `[wt]` waits on
  the same deadline, and a click during it is re-read as "finish now" (`#goSafe()` intercepts
  it), which always lands on the end state — never a half-faded screen.

**Tweens (`[tsy]`) go the other way from `[trans]`: through the store, not the DOM.** GSAP
animates a plain object and `onUpdate` writes each frame back via `chgLay`, so the store
always holds the layer's *current* value. Painting only to the DOM would be cheaper, but then
`Caretaker`'s snapshots and `[trans]`'s layer cloning would read pre-animation values. Two
consequences: 本家's `arrive` attribute (force the target values at the end) is effectively
always on here, and **the GSAP target must never be handed to the store as-is** — GSAP hangs
a `_gsap` cache on it that points back at the target, which makes the layer circular and
breaks both `structuredClone` (`addLayer`/`[trans]`) and `JSON` (Memento). `ScriptMng`
copies out only the properties being animated. The pure half — attribute value → target
(`'=500'` relative, `'250,500'` random), tween.js ease names → GSAP ones, tween naming —
lives in **`src/ts/Tsy.ts`**, which touches neither GSAP nor the DOM so the engine can call
it and reject a bad `ease=` at scenario-run time. Note 本家's `[tsy]` only reads `x`/`y`
(`CmnTween.aLayerPrpNm`) even though `tmp_esm_uc`'s `ext_fg.sn` writes `left=`/`top=` — those
are silently ignored upstream; here `x`/`y` are aliases of `left`/`top` so both work.

**HTML frames (`[add_frame]`) are the one visible thing that is deliberately *not* in the
store.** A frame is a live HTML document with its own JS state, so a JSON snapshot could not
restore it; upstream keeps them out of the layer/page system too. `src/ts/FrameMng.ts` owns
them DOM-side, `srcdoc` (not `src`) makes them same-origin so `[set_frame]`/`[let_frame]` can
poke the iframe's `var`s directly, and `Stage.tsx` provides the container — a div that is
**empty in JSX**, so React never reconciles the iframes away. Putting that container *inside*
the scaled stage box is the one place bluesnovel is simpler than 本家: coordinates are written
in stage units and window-resize tracking is free, where upstream multiplies by `cvsScale`
everywhere and rewrites every frame on resize. `[add_frame]` and `[let_frame]` are **stop
points** — they touch the DOM and must write the result back into engine variables before the
scenario reads them, and actions are only applied after `step()` returns. Two things about
frames are easy to forget: **keys pressed inside a frame never reach the parent document**, so
`FrameMng` re-dispatches them onto `document` (upstream's `EventMng.resvFlameEvent`), and
blurring an element inside a frame leaves the *iframe itself* focused in the parent, so
`[set_focus to=null]` blurs on both sides.

**`src/ts/FocusMng.ts`** is the `[set_focus]` ring — one module-level instance, because it is
screen-wide state touched from both the React tree (`BtnLayer`) and the DOM side
(`ScriptMng`), the same shape as `Lay.ts`'s drag flag. Elements enter it from three places, as
upstream: a `[button]` while it is mounted, the **first** match of an `[event key='dom=…']`,
and `[set_focus add='dom=…']`.

`char2macro`/`bracket2macro` rewrite the **token array in place** (`Grammar#replaceScr_C2M`),
from the defining tag onwards — text before it stays literal, and one text token can split
into several. Two consequences: `Script` re-derives its label table after every definition
(`Script.defC2M()`), and `step()` must re-read `this.#script.len` each iteration instead of
caching it. The definition lives on the shared `Grammar`, so files parsed *later* come out of
`resolveScript()` already substituted; files already parsed are not revisited (same as 本家).

`[event key=… label=… call=… global=… del=…]` reserves a key/click. The engine keeps only the
**table** (`getEvent`/`beginEvent`/`clearEvent`) — it never touches the DOM — and `Main.tsx`
decides the key names (`keyName()`): `KeyboardEvent.key` lowercased, prefixed with
`alt+`/`ctrl+`/`meta+`/`shift+` in that order when held (本家 `SysBase.modKey()`) — so `enter`,
`escape`, `alt+enter`, `meta+0` — plus `click`. `[toggle_full_screen key=…]` reserves a key
too, but in its own table on `ScriptMng` (it toggles fullscreen rather than jumping to a
label), and `Main.tsx` asks that one first.
Local reservations are one-shot (cleared when a jump-type one fires) and are stashed on the
call stack by `[call]`, restored by `[return]`; a **macro** call deliberately does not stash
them (本家 `ScriptIterator.ts:957`). `global=true` reservations are exempt from all of that.

**既読 (already-read) tracking** runs on every token `step()` fetches: `#recordKidoku()` stores the
index in a per-file `Areas` (本家's own class, ported) and sets the builtin `const.sn.isKidoku`.
Two rules carry over verbatim: while the call stack is non-empty the flag is *not* updated (a
subroutine is reached from both read and unread contexts, so only the recording happens), and
`[call]` erases the return position from the read set unless `count=true` — `[jump]`'s default is
the opposite (`count=false` to erase). `[clearsysvar]` wipes it, as in the upstream kidoku sample.
There is no save layer yet, so the engine owns the table; `getKidoku()`/`setKidoku()` exist for
when persistence lands.

**Auto-read / skip-read** (`&sn.auto.enabled` / `&sn.skip.enabled` / `&sn.skip.all`, plain tmp
vars). The engine only *decides*: at each `[l]`/`[p]` `#calcResume()` returns a `T_RESUME`
(`{mode:'auto', msec}` using `sys:sn.auto.msec*Wait[_Kidoku]`, or `{mode:'skip', msec:0}`) attached
to the `stop` action, cancelling skip when it reaches an unread stop (`skip.all=false`); `[s]` always
`cancelAutoSkip()`s. `ScriptMng` owns the *timing* — `#scheduleResume()` sets a timer that calls
`go()` itself, and `cancelAuto()` (called from `Main.tsx` on any manual key/click) clears it. Skip
sets a `skipping` store flag so `TxtLayer` renders text instantly. `isNextKidoku` follows 本家
into the caller's file when inside a subroutine (the caller's `Script` is stashed on the call-stack
entry for its token count). `sys:sn.skip.mode` is honoured: default `'s'` skips through `[p]`,
`'p'` stops at each page break (but `Main.tsx`'s cancel-on-input currently also cancels skip there).

**Sample scenarios to check tag behaviour against** live in
[SKYNovel_gallery](https://github.com/famibee/SKYNovel_gallery) — one project per feature under
`public/prj/`, e.g. `public/prj/kidoku/mat/main.sn` for 既読. Useful as the de-facto spec for
what a tag's attributes look like in real scripts.

**The tag reference** is <https://famibee.github.io/skynovel_esm/tag.html> (local copy:
`../skynovel_esm/docs/tag.html`). The authoritative list of every 本家 tag name, grouped by
category with a one-line description each, is the `T_HTag` type in
`../skynovel_esm/src/sn/Grammar.ts`; the implementations are registered as `hTag.<name> = …`
across `../skynovel_esm/src/sn/*.ts`.

**A full sample game** in 本家 form is `../tmp_esm_uc/doc/prj/` — `script/main.sn` calls
`theme/setting.sn` / `theme/ext_*.sn` / `script/sub.sn` / `frames/_yesno.sn`, then jumps to
`theme/title.sn`. `todo.md`'s first section works through the tags that path needs. Note that
much of what looks like a tag there is a **project-side macro** (`img`, `grp`, `fg*`,
`txt_lay_*`, `sys_menu`, `ask_ync`, …) defined in those same files, and `[notice]` comes from a
project plugin (`../tmp_esm_uc/src/plugin/humane`), not from the engine.

Non-tag syntax now understood too (all 本家-compatible, courtesy of `Grammar`): multi-line
tags, `;` comments (including inside a tag), string literals containing `[`/`]`/`;`,
`&名前 = 式 [= cast]` assignment (`&&式 = 式` evaluates the *name* as an expression too), and
`&式&` inline display. Both `&` forms only fire when the token **starts** with `&` — i.e.
at line start or right after a tag/tab/newline, exactly as upstream. Attribute values that
contain quotes must quote the whole value (`[if exp="mp:v=='X'"]`), since `AnalyzeTagArg`
ends an unquoted value at the first quote character.

**Tag attributes go through one common pre-processing step** before any tag sees them —
`ScriptEngine.#resolveTag()`, a port of the first half of 本家 `ScriptIterator.ts:418
タグ解析()`. It handles four things, so individual tag cases never should:

- `cond=…` — if false the tag is **not executed at all** (`#resolveTag` returns `undefined`
  and `step()` moves on). Applies to every tag, control-flow ones included. Like `exp`, it
  must not carry a leading `&`. `'null'`/`'undefined'`/`'false'` count as false.
- `%属性名` — the value of that attribute as passed to the current macro, with `|省略値` as
  the fallback. No argument and no default (or a default of literally `null`) means the
  attribute is **not passed at all**, which is how upstream lets a tag fall back to its own
  default. Throws outside a macro.
- `[tag *]` — inherit every attribute the macro was called with; explicit attributes win.
  Throws outside a macro.
- `&式` — evaluate the value as an expression. If it evaluates to `undefined` the attribute
  is dropped and `|省略値` is tried instead.

`%` and `*` read `#aCallStk[].hArgs`, the **raw attribute strings** stashed at call time
(本家's `csArg`). The same values are also in the `mp:` namespace, but `VarStore` auto-casts
on read (`'1.20'` → `1.2`), so the raw copy is what gets passed through. `[call]` stashes its
attributes too, so a plain subroutine can read them with `%` as well — same as upstream.

The two places that scan tokens *without executing them* — `#if()` looking for
`elsif`/`else`/`endif`, and `[macro]` looking for `[endmacro]` — keep using the raw
`ScriptEngine.parseTag()`; upstream reads `#alzTagArg.hPrm` directly there too.

## Conventions & gotchas

- **Communicate with the user in Japanese** (chat responses, explanations, questions).
- **Comments and commit messages are in Japanese.** Match the surrounding comment density —
  this codebase comments heavily, especially explaining divergence from 本家.
- **TODOs in .ts/.tsx must use the exact `//TODO: ` form** (no space before `//`, one after
  the colon). The author lists them with the VSCode extension *Todo+*
  (`fabiospampinato.vscode-todo-plus`), which only picks up that prefix — a TODO written as
  prose inside a comment block is invisible to it.
- **Backlog**: `todo.md` at the repo root is the running task list, in *Todo+* checkbox format
  and roughly priority-ordered. Read it at the start of a session.
  (It replaced the older per-session `引き継ぎ_YYYY-MM-DD_NN.md` handoff notes, now deleted.)
  **A finished item does not stay in `todo.md` — it moves to `CHANGELOG.md`.** Write the
  `- [x] …` block at the lone `- [ ]` marker near the end of `CHANGELOG.md`, followed by one
  blank line, and **leave that `- [ ]` marker in place** so the next entry can be appended
  the same way. Delete the item from `todo.md` in the same pass.
- **MCP pre-flight**: **serena** MCP tools have hung in this project, and have been seen to
  execute an action anyway despite reporting a timeout. Do a cheap serena
  call first (e.g. `get_current_config`) and ask the user to restart the MCP server if it
  hangs; after any MCP timeout, verify state before retrying rather than repeating the call.
  serena also needs its project activated (`activate_project` with `bluesnovel`) before the
  symbol tools work.
- **Strict TypeScript**: `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`,
  `noUnusedLocals`/`Parameters` (prefix unused params with `_` to allow), `noImplicitOverride`.
  `strictPropertyInitialization` is off. Run `bunx tsc --noEmit` before committing since the
  test command does not typecheck.
- **Releases** use `semantic-release` with the **conventionalcommits** preset — commit
  message format determines version bumps and CHANGELOG entries.
