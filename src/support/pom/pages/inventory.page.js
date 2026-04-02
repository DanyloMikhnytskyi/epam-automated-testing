const Page = require("../base/page.js");
const logger = require("../../../utils/logger.js");

class InventoryPage extends Page {
  get sortDropdown() {
    return $("select[data-test='product-sort-container']");
  }
  get itemPrices() {
    return $$("div[data-test='inventory-item-price']");
  }
  get cartBadge() {
    return $(
      "a[data-test='shopping-cart-link'] span[data-test='shopping-cart-badge']"
    );
  }

  async selectSortOption(visibleText) {
    logger.info(`Sorting inventory by: ${visibleText}`);
    const dropdown = await this.sortDropdown;
    await dropdown.selectByVisibleText(visibleText);
  }

  async getPricesAsNumbers() {
    logger.info("Scraping prices from the inventory page...");
    const priceElements = await this.itemPrices;
    const prices = await Promise.all(
      priceElements.map(async (el) => {
        const text = await el.getText();
        return parseFloat(text.replace("$", ""));
      })
    );
    return prices;
  }

  async clickButtonForItem(itemName, actionText) {
    logger.info(`Clicking '${actionText}' for item: ${itemName}`);

    const actionPrefix = actionText.toLowerCase().replace(/ /g, "-");
    const itemSuffix = itemName.toLowerCase().replace(/ /g, "-");
    const dataTestId = `${actionPrefix}-${itemSuffix}`;

    const button = await $(`button[data-test='${dataTestId}']`);
    await button.waitForClickable();
    await button.click();
  }

  async getCartBadgeCount() {
    const badge = await this.cartBadge;
    if (await badge.isExisting()) {
      return await badge.getText();
    }
    return "0";
  }
}
module.exports = new InventoryPage();
