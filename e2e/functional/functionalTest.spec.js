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
            .withStartScreen('home')
            .withAuth();
        await test.prepare();
    });
    describe.skip('home screen', () => {
        functionalityTests.homeScreen(test);
    });
    //TODO: requires pump setup now
    describe('carb entry screen', () => {
        functionalityTests.carbEntryScreen(test);
    });
    describe.skip('settings screen', () => {
        functionalityTests.settingsScreen(test);
    });
    describe.skip('pump simulator screen', () => {
        functionalityTests.pumpSimulatorScreen(test);
    });
    describe.skip('cgm simulator screen', () => {
        functionalityTests.cgmSimulatorScreen(test);
    });
});
