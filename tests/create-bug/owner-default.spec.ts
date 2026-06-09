// spec: specs/testing/create-bug-test-plan.md
// seed: tests/seed-authenticated.spec.ts
import { test, expect } from '../fixtures';

test.describe('Opening the modal', () => {
  test('owner-defaults-to-current-user', async ({
    authenticatedBoard,
    createBugModal,
  }) => {
    // 1. Start authenticated on `/board` as `buggy` (via seed)
    // 2. Click the New Bug button
    await createBugModal.openFromBoard(authenticatedBoard);

    await expect(createBugModal.ownerInput).toHaveValue('buggy');
  });
});
