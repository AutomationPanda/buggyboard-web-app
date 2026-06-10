# Create Bug Test Plan

## Application Overview

BuggyBoard lets authenticated users create new bugs from the board page. Clicking **New Bug** in the title bar opens a modal dialog with fields for title, severity (HIGH / MID / LOW dropdown), owner, and description. The owner field defaults to the logged-in username. All fields are required. Save persists the bug via `POST /api/bugs` and closes the modal; Cancel, the **×** close button, and **Escape** close without saving. Clicking the dimmed backdrop does not dismiss the modal. Severity options use the same color-coded styling as the board (`severity-select-high`, `severity-select-mid`, `severity-select-low` CSS classes).

**Feature spec:** `specs/features/06-create-bug.md`

## Test Scenarios

### 1. Open Create Bug Modal

**Seed:** `tests/seed.spec.ts`

#### 1.1. open-modal

**File:** `tests/create-bug/open-modal.spec.ts`

**Steps:**

1. Click the **New Bug** button in the title bar.
   - expect: A dialog with heading "Create bug" is visible
   - expect: A textbox labelled "Title" is visible
   - expect: A combobox labelled "Severity" is visible with options HIGH, MID, and LOW
   - expect: A textbox labelled "Owner" is visible
   - expect: A textbox labelled "Description" is visible
   - expect: A **Save** button is visible
   - expect: A **Cancel** button is visible

### 2. Modal Defaults

**Seed:** `tests/seed.spec.ts`

#### 2.1. owner-default

**File:** `tests/create-bug/owner-default.spec.ts`

**Steps:**

1. Click the **New Bug** button in the title bar.
   - expect: The owner textbox has value `buggy` (the logged-in username from the seed)

#### 2.2. severity-default

**File:** `tests/create-bug/severity-default.spec.ts`

**Steps:**

1. Click the **New Bug** button in the title bar.
   - expect: The severity combobox has value `MID` selected

### 3. Save Bug

**Seed:** `tests/seed.spec.ts`

#### 3.1. save-bug

**File:** `tests/create-bug/save-bug.spec.ts`

**Steps:**

1. Click the **New Bug** button in the title bar.
2. Type `Login fails with special characters` into the title field.
3. Select `HIGH` in the severity dropdown.
4. Type `When I use < and > in my password, login fails.` into the description field.
5. Click the **Save** button.
   - expect: The create-bug dialog is not visible
   - expect: A `POST /api/bugs` request succeeds with status 201
   - expect: The new bug appears in the board table with title `Login fails with special characters`, severity `HIGH`, and owner `buggy`

### 4. Cancel and Close Without Saving

**Seed:** `tests/seed.spec.ts`

#### 4.1. cancel

**File:** `tests/create-bug/cancel.spec.ts`

**Steps:**

1. Click the **New Bug** button in the title bar.
2. Type `Test cancel flow` into the title field.
3. Click the **Cancel** button.
   - expect: The create-bug dialog is not visible
   - expect: No `POST /api/bugs` request is sent
   - expect: The board table does not contain a row with title `Test cancel flow`

#### 4.2. close-button

**File:** `tests/create-bug/close-button.spec.ts`

**Steps:**

1. Click the **New Bug** button in the title bar.
2. Type `Test close button` into the title field.
3. Click the **Close** button (× in the upper-right corner; use `{ exact: true }` to avoid matching the **Closed** filter button).
   - expect: The create-bug dialog is not visible
   - expect: No `POST /api/bugs` request is sent
   - expect: The board table does not contain a row with title `Test close button`

#### 4.3. escape-key

**File:** `tests/create-bug/escape-key.spec.ts`

**Steps:**

1. Click the **New Bug** button in the title bar.
2. Type `Test escape key` into the title field.
3. Press **Escape**.
   - expect: The create-bug dialog is not visible
   - expect: No `POST /api/bugs` request is sent
   - expect: The board table does not contain a row with title `Test escape key`

### 5. Backdrop Behaviour

**Seed:** `tests/seed.spec.ts`

#### 5.1. backdrop-click

**File:** `tests/create-bug/backdrop-click.spec.ts`

**Steps:**

1. Click the **New Bug** button in the title bar.
2. Type `Backdrop test title` into the title field.
3. Click the dimmed area outside the modal panel (e.g. top-left corner of the viewport, on the backdrop overlay).
   - expect: The create-bug dialog remains visible
   - expect: The title field still has value `Backdrop test title`

### 6. Required Field Validation

**Seed:** `tests/seed.spec.ts`

#### 6.1. validation-blank

