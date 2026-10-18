---
paths:
  - "packages/finance-core/**"
---

# finance-core rules

- Pure TypeScript only: no React, no Express, no Prisma, no `fetch` or other I/O, because the package is shared by the web app, the API and tests.
- Every exported function has Vitest tests in `src/index.test.ts`, including an edge case (zero, negative or missing input).
- Return `null` for undefined results (e.g. division by zero) instead of throwing, so the UI can show "unavailable".
