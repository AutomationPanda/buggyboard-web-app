# Board Test Plan

## Application Overview

The board page at `/board` is the main workspace after login. It displays a title bar (logo, "BuggyBoard" heading, search field, New Bug button, Logout button), an Open/Closed state filter toggle, and a sortable table of bugs with columns ID, Severity, Title, and Owner. Severity values are shown in uppercase with color-coded badges (HIGH = terracotta, MID = amber, LOW = sage).

## Test Scenarios

### 1. Title bar

**Seed:** `tests/seed-authenticated.spec.ts`

#### 1.1. title-bar-displays-branding-and-actions

**File:** `tests/board/title-bar-displays-branding-and-actions.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
    - expect: BuggyBoard logo image is visible
    - expect: heading "BuggyBoard" is visible
    - expect: search field with placeholder "Search bugs…" is visible
    - expect: New Bug button is visible
    - expect: Logout button is visible

### 2. Bug table structure

**Seed:** `tests/seed-authenticated.spec.ts`

#### 2.1. table-displays-correct-columns

**File:** `tests/board/table-displays-correct-columns.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
    - expect: table labelled "Bugs" is visible
    - expect: column headers appear in order: ID, Severity, Title, Owner
    - expect: each column header is a clickable button

#### 2.2. table-shows-bug-rows

**File:** `tests/board/table-shows-bug-rows.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Ensure at least one open bug exists in the database (create via API or UI if needed)
    - expect: table has at least one data row
    - expect: each row shows ID, severity badge, title, and owner text

#### 2.3. severity-displayed-in-uppercase

**File:** `tests/board/severity-displayed-in-uppercase.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Ensure a bug with severity HIGH exists in the database
    - expect: that bug's severity cell displays "HIGH" in uppercase

### 3. Severity color-coding

**Seed:** `tests/seed-authenticated.spec.ts`

#### 3.1. high-severity-uses-terracotta-color

**File:** `tests/board/high-severity-uses-terracotta-color.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Locate a bug row with severity HIGH
    - expect: severity badge has class or styling consistent with `severity-badge-high`
    - expect: badge text color uses CSS custom property `--color-severity-high`

#### 3.2. mid-severity-uses-amber-color

**File:** `tests/board/mid-severity-uses-amber-color.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Locate a bug row with severity MID
    - expect: severity badge has class or styling consistent with `severity-badge-mid`
    - expect: badge text color uses CSS custom property `--color-severity-mid`

#### 3.3. low-severity-uses-sage-color

**File:** `tests/board/low-severity-uses-sage-color.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Locate a bug row with severity LOW
    - expect: severity badge has class or styling consistent with `severity-badge-low`
    - expect: badge text color uses CSS custom property `--color-severity-low`

#### 3.4. severity-levels-are-visually-distinct

**File:** `tests/board/severity-levels-are-visually-distinct.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Ensure bugs with HIGH, MID, and LOW severities exist
    - expect: each severity badge has a distinct computed text color
    - expect: HIGH badge color differs from MID and LOW badge colors
