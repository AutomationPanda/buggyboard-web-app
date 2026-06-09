import { test, expect } from '../fixtures';

test('CREATE-010: Save blocked when required fields are blank', async ({
  authenticatedBoard,
  boardPage,
  createBugModal,
}) => {
  // Act
  await boardPage.openNewBugModal();
  await createBugModal.save();

  // Assert
  await expect(createBugModal.dialog).toBeVisible();
  await expect(createBugModal.validationErrors).toBeVisible();
  await expect(createBugModal.validationErrors).toContainText('Title is required.');
  await expect(createBugModal.validationErrors).toContainText('Description is required.');
});
