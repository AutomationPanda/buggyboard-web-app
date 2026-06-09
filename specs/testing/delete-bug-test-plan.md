# Delete Bug Test Plan

## Application Overview

The Edit bug modal includes a Delete button that opens a confirmation dialog titled "Delete bug". The confirmation message identifies the bug by ID and title (e.g. "Are you sure you want to delete bug #1: Engine is on fire?"). Confirming deletion removes the bug from the database, closes both modals, and refreshes the board. Canceling the confirmation dismisses only the confirmation dialog and leaves the edit modal open with the bug unchanged.

## Test Scenarios

### 1. Delete button and confirmation

**Seed:** `tests/seed-authenticated.spec.ts`

#### 1.1. edit-modal-shows-delete-button

**File:** `tests/delete-bug/edit-modal-shows-delete-button.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click a bug row to open the edit modal
    - expect: Delete button is visible in the edit modal

#### 1.2. delete-opens-confirmation-modal

**File:** `tests/delete-bug/delete-opens-confirmation.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click a bug row to open the edit modal
  3. Note the bug's ID and title
  4. Click the Delete button in the edit modal
    - expect: dialog "Delete bug" is visible
    - expect: confirmation message includes the bug ID and title
    - expect: Delete and Cancel buttons are visible in the confirmation dialog

### 2. Confirming deletion

**Seed:** `tests/seed-authenticated.spec.ts`

#### 2.1. confirm-delete-removes-bug

**File:** `tests/delete-bug/confirm-delete-removes-bug.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Create or identify a bug with a unique title (via API or UI)
  3. Click that bug's row to open the edit modal
  4. Click the Delete button
  5. Click the Delete button in the confirmation dialog
    - expect: both edit and confirmation dialogs are closed
    - expect: the deleted bug's title no longer appears in the bugs table

### 3. Canceling deletion

**Seed:** `tests/seed-authenticated.spec.ts`

#### 3.1. cancel-delete-keeps-bug

**File:** `tests/delete-bug/cancel-delete-keeps-bug.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click a bug row to open the edit modal
  3. Note the bug's title
  4. Click the Delete button
  5. Click the Cancel button in the confirmation dialog
    - expect: confirmation dialog is closed
    - expect: edit modal remains open with the bug's data unchanged
    - expect: the bug's title still appears in the bugs table
