const { Test, Config } = require('../../src/index');
const pumpTests = require('../../tests/errors/pump.tests');

describe('errors', () => {
  let test = new Test();
  let config = new Config();
  let cgmData;
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
      cgmData,
    });
    await test.prepare();
  });
  describe('from pump', () => {
    pumpTests(test);
  });
});
