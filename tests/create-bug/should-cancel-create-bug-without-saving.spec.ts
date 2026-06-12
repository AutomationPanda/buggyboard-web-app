// spec: specs/testing/06-create-bug.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';
import { getBugCount } from '../helpers/bugs-api';

test.describe('Dismissing the modal without saving', () => {
  test('should-cancel-create-bug-without-saving', async ({
    authenticatedBoard,
    boardPage,
    createBugModal,
    page,
  }) => {
    // 1. Note the current bug count via GET /api/bugs
    const bugCountBefore = await getBugCount(page);

    let postCalled = false;
    page.on('request', (request) => {
      if (request.url().includes('/api/bugs') && request.method() === 'POST') {
        postCalled = true;
      }
    });

    // 2. Click the New Bug button in the board title bar
    await boardPage.openCreateBugModal();

    // 3. Enter Temporary title in the Title field
    await createBugModal.fillTitle('Temporary title');

    // 4. Enter Temporary description in the Description field
    await createBugModal.fillDescription('Temporary description');

    // 5. Click the Cancel button
    await createBugModal.cancel();

    await expect(createBugModal.dialog).not.toBeVisible();
    expect(postCalled).toBe(false);
    expect(await getBugCount(page)).toBe(bugCountBefore);
  });
});
