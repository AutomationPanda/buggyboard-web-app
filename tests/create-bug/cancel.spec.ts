import { test, expect, uniqueTitle, DEFAULT_USER } from '../fixtures';

test('CREATE-006: Cancel closes modal without saving', async ({
  authenticatedBoard,
  boardPage,
  createBugModal,
}) => {
  const title = uniqueTitle('Cancelled bug');

  // Arrange
  await boardPage.openNewBugModal();
  await createBugModal.fillForm({
    title,
    severity: 'MID',
    owner: DEFAULT_USER,
    description: 'This bug should not be saved.',
  });

  // Act
  await createBugModal.cancel();

  // Assert
  await expect(createBugModal.dialog).toBeHidden();
  await expect(boardPage.bugRow(title)).toHaveCount(0);
});
