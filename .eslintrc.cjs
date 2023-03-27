/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    './.eslintrc-auto-import.json',
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/multi-word-component-names': 'off', // Multi-word component name verification
    eqeqeq: 2, // Must use congruence
    'max-lines': ['error', 1000], // Limit the number of rows
    complexity: ['error', 15] // Limit complexity
  }
};
