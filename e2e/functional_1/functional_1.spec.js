const { Config } = require('../../src/config/index');
const { Test } = require('../../src/test');

describe('loop functional test', () => {
  let test = new Test();
  let config = new Config();
  it('prepare', async () => {
    config = await config.prepare();
    let cgmText = config.text.device.CGMSimulatorScreen;
    test = test.setup({
      language: config.text,
      screenDefaults: config.screenDefaults,
      limits: config.limits,
      authentication: { faceid: true },
      enableClosedLoop: true,
      enableTherapySettings: true,
      simulators: { cgm: true, pump: true },
      cgmData: {
        model: { name: cgmText.Model.Constant, bgValues: [87] },
        frequency: { seconds: true },
        history: { name: cgmText.History.BackfillGlucose, backfillHours: 6 },
      },
    });
    await test.prepare();
  });
  describe('carb entry', () => {
    it('can add carbs and deliver bolus', async () => {
      await test.LoopUtilities.addCarbohydratesAndDeliverBolus(1);
    });
  });
  describe('bolus', () => {
    it('can be delivered', async () => {
      await test.LoopUtilities.deliverBolus(0.1);
    });
  });
  describe('status', () => {
    it('can check loop status', async () => {
      var statusScreen = await test.OpenStatusScreen();
      await statusScreen.HeaderSection.ExpectClosedLoopGreenAlert();
    });
  });
  describe('settings', () => {
    var settingsScreen;
    it('can open', async () => {
      settingsScreen = await test.OpenSettingsScreen();
    });
    describe('therapy settings', () => {
      var therapySettingsScreen;
      it('can open', async () => {
        therapySettingsScreen = await settingsScreen.OpenTherapySettings();
      });
      describe('correction range', () => {
        let correctionRangeScreen;
        it('can open ', async () => {
          correctionRangeScreen = await therapySettingsScreen.OpenCorrectionRangeScreen();
        });
        let startMin = 105;
        let startMax = 115;
        let finalMin = startMin - 5;
        let finalMax = startMax - 5;
        it('can change the time ', async () => {
          await correctionRangeScreen.OpenPicker('8:00 AM');
          await correctionRangeScreen.SetPickerTime('8:30 AM');
        });
        it('can change the min value', async () => {
          await correctionRangeScreen.ApplyOne({
            expected: {
              min: finalMin,
              max: startMax,
            },
            current: {
              min: startMin,
              max: startMax,
            },
          });
        });
        it('can change the max value', async () => {
          await correctionRangeScreen.ApplyOne({
            expected: {
              min: finalMin,
              max: finalMax,
            },
            current: {
              min: finalMin,
              max: startMax,
            },
          });
        });
        it('can save and authenticate', async () => {
          await correctionRangeScreen.SaveButton.tap({ x: 20, y: 20 });
          await correctionRangeScreen.Authenticate();
        });
      });
      it('can close', async () => {
        await therapySettingsScreen.ReturnToHomeScreen();
      });
    });
  });
});
