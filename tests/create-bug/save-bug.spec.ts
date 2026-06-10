// spec: specs/testing/create-bug-test-plan.md
// seed: tests/seed.spec.ts
import { test, expect } from '../fixtures';

test.describe('Save Bug', () => {
  test('save-bug', async ({
    authenticatedBoard,
    boardPage,
    createBugModal,
  }) => {
    const title = `Login fails with special characters ${Date.now()}`;

    // 1. Click the New Bug button in the title bar
    await boardPage.openCreateBugModal();

    // 2. Type into the title field
    await createBugModal.fillTitle(title);

    // 3. Select HIGH in the severity dropdown
    await createBugModal.selectSeverity('HIGH');

    // 4. Type into the description field
    await createBugModal.fillDescription(
      'When I use < and > in my password, login fails.',
    );

    // 5. Click the Save button
    const responsePromise = createBugModal.page.waitForResponse(
      (response) =>
        response.url().includes('/api/bugs') &&
        response.request().method() === 'POST',
    );
    await createBugModal.save();
    const response = await responsePromise;

    await expect(createBugModal.dialog).not.toBeVisible();
    expect(response.status()).toBe(201);
    await expect(
      boardPage.page.getByRole('button', {
        name: new RegExp(`HIGH.*${title}.*buggy`),
      }),
    ).toBeVisible();
  });
});
