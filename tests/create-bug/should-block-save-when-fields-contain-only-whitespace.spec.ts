// spec: specs/testing/06-create-bug.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Required-field validation', () => {
  test('should-block-save-when-fields-contain-only-whitespace', async ({
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

    // 2. Enter spaces only in the Title field
    await createBugModal.fillTitle('   ');

    // 3. Select MID in the Severity combobox
    await createBugModal.selectSeverity('MID');

    // 4. Enter spaces only in the Owner field
    await createBugModal.fillOwner('   ');

    // 5. Enter spaces only in the Description field
    await createBugModal.fillDescription('   ');

    // 6. Click the Save button
    await createBugModal.save();

    expect(successfulPost).toBe(false);
    await expect(createBugModal.dialog).toBeVisible();
    await expect(createBugModal.validationAlert).toContainText('Title is required.');
    await expect(createBugModal.validationAlert).toContainText('Owner is required.');
    await expect(createBugModal.validationAlert).toContainText('Description is required.');
  });
});
