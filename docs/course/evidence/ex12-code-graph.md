# Exercise 12 — A code graph for the whole team

| Criterion | Evidence |
|---|---|
| `.mcp.json` entry uses the command name, no home path | `"codebase-memory-mcp": {"type": "stdio", "command": "codebase-memory-mcp"}`, added with `claude mcp add --scope project codebase-memory-mcp -- codebase-memory-mcp`. The binary (v0.12.1, release `windows-amd64` zip) is on PATH in `~/.local/bin` |
| Connected, and the project entry does the work | `claude mcp get codebase-memory-mcp` → **Scope: Project config (shared via .mcp.json)**, ✔ Connected; `~/.claude.json` has **no** user-level `codebase-memory-mcp` entry ([ex12-mcp-get.txt](ex12-mcp-get.txt)). The release's `install.ps1` (which registers a user-level entry) was deliberately not run, so there was no user entry to remove |
| Project indexed | `mcp__codebase-memory-mcp__index_repository` (`mode: full`) → **386 nodes, 636 edges** |
| "Who calls X?" answered by a graph tool | `mcp__codebase-memory-mcp__trace_path` (`function_name: percentChange`, `direction: inbound`) → direct callers **`StockCard`** (`apps/web/src/StockCard.tsx`) and the finance-core tests; indirect: `SwipeDeck` (hop 2), `App` (hop 3). No Grep/Read/Bash calls in that session |

Transcript: [transcripts/ex12-code-graph.jsonl](transcripts/ex12-code-graph.jsonl).
