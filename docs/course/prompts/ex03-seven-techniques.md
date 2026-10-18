# Exercise 3 — all seven techniques in one prompt

Feature: **"Interested / Skip" swipe buttons over three sample stocks** (feature B).

**Effort for this run (Dial effort, not words):** `--effort medium`, set on the command line:
`claude -p "$(cat prompt)" --effort medium --permission-mode acceptEdits` (model: Sonnet, from local settings).
The prompt itself never asks the model to "think hard" or "think step by step".
Transcript: [../evidence/transcripts/ex03-seven-techniques.jsonl](../evidence/transcripts/ex03-seven-techniques.jsonl)

## Technique labels

| # | Technique | Where in the prompt |
|---|---|---|
| 1 | **Data first** | `<data>` comes first: the existing component, its props and the sample stocks, before any instruction |
| 2 | **Give a role** | `<role>` |
| 3 | **Brief once** | `<brief>`: goal, reason, scope and done-when stated once, up front; then "work autonomously" |
| 4 | **Be specific** | `<requirements>`: exact labels, exact order, exact end-of-list text, exact files |
| 5 | **XML structure** | The whole prompt is split into tagged sections (`<data>`, `<role>`, `<brief>`, `<requirements>`, `<examples>`, `<output_format>`) |
| 6 | **Multishot** | `<examples>`: four diverse `<example>`s with input actions and the exact expected screen text |
| 7 | **Dial effort, not words** | Effort set with `--effort medium` on the run, not with words in the prompt |

---

<!-- PROMPT START -->
<data>
<!-- Technique 1: Data first. The material comes before the question. -->
<existing_component path="apps/web/src/StockCard.tsx">
export interface StockCardProps {
  name: string;
  symbol: string;
  previousClose: number;
  lastPrice: number;
}
export function StockCard({ name, symbol, previousClose, lastPrice }: StockCardProps) — renders "<name> (<symbol>)", the USD price, and "<+x.xx%> today".
</existing_component>
<existing_app path="apps/web/src/App.tsx">
App renders <h1>S&P 500 Swipe</h1>, a tagline, and one hard-coded <StockCard> for Apple (AAPL, previousClose 228.52, lastPrice 231.40).
</existing_app>
<sample_stocks>
1. Apple Inc. — AAPL — previousClose 228.52 — lastPrice 231.40
2. Microsoft Corp. — MSFT — previousClose 415.10 — lastPrice 409.85
3. NVIDIA Corp. — NVDA — previousClose 120.00 — lastPrice 126.00
</sample_stocks>
</data>

<role>
<!-- Technique 2: Give a role. -->
You are a senior React + TypeScript engineer who writes small, accessible, well-tested UI changes in this monorepo.
</role>

<brief>
<!-- Technique 3: Brief once — goal, reason, scope and done-when, stated once up front. -->
Goal: turn the single hard-coded card into the first swipe interaction: the user sees one sample stock at a time and decides "Interested" or "Skip".
Reason: swiping is the core discovery gesture of S&P 500 Swipe; this lets users try the flow before real data and the final design exist.
Scope: `apps/web/src/` only. Keep state in memory (React state); no localStorage, no network, no API or database changes, no new dependencies, no new styling (the professional UI design comes later). Reuse `StockCard` unchanged.
Done when: `npm run check` passes and React Testing Library tests cover the behaviour in the examples below.
Work autonomously from here; do not ask follow-up questions.
</brief>

<requirements>
<!-- Technique 4: Be specific. -->
- Create `apps/web/src/sampleStocks.ts` exporting the three sample stocks above, in that order, typed as `StockCardProps[]`.
- Create `apps/web/src/SwipeDeck.tsx`: shows the current stock with `StockCard`, plus two buttons with the exact accessible names "Skip" and "Interested".
- Either button advances to the next stock. "Interested" also adds the symbol to an in-memory list.
- Below the buttons, show `Interested: <symbols joined by ", ">` — or `Interested: none` when empty.
- After the last stock, hide the card and both buttons and show the text `You've seen all 3 stocks.` (keep the Interested line visible).
- Replace the single `<StockCard>` in `App.tsx` with `<SwipeDeck stocks={sampleStocks} />`.
- Add `apps/web/src/SwipeDeck.test.tsx` covering every example below.
</requirements>

<examples>
<!-- Technique 6: Multishot — diverse inputs with the exact expected output. -->
<example>
<actions>(none — initial render)</actions>
<expected_screen>Apple Inc. (AAPL) · $231.40 · +1.26% today · [Skip] [Interested] · Interested: none</expected_screen>
</example>
<example>
<actions>click Interested</actions>
<expected_screen>Microsoft Corp. (MSFT) · $409.85 · -1.26% today · [Skip] [Interested] · Interested: AAPL</expected_screen>
</example>
<example>
<actions>click Skip, click Interested</actions>
<expected_screen>NVIDIA Corp. (NVDA) · $126.00 · +5.00% today · [Skip] [Interested] · Interested: MSFT</expected_screen>
</example>
<example>
<actions>click Interested, click Skip, click Interested</actions>
<expected_screen>You've seen all 3 stocks. · Interested: AAPL, NVDA (no card, no buttons)</expected_screen>
</example>
</examples>

<output_format>
When finished, reply with: the files you changed, the `npm run check` result, and any assumption you made.
</output_format>
<!-- PROMPT END -->
