// spec: specs/testing/06-create-bug.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Backdrop interaction', () => {
  test('should-not-close-modal-when-clicking-backdrop', async ({
    authenticatedBoard,
    boardPage,
    createBugModal,
  }) => {
    // 1. Click the New Bug button in the board title bar
    await boardPage.openCreateBugModal();

    // 2. Enter Preserved title in the Title field
    await createBugModal.fillTitle('Preserved title');

    // 3. Select HIGH in the Severity combobox
    await createBugModal.selectSeverity('HIGH');

    // 4. Enter Preserved description in the Description field
    await createBugModal.fillDescription('Preserved description');

    // 5. Click the dimmed backdrop area outside the modal panel
    await createBugModal.clickBackdrop();

    await expect(createBugModal.dialog).toBeVisible();
    await expect(createBugModal.titleInput).toHaveValue('Preserved title');
    await expect(createBugModal.severitySelect).toHaveValue('high');
    await expect(createBugModal.descriptionInput).toHaveValue('Preserved description');
  });
});
