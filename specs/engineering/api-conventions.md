# API conventions

All backend HTTP endpoints that serve the BuggyBoard API **must** have resource paths prefixed with **`/api`** (e.g. `/api/login`, `/api/health`).

This separates API routes from frontend page routes when the same server or proxy is used.
