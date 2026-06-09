import { test, expect, uniqueTitle, DEFAULT_USER } from '../fixtures';

test('CREATE-004: Save new bug with all required fields', async ({
  authenticatedBoard,
  boardPage,
  createBugModal,
  page,
}) => {
  const title = uniqueTitle('Login fails with special characters');

  // Act
  await boardPage.openNewBugModal();
  await createBugModal.fillForm({
    title,
    severity: 'HIGH',
    owner: DEFAULT_USER,
    description: 'When I use < and > in my password, login fails.',
  });
  await createBugModal.save();

  // Assert
  await expect(createBugModal.dialog).toBeHidden();
  await expect(boardPage.bugRow(title)).toBeVisible();
  await expect(boardPage.bugRow(title)).toContainText('HIGH');

  await page.reload();
  await expect(boardPage.bugRow(title)).toBeVisible();
});
