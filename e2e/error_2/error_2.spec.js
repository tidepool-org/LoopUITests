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
  describe('generate error on suspend', () => {
    let pumpScreen;
    let statusScreen;
    beforeAll(async () => {
      pumpScreen = await test.OpenPumpScreen();
      await pumpScreen.OpenPumpControls();
      await pumpScreen.Apply({ errorOnSuspend: true });
      await pumpScreen.SuspendDeliveryButton.tap();
    });
    it('and check error shown on pump setting screen', async () => {
      await pumpScreen.HasAlert();
    });
    it('then dismiss the error', async () => {
      await pumpScreen.OKDismissAlertButton.tap();
    });
    it('and reset error on suspend', async () => {
      await pumpScreen.Apply({ errorOnSuspend: false });
      await pumpScreen.BackButton.tap();
      await pumpScreen.DoneButton.tap();
    });
    it('and check no error on status screen', async () => {
      statusScreen = await test.OpenStatusScreen();
      await expect(statusScreen.HeaderSection.PumpErrorLabel).toBeNotVisible();
    });
    it('and check closed loop green message', async () => {
      await statusScreen.HeaderSection.ExpectClosedLoopGreenAlert();
    });
  });
  describe('generate general pump error', () => {
    let statusScreen;
    let pumpScreen;
    beforeAll(async () => {
      pumpScreen = await test.OpenPumpScreen();
      await pumpScreen.OpenPumpControls();
      await pumpScreen.CausePumpErrorButton.tap();
      await pumpScreen.BackButton.tap();
      await pumpScreen.DoneButton.tap();
      statusScreen = await test.OpenStatusScreen();
    });
    afterAll(async () => {
      pumpScreen = await test.OpenPumpScreen();
      await pumpScreen.OpenPumpControls();
      await pumpScreen.ResolvePumpErrorButton.tap();
      await pumpScreen.BackButton.tap();
      await pumpScreen.DoneButton.tap();
    });
    it('and check error shown on status screen', async () => {
      await expect(statusScreen.HeaderSection.PumpErrorLabel).toBeVisible();
    });
    it('and check closed loop green message', async () => {
      await statusScreen.HeaderSection.ExpectClosedLoopGreenAlert();
    });
  });
  describe('generate occlusion error', () => {
    let statusScreen;
    let pumpScreen;
    beforeAll(async () => {
      pumpScreen = await test.OpenPumpScreen();
      await pumpScreen.OpenPumpControls();
      await pumpScreen.DetectOcclusionButton.tap();
      await pumpScreen.BackButton.tap();
      await pumpScreen.DoneButton.tap();
      statusScreen = await test.OpenStatusScreen();
    });
    afterAll(async () => {
      pumpScreen = await test.OpenPumpScreen();
      await pumpScreen.OpenPumpControls();
      await pumpScreen.ResolveOcclusionButton.tap();
      await pumpScreen.BackButton.tap();
      await pumpScreen.DoneButton.tap();
    });
    it('and check error shown on status screen', async () => {
      await expect(statusScreen.HeaderSection.PumpOcclusionLabel).toBeVisible();
    });
    it('and check closed loop green message', async () => {
      await statusScreen.HeaderSection.ExpectClosedLoopGreenAlert();
    });
  });
  describe('generate error when no insulin', () => {
    let statusScreen;
    beforeAll(async () => {
      await test.LoopUtilities.updateInsulinReservoir(0);
    });
    afterAll(async () => {
      await test.LoopUtilities.updateInsulinReservoir(150);
    });
    it('and check error shown on status screen', async () => {
      statusScreen = await test.OpenStatusScreen();
      await expect(statusScreen.HeaderSection.PumpNoInsulinLabel).toBeVisible();
    });
    it('and check closed loop green message', async () => {
      await statusScreen.HeaderSection.ExpectClosedLoopGreenAlert();
    });
  });
});
