const { Test, Config } = require('../../src/index');
const functionalityTests = require('../../tests/functionality/index');

describe('functional test', () => {
    var test = new Test();
    var config = new Config();
    it('prepare test', async () => {
        config = await config.prepare();
        test = test.withLanguage(config.text)
            .withLimits(config.limits)
            .withScreenDefaults(config.screenDefaults)
            .withSettingDefault(config.settingDefault)
            .withStartScreen('home');
        await test.prepare();
    });
    describe('home screen', () => {
        functionalityTests.homeScreen(test);
    });
    describe('carb entry screen', () => {
        functionalityTests.carbEntryScreen(test);
    });
    describe('settings screen', () => {
        functionalityTests.settingsScreen(test);
    });
    describe('pump simulator screen', () => {
        functionalityTests.pumpSimulatorScreen(test);
    });
    describe('cgm simulator screen', () => {
        functionalityTests.cgmSimulatorScreen(test);
    });
    describe('delivery limits screen', () => {
        functionalityTests.deliveryLimitsScreen(test);
    });
});
