import { type Locator, type Page } from '@playwright/test';

export class BoardPage {
  readonly page: Page;
  readonly newBugButton: Locator;
  readonly bugTable: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newBugButton = page.getByRole('button', { name: 'New Bug' });
    this.bugTable = page.getByRole('table', { name: 'Bugs' });
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
  }

  async openCreateBugModal() {
    await this.newBugButton.click();
  }

  bugRowByTitle(title: string): Locator {
    return this.page.getByRole('button', { name: new RegExp(title) });
  }

  async logout() {
    await this.logoutButton.click();
    await this.page.waitForURL(/\/login$/);
  }
}
