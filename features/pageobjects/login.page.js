const Page = require("./page.js");

class LoginPage extends Page {
  get inputUsername() {
    return $("//input[@placeholder='Username']");
  }
  get inputPassword() {
    return $("//input[@placeholder='Password']");
  }
  get btnLogin() {
    return $("//input[@type='submit']");
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
