const {
  launchLoop, prepareLoop, setLanguage, skipTidepoolOnboarding, setFaceID,
} = require('../../utilities/prepareTest');
const action = require('../../utilities/action');
const { HomeScreen, BolusCalcScreen, InsulinDeliveryScreen } = require('../../screens/exportAllScreens');

describe('Deliver bolus in closed loop mode', () => {
  let setup;
  beforeAll(async () => {
    setup = {
      language: 'enUS',
      mockTherapySettings: true,
      cgmSimulator: true,
      cgmStandardData: true,
      pumpSimulator: true,
      closedLoop: true,
    };
  });
  it('prepares loop', async () => {
    await launchLoop(setFaceID());
    await skipTidepoolOnboarding(setup);
    await prepareLoop(setup);
  });
  describe('Delivers a bolus', () => {
    let homeScreen;
    let bolusCalcScreen;
    let insulinDeliveryScreen;
    beforeAll(async () => {
      homeScreen = new HomeScreen(setLanguage(setup));
      bolusCalcScreen = new BolusCalcScreen(setLanguage(setup));
      insulinDeliveryScreen = new InsulinDeliveryScreen(setLanguage(setup));
    });
    it('delivers a bolus', async () => {
      await homeScreen.BolusButton.tap();
      await action.waitForElementToBeVisible(bolusCalcScreen.BolusCalcHeader, 5000);
      await bolusCalcScreen.BolusTextField.replaceText('0.1');
      await bolusCalcScreen.DeliverButton.tap();
      await action.Authenticate();
    });
    it('verifies temporary status banner', async () => {
      await expect(homeScreen.TempBannerBolus).toBeVisible();
    });
    it('waits for bolus to finish', async () => {
      await action.waitForElementToBeNotVisible(homeScreen.TempBannerBolus, 5000);
    });
    it('verifies entry in insulin delivery screen', async () => {
      await homeScreen.InsulinDeliveryChart.tap();
      await expect(insulinDeliveryScreen.BolusEvent).toBeVisible();
      await insulinDeliveryScreen.BackToHomeScreenButton.tap();
    });
  });
  describe('Interrupts bolus', () => {
    let homeScreen;
    let bolusCalcScreen;
    beforeAll(async () => {
      homeScreen = new HomeScreen(setLanguage(setup));
      bolusCalcScreen = new BolusCalcScreen(setLanguage(setup));
    });
    it('delivers a bolus', async () => {
      await homeScreen.BolusButton.tap();
      await action.waitForElementToBeVisible(bolusCalcScreen.BolusCalcHeader, 5000);
      await bolusCalcScreen.BolusTextField.replaceText('0.5');
      await bolusCalcScreen.DeliverButton.tap();
      await action.Authenticate();
    });
    it('stops bolus', async () => {
      await homeScreen.TempBannerBolus.tap();
    });
    it('verifies bolus is stopped', async () => {
      await action.waitForElementToBeNotVisible(homeScreen.TempBannerBolus, 5000);
    });
  });
});
