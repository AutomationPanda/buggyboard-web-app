// spec: specs/test-plans/03-login.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Failed login', () => {
  test('should-show-error-for-blank-password', async ({ loginPage }) => {
    await loginPage.goto();

    // 1. Enter username `buggy` and leave Password blank
    await loginPage.fillCredentials('buggy', '');

    // 2. Click Login
    await loginPage.clickLogin();

    await expect(loginPage.page).toHaveURL(/\/login$/);
    await expect(loginPage.errorAlert).toHaveText('Password cannot be blank.');
  });
});
