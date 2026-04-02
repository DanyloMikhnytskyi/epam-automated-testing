const Page = require("../base/page.js");

const USERS = {
  STANDARD: "standard_user",
  LOCKED_OUT: "locked_out_user",
  PROBLEM: "problem_user",
  PERFORMANCE_GLITCH: "performance_glitch_user",
  ERROR: "error_user",
  VISUAL: "visual_user",
};

const DEFAULT_PASSWORD = "secret_sauce";

class LoginPage extends Page {
  get users() {
    return USERS;
  }

  get inputUsername() {
    return $("input[data-test='username']");
  }
  get inputPassword() {
    return $("input[data-test='password']");
  }
  get btnLogin() {
    return $("input[data-test='login-button']");
  }

  async login(userType = "standard", password = DEFAULT_PASSWORD) {
    // Convert e.g. "locked out" or "locked_out" to "LOCKED_OUT"
    const key = userType.toUpperCase().replace(/\s+/g, "_");
    // Fallback to standard_user if the key doesn't match our USERS definition
    const actualUsername = USERS[key] || USERS.STANDARD;

    await this.inputUsername.setValue(actualUsername);
    await this.inputPassword.setValue(password);
    await this.btnLogin.click();
  }

  open() {
    return super.open("");
  }
}
module.exports = new LoginPage();
