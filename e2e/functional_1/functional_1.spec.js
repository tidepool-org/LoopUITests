const { Test, Config } = require('../../src/index');
const loopFunctionality = require('../../tests/functionality/index');

describe('loop functional test', () => {
    var test = new Test();
    var config = new Config();
    it('prepare', async () => {
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
                model: { name: cgmText.Model.Constant, bgValues: [93] },
                frequency: { seconds: true },
                history: { name: cgmText.History.BackfillGlucose, backfillHours: 6 },
            }
        });
        await test.prepare();
    });
    describe('run', () => {
        loopFunctionality(test);
    });
});
