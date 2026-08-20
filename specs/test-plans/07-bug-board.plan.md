# Bug Board Test Plan

## Application Overview

`/board` lists bugs in a table labeled `Bugs` with columns ID, Severity, Title, Owner (left to right). Severity is shown in all caps. An empty database shows `No bugs.` instead of data rows. Default Open filter and Severity descending sort are covered in other plans.

## Test Scenarios

### 1. Table structure

**Seed:** `tests/seed-authenticated.spec.ts`

#### 1.1. should-show-bugs-table-with-expected-columns

**File:** `tests/bug-board/should-show-bugs-table-with-expected-columns.spec.ts`

**Steps:**
  1. View the board
    - expect: a table named `Bugs` is visible
    - expect: column headers are ID, Severity, Title, Owner in that order

#### 1.2. should-list-each-bug-as-a-row

**File:** `tests/bug-board/should-list-each-bug-as-a-row.spec.ts`

**Steps:**
  1. Ensure at least one open bug exists (create one with a unique title if needed)
  2. View the board with Open selected
    - expect: that bug appears as a row showing its ID, severity in all caps, title, and owner

#### 1.3. should-show-empty-table-when-there-are-no-bugs

**File:** `tests/bug-board/should-show-empty-table-when-there-are-no-bugs.spec.ts`

**Steps:**
  1. Arrange a session whose Open list has no bugs (empty DB or no matching open bugs)
  2. View the board
    - expect: the Bugs table is still visible
    - expect: there are no bug data rows
    - expect: empty copy `No bugs.` is shown when the database itself has no bugs

#### 1.4. should-display-severity-in-all-caps

**File:** `tests/bug-board/should-display-severity-in-all-caps.spec.ts`

**Steps:**
  1. Ensure an open bug with HIGH, MID, or LOW exists
  2. View the board
    - expect: that row’s severity cell is exactly `HIGH`, `MID`, or `LOW`
