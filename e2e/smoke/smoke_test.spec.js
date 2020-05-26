const { Test, } = require('../../src/index');
const { functionalityTests } = require('../../tests/functionality/index');
const { accessibilityTests } = require('../../tests/accessibility/index');

describe('smoke test', () => {
    var test = new Test();
    it('prepare test', async () => {
        await test.prepare();
    });
    describe('accessibility', () => {
        describe('home screen', () => {
            accessibilityTests.homeScreenAccessibilityTests(test);
        });
        describe('carb entry screen', () => {
            accessibilityTests.carbEntryScreenAccessibilityTests(test);
        });
        describe('settings screen', () => {
            accessibilityTests.settingsScreenAccessibilityTests(test);
        });
        describe('bolus screen', () => {
            accessibilityTests.bolusScreenAccessibilityTests(test);
        });
        describe('delivery limits settings screen', () => {
            accessibilityTests.settingsDeliveryLimitsScreenAccessibilityTests(test);
        });
        describe('insulin sensitivities settings screen', () => {
            accessibilityTests.settingsInsulinSensitivitiesScreenAccessibilityTests(test);
        });
        describe('correction range settings screen', () => {
            accessibilityTests.settingsCorrectionRangeScreenAccessibilityTests(test);
        });
        describe('correction suspend threshold screen', () => {
            accessibilityTests.settingsSuspendThresholdScreenAccessibilityTests(test);
        });
        //TODO: not accesible via simulator. Need to investigate
        describe.skip('basal rates settings screen', () => {
            accessibilityTests.settingsBasalRatesScreenAccessibilityTests(test);
        });
        //TODO: update when development work complete
        describe.skip('carb ratios settings screen', () => {
            accessibilityTests.settingsCarbRatiosScreenAccessibilityTests(test);
        });
    });
    describe('functionality', () => {
        describe('home screen', () => {
            functionalityTests.homeScreenFunctionalityTests(test);
        });
        describe('carb entry screen', () => {
            functionalityTests.carbEntryScreenFunctionalityTests(test);
        });
        describe('settings screen', () => {
            functionalityTests.settingsScreenFunctionalityTests(test);
        });
        describe('cleanup', () => {
            functionalityTests.cleanupFunctionalityTests(test);
        });
    });
});
