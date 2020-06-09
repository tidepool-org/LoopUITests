const { Test, Config } = require('../../src/index');
const { accessibilityTests } = require('../../tests/accessibility/index');

describe('smoke test', () => {
    var test = new Test();
    var config = new Config();
    it('prepare test', async () => {
        let testConfig = config.prepare();
        test = test.withLanguage(testConfig.text).withSettingDefault(testConfig.settingDefault);
        await test.prepare();
    });
    describe('accessibility', () => {
        describe('home screen', () => {
            accessibilityTests.homeScreenAccessibilityTests(test);
        });
    });
});
