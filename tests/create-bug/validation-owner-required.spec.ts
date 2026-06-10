// spec: specs/testing/create-bug-test-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Required Field Validation', () => {
  test('validation-owner-required', async ({
    authenticatedBoard,
    boardPage,
    createBugModal,
  }) => {
    // 1. Click the New Bug button in the title bar
    await boardPage.openCreateBugModal();

    // 2. Type into the title field
    await createBugModal.fillTitle('Owner blank test');

    // 3. Clear the owner field
    await createBugModal.clearOwner();

    // 4. Type into the description field
    await createBugModal.fillDescription('Some description');

    // 5. Click the Save button
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
      'Owner is required.',
    );
    expect(postRequested).toBe(false);
  });
});
