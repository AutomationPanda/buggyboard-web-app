# Create Bug Test Plan

## Application Overview

BuggyBoard lets authenticated users record new bugs from the board page. Clicking **New Bug** in the title bar opens a modal dialog with fields for title, severity (HIGH / MID / LOW dropdown), owner, and description. The owner defaults to the logged-in username. Severity options display in all caps and the selected value uses the same color coding as board severity badges (CSS custom properties `--color-severity-high`, `--color-severity-mid`, `--color-severity-low`). All fields are required. **Save** persists the bug via `POST /api/bugs` and closes the modal. **Cancel**, the **Close** (×) button, and the **Escape** key close the modal without saving. Clicking the dimmed backdrop does not close the modal.

**Feature spec:** [specs/features/06-create-bug.md](../features/06-create-bug.md)

**Out of scope for these tests:** verifying that newly created bugs appear in the board table (covered by a separate feature). Database assertions should use the API (`GET /api/bugs` or the save response) rather than the board UI.

**Prerequisites:** `CreateBugModal` page object (`tests/pages/create-bug-modal.ts`) and corresponding fixture entry in `tests/fixtures/index.ts`.

## Test Scenarios

### 1. Opening the create-bug modal

**Seed:** `tests/seed.spec.ts`

#### 1.1. should-open-create-bug-modal-from-board

**File:** `tests/create-bug/should-open-create-bug-modal-from-board.spec.ts`

**Steps:**

1. Click the **New Bug** button in the board title bar.
   - expect: a dialog with heading **Create bug** is visible
   - expect: a **Title** text field is visible
   - expect: a **Severity** combobox is visible with options HIGH, MID, and LOW
   - expect: an **Owner** text field is visible
   - expect: a **Description** text field is visible
   - expect: a **Save** button is visible
   - expect: a **Cancel** button is visible
   - expect: a **Close** button (×) is visible in the modal header

---

### 2. Modal defaults

**Seed:** `tests/seed.spec.ts`

#### 2.1. should-default-owner-to-current-user

**File:** `tests/create-bug/should-default-owner-to-current-user.spec.ts`

**Steps:**

1. Click the **New Bug** button in the board title bar.
   - expect: the create-bug modal is visible
   - expect: the **Owner** field is pre-filled with the logged-in username (`buggy`, from the seed user)

#### 2.2. should-default-severity-to-mid

**File:** `tests/create-bug/should-default-severity-to-mid.spec.ts`

**Steps:**

1. Click the **New Bug** button in the board title bar.
   - expect: the **Severity** combobox has **MID** selected

#### 2.3. should-focus-title-field-on-open

**File:** `tests/create-bug/should-focus-title-field-on-open.spec.ts`

**Steps:**

1. Click the **New Bug** button in the board title bar.
   - expect: the **Title** text field has focus

---

### 3. Severity color coding in the modal

**Seed:** `tests/seed.spec.ts`

#### 3.1. should-display-high-severity-color-in-dropdown

**File:** `tests/create-bug/should-display-high-severity-color-in-dropdown.spec.ts`

**Steps:**

1. Click the **New Bug** button in the board title bar.
2. Select **HIGH** in the **Severity** combobox.
   - expect: the severity combobox text color is `rgb(184, 74, 46)` (matches `--color-severity-high` / `#b84a2e`)

#### 3.2. should-display-mid-severity-color-in-dropdown

**File:** `tests/create-bug/should-display-mid-severity-color-in-dropdown.spec.ts`

**Steps:**

1. Click the **New Bug** button in the board title bar.
   - expect: the severity combobox text color is `rgb(166, 124, 71)` (matches `--color-severity-mid` / `#a67c47`)

#### 3.3. should-display-low-severity-color-in-dropdown

**File:** `tests/create-bug/should-display-low-severity-color-in-dropdown.spec.ts`

**Steps:**

1. Click the **New Bug** button in the board title bar.
2. Select **LOW** in the **Severity** combobox.
   - expect: the severity combobox text color is `rgb(74, 107, 94)` (matches `--color-severity-low` / `#4a6b5e`)

---

### 4. Saving a new bug

**Seed:** `tests/seed.spec.ts`

#### 4.1. should-save-new-bug-with-all-required-fields

**File:** `tests/create-bug/should-save-new-bug-with-all-required-fields.spec.ts`

**Steps:**

1. Note the current bug count via `GET /api/bugs` (or capture the highest existing bug ID).
2. Click the **New Bug** button in the board title bar.
3. Enter `Login fails with special characters` in the **Title** field.
4. Select **HIGH** in the **Severity** combobox.
5. Enter `When I use < and > in my password, login fails.` in the **Description** field.
6. Click the **Save** button.
   - expect: `POST /api/bugs` completes with status 200 or 201
   - expect: the response body includes the entered title, severity `HIGH`, owner `buggy`, and description
   - expect: the response body includes a unique integer `id`
   - expect: the create-bug modal is no longer visible
   - expect: a subsequent `GET /api/bugs` includes the new bug

---

### 5. Dismissing the modal without saving

**Seed:** `tests/seed.spec.ts`

#### 5.1. should-cancel-create-bug-without-saving

**File:** `tests/create-bug/should-cancel-create-bug-without-saving.spec.ts`

**Steps:**

1. Note the current bug count via `GET /api/bugs`.
2. Click the **New Bug** button in the board title bar.
3. Enter `Temporary title` in the **Title** field.
4. Enter `Temporary description` in the **Description** field.
5. Click the **Cancel** button.
   - expect: the create-bug modal is no longer visible
   - expect: no `POST /api/bugs` request was sent during this test
   - expect: the bug count from step 1 is unchanged

