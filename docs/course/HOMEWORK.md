# Homework — Levels 1–3 (12 exercises)

> Authoritative source: [RavTech — Levels 1–3 Homework](https://jenkins-ravtech1.github.io/AI-Courses/course/syllabus/RavTech-All-Sessions-Combined.html#29) (Homework overlay, key H).
> **Done when** criteria are quoted verbatim from the source.
> Completion details: [HOMEWORK_COMPLETION_REPORT.md](HOMEWORK_COMPLETION_REPORT.md).
> Work top to bottom and **commit after every exercise**, so the order is visible in `git log`.

## Before exercise 1 — base app and check command

Course requirement: *"Build the base app and its check command (section B), and commit — before exercise 2."* For your own project: it needs a check command (tests, lint or build) and four small features of your own.

- [x] `npm run check` is green (typecheck + lint + tests + worker checks)
- [x] Base app committed (`chore: prepare S&P 500 Swipe homework baseline`)

**Project rules** (replace the file-browser "section B" rules; raw material for exercises 6 and 8):
1. `packages/finance-core` never imports React, Express, Prisma or network code: pure calculations only.
2. The worker (`apps/worker`) only ingests data; no financial calculations.
3. The web app never accesses the database; it goes through the API.
4. No secrets in git: only `.env.example` with placeholder values.
5. `npm run check` stays green.

**Suggested small features** (no data providers, no auth, no final design; hard-coded sample data):
- A: a sample stock card on the home page with % change computed by `finance-core` (`percentChange`)
- B: "Interested / Skip" buttons cycling through three in-memory sample stocks
- C: a plain-language P/E explanation, as a `finance-core` function shown on the card
- D: `GET /api/stocks/:symbol` returning a sample stock from a fixture, with a Supertest test
- E: a PWA manifest or an Express 5 error handler (exercise 10, where current docs matter)

---

## 1. settings.json at all three levels — Config (Slide 5)
**Summary:** learn which file a setting belongs in (user, project, local) and which one wins on conflict. Precedence: managed > CLI flags > local > project > user.

**Done when:**
- Each of the three files holds one setting that makes sense at that level.
- The project file is committed; git status never shows the local file.
- For the doubled key you can show, in a session, which value won — and say why.

**In this repo:** `~/.claude/settings.json` already exists (`"model": "opus"`). Create `.claude/settings.json` (committed) and `.claude/settings.local.json` (already git-ignored). Use a key with one visible value, such as `effortLevel` or `model`, not `permissions` (permission lists merge across scopes).
**Evidence:** committed `.claude/settings.json`, clean `git status`, `docs/course/evidence/ex01.md` with the winning value and why.
- [x] Done (`ae479dd`)

## 2. A six-layer development prompt — Builds a feature (Slide 6)
**Summary:** one development prompt with all six layers (Role · Context + the reason · Task · Scope & done · Format · Examples), run in a fresh session, building one feature.

**Done when:**
- The feature works in the running app.
- Your check command is green and the change is committed.
- The prompt is saved with the commit, each of the six layers marked.

**In this repo:** feature A (suggested).
**Evidence:** `docs/course/prompts/ex02-six-layer.md` with layers marked, in the same commit as the feature; `npm run check` green.
- [x] Done (`8d014b1`)

## 3. All seven techniques in one prompt — Builds a feature (Slide 8)
**Summary:** a different feature; the prompt uses and labels all seven techniques: Be specific · Multishot · Give a role · XML structure · Dial effort, not words · Brief once · Data first.

**Done when:**
- The feature works, your check command is green, the change is committed.
- Each technique is labelled in the saved prompt.
- For *Dial effort, not words* you note the effort level you set for the run — the prompt itself never asks it to "think hard".

**In this repo:** feature B (suggested). Multishot = 3–5 examples in `<example>` tags.
**Evidence:** `docs/course/prompts/ex03-seven-techniques.md` with labels and the effort level used.
- [x] Done (`2f0de20`)

## 4. A Claude 5–style development prompt — Builds a feature (Slide 9)
**Summary:** a third feature, prompted the Claude 5 way: goal + done-when instead of steps, the effort dial, a runnable check, "Use X when… because…" instead of CRITICAL/MUST, a stated scope, and "note other bugs, don't fix them".

**Done when:**
- The feature works, your check command is green, the change is committed.
- The prompt has no step list (unless the order matters), no "think step by step", no "double-check", no CRITICAL / MUST.
- Claude's report lists other bugs it noticed — without fixing them — or says it found none.

**In this repo:** feature C or D (suggested). The runnable check is `npm run check`.
**Evidence:** `docs/course/prompts/ex04-claude5-style.md` plus an excerpt of Claude's report listing bugs found (or "none found").
- [x] Done (`676f8d3`)

## 5. What's in your context — and where it comes from — Context (Slide 14)
**Summary:** in a fresh session run `/context`; record each category's size and source; send one real message and look again.

**Done when:**
- A table in your notes: category · tokens · where it comes from.
- The biggest category is named, plus one thing you'd cut — and why that's safe.
- You can say which category grew after your message, and why.

**In this repo:** no preparation needed. Note that user-level plugins and claude.ai MCP connectors (Docs, Drive, Gmail, Calendar) on this machine will appear in the table.
**Evidence:** `docs/course/evidence/ex05-context.md`.
- [x] Done (`1edfb6e`)

## 6. Two rules and a skill — Context (Slides 19–20)
**Summary:** turn two project rules into rule files (one always-on, one path-scoped) and write one skill for a repeated procedure.

**Done when:**
- Both rules are committed under `.claude/rules/` — the always-on one has no frontmatter, the scoped one has `paths:`.
- In a fresh session the scoped rule is absent at start and loads only after Claude reads a matching file — the terminal shows a one-line "Loaded …" notice.
- The skill is listed in `/skills` and gets used — picked up from a plain request that doesn't name it, or invoked by name.

**In this repo:** always-on: rule 4 or 5. Scoped: rule 1 with `paths: ["packages/finance-core/**"]`. Skill: e.g. "add a finance-core function with tests".
**Evidence:** committed `.claude/rules/*` and `.claude/skills/<name>/SKILL.md`; screenshot or excerpt of "Loaded …" and `/skills`.
- [ ] Done: **PARTIAL** (`f42356d`). Needs an interactive "Loaded …" screenshot; see HOMEWORK_COMPLETION_REPORT.md

## 7. Something Claude remembers — MEMORY.md — Context (Slides 16, 18)
**Summary:** get one durable fact (something a fresh session would get wrong) into auto-memory, then open the file and check what was written.

**Done when:**
- The entry is in your project's MEMORY.md, under `~/.claude/projects/<project>/memory/`.
- A fresh session acts on it without being told.
- You know how much of MEMORY.md loads at session start.

**In this repo:** folder is `~/.claude/projects/C--dev2026------DDOS-AI-stockLight/memory/` (exists, empty). Only the first 200 lines / 25 KB load at start.
**Evidence:** `docs/course/evidence/ex07-memory.md` with the entry, fresh-session proof and the load-size answer (MEMORY.md itself lives outside the repo).
- [x] Done (`be84d42`)

## 8. A CLAUDE.md that gets followed — Context (Slide 17)
**Summary:** root `CLAUDE.md` in this order: Forbidden (each with its reason) → Conventions → Stack → Commands → Open questions. Short.

**Done when:**
- Five sections, in that order; every Forbidden line carries its reason.
- Concise — every line earns its place.
- A fresh session follows one of its rules without being told (transcript excerpt saved).

**In this repo:** no `CLAUDE.md` exists, and none in parent folders or `~/.claude/` (no leakage). Sources: the project rules above and what went wrong in exercises 2–4.
**Evidence:** committed `CLAUDE.md`, `docs/course/evidence/ex08-transcript.md`.
- [x] Done (`1a24d4b`)

## 9. A nested CLAUDE.md — Context (Slides 16, 18)
**Summary:** give one subfolder its own `CLAUDE.md` with conventions that only matter there; prove it loads only when Claude works in that folder.

**Done when:**
- The nested file is committed.
- At session start `/context` doesn't list it under Memory files.
- After Claude reads a file in that folder, the terminal shows a one-line "Loaded …" notice and `/context` lists it.

**In this repo:** `packages/finance-core/CLAUDE.md` or `apps/worker/CLAUDE.md`.
**Evidence:** commit; `/context` before and after, with the "Loaded …" notice.
- [ ] Done: **PARTIAL** (`74ef195`). Needs an interactive "Loaded …" screenshot; see HOMEWORK_COMPLETION_REPORT.md

## 10. context7, for the whole team — MCP (Slide 21)
**Summary:** add the context7 MCP server (remote HTTP) to the project `.mcp.json`, then build a feature where current docs matter.

**Done when:**
- `.mcp.json` with context7 is committed — and holds no secrets.
- `/mcp` shows it connected.
- The feature works, your check command is green, the change is committed — and that prompt's transcript shows a context7 tool call fetching docs.

**In this repo:** no `.mcp.json` yet. Feature E (suggested; e.g. Vite 8 or Express 5). `claude mcp add --transport http --scope project`.
**Evidence:** committed `.mcp.json`; `/mcp` screenshot; `docs/course/prompts/ex10-context7.md`; transcript excerpt with the context7 call.
- [x] Done (`29ad5d7`)

## 11. Hand the big read to a subagent — Context (Slide 23)
**Summary:** send a read-heavy job (e.g. review `apps/` against the project rules) to a subagent and measure what it cost the main window.

**Done when:**
- The transcript shows the subagent ran, and only its summary came back.
- `/context` before and after: the main window grew by the summary, not by the files it read.
- One line: a case where a subagent would be a waste.

**In this repo:** no preparation needed (built-in Explore / general-purpose agents).
**Evidence:** `docs/course/evidence/ex11-subagent.md` with `/context` before/after and the "waste" line.
- [x] Done (`42db77b`)

## 12. A code graph for the whole team — MCP (Slides 25, 26, 28)
**Summary:** install codebase-memory-mcp, register it in the project `.mcp.json` by command name, index the project and answer a "who calls X?" question.

**Done when:**
- `.mcp.json` has a codebase-memory-mcp entry that uses the command name — no path into your home folder — so it works for teammates.
- `/mcp` shows it connected with the installer's user-level entry removed, so the project entry is the one doing the work.
- The project is indexed, and one "who calls X?" question is answered by a graph tool in the transcript.

**In this repo:** binary not installed yet (not on PATH). After installing, remove the installer's user-scope entry. Suggested question: "who calls `percentChange`?" or "who calls `createApp`?".
**Evidence:** committed `.mcp.json`; `/mcp` screenshot; transcript excerpt of the graph tool call.
- [x] Done (`f87b41d`)

---

## Overall checklist
- [x] Base app + check command committed
- [x] 1 · [x] 2 · [x] 3 · [x] 4 · [x] 5 · [ ] 6 (partial) · [x] 7 · [x] 8 · [ ] 9 (partial) · [x] 10 · [x] 11 · [x] 12
