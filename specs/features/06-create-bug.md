# User Story

As a BuggyBoard user,
I want to create new bugs,
So that I can record and track an issue.


# Bug Data

A bug needs the following information:

1. *ID*: a unique integer identifier for the bug; automatically set when the bug is created
2. *Title*: a concise one-line description or summary of the issue
3. *Severity*: HIGH, MID, or LOW (displayed in the UI in all caps)
4. *Owner*: the name of the user who owns the bug; defaults to the current user when creating a new bug
5. *Description*: a body of text explaining the issue


# Workflow Design

When the user is logged into the BuggyBoard app,
they should be able to create a new bug from the board page by clicking a **"New Bug"** button in the **title bar**.
The app should then present a modal with fields for the user to input the bug data.
The severity field is a dropdown (HIGH, MID, LOW); the **selected severity must be displayed with the same color coding as on the board** (HIGH = strong terracotta, MID = amber, LOW = muted sage), using the CSS custom properties in specs/features/08-board-severity.md.
Each field is required and cannot be left blank.
The modal should have "save" and "cancel" buttons at the bottom.
The "save" button should save the bug to the database and close the modal.
The "cancel" button should close the modal and *not* save the bug to the database.
The modal has an **X** in the upper right corner; clicking it has the same effect as the cancel button (close without saving).
Pressing the **Escape** key while the modal is open has the same effect as the cancel button (close without saving).


# Out of Scope

- Displaying created bugs on the board page.
- Viewing individual bugs.


# Acceptance Criteria

Scenario: User can open the create-bug modal from the board page
  Given the user is authenticated into the app
  And the user is on the board page
  When the user clicks the "New Bug" button in the title bar
  Then a modal is displayed for creating a bug
  And the modal has a field for title
  And the modal has a field for severity
  And the modal has a field for owner
  And the modal has a field for description
  And the modal has a save button
  And the modal has a cancel button

Scenario: Create-bug modal defaults owner to the current user
  Given the user is authenticated into the app as "alice"
  And the user is on the board page
  When the user clicks the "New Bug" button in the title bar
  Then the create-bug modal is displayed
  And the owner field is pre-filled with "alice"

Scenario: User can save a new bug with all required fields
  Given the user is authenticated into the app
  And the user is on the board page
  And the create-bug modal is open
  When the user enters "Login fails with special characters" in the title field
  And the user selects "HIGH" in the severity field
  And the user enters "When I use < and > in my password, login fails." in the description field
  And the user clicks the save button
  Then the bug is saved to the database with the entered data
  And the modal is closed

Scenario: User can cancel creating a bug without saving
  Given the user is authenticated into the app
  And the user is on the board page
  And the create-bug modal is open
  And the user has entered some data in the modal fields
  When the user clicks the cancel button
  Then the modal is closed
  And no new bug is saved to the database

Scenario: User can close the create-bug modal with the X button
  Given the user is authenticated into the app
  And the user is on the board page
  And the create-bug modal is open
  And the user has entered some data in the modal fields
  When the user clicks the X button in the upper right corner of the modal
  Then the modal is closed
  And no new bug is saved to the database

Scenario: User can close the create-bug modal with the Escape key
  Given the user is authenticated into the app
  And the user is on the board page
  And the create-bug modal is open
  And the user has entered some data in the modal fields
  When the user presses the Escape key
  Then the modal is closed
  And no new bug is saved to the database

Scenario: Clicking outside the create-bug modal does not close it
  Given the user is authenticated into the app
  And the user is on the board page
  And the create-bug modal is open
  And the user has entered some data in the modal fields
  When the user clicks on the dimmed area outside the modal (the backdrop)
  Then the modal remains open
  And the data entered in the modal fields is preserved

Scenario: Save is blocked when required fields are blank
  Given the user is authenticated into the app
  And the user is on the board page
  And the create-bug modal is open
  When the user leaves one or more required fields blank
  And the user attempts to save
  Then the bug is not saved to the database
  And the modal remains open
  And the user is informed which fields are required

Scenario Outline: Each required field must not be blank
  Given the user is authenticated into the app
  And the user is on the board page
  And the create-bug modal is open
  When the user leaves the <field> field blank
  And the user fills in all other required fields with valid values
  And the user attempts to save
  Then the bug is not saved to the database
  And the modal remains open

  Examples:
    | field      |
    | title      |
    | severity   |
    | owner      |
    | description|
