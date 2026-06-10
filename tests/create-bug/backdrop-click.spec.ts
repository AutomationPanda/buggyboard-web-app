// spec: specs/testing/create-bug-test-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Backdrop Behaviour', () => {
  test('backdrop-click', async ({
    authenticatedBoard,
    boardPage,
    createBugModal,
  }) => {
    const title = 'Backdrop test title';

    // 1. Click the New Bug button in the title bar
    await boardPage.openCreateBugModal();

    // 2. Type into the title field
    await createBugModal.fillTitle(title);

    // 3. Click the dimmed area outside the modal panel
    await createBugModal.clickBackdrop();

    await expect(createBugModal.dialog).toBeVisible();
    await expect(createBugModal.titleInput).toHaveValue(title);
  });
});
