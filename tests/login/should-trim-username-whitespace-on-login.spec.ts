// spec: specs/test-plans/03-login.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Successful login', () => {
  test('should-trim-username-whitespace-on-login', async ({
    loginPage,
    boardPage,
    createBugModal,
  }) => {
    await loginPage.goto();

    // 1. Enter username `  buggy  ` and password `1970beetle`
    await loginPage.fillCredentials('  buggy  ', '1970beetle');

    // 2. Click Login
    await loginPage.clickLogin();

    await expect(loginPage.page).toHaveURL(/\/board$/);

    await boardPage.openNewBug();
    await expect(createBugModal.ownerInput).toHaveValue('buggy');
  });
});
