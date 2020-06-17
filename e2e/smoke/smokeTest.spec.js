const { Test, Config } = require('../../src/index');
const accessibilityTests = require('../../tests/accessibility/index');

describe('smoke test', () => {
    var test = new Test();
    var config = new Config();
    it('prepare test', async () => {
        config = await config.prepare();
        test = test.withLanguage(config.text).withSettingDefault(config.settingDefault).withScreenDefaults(config.screenDefaults);
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
        //TODO: add back when guardrails work is complete
        describe.skip('delivery limits settings screen', () => {
            accessibilityTests.settingsDeliveryLimitsScreenAccessibilityTests(test);
        });
        describe('insulin sensitivities settings screen', () => {
            accessibilityTests.settingsInsulinSensitivitiesScreenAccessibilityTests(test);
        });
        describe('correction range settings screen', () => {
            accessibilityTests.settingsCorrectionRangeScreenAccessibilityTests(test);
        });
        describe('suspend threshold screen', () => {
            accessibilityTests.settingsSuspendThresholdScreenAccessibilityTests(test);
        });
        describe('CGM simulator settings screen', () => {
            accessibilityTests.settingsCGMSimulatorScreenTests(test);
        });
        describe('pump simulator settings screen', () => {
            accessibilityTests.settingsPumpSimulatorScreenTests(test);
        });
        describe('basal rates settings screen', () => {
            accessibilityTests.settingsBasalRatesScreenAccessibilityTests(test);
        });
        describe('carb ratios settings screen', () => {
            accessibilityTests.settingsCarbRatioScreenAccessibilityTests(test);
        });
    });
});
