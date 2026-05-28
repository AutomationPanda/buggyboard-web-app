# Progress

Checklists are updated as each feature is completed. After each feature, the AI pauses for human review.

---

## Project setup

- [x] Repo structure (frontend + backend)
- [x] Dependencies (Node, TypeScript, React, Tailwind, Express; SQLite when needed)
- [x] Linting and formatting
- [x] Run scripts (dev, build, etc.)

---

## Feature: Favicon (01-favicon.md)

- [x] Spec written in `specs/features/`
- [x] Backend implemented (N/A – frontend only)
- [x] Frontend implemented
- [x] Linter/errors resolved

---

## Feature: User accounts – data only (02-user-accounts.md)

- [x] Spec written in `specs/features/`
- [x] Backend implemented (users.json + users module; no auth yet)
- [x] Frontend implemented (N/A – data only)
- [x] Linter/errors resolved

---

## Feature: Login (03-login.md)

- [x] Spec written in `specs/features/`
- [x] Backend implemented (authService, POST /api/login)
- [x] Frontend implemented (router, auth, login page with password masking, board page)
- [x] Specs: api-conventions.md (API path prefix)
- [x] Linter/errors resolved

---

## Feature: Title bar (04-title-bar.md)

- [x] Spec written in `specs/features/`
- [x] Backend implemented (N/A – frontend only)
- [x] Frontend implemented (TitleBar with logo, title, logout; BoardPage layout)
- [x] Linter/errors resolved

---

## Feature: Logout (05-logout.md)

- [x] Spec written in `specs/features/`
- [x] Backend implemented (N/A – frontend only)
- [x] Frontend implemented (logout button in TitleBar, auth.logout(), ProtectedRoute redirect; all four scenarios satisfied)
- [x] Linter/errors resolved

---

## Feature: Create bug (06-create-bug.md)

- [x] Spec written in `specs/features/`
- [x] Backend implemented (bugs table, bugService, POST /api/bugs)
- [x] Frontend implemented (Create bug button, CreateBugModal with title/severity/owner/description, validation, save/cancel)
- [x] Linter/errors resolved

---

## Feature: Bug board (07-bug-board.md)

- [x] Spec written in `specs/features/`
- [x] Backend implemented (listBugs, GET /api/bugs)
- [x] Frontend implemented (BoardPage table: ID, Severity, Title, Owner; severity in caps; refresh on create)
- [x] Linter/errors resolved

---

## Feature: Board severity color-coding (08-board-severity.md)

- [x] Spec written in `specs/features/`
- [x] Backend implemented (N/A – frontend only)
- [x] Frontend implemented (CSS custom properties for severity colors; severity badges on board with text + tint)
- [x] Linter/errors resolved

---

## Feature: Edit bug (09-edit-bug.md)

- [x] Spec written in `specs/features/`
- [x] Backend implemented (getBug, updateBug, GET /api/bugs/:id, PUT /api/bugs/:id)
- [x] Frontend implemented (click row opens EditBugModal; ID read-only, Save/Cancel, Save disabled when no changes or blank; backdrop does not close)
- [x] Linter/errors resolved

---

## Feature: Sort board columns (10-sort-board-columns.md)

- [x] Spec written in `specs/features/`
- [x] Backend implemented (N/A – client-side sort)
- [x] Frontend implemented (default Severity desc; clickable headers; arrow indicators; severity LOW→MID→HIGH / HIGH→MID→LOW)
- [x] Linter/errors resolved

---

## Feature: Search board (11-search-board.md)

- [x] Spec written in `specs/features/`
- [x] Backend implemented (N/A – client-side filter)
- [x] Frontend implemented (search in title bar left of New Bug; live filter by title; case insensitive, collapse whitespace, normalize punctuation; X clear; sort preserved; no-results message)
- [x] Linter/errors resolved

---

## Feature: Delete bug (12-delete-bug.md)

- [x] Spec written in `specs/features/`
- [x] Backend implemented (deleteBug, DELETE /api/bugs/:id)
- [x] Frontend implemented (Delete button in Edit bug modal; removes bug, closes modal, board refreshes)
- [x] Linter/errors resolved

---

## Feature: Bug status (13-bug-status.md)

- [x] Spec written in `specs/features/`
- [x] Backend implemented (state column OPEN/CLOSED; createBug sets OPEN; updateBug/getBug/listBugs include state; PUT accepts state)
- [x] Frontend implemented (state filter toggle above board default Open; Edit modal State dropdown; search + sort apply with state filter; no-bugs-matched message)
- [x] Linter/errors resolved

---

_(Add one section per feature; copy the checklist template above.)_
