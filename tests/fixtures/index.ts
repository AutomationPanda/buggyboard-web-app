import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { BoardPage } from '../pages/board-page';
import { CreateBugModal } from '../pages/create-bug-modal';
import { seedUser } from '../helpers/seed-user';

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
    await loginPage.login(seedUser.username, seedUser.password);
    await use();
  },
});

export { expect };
