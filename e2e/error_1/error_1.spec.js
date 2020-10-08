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
            authentication: { faceid: true },
            enableClosedLoop: true,
            warmupPeriod: { milliseconds: 10000 },
            enableTherapySettings: true,
            simulators: { cgm: true, pump: true },
            cgmData: {
                model: { name: cgmText.Model.Constant, bgValues: [97] },
                frequency: { seconds: true },
                history: { name: cgmText.History.BackfillGlucose, backfillHours: 5 },
            }
        });
        await test.prepare();
    });
    describe('from pump', () => {
        pumpTests(test);
    });
});
