# Authentication Test Plan

**Related spec:** [03-login.md](../features/03-login.md), [05-logout.md](../features/05-logout.md)  
**Page objects:** `LoginPage`, `BoardPage`

## Scope

Verify login, logout, session handling, and route protection for unauthenticated users.

---

## Test cases

### AUTH-001 — Login page displays required fields (P0)

| Step | Action |
| --- | --- |
| Arrange | Ensure no active session (fresh browser or after logout). |
| Act | Navigate to `/login`. |
| Assert | Login page is visible with username field, password field (masked), and Login button. |

**Automated hints:** `loginPage.goto()`, `expect(loginPage.usernameInput).toBeVisible()`, `expect(loginPage.passwordInput).toHaveAttribute('type', 'password')`.

---

### AUTH-002 — Valid login redirects to board (P0)

| Step | Action |
| --- | --- |
| Arrange | Login page is displayed. |
| Act | Enter `buggy` / `1970beetle` and click Login. |
| Assert | URL is `/board`; board page content is visible. |

---

### AUTH-003 — Unauthenticated access to board redirects to login (P0)

| Step | Action |
| --- | --- |
| Arrange | User is not authenticated. |
| Act | Navigate directly to `/board`. |
| Assert | App redirects to `/login`. |

**Observed:** Confirmed during exploration — `/board` redirects to `/login`.

---

### AUTH-004 — Invalid username shows error (P1)

| Step | Action |
| --- | --- |
| Arrange | Login page is displayed. |
| Act | Enter invalid username with a non-blank password; click Login. |
| Assert | User remains on `/login`; generic login failure message is displayed. |

---

### AUTH-005 — Invalid password shows error (P1)

| Step | Action |
| --- | --- |
| Arrange | Login page is displayed. |
| Act | Enter valid username `buggy` with wrong password; click Login. |
| Assert | User remains on `/login`; generic login failure message is displayed. |

---

### AUTH-006 — Blank username shows validation error (P1)

| Step | Action |
| --- | --- |
| Arrange | Login page is displayed. |
| Act | Leave username blank, enter a password, click Login. |
| Assert | User remains on `/login`; error indicates blank username. |

---

### AUTH-007 — Blank password shows validation error (P1)

| Step | Action |
| --- | --- |
| Arrange | Login page is displayed. |
| Act | Enter valid username, leave password blank, click Login. |
| Assert | User remains on `/login`; error indicates blank password. |

**Observed:** Entering username `wrong` and pressing Enter shows alert "Password cannot be blank."

---

### AUTH-008 — Blank username and password shows validation error (P1)

| Step | Action |
| --- | --- |
| Arrange | Login page is displayed. |
| Act | Leave both fields blank; click Login. |
| Assert | User remains on `/login`; error indicates missing credentials. |

---

### AUTH-009 — Username whitespace is trimmed (P2)

| Step | Action |
| --- | --- |
| Arrange | Login page is displayed. |
| Act | Enter `  buggy  ` with correct password; click Login. |
| Assert | Login succeeds; user lands on `/board`. |

---

### AUTH-010 — Enter key submits login from username field (P2)

| Step | Action |
| --- | --- |
| Arrange | Login page is displayed with valid credentials filled. |
| Act | Press Enter while focus is on the username field. |
| Assert | Same outcome as clicking Login (authenticated, on `/board`). |

---

### AUTH-011 — Enter key submits login from password field (P2)

| Step | Action |
| --- | --- |
| Arrange | Login page is displayed with valid credentials filled. |
| Act | Press Enter while focus is on the password field. |
| Assert | Same outcome as clicking Login. |

---

### AUTH-012 — Authenticated user visiting login redirects to board (P1)

| Step | Action |
| --- | --- |
| Arrange | User is logged in and on `/board`. |
| Act | Navigate to `/login`. |
| Assert | App redirects to `/board`. |

---

### AUTH-013 — Session persists after page refresh (P1)

| Step | Action |
| --- | --- |
| Arrange | User is logged in on `/board`. |
| Act | Refresh the page. |
| Assert | User remains authenticated; board page is displayed. |

---

### AUTH-014 — Logout ends session and redirects to login (P0)

| Step | Action |
| --- | --- |
| Arrange | User is logged in on `/board`. |
| Act | Click Logout in the title bar. |
| Assert | User is on `/login`; session is cleared. |

**Observed:** Confirmed — Logout navigates to `/login`.

---

### AUTH-015 — Protected page inaccessible after logout (P0)

| Step | Action |
| --- | --- |
| Arrange | User logged out and on `/login`. |
| Act | Navigate to `/board`. |
| Assert | App redirects to `/login`. |

---

### AUTH-016 — Browser back after logout does not restore session (P1)

| Step | Action |
| --- | --- |
| Arrange | User was logged in, then logged out (now on `/login`). |
| Act | Click browser back button. |
| Assert | User is not restored to an authenticated board view; remains unauthenticated. |
