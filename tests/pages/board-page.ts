import { type Locator, type Page } from '@playwright/test';

export class BoardPage {
  readonly page: Page;
  readonly newBugButton: Locator;
  readonly bugTable: Locator;
  readonly openFilterButton: Locator;
  readonly closedFilterButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newBugButton = page.getByRole('button', { name: 'New Bug' });
    this.bugTable = page.getByRole('table', { name: 'Bugs' });
    this.openFilterButton = page
      .getByRole('group', { name: 'Filter by bug state' })
      .getByRole('button', { name: 'Open', exact: true });
    this.closedFilterButton = page
      .getByRole('group', { name: 'Filter by bug state' })
      .getByRole('button', { name: 'Closed', exact: true });
  }

  bugRow(title: string): Locator {
    return this.bugTable.locator('tbody tr').filter({ hasText: title });
  }

  async openNewBugModal() {
    await this.newBugButton.click();
  }
}
