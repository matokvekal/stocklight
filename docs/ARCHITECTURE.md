# Architecture — S&P 500 Swipe

> **Status:** design document. Items marked *planned* are **not implemented**. Today the codebase contains a tested skeleton: `GET /api/health`, a minimal home page, an empty worker and one placeholder Prisma model (`Instrument`).

## 1. Components

| Component | Technology | Responsibility | State |
|---|---|---|---|
| `apps/web` | React 19 + TypeScript + Vite | UI and swipe-style stock discovery | Skeleton |
| `apps/web` (PWA) | Vite PWA tooling | Installable app, offline shell, Web Push | Planned |
| `apps/api` | Node.js + Express 5 + TypeScript | REST API, authentication, authorization | Skeleton |
| `apps/api/prisma` | PostgreSQL 16 + Prisma 6 | Persistent data | Placeholder schema |
| `apps/worker` | Python 3.11 | Data **ingestion only** from external providers; no financial calculations | Skeleton |
| Scheduler | To be decided | Runs worker jobs on a schedule | Planned |
| `packages/finance-core` | Pure TypeScript | All financial calculations; no React, no network, no database | One function |
| `docker-compose.yml` | Docker Compose | Local PostgreSQL, bound to `127.0.0.1` only | Implemented |

**Boundaries:** calculations live in `finance-core` so they are testable and shared by web and API. The worker only fetches and stores data. The web app never accesses the database directly; it goes through the API.

## 2. API layering *(planned)*

```
Request → Middleware (request ID, logger, security headers, CORS, rate limit, auth)
        → Router → Controller (HTTP only: parse, validate, respond)
        → Service (business rules; uses finance-core; writes audit events)
        → Repository (Prisma only; no business logic)
        → PostgreSQL
Errors from any layer → centralized error handler → consistent error response
```

- **Controllers** contain no business logic and no Prisma calls.
- **Services** receive their dependencies (repositories, logger, clock) as parameters so they can be tested without a database.
- **Repositories** are the only modules that import `@prisma/client`.
- **Centralized configuration:** a single `config` module reads `process.env` once at startup, validates it with Zod and fails fast on missing values. No other module reads `process.env`.
- `createApp()` remains a side-effect-free factory so Supertest can test it in-process (as today).

## 3. Security *(planned)*

- **Authentication:** passwords hashed with **argon2id** (or bcrypt, cost ≥ 12), never stored in plain text. Short-lived access tokens plus a rotating refresh token in an `HttpOnly`, `Secure`, `SameSite` cookie; tokens are revoked on logout.
- **Authorization (RBAC):** roles (e.g. `user`, `moderator`, `admin`) enforced by route-level middleware; deny by default.
- **OWASP:** follow the OWASP Top 10 and ASVS: authorize every request, never leak internals in error messages, keep dependencies patched (`npm audit`), use Prisma queries only (no concatenated raw SQL).
- **HTTP hardening:** `helmet` security headers, explicit CORS allowlist (no `*` with credentials), global rate limiting with stricter limits on login and registration.
- **Secrets:** local `.env` only (git-ignored; only `.env.example` with placeholder values is committed). In deployed environments, the platform's secret manager. Never in code, logs or committed configuration.

## 4. Input validation and error handling *(planned)*

- **Zod** schemas validate every input at the API boundary (`body`, `params`, `query`) through a reusable `validate(schema)` middleware. Schemas can be shared with the web app.
- Validation and normalization always run server-side, even when the client has validated. Free-text input is trimmed and length-limited.
- **One centralized error handler:** an `AppError` class carries `code` and `status`. Unexpected errors are logged and returned as a generic 500.
- **Consistent response format:**
  - Success: `{ "data": ... }`
  - Error: `{ "error": { "code": "VALIDATION_ERROR", "message": "...", "details": [...], "requestId": "..." } }`

## 5. Audit trail *(planned)*

- A dedicated `AuditEvent` table: `id, userId, action, resource, resourceId, outcome (success|failure), timestamp, requestId, ip`.
- Recorded events: login and logout (including failures), password changes, role changes, moderation actions and significant user actions (watchlist, preferences).
- Audit records **never** contain passwords, tokens, cookies or sensitive personal data.
- Audit events are written by services, are append-only, and are kept separate from application logs.

## 6. Logging and observability *(planned)*

- **Pino** for structured JSON logging (`pino-http` for request logs; `pino-pretty` in development only).
- **Request ID:** taken from `X-Request-Id` or generated, returned in the response, and attached to every log line and error response. A **correlation ID** propagates to worker jobs and outbound calls.
- Pino redaction for `authorization`, `cookie`, `password` and `token` fields.
- Application logs (stdout) and audit events (database) are separate channels.
- Health checks: `GET /api/health` (liveness, implemented) and `GET /api/health/ready` (readiness, including the database). Later: metrics and tracing (e.g. OpenTelemetry).

## 7. Frontend and UI/UX

- **The professional UI/UX design specification will be provided later.**
- Until then the UI stays minimal and functional: no design system, component library or visual theme, and no assumptions about colors, layout, typography or interaction design.
- The frontend stays modular so the design can be applied without rewriting logic: presentational components separate from state and data access, calculations in `finance-core`, and API access through a single client module.

## 8. Testing

| Layer | Tool | Location |
|---|---|---|
| Unit (TypeScript) | Vitest | `packages/finance-core`, `apps/*/src/**/*.test.ts` |
| UI components | Vitest + React Testing Library | `apps/web/src` |
| API | Vitest + Supertest | `apps/api/src` |
| Worker | Pytest, ruff, mypy | `apps/worker` |
| End-to-end | Playwright, Cypress | `e2e/` |

`npm run check` (typecheck + lint + tests + worker checks) must stay green.

## 9. Future roadmap

> Roadmap only; not implemented and not reflected in the current architecture.

### 9.1 CI/CD
- **GitHub Actions:** every pull request runs `npm ci`, `npm run check`, `npm run build` and end-to-end tests; merging requires a green pipeline.
- **Environments:** development, staging and production, each with its own secrets (GitHub Environments).
- **Deployment:** automatic to staging; production behind a manual approval gate.
- **Database migrations:** `prisma migrate deploy` runs as a separate step before deployment. Migrations are forward-only and backward-compatible (expand → migrate → contract), so application rollbacks never require database rollbacks.
- **Rollback and monitoring:** versioned artifacts, one-step rollback to the previous version, post-deploy readiness checks.

### 9.2 Notifications
- Alerts for watchlist stocks: significant price changes (user-defined thresholds) and company events (earnings, dividends).
- The worker detects events; the API stores `Notification` records and tracks read state.
- In-app notifications first; Web Push via the PWA service worker later.
- Per-user preferences: notification types, thresholds, channels, and a global opt-out.

### 9.3 Community recommendations
- Users post opinions or recommendations (buy / hold / sell plus text) on a stock; community sentiment is shown as an aggregate.
- **Clear separation:** user opinions are stored and displayed separately from verified financial data and labelled as user opinion, not investment advice.
- Abuse prevention: authenticated posting, rate limiting, Zod validation, content reporting, a moderation queue and a `moderator` RBAC role. Moderation actions are recorded in the audit trail.

### 9.4 Statistics and analytics
- Stock performance comparisons, watchlist performance, historical trends and risk metrics (volatility, drawdown), all computed in `finance-core`.
- Future engagement analytics with privacy by design: aggregated data only, no personal data, opt-out and a defined retention policy.
