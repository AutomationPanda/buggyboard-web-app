// spec: specs/testing/06-create-bug.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Required-field validation', () => {
  test('should-block-save-when-all-fields-are-blank', async ({
    authenticatedBoard,
    boardPage,
    createBugModal,
    page,
  }) => {
    let successfulPost = false;
    page.on('response', (response) => {
      if (
        response.url().includes('/api/bugs') &&
        response.request().method() === 'POST' &&
        response.status() >= 200 &&
        response.status() < 300
      ) {
        successfulPost = true;
      }
    });

    // 1. Click the New Bug button in the board title bar
    await boardPage.openCreateBugModal();

    // 2. Clear the Title field
    await createBugModal.fillTitle('');

    // 3. Clear the Owner field
    await createBugModal.fillOwner('');

    // 4. Leave the Description field blank
    await createBugModal.fillDescription('');

    // 5. Click the Save button
    await createBugModal.save();

    expect(successfulPost).toBe(false);
    await expect(createBugModal.dialog).toBeVisible();
    await expect(createBugModal.validationAlert).toContainText('Title is required.');
    await expect(createBugModal.validationAlert).toContainText('Owner is required.');
    await expect(createBugModal.validationAlert).toContainText('Description is required.');
  });
});
