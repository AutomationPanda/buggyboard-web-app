# Search Test Plan

**Related spec:** [11-search-board.md](../features/11-search-board.md)  
**Page objects:** `LoginPage`, `BoardPage`

## Scope

Verify live title search, normalization rules, clear control, sort preservation, and no-results messaging.

**Precondition for all cases:** User is authenticated and on `/board` with bugs in the database.

---

## Basic filtering

### SEARCH-001 — Blank search shows all bugs (P0)

| Step | Action |
| --- | --- |
| Arrange | Search field is empty; multiple bugs exist. |
| Act | View the board table. |
| Assert | All bugs are displayed; no "no bugs matched" message. |

---

### SEARCH-002 — Typing filters bugs by title (P0)

| Step | Action |
| --- | --- |
| Arrange | Bugs include "Engine is on fire" and others. |
| Act | Type `engine` in the search field. |
| Assert | Only bugs whose titles contain "engine" (after normalization) are shown; others are hidden. |

**Observed:** Searching `engine` shows only bug #1 "Engine is on fire".

---

### SEARCH-003 — Search is case insensitive (P1)

| Step | Action |
| --- | --- |
| Arrange | Bug titled "Engine is on fire" exists. |
| Act | Search for `ENGINE` or `engine`. |
| Assert | Matching bug is displayed in both cases. |

---

### SEARCH-004 — Search normalizes whitespace and punctuation (P1)

| Step | Action |
| --- | --- |
| Arrange | Bugs titled "Login fails" and "Issue with log-in" exist (seed data). |
| Act | Search for `login`. |
| Assert | Both titles match despite case, spacing, or hyphenation differences. |

---

## Clear control

### SEARCH-005 — Clear (×) button appears when search is non-empty (P1)

| Step | Action |
| --- | --- |
| Arrange | Search field is blank. |
| Act | Type any text in the search field. |
| Assert | "Clear search" (×) button appears next to the field. |

**Observed:** Button labeled "Clear search" with × symbol.

---

### SEARCH-006 — Clear search resets the board (P0)

| Step | Action |
| --- | --- |
| Arrange | Search field contains text filtering the board. |
| Act | Click the × clear control. |
| Assert | Search field is blank; all bugs (respecting state filter) are displayed again. |

---

## Interaction with sort and state filter

### SEARCH-007 — Sort order preserved while searching (P1)

| Step | Action |
| --- | --- |
| Arrange | Board sorted by Title ascending (↑ on Title header). |
| Act | Enter search text matching multiple bugs. |
| Assert | Matching bugs remain in Title ascending order; sort indicator unchanged. |

**Observed:** After sorting by Title then searching `engine`, Title ↑ indicator remains.

---

### SEARCH-008 — Search applies within active state filter (P1)

| Step | Action |
| --- | --- |
| Arrange | Open and Closed bugs exist; state filter set to Open. |
| Act | Search for text matching both an open and a closed bug. |
| Assert | Only open bugs matching the query are shown. |

---

## No results

### SEARCH-009 — No matches shows message instead of rows (P0)

| Step | Action |
| --- | --- |
| Arrange | Bugs exist on the board. |
| Act | Search for text that matches no bug title (e.g. `zzznomatch`). |
| Assert | Table shows "No bugs matched." (or equivalent message); no bug data rows. |
