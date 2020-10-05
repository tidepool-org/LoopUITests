const { Test, Config } = require('../../src/index');
const pumpTests = require('../../tests/errors/pump.tests');

describe('errors', () => {
    var test = new Test();
    var config = new Config();
    it('prepare test', async () => {
        config = await config.prepare();
        var cgmText = config.text.device.CGMSimulatorScreen;
        test = test.setup({
            language: config.text,
            screenDefaults: config.screenDefaults,
            limits: config.limits,
            settingDefault: config.settingDefault,
            authentication: { faceid: true },
            enableClosedLoop: true,
            enableTherapySettings: true,
            simulators: { cgm: true, pump: true },
            cgmData: {
                model: { name: cgmText.Model.Constant, bgValues: [101] },
                frequency: { seconds: true },
                history: { name: cgmText.History.BackfillGlucose, backfillHours: 6 },
            }
        });
        await test.prepare();
    });
    describe('from pump', () => {
        pumpTests(test);
    });
});
