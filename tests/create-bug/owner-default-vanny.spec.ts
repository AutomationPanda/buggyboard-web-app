// spec: specs/testing/create-bug-test-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Owner Default for Different Users', () => {
  test('owner-default-vanny', async ({
    loginPage,
    boardPage,
    createBugModal,
  }) => {
    // 1. Log in with username vanny and password 1979bus
    await loginPage.goto();
    await loginPage.login('vanny', '1979bus');

    // 2. Click the New Bug button in the title bar
    await boardPage.openCreateBugModal();

    await expect(createBugModal.ownerInput).toHaveValue('vanny');
  });
});
