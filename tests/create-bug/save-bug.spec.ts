// spec: specs/testing/create-bug-test-plan.md
// seed: tests/seed-authenticated.spec.ts
import { test, expect } from '../fixtures';

test.describe('Saving a bug', () => {
  test('save-bug-with-all-fields', async ({
    authenticatedBoard,
    createBugModal,
  }) => {
    const title = `Test bug ${Date.now()}`;

    // 1. Start authenticated on `/board` (via seed)
    // 2. Click the New Bug button
    await createBugModal.openFromBoard(authenticatedBoard);

    // 3. Type a unique title into the Title field
    await createBugModal.fillTitle(title);

    // 4. Select "HIGH" in the Severity dropdown
    await createBugModal.selectSeverity('HIGH');

    // 5. Type a description into the Description field
    await createBugModal.fillDescription('A test bug created by Playwright.');

    // 6. Click the Save button
    await createBugModal.save();

    await expect(createBugModal.dialog).not.toBeVisible();
    await expect(authenticatedBoard.bugRowByTitle(title)).toBeVisible();
  });
});
