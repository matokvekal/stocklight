# Exercise 4 — Claude 5–style development prompt

Feature: **plain-language P/E explanation on the stock card** (feature C).
Run: fresh headless session, `--effort medium` (the effort dial replaces "think step by step"), model Sonnet from local settings.
Transcript: [../evidence/transcripts/ex04-claude5-style.jsonl](../evidence/transcripts/ex04-claude5-style.jsonl)

Checklist for this prompt: goal + done-when instead of steps · effort set by flag · a runnable check instead of "double-check" · "Use X when… because…" instead of CRITICAL/MUST · stated scope · "note other bugs, don't fix them".

---

<!-- PROMPT START -->
Goal: each stock card in the S&P 500 Swipe web app explains its price-to-earnings (P/E) ratio in one plain-English sentence, so an everyday investor understands whether the stock looks cheap or expensive compared with the market.

Context: the swipe deck (`apps/web/src/SwipeDeck.tsx`) shows `StockCard` for the sample stocks in `apps/web/src/sampleStocks.ts`. Financial logic lives in `packages/finance-core`, which is pure TypeScript with no React and no I/O. Use these P/E values for the samples: AAPL 34.5, MSFT 33.8, NVDA 52.1. Use 20 as the market-average P/E reference. A P/E of zero or below means the company has no earnings, and the sentence should say so rather than call it cheap.

Done when:
- `packages/finance-core` exports `describePe(pe: number, marketPe: number): string`, with Vitest tests for a cheaper-than-market value, a roughly-average value (within ±10% of the market), an expensive value and a non-positive value.
- `StockCard` shows the P/E value and that sentence. For AAPL the card shows `P/E 34.5` and a sentence that says it is more expensive than the market average of 20.
- `npm run check` passes. That command is the proof this works: run it, and also confirm the existing web tests still pass.

Use the existing `formatSignedPercent` style of small pure helpers when you add formatting, because finance-core is shared by the web and the future API. Keep the wording calm and factual, because users must not read it as investment advice.

Scope: `packages/finance-core/src/`, `apps/web/src/StockCard.tsx`, `apps/web/src/sampleStocks.ts` and their tests. Leave the API, the worker, styling and dependencies unchanged.

If you notice other bugs or problems along the way, note them in your final report but don't fix them. If you find none, say so.

Report: the files you changed, the `npm run check` result, and the other bugs you noticed (or "none found").
<!-- PROMPT END -->

---

## Verification notes

- Banned-pattern scan of the prompt (`CRITICAL|MUST|step by step|double-check|numbered steps`): no all-caps CRITICAL/MUST, no step list, no "think step by step", no "double-check". One lowercase "must" appears in a factual clause about users ("users must not read it as investment advice"), not as a directive to Claude.
- Claude's report (end of the transcript): **"Other bugs noticed: none found."**
- Running app: [../evidence/screenshots/ex04-pe-explanation.png](../evidence/screenshots/ex04-pe-explanation.png); `npm run check` exit 0.
