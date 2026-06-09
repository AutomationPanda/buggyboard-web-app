import type { Locator, Page } from '@playwright/test';

export class BoardPage {
  readonly page: Page;
  readonly newBugButton: Locator;
  readonly bugTable: Locator;
  readonly openStateFilter: Locator;
  readonly closedStateFilter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newBugButton = page.getByRole('button', { name: 'New Bug' });
    this.bugTable = page.getByRole('table', { name: 'Bugs' });
    this.openStateFilter = page.getByRole('group', { name: 'Filter by bug state' }).getByRole('button', { name: 'Open' });
    this.closedStateFilter = page.getByRole('group', { name: 'Filter by bug state' }).getByRole('button', { name: 'Closed' });
  }

  bugRowByTitle(title: string): Locator {
    return this.bugTable.getByRole('button', { name: new RegExp(title) });
  }

  async selectOpenStateFilter(): Promise<void> {
    await this.openStateFilter.click();
  }

  async selectClosedStateFilter(): Promise<void> {
    await this.closedStateFilter.click();
  }
}
