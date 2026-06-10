import { test } from '@playwright/test';

test('seed', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Username').fill('buggy');
  await page.getByLabel('Password').fill('1970beetle');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL(/\/board$/);
});
