// spec: specs/test-plans/03-login.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Failed login', () => {
  test('should-show-error-for-blank-username-and-password', async ({ loginPage }) => {
    await loginPage.goto();

    // 1. Leave Username and Password blank
    // 2. Click Login
    await loginPage.clickLogin();

    await expect(loginPage.page).toHaveURL(/\/login$/);
    await expect(loginPage.errorAlert).toHaveText('Please enter your username and password.');
  });
});
