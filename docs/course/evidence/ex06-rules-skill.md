# Exercise 6 — Two rules and a skill

## Files

| File | Kind | Frontmatter |
|---|---|---|
| `.claude/rules/project-boundaries.md` | Always-on rule (no secrets, web → API only, check stays green) | none |
| `.claude/rules/finance-core.md` | Path-scoped rule (pure TypeScript, tests, `null` over throwing) | `paths: ["packages/finance-core/**"]` |
| `.claude/skills/verify-check/SKILL.md` | Skill: run `npm run check` and report per stage | `name`, `description` |

## Scoped rule: absent at start, loaded after a matching read

Session `3e6673a1-…` (headless; each step is the same session via `--resume`):

1. `/context` at start → **Memory Files lists only `project-boundaries.md`** ([ex06-context-start.md](transcripts/ex06-context-start.md)). The scoped rule is absent.
2. Prompt: read `packages/finance-core/src/index.ts` with the Read tool ([ex06-read-finance-core.jsonl](transcripts/ex06-read-finance-core.jsonl)).
3. The session log shows a **`nested_memory` attachment for `.claude/rules/finance-core.md` immediately after the Read tool result** (line 37), and nowhere before it ([ex06-session-log-excerpt.md](transcripts/ex06-session-log-excerpt.md)).

Headless limitation: the one-line terminal notice "Loaded …" is drawn only by the interactive UI. The session log's `nested_memory` attachment is the event behind that notice. A `/context` run as a later `--resume` process doesn't list on-demand files loaded in an earlier process ([ex06-context-after-read.md](transcripts/ex06-context-after-read.md)), so the attachment record is the evidence.

An earlier attempt where Claude chose Grep instead of Read loaded nothing, which confirms that the rule is triggered by reading a matching file, not by searching it.

## Skill: listed and used from a plain request

- Listed: the session `init` event's `skills` array includes `"verify-check"` ([ex06-skill-plain-request.jsonl](transcripts/ex06-skill-plain-request.jsonl), line 1).
- Used: plain request **"Is the project green right now?"** (doesn't name the skill) → transcript shows `{"name":"Skill","input":{"skill":"verify-check"}}`, then `npm run check` and a per-stage PASS table.

## Remaining interactive confirmation (optional)

In an interactive `claude` session: `/skills` shows `verify-check`; asking Claude to read `packages/finance-core/src/index.ts` prints the "Loaded …finance-core.md" notice.
