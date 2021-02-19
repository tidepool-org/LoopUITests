const { device } = require('detox');
const action = require('./action');
const match = require('./match');
const {
  CGMSimulatorScreen, HomeScreen, OnboardingScreen, LoopSettingsScreen,
} = require('../screens/exportAllScreens');
const enUSText = require('./translations/enUSText');
const { waitForElementToBeVisible } = require('./action');
/**
   *
   * @param {object} setup
   * @param {string} setup.language
   * @param {boolean} setup.mockTherapySettings
   * @param {boolean} setup.cgmSimulator
   * @param {boolean} setup.cgmStandardData
   * @param {boolean} setup.pumpSimulator
   * @param {boolean} setup.closedLoop
   */

async function launchLoop() {
  await device.launchApp({ permissions: { notifications: 'YES', health: 'YES' }, launchArgs: { detoxDebugVisibility: 'YES', DTXEnableVerboseSyncSystem: 'YES', DTXEnableVerboseSyncResources: 'YES' } });
  await device.setBiometricEnrollment(true);
}

function setLanguage(setup) {
  if (setup.language === 'enUS') {
    return enUSText;
  }
  return this;
}

async function prepareLoop(setup) {
  if (setup.mockTherapySettings) {
    const homeScreen = new HomeScreen(setLanguage(setup));
    await device.shake();
    await homeScreen.AddMockTherapySettingsButton.tap();
  }
  if (setup.cgmSimulator && setup.cgmStandardData) {
    const homeScreen = new HomeScreen(setLanguage(setup));
    const cgmSimulatorScreen = new CGMSimulatorScreen(setLanguage(setup));
    await homeScreen.CGMPill.tap();
    await homeScreen.AddCGMSimulatorButton.tap();
    await homeScreen.CGMPill.tap();
    await cgmSimulatorScreen.ConstantModelButton.tap();
    await match.UITextField().replaceText('160');
    await cgmSimulatorScreen.BacktoCGMSettingsButton.tap();
    await cgmSimulatorScreen.MeasurementFrequencyButton.tap();
    await cgmSimulatorScreen.SecondsButton.tap();
    await cgmSimulatorScreen.BackButton.tap();
    await action.scrollUntilVisible(cgmSimulatorScreen.BackfillGlucoseButton, 'up');
    await cgmSimulatorScreen.BackfillGlucoseButton.tap();
    await cgmSimulatorScreen.SaveButton.tap();
  }
  if (setup.pumpSimulator) {
    const homeScreen = new HomeScreen(setLanguage(setup));
    await homeScreen.PumpPill.tap();
    await homeScreen.AddPumpSimulatorButton.tap();
  }
  if (setup.closedLoop) {
    const homeScreen = new HomeScreen(setLanguage(setup));
    const loopSettingsScreen = new LoopSettingsScreen(setLanguage(setup));
    await waitForElementToBeVisible(homeScreen.PodReservoirIcon, 5000);
    await homeScreen.SettingsButton.tap();
    await loopSettingsScreen.ClosedLoopToggle.tap();
    await loopSettingsScreen.DoneButton.tap();
    await homeScreen.LoopIcon.tap();
    await waitForElementToBeVisible(homeScreen.ClosedLoopOnMessage, 5000);
    await homeScreen.DismissButton.tap();
  }
}

async function skipTidepoolOnboarding(setup) {
  const onboardingScreen = new OnboardingScreen(setLanguage(setup));
  try {
    await match.Label(onboardingScreen.CancelButton).tap();
  } catch (e) {
    return this;
  }
  return this;
}

module.exports = {
  prepareLoop,
  launchLoop,
  setLanguage,
  skipTidepoolOnboarding,
};
