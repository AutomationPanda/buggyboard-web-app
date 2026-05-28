# User Story

As a BuggyBoard user,
I want to close bugs that have been fixed,
So that they can be removed from the view of remaining issues.


# Bug State

- Each bug must have a state field.
- The state field has two possible values:
  - Open
  - Closed
- State is stored in the database.
- When a bug is created, it is given the Open state.
- The "New Bug" modal does not include the state field (like ID).
- The "Edit Bug" modal lets the user change the state.


# Design

- The board page has a filter for bug state above the bug table.
  - The state filter appears as a toggle between the "Open" and "Closed" options, centered above the table (no "State:" label).
  - The currently selected option is visually clearly indicated (e.g. filled background, so it is obvious which view is displayed).
  - Only one state may be selected at a time.
  - Selecting a state makes the table display bugs only that have that state.
  - The default filter state is "Open".
- Sorting and searching still works the same with the state filters.
  - They apply to the bugs in the table with the chosen state.
- When a state is selected but no bugs match, the board should display a message that no bugs matched.


# Acceptance Criteria

Scenario: New bugs are created with state Open
  Given the user is authenticated into the app
  And the user is on the board page
  When the user creates a new bug via the New Bug modal
  Then the bug is saved with state Open
  And the new bug appears when the state filter is Open

Scenario: Edit bug modal displays state and allows changing it
  Given the user is authenticated into the app
  And the user is on the board page
  And there are bugs in the database
  When the user opens the edit modal for a bug
  Then the modal displays the bug's state (Open or Closed)
  And the user can change the state
  And saving the modal updates the bug's state in the database

Scenario: Board state filter defaults to Open
  Given the user is authenticated into the app
  And there are bugs in the database including open and closed bugs
  When the user navigates to the board page
  Then the state filter shows Open as selected
  And only open bugs are displayed in the table

Scenario: Selecting Closed in the state filter shows only closed bugs
  Given the user is authenticated into the app
  And the user is on the board page
  And there are open and closed bugs in the database
  When the user selects Closed in the state filter
  Then only closed bugs are displayed in the table
  And no open bugs are displayed

Scenario: Sorting works when a state filter is applied
  Given the user is authenticated into the app
  And the user is on the board page
  And there are bugs in the database
  And the user has selected a state filter (e.g. Open)
  When the user sorts the table by a column (e.g. Title ascending)
  Then only bugs matching the selected state are displayed
  And those bugs are displayed in the chosen sort order

Scenario: Search and state filter apply together
  Given the user is authenticated into the app
  And the user is on the board page
  And there are open and closed bugs in the database
  When the user selects a state filter and enters text in the search field
  Then only bugs that match both the state and the search query are displayed

Scenario: No bugs matched message when selected state has no bugs
  Given the user is authenticated into the app
  And the user is on the board page
  And all bugs in the database are open (none closed)
  When the user selects Closed in the state filter
  Then the board displays a message that no bugs matched
  And the bug table shows no bug rows
