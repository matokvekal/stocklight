# Exercise 10 — context7, for the whole team

| Criterion | Evidence |
|---|---|
| `.mcp.json` with context7 committed, no secrets | `.mcp.json`: `{"context7": {"type": "http", "url": "https://mcp.context7.com/mcp"}}`, added with `claude mcp add --transport http --scope project`. No keys or headers |
| Connected | `claude mcp list` (CLI equivalent of `/mcp`): `context7: https://mcp.context7.com/mcp (HTTP) - ✔ Connected` ([ex10-mcp-list.txt](ex10-mcp-list.txt)). Project-server approval is in the git-ignored `.claude/settings.local.json` (`enabledMcpjsonServers`) |
| Feature works | `GET /api/stocks/:symbol` on the running API: AAPL → 200 + data, XYZ → 404 + `NOT_FOUND` ([ex10-running-api.txt](ex10-running-api.txt)) |
| Check green + committed | `npm run check` exit 0; this commit |
| Transcript shows context7 fetching docs | [transcripts/ex10-context7.jsonl](transcripts/ex10-context7.jsonl): `mcp__context7__resolve-library-id` ("Express") → `mcp__context7__query-docs` ×2 on `/expressjs/express/v5.1.0` (routing/params, error handling) |

Prompt: [../prompts/ex10-context7.md](../prompts/ex10-context7.md).
