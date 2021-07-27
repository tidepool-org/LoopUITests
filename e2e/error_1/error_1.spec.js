const { Config } = require('../../src/config/index');
const { Test } = require('../../src/test');

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
      cgmData,
    });
    await test.prepare();
  });
  describe('signal loss', () => {
    let cgmScreen;
    let statusScreen;
    beforeAll(async () => {
      cgmScreen = await test.OpenCGMScreen();
      await cgmScreen.Apply({ model: { name: cgmScreen.screenText.Model.SignalLoss } });
    });
    afterAll(async () => {
      cgmScreen = await test.OpenCGMScreen();
      await cgmScreen.Apply(test.CGMData);
      await cgmScreen.DoneButton.tap();
    });
    it('dimiss signal loss alert', async () => {
      await waitFor(cgmScreen.Alert(cgmScreen.generalText.Dismiss)).toBeVisible().withTimeout(2000);
      await cgmScreen.DismissAlert(cgmScreen.generalText.Dismiss);
      await cgmScreen.DoneButton.tap();
    });
    it('and check error shown on status screen', async () => {
      statusScreen = await test.OpenStatusScreen();
      expect(statusScreen.HeaderSection.CGMSignalLossLabel).toBeVisible();
    });
  });
  describe('immediate alert', () => {
    let cgmScreen;
    beforeAll(async () => {
      cgmScreen = await test.OpenCGMScreen();
      await cgmScreen.Apply({ alert: { name: cgmScreen.screenText.Alerts.ImmediateAlert } });
    });
    afterAll(async () => {
      cgmScreen = await test.OpenCGMScreen();
      await cgmScreen.Apply({ alert: { name: cgmScreen.screenText.Alerts.RetractAlertAbove } });
      await cgmScreen.DoneButton.tap();
    });
    it('dismiss immediate alert', async () => {
      await waitFor(cgmScreen.Alert('FG OK')).toBeVisible().withTimeout(2000);
      await cgmScreen.DismissAlert('FG OK');
      await cgmScreen.DoneButton.tap();
    });
    it('and check error shown on status screen', async () => {
      let statusScreen = await test.OpenStatusScreen();
      expect(statusScreen.HeaderSection.CGMAlertLabel).toBeVisible();
    });
  });
});