**File:** `tests/create-bug/validation-blank.spec.ts`

**Steps:**

1. Click the **New Bug** button in the title bar.
2. Clear the title and description fields (leave owner at its default).
3. Click the **Save** button.
   - expect: The create-bug dialog remains visible
   - expect: An alert lists `Title is required.`
   - expect: An alert lists `Description is required.`
   - expect: No `POST /api/bugs` request is sent

#### 6.2. validation-title-required

**File:** `tests/create-bug/validation-title-required.spec.ts`

**Steps:**

1. Click the **New Bug** button in the title bar.
2. Leave the title field blank.
3. Select `LOW` in the severity dropdown.
4. Type `buggy` into the owner field (or leave the default).
5. Type `Some description` into the description field.
6. Click the **Save** button.
   - expect: The create-bug dialog remains visible
   - expect: An alert lists `Title is required.`
   - expect: No `POST /api/bugs` request is sent

#### 6.3. validation-owner-required

**File:** `tests/create-bug/validation-owner-required.spec.ts`

**Steps:**

1. Click the **New Bug** button in the title bar.
2. Type `Owner blank test` into the title field.
3. Clear the owner field.
4. Type `Some description` into the description field.
5. Click the **Save** button.
   - expect: The create-bug dialog remains visible
   - expect: An alert lists `Owner is required.`
   - expect: No `POST /api/bugs` request is sent

#### 6.4. validation-description-required

**File:** `tests/create-bug/validation-description-required.spec.ts`

**Steps:**

1. Click the **New Bug** button in the title bar.
2. Type `Missing description` into the title field.
3. Leave the description field blank.
4. Click the **Save** button.
   - expect: The create-bug dialog remains visible
   - expect: An alert lists `Description is required.`
   - expect: No `POST /api/bugs` request is sent

#### 6.5. validation-required-fields

**File:** `tests/create-bug/validation-required-fields.spec.ts`

**Steps:**

1. Click the **New Bug** button in the title bar.
2. Click the **Save** button without entering any data (clear title and description if needed; owner retains default).
   - expect: The create-bug dialog remains visible
   - expect: The alert role element is visible and lists all missing required fields
   - expect: No `POST /api/bugs` request is sent

> **Note:** The severity field is a `<select>` that always defaults to MID, so a blank-severity scenario is not user-testable through the UI. Server-side validation for invalid severity is out of scope for UI tests.

### 7. Severity Styling

**Seed:** `tests/seed.spec.ts`

#### 7.1. severity-color-high

**File:** `tests/create-bug/severity-color-high.spec.ts`

**Steps:**

1. Click the **New Bug** button in the title bar.
2. Select `HIGH` in the severity dropdown.
   - expect: The severity combobox has CSS class `severity-select-high`

#### 7.2. severity-color-mid

**File:** `tests/create-bug/severity-color-mid.spec.ts`

**Steps:**

1. Click the **New Bug** button in the title bar.
   - expect: The severity combobox has CSS class `severity-select-mid` (default selection)

#### 7.3. severity-color-low

**File:** `tests/create-bug/severity-color-low.spec.ts`

**Steps:**

1. Click the **New Bug** button in the title bar.
2. Select `LOW` in the severity dropdown.
   - expect: The severity combobox has CSS class `severity-select-low`

### 8. Owner Default for Different Users

**Seed:** `tests/seed.spec.ts` (override: log in as `vanny` / `1979bus` instead of `buggy`)

#### 8.1. owner-default-vanny

**File:** `tests/create-bug/owner-default-vanny.spec.ts`

**Steps:**

1. Log out from the board page.
2. Log in with username `vanny` and password `1979bus`.
3. Click the **New Bug** button in the title bar.
   - expect: The owner textbox has value `vanny`

## Page Objects

Tests must use page object classes per `specs/engineering/test-automation-patterns.md`:

| Page / Modal | File |
|---|---|
| Login page | `tests/pages/login-page.ts` |
| Board page | `tests/pages/board-page.ts` |
| Create Bug modal | `tests/pages/create-bug-modal.ts` |

## Seed Test

All scenarios above assume the user is authenticated on the board page. The shared seed logs in as `buggy`:

```typescript
// tests/seed.spec.ts
import { test } from '@playwright/test';

const baseURL = 'http://localhost:5173';

test('seed', async ({ page }) => {
  await page.goto(`${baseURL}/login`);
  await page.getByLabel('Username').fill('buggy');
  await page.getByLabel('Password').fill('1970beetle');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL(/\/board$/);
});
```

Start the dev server (`npm run dev`) before running tests or using `playwright-cli attach` during generation.
