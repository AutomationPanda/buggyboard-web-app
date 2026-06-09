import { test } from '@playwright/test';

test('seed authenticated', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('buggy');
  await page.getByRole('textbox', { name: 'Password' }).fill('1970beetle');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL(/\/board$/);
});
