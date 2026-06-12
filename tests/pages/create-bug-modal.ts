import type { Locator, Page } from '@playwright/test';

export type SeverityLevel = 'HIGH' | 'MID' | 'LOW';

export class CreateBugModal {
  readonly page: Page;
  readonly dialog: Locator;
  readonly heading: Locator;
  readonly titleInput: Locator;
  readonly severitySelect: Locator;
  readonly ownerInput: Locator;
  readonly descriptionInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly closeButton: Locator;
  readonly validationAlert: Locator;
  readonly backdrop: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dialog = page.getByRole('dialog', { name: 'Create bug' });
    this.heading = page.getByRole('heading', { name: 'Create bug' });
    this.titleInput = page.getByRole('textbox', { name: 'Title' });
    this.severitySelect = page.getByRole('combobox', { name: 'Severity' });
    this.ownerInput = page.getByRole('textbox', { name: 'Owner' });
    this.descriptionInput = page.getByRole('textbox', { name: 'Description' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.closeButton = this.dialog.getByRole('button', { name: 'Close', exact: true });
    this.validationAlert = page.getByRole('alert');
    this.backdrop = page.locator('.bug-modal-overlay');
  }

  async fillTitle(title: string) {
    await this.titleInput.fill(title);
  }

  async fillOwner(owner: string) {
    await this.ownerInput.fill(owner);
  }

  async fillDescription(description: string) {
    await this.descriptionInput.fill(description);
  }

  async selectSeverity(severity: SeverityLevel) {
    await this.severitySelect.selectOption(severity.toLowerCase());
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

  async pressEscape() {
    await this.page.keyboard.press('Escape');
  }

  async clickBackdrop() {
    await this.backdrop.click({ position: { x: 10, y: 10 } });
  }

  async clearSeveritySelection() {
    await this.severitySelect.evaluate((select: HTMLSelectElement) => {
      if (!select.querySelector('option[value=""]')) {
        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        select.appendChild(emptyOption);
      }
      select.value = '';
      select.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }
}
