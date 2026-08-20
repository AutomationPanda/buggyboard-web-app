// spec: specs/test-plans/03-login.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Login page', () => {
  test('should-redirect-unauthenticated-user-to-login', async ({ loginPage, boardPage }) => {
    // 1. Open `/board` while signed out
    await boardPage.goto();

    await expect(loginPage.page).toHaveURL(/\/login$/);
    await expect(loginPage.loginButton).toBeVisible();
  });
});
