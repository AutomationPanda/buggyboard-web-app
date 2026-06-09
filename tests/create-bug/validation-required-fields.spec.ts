import { test, expect, uniqueTitle, DEFAULT_USER } from '../fixtures';

const validForm = {
  title: uniqueTitle('Validation test bug'),
  severity: 'HIGH' as const,
  owner: DEFAULT_USER,
  description: 'Valid description for validation test.',
};

for (const field of ['title', 'owner', 'description'] as const) {
  test(`CREATE-011: Save blocked when ${field} is blank`, async ({
    authenticatedBoard,
    boardPage,
    createBugModal,
  }) => {
    const form = { ...validForm, title: uniqueTitle('Validation test bug') };

    // Arrange
    await boardPage.openNewBugModal();
    await createBugModal.fillForm(form);
    if (field === 'title') {
      await createBugModal.titleInput.clear();
    } else if (field === 'owner') {
      await createBugModal.ownerInput.clear();
    } else {
      await createBugModal.descriptionInput.clear();
    }

    // Act
    await createBugModal.save();

    // Assert
    await expect(createBugModal.dialog).toBeVisible();
    await expect(createBugModal.validationErrors).toBeVisible();
    await expect(boardPage.bugRow(form.title)).toHaveCount(0);
  });
}
