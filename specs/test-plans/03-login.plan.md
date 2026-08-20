# Login Test Plan

## Application Overview

Unauthenticated users see `/login`: BuggyBoard heading, “Log in” copy, Username, masked Password, and Login. Valid `users.json` credentials go to `/board`. Blank fields and bad credentials stay on login with an error. Sessions survive refresh; visiting `/login` while signed in redirects to `/board`.

## Test Scenarios

### 1. Login page

**Seed:** `tests/seed.spec.ts`

#### 1.1. should-display-login-page

**File:** `tests/login/should-display-login-page.spec.ts`

**Steps:**
  1. Load the app while signed out
    - expect: the URL is `/login`
    - expect: heading `BuggyBoard` is visible
    - expect: text `Log in` is visible
    - expect: Username textbox is visible
    - expect: Password textbox is visible
    - expect: Login button is visible
    - expect: the password field uses `type="password"`
    - expect: the Beetle logo image (`/logo_50x50.png`) is visible on the login card

#### 1.2. should-redirect-unauthenticated-user-to-login

**File:** `tests/login/should-redirect-unauthenticated-user-to-login.spec.ts`

**Steps:**
  1. Open `/board` while signed out
    - expect: the URL is `/login`
    - expect: the Login button is visible

### 2. Successful login

**Seed:** `tests/seed.spec.ts`

#### 2.1. should-sign-in-with-valid-credentials

**File:** `tests/login/should-sign-in-with-valid-credentials.spec.ts`

**Steps:**
  1. Enter username `buggy` and password `1970beetle`
  2. Click Login
    - expect: the URL is `/board`
    - expect: the bugs table is visible

#### 2.2. should-submit-login-when-pressing-enter-in-username

**File:** `tests/login/should-submit-login-when-pressing-enter-in-username.spec.ts`

**Steps:**
  1. Enter username `buggy` and password `1970beetle`
  2. Press Enter while the Username field is focused
    - expect: the URL is `/board`

#### 2.3. should-submit-login-when-pressing-enter-in-password

**File:** `tests/login/should-submit-login-when-pressing-enter-in-password.spec.ts`

**Steps:**
  1. Enter username `buggy` and password `1970beetle`
  2. Press Enter while the Password field is focused
    - expect: the URL is `/board`

#### 2.4. should-trim-username-whitespace-on-login

**File:** `tests/login/should-trim-username-whitespace-on-login.spec.ts`

**Steps:**
  1. Enter username `  buggy  ` and password `1970beetle`
  2. Click Login
    - expect: the URL is `/board`
    - expect: opening New Bug shows Owner pre-filled with `buggy` (trimmed)

### 3. Failed login

**Seed:** `tests/seed.spec.ts`

#### 3.1. should-show-generic-error-for-invalid-username

**File:** `tests/login/should-show-generic-error-for-invalid-username.spec.ts`

**Steps:**
  1. Enter username `not-a-user` and password `1970beetle`
  2. Click Login
    - expect: the URL remains `/login`
    - expect: error text `Invalid username or password.` is visible

#### 3.2. should-show-generic-error-for-invalid-password

**File:** `tests/login/should-show-generic-error-for-invalid-password.spec.ts`

**Steps:**
  1. Enter username `buggy` and password `wrong-password`
  2. Click Login
    - expect: the URL remains `/login`
    - expect: error text `Invalid username or password.` is visible

#### 3.3. should-show-error-for-blank-username

**File:** `tests/login/should-show-error-for-blank-username.spec.ts`

**Steps:**
  1. Leave Username blank, enter password `1970beetle`
  2. Click Login
    - expect: the URL remains `/login`
    - expect: error text `Username cannot be blank.` is visible

#### 3.4. should-show-error-for-blank-password

**File:** `tests/login/should-show-error-for-blank-password.spec.ts`

**Steps:**
  1. Enter username `buggy` and leave Password blank
  2. Click Login
    - expect: the URL remains `/login`
    - expect: error text `Password cannot be blank.` is visible

#### 3.5. should-show-error-for-blank-username-and-password

**File:** `tests/login/should-show-error-for-blank-username-and-password.spec.ts`

**Steps:**
  1. Leave Username and Password blank
  2. Click Login
    - expect: the URL remains `/login`
    - expect: error text `Please enter your username and password.` is visible

### 4. Session

**Seed:** `tests/seed.spec.ts`

#### 4.1. should-redirect-authenticated-user-away-from-login

**File:** `tests/login/should-redirect-authenticated-user-away-from-login.spec.ts`

**Steps:**
  1. Sign in as `buggy` / `1970beetle`
  2. Open `/login`
    - expect: the URL is `/board`
    - expect: the bugs table is visible

#### 4.2. should-keep-session-after-refresh

**File:** `tests/login/should-keep-session-after-refresh.spec.ts`

**Steps:**
  1. Sign in as `buggy` / `1970beetle` and wait for `/board`
  2. Refresh the page
    - expect: the URL remains `/board`
    - expect: the Logout button is visible
