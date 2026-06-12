// spec: specs/testing/06-create-bug.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Modal defaults', () => {
  test('should-default-severity-to-mid', async ({
    authenticatedBoard,
    boardPage,
    createBugModal,
  }) => {
    // 1. Click the New Bug button in the board title bar
    await boardPage.openCreateBugModal();

    await expect(createBugModal.severitySelect).toHaveValue('mid');
  });
});
