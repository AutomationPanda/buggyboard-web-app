// spec: specs/testing/create-bug-test-plan.md
// seed: tests/seed-authenticated.spec.ts
import { test, expect } from '../fixtures';

test.describe('Bug state on create', () => {
  test('new-bug-created-with-open-state', async ({
    authenticatedBoard,
    createBugModal,
  }) => {
    const title = `Open state test ${Date.now()}`;

    // 1. Start authenticated on `/board` with Open state filter selected (via seed)
    await authenticatedBoard.selectOpenStateFilter();

    // 2. Click the New Bug button
    await createBugModal.openFromBoard(authenticatedBoard);

    // 3. Fill all required fields with a unique title
    await createBugModal.fillTitle(title);
    await createBugModal.fillDescription('Bug created to verify open state.');

    // 4. Click the Save button
    await createBugModal.save();

    await expect(authenticatedBoard.bugRowByTitle(title)).toBeVisible();

    // 5. Select the Closed state filter
    await authenticatedBoard.selectClosedStateFilter();

    await expect(authenticatedBoard.bugRowByTitle(title)).not.toBeVisible();
  });
});
