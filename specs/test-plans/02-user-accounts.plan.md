# User Accounts Test Plan

## Application Overview

Accounts live in root `users.json`. Each entry has a unique username and password. Default accounts are `buggy` / `1970beetle` and `vanny` / `1979bus`. The UI does not manage accounts; these scenarios prove both stored identities can sign in.

## Test Scenarios

### 1. Stored accounts can sign in

**Seed:** `tests/seed.spec.ts`

#### 1.1. should-sign-in-as-buggy

**File:** `tests/user-accounts/should-sign-in-as-buggy.spec.ts`

**Steps:**
  1. On the login page, enter username `buggy` and password `1970beetle`
  2. Click Login
    - expect: the URL is `/board`
    - expect: the title bar heading `BuggyBoard` is visible

#### 1.2. should-sign-in-as-vanny

**File:** `tests/user-accounts/should-sign-in-as-vanny.spec.ts`

**Steps:**
  1. On the login page, enter username `vanny` and password `1979bus`
  2. Click Login
    - expect: the URL is `/board`
    - expect: opening New Bug shows Owner pre-filled with `vanny`
