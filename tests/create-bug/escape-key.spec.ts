// spec: specs/testing/create-bug-test-plan.md
// seed: tests/seed-authenticated.spec.ts
import { test, expect } from '../fixtures';

test.describe('Closing without saving', () => {
  test('escape-key-closes-without-saving', async ({
    authenticatedBoard,
    createBugModal,
  }) => {
    const title = `Escape test ${Date.now()}`;

    // 1. Start authenticated on `/board` (via seed)
    // 2. Click the New Bug button
    await createBugModal.openFromBoard(authenticatedBoard);

    // 3. Type a unique title into the Title field
    await createBugModal.fillTitle(title);

    // 4. Press the Escape key
    await createBugModal.pressEscape();

    await expect(createBugModal.dialog).not.toBeVisible();
    await expect(authenticatedBoard.bugRowByTitle(title)).not.toBeVisible();
  });
});
