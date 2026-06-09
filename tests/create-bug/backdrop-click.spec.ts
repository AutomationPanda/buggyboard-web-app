// spec: specs/testing/create-bug-test-plan.md
// seed: tests/seed-authenticated.spec.ts
import { test, expect } from '../fixtures';

test.describe('Closing without saving', () => {
  test('backdrop-click-does-not-close', async ({
    authenticatedBoard,
    createBugModal,
  }) => {
    const title = `Backdrop test ${Date.now()}`;

    // 1. Start authenticated on `/board` (via seed)
    // 2. Click the New Bug button
    await createBugModal.openFromBoard(authenticatedBoard);

    // 3. Type a unique title into the Title field
    await createBugModal.fillTitle(title);

    // 4. Click the dimmed backdrop area outside the modal
    await createBugModal.clickBackdrop();

    await expect(createBugModal.dialog).toBeVisible();
    await expect(createBugModal.titleInput).toHaveValue(title);
  });
});
