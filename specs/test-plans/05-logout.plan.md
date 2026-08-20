# Logout Test Plan

## Application Overview

Logout in the title bar ends the session and sends the user to `/login`. Protected URLs stay gated. Browser back must not restore the session.

## Test Scenarios

### 1. Logout

**Seed:** `tests/seed-authenticated.spec.ts`

#### 1.1. should-log-out-and-show-login-page

**File:** `tests/logout/should-log-out-and-show-login-page.spec.ts`

**Steps:**
  1. Click Logout
    - expect: the URL is `/login`
    - expect: the Login button is visible
    - expect: the bugs table is not visible

#### 1.2. should-block-board-after-logout

**File:** `tests/logout/should-block-board-after-logout.spec.ts`

**Steps:**
  1. Click Logout
  2. Open `/board`
    - expect: the URL is `/login`
    - expect: the Login button is visible

#### 1.3. should-not-restore-session-with-browser-back

**File:** `tests/logout/should-not-restore-session-with-browser-back.spec.ts`

**Steps:**
  1. Click Logout and wait for `/login`
  2. Use the browser back button
    - expect: the user is not authenticated (Login button visible)
    - expect: the bugs table is not shown as an authenticated session
