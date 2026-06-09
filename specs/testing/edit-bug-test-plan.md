# Edit Bug Test Plan

## Application Overview

Users open a bug for editing by clicking its row in the board table. The "Edit bug #&lt;id&gt;" modal shows the bug's ID as read-only plus editable Title, Severity, State, Owner, and Description fields. Severity uses the same color-coded dropdown as create. Save is disabled when there are no changes or when any required field is blank. Cancel, X, and Escape close without saving; backdrop clicks do not close the modal.

## Test Scenarios

### 1. Opening the modal

**Seed:** `tests/seed-authenticated.spec.ts`

#### 1.1. open-modal-by-clicking-row

**File:** `tests/edit-bug/open-modal.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Ensure at least one bug exists in the table
  3. Click a bug row
    - expect: dialog title matches pattern "Edit bug #&lt;id&gt;"
    - expect: ID, Title, Severity, State, Owner, and Description fields are visible
    - expect: Save, Cancel, and Delete buttons are visible

#### 1.2. id-field-is-read-only

**File:** `tests/edit-bug/id-read-only.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click a bug row to open the edit modal
    - expect: ID field is read-only (cannot be edited)
    - expect: Title field is editable

#### 1.3. severity-dropdown-has-color-coding

**File:** `tests/edit-bug/severity-color-coding.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click a bug row with severity HIGH to open the edit modal
    - expect: Severity combobox shows "HIGH" selected
    - expect: severity dropdown has styling class consistent with `severity-select-high`

### 2. Saving changes

**Seed:** `tests/seed-authenticated.spec.ts`

#### 2.1. save-updates-bug-and-closes-modal

**File:** `tests/edit-bug/save-changes.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click a bug row to open the edit modal
  3. Change the Title to a new unique value
  4. Click the Save button
    - expect: Edit bug dialog is closed
    - expect: the updated title appears in the bugs table

#### 2.2. change-state-and-save

**File:** `tests/edit-bug/change-state.spec.ts`

**Steps:**
  1. Start authenticated on `/board` with Open filter selected (via seed)
  2. Click an open bug row to open the edit modal
  3. Change State from "Open" to "Closed"
  4. Click the Save button
    - expect: Edit bug dialog is closed
    - expect: the bug no longer appears in the table with Open filter selected
  5. Select the Closed state filter
    - expect: the bug appears in the table

### 3. Closing without saving

**Seed:** `tests/seed-authenticated.spec.ts`

#### 3.1. cancel-discards-changes

**File:** `tests/edit-bug/cancel.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click a bug row and note its original title
  3. Change the Title to a different value
  4. Click the Cancel button
    - expect: Edit bug dialog is closed
    - expect: the original title still appears in the bugs table

#### 3.2. close-button-discards-changes

**File:** `tests/edit-bug/close-button.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click a bug row and note its original title
  3. Change the Title to a different value
  4. Click the Close (X) button
    - expect: Edit bug dialog is closed
    - expect: the original title still appears in the bugs table

#### 3.3. escape-key-discards-changes

**File:** `tests/edit-bug/escape-key.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click a bug row and note its original title
  3. Change the Title to a different value
  4. Press the Escape key
    - expect: Edit bug dialog is closed
    - expect: the original title still appears in the bugs table

#### 3.4. backdrop-click-does-not-close

**File:** `tests/edit-bug/backdrop-click.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click a bug row to open the edit modal
  3. Change the Title to a different value
  4. Click the dimmed backdrop area outside the modal
    - expect: Edit bug dialog remains open
    - expect: the modified title is still in the Title field

### 4. Save button state

**Seed:** `tests/seed-authenticated.spec.ts`

#### 4.1. save-disabled-with-no-changes

**File:** `tests/edit-bug/save-disabled-no-changes.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click a bug row to open the edit modal without modifying any field
    - expect: Save button is disabled

#### 4.2. save-disabled-when-required-field-blank

**File:** `tests/edit-bug/save-disabled-blank-field.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click a bug row to open the edit modal
  3. Clear the Title field
    - expect: Save button is disabled
