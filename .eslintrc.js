module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'max-len': 'off',
    'jest/expect-expect': 'off',
    'no-await-in-loop': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    'no-throw-literal': 'off',
    'jest/no-standalone-expect': 'off',
    'no-console': 'off',
    'no-else-return': 'off',
    'class-methods-use-this': 'off',
  },
};
