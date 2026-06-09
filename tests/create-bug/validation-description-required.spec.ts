// spec: specs/testing/create-bug-test-plan.md
// seed: tests/seed-authenticated.spec.ts
import { test, expect } from '../fixtures';

test.describe('Validation', () => {
  test('description-field-required', async ({
    authenticatedBoard,
    createBugModal,
  }) => {
    // 1. Start authenticated on `/board` (via seed)
    // 2. Click the New Bug button
    await createBugModal.openFromBoard(authenticatedBoard);

    // 3. Fill Title with a valid value
    await createBugModal.fillTitle(`Description validation ${Date.now()}`);

    // 4. Clear the Description field
    await createBugModal.fillDescription('');

    // 5. Click the Save button
    await createBugModal.save();

    await expect(createBugModal.dialog).toBeVisible();
    await expect(createBugModal.validationAlert).toContainText('Description is required.');
  });
});
