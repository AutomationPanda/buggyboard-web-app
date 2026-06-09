# Board Test Plan

**Related spec:** [04-title-bar.md](../features/04-title-bar.md), [07-bug-board.md](../features/07-bug-board.md), [08-board-severity.md](../features/08-board-severity.md)  
**Page objects:** `LoginPage`, `BoardPage`

## Scope

Verify the board page layout, title bar, bug table structure, data display, and severity color-coding.

**Precondition for all cases:** User is authenticated and on `/board`.

---

## Title bar

### BOARD-001 — Title bar displays logo, app name, and actions (P0)

| Step | Action |
| --- | --- |
| Arrange | Log in and navigate to `/board`. |
| Act | Observe the title bar. |
| Assert | Logo image, "BuggyBoard" heading, search field, "New Bug" button, and "Logout" button are visible. |

**Observed:** Title bar contains `img "BuggyBoard"`, heading "BuggyBoard", search "Search bugs by title", button "New Bug", button "Logout".

---

## Bug table structure

### BOARD-002 — Table displays correct columns in order (P0)

| Step | Action |
| --- | --- |
| Arrange | User is on `/board` with bugs in the database. |
| Act | Inspect the bug table header. |
| Assert | Columns appear left-to-right: ID, Severity, Title, Owner. |

---

### BOARD-003 — Table shows one row per bug (P0)

| Step | Action |
| --- | --- |
| Arrange | Database contains multiple bugs. |
| Act | View the board table. |
| Assert | Each bug appears as one clickable row with ID, severity, title, and owner cells. |

**Observed:** Sample data includes bugs #1 (HIGH), #3 (HIGH), #2 (MID), #4 (LOW).

---

### BOARD-004 — Empty table when no bugs exist (P1)

| Step | Action |
| --- | --- |
| Arrange | Database has no bugs (seed empty state). |
| Act | View the board table. |
| Assert | Table structure is present with header row and no data rows. |

---

### BOARD-005 — Severity displayed in ALL CAPS (P1)

| Step | Action |
| --- | --- |
| Arrange | At least one bug with severity `high` exists in the database. |
| Act | View the board table. |
| Assert | Severity cell displays "HIGH" (not "high"). |

**Observed:** All severity values render as HIGH, MID, or LOW.

---

## Severity color-coding

### BOARD-006 — Each severity level has distinct color styling (P1)

| Step | Action |
| --- | --- |
| Arrange | Bugs with HIGH, MID, and LOW severities exist. |
| Act | View severity badges on the board. |
| Assert | HIGH, MID, and LOW each have distinct color styling; HIGH appears most prominent. |

---

### BOARD-007 — Severity colors use design system tokens (P2)

| Step | Action |
| --- | --- |
| Arrange | Board page is loaded. |
| Act | Inspect severity badge computed styles. |
| Assert | Colors map to CSS custom properties `--color-severity-high`, `--color-severity-mid`, `--color-severity-low`. |

**Expected colors:** HIGH `#b84a2e`, MID `#a67c47`, LOW `#4a6b5e`.

---

## Row interaction

### BOARD-008 — Clicking a bug row opens edit modal (P0)

| Step | Action |
| --- | --- |
| Arrange | At least one bug is listed on the board. |
| Act | Click the bug's row. |
| Assert | "Edit bug #&lt;id&gt;" modal opens for that bug. |

**Observed:** Row acts as a button (e.g. `button "1 HIGH Engine is on fire buggy"`).
