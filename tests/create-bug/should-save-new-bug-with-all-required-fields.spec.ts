// spec: specs/testing/06-create-bug.plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';
import { listBugs } from '../helpers/bugs-api';
import { seedUser } from '../helpers/seed-user';

test.describe('Saving a new bug', () => {
  test('should-save-new-bug-with-all-required-fields', async ({
    authenticatedBoard,
    boardPage,
    createBugModal,
    page,
  }) => {
    const title = 'Login fails with special characters';
    const description = 'When I use < and > in my password, login fails.';

    // 1. Note the current bug count via GET /api/bugs
    const bugsBefore = await listBugs(page);

    // 2. Click the New Bug button in the board title bar
    await boardPage.openCreateBugModal();

    // 3. Enter title in the Title field
    await createBugModal.fillTitle(title);

    // 4. Select HIGH in the Severity combobox
    await createBugModal.selectSeverity('HIGH');

    // 5. Enter description in the Description field
    await createBugModal.fillDescription(description);

    // 6. Click the Save button
    const saveResponse = page.waitForResponse(
      (response) =>
        response.url().includes('/api/bugs') && response.request().method() === 'POST',
    );
    await createBugModal.save();
    const response = await saveResponse;

    expect(response.status()).toBe(201);
    const savedBug = await response.json();
    expect(savedBug).toMatchObject({
      title,
      severity: 'HIGH',
      owner: seedUser.username,
      description,
    });
    expect(typeof savedBug.id).toBe('number');

    await expect(createBugModal.dialog).not.toBeVisible();

    const bugsAfter = await listBugs(page);
    expect(bugsAfter.length).toBe(bugsBefore.length + 1);
    expect(bugsAfter.some((bug) => bug.id === savedBug.id && bug.title === title)).toBe(true);
  });
});
