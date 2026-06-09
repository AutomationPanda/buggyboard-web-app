import { type Locator, type Page } from '@playwright/test';

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
  readonly validationErrors: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dialog = page.getByRole('dialog').filter({
      has: page.getByRole('heading', { name: 'Create bug' }),
    });
    this.titleInput = this.dialog.getByLabel('Title');
    this.severitySelect = this.dialog.getByLabel('Severity');
    this.ownerInput = this.dialog.getByLabel('Owner');
    this.descriptionInput = this.dialog.getByLabel('Description');
    this.saveButton = this.dialog.getByRole('button', { name: 'Save' });
    this.cancelButton = this.dialog.getByRole('button', { name: 'Cancel' });
    this.closeButton = this.dialog.getByRole('button', { name: 'Close' });
    this.validationErrors = this.dialog.getByRole('alert');
  }

  async selectSeverity(severity: 'HIGH' | 'MID' | 'LOW') {
    await this.severitySelect.selectOption(severity.toLowerCase());
  }

  async fillForm(data: {
    title?: string;
    severity?: 'HIGH' | 'MID' | 'LOW';
    owner?: string;
    description?: string;
  }) {
    if (data.title !== undefined) {
      await this.titleInput.fill(data.title);
    }
    if (data.severity !== undefined) {
      await this.selectSeverity(data.severity);
    }
    if (data.owner !== undefined) {
      await this.ownerInput.fill(data.owner);
    }
    if (data.description !== undefined) {
      await this.descriptionInput.fill(data.description);
    }
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async closeWithX() {
    await this.closeButton.click();
  }

  async dismissWithEscape() {
    await this.page.keyboard.press('Escape');
  }

  async clickBackdrop() {
    await this.dialog.click({ position: { x: 8, y: 8 } });
  }
}
