# User Story

As a BuggyBoard user,
I want to log out of the app when I am authenticated,
So that I can close my session and prevent other users from using my credentials.


# Design

- The title bar (see [04-title-bar.md](04-title-bar.md)) has the logout button.


# Acceptance Criteria

Scenario: Authenticated user logs out of the app
  Given the user is authenticated
  And the board page is displayed
  When the user clicks the logout button on the board page title bar
  Then the user is logged out of the app and no longer authenticated
  And the app redirects to the login page

Scenario: User cannot access protected content after logging out
  Given the user was authenticated and has logged out
  When the user navigates to the board page
  Then the app redirects the user to the login page

Scenario: Browser back button after logout does not restore session
  Given the user was authenticated and has logged out
  And the user is on the login page
  When the user uses the browser back button
  Then the app does not restore the previous session
  And the user remains not authenticated

Scenario: Logged-out user landing on protected page is redirected to login
  Given the user has logged out
  When the user lands on a protected page (e.g. via the browser back button)
  Then the app redirects the user to the login page
