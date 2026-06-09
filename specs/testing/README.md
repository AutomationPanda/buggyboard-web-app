# BuggyBoard Test Plans

Manual and automated test plans for the BuggyBoard web app (SUT for the Playwright course). Generated from live exploration of the app at `http://localhost:5173` and aligned with feature specs under `specs/features/`.

## Conventions

- **Atomic tests:** Each test case covers one behavior. Split grand tours into separate cases.
- **Arrange–Act–Assert:** Structure automated tests with clear setup, action, and verification steps.
- **Page Object Model:** Automated tests must use page objects from `tests/pages/` via fixtures in `tests/fixtures/` — never raw `page.*` chains in spec files. See `specs/engineering/test-automation-patterns.md`.
- **Independence:** Each test creates its own preconditions (API seeding or UI setup) and does not rely on state from other tests.
- **Priority:**
  - **P0 (smoke):** Core happy paths; run on every commit.
  - **P1 (regression):** Important edge cases and error handling.
  - **P2 (extended):** Visual polish, keyboard shortcuts, and less common flows.

## Test environment

| Item | Value |
| --- | --- |
| App URL | `http://localhost:5173` |
| Default user | `buggy` / `1970beetle` |
| Login route | `/login` |
| Board route | `/board` |

## Page objects

| Area | Page object file |
| --- | --- |
| Login | `tests/pages/login-page.ts` |
| Board | `tests/pages/board-page.ts` |
| Create Bug modal | `tests/pages/create-bug-modal.ts` |
| Edit Bug modal | `tests/pages/edit-bug-modal.ts` |

## Test plan index

| Plan | Scope |
| --- | --- |
| [authentication-test-plan.md](authentication-test-plan.md) | Login, logout, session persistence, route protection |
| [board-test-plan.md](board-test-plan.md) | Bug table display, title bar, severity color-coding |
| [create-bug-test-plan.md](create-bug-test-plan.md) | New Bug modal — open, save, cancel, validation |
| [edit-bug-test-plan.md](edit-bug-test-plan.md) | Edit Bug modal — open, save, cancel, field rules |
| [delete-bug-test-plan.md](delete-bug-test-plan.md) | Delete confirmation flow |
| [search-test-plan.md](search-test-plan.md) | Title search, clear control, no-results message |
| [sort-test-plan.md](sort-test-plan.md) | Column sorting, default sort, indicators |
| [bug-status-test-plan.md](bug-status-test-plan.md) | Open/Closed filter and state in edit modal |

## Observed UI (exploration snapshot)

Exploration on 2026-06-09 confirmed the following live behaviors:

- Root URL redirects unauthenticated users to `/login`.
- Login page shows BuggyBoard heading, username/password fields, and Login button.
- Valid login (`buggy` / `1970beetle`) navigates to `/board`.
- Board title bar: logo, "BuggyBoard" heading, search field, "New Bug" button, "Logout" button.
- State filter toggle above table: "Open" (default) and "Closed".
- Bug table columns: ID, Severity, Title, Owner — all sortable via header buttons.
- Default sort: Severity descending (↓ indicator on Severity header).
- Severity badges display in ALL CAPS (HIGH, MID, LOW) with color coding.
- Clicking a bug row opens "Edit bug #&lt;id&gt;" modal with ID (read-only), Title, Severity, State, Owner, Description, Delete, Cancel, Save (disabled when unchanged).
- "New Bug" opens "Create bug" modal with Title, Severity (default MID), Owner (pre-filled), Description, Cancel, Save.
- Search filters live by title (case-insensitive); clear (×) button appears when search is non-empty.
- Closed filter with no closed bugs shows "No bugs matched." in the table.
- Delete opens nested "Delete bug" confirmation with bug ID and title in the message.
- Logout returns to `/login`; visiting `/board` while logged out redirects to `/login`.
