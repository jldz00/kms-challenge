import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { ProductSearchPage } from './pages/ProductSearchPage.js';
import { CartPage } from './pages/CartPage.js';
import { CheckoutPage } from './pages/CheckoutPage.js';
import 'dotenv/config';
import data from './data/data.json';

test.describe('Fictional App - Checkout', () => {
  
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
  
  test('User can checkout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productSearchPage = new ProductSearchPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.login(data.login.valid.username, data.login.valid.password);
    expect(await loginPage.getSuccessMessage()).toContain('Login successful');
    // Landing page contains a search bar
    await productSearchPage.search(data.productSearch.name);
    // Results are displayed
    expect(await productSearchPage.getFirstResult()).toContain(data.productSearch.name);
    // Product has a button to add to cart
    await productSearchPage.addFirstResultToCart();
    await productSearchPage.goToCart();
    // Cart page is displayed
    expect(await cartPage.getAddedProductTitle()).toContain(data.productSearch.name);
    await cartPage.goToCheckout();
    // Checkout page is displayed
    await checkoutPage.checkout(data.checkout.creditCard);
    expect(await checkoutPage.getSuccessMessage()).toContain('Payment successful');
  });

});