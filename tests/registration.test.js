import { test, expect } from '@playwright/test';
import { RegistrationPage } from './pages/RegistrationPage.js';
import 'dotenv/config';
import data from './data/data.json';

test.describe('Fictional App - Registration', () => {
  
  test.beforeEach(async ({ page }) => {
    switch (process.env.TEST_ENV) {
      case 'dev':
        console.log('Running in DEV environment');
        await page.goto(`${process.env.URL_DEV}/registration`);
        break;
      case 'test':
        console.log('Running in TEST environment');
        await page.goto(`${process.env.URL_TEST}/registration`);
        break;
      case 'prod':
        console.log('Running in PROD environment');
        await page.goto(`${process.env.URL_PROD}/registration`);
        break;
      default:
        throw new Error('Invalid test environment');
    }
  });
  
  test('User can register with valid details', async ({ page }) => {
    const registrationPage = new RegistrationPage(page);
    
    await registrationPage.register(data.registration.name, data.registration.email, data.registration.password);
    expect(await registrationPage.getSuccessMessage()).toContain("Registration successful");
  });

});