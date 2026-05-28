# User Story

As a BuggyBoard user,
I want to log into the app with my user credentials,
So that I can manage bugs as myself.


# Design

- The BuggyBoard app has a typical login page at `/login`:
  - It displays the BuggyBoard logo at the top of the login card, above the app title. The logo uses the same asset as the title bar (`frontend/public/logo_50x50.png`), is centered, and appears in a rounded box with a border that matches the username and password fields.
  - It has a username field.
  - It has a password field.
  - It has a login button.
- Only users listed in the `users.json` file are valid login credentials.
- When the user logs in, the app goes to the board page at `/board`.
  - For now, it can display an empty page that just says "Welcome!".


# Acceptance Criteria

Scenario: BuggyBoard displays the login page
  Given the user is not authenticated into the app
  When the app's `/login` path is loaded in a web browser
  Then the app displays the login page
  And the login page displays a username field
  And the login page displays a password field with password masking
  And the login page displays a login button

Scenario: BuggyBoard redirects to the login page when the user is not authenticated
  Given the user is not authenticated into the app
  When any app page other than `/login` is loaded in a web browser
  Then the app redirects to the `/login` page

Scenario: Valid BuggyBoard login
  Given the login page is displayed
  When the user enters valid user credentials from the `users.json` file
  And the user clicks the login button
  Then the user is authenticated into the app
  And the app's board page is displayed at `/board`

Scenario Outline: Submit login on Enter
  Given the login page is displayed
  When the user types the Enter key while on the <field> field
  Then the login page triggers the same behavior as clicking on the login button

  Examples:
    | field    |
    | username |
    | password |

Scenario: BuggyBoard login with invalid username
  Given the login page is displayed
  When the user enters an invalid username into the login page
  But the user enters something for a password
  And the user clicks the login button
  Then the user is not authenticated into the app
  And the login page displays a generic error message indicating a failed login attempt

Scenario: BuggyBoard login with invalid password
  Given the login page is displayed
  When the user enters a valid username from the `users.json` file into the login page
  But the user enters an invalid password for that username
  And the user clicks the login button
  Then the user is not authenticated into the app
  And the login page displays a generic error message indicating a failed login attempt

Scenario: BuggyBoard login with blank username
  Given the login page is displayed
  When the user leaves the username blank on the login page
  But the user enters something for a password
  And the user clicks the login button
  Then the user is not authenticated into the app
  And the login page displays an error message indicating a blank username

Scenario: BuggyBoard login with blank password
  Given the login page is displayed
  When the user enters a valid username from the `users.json` file into the login page
  But the user leaves the password blank on the login page
  And the user clicks the login button
  Then the user is not authenticated into the app
  And the login page displays an error message indicating a blank password

Scenario: BuggyBoard login with blank username and password
  Given the login page is displayed
  When the user leaves the username blank on the login page
  And the user leaves the password blank on the login page
  And the user clicks the login button
  Then the user is not authenticated into the app
  And the login page displays an error message indicating a missing login credentials

Scenario: Trim leading and trailing whitespace from username
  Given the login page is displayed
  When the user enters a valid username from the `users.json` file into the login page with leading and trailing whitespace
  And the user enters the correct password for the username into the login page
  And the user clicks the login button
  Then the app trims the leading and trailing whitespace from the username
  And login is successful

Scenario: BuggyBoard redirects to the board page when an authenticated user loads the login page
  Given the user is authenticated into the app
  When the user attempts to visit the login page
  Then the app redirects the user to the board page

Scenario: Authenticated sessions are persistent
  Given a user is authenticated into the app
  When the user refreshes the page
  Then the user remains authenticated into the app
