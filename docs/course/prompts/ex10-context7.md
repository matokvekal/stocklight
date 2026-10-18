# Exercise 10 — feature built with context7 docs

Feature: **`GET /api/stocks/:symbol` returning a sample stock (Express 5)** (feature D/E). Express 5 changed route-path syntax and async error handling compared with v4, so current docs matter.
Run: fresh headless session, `--effort medium`, project MCP server `context7` from `.mcp.json`.
Transcript: [../evidence/transcripts/ex10-context7.jsonl](../evidence/transcripts/ex10-context7.jsonl)

---

<!-- PROMPT START -->
Goal: the S&P 500 Swipe API serves sample stock data, so the web app can later stop hard-coding it. Add `GET /api/stocks/:symbol` to `apps/api/src/app.ts`.

Before writing the route, use the context7 MCP server to fetch the current Express 5 documentation on routing and route parameters, and on error handling. This repo uses Express ^5.1, and your training data may describe Express 4 behaviour. Mention in your report which context7 library ID you used.

Done when:
- `GET /api/stocks/AAPL` (case-insensitive symbol) returns 200 with `{ "data": { "symbol": "AAPL", "name": "Apple Inc.", "previousClose": 228.52, "lastPrice": 231.40, "pe": 34.5 } }`. Serve the same three sample stocks as `apps/web/src/sampleStocks.ts` (AAPL, MSFT, NVDA) from a fixture module in `apps/api/src/`.
- An unknown symbol returns 404 with `{ "error": { "code": "NOT_FOUND", "message": "Unknown symbol: XYZ" } }`.
- Supertest tests cover both cases, and the existing health test still passes.
- `npm run check` passes.

Scope: `apps/api/src/` only. Leave the web app, the database and dependencies unchanged. If you notice other problems, note them in your report without fixing them.

Report: files changed, the context7 calls you made, and the `npm run check` result.
<!-- PROMPT END -->
