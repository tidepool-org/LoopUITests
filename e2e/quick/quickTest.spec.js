const { Test, Config } = require('../../src/index');
const { accessibilityTests } = require('../../tests/accessibility/index');

describe('smoke test', () => {
    var test = new Test();
    var config = new Config();
    it('prepare test', async () => {
        config = await config.prepare();
        test = test.withLanguage(config.text).withSettingDefault(config.settingDefault);
        await test.prepare();
    });
    describe('accessibility', () => {
        describe('home screen', () => {
            accessibilityTests.homeScreenAccessibilityTests(test);
        });
    });
});
