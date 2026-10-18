# S&P 500 Swipe — working in this repo

## Forbidden
- Don't run `docker compose down -v`, `prisma migrate reset` or `npm run db:migrate` without asking first: they delete or rewrite the local database.
- Don't put financial math in `apps/web`, `apps/api` or the worker: it belongs in `packages/finance-core` so web and API share one tested implementation.
- Don't add npm or Python dependencies without asking: every dependency adds install time and supply-chain risk to all workspaces.
- Don't commit `.env`, tokens or session transcripts containing account data: the repository will be public.
- Don't introduce styling systems, component libraries or new colors: the professional UI/UX design will be supplied later.

## Conventions
- UI text and docs are in English; product docs never mention the course (course material lives only in `docs/course/`).
- Prices and percents are formatted by `finance-core` helpers (`formatSignedPercent`), not inline.
- New React components get a React Testing Library test next to them (`Component.test.tsx`).
- Commit after each completed task; homework commits start with `Exercise N:`.

## Stack
- npm workspaces: `apps/web` (React 19, Vite 8), `apps/api` (Express 5, Prisma 6), `packages/finance-core` (pure TS); Python 3.11 worker in `apps/worker`.
- Tests: Vitest, React Testing Library, Supertest, pytest; E2E smoke in `e2e/` (Playwright, Cypress).

## Commands
- `npm run check`: typecheck + lint + all tests + worker checks; must pass before committing.
- `npm run dev:web` (port 5173) · `npm run dev:api` (port 3001) · `npm run build`.

## Open questions
- Which financial data provider the worker will use.
- Final package naming: identifiers still say `nasdaq-swipe`.
