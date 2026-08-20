# Board Severity Test Plan

## Application Overview

Severity badges on the board use design tokens `--color-severity-high` (`#b84a2e`), `--color-severity-mid` (`#a67c47`), and `--color-severity-low` (`#4a6b5e`) for text and a tinted background so HIGH, MID, and LOW stay distinct.

## Test Scenarios

### 1. Color coding

**Seed:** `tests/seed-authenticated.spec.ts`

#### 1.1. should-expose-severity-css-custom-properties

**File:** `tests/board-severity/should-expose-severity-css-custom-properties.spec.ts`

**Steps:**
  1. View the board
    - expect: `--color-severity-high` computes to `#b84a2e`
    - expect: `--color-severity-mid` computes to `#a67c47`
    - expect: `--color-severity-low` computes to `#4a6b5e`

#### 1.2. should-color-code-high-mid-and-low-severity

**File:** `tests/board-severity/should-color-code-high-mid-and-low-severity.spec.ts`

**Steps:**
  1. Arrange open bugs with HIGH, MID, and LOW (create them if missing)
  2. View the board
    - expect: the HIGH cell uses the high severity token for color
    - expect: the MID cell uses the mid severity token for color
    - expect: the LOW cell uses the low severity token for color
    - expect: the three colors are visually distinct (HIGH is the strongest terracotta)
