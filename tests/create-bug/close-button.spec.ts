import { test, expect, uniqueTitle, DEFAULT_USER } from '../fixtures';

test('CREATE-007: Close button dismisses without saving', async ({
  authenticatedBoard,
  boardPage,
  createBugModal,
}) => {
  const title = uniqueTitle('Close button bug');

  // Arrange
  await boardPage.openNewBugModal();
  await createBugModal.fillForm({
    title,
    severity: 'MID',
    owner: DEFAULT_USER,
    description: 'This bug should not be saved.',
  });

  // Act
  await createBugModal.closeWithX();

  // Assert
  await expect(createBugModal.dialog).toBeHidden();
  await expect(boardPage.bugRow(title)).toHaveCount(0);
});
