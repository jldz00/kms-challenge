export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.creditCardInput = page.locator('#credit-card');
    this.payButton = page.locator('#pay');
    this.successMessage = page.locator('#success-message');
  }

  async checkout(creditCard) {
    await this.creditCardInput.fill(creditCard);
    await this.payButton.click();
  }

  async getSuccessMessage() {
    return this.successMessage.textContent();
  }
}