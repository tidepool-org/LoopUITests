const { Test, Config } = require('../../src/index');
const errorsTests = require('../../tests/errors/index');

describe('error test', () => {
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
    describe('pump', () => {
        errorsTests.pumpTests(test);
    });
});
