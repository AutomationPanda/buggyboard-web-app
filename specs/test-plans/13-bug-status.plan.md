# Bug Status Test Plan

## Application Overview

Bugs are Open or Closed. New bugs are Open; the create dialog has no state field. Edit bug has a State combobox (Open / Closed). The board toggle `Filter by bug state` defaults to Open. Closed currently shows `No bugs matched.` when none are closed. Search and sort apply to the selected state.

## Test Scenarios

### 1. State on create and edit

**Seed:** `tests/seed-authenticated.spec.ts`

#### 1.1. should-create-new-bugs-as-open

**File:** `tests/bug-status/should-create-new-bugs-as-open.spec.ts`

**Steps:**
  1. Create a unique bug via New Bug (no state field on that dialog)
  2. Leave the state filter on Open
    - expect: the new title appears in the Open table
  3. Switch to Closed
    - expect: the new title does not appear

#### 1.2. should-change-state-from-edit-modal

**File:** `tests/bug-status/should-change-state-from-edit-modal.spec.ts`

**Steps:**
  1. Create a unique open bug and open it
    - expect: State is Open
  2. Change State to Closed and Save
    - expect: with Open selected, the title is gone
    - expect: with Closed selected, the title is listed

### 2. Board state filter

**Seed:** `tests/seed-authenticated.spec.ts`

#### 2.1. should-default-state-filter-to-open

**File:** `tests/bug-status/should-default-state-filter-to-open.spec.ts`

**Steps:**
  1. Arrange at least one open bug and one closed bug
  2. Load the board
    - expect: Open is the selected state (filled/primary styling)
    - expect: only open bugs are listed
    - expect: the closed bug title is not listed

#### 2.2. should-show-only-closed-bugs-when-closed-is-selected

**File:** `tests/bug-status/should-show-only-closed-bugs-when-closed-is-selected.spec.ts`

**Steps:**
  1. Arrange open and closed bugs
  2. Click Closed
    - expect: only closed bugs are listed
    - expect: open bug titles are not listed

#### 2.3. should-sort-within-selected-state

**File:** `tests/bug-status/should-sort-within-selected-state.spec.ts`

**Steps:**
  1. With Open selected, sort by Title ascending
    - expect: only open bugs are listed
    - expect: those rows are in title ascending order

#### 2.4. should-combine-search-with-state-filter

**File:** `tests/bug-status/should-combine-search-with-state-filter.spec.ts`

**Steps:**
  1. Arrange an open bug and a closed bug that share a searchable word in the title, plus one that does not
  2. Select Closed and type the shared word
    - expect: only the closed matching bug is listed

#### 2.5. should-show-no-bugs-matched-when-selected-state-is-empty

**File:** `tests/bug-status/should-show-no-bugs-matched-when-selected-state-is-empty.spec.ts`

**Steps:**
  1. Arrange a board with open bugs and no closed bugs (or isolate data so Closed is empty)
  2. Click Closed
    - expect: `No bugs matched.` is visible
    - expect: no bug data rows are shown
