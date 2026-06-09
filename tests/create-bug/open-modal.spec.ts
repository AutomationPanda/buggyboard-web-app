// spec: specs/testing/create-bug-test-plan.md
// seed: tests/seed-authenticated.spec.ts
import { test, expect } from '../fixtures';

test.describe('Opening the modal', () => {
  test('open-modal-from-new-bug-button', async ({
    authenticatedBoard,
    createBugModal,
  }) => {
    // 1. Start authenticated on `/board` (via seed)
    // 2. Click the New Bug button
    await createBugModal.openFromBoard(authenticatedBoard);

    await expect(createBugModal.dialog).toBeVisible();
    await expect(createBugModal.titleInput).toBeVisible();
    await expect(createBugModal.severitySelect).toBeVisible();
    await expect(createBugModal.ownerInput).toBeVisible();
    await expect(createBugModal.descriptionInput).toBeVisible();
    await expect(createBugModal.saveButton).toBeVisible();
    await expect(createBugModal.cancelButton).toBeVisible();
  });
});
