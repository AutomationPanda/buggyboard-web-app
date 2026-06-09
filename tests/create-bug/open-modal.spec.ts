import { test, expect } from '../fixtures';

test('CREATE-001: New Bug button opens create modal', async ({
  authenticatedBoard,
  boardPage,
  createBugModal,
}) => {
  // Act
  await boardPage.openNewBugModal();

  // Assert
  await expect(createBugModal.dialog).toBeVisible();
  await expect(createBugModal.titleInput).toBeVisible();
  await expect(createBugModal.severitySelect).toBeVisible();
  await expect(createBugModal.ownerInput).toBeVisible();
  await expect(createBugModal.descriptionInput).toBeVisible();
  await expect(createBugModal.cancelButton).toBeVisible();
  await expect(createBugModal.saveButton).toBeVisible();
  await expect(createBugModal.closeButton).toBeVisible();
});
