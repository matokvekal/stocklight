# Audit Report — Repository Readiness for the Claude Code Homework

- **Date:** 2026-10-18
- **Auditor:** Claude Code (Opus 5.5)
- **Starting commit:** `4e63bdc first commit`; baseline commit: `chore: prepare S&P 500 Swipe homework baseline`
- **Requirements source:** [RavTech — Levels 1–3 Homework](https://jenkins-ravtech1.github.io/AI-Courses/course/syllabus/RavTech-All-Sessions-Combined.html#29). The page was accessible; all 12 exercises and their Done when criteria were extracted.
- **Exercise details:** [HOMEWORK.md](HOMEWORK.md)

---

## A. Executive summary

**Readiness: YES (after the baseline commit).**

- The base app and its check command (`npm run check`: typecheck + lint + tests + worker checks) exist and are **green** after the fixes. The production build is green, the dev server starts and `/api/health` responds.
- The course requires *"Build the base app and its check command, and commit — before exercise 2."* The baseline commit satisfies this.
- No exercise work exists yet: no `.claude/`, no `CLAUDE.md`, no `.mcp.json`. **No exercise is marked DONE.**
- No `CLAUDE.md` exists in parent folders or in `~/.claude/`, so no instructions leak into the sessions (the course warns about this explicitly).

## B. Technical validation

Environment: Windows 11, Node 24.19.0, npm 11.17.0, Python 3.11.9, Docker 28.5.1 (daemon stopped), Claude Code 2.1.302.

| # | Check | Command | Result | Notes |
|---|---|---|---|---|
| 1 | Dependency installation | `node_modules`, `.venv` | **PASS** | Installed; `package-lock.json` committed in the baseline |
| 2 | TypeScript typecheck | `npm run typecheck` | **FAIL → fixed → PASS** | `apps/api`: TS5097 on `.ts`-extension imports |
| 3 | ESLint | `npm run lint` | **PASS** | `MODULE_TYPELESS_PACKAGE_JSON` warning fixed |
| 4 | Production build | `npm run build` | **FAIL → fixed → PASS** | (a) `finance-core` has no `build` script; (b) TS 6 requires `rootDir` (TS5011) |
| 5 | Vitest (finance-core) | `npm test` | **PASS** | 2/2 |
| 6 | React Testing Library | `npm test` (web) | **PASS** | 1/1 |
| 7 | Supertest | `npm test` (api) | **PASS** | 1/1 |
| 8 | Pytest | `npm run check:worker` | **PASS** | 1/1 |
| 9 | ruff + mypy (strict) | `npm run check:worker` | **PASS** | |
| 10 | Full check command | `npm run check` | **PASS** | exit 0, re-run before the baseline commit |
| 11 | Prisma | `prisma validate` + `prisma generate` | **PASS** | |
| 12 | Docker Compose config | `docker compose --env-file .env.example config` | **PASS** | Fails without `.env` by design (`:?copy .env.example to .env`) |
| 13 | Dev server + API smoke | `vite` + `node dist/server.js` | **PASS** | Page title served; `{"status":"ok"}` |
| 14 | PostgreSQL connectivity | — | **BLOCKED** | Docker daemon not running; not needed by any exercise |
| 15 | Playwright | — | **SKIPPED** | Config and smoke spec present and kept; no npm script; not run |
| 16 | Cypress | — | **SKIPPED** | Same as Playwright |

**Totals:** 13 PASS (2 after fixes) · 0 FAIL remaining · 1 BLOCKED · 2 SKIPPED.

## C. Changes made

| File | Change | Reason |
|---|---|---|
| `apps/api/tsconfig.json` | `allowImportingTsExtensions: true` | Typecheck failed (TS5097); code imports `./app.ts` |
| `apps/api/tsconfig.build.json` | `rootDir: "src"` | Build failed under TS 6 (TS5011); output is now `dist/server.js`, as `start` expects |
| `package.json` | `build` → `npm run build --workspaces --if-present` | `finance-core` has no `build` (consumed as source) |
| `package.json` | `"type": "module"`; product description | `eslint.config.js` is ESM (removes Node warning); visible name |
| `.gitignore` | `*.egg-info/` | `apps/worker/nasdaq_worker.egg-info/` (from `pip install -e`) was untracked |
| `apps/web/index.html`, `apps/web/src/App.tsx`, `apps/web/src/App.test.tsx`, `e2e/cypress/smoke.cy.ts`, `e2e/playwright/smoke.spec.ts`, `apps/worker/pyproject.toml`, `apps/worker/nasdaq_worker/__init__.py` | Visible name "Nasdaq Swipe" → "S&P 500 Swipe" | Product name. Internal identifiers (`@nasdaq-swipe/*`, `nasdaq_worker`, DB name, health `service` id) unchanged to avoid unnecessary refactoring |
| `README.md` | **New** | Product overview, implemented vs. planned, setup, scripts, roadmap |
| `docs/ARCHITECTURE.md` | **New** | Architecture and planned cross-cutting concerns (documentation only) |
| `docs/course/HOMEWORK.md` | **New** | The 12 exercises, Done when, evidence, checklist |
| `docs/course/CLAUDE_AUDIT_REPORT.md` | **New** | This report |

**Changes not made by the auditor** (already present, or added concurrently during the audit, most likely by Copilot), all kept by the owner's decision:
- Pre-existing: `devDependencies` in `package.json`, `apps/web/package.json` and `apps/api/package.json`; `package-lock.json`.
- Added during the audit: `playwright.config.ts`, `cypress.config.ts`, `e2e/`, dependencies `@playwright/test`, `cypress` and `start-server-and-test`, and a `test` argument in `scripts/worker-check.mjs`.

**Git hygiene:** no sensitive files are tracked. `.env`, `.venv/`, `dist/`, caches and `.claude/settings.local.json` are ignored. Course files (`.mcp.json`, `.claude/settings.json`, `.claude/rules/`, `CLAUDE.md`) are **not** ignored, which is correct. `.env.example` contains only placeholders (`change-me-locally`). Ignored local artifacts (`apps/*/dist`, `.pytest_cache`, `egg-info`) were left on disk.

## D. Homework readiness

Statuses: READY = prerequisites exist, exercise not started. No exercise has been done.

| # | Exercise | Status | Missing | Done when (faithful summary) |
|---|---|---|---|---|
| 1 | settings.json at three levels | **READY** | `.claude/settings.json`, `.claude/settings.local.json` (user level has `model: opus`) | One sensible setting per file; project file committed; local never in `git status`; show which value of the doubled key won and why |
| 2 | Six-layer prompt | **READY** | — | Feature works; check green; committed; prompt saved with the six layers marked |
| 3 | Seven techniques | **READY** | — | Feature works; check green; committed; seven techniques labelled; effort level noted, no "think hard" |
| 4 | Claude 5–style prompt | **READY** | — | Feature works; check green; committed; no step list, "think step by step", "double-check" or CRITICAL/MUST; other bugs reported, not fixed |
| 5 | `/context` | **READY** | — | Table of category · tokens · source; biggest category and what to cut; what grew after a message |
| 6 | Two rules + skill | **READY** | Project rules drafted (in HOMEWORK.md) | Two rules in `.claude/rules/` (always-on without frontmatter, scoped with `paths:`); "Loaded …" only after a matching read; skill in `/skills` and used |
| 7 | MEMORY.md | **READY** | — | Entry in `~/.claude/projects/<project>/memory/MEMORY.md`; fresh session acts on it; know the load limit (200 lines / 25 KB) |
| 8 | CLAUDE.md | **READY** | Best after 2–4 (source material) | Five sections in order; every Forbidden line has a reason; concise; transcript shows a rule followed |
| 9 | Nested CLAUDE.md | **READY** | — | Committed; absent from `/context` at start; "Loaded …" and listed after reading a file there |
| 10 | context7 | **READY** | — | `.mcp.json` with context7 committed, no secrets; `/mcp` connected; feature works, check green, committed; transcript shows a context7 call |
| 11 | Subagent | **READY** | — | Subagent ran and only its summary returned; `/context` before/after; one line on when a subagent is a waste |
| 12 | Code graph | **READY** | Installing `codebase-memory-mcp` is part of the exercise (not on PATH yet) | `.mcp.json` entry by command name, no home path; `/mcp` connected with user-level entry removed; indexed; "who calls X?" answered by a graph tool |

**Totals:** READY 12 · PARTIAL 0 · DONE 0 · BLOCKED 0. Exercises 2, 3, 4 and 10 were BLOCKED until the baseline commit.

## E. Risks and gaps

1. **Concurrent edits.** Another tool (likely Copilot) modified the repository during the audit. Stop it while doing the exercises, or it will pollute transcripts, `git log` and `/context` measurements.
2. **Unverified E2E.** Playwright and Cypress are configured but have no npm script and were not run. Cypress downloads a large binary. Not required by any exercise.
3. **Internal naming.** Package, module and database identifiers still use `nasdaq-swipe` / `nasdaq_worker`. Only the visible name was changed. A full rename is a separate refactor.
4. **Complexity beyond the course.** Python, Docker, Prisma, Playwright and Cypress are not needed by any exercise; they add tokens to `/context` and make `npm run check` slower (~30 s). Not blocking.
5. **User-level settings affect exercise 5.** User-scope plugins, claude.ai MCP connectors and an `autoMode` block from another project appear in `/context`. Not changed (out of scope).
6. **Docker stopped.** Not blocking; relevant only to future product work.
7. **No git remote yet.** A push is needed for submission (not done).

## F. Recommended execution plan

1. Stop concurrent Copilot edits.
2. **Exercise 1** → commit.
3. **Exercises 2, 3, 4:** a different small feature each (A, B, C/D in HOMEWORK.md), each in a fresh session, `npm run check` green, prompt saved under `docs/course/prompts/` in the same commit.
4. **Exercise 5:** `/context` in a fresh session → `docs/course/evidence/ex05-context.md`.
5. **Exercise 6:** rules (always-on + scoped to `packages/finance-core/**`) and a skill.
6. **Exercise 7:** a fact learned in exercises 2–4 into auto-memory.
7. **Exercise 8:** root `CLAUDE.md` from the rules and the mistakes of 2–4.
8. **Exercise 9:** `packages/finance-core/CLAUDE.md`.
9. **Exercise 10:** context7 in `.mcp.json` + feature E.
10. **Exercise 11:** a subagent reviews `apps/` against the rules.
11. **Exercise 12:** codebase-memory-mcp in `.mcp.json` (command name only) + "who calls `percentChange`?".

Commit after every exercise. Evidence in `docs/course/evidence/exNN-*.md`, prompts in `docs/course/prompts/`.

## G. Next action — exercise 1 (not executed)

In a fresh session in the project folder:

1. Create `.claude/settings.json` (project, committed) with a team-wide setting, e.g. `"effortLevel": "high"`.
2. Create `.claude/settings.local.json` (local) with a **different** value for the same key, e.g. `"effortLevel": "medium"` (already git-ignored).
3. The user file `~/.claude/settings.json` already has `"model": "opus"` as a personal default; keep it as the user-level setting.
4. Run `claude`, check which effort level is active (local wins: local > project > user), and record it in `docs/course/evidence/ex01.md`.
5. `git status` (the local file must not appear), then commit.

## H. Reference comparison — student repositories (for reference only, not requirements)

| Repository | Accessible | Scope | Useful patterns | Possible issues |
|---|---|---|---|---|
| `hananya-beck/stockbroker` | Yes | One "Exercise N" commit for every exercise | `homework/exercise-N.md` and `prompts/`; `.mcp.json` uses the bare command name (`codebase-memory-mcp`); detailed `/context` table; single check command | — (most complete) |
| `maayan1/file-browser` | Yes | Exercises 2, 3, 4, 6, 9 and a CLAUDE.md | `docs/prompts/`; correct rules (scoped one has `paths:`) | `settings.json` at the **repo root**, not in `.claude/`, so Claude Code never reads it; no `.mcp.json`; 1, 5, 7, 10–12 missing |
| `ruddy-reisberg/file-browser` | Yes | Exercises 1–6 | One commit per exercise; tidy check command | Local/user evidence not in the repo (expected); 7–12 missing |
| `mordehayLevi4050/project-for-course` | Yes | Flutter app only | — | No visible course work (no `.claude/`, no exercise commits) |

**Takeaways:** one commit per exercise with "Exercise N" in the message; fixed folders for evidence and prompts; `.claude/settings.json` (not the repo root); `.mcp.json` by command name with no secrets.
