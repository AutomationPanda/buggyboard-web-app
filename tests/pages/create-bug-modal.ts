import { type Locator, type Page } from '@playwright/test';

export class CreateBugModal {
  readonly page: Page;
  readonly dialog: Locator;
  readonly ownerInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dialog = page.getByRole('dialog');
    this.ownerInput = page.getByRole('textbox', { name: 'Owner' });
  }
}
