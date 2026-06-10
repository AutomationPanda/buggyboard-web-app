// spec: specs/testing/create-bug-test-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Required Field Validation', () => {
  test('validation-description-required', async ({
    authenticatedBoard,
    boardPage,
    createBugModal,
  }) => {
    // 1. Click the New Bug button in the title bar
    await boardPage.openCreateBugModal();

    // 2. Type into the title field
    await createBugModal.fillTitle('Missing description');

    // 3. Leave the description field blank
    await createBugModal.clearDescription();

    // 4. Click the Save button
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
      'Description is required.',
    );
    expect(postRequested).toBe(false);
  });
});
