export class CartPage {
  constructor(page) {
    this.page = page;
    this.addedProductTitle = page.locator('#cart-item-title');
    this.checkoutButton = page.locator('#checkout');
  }

  async getAddedProductTitle() {
    return await this.addedProductTitle.textContent();
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }
}