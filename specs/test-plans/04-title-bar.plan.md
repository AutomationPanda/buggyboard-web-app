# Title Bar Test Plan

## Application Overview

The authenticated board has a header with the 50×50 Beetle logo, heading `BuggyBoard`, search, New Bug, and a right-aligned Logout button.

## Test Scenarios

### 1. Title bar layout

**Seed:** `tests/seed-authenticated.spec.ts`

#### 1.1. should-display-title-bar-on-board

**File:** `tests/title-bar/should-display-title-bar-on-board.spec.ts`

**Steps:**
  1. View the board page
    - expect: the banner contains an image named `BuggyBoard` sourced from `/logo_50x50.png`
    - expect: heading `BuggyBoard` is visible
    - expect: the Logout button is visible
    - expect: the New Bug button is visible
    - expect: the search field labeled `Search bugs by title` is visible
