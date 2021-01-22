/* eslint-disable import/no-extraneous-dependencies */
const detox = require('detox');
const adapter = require('detox/runners/jest/adapter');
const specReporter = require('detox/runners/jest/specReporter');
const config = require('../package.json').detox;

let testSummary;

// Set the default timeout
jest.setTimeout(180000);
jasmine.getEnv().addReporter(adapter);

// This takes care of generating status logs on a per-spec basis. By default, jest only reports at file-level.
// This is strictly optional.
jasmine.getEnv().addReporter(specReporter);

beforeAll(async () => {
  await detox.init(config, { launchApp: false });
});

beforeEach(async () => {
  testSummary = { title: '', fullName: '', status: 'running' };
  await detox.beforeEach(testSummary);
  await adapter.beforeEach();
});

afterEach(async () => {
  await detox.beforeEach(testSummary);
});

afterAll(async () => {
  await adapter.afterAll();
  await detox.cleanup();
});
