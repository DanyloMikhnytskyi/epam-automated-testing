const eslint = require("@eslint/js");
const globals = require("globals");
const pluginWdio = require("eslint-plugin-wdio");

module.exports = [
  eslint.configs.recommended,
  {
    plugins: {
      wdio: pluginWdio,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        browser: "readonly",
        $: "readonly",
        $$: "readonly",
        expect: "readonly",
        Given: "readonly",
        When: "readonly",
        Then: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      ...pluginWdio.configs.recommended.rules,
    },
  },
];
