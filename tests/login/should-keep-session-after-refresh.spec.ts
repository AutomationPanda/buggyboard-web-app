// spec: specs/test-plans/03-login.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Session', () => {
  test('should-keep-session-after-refresh', async ({ loginPage, boardPage }) => {
    await loginPage.goto();

    // 1. Sign in as `buggy` / `1970beetle` and wait for `/board`
    await loginPage.login('buggy', '1970beetle');
    await expect(loginPage.page).toHaveURL(/\/board$/);

    // 2. Refresh the page
    await boardPage.reload();

    await expect(loginPage.page).toHaveURL(/\/board$/);
    await expect(boardPage.logoutButton).toBeVisible();
  });
});
