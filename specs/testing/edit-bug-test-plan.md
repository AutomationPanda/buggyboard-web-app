# Edit Bug Test Plan

**Related spec:** [09-edit-bug.md](../features/09-edit-bug.md)  
**Page objects:** `LoginPage`, `BoardPage`, `EditBugModal`

## Scope

Verify opening a bug from the board, modal field behavior, save/cancel rules, and dismiss behavior.

**Precondition for all cases:** User is authenticated, on `/board`, and at least one bug exists.

---

## Open modal

### EDIT-001 — Clicking bug row opens edit modal with correct title (P0)

| Step | Action |
| --- | --- |
| Arrange | Bug #1 exists on the board. |
| Act | Click the row for bug #1. |
| Assert | Modal title is "Edit bug #1"; fields show that bug's data. |

**Observed:** Modal includes ID, Title, Severity, State, Owner, Description, Delete, Cancel, Save.

---

### EDIT-002 — ID field is read-only (P0)

| Step | Action |
| --- | --- |
| Arrange | Edit modal is open for a bug. |
| Act | Attempt to modify the ID field. |
| Assert | ID is displayed but cannot be edited. |

---

### EDIT-003 — Other fields are editable (P0)

| Step | Action |
| --- | --- |
| Arrange | Edit modal is open. |
| Act | Inspect Title, Severity, State, Owner, Description fields. |
| Assert | All fields except ID are editable. |

---

### EDIT-004 — Severity dropdown uses color-coded options (P1)

| Step | Action |
| --- | --- |
| Arrange | Edit modal is open. |
| Act | Inspect Severity dropdown styling for the selected value. |
| Assert | Selected severity uses the same color tokens as board badges (HIGH/MID/LOW). |

---

## Save behavior

### EDIT-005 — Save persists changes and closes modal (P0)

| Step | Action |
| --- | --- |
| Arrange | Edit modal is open for a bug. |
| Act | Change the title; click Save. |
| Assert | Modal closes; board row reflects updated title; change persists after refresh. |

---

### EDIT-006 — Save button disabled when no changes (P0)

| Step | Action |
| --- | --- |
| Arrange | Edit modal is open; no fields modified. |
| Act | Inspect Save button state. |
| Assert | Save button is disabled. |

**Observed:** Save is `[disabled]` when modal first opens with unchanged data.

---

### EDIT-007 — Save button disabled when required field cleared (P0)

| Step | Action |
| --- | --- |
| Arrange | Edit modal is open. |
| Act | Clear title (or another required field). |
| Assert | Save button is disabled; user cannot save until all required fields are filled. |

---

## Cancel / dismiss without saving

### EDIT-008 — Cancel discards changes (P0)

| Step | Action |
| --- | --- |
| Arrange | Edit modal is open; user modified fields. |
| Act | Click Cancel. |
| Assert | Modal closes; board row shows original data unchanged. |

---

### EDIT-009 — Close (×) discards changes (P1)

| Step | Action |
| --- | --- |
| Arrange | Edit modal is open; user modified fields. |
| Act | Click × Close. |
| Assert | Modal closes; original bug data unchanged. |

---

### EDIT-010 — Escape key discards changes (P1)

| Step | Action |
| --- | --- |
| Arrange | Edit modal is open; user modified fields. |
| Act | Press Escape. |
| Assert | Modal closes; original bug data unchanged. |

---

### EDIT-011 — Backdrop click does not close modal (P1)

| Step | Action |
| --- | --- |
| Arrange | Edit modal is open with modified data. |
| Act | Click the dimmed backdrop. |
| Assert | Modal remains open; entered data is preserved. |

---

## State field

### EDIT-012 — State field displays and allows changing bug state (P0)

| Step | Action |
| --- | --- |
| Arrange | Edit modal is open for an Open bug. |
| Act | Change State to Closed; click Save. |
| Assert | Bug state updates in database; bug no longer appears under Open filter; appears under Closed filter. |

**Observed:** State combobox offers "Open" and "Closed".
