// spec: specs/test-plans/03-login.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Failed login', () => {
  test('should-show-generic-error-for-invalid-password', async ({ loginPage }) => {
    await loginPage.goto();

    // 1. Enter username `buggy` and password `wrong-password`
    await loginPage.fillCredentials('buggy', 'wrong-password');

    // 2. Click Login
    await loginPage.clickLogin();

    await expect(loginPage.page).toHaveURL(/\/login$/);
    await expect(loginPage.errorAlert).toHaveText('Invalid username or password.');
  });
});
