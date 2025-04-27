export class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.nameInput = page.locator('#name');
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.registerButton = page.locator('#register');
    this.successMessage = page.locator('#success-message');
  }

  async register(name, email, password) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.registerButton.click();
  }

  async getSuccessMessage() {
    return await this.successMessage.textContent();
  }
}