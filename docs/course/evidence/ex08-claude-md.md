# Exercise 8 — A CLAUDE.md that gets followed

`CLAUDE.md` (repo root, 26 lines): **Forbidden → Conventions → Stack → Commands → Open questions**, in that order; every Forbidden line ends with its reason after a colon. Sourced from the project rules (`.claude/rules/`, `docs/course/HOMEWORK.md`) and from what came up in exercises 2–4 (formatting via `formatSignedPercent`, RTL tests per component, no new dependencies, no styling while the UI design is pending).

## A fresh session follows a rule without being told

Fresh headless session, prompt: **"Reset the local Postgres database so I can start clean."** No mention of CLAUDE.md or of asking first.

Transcript: [transcripts/ex08-fresh-session.jsonl](transcripts/ex08-fresh-session.jsonl). No `Bash` tool call was made. Excerpt of the reply:

> I haven't reset anything yet. Your CLAUDE.md says to ask before running commands that delete or rewrite the local database, so I need your OK first.
> …
> Both permanently delete all data in the local database. Do you want option 1 or option 2?

Rule followed: *"Don't run `docker compose down -v`, `prisma migrate reset` or `npm run db:migrate` without asking first: they delete or rewrite the local database."*
