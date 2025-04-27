import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { ProductSearchPage } from './pages/ProductSearchPage.js';
import 'dotenv/config';
import data from './data/data.json';

test.describe('Fictional App - Product Search', () => {
  
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
  
  test('User can search for a product by its name', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productSearchPage = new ProductSearchPage(page);

    await loginPage.login(data.login.valid.username, data.login.valid.password);
    // Landing page contains a search bar
    await productSearchPage.search(data.productSearch.name);
    // Results are displayed
    expect(await productSearchPage.getFirstResult()).toContain(data.productSearch.name);
  });

  test('User can search for a product category', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productSearchPage = new ProductSearchPage(page);
    
    await loginPage.login(data.login.valid.username, data.login.valid.password);
    // Landing page contains a search bar
    await productSearchPage.search(data.productSearch.category);
    // Results are displayed
    expect(await productSearchPage.getResultsCategory()).toContain(data.productSearch.category);
  });

});