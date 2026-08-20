# Search Board Test Plan

## Application Overview

The title-bar search (`Search bugs by title`) filters as you type. Matching is case-insensitive and normalizes whitespace and punctuation (`login` matches `Login fails` and `Issue with log-in`). A Clear search (`×`) control appears when the field is not blank. Sort is preserved. No matches show `No bugs matched.`

## Test Scenarios

### 1. Search

**Seed:** `tests/seed-authenticated.spec.ts`

#### 1.1. should-show-all-bugs-when-search-is-blank

**File:** `tests/search-board/should-show-all-bugs-when-search-is-blank.spec.ts`

**Steps:**
  1. Arrange at least two open bugs
  2. Leave search blank
    - expect: those bugs are listed
    - expect: `No bugs matched.` is not shown
    - expect: Clear search is not visible

#### 1.2. should-filter-bugs-by-title-as-user-types

**File:** `tests/search-board/should-filter-bugs-by-title-as-user-types.spec.ts`

**Steps:**
  1. Arrange an open bug titled with `login` and another whose title does not contain it
  2. Type `login` in Search bugs by title
    - expect: only matching title rows remain
    - expect: the non-matching title is not listed
    - expect: Clear search is visible

#### 1.3. should-match-titles-case-insensitively-with-normalized-punctuation

**File:** `tests/search-board/should-match-titles-case-insensitively-with-normalized-punctuation.spec.ts`

**Steps:**
  1. Arrange open bugs titled `Login fails` and `Issue with log-in` (create if needed)
  2. Type `login` in search
    - expect: both `Login fails` and `Issue with log-in` are listed

#### 1.4. should-clear-search-with-x-and-reset-board

**File:** `tests/search-board/should-clear-search-with-x-and-reset-board.spec.ts`

**Steps:**
  1. Arrange multiple open bugs and type text that hides some of them
  2. Click Clear search
    - expect: the search field is blank
    - expect: all previously visible open bugs are listed again

#### 1.5. should-preserve-sort-while-searching

**File:** `tests/search-board/should-preserve-sort-while-searching.spec.ts`

**Steps:**
  1. Sort by Title ascending
  2. Type a query that matches more than one bug
    - expect: matching rows stay in Title ascending order
    - expect: Title still shows `↑`

#### 1.6. should-show-no-bugs-matched-when-search-has-no-hits

**File:** `tests/search-board/should-show-no-bugs-matched-when-search-has-no-hits.spec.ts`

**Steps:**
  1. Type a query that matches no open bug title (for example `zzzz-no-such-bug`)
    - expect: `No bugs matched.` is visible
    - expect: no bug data rows are shown
