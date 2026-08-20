import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { BoardPage } from '../pages/board-page';
import { CreateBugModal } from '../pages/create-bug-modal';

type PageObjectFixtures = {
  loginPage: LoginPage;
  boardPage: BoardPage;
  createBugModal: CreateBugModal;
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
});

export { expect };
