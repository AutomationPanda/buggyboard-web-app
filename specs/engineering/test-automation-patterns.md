# Test Automation Patterns

## Page Object Model

All new and refactored Playwright tests **must** use the Page Object Model (POM) pattern.
Raw, inline chains of `page.*` calls are not permitted in test files.

### Why

Page objects create a higher-level API that matches the application's language, capture
locators in one place so a selector change requires only a single edit, and make tests
readable without requiring the reader to parse low-level locator details.

### File layout

```
tests/
  fixtures/       ← one fixture file; exports test and expect for all spec files
    index.ts
  pages/          ← one file per page or modal; one class per file
    login-page.ts
    board-page.ts
    create-bug-modal.ts
    edit-bug-modal.ts
  create-bug/
    open-modal.spec.ts
  edit-bug/
    open-modal.spec.ts
  ...
```

### One class per file, one file per page

Create a separate page object class for each distinct page or modal in the application.
Do not combine multiple pages into a single file.

Current pages / modals that require a page object class:

| Page / Modal | File |
|---|---|
| Login page | `tests/pages/login-page.ts` |
| Board page | `tests/pages/board-page.ts` |
| Create Bug modal | `tests/pages/create-bug-modal.ts` |
| Edit Bug modal | `tests/pages/edit-bug-modal.ts` |

Add a new file whenever a new page or modal is introduced.

### Class structure

Follow the conventions from the [Playwright POM documentation](https://playwright.dev/docs/pom):

```typescript
import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL(/\/board$/);
  }
}
```

Rules:
- Accept `page: Page` as the sole constructor argument.
- Declare every locator used by the class as a `readonly` field initialized in the constructor.
- Keep navigation and interaction logic in methods; keep assertions in test files or dedicated assertion helpers, not in page object methods.
- Methods should return `void` (or a sub-page object when a navigation produces a new page) — never return raw locators from methods.

### Usage in tests

Tests must **never** construct page objects directly. Instead, import `test` and `expect`
from `tests/fixtures` and receive page objects as fixture parameters:

```typescript
import { test, expect } from '../fixtures';

test('board page shows bug table after login', async ({ loginPage, boardPage }) => {
  await loginPage.goto();
  await loginPage.login('buggy', '1970beetle');

  await expect(boardPage.bugTable).toBeVisible();
});
```

- Import `test` and `expect` from `../fixtures` (not from `@playwright/test`) in every spec file.
- Declare only the page object fixtures the test needs as destructured parameters.
- Call page object methods for all interactions (Act).
- Assert directly against page object locators using `expect` (Assert).
- Never mix raw `page.*` calls alongside page object calls in the same test.

## Page Object Fixtures

Every page object must have a corresponding fixture so tests receive page objects
automatically rather than constructing them with `new`.

### Why

Fixtures eliminate boilerplate constructor calls in every test, co-locate setup and
teardown with the object they manage, and let Playwright initialize only the fixtures
each test actually needs.

### Fixture file

All fixtures live in a single file: `tests/fixtures/index.ts`. That file re-exports
`test` (extended with page object fixtures) and `expect` so spec files have a single,
consistent import point.

```typescript
import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { BoardPage } from '../pages/board-page';
import { CreateBugModal } from '../pages/create-bug-modal';
import { EditBugModal } from '../pages/edit-bug-modal';

type PageObjectFixtures = {
  loginPage: LoginPage;
  boardPage: BoardPage;
  createBugModal: CreateBugModal;
  editBugModal: EditBugModal;
};

export const test = base.extend<PageObjectFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  boardPage: async ({ page }, use) => {
    await use(new BoardPage(page));
  },
  createBugModal: async ({ page }, use) => {
    await use(new CreateBugModal(page));
  },
  editBugModal: async ({ page }, use) => {
    await use(new EditBugModal(page));
  },
});

export { expect };
```

Rules:
- Follow the [Playwright fixtures documentation](https://playwright.dev/docs/test-fixtures) patterns.
- Use `test.extend<T>()` with a typed interface listing every fixture.
- Each fixture receives `{ page }` and calls `await use(new PageObject(page))`.
- Place setup code before `await use()` and teardown code after it when needed.
- Add a new fixture entry whenever a new page object class is created.
- Spec files must import `{ test, expect }` from `'../fixtures'`, never from `'@playwright/test'`.

## Other Patterns

### Atomic tests

Every test covers exactly one behaviour. A test that clicks through five pages to verify
one assertion is a grand tour, not an atomic test. Grand tours make failures hard to
diagnose; split them.

### Arrange-Act-Assert

Structure every test body as:

1. **Arrange** – set up preconditions (navigate, seed data, instantiate page objects).
2. **Act** – perform the single action under test.
3. **Assert** – verify the expected outcome.

### Test independence

No test may rely on state created by another test. Each test must create its own
preconditions (via `seed.spec.ts` helpers or direct API calls) and leave the database
in a state that does not affect subsequent tests.
