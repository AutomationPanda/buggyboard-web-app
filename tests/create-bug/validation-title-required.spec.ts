// spec: specs/testing/create-bug-test-plan.md
// seed: tests/seed-authenticated.spec.ts
import { test, expect } from '../fixtures';

test.describe('Validation', () => {
  test('title-field-required', async ({
    authenticatedBoard,
    createBugModal,
  }) => {
    // 1. Start authenticated on `/board` (via seed)
    // 2. Click the New Bug button
    await createBugModal.openFromBoard(authenticatedBoard);

    // 3. Clear the Title field
    await createBugModal.fillTitle('');

    // 4. Fill Owner and Description with valid values
    await createBugModal.fillOwner('buggy');
    await createBugModal.fillDescription('Description for validation test.');

    // 5. Click the Save button
    await createBugModal.save();

    await expect(createBugModal.dialog).toBeVisible();
    await expect(createBugModal.validationAlert).toContainText('Title is required.');
  });
});
