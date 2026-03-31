# SauceDemo Automated Testing Project

## Overview
This repository contains an automated E2E testing framework for the [SauceDemo](https://www.saucedemo.com/) website. It is built using **WebDriverIO**, **Cucumber BDD**, and the **Page Object Model (POM)** design pattern. 

The framework validates core functionalities such as item sorting (UC-1) and cart state management (UC-2).

## Sorting Validation Logic (UC-1)
To validate that the application correctly sorts items by "Price (low to high)", the framework implements a programmatic comparison algorithm rather than relying on hardcoded values:

1. **Data Extraction:** The test navigates the DOM and extracts the text contents of all price elements currently visible on the page.
2. **Data Transformation:** The raw text strings (e.g., `"$29.99"`) are stripped of their currency symbols (`$`) and parsed into floating-point numbers. These are stored in an array representing the `actualPrices`.
3. **Programmatic Sorting (Source of Truth):** The script creates a duplicate of the scraped array and programmatically sorts it using JavaScript's native numeric sort method: `.sort((a, b) => a - b)`. This dynamically generated array serves as the `expectedSortedPrices`.
4. **Assertion:** Finally, the framework strictly compares both arrays (`expect(actualPrices).to.deep.equal(expectedSortedPrices)`). If the website's sorting functionality breaks, the UI array will not match the mathematically sorted array, and the test will fail.

## Prerequisites
Before you begin, ensure you have the following installed on your machine:
- **Node.js** and **npm**
- **Microsoft Edge** and **Mozilla Firefox** browsers physically installed on your system.

## Quick Start (Installation & Execution)
To get this project up and running on your local machine, open your terminal and execute the following commands in order:

```bash
# 1. Clone the repository
git clone [https://github.com/DanyloMikhnytskyi/epam-automated-testing.git](https://github.com/DanyloMikhnytskyi/epam-automated-testing.git)

# 2. Navigate into the cloned project folder
cd epam-automated-testing

# 3. Install all required dependencies
npm install

# 4. Run the automated test suite
npm run wdio
