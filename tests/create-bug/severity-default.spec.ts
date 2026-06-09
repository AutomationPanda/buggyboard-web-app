import { test, expect } from '../fixtures';

test('CREATE-003: Severity defaults to MID', async ({
  authenticatedBoard,
  boardPage,
  createBugModal,
}) => {
  // Act
  await boardPage.openNewBugModal();

  // Assert
  await expect(createBugModal.severitySelect).toHaveValue('mid');
});
