Feature: Inventory Logic

  Background:
    Given I am logged in as a standard user

  Scenario: UC-1 Sorting Validation
    When I sort the items by "Price (low to high)"
    Then I should see the items sorted by price in ascending order

  Scenario Outline: UC-2 Cart State Logic
    When I add "<item1>" to the cart
    And I add "<item2>" to the cart
    Then the cart badge should show "2"
    When I remove "<item1>" from the cart
    Then the cart badge should show "1"

    # Data Provider / Parameterization
    Examples:
      | item1                 | item2                     |
      | Sauce Labs Backpack   | Sauce Labs Bike Light     |
      | Sauce Labs Bolt T-Shirt| Sauce Labs Fleece Jacket |