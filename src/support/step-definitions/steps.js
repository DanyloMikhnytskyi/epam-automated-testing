const { Given, When, Then } = require("@wdio/cucumber-framework");
const { expect } = require("chai");
const { LoginPage, InventoryPage } = require("../pom/index.js");
const logger = require("../../utils/logger.js");

Given(/^I am logged in as a standard user$/, async () => {
  logger.info("Navigating to login page");

  await LoginPage.open();

  await browser.execute(() => window.localStorage.clear());
  await browser.execute(() => window.sessionStorage.clear());
  await browser.deleteCookies();

  await browser.refresh();

  logger.info("Logging in with standard_user");
  await LoginPage.login("standard_user", "secret_sauce");
});

When(/^I sort the items by "([^"]*)"$/, async (sortOption) => {
  await InventoryPage.selectSortOption(sortOption);
});

Then(
  /^I should( not)? see the items sorted by price in ascending order$/,
  async (notFlag) => {
    const actualPrices = await InventoryPage.getPricesAsNumbers();
    const expectedSortedPrices = [...actualPrices].sort((a, b) => a - b);

    logger.info(`Actual Scraped Prices: ${actualPrices}`);
    logger.info(`Expected Sorted Prices: ${expectedSortedPrices}`);

    if (notFlag) {
      expect(actualPrices).to.not.deep.equal(
        expectedSortedPrices,
        "Items were unexpectedly sorted correctly by price!"
      );
    } else {
      expect(actualPrices).to.deep.equal(
        expectedSortedPrices,
        "Items are not sorted correctly by price!"
      );
    }
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
