const { Given, When, Then } = require("@wdio/cucumber-framework");
const { expect } = require("chai");
const LoginPage = require("../pageobjects/login.page.js");
const InventoryPage = require("../pageobjects/inventory.page.js");
const logger = require("../../utils/logger.js");

Given(/^I am logged in as a standard user$/, async () => {
  logger.info("Navigating to login page");

  await browser.reloadSession();

  await LoginPage.open();
  logger.info("Logging in with standard_user");
  await LoginPage.login("standard_user", "secret_sauce");
});

When(/^I sort the items by "([^"]*)"$/, async (sortOption) => {
  await InventoryPage.selectSortOption(sortOption);
});

Then(
  /^I should see the items sorted by price in ascending order$/,
  async () => {
    const actualPrices = await InventoryPage.getPricesAsNumbers();
    const expectedSortedPrices = [...actualPrices].sort((a, b) => a - b);

    logger.info(`Actual Scraped Prices: ${actualPrices}`);
    logger.info(`Expected Sorted Prices: ${expectedSortedPrices}`);

    expect(actualPrices).to.deep.equal(
      expectedSortedPrices,
      "Items are not sorted correctly by price!"
    );
  }
);

When(/^I add "([^"]*)" to the cart$/, async (itemName) => {
  await InventoryPage.clickButtonForItem(itemName, "Add to cart");
});

When(/^I remove "([^"]*)" from the cart$/, async (itemName) => {
  await InventoryPage.clickButtonForItem(itemName, "Remove");
});

Then(/^the cart badge should show "([^"]*)"$/, async (expectedCount) => {
  const actualCount = await InventoryPage.getCartBadgeCount();
  logger.info(
    `Validating cart badge. Expected: ${expectedCount}, Actual: ${actualCount}`
  );
  expect(actualCount).to.equal(expectedCount, `Cart badge count is incorrect!`);
});
