import { test, expect, uniqueTitle, DEFAULT_USER } from '../fixtures';

test('CREATE-005: New bug appears in Open state filter', async ({
  authenticatedBoard,
  boardPage,
  createBugModal,
}) => {
  const title = uniqueTitle('Open filter bug');

  // Act
  await boardPage.openNewBugModal();
  await createBugModal.fillForm({
    title,
    severity: 'LOW',
    owner: DEFAULT_USER,
    description: 'Bug created for open filter test.',
  });
  await createBugModal.save();

  // Assert
  await expect(boardPage.openFilterButton).toHaveAttribute('class', /bg-primary/);
  await expect(boardPage.bugRow(title)).toBeVisible();
});
