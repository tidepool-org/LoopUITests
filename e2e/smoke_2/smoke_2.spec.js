const { Test, Config } = require('../../src/index');
const accessibilityTests = require('../../tests/accessibility/index');

describe('accessibility', () => {
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
    describe('devices', () => {
        describe('g6 screen', () => {
            accessibilityTests.g6ScreenTests(test);
        });
        describe('pump screen', () => {
            accessibilityTests.pumpSimulatorScreenTests(test);
        });
        describe('cgm screen', () => {
            accessibilityTests.cgmSimulatorScreenTests(test);
        });
    });
    describe('settings', () => {
        // describe('overview screen', () => {
        //     accessibilityTests.threapySettings(test);
        // });
        // describe('delivery limits', () => {
        //     accessibilityTests.settingsDeliveryLimitsScreen(test);
        // });
        // describe('insulin sensitivities', () => {
        //     accessibilityTests.settingsInsulinSensitivitiesScreen(test);
        // });
        // describe('correction range', () => {
        //     accessibilityTests.settingsCorrectionRangeScreen(test);
        // });
        // describe('suspend threshold', () => {
        //     accessibilityTests.settingsSuspendThresholdScreen(test);
        // });
        // describe('CGM simulator', () => {
        //     accessibilityTests.settingsCGMSimulatorScreenTests(test);
        // });
        // describe('pump simulator', () => {
        //     accessibilityTests.settingsPumpSimulatorScreenTests(test);
        // });
        // describe('basal rates', () => {
        //     accessibilityTests.settingsBasalRatesScreen(test);
        // });
        // describe('carb ratios', () => {
        //     accessibilityTests.settingsCarbRatioScreen(test);
        // });
    });
});
