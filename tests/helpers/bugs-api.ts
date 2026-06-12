import type { Page } from '@playwright/test';

export type Bug = {
  id: number;
  title: string;
  severity: string;
  owner: string;
  description: string;
  state: string;
};

export async function listBugs(page: Page): Promise<Bug[]> {
  const response = await page.request.get('/api/bugs');
  return response.json();
}

export async function getBugCount(page: Page): Promise<number> {
  return (await listBugs(page)).length;
}
