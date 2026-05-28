# User Story

As a BuggyBoard user,
I want to delete bugs,
So that I can remove bugs that are incorrect or no longer needed.


# Design

- The "Edit bug" modal has a "Delete" button.
- Clicking the "Delete" button does **not** immediately delete the bug. Instead, it opens a confirmation modal.
- The confirmation modal:
  - Asks the user to confirm the deletion with a message that identifies the bug by its title, e.g. "Are you sure you want to delete bug #<ID>: <Title>?"
  - Has a "Delete" button that confirms the deletion.
  - Has a "Cancel" button that dismisses the confirmation modal and returns the user to the edit modal, leaving the bug unchanged.
- When the user confirms the deletion:
  - The bug is removed from the database.
  - Both the confirmation modal and the edit modal are closed.
  - The board no longer displays the deleted bug.
- When the user cancels the deletion:
  - The confirmation modal is dismissed.
  - The edit modal is still open with the bug's data unchanged.
  - The bug remains in the database.


# Acceptance Criteria

Scenario: Edit bug modal displays a delete button
  Given the user is authenticated into the app
  And the user is on the board page
  And there are bugs in the database
  When the user opens the edit modal for a bug
  Then the modal displays a "Delete" button

Scenario: Clicking the delete button opens a confirmation modal
  Given the user is authenticated into the app
  And the user is on the board page
  And there are bugs in the database
  When the user opens the edit modal for a bug
  And the user clicks the "Delete" button
  Then a confirmation modal is displayed
  And the confirmation modal includes the bug's ID and title in the message
  And the confirmation modal has a "Delete" button
  And the confirmation modal has a "Cancel" button

Scenario: Confirming deletion removes the bug and closes both modals
  Given the user is authenticated into the app
  And the user is on the board page
  And there are bugs in the database
  And the user has opened the edit modal for a bug
  And the user has clicked the "Delete" button to open the confirmation modal
  When the user clicks the "Delete" button in the confirmation modal
  Then the bug is removed from the database
  And both the confirmation modal and the edit modal are closed
  And the board no longer displays the deleted bug

Scenario: Canceling the confirmation modal leaves the bug intact
  Given the user is authenticated into the app
  And the user is on the board page
  And there are bugs in the database
  And the user has opened the edit modal for a bug
  And the user has clicked the "Delete" button to open the confirmation modal
  When the user clicks the "Cancel" button in the confirmation modal
  Then the confirmation modal is dismissed
  And the edit modal is still displayed with the bug's data unchanged
  And the bug remains in the database
  And the board still displays the bug

