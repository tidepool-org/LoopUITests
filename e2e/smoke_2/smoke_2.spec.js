const { Test, Config } = require('../../src/index');
const settingsAccessibility = require('../../tests/accessibility/settings/index');
const deviceAccessibility = require('../../tests/accessibility/devices/index');

describe('accessibility', () => {
    var test = new Test();
    var config = new Config();
    it('prepare test', async () => {
        config = await config.prepare();
        test = test.setup({
            language: config.text,
            screenDefaults: config.screenDefaults,
        });
        await test.prepare();
    });
    describe('devices', () => {
        describe('g6 screen', () => {
            deviceAccessibility.g6ScreenTest(test);
        });
    });
    describe('settings overview', () => {
        describe('overview screen', () => {
            settingsAccessibility.settingsScreenTest(test);
        });
        describe('therapy screen', () => {
            settingsAccessibility.therapyScreenTest(test);
        });
    });
    describe('settings', () => {
        it('add configured pump', async () => {
            await test.LoopUtilities.addConfiguredPump();
        });
        describe('delivery limits', () => {
            settingsAccessibility.deliveryLimitsScreenTest(test);
        });
        describe('suspend threshold', () => {
            settingsAccessibility.suspendThresholdScreenTest(test);
        });
        describe('correction range', () => {
            settingsAccessibility.correctionRangeScreenTest(test);
        });
        describe('basal rates', () => {
            settingsAccessibility.basalRatesScreenTest(test);
        });
        describe('carb ratios', () => {
            settingsAccessibility.carbRatioScreenTest(test);
        });
        describe('insulin sensitivities', () => {
            settingsAccessibility.insulinSensitivitiesScreenTest(test);
        });
    });
});
