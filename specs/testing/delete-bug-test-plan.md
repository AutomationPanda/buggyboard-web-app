# Delete Bug Test Plan

**Related spec:** [12-delete-bug.md](../features/12-delete-bug.md)  
**Page objects:** `LoginPage`, `BoardPage`, `EditBugModal`

## Scope

Verify delete button visibility, confirmation modal behavior, and confirm/cancel outcomes.

**Precondition for all cases:** User is authenticated, on `/board`, and at least one bug exists.

---

## Delete button and confirmation

### DELETE-001 — Edit modal displays Delete button (P0)

| Step | Action |
| --- | --- |
| Arrange | Open edit modal for any bug. |
| Act | Inspect modal actions. |
| Assert | Delete button is visible alongside Cancel and Save. |

---

### DELETE-002 — Delete opens confirmation modal with bug details (P0)

| Step | Action |
| --- | --- |
| Arrange | Edit modal is open for bug #1 ("Engine is on fire"). |
| Act | Click Delete. |
| Assert | "Delete bug" confirmation dialog appears with message referencing bug ID and title; Delete and Cancel buttons are present. |

**Observed:** Message reads `Are you sure you want to delete bug #1: Engine is on fire?`

---

## Confirm deletion

### DELETE-003 — Confirming deletion removes bug and closes modals (P0)

| Step | Action |
| --- | --- |
| Arrange | Edit modal open; confirmation modal displayed for a bug. |
| Act | Click Delete in the confirmation modal. |
| Assert | Both modals close; bug row disappears from board; bug is removed from database (not returned by API / not visible after refresh). |

---

## Cancel deletion

### DELETE-004 — Canceling confirmation keeps bug intact (P0)

| Step | Action |
| --- | --- |
| Arrange | Edit modal open; confirmation modal displayed. |
| Act | Click Cancel in the confirmation modal. |
| Assert | Confirmation modal closes; edit modal remains open with original data; bug still appears on board. |

**Observed:** Cancel in confirmation returns to edit modal without deleting.

---

### DELETE-005 — Close (×) on confirmation dismisses without deleting (P1)

| Step | Action |
| --- | --- |
| Arrange | Confirmation modal is displayed. |
| Act | Click × Close on the confirmation dialog. |
| Assert | Confirmation dismissed; bug not deleted; edit modal still accessible. |
