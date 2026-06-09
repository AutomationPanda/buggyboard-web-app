import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { BoardPage } from '../pages/board-page';
import { CreateBugModal } from '../pages/create-bug-modal';

type PageObjectFixtures = {
  loginPage: LoginPage;
  boardPage: BoardPage;
  createBugModal: CreateBugModal;
  authenticatedBoard: BoardPage;
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
  authenticatedBoard: async ({ loginPage, boardPage }, use) => {
    await loginPage.goto();
    await loginPage.login('buggy', '1970beetle');
    await use(boardPage);
  },
});

export { expect };
