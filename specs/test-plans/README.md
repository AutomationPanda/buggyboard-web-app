# BuggyBoard UI Test Plans

Plans in this folder are the Playwright generation specs for BuggyBoard. They were written from `specs/features/` and a live pass through the app at `http://localhost:5173/`.

## Seeds

| Seed | Starting state |
| --- | --- |
| `tests/seed.spec.ts` | Unauthenticated. Navigates to the app root and lands on `/login`. |
| `tests/seed-authenticated.spec.ts` | Authenticated as `buggy`. Lands on `/board`. |

Each scenario starts from a fresh seed. Do not chain scenarios.

## Credentials

From `users.json` at the project root:

| Username | Password |
| --- | --- |
| `buggy` | `1970beetle` |
| `vanny` | `1979bus` |

## Observed UI (planning session)

- Unauthenticated `/` and `/board` redirect to `/login`.
- Login uses labeled Username and Password fields and a Login button. Invalid credentials show `Invalid username or password.`
- Board title bar: logo, heading `BuggyBoard`, search (`Search bugs by title`), `New Bug`, `Logout`.
- Bugs table columns: ID, Severity, Title, Owner. Default sort is Severity descending (`↓`).
- Create bug dialog: Title, Severity (HIGH / MID / LOW, default MID), Owner (defaults to current user), Description, Save, Cancel, Close (`×`).
- Edit bug dialog title is `Edit bug #<id>`. ID is read-only. State is Open/Closed. Save is disabled until a field changes.
- Delete opens a second dialog: `Are you sure you want to delete bug #<id>: <title>?`
- Empty filter/search uses the message `No bugs matched.` Completely empty data uses `No bugs.`
- Severity CSS tokens: `--color-severity-high` `#b84a2e`, `--color-severity-mid` `#a67c47`, `--color-severity-low` `#4a6b5e`.
