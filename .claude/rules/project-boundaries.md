# Project boundaries

- Never commit secrets: only `.env.example` with placeholder values is tracked, because the repository will be shared publicly.
- The web app reaches data only through the API (`/api/...`), never the database, because the API is where validation and authorization will live.
- `npm run check` stays green after every change, because it is the single proof that a change works.
