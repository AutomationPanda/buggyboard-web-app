// spec: specs/testing/create-bug-test-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Severity Styling', () => {
  test('severity-color-mid', async ({
    authenticatedBoard,
    boardPage,
    createBugModal,
  }) => {
    // 1. Click the New Bug button in the title bar
    await boardPage.openCreateBugModal();

    await expect(createBugModal.severitySelect).toHaveClass(
      /severity-select-mid/,
    );
  });
});
