# Search Test Plan

## Application Overview

The title bar includes a search field (placeholder "Search bugs…", aria-label "Search bugs by title") to the left of the New Bug button. As the user types, the board filters bugs whose titles match the query. Matching is case-insensitive and normalizes whitespace and punctuation on both the query and titles (e.g. "login" matches "Login fails" and "Issue with log-in"). When the search field is non-empty, a Clear search (×) button appears. Sort order and state filter are preserved during search. When no bugs match, the table shows "No bugs matched." instead of data rows.

## Test Scenarios

### 1. Default search state

**Seed:** `tests/seed-authenticated.spec.ts`

#### 1.1. blank-search-shows-all-bugs

**File:** `tests/search/blank-search-shows-all-bugs.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Ensure multiple open bugs exist
  3. Confirm the search field is empty
    - expect: all open bugs (per active state filter) are visible in the table
    - expect: "No bugs matched." message is not shown

### 2. Filtering by title

**Seed:** `tests/seed-authenticated.spec.ts`

#### 2.1. typing-filters-by-title

**File:** `tests/search/typing-filters-by-title.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Ensure bugs exist with titles containing and not containing "engine"
  3. Type `engine` into the search field
    - expect: only bugs whose titles contain "engine" (case-insensitive) are visible
    - expect: bugs whose titles do not match are not visible

#### 2.2. search-normalizes-case-whitespace-punctuation

**File:** `tests/search/search-normalizes-text.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Ensure bugs exist with titles "Login fails" and "Issue with log-in" (create via API if needed)
  3. Type `login` into the search field
    - expect: "Login fails" bug is visible
    - expect: "Issue with log-in" bug is visible
    - expect: non-matching bugs are not visible

### 3. Clear search

**Seed:** `tests/seed-authenticated.spec.ts`

#### 3.1. clear-search-resets-board

**File:** `tests/search/clear-search-resets-board.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Type `engine` into the search field
    - expect: Clear search button is visible
  3. Click the Clear search button
    - expect: search field is empty
    - expect: all bugs (per active state filter) are visible again

### 4. Search with sort

**Seed:** `tests/seed-authenticated.spec.ts`

#### 4.1. sort-preserved-during-search

**File:** `tests/search/sort-preserved-during-search.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Ensure multiple matching bugs exist
  3. Click the Title column header to sort ascending
  4. Type a search query that matches multiple bugs
    - expect: matching bugs remain sorted by Title ascending
    - expect: Title column header still shows ascending indicator (↑)

### 5. No results

**Seed:** `tests/seed-authenticated.spec.ts`

#### 5.1. no-results-shows-message

**File:** `tests/search/no-results-shows-message.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Type a query that matches no bug title (e.g. `zzznomatch999`)
    - expect: table shows "No bugs matched." message
    - expect: no bug data rows are visible

### 6. Search with state filter

**Seed:** `tests/seed-authenticated.spec.ts`

#### 6.1. search-and-state-filter-combined

**File:** `tests/search/search-with-state-filter.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Ensure open and closed bugs exist with overlapping title keywords
  3. Select the Closed state filter
  4. Type a search query matching both open and closed bug titles
    - expect: only closed bugs matching the query are visible
    - expect: open bugs are not visible even if their titles match
