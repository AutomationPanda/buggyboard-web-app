// spec: specs/testing/06-create-bug.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';
import { seedUser } from '../helpers/seed-user';

test.describe('Required-field validation', () => {
  test('should-block-save-when-description-is-blank', async ({
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

    // 2. Enter Valid title in the Title field
    await createBugModal.fillTitle('Valid title');

    // 3. Select HIGH in the Severity combobox
    await createBugModal.selectSeverity('HIGH');

    // 4. Ensure the Owner field contains the seed user
    await expect(createBugModal.ownerInput).toHaveValue(seedUser.username);

    // 5. Leave the Description field blank
    await createBugModal.fillDescription('');

    // 6. Click the Save button
    await createBugModal.save();

    expect(successfulPost).toBe(false);
    await expect(createBugModal.dialog).toBeVisible();
    await expect(createBugModal.validationAlert).toContainText('Description is required.');
  });
});
