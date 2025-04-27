import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import 'dotenv/config';
import data from './data/data.json';

test.describe('Fictional App - Login', () => {
  
  test.beforeEach(async ({ page }) => {
    switch (process.env.TEST_ENV) {
      case 'dev':
        console.log('Running in DEV environment');
        await page.goto(`${process.env.URL_DEV}/login`);
        break;
      case 'test':
        console.log('Running in TEST environment');
        await page.goto(`${process.env.URL_TEST}/login`);
        break;
      case 'prod':
        console.log('Running in PROD environment');
        await page.goto(`${process.env.URL_PROD}/login`);
        break;
      default:
        throw new Error('Invalid test environment');
    }
  });
  
  test('User can log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.login(data.login.valid.username, data.login.valid.password);
    expect(await loginPage.getSuccessMessage()).toContain('Login successful');
  });

  test('User gets error message with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.login(data.login.invalid.username, data.login.invalid.password);
    expect(await loginPage.getErrorMessage()).toContain('Error');
  });

});