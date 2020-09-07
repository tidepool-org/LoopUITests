const { Test, Config } = require('../../src/index');
const functionality = require('../../tests/functionality/index');

describe('functional test with configured pump', () => {
    var test = new Test();
    var config = new Config();
    it('prepare test', async () => {
        config = await config.prepare();
        var cgmText = config.text.device.CGMSimulatorScreen;
        test = test.withLanguage(config.text)
            .withScreenDefaults(config.screenDefaults)
            .withTherapySettings()
            .withSimulators({ cgm: true, pump: true })
            .withCGMData({
                model: { name: cgmText.Model.Constant, bgValues: [110] },
                frequency: { seconds: true },
                history: { name: cgmText.History.BackfillGlucose, backfillHours: 4 },
            })
            .withAuthentication({ faceid: true });
        await test.prepare();
    });
    describe('enter carbs and deliver bolus', () => {
        functionality.carbEntryScreenTests(test);
    });
});
