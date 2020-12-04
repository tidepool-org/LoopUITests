const { Test, Config } = require('../../src/index');
const mainTests = require('../../tests/accessibility/main.tests');

describe('accessibility', () => {
    var test = new Test();
    var config = new Config();
    it('prepare test', async () => {
        config = await config.prepare();
        test = test.setup({
            language: config.text,
            screenDefaults: config.screenDefaults,
            enableTherapySettings: true,
        });
        await test.prepare();
    });
    mainTests(test);
});
