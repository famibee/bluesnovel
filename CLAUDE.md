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
bunx tsc --noEmit  # typecheck only — NOT run by `bun test`; run it manually before committing
bun run docs       # vite docs/ playground, opens /tag.html
```

There is **no `lint` script** despite ESLint devDependencies being present, and **no
`bunfig.toml`** — tests run with Bun defaults. Unit tests are deliberately DOM/fetch-free
so they need no happy-dom preload; `@happy-dom/global-registrator` exists for any future
component tests.

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

### The `.sn` scripting language (current prototype tag set)

`add_lay`, `current`, `add_face`, `lay` (pic/fn, `face=` diff-image compositing, `b_alpha=`
text-bg opacity), `let`, `if`/`elsif`/`else`/`endif`, `r`, `er`, `trace` (`text=&expr` for
expression eval), `jump`, `call`/`return`, `macro`/`endmacro`, `button` (`call=true` for
subroutine-call on click), and the stop points `l`/`p`/`s`. **Only same-file labels are
supported** for jump/call/button/macro — cross-file (`jump fn=...`) is a known TODO that
needs execution state moved out of `ScriptEngine` into `ScriptMng`. Reserved tag names that
cannot be used as macro names live in `ScriptEngine.RESERVED_TAGS`.

## Conventions & gotchas

- **Communicate with the user in Japanese** (chat responses, explanations, questions).
- **Comments and commit messages are in Japanese.** Match the surrounding comment density —
  this codebase comments heavily, especially explaining divergence from 本家.
- **Handoff docs**: `引き継ぎ_YYYY-MM-DD_NN.md` at the repo root are per-session handover
  notes (TODOs, known limitations, tooling caveats). Read the latest one at the start of a
  session — it is the running project log. Note its warnings about **serena / playwright MCP
  tools hanging or executing actions despite timing out**; after an MCP timeout, verify state
  before retrying rather than repeating the call.
- **Strict TypeScript**: `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`,
  `noUnusedLocals`/`Parameters` (prefix unused params with `_` to allow), `noImplicitOverride`.
  `strictPropertyInitialization` is off. Run `bunx tsc --noEmit` before committing since the
  test command does not typecheck.
- **Releases** use `semantic-release` with the **conventionalcommits** preset — commit
  message format determines version bumps and CHANGELOG entries.
