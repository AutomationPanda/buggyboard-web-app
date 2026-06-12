import type { Locator, Page } from '@playwright/test';

export class BoardPage {
  readonly page: Page;
  readonly bugTable: Locator;
  readonly newBugButton: Locator;
  readonly logoutButton: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bugTable = page.getByRole('table', { name: 'Bugs' });
    this.newBugButton = page.getByRole('button', { name: 'New Bug' });
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
    this.searchInput = page.getByRole('search', { name: 'Search bugs by title' });
  }

  async openCreateBugModal() {
    await this.newBugButton.click();
  }
}
