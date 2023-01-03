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
    quotes: ['warn', 'single', { 'allowTemplateLiterals': true }],
    semi: ['warn', 'never'],
    'no-undef': 'off',

    'vue/multi-word-component-names': 'off',

    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off'
  }
}
