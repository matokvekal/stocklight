# Homework Completion Report — Levels 1–3

Baseline: `13a2bc1`. Each "fresh session" was a separate `claude -p` process. Transcripts are in `evidence/transcripts/` and were scanned for secrets and account data before every commit. Nothing has been pushed.

**Result: 10 / 12 DONE, 2 PARTIAL (6, 9), 0 BLOCKED.**

| # | Exercise | Implemented | Key files | Verification | Evidence | Commit | Status |
|---|---|---|---|---|---|---|---|
| 1 | settings.json ×3 | user `model: opus` (existing), project `effortLevel` + check permissions, local `model: sonnet` | `.claude/settings.json` | Fresh session ran Sonnet (local beat project/user); `--model haiku` beat local; local file git-ignored | [ex01-settings.md](evidence/ex01-settings.md) | `ae479dd` | DONE |
| 2 | Six-layer prompt | Sample stock card with % change | `apps/web/src/StockCard.tsx`, `finance-core` | `npm run check` green; Playwright screenshot | [prompt](prompts/ex02-six-layer.md), [screenshot](evidence/screenshots/ex02-stock-card.png) | `8d014b1` | DONE |
| 3 | Seven techniques | Interested/Skip swipe deck | `apps/web/src/SwipeDeck.tsx` | Check green; clicks verified in browser; run with `--effort medium` | [prompt](prompts/ex03-seven-techniques.md), [screenshot](evidence/screenshots/ex03-swipe-deck.png) | `2f0de20` | DONE |
| 4 | Claude 5–style prompt | Plain-language P/E explanation | `finance-core` `describePe`, `StockCard.tsx` | Check green; banned-pattern scan; report says "Other bugs noticed: none found" | [prompt](prompts/ex04-claude5-style.md), [screenshot](evidence/screenshots/ex04-pe-explanation.png) | `676f8d3` | DONE |
| 5 | /context | Category · tokens · source table; before/after one message | — | Messages 10 → 10.4k after a file-reading message | [ex05-context.md](evidence/ex05-context.md) | `1edfb6e` | DONE |
| 6 | Rules + skill | Always-on and `paths:`-scoped rules; `verify-check` skill | `.claude/rules/*`, `.claude/skills/verify-check/` | Scoped rule absent at start, `nested_memory` load right after Read (session log); skill invoked from "Is the project green right now?" | [ex06-rules-skill.md](evidence/ex06-rules-skill.md) | `f42356d` | **PARTIAL**: interactive "Loaded …" notice not captured |
| 7 | MEMORY.md | Git Bash `MSYS_NO_PATHCONV=1` gotcha in auto-memory | `~/.claude/projects/…/memory/` | Fresh session answered with the flag unprompted; `/context` lists MEMORY.md (94 tokens) | [ex07-memory.md](evidence/ex07-memory.md) | `be84d42` | DONE |
| 8 | CLAUDE.md | Forbidden → Conventions → Stack → Commands → Open questions | `CLAUDE.md` | Fresh session refused a DB reset without asking, citing CLAUDE.md | [ex08-claude-md.md](evidence/ex08-claude-md.md) | `1a24d4b` | DONE |
| 9 | Nested CLAUDE.md | Worker-only conventions | `apps/worker/CLAUDE.md` | Absent from `/context` at start; `nested_memory` load right after Read (session log) | [ex09-nested-claude-md.md](evidence/ex09-nested-claude-md.md) | `74ef195` | **PARTIAL**: "Loaded …" and `/context` listing not captured |
| 10 | context7 | Project `.mcp.json` (HTTP, no secrets); `GET /api/stocks/:symbol` | `.mcp.json`, `apps/api/src/*` | `claude mcp list` connected; context7 `resolve-library-id` + 2× `query-docs` in transcript; curl 200/404; check green | [ex10-context7.md](evidence/ex10-context7.md) | `29ad5d7` | DONE |
| 11 | Subagent | Explore subagent reviewed `apps/` + `packages/` against the rules | — | Main window: one `Agent` call; subagent 15 tools / 32.4k tokens; Messages 10 → 13.9k | [ex11-subagent.md](evidence/ex11-subagent.md) | `42db77b` | DONE |
| 12 | Code graph | codebase-memory-mcp in `.mcp.json` by command name | `.mcp.json` | Project scope, connected, no user entry; indexed 386 nodes / 636 edges; `trace_path` → `StockCard` + tests | [ex12-code-graph.md](evidence/ex12-code-graph.md) | `f87b41d` | DONE |

## Why 6 and 9 are PARTIAL

Both files demonstrably load on demand: the session logs show a `nested_memory` attachment only after a matching `Read`. The course asks for the terminal's one-line **"Loaded …"** notice (and, for exercise 9, `/context` listing the file afterwards). Headless mode draws neither, so it needs one interactive session.

## To finish 6 and 9 (about 2 minutes)

1. In the repo folder, run `claude` (interactive).
2. Run `/context` and screenshot **Memory files**: neither `finance-core.md` nor `apps/worker/CLAUDE.md` is listed.
3. Type: `Read packages/finance-core/src/index.ts and apps/worker/nasdaq_worker/main.py`.
4. Screenshot the two **"Loaded …"** lines (`.claude/rules/finance-core.md`, `apps/worker/CLAUDE.md`).
5. Run `/context` again and screenshot **Memory files**, which now lists both.
6. Save the screenshots as `docs/course/evidence/screenshots/ex06-ex09-*.png`, tick 6 and 9 in `HOMEWORK.md`, and commit.

## Notes

- Exercises 3, 4 and 10 were run with `--effort medium` (CLI flag), on Sonnet from local settings.
- The Exercise 11 subagent flagged three issues (inline price/P/E formatting in `StockCard.tsx`, a course reference in a `finance-core` comment). They were reported only, not fixed.
- The code still uses the `nasdaq-swipe` identifiers internally (an open question in `CLAUDE.md`).
