// spec: specs/testing/create-bug-test-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Required Field Validation', () => {
  test('validation-title-required', async ({
    authenticatedBoard,
    boardPage,
    createBugModal,
  }) => {
    // 1. Click the New Bug button in the title bar
    await boardPage.openCreateBugModal();

    // 2. Leave the title field blank
    await createBugModal.clearTitle();

    // 3. Select LOW in the severity dropdown
    await createBugModal.selectSeverity('LOW');

    // 4. Leave the owner field at its default

    // 5. Type into the description field
    await createBugModal.fillDescription('Some description');

    // 6. Click the Save button
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
    expect(postRequested).toBe(false);
  });
});
