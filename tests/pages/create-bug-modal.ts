import { type Locator, type Page } from '@playwright/test';

export type Severity = 'HIGH' | 'MID' | 'LOW';

export class CreateBugModal {
  readonly page: Page;
  readonly dialog: Locator;
  readonly titleInput: Locator;
  readonly severitySelect: Locator;
  readonly ownerInput: Locator;
  readonly descriptionInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly closeButton: Locator;
  readonly validationAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dialog = page.getByRole('dialog', { name: 'Create bug' });
    this.titleInput = page.getByRole('textbox', { name: 'Title' });
    this.severitySelect = page.getByLabel('Severity');
    this.ownerInput = page.getByRole('textbox', { name: 'Owner' });
    this.descriptionInput = page.getByRole('textbox', { name: 'Description' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.closeButton = page.getByRole('button', { name: 'Close', exact: true });
    this.validationAlert = page.getByRole('alert');
  }

  async fillTitle(title: string) {
    await this.titleInput.fill(title);
  }

  async clearTitle() {
    await this.titleInput.clear();
  }

  async selectSeverity(severity: Severity) {
    await this.severitySelect.selectOption(severity);
  }

  async fillOwner(owner: string) {
    await this.ownerInput.fill(owner);
  }

  async clearOwner() {
    await this.ownerInput.clear();
  }

  async fillDescription(description: string) {
    await this.descriptionInput.fill(description);
  }

  async clearDescription() {
    await this.descriptionInput.clear();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async close() {
    await this.closeButton.click();
  }

  async pressEscape() {
    await this.page.keyboard.press('Escape');
  }

  async clickBackdrop() {
    await this.page.mouse.click(20, 20);
  }
}
