module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'max-classes-per-file': 'off',
    'import/prefer-default-export': 'off',
    'no-new': 'off',
    'import/extensions': 'off', 
    'linebreak-style': 'off', 
    'eol-last': 'off', 
  },
};