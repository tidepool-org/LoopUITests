const { Test, Config } = require('../../src/index');
const pumpTests = require('../../tests/errors/pump.tests');
const cgmTests = require('../../tests/errors/cgm.tests');

describe('errors', () => {
    var test = new Test();
    var config = new Config();
    var cgmData;
    beforeAll(async () => {
        config = await config.prepare();
        let cgmText = config.text.device.CGMSimulatorScreen;
        cgmData = {
            model: { name: cgmText.Model.Constant, bgValues: [97] },
            frequency: { seconds: true },
            history: { name: cgmText.History.BackfillGlucose, backfillHours: 5 },
        };
    });
    it('prepare test', async () => {
        test = test.setup({
            language: config.text,
            screenDefaults: config.screenDefaults,
            limits: config.limits,
            authentication: { faceid: true },
            enableClosedLoop: true,
            warmupPeriod: { milliseconds: 10000 },
            enableTherapySettings: true,
            simulators: { cgm: true, pump: true },
            cgmData: cgmData
        });
        await test.prepare();
    });
    // describe('from pump', () => {
    //     pumpTests(test);
    // });
    describe('from cgm', () => {
        cgmTests(test, cgmData);
    });
});
