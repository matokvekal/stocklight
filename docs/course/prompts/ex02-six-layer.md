# Exercise 2 — six-layer development prompt

Feature: **sample stock card with daily % change** (feature A).
Run in a fresh headless session: `claude -p "$(cat prompt)" --permission-mode acceptEdits` (model from local settings: Sonnet; effort from project settings: high).
Transcript: [../evidence/transcripts/ex02-six-layer.jsonl](../evidence/transcripts/ex02-six-layer.jsonl)

---

<!-- PROMPT START -->
**[1 · Role]**
You are a senior React + TypeScript engineer working in an npm-workspaces monorepo. You write small, well-tested changes that match the existing code style.

**[2 · Context + the reason]**
S&P 500 Swipe helps everyday investors understand stocks in plain language. The home page (`apps/web/src/App.tsx`) currently shows only a heading and a tagline, so a first-time visitor sees nothing about stocks. We want the first visible building block of the future swipe card: one sample stock with its daily change, so users immediately see what the product is about. All financial math lives in `packages/finance-core` (pure TypeScript, already has `percentChange(from, to)`), so the web app must reuse it instead of computing percentages itself.

**[3 · Task]**
Add a `StockCard` component to `apps/web` and render it on the home page under the tagline, with one hard-coded sample stock: Apple Inc., symbol `AAPL`, previous close `228.52`, last price `231.40`. The card shows the company name, the symbol, the last price in US dollars, and the daily change in percent computed with `percentChange` from `@nasdaq-swipe/finance-core`, formatted with a sign and two decimals. A gain and a loss must be distinguishable without relying on color alone (the sign is enough).

**[4 · Scope & done]**
In scope: `apps/web/src/` (new component + test, `App.tsx`), adding `@nasdaq-swipe/finance-core` as a dependency of `apps/web`, and a small formatting helper in `packages/finance-core` if you need one (with tests).
Out of scope: API or database changes, real market data, routing, styling beyond what already exists in `styles.css` (the UI design will be provided later; do not add a design system, colors, or a component library), and any change to the worker.
Rules: `packages/finance-core` must not import React or anything with I/O. No network calls from the web app for this feature.
Done when: `npm run check` passes (typecheck + lint + all tests + worker checks), there is a React Testing Library test asserting the card shows `AAPL` and `+1.26%`, and the existing App test still passes.

**[5 · Format]**
Make the code changes directly. When finished, reply with: (a) the list of files you changed, (b) the final output summary of `npm run check`, (c) one sentence on any decision you made that was not specified here.

**[6 · Examples]**
Expected rendered text for the sample data (layout is up to you, content is not):
```
Apple Inc. (AAPL)
$231.40
+1.26% today
```
For a loss, e.g. previous close 200, last price 190, the change reads `-5.00% today`.
<!-- PROMPT END -->
