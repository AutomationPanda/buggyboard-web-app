# User Story

As a BuggyBoard user,
I want to sort the columns of the bug board,
So that I can quickly organize and find bugs.


# Design

- The default sorting is by **Severity**, **descending** (HIGH, then MID, then LOW).
- Each column may be sortable.
  - The current sort is denoted by an arrow icon next to the column title.
  - An arrow up means ascending order.
  - An arrow down means descending order.
  - No arrow means no sorting for this column; another column is being sorted.
- When a column title is clicked, sorting should be activated on that column.
  - Each click should alternate between ascending and descending.
  - If the column was not sorted, the first click should make the sorting ascending.
- When a column is sorted, all the bugs in the table should follow the appropriate sorting type.
- Only one column may be sorted at a time.
- All four columns (ID, Severity, Title, Owner) may be sorted.
- For Severity:
  - Ascending means LOW, MID, HIGH
  - Descending means HIGH, MID, LOW


# Acceptance Criteria

Scenario: Board loads with default sort by Severity descending
  Given the user is authenticated into the app
  And there are bugs in the database
  When the user is on the board page
  Then the bugs are displayed in descending order by severity (HIGH, then MID, then LOW)
  And the Severity column header shows the descending sort indicator (arrow down)
  And no other column header shows a sort indicator

Scenario: User can sort by a column by clicking its header
  Given the user is authenticated into the app
  And the user is on the board page
  And there are bugs in the database
  When the user clicks the Title column header
  Then the Title column header shows a sort indicator (arrow up for ascending)
  And the bugs are displayed in ascending order by title
  And only the Title column shows a sort indicator

Scenario: User can toggle sort direction by clicking the same column again
  Given the user is authenticated into the app
  And the user is on the board page
  And there are bugs in the database
  And the user has sorted by Title in ascending order
  When the user clicks the Title column header again
  Then the Title column header shows the descending sort indicator (arrow down)
  And the bugs are displayed in descending order by title

Scenario: Only one column is the active sort at a time
  Given the user is authenticated into the app
  And the user is on the board page
  And there are bugs in the database
  And the user has sorted by Owner (so Owner shows a sort indicator)
  When the user clicks the Severity column header
  Then the Severity column header shows a sort indicator
  And the Owner column header no longer shows a sort indicator
  And the bugs are sorted by severity only

Scenario: Severity ascending order is LOW then MID then HIGH
  Given the user is authenticated into the app
  And there are bugs in the database with severities HIGH, MID, and LOW
  And the user is on the board page
  When the user clicks the Severity column header once (ascending)
  Then the bugs are displayed in order LOW, then MID, then HIGH

Scenario: Severity descending order is HIGH then MID then LOW
  Given the user is authenticated into the app
  And there are bugs in the database with severities HIGH, MID, and LOW
  And the user is on the board page
  And the user has sorted by Severity in ascending order
  When the user clicks the Severity column header again (descending)
  Then the bugs are displayed in order HIGH, then MID, then LOW

Scenario: All four columns are sortable
  Given the user is authenticated into the app
  And the user is on the board page
  And there are bugs in the database
  Then the ID column header is clickable and sortable
  And the Severity column header is clickable and sortable
  And the Title column header is clickable and sortable
  And the Owner column header is clickable and sortable


