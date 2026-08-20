# Favicon Test Plan

## Application Overview

BuggyBoard brands the tab with a cartoon tan 1970 Volkswagen Beetle favicon at `frontend/public/favicon.ico`. The live app serves it as `/favicon.ico` and uses document title `BuggyBoard`.

## Test Scenarios

### 1. Favicon

**Seed:** `tests/seed.spec.ts`

#### 1.1. should-load-beetle-favicon

**File:** `tests/favicon/should-load-beetle-favicon.spec.ts`

**Steps:**
  1. Load the app (unauthenticated login page is fine)
    - expect: the document title is `BuggyBoard`
    - expect: a favicon link points at `/favicon.ico`
    - expect: requesting `/favicon.ico` returns a successful image response
