# User Story

As a BuggyBoard user,
I want to view all bugs that my team has opened,
So that I can see all issues at one glance and then start to review bugs individually.


# Design

The `/board` page should display a table of all bugs.
The table should display the following information for each bug from left to right:

- ID
- Severity
- Title
- Owner


# Out of Scope

- Opening bug tickets from the board.
- Filtering bugs.
- Sorting bugs.


# Acceptance Criteria

Scenario: Board page displays a bugs table with the correct columns
  Given the user is authenticated into the app
  When the user is on the board page
  Then the board page displays a table of bugs
  And the table has a column for ID
  And the table has a column for Severity
  And the table has a column for Title
  And the table has a column for Owner
  And the columns are ordered from left to right: ID, Severity, Title, Owner

Scenario: Board page shows all bugs from the database
  Given the user is authenticated into the app
  And there are bugs in the database
  When the user is on the board page
  Then the table displays one row per bug
  And each row shows that bug's ID, severity, title, and owner

Scenario: Board page shows an empty table when there are no bugs
  Given the user is authenticated into the app
  And there are no bugs in the database
  When the user is on the board page
  Then the board page displays the bugs table
  And the table has no data rows

Scenario: Severity is displayed in all caps on the board
  Given the user is authenticated into the app
  And there is at least one bug in the database with severity "high"
  When the user is on the board page
  Then the table displays that bug's severity as "HIGH"

