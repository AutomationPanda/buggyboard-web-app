// spec: specs/testing/06-create-bug.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Opening the create-bug modal', () => {
  test('should-open-create-bug-modal-from-board', async ({
    authenticatedBoard,
    boardPage,
    createBugModal,
  }) => {
    // 1. Click the New Bug button in the board title bar
    await boardPage.openCreateBugModal();

    await expect(createBugModal.dialog).toBeVisible();
    await expect(createBugModal.heading).toHaveText('Create bug');
    await expect(createBugModal.titleInput).toBeVisible();
    await expect(createBugModal.severitySelect).toBeVisible();
    await expect(createBugModal.severitySelect.locator('option')).toHaveText([
      'HIGH',
      'MID',
      'LOW',
    ]);
    await expect(createBugModal.ownerInput).toBeVisible();
    await expect(createBugModal.descriptionInput).toBeVisible();
    await expect(createBugModal.saveButton).toBeVisible();
    await expect(createBugModal.cancelButton).toBeVisible();
    await expect(createBugModal.closeButton).toBeVisible();
  });
});
