const {
  launchLoop, prepareLoop, setLanguage, skipTidepoolOnboarding, setFaceID,
} = require('../../utilities/prepareTest');
const action = require('../../utilities/action');
const { HomeScreen, PumpSimulatorScreen, SimpleBolusCalcScreen } = require('../../screens/exportAllScreens');

describe('Pump Errors', () => {
  let setup;
  beforeAll(async () => {
    setup = {
      language: 'enUS',
      mockTherapySettings: true,
      pumpSimulator: true,
    };
  });
  it('prepares loop', async () => {
    await launchLoop(setFaceID());
    await skipTidepoolOnboarding(setup);
    await prepareLoop(setup);
  });
  describe('error on suspend', () => {
    let homeScreen;
    let pumpSimulatorScreen;
    beforeAll(async () => {
      homeScreen = new HomeScreen(setLanguage(setup));
      pumpSimulatorScreen = new PumpSimulatorScreen(setLanguage(setup));
    });
    it('generates an error on suspend', async () => {
      await homeScreen.PumpPill.tap();
      await action.scrollUntilVisible(pumpSimulatorScreen.ErrorOnSuspendToggle, 'up');
      await pumpSimulatorScreen.ErrorOnSuspendToggle.tap();
      await action.scrollUntilVisible(pumpSimulatorScreen.SuspendDeliveryButton, 'down');
      await pumpSimulatorScreen.SuspendDeliveryButton.tap();
      await action.waitForElementToBeVisible(pumpSimulatorScreen.AcceptAlertButton, 5000);
      await pumpSimulatorScreen.AcceptAlertButton.tap();
      await pumpSimulatorScreen.DoneButton.tap();
    });
    it('accepts alert and checks for pump pill status', async () => {
      await expect(homeScreen.TempBannerInsulinSuspended).toBeNotVisible();
      await expect(homeScreen.TempBannerInsulinSuspended).toBeNotVisible();
    });
    it('removes error on suspend', async () => {
      await homeScreen.PumpPill.tap();
      await action.scrollUntilVisible(pumpSimulatorScreen.ErrorOnSuspendToggle, 'up');
      await pumpSimulatorScreen.ErrorOnSuspendToggle.tap();
      await pumpSimulatorScreen.DoneButton.tap();
      await action.waitForElementToBeVisible(homeScreen.PodReservoirIcon, 5000);
    });
  });
  describe('general pump error', () => {
    let homeScreen;
    let pumpSimulatorScreen;
    let simpleBolusCalcScreen;
    beforeAll(async () => {
      homeScreen = new HomeScreen(setLanguage(setup));
      pumpSimulatorScreen = new PumpSimulatorScreen(setLanguage(setup));
      simpleBolusCalcScreen = new SimpleBolusCalcScreen(setLanguage(setup));
    });
    it('generates a general pump error', async () => {
      await homeScreen.PumpPill.tap();
      await pumpSimulatorScreen.CausePumpErrorButton.tap();
      await pumpSimulatorScreen.DoneButton.tap();
    });
    it('checks for pump pill status', async () => {
      await expect(homeScreen.PumpErrorStatus).toBeVisible();
    });
    it('attempt to deliver a bolus', async () => {
      await homeScreen.BolusButton.tap();
      await action.waitForElementToBeVisible(simpleBolusCalcScreen.SimpleBolusCalcHeader, 5000);
      await simpleBolusCalcScreen.CurrentGlucoseEntryField.replaceText('180');
      await simpleBolusCalcScreen.SaveAndDeliverButton.tap();
      await action.Authenticate();
    });
    it('does not deliver bolus', async () => {
      await expect(homeScreen.TempBannerBolus).toBeNotVisible();
    });
    it('resolves pump error', async () => {
      await homeScreen.PumpPill.tap();
      await pumpSimulatorScreen.ResolvePumpErrorButton.tap();
      await pumpSimulatorScreen.DoneButton.tap();
      await expect(homeScreen.PumpErrorStatus).toBeNotVisible();
    });
  });
  describe('occlusion error', () => {
    let homeScreen;
    let pumpSimulatorScreen;
    let simpleBolusCalcScreen;
    beforeAll(async () => {
      homeScreen = new HomeScreen(setLanguage(setup));
      pumpSimulatorScreen = new PumpSimulatorScreen(setLanguage(setup));
      simpleBolusCalcScreen = new SimpleBolusCalcScreen(setLanguage(setup));
    });
    it('generates an occlusion error', async () => {
      await homeScreen.PumpPill.tap();
      await pumpSimulatorScreen.DetectOcclusionButton.tap();
      await pumpSimulatorScreen.DoneButton.tap();
    });
    it('checks for pump pill status', async () => {
      await expect(homeScreen.PumpOcclusionStatus).toBeVisible();
    });
    it('attempt to deliver a bolus', async () => {
      await homeScreen.BolusButton.tap();
      await action.waitForElementToBeVisible(simpleBolusCalcScreen.SimpleBolusCalcHeader, 5000);
      await simpleBolusCalcScreen.CurrentGlucoseEntryField.replaceText('180');
      await simpleBolusCalcScreen.SaveAndDeliverButton.tap();
      await action.Authenticate();
    });
    it('does not deliver bolus', async () => {
      await expect(homeScreen.TempBannerBolus).toBeNotVisible();
    });
    it('resolves occlusion error', async () => {
      await homeScreen.PumpPill.tap();
      await pumpSimulatorScreen.ResolveOcclusionErrorButton.tap();
      await pumpSimulatorScreen.DoneButton.tap();
      await expect(homeScreen.PumpOcclusionStatus).toBeNotVisible();
    });
  });
  describe('no insulin remaining error', () => {
    let homeScreen;
    let pumpSimulatorScreen;
    let simpleBolusCalcScreen;
    beforeAll(async () => {
      homeScreen = new HomeScreen(setLanguage(setup));
      pumpSimulatorScreen = new PumpSimulatorScreen(setLanguage(setup));
      simpleBolusCalcScreen = new SimpleBolusCalcScreen(setLanguage(setup));
    });
    it('generates no insulin remaining', async () => {
      await homeScreen.PumpPill.tap();
      await pumpSimulatorScreen.ReservoirRemainingButton.tap();
      await pumpSimulatorScreen.ReservoirTextField.replaceText('0');
      await pumpSimulatorScreen.BackToPumpSettingsButton.tap();
      await pumpSimulatorScreen.DoneButton.tap();
    });
    it('checks for pump pill status', async () => {
      await expect(homeScreen.NoInsulinStatus).toBeVisible();
    });
    it('attempt to deliver a bolus', async () => {
      await homeScreen.BolusButton.tap();
      await action.waitForElementToBeVisible(simpleBolusCalcScreen.SimpleBolusCalcHeader, 5000);
      await simpleBolusCalcScreen.CurrentGlucoseEntryField.replaceText('180');
      await simpleBolusCalcScreen.SaveAndDeliverButton.tap();
      await action.Authenticate();
    });
    it('does not deliver bolus', async () => {
      await expect(homeScreen.TempBannerBolus).toBeNotVisible();
    });
  });
});
