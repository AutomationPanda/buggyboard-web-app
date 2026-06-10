// spec: specs/testing/create-bug-test-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Open Create Bug Modal', () => {
  test('open-modal', async ({
    authenticatedBoard,
    boardPage,
    createBugModal,
  }) => {
    // 1. Click the New Bug button in the title bar
    await boardPage.openCreateBugModal();

    await expect(createBugModal.dialog).toBeVisible();
    await expect(createBugModal.titleInput).toBeVisible();
    await expect(createBugModal.severitySelect).toBeVisible();
    await expect(createBugModal.severitySelect.locator('option')).toHaveCount(3);
    await expect(createBugModal.severitySelect.locator('option').nth(0)).toHaveText('HIGH');
    await expect(createBugModal.severitySelect.locator('option').nth(1)).toHaveText('MID');
    await expect(createBugModal.severitySelect.locator('option').nth(2)).toHaveText('LOW');
    await expect(createBugModal.ownerInput).toBeVisible();
    await expect(createBugModal.descriptionInput).toBeVisible();
    await expect(createBugModal.saveButton).toBeVisible();
    await expect(createBugModal.cancelButton).toBeVisible();
  });
});
