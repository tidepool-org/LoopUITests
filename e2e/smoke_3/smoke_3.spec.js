const { Test, Config } = require('../../src/index');

describe('application smoke test', () => {
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
  it('can install and initialise loop app', async () => {
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
  it('and then close and relaunch loop', async () => {
    await test.closeAndRelaunch();
  });
  it('and check we have the loop icon', async () => {
    let statusScreen = await test.OpenStatusScreen();
    expect(statusScreen.HeaderSection.LoopIcon).toBeVisible();
  });
});
