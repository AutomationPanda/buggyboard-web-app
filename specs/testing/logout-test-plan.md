# Logout Test Plan

## Application Overview

Authenticated users can end their session from the Logout button in the board page title bar. After logout, the app clears authentication state, redirects to `/login`, and blocks access to protected routes such as `/board`. The browser back button must not restore the session.

## Test Scenarios

### 1. Logout flow

**Seed:** `tests/seed-authenticated.spec.ts`

#### 1.1. logout-redirects-to-login

**File:** `tests/logout/logout-redirects-to-login.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click the Logout button in the title bar
    - expect: page URL is `/login`
    - expect: login form is visible

#### 1.2. cannot-access-board-after-logout

**File:** `tests/logout/cannot-access-board-after-logout.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click the Logout button
  3. Navigate to `/board`
    - expect: page URL is `/login`

#### 1.3. back-button-does-not-restore-session

**File:** `tests/logout/back-button-does-not-restore-session.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Click the Logout button
    - expect: page URL is `/login`
  3. Click the browser back button
    - expect: page URL is `/login` (or user is redirected back to `/login`)
    - expect: user is not authenticated (Logout button is not visible)
