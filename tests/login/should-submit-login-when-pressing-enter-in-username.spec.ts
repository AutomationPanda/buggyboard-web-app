// spec: specs/test-plans/03-login.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Successful login', () => {
  test('should-submit-login-when-pressing-enter-in-username', async ({ loginPage }) => {
    await loginPage.goto();

    // 1. Enter username `buggy` and password `1970beetle`
    await loginPage.fillCredentials('buggy', '1970beetle');

    // 2. Press Enter while the Username field is focused
    await loginPage.submitWithEnterOnUsername();

    await expect(loginPage.page).toHaveURL(/\/board$/);
  });
});
