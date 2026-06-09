# BuggyBoard Test Plans

Playwright test plans for the BuggyBoard web app. Each plan enumerates atomic scenarios to implement as Playwright tests using the Page Object Model and the spec-driven workflow in `.cursor/skills/playwright-cli/references/spec-driven-testing.md`.

## Seed tests

| Seed file | Starting state |
| --- | --- |
| `tests/seed.spec.ts` | Unauthenticated user on `/login` |
| `tests/seed-authenticated.spec.ts` | Authenticated user (`buggy` / `1970beetle`) on `/board` |

## Test plans

| Plan | Feature spec | Scope |
| --- | --- | --- |
| [authentication-test-plan.md](authentication-test-plan.md) | `03-login.md` | Login page, credentials, redirects, session persistence |
| [logout-test-plan.md](logout-test-plan.md) | `05-logout.md` | Logout button, protected routes after logout |
| [board-test-plan.md](board-test-plan.md) | `04-title-bar.md`, `07-bug-board.md`, `08-board-severity.md` | Title bar, bug table, severity color-coding |
| [create-bug-test-plan.md](create-bug-test-plan.md) | `06-create-bug.md` | New Bug modal, validation, save/cancel |
| [edit-bug-test-plan.md](edit-bug-test-plan.md) | `09-edit-bug.md` | Edit bug modal, save/cancel, disabled save |
| [delete-bug-test-plan.md](delete-bug-test-plan.md) | `12-delete-bug.md` | Delete confirmation flow |
| [sort-test-plan.md](sort-test-plan.md) | `10-sort-board-columns.md` | Column sorting and indicators |
| [search-test-plan.md](search-test-plan.md) | `11-search-board.md` | Title search, clear, no-results message |
| [bug-status-test-plan.md](bug-status-test-plan.md) | `13-bug-status.md` | Open/Closed filter, state in edit modal |

## Conventions

- One scenario = one test file = one behaviour under test.
- Tests import `{ test, expect }` from `tests/fixtures` and use page object fixtures — never raw `page.*` chains in spec files.
- Scenario file names are kebab-case and match the `**File:**` path in each plan.
- Valid test users are defined in `users.json` at the project root (`buggy` / `1970beetle`, `vanny` / `1979bus`).
