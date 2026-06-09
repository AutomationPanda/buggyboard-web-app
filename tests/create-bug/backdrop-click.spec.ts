import { test, expect, uniqueTitle, DEFAULT_USER } from '../fixtures';

test('CREATE-009: Backdrop click does not close modal', async ({
  authenticatedBoard,
  boardPage,
  createBugModal,
}) => {
  const title = uniqueTitle('Backdrop click bug');

  // Arrange
  await boardPage.openNewBugModal();
  await createBugModal.fillForm({
    title,
    severity: 'MID',
    owner: DEFAULT_USER,
    description: 'Modal should stay open after backdrop click.',
  });

  // Act
  await createBugModal.clickBackdrop();

  // Assert
  await expect(createBugModal.dialog).toBeVisible();
  await expect(createBugModal.titleInput).toHaveValue(title);
  await expect(createBugModal.descriptionInput).toHaveValue(
    'Modal should stay open after backdrop click.',
  );
});
