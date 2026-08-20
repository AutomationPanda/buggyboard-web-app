# Create Bug Test Plan

## Application Overview

New Bug opens a `Create bug` dialog: Title, Severity (HIGH / MID / LOW, default MID), Owner (defaults to the signed-in user), Description, Save, Cancel, and Close (`×`). Escape and Cancel discard. Backdrop clicks do not close the dialog. All fields are required.

Use a unique title in mutating scenarios so tests stay independent.

## Test Scenarios

### 1. Open modal

**Seed:** `tests/seed-authenticated.spec.ts`

#### 1.1. should-open-create-bug-modal-from-title-bar

**File:** `tests/create-bug/should-open-create-bug-modal-from-title-bar.spec.ts`

**Steps:**
  1. Click New Bug
    - expect: a dialog titled `Create bug` is visible
    - expect: Title textbox is visible
    - expect: Severity combobox is visible with options HIGH, MID, and LOW
    - expect: Owner textbox is visible
    - expect: Description textbox is visible
    - expect: Save and Cancel buttons are visible
    - expect: Close (`×`) is visible

#### 1.2. should-default-owner-to-current-user

**File:** `tests/create-bug/should-default-owner-to-current-user.spec.ts`

**Steps:**
  1. Click New Bug
    - expect: Owner is `buggy`
    - expect: Severity is `MID`

### 2. Save and cancel

**Seed:** `tests/seed-authenticated.spec.ts`

#### 2.1. should-save-new-bug-with-required-fields

**File:** `tests/create-bug/should-save-new-bug-with-required-fields.spec.ts`

**Steps:**
  1. Click New Bug
  2. Enter a unique title, select HIGH, keep or set owner `buggy`, enter a description
  3. Click Save
    - expect: the Create bug dialog is closed
    - expect: the board shows a row with that title, severity HIGH, and owner `buggy`

#### 2.2. should-cancel-without-saving

**File:** `tests/create-bug/should-cancel-without-saving.spec.ts`

**Steps:**
  1. Click New Bug and enter a unique title and description
  2. Click Cancel
    - expect: the dialog is closed
    - expect: the unique title does not appear in the bugs table

#### 2.3. should-close-without-saving-via-x

**File:** `tests/create-bug/should-close-without-saving-via-x.spec.ts`

**Steps:**
  1. Click New Bug and enter a unique title and description
  2. Click Close (`×`)
    - expect: the dialog is closed
    - expect: the unique title does not appear in the bugs table

#### 2.4. should-close-without-saving-via-escape

**File:** `tests/create-bug/should-close-without-saving-via-escape.spec.ts`

**Steps:**
  1. Click New Bug and enter a unique title and description
  2. Press Escape
    - expect: the dialog is closed
    - expect: the unique title does not appear in the bugs table

#### 2.5. should-keep-modal-open-when-clicking-backdrop

**File:** `tests/create-bug/should-keep-modal-open-when-clicking-backdrop.spec.ts`

**Steps:**
  1. Click New Bug and enter title `Keep me` and a description
  2. Click the dimmed backdrop outside the dialog
    - expect: the Create bug dialog remains open
    - expect: Title still contains `Keep me`

### 3. Validation

**Seed:** `tests/seed-authenticated.spec.ts`

#### 3.1. should-block-save-when-title-is-blank

**File:** `tests/create-bug/should-block-save-when-title-is-blank.spec.ts`

**Steps:**
  1. Click New Bug
  2. Leave Title blank; fill description (and owner if needed)
  3. Click Save
    - expect: the Create bug dialog stays open
    - expect: the user is informed that title is required

#### 3.2. should-block-save-when-owner-is-blank

**File:** `tests/create-bug/should-block-save-when-owner-is-blank.spec.ts`

**Steps:**
  1. Click New Bug
  2. Fill title and description; clear Owner
  3. Click Save
    - expect: the Create bug dialog stays open
    - expect: the user is informed that owner is required

#### 3.3. should-block-save-when-description-is-blank

**File:** `tests/create-bug/should-block-save-when-description-is-blank.spec.ts`

**Steps:**
  1. Click New Bug
  2. Fill title; leave Description blank
  3. Click Save
    - expect: the Create bug dialog stays open
    - expect: the user is informed that description is required
