// spec: specs/test-plans/03-login.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Session', () => {
  test('should-redirect-authenticated-user-away-from-login', async ({ loginPage, boardPage }) => {
    await loginPage.goto();

    // 1. Sign in as `buggy` / `1970beetle`
    await loginPage.login('buggy', '1970beetle');
    await expect(loginPage.page).toHaveURL(/\/board$/);

    // 2. Open `/login`
    await loginPage.goto();

    await expect(loginPage.page).toHaveURL(/\/board$/);
    await expect(boardPage.bugTable).toBeVisible();
  });
});
