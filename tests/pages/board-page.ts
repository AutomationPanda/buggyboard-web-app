import { type Locator, type Page } from '@playwright/test';

export class BoardPage {
  readonly page: Page;
  readonly bugTable: Locator;
  readonly logoutButton: Locator;
  readonly newBugButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bugTable = page.getByRole('table', { name: 'Bugs' });
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
    this.newBugButton = page.getByRole('button', { name: 'New Bug' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/board');
  }

  async reload(): Promise<void> {
    await this.page.reload();
  }

  async openNewBug(): Promise<void> {
    await this.newBugButton.click();
  }
}
