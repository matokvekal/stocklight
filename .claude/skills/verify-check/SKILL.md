---
name: verify-check
description: Run the S&P 500 Swipe check command (typecheck, lint, all tests, worker checks) and report a pass/fail summary per stage. Use when asked whether the project is green, whether tests pass, to verify a change, or before committing.
---

# Verify the check command

1. Run `npm run check` from the repository root.
2. Report one line per stage: typecheck, lint, web tests, api tests, finance-core tests, worker (ruff, mypy, pytest), each PASS or FAIL with the test counts.
3. If something fails, quote the first error and the file and line it points to. Do not fix anything unless asked.
