// spec: specs/testing/create-bug-test-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Required Field Validation', () => {
  test('validation-blank', async ({
    authenticatedBoard,
    boardPage,
    createBugModal,
  }) => {
    // 1. Click the New Bug button in the title bar
    await boardPage.openCreateBugModal();

    // 2. Clear the title and description fields
    await createBugModal.clearTitle();
    await createBugModal.clearDescription();

    // 3. Click the Save button
    let postRequested = false;
    createBugModal.page.on('request', (request) => {
      if (
        request.method() === 'POST' &&
        request.url().includes('/api/bugs')
      ) {
        postRequested = true;
      }
    });
    await createBugModal.save();

    await expect(createBugModal.dialog).toBeVisible();
    await expect(createBugModal.validationAlert).toContainText(
      'Title is required.',
    );
    await expect(createBugModal.validationAlert).toContainText(
      'Description is required.',
    );
    expect(postRequested).toBe(false);
  });
});
