const Page = require("../base/page.js");

class SecurePage extends Page {
  get flashAlert() {
    return $("#flash");
  }
}

module.exports = new SecurePage();
