// spec: specs/testing/06-create-bug.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';
import { seedUser } from '../helpers/seed-user';

test.describe('Modal defaults', () => {
  test('should-default-owner-to-current-user', async ({
    authenticatedBoard,
    boardPage,
    createBugModal,
  }) => {
    // 1. Click the New Bug button in the board title bar
    await boardPage.openCreateBugModal();

    await expect(createBugModal.dialog).toBeVisible();
    await expect(createBugModal.ownerInput).toHaveValue(seedUser.username);
  });
});
