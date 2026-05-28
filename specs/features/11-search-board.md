# User Story

As a BuggyBoard user,
I want to search for bugs on the board based on their titles,
So that I can quickly find the bugs I seek.


# Design

- The default state is a blank search field in which all bugs are shown on the board.
- There is a search field in the title bar to the left of the "New Bug" button.
- Entering text into the search field makes the board filter out bugs that do not contain the text in their title.
- Rules for text searching (on both sides of matching between search query and bug titles):
  - case insensitive
  - collapse whitespace
  - normalize punctuation
- Filtering happens as the user types, but performance should not be impacted.
- The search bar can be cleared with one click, and the board resets.
  - When not blank, an X appears next to the search field that clears the search field when clicked.
- Sorting is preserved during searching.
- If searching yields no results, the board should display a message saying that no bugs matched instead of the table.


# Examples

When a user searches for "login", it should match bug titles containing "Login fails" and "Issue with log-in".


# Out of Scope

- Search by description
- Search by owner
- Search by severity


# Acceptance Criteria

Scenario: Board shows all bugs when search field is blank
  Given the user is authenticated into the app
  And the user is on the board page
  And there are bugs in the database
  When the search field is blank
  Then all bugs are displayed on the board
  And no "no bugs matched" message is shown

Scenario: Typing in the search field filters bugs by title
  Given the user is authenticated into the app
  And the user is on the board page
  And there are bugs in the database including bugs whose titles contain "login"
  When the user types "login" in the search field
  Then only bugs whose titles contain "login" (after normalization) are displayed
  And bugs whose titles do not contain "login" are not displayed

Scenario: Search matching is case insensitive and normalizes whitespace and punctuation
  Given the user is authenticated into the app
  And the user is on the board page
  And there are bugs in the database with titles "Login fails" and "Issue with log-in"
  When the user types "login" in the search field
  Then the bugs "Login fails" and "Issue with log-in" are displayed
  And only bugs matching the normalized query are displayed

Scenario: Clearing the search with the X control resets the board
  Given the user is authenticated into the app
  And the user is on the board page
  And there are bugs in the database
  And the user has entered text in the search field so that the X clear control is visible
  When the user clicks the X clear control next to the search field
  Then the search field is blank
  And all bugs are displayed on the board

Scenario: Sorting is preserved when searching
  Given the user is authenticated into the app
  And the user is on the board page
  And there are bugs in the database
  And the user has sorted the board by a column (e.g. Title ascending)
  When the user types text in the search field that matches some bugs
  Then the matching bugs are displayed in the same sort order (e.g. Title ascending)
  And the column header still shows the same sort indicator

Scenario: No results message when search matches no bugs
  Given the user is authenticated into the app
  And the user is on the board page
  And there are bugs in the database
  When the user types text in the search field that matches no bug title
  Then the board displays a message that no bugs matched
  And the bug table shows no bug rows
