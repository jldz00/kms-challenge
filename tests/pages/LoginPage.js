export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login');
    this.successMessage = page.locator('#success-message');
    this.errorMessage = page.locator('.error-message');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getSuccessMessage() {
    return await this.successMessage.textContent();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}