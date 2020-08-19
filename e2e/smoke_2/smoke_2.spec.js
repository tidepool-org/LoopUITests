const { Test, Config } = require('../../src/index');
const settingsAccessibility = require('../../tests/accessibility/settings/index');
const deviceAccessibility = require('../../tests/accessibility/devices/index');

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
            deviceAccessibility.g6ScreenTest(test);
        });
        describe('pump screen', () => {
            deviceAccessibility.pumpSimulatorScreenTest(test);
        });
        describe('cgm screen', () => {
            deviceAccessibility.cgmSimulatorScreenTest(test);
        });
    });
    describe('settings', () => {
        describe('overview screen', () => {
            settingsAccessibility.settingsScreenTest(test);
        });
        describe('therapy screen', () => {
            settingsAccessibility.therapyScreenTest(test);
        });
        //TODO: the following require settings and pump setup once ready
        describe.skip('delivery limits', () => {
            settingsAccessibility.deliveryLimitsScreenTest(test);
        });
        describe.skip('insulin sensitivities', () => {
            settingsAccessibility.insulinSensitivitiesScreenTest(test);
        });
        describe.skip('correction range', () => {
            settingsAccessibility.correctionRangeScreenTest(test);
        });
        describe.skip('suspend threshold', () => {
            settingsAccessibility.suspendThresholdScreenTest(test);
        });
        describe.skip('basal rates', () => {
            settingsAccessibility.basalRatesScreenTest(test);
        });
        describe.skip('carb ratios', () => {
            settingsAccessibility.carbRatioScreenTest(test);
        });
    });
});
