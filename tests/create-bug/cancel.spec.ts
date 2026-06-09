// spec: specs/testing/create-bug-test-plan.md
// seed: tests/seed-authenticated.spec.ts
import { test, expect } from '../fixtures';

test.describe('Closing without saving', () => {
  test('cancel-closes-without-saving', async ({
    authenticatedBoard,
    createBugModal,
  }) => {
    const title = `Cancel test ${Date.now()}`;

    // 1. Start authenticated on `/board` (via seed)
    // 2. Click the New Bug button
    await createBugModal.openFromBoard(authenticatedBoard);

    // 3. Type a unique title into the Title field
    await createBugModal.fillTitle(title);

    // 4. Click the Cancel button
    await createBugModal.cancel();

    await expect(createBugModal.dialog).not.toBeVisible();
    await expect(authenticatedBoard.bugRowByTitle(title)).not.toBeVisible();
  });
});
