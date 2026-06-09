# Create Bug Test Plan

## Application Overview

Authenticated users create bugs from the board page by clicking **New Bug** in the title bar. A modal dialog titled "Create bug" collects Title, Severity (dropdown defaulting to MID), Owner (pre-filled with the logged-in user), and Description. All fields are required. Save persists the bug via `POST /api/bugs` and closes the modal; Cancel, the X button, and Escape close without saving. Clicking the backdrop does not close the modal.

## Test Scenarios

### 1. Opening the modal

**Seed:** `tests/seed-authenticated.spec.ts`

#### 1.1. open-modal-from-new-bug-button

**File:** `tests/create-bug/open-modal.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click the New Bug button
    - expect: dialog "Create bug" is visible
    - expect: Title, Severity, Owner, and Description fields are visible
    - expect: Save and Cancel buttons are visible

#### 1.2. owner-defaults-to-current-user

**File:** `tests/create-bug/owner-default.spec.ts`

**Steps:**
  1. Start authenticated on `/board` as `buggy` (via seed)
  2. Click the New Bug button
    - expect: Owner field value is `buggy`

#### 1.3. severity-defaults-to-mid

**File:** `tests/create-bug/severity-default.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click the New Bug button
    - expect: Severity dropdown selected value is "MID"

### 2. Saving a bug

**Seed:** `tests/seed-authenticated.spec.ts`

#### 2.1. save-bug-with-all-fields

**File:** `tests/create-bug/save-bug.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click the New Bug button
  3. Type a unique title (e.g. `Test bug ${timestamp}`) into the Title field
  4. Select "HIGH" in the Severity dropdown
  5. Type a description into the Description field
  6. Click the Save button
    - expect: Create bug dialog is closed
    - expect: the new bug title appears in the bugs table

### 3. Closing without saving

**Seed:** `tests/seed-authenticated.spec.ts`

#### 3.1. cancel-closes-without-saving

**File:** `tests/create-bug/cancel.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click the New Bug button
  3. Type a unique title into the Title field
  4. Click the Cancel button
    - expect: Create bug dialog is closed
    - expect: the entered title does not appear in the bugs table

#### 3.2. close-button-closes-without-saving

**File:** `tests/create-bug/close-button.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click the New Bug button
  3. Type a unique title into the Title field
  4. Click the Close (X) button
    - expect: Create bug dialog is closed
    - expect: the entered title does not appear in the bugs table

#### 3.3. escape-key-closes-without-saving

**File:** `tests/create-bug/escape-key.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click the New Bug button
  3. Type a unique title into the Title field
  4. Press the Escape key
    - expect: Create bug dialog is closed
    - expect: the entered title does not appear in the bugs table

#### 3.4. backdrop-click-does-not-close

**File:** `tests/create-bug/backdrop-click.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click the New Bug button
  3. Type a unique title into the Title field
  4. Click the dimmed backdrop area outside the modal
    - expect: Create bug dialog remains open
    - expect: the entered title is still in the Title field

### 4. Validation

**Seed:** `tests/seed-authenticated.spec.ts`

#### 4.1. save-blocked-when-fields-blank

**File:** `tests/create-bug/validation-blank.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click the New Bug button
  3. Leave all fields at their defaults but clear the Title field
  4. Click the Save button
    - expect: Create bug dialog remains open
    - expect: alert lists "Title is required."

#### 4.2. title-field-required

**File:** `tests/create-bug/validation-title-required.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click the New Bug button
  3. Clear the Title field
  4. Fill Owner and Description with valid values
  5. Click the Save button
    - expect: Create bug dialog remains open
    - expect: alert includes "Title is required."

#### 4.3. owner-field-required

**File:** `tests/create-bug/validation-owner-required.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click the New Bug button
  3. Fill Title and Description with valid values
  4. Clear the Owner field
  5. Click the Save button
    - expect: Create bug dialog remains open
    - expect: alert includes "Owner is required."

#### 4.4. description-field-required

**File:** `tests/create-bug/validation-description-required.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click the New Bug button
  3. Fill Title with a valid value
  4. Clear the Description field
  5. Click the Save button
    - expect: Create bug dialog remains open
    - expect: alert includes "Description is required."

### 5. Bug state on create

**Seed:** `tests/seed-authenticated.spec.ts`

#### 5.1. new-bug-created-with-open-state

**File:** `tests/create-bug/new-bug-open-state.spec.ts`

**Steps:**
  1. Start authenticated on `/board` with Open state filter selected (via seed)
  2. Click the New Bug button
  3. Fill all required fields with a unique title
  4. Click the Save button
    - expect: the new bug appears in the table while Open filter is selected
  5. Select the Closed state filter
    - expect: the newly created bug is not visible in the table
