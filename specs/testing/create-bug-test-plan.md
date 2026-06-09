# Create Bug Test Plan

**Related spec:** [06-create-bug.md](../features/06-create-bug.md)  
**Page objects:** `LoginPage`, `BoardPage`, `CreateBugModal`

## Scope

Verify the New Bug workflow: opening the modal, field defaults, saving, canceling, validation, and dismiss behavior.

**Precondition for all cases:** User is authenticated and on `/board`.

---

## Open modal

### CREATE-001 — New Bug button opens create modal (P0)

| Step | Action |
| --- | --- |
| Arrange | User is on `/board`. |
| Act | Click "New Bug" in the title bar. |
| Assert | "Create bug" dialog opens with Title, Severity, Owner, Description fields, Cancel, and Save buttons. |

**Observed:** Dialog title is "Create bug"; fields match spec; Close (×) button present.

---

### CREATE-002 — Owner defaults to current user (P0)

| Step | Action |
| --- | --- |
| Arrange | User is logged in as `buggy` on `/board`. |
| Act | Click "New Bug". |
| Assert | Owner field is pre-filled with `buggy`. |

**Observed:** Owner textbox shows `buggy` when logged in as default user.

---

### CREATE-003 — Severity defaults to MID (P1)

| Step | Action |
| --- | --- |
| Arrange | Create modal is open. |
| Act | Inspect Severity dropdown. |
| Assert | MID is the selected default option. |

---

## Save bug

### CREATE-004 — Save new bug with all required fields (P0)

| Step | Action |
| --- | --- |
| Arrange | Create modal is open. |
| Act | Fill title, select severity, confirm owner, fill description; click Save. |
| Assert | Modal closes; new bug appears on the board with entered data; bug is persisted (refresh confirms). |

---

### CREATE-005 — New bug appears in Open state filter (P1)

| Step | Action |
| --- | --- |
| Arrange | State filter is set to Open (default). |
| Act | Create and save a new bug. |
| Assert | New bug row is visible under the Open filter. |

---

## Cancel / dismiss without saving

### CREATE-006 — Cancel closes modal without saving (P0)

| Step | Action |
| --- | --- |
| Arrange | Create modal is open with data entered. |
| Act | Click Cancel. |
| Assert | Modal closes; no new bug appears on the board. |

---

### CREATE-007 — Close (×) button dismisses without saving (P1)

| Step | Action |
| --- | --- |
| Arrange | Create modal is open with data entered. |
| Act | Click the × Close button. |
| Assert | Modal closes; no new bug is saved. |

---

### CREATE-008 — Escape key dismisses without saving (P1)

| Step | Action |
| --- | --- |
| Arrange | Create modal is open with data entered. |
| Act | Press Escape. |
| Assert | Modal closes; no new bug is saved. |

---

### CREATE-009 — Backdrop click does not close modal (P1)

| Step | Action |
| --- | --- |
| Arrange | Create modal is open with data entered. |
| Act | Click the dimmed backdrop outside the modal. |
| Assert | Modal remains open; entered data is preserved. |

---

## Validation

### CREATE-010 — Save blocked when required fields are blank (P0)

| Step | Action |
| --- | --- |
| Arrange | Create modal is open. |
| Act | Leave one or more required fields blank; attempt Save. |
| Assert | Bug is not saved; modal stays open; user is informed which fields are required. |

---

### CREATE-011 — Each required field individually blocks save (P1)

| Step | Action |
| --- | --- |
| Arrange | Create modal is open. |
| Act | Leave `<field>` blank while filling all others; attempt Save. |
| Assert | Bug is not saved; modal stays open. |

**Data-driven fields:** title, severity, owner, description.
