const { Test, Config } = require('../../src/index');
const errorsTests = require('../../tests/errors/index');

describe('error test', () => {
    var test = new Test();
    var config = new Config();
    it('prepare test', async () => {
        config = await config.prepare();
        test = test.setRequired({ language: config.text, screenDefaults: config.screenDefaults })
            .addSettingDefault(config.settingDefault);
        await test.prepare();
    });
    describe.skip('pump', () => {
        errorsTests.pumpTests(test);
    });
    describe('cgm', () => {
        errorsTests.cgmTests(test);
    });
});
