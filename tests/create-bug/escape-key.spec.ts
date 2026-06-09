import { test, expect, uniqueTitle, DEFAULT_USER } from '../fixtures';

test('CREATE-008: Escape key dismisses without saving', async ({
  authenticatedBoard,
  boardPage,
  createBugModal,
}) => {
  const title = uniqueTitle('Escape key bug');

  // Arrange
  await boardPage.openNewBugModal();
  await createBugModal.fillForm({
    title,
    severity: 'MID',
    owner: DEFAULT_USER,
    description: 'This bug should not be saved.',
  });

  // Act
  await createBugModal.dismissWithEscape();

  // Assert
  await expect(createBugModal.dialog).toBeHidden();
  await expect(boardPage.bugRow(title)).toHaveCount(0);
});
