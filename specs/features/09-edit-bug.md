# User Story

As a BuggyBoard user,
I want to open and edit a bug from the board,
So that I can view all its data and update it for review and analysis.


# Design

- The user can open a bug by clicking the bug's row in the board table on the board page.
- Opening a bug shows a modal that is similar in design to the modal for creating a bug.
- The modal title is **"Edit bug #&lt;id&gt;"** with the bug's ID number interpolated (e.g. "Edit bug #1").
- This modal shows the bug's ID as read-only.
- All other fields are editable.
- The severity field uses the same control as the create-bug modal (dropdown with HIGH, MID, LOW). The **selected severity in the dropdown must be displayed with the same color coding as on the board**: the dropdown’s text (and optionally a light background tint) must use the same severity colors (HIGH = strong terracotta, MID = amber, LOW = muted sage) via the CSS custom properties in specs/features/08-board-severity.md, so that the modal and board look consistent.
- The bottom of the modal has buttons for "save" and "cancel".
  - The "save" button should save any modifications to the bug to the database and close the modal.
  - The "cancel" button should close the modal and *not* save changes to the bug to the database.
- The modal has an **X** in the upper right corner; clicking it has the same effect as the cancel button (close without saving).
- Pressing the **Escape** key while the modal is open has the same effect as the cancel button (close without saving).
- Clicking the dimmed area outside the modal (the backdrop) does **not** close the modal, so the user does not lose edits by accident.
- The save button is disabled if there are no changes to the data.
- The save button is disabled if any of the fields are changed to be blank.


# Out of Scope

- Conflict detection when the same bug is edited by more than one user (last write wins).


# Acceptance Criteria

Scenario: User can open a bug from the board by clicking its row
  Given the user is authenticated into the app
  And the user is on the board page
  And there is at least one bug in the database
  When the user clicks on a bug's row in the board table
  Then a modal is displayed for viewing and editing the bug
  And the modal title is "Edit bug #&lt;id&gt;" with the bug's ID (e.g. "Edit bug #1")
  And the modal shows the bug's ID, title, severity, owner, and description
  And the modal has a save button and a cancel button

Scenario: Edit-bug modal shows ID as read-only and other fields as editable
  Given the user is authenticated into the app
  And the edit-bug modal is open for a bug
  Then the bug's ID is displayed and cannot be edited
  And the title field is editable
  And the severity field is editable
  And the owner field is editable
  And the description field is editable

Scenario: Severity in edit-bug modal uses same control and color coding as board
  Given the user is authenticated into the app
  And the edit-bug modal is open for a bug
  Then the severity field is a dropdown with options HIGH, MID, and LOW
  And the selected severity in the dropdown is displayed with the same colors as on the board (HIGH = strong terracotta, MID = amber, LOW = muted sage)

Scenario: Clicking outside the edit-bug modal does not close it
  Given the user is authenticated into the app
  And the edit-bug modal is open for a bug
  And the user has entered or modified data in the modal fields
  When the user clicks on the dimmed area outside the modal (the backdrop)
  Then the modal remains open
  And the data in the modal fields is preserved

Scenario: User can save changes to a bug
  Given the user is authenticated into the app
  And the edit-bug modal is open for a bug
  When the user edits one or more of the bug's fields
  And the user clicks the save button
  Then the bug is updated in the database with the modified data
  And the modal is closed

Scenario: User can cancel without saving changes
  Given the user is authenticated into the app
  And the edit-bug modal is open for a bug
  And the user has made changes to the bug's fields
  When the user clicks the cancel button
  Then the modal is closed
  And the bug is not updated in the database
  And the original bug data is unchanged

Scenario: User can close the edit-bug modal with the X button
  Given the user is authenticated into the app
  And the edit-bug modal is open for a bug
  And the user has made changes to the bug's fields
  When the user clicks the X button in the upper right corner of the modal
  Then the modal is closed
  And the bug is not updated in the database
  And the original bug data is unchanged

Scenario: User can close the edit-bug modal with the Escape key
  Given the user is authenticated into the app
  And the edit-bug modal is open for a bug
  And the user has made changes to the bug's fields
  When the user presses the Escape key
  Then the modal is closed
  And the bug is not updated in the database
  And the original bug data is unchanged

Scenario: Save button is disabled when there are no changes
  Given the user is authenticated into the app
  And the edit-bug modal is open for a bug
  When the user has not modified any field
  Then the save button is disabled

Scenario: Save button is disabled when any required field is blank
  Given the user is authenticated into the app
  And the edit-bug modal is open for a bug
  When the user clears one or more required fields (title, severity, owner, or description) so that they are blank
  Then the save button is disabled
  And the user cannot save until all required fields are filled
