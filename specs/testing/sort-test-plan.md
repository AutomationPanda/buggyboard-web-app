# Sort Test Plan

## Application Overview

The bugs table on `/board` supports client-side sorting on all four columns: ID, Severity, Title, and Owner. The default sort is Severity descending (HIGH → MID → LOW), indicated by a down arrow (↓) next to the Severity header. Clicking a column header activates sorting on that column (ascending on first click); clicking again toggles direction. Only one column shows a sort indicator at a time.

## Test Scenarios

### 1. Default sort

**Seed:** `tests/seed-authenticated.spec.ts`

#### 1.1. default-sort-severity-descending

**File:** `tests/sort/default-sort-severity-descending.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Ensure bugs with HIGH, MID, and LOW severities exist
    - expect: Severity column header shows descending indicator (↓)
    - expect: no other column header shows a sort indicator
    - expect: bug rows appear in order HIGH, then MID, then LOW (within the active state filter)

### 2. Sorting by column

**Seed:** `tests/seed-authenticated.spec.ts`

#### 2.1. sort-by-title-ascending

**File:** `tests/sort/sort-by-title-ascending.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Ensure multiple bugs with distinct titles exist
  3. Click the Title column header
    - expect: Title column header shows ascending indicator (↑)
    - expect: bug titles appear in ascending alphabetical order
    - expect: only the Title column shows a sort indicator

#### 2.2. toggle-sort-direction

**File:** `tests/sort/toggle-sort-direction.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Ensure multiple bugs with distinct titles exist
  3. Click the Title column header (ascending)
  4. Click the Title column header again
    - expect: Title column header shows descending indicator (↓)
    - expect: bug titles appear in descending alphabetical order

#### 2.3. only-one-column-sorted-at-a-time

**File:** `tests/sort/only-one-column-sorted.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click the Owner column header
    - expect: Owner column header shows a sort indicator
  3. Click the Severity column header
    - expect: Severity column header shows a sort indicator
    - expect: Owner column header no longer shows a sort indicator
    - expect: bugs are sorted by severity

### 3. Severity sort order

**Seed:** `tests/seed-authenticated.spec.ts`

#### 3.1. severity-ascending-low-mid-high

**File:** `tests/sort/severity-ascending-low-mid-high.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Ensure bugs with HIGH, MID, and LOW severities exist
  3. Click the Severity column header once (from default descending)
    - expect: Severity column header shows ascending indicator (↑)
    - expect: bug rows appear in order LOW, then MID, then HIGH

#### 3.2. severity-descending-high-mid-low

**File:** `tests/sort/severity-descending-high-mid-low.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Ensure bugs with HIGH, MID, and LOW severities exist
  3. Click the Severity column header to reach ascending order
  4. Click the Severity column header again
    - expect: Severity column header shows descending indicator (↓)
    - expect: bug rows appear in order HIGH, then MID, then LOW

### 4. All columns sortable

**Seed:** `tests/seed-authenticated.spec.ts`

#### 4.1. all-columns-are-sortable

**File:** `tests/sort/all-columns-sortable.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click the ID column header
    - expect: ID column header shows a sort indicator
  3. Click the Severity column header
    - expect: Severity column header shows a sort indicator
  4. Click the Title column header
    - expect: Title column header shows a sort indicator
  5. Click the Owner column header
    - expect: Owner column header shows a sort indicator
