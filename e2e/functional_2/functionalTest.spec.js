const { Test, Config } = require('../../src/index');
const functionality = require('../../tests/functionality/index');

describe('functional test with configured pump', () => {
    var test = new Test();
    var config = new Config();
    it('prepare test', async () => {
        config = await config.prepare();
        var cgmText = config.text.device.CGMSimulatorScreen;
        test = test.setRequired({ language: config.text, screenDefaults: config.screenDefaults })
            .addTherapySettings()
            .addSimulators({ cgm: true, pump: true })
            .addCGMData({
                model: { name: cgmText.Model.Constant, bgValues: [110] },
                frequency: { seconds: true },
                history: { name: cgmText.History.BackfillGlucose, backfillHours: 4 },
            })
            .allowAuthentication({ faceid: true });
        await test.prepare();
    });
    describe('enter carbs and deliver bolus', () => {
        functionality.carbEntryScreenTests(test);
    });
});
