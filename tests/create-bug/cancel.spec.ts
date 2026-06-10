// spec: specs/testing/create-bug-test-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Cancel and Close Without Saving', () => {
  test('cancel', async ({
    authenticatedBoard,
    boardPage,
    createBugModal,
  }) => {
    const title = `Test cancel flow ${Date.now()}`;

    // 1. Click the New Bug button in the title bar
    await boardPage.openCreateBugModal();

    // 2. Type into the title field
    await createBugModal.fillTitle(title);

    // 3. Click the Cancel button
    let postRequested = false;
    createBugModal.page.on('request', (request) => {
      if (
        request.method() === 'POST' &&
        request.url().includes('/api/bugs')
      ) {
        postRequested = true;
      }
    });
    await createBugModal.cancel();

    await expect(createBugModal.dialog).not.toBeVisible();
    expect(postRequested).toBe(false);
    await expect(boardPage.bugRowByTitle(title)).not.toBeVisible();
  });
});
