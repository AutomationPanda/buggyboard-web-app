# Delete Bug Test Plan

## Application Overview

Edit bug includes Delete. That opens a `Delete bug` confirmation: `Are you sure you want to delete bug #<id>: <title>?` Confirming removes the bug and closes both dialogs. Cancel returns to the edit dialog and leaves the row on the board.

## Test Scenarios

### 1. Delete

**Seed:** `tests/seed-authenticated.spec.ts`

#### 1.1. should-show-delete-button-on-edit-modal

**File:** `tests/delete-bug/should-show-delete-button-on-edit-modal.spec.ts`

**Steps:**
  1. Open a bug from the board
    - expect: a Delete button is visible in the edit dialog

#### 1.2. should-open-delete-confirmation-with-id-and-title

**File:** `tests/delete-bug/should-open-delete-confirmation-with-id-and-title.spec.ts`

**Steps:**
  1. Open a known bug (for example ID 1 titled `Engine is on fire`, or a uniquely created bug)
  2. Click Delete
    - expect: a dialog titled `Delete bug` is visible
    - expect: the message includes the bug ID and title (`Are you sure you want to delete bug #<id>: <title>?`)
    - expect: Delete and Cancel buttons are visible

#### 1.3. should-remove-bug-when-deletion-is-confirmed

**File:** `tests/delete-bug/should-remove-bug-when-deletion-is-confirmed.spec.ts`

**Steps:**
  1. Create a unique open bug to delete
  2. Open it, click Delete, then confirm Delete
    - expect: both dialogs are closed
    - expect: the unique title is gone from the board

#### 1.4. should-keep-bug-when-deletion-is-cancelled

**File:** `tests/delete-bug/should-keep-bug-when-deletion-is-cancelled.spec.ts`

**Steps:**
  1. Open a bug, click Delete, then click Cancel on the confirmation
    - expect: the confirmation dialog is gone
    - expect: the edit dialog is still open with the same title
    - expect: after closing edit, the board still lists that bug
