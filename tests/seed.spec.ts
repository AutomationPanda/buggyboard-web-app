import users from '../users.json' with { type: 'json' };
import { test, expect } from './fixtures';

test('seed', async ({ loginPage, boardPage }) => {
  const { username, password } = users[0];

  await loginPage.goto();
  await loginPage.login(username, password);

  await expect(boardPage.bugTable).toBeVisible();
  await expect(boardPage.newBugButton).toBeVisible();
});
