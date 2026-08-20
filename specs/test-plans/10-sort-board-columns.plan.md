# Sort Board Columns Test Plan

## Application Overview

The board defaults to Severity descending (`↓` beside Severity). Clicking a header sorts that column ascending on first click, then toggles descending. Only one column shows a sort arrow. Severity order is LOW → MID → HIGH (asc) and HIGH → MID → LOW (desc). ID, Severity, Title, and Owner are all sortable.

## Test Scenarios

### 1. Default and toggling sort

**Seed:** `tests/seed-authenticated.spec.ts`

#### 1.1. should-default-to-severity-descending

**File:** `tests/sort-board/should-default-to-severity-descending.spec.ts`

**Steps:**
  1. Arrange open bugs with HIGH, MID, and LOW
  2. View the board
    - expect: rows are HIGH, then MID, then LOW
    - expect: Severity header shows `↓`
    - expect: ID, Title, and Owner headers show no sort arrow

#### 1.2. should-sort-ascending-when-clicking-unsorted-column

**File:** `tests/sort-board/should-sort-ascending-when-clicking-unsorted-column.spec.ts`

**Steps:**
  1. Arrange several open bugs with different titles
  2. Click the Title header
    - expect: Title shows `↑`
    - expect: rows are in ascending title order
    - expect: Severity no longer shows a sort arrow

#### 1.3. should-toggle-sort-direction-on-same-column

**File:** `tests/sort-board/should-toggle-sort-direction-on-same-column.spec.ts`

**Steps:**
  1. Click Title once (ascending)
  2. Click Title again
    - expect: Title shows `↓`
    - expect: rows are in descending title order

#### 1.4. should-allow-only-one-active-sort-column

**File:** `tests/sort-board/should-allow-only-one-active-sort-column.spec.ts`

**Steps:**
  1. Click Owner so it shows a sort arrow
  2. Click Severity
    - expect: Severity shows a sort arrow
    - expect: Owner no longer shows a sort arrow

#### 1.5. should-sort-severity-ascending-low-mid-high

**File:** `tests/sort-board/should-sort-severity-ascending-low-mid-high.spec.ts`

**Steps:**
  1. Arrange HIGH, MID, and LOW open bugs
  2. Click Severity once (from default descending, this becomes ascending)
    - expect: rows are LOW, then MID, then HIGH
    - expect: Severity shows `↑`

#### 1.6. should-sort-severity-descending-high-mid-low

**File:** `tests/sort-board/should-sort-severity-descending-high-mid-low.spec.ts`

**Steps:**
  1. Arrange HIGH, MID, and LOW open bugs
  2. Click Severity until descending is active
    - expect: rows are HIGH, then MID, then LOW
    - expect: Severity shows `↓`

#### 1.7. should-allow-sorting-all-four-columns

**File:** `tests/sort-board/should-allow-sorting-all-four-columns.spec.ts`

**Steps:**
  1. Click ID, then Severity, then Title, then Owner
    - expect: each header is clickable
    - expect: after each click, only that column shows a sort arrow