#### 5.2. should-close-create-bug-modal-with-x-button

**File:** `tests/create-bug/should-close-create-bug-modal-with-x-button.spec.ts`

**Steps:**

1. Note the current bug count via `GET /api/bugs`.
2. Click the **New Bug** button in the board title bar.
3. Enter `Temporary title` in the **Title** field.
4. Enter `Temporary description` in the **Description** field.
5. Click the **Close** button (×) in the upper-right corner of the modal.
   - expect: the create-bug modal is no longer visible
   - expect: no `POST /api/bugs` request was sent during this test
   - expect: the bug count from step 1 is unchanged

#### 5.3. should-close-create-bug-modal-with-escape-key

**File:** `tests/create-bug/should-close-create-bug-modal-with-escape-key.spec.ts`

**Steps:**

1. Note the current bug count via `GET /api/bugs`.
2. Click the **New Bug** button in the board title bar.
3. Enter `Temporary title` in the **Title** field.
4. Enter `Temporary description` in the **Description** field.
5. Press the **Escape** key.
   - expect: the create-bug modal is no longer visible
   - expect: no `POST /api/bugs` request was sent during this test
   - expect: the bug count from step 1 is unchanged

---

### 6. Backdrop interaction

**Seed:** `tests/seed.spec.ts`

#### 6.1. should-not-close-modal-when-clicking-backdrop

**File:** `tests/create-bug/should-not-close-modal-when-clicking-backdrop.spec.ts`

**Steps:**

1. Click the **New Bug** button in the board title bar.
2. Enter `Preserved title` in the **Title** field.
3. Select **HIGH** in the **Severity** combobox.
4. Enter `Preserved description` in the **Description** field.
5. Click the dimmed backdrop area outside the modal panel (`.bug-modal-overlay`).
   - expect: the create-bug modal remains visible
   - expect: the **Title** field still contains `Preserved title`
   - expect: the **Severity** combobox still has **HIGH** selected
   - expect: the **Description** field still contains `Preserved description`

---

### 7. Required-field validation

**Seed:** `tests/seed.spec.ts`

#### 7.1. should-block-save-when-title-is-blank

**File:** `tests/create-bug/should-block-save-when-title-is-blank.spec.ts`

**Steps:**

1. Click the **New Bug** button in the board title bar.
2. Leave the **Title** field blank.
3. Select **HIGH** in the **Severity** combobox.
4. Ensure the **Owner** field contains `buggy`.
5. Enter `Valid description` in the **Description** field.
6. Click the **Save** button.
   - expect: no successful `POST /api/bugs` request is made
   - expect: the create-bug modal remains visible
   - expect: an alert lists **Title is required.**

#### 7.2. should-block-save-when-severity-is-blank

**File:** `tests/create-bug/should-block-save-when-severity-is-blank.spec.ts`

**Steps:**

1. Click the **New Bug** button in the board title bar.
2. Enter `Valid title` in the **Title** field.
3. Clear the **Severity** selection (remove the selected option via DOM manipulation or equivalent so no severity is chosen).
4. Ensure the **Owner** field contains `buggy`.
5. Enter `Valid description` in the **Description** field.
6. Click the **Save** button.
   - expect: no successful `POST /api/bugs` request is made
   - expect: the create-bug modal remains visible
   - expect: an alert lists **Severity is required.**

#### 7.3. should-block-save-when-owner-is-blank

**File:** `tests/create-bug/should-block-save-when-owner-is-blank.spec.ts`

**Steps:**

1. Click the **New Bug** button in the board title bar.
2. Enter `Valid title` in the **Title** field.
3. Select **HIGH** in the **Severity** combobox.
4. Clear the **Owner** field.
5. Enter `Valid description` in the **Description** field.
6. Click the **Save** button.
   - expect: no successful `POST /api/bugs` request is made
   - expect: the create-bug modal remains visible
   - expect: an alert lists **Owner is required.**

#### 7.4. should-block-save-when-description-is-blank

**File:** `tests/create-bug/should-block-save-when-description-is-blank.spec.ts`

**Steps:**

1. Click the **New Bug** button in the board title bar.
2. Enter `Valid title` in the **Title** field.
3. Select **HIGH** in the **Severity** combobox.
4. Ensure the **Owner** field contains `buggy`.
5. Leave the **Description** field blank.
6. Click the **Save** button.
   - expect: no successful `POST /api/bugs` request is made
   - expect: the create-bug modal remains visible
   - expect: an alert lists **Description is required.**

#### 7.5. should-block-save-when-all-fields-are-blank

**File:** `tests/create-bug/should-block-save-when-all-fields-are-blank.spec.ts`

**Steps:**

1. Click the **New Bug** button in the board title bar.
2. Clear the **Title** field.
3. Clear the **Owner** field.
4. Leave the **Description** field blank.
5. Click the **Save** button.
   - expect: no successful `POST /api/bugs` request is made
   - expect: the create-bug modal remains visible
   - expect: an alert lists all applicable required-field messages (Title, Owner, Description)

#### 7.6. should-block-save-when-fields-contain-only-whitespace

**File:** `tests/create-bug/should-block-save-when-fields-contain-only-whitespace.spec.ts`

**Steps:**

1. Click the **New Bug** button in the board title bar.
2. Enter `   ` (spaces only) in the **Title** field.
3. Select **MID** in the **Severity** combobox.
4. Enter `   ` (spaces only) in the **Owner** field.
5. Enter `   ` (spaces only) in the **Description** field.
6. Click the **Save** button.
   - expect: no successful `POST /api/bugs` request is made
   - expect: the create-bug modal remains visible
   - expect: validation errors are shown for the whitespace-only required fields
