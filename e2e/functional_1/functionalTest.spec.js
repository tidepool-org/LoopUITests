const { Test, Config } = require('../../src/index');
const functionality = require('../../tests/functionality/index');

describe('functional test', () => {
    var test = new Test();
    var config = new Config();
    it('prepare test', async () => {
        config = await config.prepare();
        test = test.withLanguage(config.text)
            .withLimits(config.limits)
            .withScreenDefaults(config.screenDefaults)
            .withSettingDefault(config.settingDefault)
            .withAuthentication({ faceid: true });
        await test.prepare();
    });
    describe('home screen', () => {
        functionality.homeScreenTests(test);
    });
    describe('cgm simulator screen', () => {
        functionality.cgmSimulatorScreenTests(test);
    });
    describe('settings screen', () => {
        functionality.settingsScreenTests(test);
    });
    describe('pump simulator screen', () => {
        functionality.pumpSimulatorScreenTests(test);
    });
});
