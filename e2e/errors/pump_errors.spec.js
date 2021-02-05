const { Test } = require('../../src/Test');
const { Config } = require('../../src/config/index');

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
    let homeScreen;
    beforeAll(async () => {
        pumpScreen = await test.OpenPumpScreen();
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
        await pumpScreen.DoneButton.tap();
    });
    it('and check no error on status screen', async () => {
        homeScreen = await test.OpenHomeScreen();
        await expect(homeScreen.HeaderSection.PumpErrorLabel).toBeNotVisible();
    });
    it('and check closed loop green message', async () => {
        await homeScreen.HeaderSection.ExpectClosedLoopGreenAlert();
    });
  });
  describe('generate general pump error', () => {
    let homeScreen;
    let pumpScreen;
    beforeAll(async () => {
        pumpScreen = await test.OpenPumpScreen();
        await pumpScreen.CausePumpErrorButton.tap();
        await pumpScreen.DoneButton.tap();
        homeScreen = await test.OpenHomeScreen();
    });
    afterAll(async () => {
        pumpScreen = await test.OpenPumpScreen();
        await pumpScreen.ResolvePumpErrorButton.tap();
        await pumpScreen.DoneButton.tap();
    });
    it('and check error shown on status screen', async () => {
        await expect(homeScreen.HeaderSection.PumpErrorLabel).toBeVisible();
    });
    it('and check closed loop green message', async () => {
        await homeScreen.HeaderSection.ExpectClosedLoopGreenAlert();
    });
  });
  describe('generate occlusion error', () => {
    let homeScreen;
    let pumpScreen;
    beforeAll(async () => {
        pumpScreen = await test.OpenPumpScreen();
        await pumpScreen.DetectOcclusionButton.tap();
        await pumpScreen.DoneButton.tap();
        homeScreen = await test.OpenHomeScreen();
    });
    afterAll(async () => {
        pumpScreen = await test.OpenPumpScreen();
        await pumpScreen.ResolveOcclusionButton.tap();
        await pumpScreen.DoneButton.tap();
    });
    it('and check error shown on status screen', async () => {
        await expect(homeScreen.HeaderSection.PumpOcclusionLabel).toBeVisible();
    });
    it('and check closed loop green message', async () => {
        await homeScreen.HeaderSection.ExpectClosedLoopGreenAlert();
    });
  });
  describe('generate error when no insulin', () => {
    let homeScreen;
    beforeAll(async () => {
        await test.LoopUtilities.updateInsulinReservoir(0);
    });
    afterAll(async () => {
        await test.LoopUtilities.updateInsulinReservoir(150);
    });
    it('and check error shown on status screen', async () => {
        homeScreen = await test.OpenHomeScreen();
        await expect(homeScreen.HeaderSection.PumpNoInsulinLabel).toBeVisible();
    });
    it('and check closed loop green message', async () => {
        await homeScreen.HeaderSection.ExpectClosedLoopGreenAlert();
    });
  });
});
