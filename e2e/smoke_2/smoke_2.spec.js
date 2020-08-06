const { Test, Config } = require('../../src/index');
const accessibility = require('../../tests/accessibility/index');

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
            accessibility.g6ScreenTest(test);
        });
        describe('pump screen', () => {
            accessibility.pumpSimulatorScreenTest(test);
        });
        describe('cgm screen', () => {
            accessibility.cgmSimulatorScreenTest(test);
        });
    });
    describe('settings', () => {
        describe('overview screen', () => {
            accessibility.threapySettingsTest(test);
        });
        //TODO: the following require settings and pump setup once ready
        describe.skip('delivery limits', () => {
            accessibility.settingsDeliveryLimitsScreenTest(test);
        });
        describe.skip('insulin sensitivities', () => {
            accessibility.settingsInsulinSensitivitiesScreenTest(test);
        });
        describe.skip('correction range', () => {
            accessibility.settingsCorrectionRangeScreenTest(test);
        });
        describe.skip('suspend threshold', () => {
            accessibility.settingsSuspendThresholdScreenTest(test);
        });
        describe.skip('basal rates', () => {
            accessibility.settingsBasalRatesScreenTest(test);
        });
        describe.skip('carb ratios', () => {
            accessibility.settingsCarbRatioScreenTest(test);
        });
    });
});
