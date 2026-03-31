const Page = require("../base/page.js");
const logger = require("../../../utils/logger.js");

class InventoryPage extends Page {
  get sortDropdown() {
    return $("//select[@class='product_sort_container']");
  }
  get itemPrices() {
    return $$("//div[@class='inventory_item_price']");
  }
  get cartBadge() {
    return $("//span[@class='shopping_cart_badge']");
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

    const xpath = `//div[contains(text(), '${itemName}')]/ancestor::div[contains(@class, 'inventory_item')]//button[contains(text(), '${actionText}')]`;

    const button = await $(xpath);
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
