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

- E2E specs are named `*.e2e.ts`, **not** `*.spec.ts` — `bun test` auto-collects `*.spec.*`, and
  it also scans `test/`, so the conventional name would break the unit-test run. `testMatch`
  enforces this.
- The config is not at the root, so Playwright needs `-c test/e2e` (both `test:e2e` scripts pass
  it). `webServer` starts/stops vite itself on a **dedicated port 5199** with
  `reuseExistingServer: false`, and pins `cwd` to the repo root so vite's root is the repo, not
  the config's folder. Vite's default 5173/5174 are routinely squatted by other projects' dev
  servers (e.g. `tmp_blues`), and reusing one silently tests the *wrong app*.
- `test/e2e/app/` is a self-contained fixture: `index.html` + `main.ts` boot `SysWeb` against
  `test/e2e/app/prj_<name>/` (`prj.json` / `path.json` / `main.sn`). `?prj=basic|button` picks the
  scenario, since `SysBase.loaded()` always loads the script named `main`. No image assets are
  used, so the fixtures need no binaries. **`src/` contains no test-only hooks**:
  `test/e2e/app/main.ts` publishes `window.__sn = {store: useStore}` and assertions read the
  zustand store from there.
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

- **`src/ts/ScriptEngine.ts`** — the prototype parser+executor. No DOM, no fetch. Tokenizes
  a `.sn` script, runs until the next `[l]`/`[p]`/`[s]` stop point (or EOF), and returns a
  `T_ENGINE_ACTION[]` describing what changed (add layer, change picture, append text, add
  button, trace, stop…). It owns **all execution state**: token index `#idx`, label table,
  the if-stack `#aIfStk`, the call-stack `#aCallStk`, the macro table `#hMacro`, and
  variables (via `VarStore`/`ExprEval`). This is the file most unit tests target directly.
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
  prefix holds a JSON string descends into it (`const.db.紀子.fn`).
- **`src/ts/ExprEval.ts`** — 本家 `PropParser` **ported whole** (parsimmon operator table).
  Ternary, bit ops, `¥` integer division, hex literals, `int`/`parseInt`/`Number`/`ceil`/
  `floor`/`round`/`isNaN`, `#…#` string literals, `$var` / `#{expr}` embedding, and
  `hA[春夏][ひきす]` index-to-name resolution. Takes a `T_VAR_GET` (`{get(name)}`), not a
  concrete `VarStore`, so tests can pass a flat table like 本家's `ValTest`.
- **`src/ts/ScriptMng.ts`** — the bridge. `#runStep()` calls `engine.step()`, then
  `#applyAction()` translates each `T_ENGINE_ACTION` into a store mutation (the `T_INIT_FNCS`
  set passed in from `Main.tsx`). Also owns script fetching (`#fetchScript`) and the
  `myTrace` debug overlay. Contains a `SAMPLE_SN` fallback that renders a demo when assets
  are missing — this is prototype scaffolding to be removed once the asset pipeline exists.
- **`src/store/store.tsx`** — **zustand** store; single source of truth. `aLay: T_LAY[]` is
  the layer list. Store setters (`addLayer`, `chgPic`, `chgBAlpha`, `chgStr`, `addBtn`,
  `setWait`, …) are the only way the engine's actions reach the UI. **Layer `nm` must be
  globally unique across `grp` and `txt` classes** (lookups key on `nm` alone; duplicates
  throw and would collide React keys).
- **`src/components/`** — React 19 with **`@emotion/react` JSX** (`jsxImportSource` in
  tsconfig; `css` prop available). `Main.tsx` wires keyboard/click events and the `ev_next`
  progression loop. `Stage.tsx` renders `aLay`; `TxtLayer`/`GrpLayer`/`BtnLayer` render the
  three layer roles. `Stage` is `lazy()`-loaded at module top level (not inside a component)
  to avoid remount flicker.
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
text-bg opacity), `let`, `if`/`elsif`/`else`/`endif`, `r`, `er`, `trace` (`text=&expr` for
expression eval), `jump`, `call`/`return`, `macro`/`endmacro`, `button` (`call=true` for
subroutine-call on click), and the stop points `l`/`p`/`s`. **Only same-file labels are
supported** for jump/call/button/macro — cross-file (`jump fn=...`) is a known TODO that
needs execution state moved out of `ScriptEngine` into `ScriptMng`. Reserved tag names that
cannot be used as macro names live in `ScriptEngine.RESERVED_TAGS`.

Non-tag syntax now understood too (all 本家-compatible, courtesy of `Grammar`): multi-line
tags, `;` comments (including inside a tag), string literals containing `[`/`]`/`;`,
`&名前 = 式` assignment (`&&式 = 式` evaluates the *name* as an expression too), and
`&式&` inline display. Both `&` forms only fire when the token **starts** with `&` — i.e.
at line start or right after a tag/tab/newline, exactly as upstream. Attribute values that
contain quotes must quote the whole value (`[if exp="mp:v=='X'"]`), since `AnalyzeTagArg`
ends an unquoted value at the first quote character.

## Conventions & gotchas

- **Communicate with the user in Japanese** (chat responses, explanations, questions).
- **Comments and commit messages are in Japanese.** Match the surrounding comment density —
  this codebase comments heavily, especially explaining divergence from 本家.
- **TODOs in .ts/.tsx must use the exact `//TODO: ` form** (no space before `//`, one after
  the colon). The author lists them with the VSCode extension *Todo+*
  (`fabiospampinato.vscode-todo-plus`), which only picks up that prefix — a TODO written as
  prose inside a comment block is invisible to it.
- **Backlog**: `todo.md` at the repo root is the running task list, in *Todo+* checkbox format
  and roughly priority-ordered. Read it at the start of a session and tick items off there.
  (It replaced the older per-session `引き継ぎ_YYYY-MM-DD_NN.md` handoff notes, now deleted.)
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
