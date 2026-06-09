import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { BoardPage } from '../pages/board-page';
import { CreateBugModal } from '../pages/create-bug-modal';

export const DEFAULT_USER = 'buggy';
export const DEFAULT_PASSWORD = '1970beetle';

type PageObjectFixtures = {
  loginPage: LoginPage;
  boardPage: BoardPage;
  createBugModal: CreateBugModal;
  authenticatedBoard: void;
};

export const test = base.extend<PageObjectFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  boardPage: async ({ page }, use) => {
    await use(new BoardPage(page));
  },
  createBugModal: async ({ page }, use) => {
    await use(new CreateBugModal(page));
  },
  authenticatedBoard: async ({ loginPage }, use) => {
    await loginPage.goto();
    await loginPage.login(DEFAULT_USER, DEFAULT_PASSWORD);
    await use();
  },
});

export { expect };

export function uniqueTitle(prefix: string): string {
  return `${prefix} ${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
