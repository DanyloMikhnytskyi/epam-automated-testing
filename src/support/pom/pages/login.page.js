const Page = require("../base/page.js");

class LoginPage extends Page {
  get inputUsername() {
    return $("input[data-test='username']");
  }
  get inputPassword() {
    return $("input[data-test='password']");
  }
  get btnLogin() {
    return $("input[data-test='login-button']");
  }

  async login(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnLogin.click();
  }

  open() {
    return super.open("");
  }
}
module.exports = new LoginPage();
