import { test, expect, DEFAULT_USER } from '../fixtures';

test('CREATE-002: Owner defaults to current user', async ({
  authenticatedBoard,
  boardPage,
  createBugModal,
}) => {
  // Act
  await boardPage.openNewBugModal();

  // Assert
  await expect(createBugModal.ownerInput).toHaveValue(DEFAULT_USER);
});
