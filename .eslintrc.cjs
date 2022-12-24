/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  "root": true,
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended"
  ],
  rules: {
    'no-undef': 'off',
    'vue/multi-word-component-names': 'off',

    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off'
  }
}
