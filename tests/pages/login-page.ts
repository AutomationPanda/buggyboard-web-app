import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly logInText: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorAlert: Locator;
  readonly logo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'BuggyBoard' });
    this.logInText = page.getByText('Log in');
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorAlert = page.getByRole('alert');
    this.logo = page.locator('img[src="/logo_50x50.png"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  async gotoApp(): Promise<void> {
    await this.page.goto('/');
  }

  async fillCredentials(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillCredentials(username, password);
    await this.clickLogin();
  }

  async submitWithEnterOnUsername(): Promise<void> {
    await this.usernameInput.focus();
    await this.usernameInput.press('Enter');
  }

  async submitWithEnterOnPassword(): Promise<void> {
    await this.passwordInput.press('Enter');
  }
}
