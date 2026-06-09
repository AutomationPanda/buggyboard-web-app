# Authentication Test Plan

## Application Overview

BuggyBoard requires users to log in with credentials from `users.json` before accessing the bug board. The login page at `/login` collects a username and password, validates input client-side and via `POST /api/login`, and redirects successful logins to `/board`. Unauthenticated users are redirected to `/login` when they attempt to visit protected routes. Authenticated sessions persist across page refresh.

## Test Scenarios

### 1. Login page display

**Seed:** `tests/seed.spec.ts`

#### 1.1. displays-login-page

**File:** `tests/authentication/displays-login-page.spec.ts`

**Steps:**
  1. Navigate to `/login`
    - expect: page URL is `/login`
    - expect: heading "BuggyBoard" is visible
    - expect: text "Log in" is visible
    - expect: Username textbox is visible
    - expect: Password textbox is visible
    - expect: Login button is visible
    - expect: password field has type "password" (masked input)

#### 1.2. redirects-unauthenticated-user-to-login

**File:** `tests/authentication/redirects-unauthenticated-user-to-login.spec.ts`

**Steps:**
  1. Navigate to `/board` while not authenticated
    - expect: page URL is `/login`
    - expect: login form is visible

### 2. Successful login

**Seed:** `tests/seed.spec.ts`

#### 2.1. valid-login-redirects-to-board

**File:** `tests/authentication/valid-login-redirects-to-board.spec.ts`

**Steps:**
  1. Navigate to `/login`
  2. Type `buggy` into the Username field
  3. Type `1970beetle` into the Password field
  4. Click the Login button
    - expect: page URL is `/board`
    - expect: title bar shows "BuggyBoard"
    - expect: Logout button is visible

#### 2.2. submit-login-on-enter-from-username

**File:** `tests/authentication/submit-login-on-enter-from-username.spec.ts`

**Steps:**
  1. Navigate to `/login`
  2. Type `buggy` into the Username field
  3. Type `1970beetle` into the Password field
  4. Press Enter while focus is on the Username field
    - expect: page URL is `/board`

#### 2.3. submit-login-on-enter-from-password

**File:** `tests/authentication/submit-login-on-enter-from-password.spec.ts`

**Steps:**
  1. Navigate to `/login`
  2. Type `buggy` into the Username field
  3. Type `1970beetle` into the Password field
  4. Press Enter while focus is on the Password field
    - expect: page URL is `/board`

#### 2.4. trims-username-whitespace

**File:** `tests/authentication/trims-username-whitespace.spec.ts`

**Steps:**
  1. Navigate to `/login`
  2. Type `  buggy  ` into the Username field
  3. Type `1970beetle` into the Password field
  4. Click the Login button
    - expect: page URL is `/board`

### 3. Failed login

**Seed:** `tests/seed.spec.ts`

#### 3.1. invalid-username-shows-error

**File:** `tests/authentication/invalid-username-shows-error.spec.ts`

**Steps:**
  1. Navigate to `/login`
  2. Type `notauser` into the Username field
  3. Type `wrongpass` into the Password field
  4. Click the Login button
    - expect: page URL remains `/login`
    - expect: alert with text "Invalid username or password." is visible

#### 3.2. invalid-password-shows-error

**File:** `tests/authentication/invalid-password-shows-error.spec.ts`

**Steps:**
  1. Navigate to `/login`
  2. Type `buggy` into the Username field
  3. Type `wrongpass` into the Password field
  4. Click the Login button
    - expect: page URL remains `/login`
    - expect: alert with text "Invalid username or password." is visible

#### 3.3. blank-username-shows-error

**File:** `tests/authentication/blank-username-shows-error.spec.ts`

**Steps:**
  1. Navigate to `/login`
  2. Leave the Username field blank
  3. Type `1970beetle` into the Password field
  4. Click the Login button
    - expect: page URL remains `/login`
    - expect: alert with text "Username cannot be blank." is visible

#### 3.4. blank-password-shows-error

**File:** `tests/authentication/blank-password-shows-error.spec.ts`

**Steps:**
  1. Navigate to `/login`
  2. Type `buggy` into the Username field
  3. Leave the Password field blank
  4. Click the Login button
    - expect: page URL remains `/login`
    - expect: alert with text "Password cannot be blank." is visible

#### 3.5. blank-username-and-password-shows-error

**File:** `tests/authentication/blank-username-and-password-shows-error.spec.ts`

**Steps:**
  1. Navigate to `/login`
  2. Leave the Username field blank
  3. Leave the Password field blank
  4. Click the Login button
    - expect: page URL remains `/login`
    - expect: alert with text "Please enter your username and password." is visible

### 4. Session persistence

**Seed:** `tests/seed-authenticated.spec.ts`

#### 4.1. authenticated-user-redirected-from-login

**File:** `tests/authentication/authenticated-user-redirected-from-login.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Navigate to `/login`
    - expect: page URL is `/board`

#### 4.2. session-persists-after-refresh

**File:** `tests/authentication/session-persists-after-refresh.spec.ts`

**Steps:**
  1. Start authenticated on `/board` (via seed)
  2. Reload the page
    - expect: page URL is `/board`
    - expect: Logout button is visible
    - expect: bugs table is visible
