# Sort Test Plan

**Related spec:** [10-sort-board-columns.md](../features/10-sort-board-columns.md)  
**Page objects:** `LoginPage`, `BoardPage`

## Scope

Verify default sort, column header interaction, sort indicators, and severity-specific ordering.

**Precondition for all cases:** User is authenticated, on `/board`, with multiple bugs of varying severities.

---

## Default sort

### SORT-001 — Board loads sorted by Severity descending (P0)

| Step | Action |
| --- | --- |
| Arrange | Multiple bugs with HIGH, MID, and LOW severities exist. |
| Act | Navigate to `/board` (fresh load). |
| Assert | Bugs appear HIGH → MID → LOW; Severity header shows ↓ indicator; no other column shows an indicator. |

**Observed:** On load, order is #1 HIGH, #3 HIGH, #2 MID, #4 LOW with ↓ on Severity.

---

## Column sorting

### SORT-002 — Clicking unsorted column activates ascending sort (P0)

| Step | Action |
| --- | --- |
| Arrange | Board loaded with default Severity sort. |
| Act | Click Title column header. |
| Assert | Title header shows ↑; bugs sorted ascending by title; Severity indicator removed. |

**Observed:** Clicking Title shows ↑ on Title; Severity ↓ disappears.

---

### SORT-003 — Second click toggles to descending (P0)

| Step | Action |
| --- | --- |
| Arrange | Board sorted by Title ascending. |
| Act | Click Title column header again. |
| Assert | Title header shows ↓; bugs sorted descending by title. |

---

### SORT-004 — Only one column sorted at a time (P1)

| Step | Action |
| --- | --- |
| Arrange | Board sorted by Title (indicator on Title). |
| Act | Click Owner column header. |
| Assert | Owner shows sort indicator; Title indicator removed; bugs sorted by owner only. |

---

### SORT-005 — All four columns are sortable (P1)

| Step | Action |
| --- | --- |
| Arrange | Multiple bugs on the board. |
| Act | Click each of ID, Severity, Title, Owner headers in separate runs. |
| Assert | Each column activates sorting with appropriate indicator and row order. |

---

## Severity-specific ordering

### SORT-006 — Severity ascending order is LOW → MID → HIGH (P1)

| Step | Action |
| --- | --- |
| Arrange | Bugs with HIGH, MID, LOW exist; default is Severity desc. |
| Act | Click Severity header once (ascending). |
| Assert | Rows appear LOW, then MID, then HIGH. |

---

### SORT-007 — Severity descending order is HIGH → MID → LOW (P1)

| Step | Action |
| --- | --- |
| Arrange | Board sorted by Severity ascending. |
| Act | Click Severity header again (descending). |
| Assert | Rows appear HIGH, then MID, then HIGH. |

---

## Interaction with filters

### SORT-008 — Sort applies within active state filter (P1)

| Step | Action |
| --- | --- |
| Arrange | Open and Closed bugs exist; filter set to Open. |
| Act | Sort by Title ascending. |
| Assert | Only open bugs are shown, sorted by title. |

---

### SORT-009 — Sort preserved during search (P1)

| Step | Action |
| --- | --- |
| Arrange | Board sorted by a column; search active. |
| Act | View filtered results. |
| Assert | Matching bugs follow the active sort order; sort indicator unchanged. |

See also [search-test-plan.md](search-test-plan.md) SEARCH-007.
