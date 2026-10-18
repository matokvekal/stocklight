# Exercise 7 — Something Claude remembers

## The fact

From Git Bash on this Windows machine, headless slash commands need `MSYS_NO_PATHCONV=1`. Otherwise MSYS rewrites `/context` into `C:/Program Files/Git/context` and the command never runs. A fresh session gets this wrong (I hit it on 2026-10-18 while capturing exercise 5 evidence: the first `claude -p "/context"` returned a reply about a path instead of the context table).

## What was written

Folder: `~/.claude/projects/C--dev2026------DDOS-AI-stockLight/memory/`

`MEMORY.md` (the index, loaded at session start):
```
- [Git Bash slash commands](git-bash-slash-commands.md) — from Git Bash, run headless slash commands as `MSYS_NO_PATHCONV=1 claude -p "/context"`, else MSYS turns `/context` into a Windows path
```

`git-bash-slash-commands.md` (topic file, read on demand; frontmatter `type: project` plus **Why** / **How to apply**):
```
---
name: git-bash-slash-commands
description: "Headless slash commands (claude -p \"/context\") from Git Bash on this Windows machine need MSYS_NO_PATHCONV=1"
metadata:
  node_type: memory
  type: project
  originSessionId: 9a0e45c4-1e17-4d1e-b9d7-c5ef8eeafedc
  modified: 2026-10-18T16:37:03.157Z
---

When running a slash command headlessly from Git Bash on this Windows machine (e.g. `claude -p "/context"`), prefix it with `MSYS_NO_PATHCONV=1`: `MSYS_NO_PATHCONV=1 claude -p "/context"`.

**Why:** Git Bash (MSYS) rewrites any argument starting with `/` into a Windows path, so `/context` arrives as `C:/Program Files/Git/context` and the command never runs (hit on 2026-10-18 while capturing /context evidence).

**How to apply:** any time you suggest or run `claude -p "/<command>"` (or other leading-slash arguments) from the Bash tool in this repo, set `MSYS_NO_PATHCONV=1`. PowerShell is not affected.
```

## A fresh session acts on it without being told

Fresh headless session, prompt: *"I am in Git Bash on this machine. Give me the exact one-line command to print the /context breakdown of a fresh headless Claude Code session. Reply with the command only."* (the prompt doesn't mention MSYS or path conversion).

Answer: **`MSYS_NO_PATHCONV=1 claude -p "/context"`** ([transcripts/ex07-fresh-session.jsonl](transcripts/ex07-fresh-session.jsonl)).

`/context` in a fresh session lists it under Memory Files ([transcripts/ex07-context-memory-files.md](transcripts/ex07-context-memory-files.md)):

| Type | File | Tokens |
|---|---|---|
| AutoMem | `…/memory/MEMORY.md` | 94 |

## How much of MEMORY.md loads at session start

Only `MEMORY.md` loads automatically, and only its **first 200 lines / 25 KB**; anything beyond is cut off. Topic files such as `git-bash-slash-commands.md` are not loaded at start; Claude reads them when the index line looks relevant. That is why the index line itself carries the essential fact, and why MEMORY.md stays one short line per memory.
