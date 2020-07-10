const { Test, Config } = require('../../src/index');
const accessibilityTests = require('../../tests/accessibility/index');

describe('smoke test', () => {
    var test = new Test();
    var config = new Config();
    it('prepare test', async () => {
        config = await config.prepare();
        test = test.withLanguage(config.text)
            .withSettingDefault(config.settingDefault)
            .withScreenDefaults(config.screenDefaults)
            .withStartScreen('home');
        await test.prepare();
    });
    describe('accessibility', () => {
        describe('home screen', () => {
            accessibilityTests.homeScreen(test);
        });
        describe('home glucose screen', () => {
            accessibilityTests.homeGlucoseScreen(test);
        });
        describe('home active insulin screen', () => {
            accessibilityTests.homeActiveInsulinScreen(test);
        });
        describe('home insulin delivery screen', () => {
            accessibilityTests.homeInsulinDeliveryScreen(test);
        });
        describe('home active carbohydrates screen', () => {
            accessibilityTests.homeActiveCarbohydratesScreen(test);
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
        describe('delivery limits settings screen', () => {
            accessibilityTests.settingsDeliveryLimitsScreen(test);
        });
        describe('insulin sensitivities settings screen', () => {
            accessibilityTests.settingsInsulinSensitivitiesScreen(test);
        });
        describe('correction range settings screen', () => {
            accessibilityTests.settingsCorrectionRangeScreen(test);
        });
        describe('suspend threshold screen', () => {
            accessibilityTests.settingsSuspendThresholdScreen(test);
        });
        describe('CGM simulator settings screen', () => {
            accessibilityTests.settingsCGMSimulatorScreenTests(test);
        });
        describe('pump simulator settings screen', () => {
            accessibilityTests.settingsPumpSimulatorScreenTests(test);
        });
        describe('basal rates settings screen', () => {
            accessibilityTests.settingsBasalRatesScreen(test);
        });
        describe('carb ratios settings screen', () => {
            accessibilityTests.settingsCarbRatioScreen(test);
        });
    });
});
