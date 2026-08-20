# Edit Bug Test Plan

## Application Overview

Clicking a board row opens `Edit bug #<id>` with read-only ID, editable Title, Severity, State, Owner, and Description. Save stays disabled until something changes and stays disabled if a required field is cleared. Cancel, Close (`×`), and Escape discard edits. Backdrop clicks do not close the dialog.

## Test Scenarios

### 1. Open and fields

**Seed:** `tests/seed-authenticated.spec.ts`

#### 1.1. should-open-edit-modal-from-board-row

**File:** `tests/edit-bug/should-open-edit-modal-from-board-row.spec.ts`

**Steps:**
  1. Click a visible bug row (create a unique open bug first if the board is empty)
    - expect: a dialog titled `Edit bug #<id>` is visible using that row’s ID
    - expect: ID, Title, Severity, Owner, and Description show the row’s data
    - expect: Save and Cancel are visible

#### 1.2. should-keep-id-read-only-and-other-fields-editable

**File:** `tests/edit-bug/should-keep-id-read-only-and-other-fields-editable.spec.ts`

**Steps:**
  1. Open a bug from the board
    - expect: the ID textbox is read-only
    - expect: Title, Severity, Owner, and Description are editable
    - expect: Severity is a combobox with HIGH, MID, and LOW

#### 1.3. should-color-code-selected-severity-in-edit-modal

**File:** `tests/edit-bug/should-color-code-selected-severity-in-edit-modal.spec.ts`

**Steps:**
  1. Open a HIGH bug
    - expect: the selected Severity control uses `--color-severity-high`
  2. Change Severity to MID, then LOW
    - expect: the selected value uses the matching severity token each time

#### 1.4. should-keep-edit-modal-open-when-clicking-backdrop

**File:** `tests/edit-bug/should-keep-edit-modal-open-when-clicking-backdrop.spec.ts`

**Steps:**
  1. Open a bug and change Title to `Edited in place`
  2. Click the dimmed backdrop
    - expect: the edit dialog remains open
    - expect: Title is still `Edited in place`

### 2. Save and discard

**Seed:** `tests/seed-authenticated.spec.ts`

#### 2.1. should-save-bug-edits

**File:** `tests/edit-bug/should-save-bug-edits.spec.ts`

**Steps:**
  1. Create or open a unique bug
  2. Change Title to a new unique value and click Save
    - expect: the dialog closes
    - expect: the board row shows the new title

#### 2.2. should-cancel-without-saving-edits

**File:** `tests/edit-bug/should-cancel-without-saving-edits.spec.ts`

**Steps:**
  1. Open a bug and note its title
  2. Change Title and click Cancel
    - expect: the dialog closes
    - expect: the board still shows the original title

#### 2.3. should-discard-edits-via-x

**File:** `tests/edit-bug/should-discard-edits-via-x.spec.ts`

**Steps:**
  1. Open a bug and change Title
  2. Click Close (`×`)
    - expect: the dialog closes
    - expect: the board still shows the original title

#### 2.4. should-discard-edits-via-escape

**File:** `tests/edit-bug/should-discard-edits-via-escape.spec.ts`

**Steps:**
  1. Open a bug and change Title
  2. Press Escape
    - expect: the dialog closes
    - expect: the board still shows the original title

#### 2.5. should-disable-save-when-unchanged

**File:** `tests/edit-bug/should-disable-save-when-unchanged.spec.ts`

**Steps:**
  1. Open a bug without editing
    - expect: Save is disabled

#### 2.6. should-disable-save-when-a-required-field-is-blank

**File:** `tests/edit-bug/should-disable-save-when-a-required-field-is-blank.spec.ts`

**Steps:**
  1. Open a bug and clear Title
    - expect: Save is disabled
  2. Restore Title, then clear Owner or Description
    - expect: Save is disabled until every required field is filled
