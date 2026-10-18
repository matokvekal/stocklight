# Exercise 9 — A nested CLAUDE.md

`apps/worker/CLAUDE.md`: worker-only conventions (ingestion only, venv interpreter, `mypy --strict`, `npm run check:worker`, no network in tests).

## Verified (headless)

| Criterion | Result | Evidence |
|---|---|---|
| Nested file committed | ✅ | this commit |
| Not listed under Memory files at session start | ✅ Memory Files = root `CLAUDE.md`, `project-boundaries.md`, `MEMORY.md` only | [transcripts/ex09-context-start.md](transcripts/ex09-context-start.md) |
| Loads after Claude reads a file in that folder | ✅ session `77899559-…` log: `Read` tool_use (line 34) → **`nested_memory` attachment `apps\worker\CLAUDE.md`** (line 37) | [transcripts/ex09-read-worker.jsonl](transcripts/ex09-read-worker.jsonl) |
| "Loaded …" notice + `/context` lists it afterwards | ⏳ **needs interactive confirmation** | see below |

Headless limitation: I sent `/context` → Read → `/context` to one process ([transcripts/ex09-single-process.jsonl](transcripts/ex09-single-process.jsonl)). The headless `/context` still listed only the start-up memory files, even though the session log shows the nested file was loaded. The "Loaded …" line is drawn only by the interactive UI.

## To finish (interactive, ~1 minute)

1. `claude` in the repo → `/context` → Memory files: no `apps/worker/CLAUDE.md`.
2. Ask: *"Read apps/worker/nasdaq_worker/main.py"* → terminal shows `Loaded apps/worker/CLAUDE.md`.
3. `/context` → it is now listed. Screenshot both into `docs/course/evidence/screenshots/`.
