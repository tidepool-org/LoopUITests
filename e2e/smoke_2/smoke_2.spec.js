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
        describe('overview screen', () => {
            accessibilityTests.threapySettings(test);
        });
        //TODO: the following require settings and pump setup once ready
        describe.skip('delivery limits', () => {
            accessibilityTests.settingsDeliveryLimitsScreen(test);
        });
        describe.skip('insulin sensitivities', () => {
            accessibilityTests.settingsInsulinSensitivitiesScreen(test);
        });
        describe.skip('correction range', () => {
            accessibilityTests.settingsCorrectionRangeScreen(test);
        });
        describe.skip('suspend threshold', () => {
            accessibilityTests.settingsSuspendThresholdScreen(test);
        });
        describe.skip('basal rates', () => {
            accessibilityTests.settingsBasalRatesScreen(test);
        });
        describe.skip('carb ratios', () => {
            accessibilityTests.settingsCarbRatioScreen(test);
        });
    });
});
