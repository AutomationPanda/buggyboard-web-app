# Bug Status Test Plan

## Application Overview

Each bug has a state of Open or Closed, stored in the database. New bugs are created with state Open. The board page shows an Open/Closed toggle filter above the table (default: Open). Only bugs matching the selected state appear in the table. The Edit bug modal includes a State dropdown (Open / Closed) for changing a bug's state. Sorting and search apply within the active state filter. When the selected state has no matching bugs, the table shows "No bugs matched."

## Test Scenarios

### 1. State filter on board

**Seed:** `tests/seed-authenticated.spec.ts`

#### 1.1. state-filter-defaults-to-open

**File:** `tests/bug-status/state-filter-defaults-to-open.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
    - expect: Open button in the "Filter by bug state" group appears selected
    - expect: only open bugs are visible in the table
    - expect: closed bugs are not visible

#### 1.2. closed-filter-shows-closed-bugs

**File:** `tests/bug-status/closed-filter-shows-closed-bugs.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Ensure at least one closed bug exists (close a bug via edit modal or API)
  3. Click the Closed button in the state filter
    - expect: Closed button appears selected
    - expect: only closed bugs are visible in the table
    - expect: open bugs are not visible

#### 1.3. no-bugs-matched-for-empty-state

**File:** `tests/bug-status/no-bugs-matched-for-empty-state.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Ensure all bugs in the database are open (no closed bugs)
  3. Click the Closed button in the state filter
    - expect: table shows "No bugs matched." message
    - expect: no bug data rows are visible

### 2. State in edit modal

**Seed:** `tests/seed-authenticated.spec.ts`

#### 2.1. edit-modal-shows-state-dropdown

**File:** `tests/bug-status/edit-modal-shows-state.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click a bug row to open the edit modal
    - expect: State combobox is visible with "Open" and "Closed" options
    - expect: current bug state is selected

#### 2.2. saving-state-change-updates-filter-visibility

**File:** `tests/bug-status/saving-state-change.spec.ts`

**Steps:**
  1. Start authenticated on `/board` with Open filter selected (via seed)
  2. Click an open bug row to open the edit modal
  3. Change State from "Open" to "Closed"
  4. Click the Save button
    - expect: edit modal is closed
    - expect: the bug no longer appears with Open filter selected
  5. Click the Closed button in the state filter
    - expect: the bug appears in the table

### 3. New bugs default to Open

**Seed:** `tests/seed-authenticated.spec.ts`

#### 3.1. new-bug-appears-in-open-filter

**File:** `tests/bug-status/new-bug-open-state.spec.ts`

**Steps:**
  1. Start authenticated on `/board` with Open filter selected (via seed)
  2. Create a new bug via the New Bug modal with a unique title
    - expect: the new bug appears in the table
  3. Select the Closed state filter
    - expect: the newly created bug is not visible

### 4. Sort and search with state filter

**Seed:** `tests/seed-authenticated.spec.ts`

#### 4.1. sort-works-with-state-filter

**File:** `tests/bug-status/sort-with-state-filter.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Select the Open state filter
  3. Ensure multiple open bugs exist
  4. Click the Title column header
    - expect: only open bugs are visible
    - expect: visible open bugs are sorted by Title ascending

#### 4.2. search-works-with-state-filter

**File:** `tests/bug-status/search-with-state-filter.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Ensure open and closed bugs share a common title keyword
  3. Select the Open state filter
  4. Type the shared keyword into the search field
    - expect: only open bugs matching the query are visible
    - expect: closed bugs matching the query are not visible
