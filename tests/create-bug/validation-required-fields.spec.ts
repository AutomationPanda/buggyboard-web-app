// spec: specs/testing/create-bug-test-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Required Field Validation', () => {
  test('validation-required-fields', async ({
    authenticatedBoard,
    boardPage,
    createBugModal,
  }) => {
    // 1. Click the New Bug button in the title bar
    await boardPage.openCreateBugModal();

    // 2. Click the Save button without entering any data
    await createBugModal.clearTitle();
    await createBugModal.clearDescription();

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
    await expect(createBugModal.validationAlert).toBeVisible();
    await expect(createBugModal.validationAlert).toContainText(
      'Title is required.',
    );
    await expect(createBugModal.validationAlert).toContainText(
      'Description is required.',
    );
    expect(postRequested).toBe(false);
  });
});
