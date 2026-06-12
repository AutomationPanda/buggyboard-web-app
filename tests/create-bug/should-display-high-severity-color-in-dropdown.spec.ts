// spec: specs/testing/06-create-bug.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Severity color coding in the modal', () => {
  test('should-display-high-severity-color-in-dropdown', async ({
    authenticatedBoard,
    boardPage,
    createBugModal,
  }) => {
    // 1. Click the New Bug button in the board title bar
    await boardPage.openCreateBugModal();

    // 2. Select HIGH in the Severity combobox
    await createBugModal.selectSeverity('HIGH');

    await expect(createBugModal.severitySelect).toHaveCSS('color', 'rgb(184, 74, 46)');
  });
});
