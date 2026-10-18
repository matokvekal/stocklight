# S&P 500 Swipe

An investment decision-support platform for everyday investors. S&P 500 Swipe explains stock valuations, profitability, risk, dividends, company events and historical returns in plain language, and lets users discover S&P 500 companies through swipe-style browsing.

> **Status: foundation.** The repository contains a working, tested skeleton of every component. Product features are planned and listed below. Internal package identifiers still use the working name `nasdaq-swipe`.

## Objectives

- Turn financial metrics into explanations a non-professional investor can act on.
- Make discovery fast and low-friction: swipe to keep or skip a stock.
- Keep every financial calculation pure, tested and shared between server and client.

## Implemented vs. planned

| Area | Implemented | Planned |
|---|---|---|
| Web (`apps/web`) | React 19 + TypeScript + Vite home page | Swipe discovery, stock detail pages, installable **PWA** |
| API (`apps/api`) | Express 5 app factory, `GET /api/health` | Stock, watchlist and user endpoints |
| Database | PostgreSQL 16 via Docker Compose; Prisma schema with a placeholder `Instrument` model | Domain models and migrations |
| Finance core (`packages/finance-core`) | `percentChange()` | Valuation, profitability, risk, dividend and return analysis |
| Worker (`apps/worker`) | Python package skeleton | Data ingestion from financial data providers, run by a scheduler |
| Authentication & authorization | — | Accounts, secure sessions, role-based access control (RBAC) |
| Security | `.env` excluded from git; database bound to `127.0.0.1` | Password hashing, rate limiting, CORS allowlist, security headers |
| Validation & errors | — | Zod request validation, centralized error handling, consistent response format |
| Audit & logging | — | Audit trail for security-sensitive actions; structured JSON logging (Pino) with request and correlation IDs |
| UI/UX | Minimal functional UI | **Professional UI/UX design: to be provided** |

The planned cross-cutting design is described in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Architecture

```
apps/web (React + TS + Vite, PWA planned) ──/api──▶ apps/api (Node.js + Express + TS)
                                                        │ Prisma
                                                        ▼
apps/worker (Python, scheduled ingestion) ────────▶ PostgreSQL (Docker Compose)

packages/finance-core: pure TypeScript calculations (no React, no I/O)
```

## Testing

| Layer | Tool | Location | Status |
|---|---|---|---|
| Unit | Vitest | `packages/finance-core`, `apps/*/src` | Runs in `npm run check` |
| Components | React Testing Library | `apps/web/src/*.test.tsx` | Runs in `npm run check` |
| API | Supertest | `apps/api/src/*.test.ts` | Runs in `npm run check` |
| Worker | Pytest, ruff, mypy | `apps/worker` | Runs in `npm run check` |
| End-to-end | Playwright, Cypress | `e2e/` | Smoke specs; run manually |

## Getting started

Requirements: Node.js 20.19+ (or 22.12+), Python 3.11+, Docker (database only).

```bash
npm install
cp .env.example .env            # local-only values; never commit .env

# Python worker
cd apps/worker
python -m venv .venv
.venv/Scripts/python -m pip install -e ".[dev]"   # macOS/Linux: .venv/bin/python
cd ../..
```

## Scripts

| Command | What it does |
|---|---|
| `npm run check` | Typecheck + lint + unit tests + worker checks (ruff, mypy, pytest) |
| `npm run typecheck` · `npm run lint` · `npm test` | The individual parts of `check` |
| `npm run check:worker` | Worker checks only (`node scripts/worker-check.mjs test` runs pytest only) |
| `npm run dev:web` | Web app on http://localhost:5173 (proxies `/api` to the API) |
| `npm run dev:api` | API on http://localhost:3001 |
| `npm run build` | Production build of every workspace that has a `build` script |
| `npm run db:up` | Start PostgreSQL in Docker (requires `.env`) |
| `npm run db:migrate` | Apply Prisma migrations to `DATABASE_URL` |
| `npx playwright test` · `npx cypress run` | End-to-end smoke specs (start `npm run dev:web` first for Cypress) |

## Future roadmap

Planned only; not implemented. Details in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md#9-future-roadmap).

- **CI/CD**: GitHub Actions for build, lint and tests; development, staging and production environments; approval-gated deployments; forward-only database migrations; rollback and deployment monitoring.
- **Notifications**: alerts for watchlist stocks on significant price moves and company events; in-app first, Web Push later; user-controlled preferences.
- **Community recommendations**: users share opinions on stocks; community sentiment; moderation, abuse prevention and reporting. User opinions are always clearly separated from verified financial data.
- **Statistics & analytics**: stock performance comparisons, watchlist performance, historical trends and risk metrics; later, privacy-respecting engagement analytics.

## Disclaimer

S&P 500 Swipe provides educational information, not investment advice.
