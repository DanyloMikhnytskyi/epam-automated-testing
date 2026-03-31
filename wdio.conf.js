exports.config = {
  runner: "local",
  specs: ["./src/features/**/*.feature"],
  maxInstances: 2,

  services: ["geckodriver"],

  capabilities: [
    {
      maxInstances: 1,
      browserName: "firefox",
      acceptInsecureCerts: true,
      "moz:firefoxOptions": {
        args: ["-headless"],
      },
    },
    {
      maxInstances: 1,
      browserName: "MicrosoftEdge",
      acceptInsecureCerts: true,
      "ms:edgeOptions": {
        args: ["--headless", "--no-sandbox", "--disable-dev-shm-usage"],
      },
    },
  ],

  logLevel: "error",
  bail: 0,
  baseUrl: "https://www.saucedemo.com",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: "cucumber",
  reporters: ["spec"],
  cucumberOpts: {
    require: ["./src/support/step-definitions/steps.js"],
    backtrace: false,
    requireModule: [],
    dryRun: false,
    failFast: false,
    format: ["pretty"],
    colors: true,
    snippets: true,
    source: true,
    profile: [],
    strict: false,
    tagExpression: "",
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },
};
