# Exercise 5 — What's in your context, and where it comes from

Fresh session in the repo (`claude -p "/context"`, session `71e8adc9-…`, model Sonnet 5.5 from local settings), then one real message in the **same** session (`--resume`), then `/context` again.
Raw output: [before](transcripts/ex05-context-before.md) · [message reply](transcripts/ex05-message-reply.md) · [after](transcripts/ex05-context-after.md).

## Fresh session: 18.1k / 1M tokens

| Category | Tokens | Where it comes from |
|---|---|---|
| System prompt | 2.5k | Built into Claude Code: harness rules, tool guidance, environment info (cwd, git status) |
| System tools | 8.1k | Schemas of the built-in tools loaded up front (Bash, Read, Edit, Write, Grep, Glob, Agent, Skill…) |
| MCP tools | 671 | Tool names from the user-level claude.ai connectors (Claude Docs). Full schemas are deferred |
| MCP server instructions | 717 | Usage instructions sent by the claude.ai Claude Docs server |
| MCP tools (deferred) | 1.4k | Full schemas of those MCP tools; not counted until a tool is loaded |
| System tools (deferred) | 13.4k | Built-in tools that load on demand (WebFetch, WebSearch, Cron*, Monitor…); not counted until loaded |
| Custom agents | 599 | `legacy-code-scanner`, a user-level agent from `~/.claude/agents/` (made for another project) |
| Memory files | — | None yet: no `CLAUDE.md`, no rules and no auto-memory in this project at this point |
| Skills | 5.5k | Skill descriptions: user skills (`~/.claude/skills/`), the `frontend-design` plugin, built-ins, and claude.ai-synced skills (docx, pptx, xlsx, pdf, morning…) |
| Messages | 10 | Only the `/context` command itself |
| Free space | 948.9k | — |
| Autocompact buffer | 33k | Reserved so auto-compaction can run |

**Biggest category** (counted toward the 18.1k): **System tools, 8.1k.** These are built-in tool schemas; they are the agent's hands and can't be cut.

**One thing I'd cut: the claude.ai-synced document skills** (docx, pptx, xlsx, pdf, google-workspace, morning: about 1.6k of the 5.5k "Skills"), plus the `legacy-code-scanner` agent (599). They come from user-level config made for other work, and nothing in this repo uses them. Cutting them is safe because the cost is only their descriptions: removing them doesn't change any tool this project needs, and they can be re-enabled when another project needs them.

## After one message: 28.5k / 1M tokens

| Category | Before | After | Change |
|---|---|---|---|
| Messages | 10 | 10.4k | **+10.4k** |
| System tools | 8.1k | 8.2k | +0.1k |
| Everything else | — | — | unchanged |

**What grew and why:** **Messages.** The message asked Claude to read `packages/finance-core/src/index.ts`, so the conversation now holds my message, the Read tool call, the whole file content as a tool result, and Claude's answer. Files Claude reads become message tokens and stay for every later turn. Nothing else changed, because no new tools, skills or memory files were loaded.

Note: this was captured in headless mode (`claude -p`), whose system prompt is slightly smaller than an interactive session's; the categories and sources are the same.
