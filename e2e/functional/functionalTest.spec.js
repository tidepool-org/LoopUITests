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
            .withSettingDefault(config.settingDefault);
        await test.prepare();
    });
    describe('home screen', () => {
        functionalityTests.homeScreenFunctionalityTests(test);
    });
    describe('carb entry screen', () => {
        functionalityTests.carbEntryScreenFunctionalityTests(test);
    });
    describe('settings screen', () => {
        functionalityTests.settingsScreenFunctionalityTests(test);
    });
    describe('pump simulator screen', () => {
        functionalityTests.pumpSimulatorScreenTests(test);
    });
    describe('cgm simulator screen', () => {
        functionalityTests.cgmSimulatorScreenTests(test);
    });
});
