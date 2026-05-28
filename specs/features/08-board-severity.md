# User Story

As a BuggyBoard user,
I want to see color-coded bug severity on the board,
So that my eyes are drawn more to the more critical bugs.


# Design

On the board page:

The severity for each bug is highlighted with color coding.

**Severity colors** (bolder and clearly differentiated; work with the primary Savannah Beige theme):

| Severity | Color              | Hex       | Use |
| -------- | ------------------ | --------- | --- |
| **HIGH** | Strong terracotta / red-brown | `#b84a2e` | Draws attention; reads as urgent. |
| **MID**  | Amber / tan        | `#a67c47` | Middle ground; distinct from HIGH and LOW. |
| **LOW**  | Muted sage / cool green-gray | `#4a6b5e` | Calm; recedes visually. |

Use these as CSS custom properties (`--color-severity-high`, `--color-severity-mid`, `--color-severity-low`) so they stay consistent and can be reused. Severity badges use the color for text and a stronger tint of the same color for the background (e.g. ~22% opacity) for clear visibility, with slightly bolder label text (e.g. font-weight 600). 


# Acceptance Criteria

Scenario: Severity on the board is color-coded
  Given the user is authenticated into the app
  And there are bugs in the database with severities HIGH, MID, and LOW
  When the user is on the board page
  Then each severity value in the table is displayed with color coding
  And HIGH severity is displayed with the strong terracotta color
  And MID severity is displayed with the amber color
  And LOW severity is displayed with the muted sage color

Scenario: HIGH severity uses the design system color
  Given the user is authenticated into the app
  And there is at least one bug in the database with severity HIGH
  When the user is on the board page
  Then the HIGH severity for that bug is styled using the severity color (e.g. text and background tint)
  And the color corresponds to the CSS custom property for high severity

Scenario: Severity colors are visually distinct
  Given the user is authenticated into the app
  And there are bugs in the database with at least two different severities
  When the user is on the board page
  Then each severity level is visually distinct from the others
  And HIGH appears more prominent than MID and LOW

Scenario: Severity styling uses the design system tokens
  Given the application is loaded
  When the board page is loaded (or any page that uses severity styling)
  Then severity colors are available as design tokens (e.g. CSS custom properties)
  And the board page severity styling uses those tokens so colors stay consistent

