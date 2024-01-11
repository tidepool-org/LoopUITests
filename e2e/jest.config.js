module.exports = {
  maxWorkers: 1,
  testRunner: 'jest-circus/runner',
  testTimeout: 240000,
  testMatch: ['<rootDir>/**/*.spec.js'],
  reporters: ['detox/runners/jest/reporter'],
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  testEnvironment: 'detox/runners/jest/testEnvironment',
  verbose: true,
};
