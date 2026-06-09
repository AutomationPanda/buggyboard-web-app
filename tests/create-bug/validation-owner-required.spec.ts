// spec: specs/testing/create-bug-test-plan.md
// seed: tests/seed-authenticated.spec.ts
import { test, expect } from '../fixtures';

test.describe('Validation', () => {
  test('owner-field-required', async ({
    authenticatedBoard,
    createBugModal,
  }) => {
    // 1. Start authenticated on `/board` (via seed)
    // 2. Click the New Bug button
    await createBugModal.openFromBoard(authenticatedBoard);

    // 3. Fill Title and Description with valid values
    await createBugModal.fillTitle(`Owner validation ${Date.now()}`);
    await createBugModal.fillDescription('Description for validation test.');

    // 4. Clear the Owner field
    await createBugModal.fillOwner('');

    // 5. Click the Save button
    await createBugModal.save();

    await expect(createBugModal.dialog).toBeVisible();
    await expect(createBugModal.validationAlert).toContainText('Owner is required.');
  });
});
