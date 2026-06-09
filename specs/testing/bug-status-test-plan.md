# Bug Status Test Plan

**Related spec:** [13-bug-status.md](../features/13-bug-status.md)  
**Page objects:** `LoginPage`, `BoardPage`, `CreateBugModal`, `EditBugModal`

## Scope

Verify Open/Closed state on creation, state filter on the board, edit-modal state changes, and combined filter/search/sort behavior.

**Precondition for most cases:** User is authenticated and on `/board`.

---

## Creation defaults

### STATUS-001 — New bugs created with Open state (P0)

| Step | Action |
| --- | --- |
| Arrange | State filter set to Open (default). |
| Act | Create and save a new bug via New Bug modal. |
| Assert | Bug appears in the Open filter view; State in edit modal is Open. |

---

## State filter on board

### STATUS-002 — State filter defaults to Open (P0)

| Step | Action |
| --- | --- |
| Arrange | Database has open bugs. |
| Act | Navigate to `/board`. |
| Assert | "Open" toggle is selected; only open bugs appear in the table. |

**Observed:** Open button is active by default; closed bugs are hidden.

---

### STATUS-003 — Closed filter shows only closed bugs (P0)

| Step | Action |
| --- | --- |
| Arrange | At least one bug has been closed via edit modal. |
| Act | Click "Closed" in the state filter. |
| Assert | Only closed bugs appear; open bugs are hidden. |

---

### STATUS-004 — Switching back to Open restores open bug view (P1)

| Step | Action |
| --- | --- |
| Arrange | State filter set to Closed. |
| Act | Click "Open" in the state filter. |
| Assert | Open bugs are displayed; closed bugs hidden. |

---

## Edit modal state

### STATUS-005 — Edit modal displays current state (P0)

| Step | Action |
| --- | --- |
| Arrange | Open edit modal for an Open bug. |
| Act | Inspect State field. |
| Assert | State combobox shows "Open" selected; "Closed" is available. |

**Observed:** State combobox with Open and Closed options.

---

### STATUS-006 — Saving state change updates filter views (P0)

| Step | Action |
| --- | --- |
| Arrange | Bug is Open and visible under Open filter. |
| Act | Open edit modal; change State to Closed; Save. |
| Assert | Bug disappears from Open view; appears when Closed filter is selected. |

---

## Combined behaviors

### STATUS-007 — Sort works with state filter active (P1)

| Step | Action |
| --- | --- |
| Arrange | State filter set to Open; multiple open bugs exist. |
| Act | Sort by Title ascending. |
| Assert | Only open bugs shown, in Title ascending order. |

---

### STATUS-008 — Search and state filter apply together (P1)

| Step | Action |
| --- | --- |
| Arrange | Open and closed bugs with overlapping title keywords exist. |
| Act | Set state filter to Open; search for a shared keyword. |
| Assert | Only open bugs matching the search query are displayed. |

---

## No results

### STATUS-009 — No closed bugs shows no-results message (P0)

| Step | Action |
| --- | --- |
| Arrange | All bugs in database are Open (none Closed). |
| Act | Select "Closed" in the state filter. |
| Assert | Table shows "No bugs matched."; no bug data rows. |

**Observed:** With all bugs open, Closed filter displays "No bugs matched." in the table body.

---

### STATUS-010 — No-results message when search + filter yield nothing (P1)

| Step | Action |
| --- | --- |
| Arrange | State filter set to Closed; no closed bugs match search term. |
| Act | Enter search text in the search field. |
| Assert | "No bugs matched." message displayed; no data rows. |
