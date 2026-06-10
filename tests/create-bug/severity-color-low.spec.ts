// spec: specs/testing/create-bug-test-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Severity Styling', () => {
  test('severity-color-low', async ({
    authenticatedBoard,
    boardPage,
    createBugModal,
  }) => {
    // 1. Click the New Bug button in the title bar
    await boardPage.openCreateBugModal();

    // 2. Select LOW in the severity dropdown
    await createBugModal.selectSeverity('LOW');

    await expect(createBugModal.severitySelect).toHaveClass(
      /severity-select-low/,
    );
  });
});
