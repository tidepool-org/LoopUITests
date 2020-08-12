const { Test, Config } = require('../../src/index');
const functionality = require('../../tests/functionality/index');

describe('functional test with configured pump', () => {
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
    it('add and configure pump', async () => {
        await test.addConfiguredPump({
            correctionRange: {
                expected: { min: 100, max: 120, }
            },
            deliveryLimits: {
                basal: { expected: { rate: 34.00 }, },
                bolus: { expected: { amount: 18.00 }, },
            }
        });
    });
    describe('carb entry screen', () => {
        functionality.carbEntryScreenTests(test);
    });
    describe('bolus screen', () => {
        functionality.bolusScreenTests(test);
    });
});
