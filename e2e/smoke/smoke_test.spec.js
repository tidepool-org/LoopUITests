const { Test, } = require('../../src/index');
const { generalTests } = require('./general');
const { accessibilityTests } = require('./accessibility');

describe('smoke test', () => {
    var test = new Test();
    it('prepare test', async () => {
        await test.prepare();
    });
    describe('accessibility', () => {
        describe('home screen', () => {
            accessibilityTests.homeScreen(test);
        });
        describe('carb entry screen', () => {
            accessibilityTests.carbEntryScreen(test);
        });
        describe('settings screen', () => {
            accessibilityTests.settingsScreen(test);
        });
        describe('bolus screen', () => {
            accessibilityTests.bolusScreen(test);
        });
    });
    describe('functionality', () => {
        describe('home screen', () => {
            generalTests.homeScreen(test);
        });
        describe('carb entry screen', () => {
            generalTests.carbEntryScreen(test);
        });
        describe('settings screen', () => {
            generalTests.settingsScreen(test);
        });
        describe('cleanup', () => {
            generalTests.cleanup(test);
        });
    });
});
