// spec: specs/test-plans/03-login.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Successful login', () => {
  test('should-sign-in-with-valid-credentials', async ({ loginPage, boardPage }) => {
    await loginPage.goto();

    // 1. Enter username `buggy` and password `1970beetle`
    await loginPage.fillCredentials('buggy', '1970beetle');

    // 2. Click Login
    await loginPage.clickLogin();

    await expect(loginPage.page).toHaveURL(/\/board$/);
    await expect(boardPage.bugTable).toBeVisible();
  });
});
