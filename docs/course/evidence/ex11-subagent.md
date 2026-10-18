# Exercise 11 — Hand the big read to a subagent

Job: review every source file under `apps/` and `packages/` against `CLAUDE.md` and `.claude/rules/`, delegated to the built-in **Explore** subagent. Session `bf550baa-…`, one process with `/context` → request → `/context`, then `/context` again via `--resume` after the summary arrived.
Transcript: [transcripts/ex11-subagent.jsonl](transcripts/ex11-subagent.jsonl)

## The subagent ran, and only its summary came back

- Main window tool calls: **one**, `Agent` (`subagent_type: "Explore"`). No Read/Grep in the main window.
- Subagent: **15 tool calls, 32,440 tokens**, 34 s (`task_notification` usage). Its reads stay in its own window.
- Returned to the main window: a summary of about 20 lines. It flagged three issues (inline `Intl.NumberFormat` and `toFixed` in `StockCard.tsx`; a course reference in a `finance-core` comment) plus one note (the web app uses local sample data, not the API). They were reported only, not fixed.

## /context before and after

| Measurement | Total | Messages | File |
|---|---|---|---|
| Before the request | 17.5k | 10 | [ex11-context-before.md](transcripts/ex11-context-before.md) |
| After launch, before the summary | 30.3k | 11.8k | [ex11-context-after.md](transcripts/ex11-context-after.md) |
| After the summary arrived | 33k | **13.9k** | [ex11-context-after-summary.md](transcripts/ex11-context-after-summary.md) |

The main window grew by ~13.9k: my request, the Agent call, launch metadata, the first `/context` output and the ~2k summary. The subagent read ~32.4k tokens of files and tool output, and none of it entered the main window. Reading the files directly would have added all of it, on every later turn.

**When a subagent would be a waste:** looking up one known function in one file. The subagent's start-up cost (its own system prompt and tools, ~10k+) exceeds the cost of a single `Read`, and you lose the file contents in the main window just when you need them to edit.
