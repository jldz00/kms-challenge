export class ProductSearchPage {
  constructor(page) {
    this.page = page;
    this.queryInput = page.locator('#query');
    this.searchButton = page.locator('#search');
    this.firstResultTitle = page.locator('#results').first().locator('span');
    this.resultsCategory = page.locator('#results-category');
    this.firstResultAddToCartButton = page.locator('#results').first().locator('button');
    this.cartButton = page.locator('#cart');
  }

  async search(productName) {
    await this.queryInput.fill(productName);
    await this.searchButton.click();
  }

  async getFirstResult() {
    return await firstResult.textContent();
  }

  async getResultsCategory() {
    return await this.resultsCategory.textContent();
  }

  async addFirstResultToCart() {
    await this.firstResultAddToCartButton.click();
  }

  async goToCart() {
    await this.cartButton.click();
  }
}