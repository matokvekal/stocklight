# apps/worker — Python data worker

- Ingestion only: fetch and store data, no financial calculations (those live in `packages/finance-core`).
- Use the venv interpreter `apps/worker/.venv/Scripts/python` (Windows), never the global `python`, so ruff/mypy/pytest versions match.
- Code must pass `mypy --strict`: annotate every function, including tests (`-> None`).
- Verify with `npm run check:worker` from the repo root (`node scripts/worker-check.mjs test` for pytest only).
- No network calls in tests: stub provider responses with fixtures under `tests/fixtures/`.
