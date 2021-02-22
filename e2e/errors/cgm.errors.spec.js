const {
  launchLoop, prepareLoop, setLanguage, skipTidepoolOnboarding,
} = require('../../utilities/prepareTest');
const action = require('../../utilities/action');
const match = require('../../utilities/match');
const { HomeScreen, CGMSimulatorScreen } = require('../../screens/exportAllScreens');

describe('CGM Errors', () => {
  let setup;
  beforeAll(async () => {
    setup = {
      language: 'enUS',
      mockTherapySettings: true,
      cgmSimulator: true,
      cgmStandardData: true,
    };
  });
  it('prepares loop', async () => {
    await launchLoop();
    await skipTidepoolOnboarding(setup);
    await prepareLoop(setup);
  });
  describe('signal loss', () => {
    let homeScreen;
    let cgmSimulatorScreen;
    beforeAll(async () => {
      homeScreen = new HomeScreen(setLanguage(setup));
      cgmSimulatorScreen = new CGMSimulatorScreen(setLanguage(setup));
    });
    it('creates signal loss alert', async () => {
      await homeScreen.CGMPill.tap();
      await cgmSimulatorScreen.SignalLossButton.tap();
      await action.waitForElementToBeVisible(cgmSimulatorScreen.DismissAlertButton, 5000);
    });
    it('dismisses alert and checks for pump pill status', async () => {
      await cgmSimulatorScreen.DismissAlertButton.tap();
      await cgmSimulatorScreen.DoneButton.tap();
      await expect(cgmSimulatorScreen.SignalLossLabel).toExist();
    });
    it('resets simulator', async () => {
      await homeScreen.CGMPill.tap();
      await cgmSimulatorScreen.ConstantModelButton.tap();
      await match.UITextField().replaceText('160');
      await cgmSimulatorScreen.BacktoCGMSettingsButton.tap();
      await cgmSimulatorScreen.DoneButton.tap();
      await expect(cgmSimulatorScreen.SignalLossLabel).toBeNotVisible();
    });
  });
  describe('immediate alert', () => {
    let homeScreen;
    let cgmSimulatorScreen;
    beforeAll(async () => {
      homeScreen = new HomeScreen(setLanguage(setup));
      cgmSimulatorScreen = new CGMSimulatorScreen(setLanguage(setup));
    });
    it('creates an immediate alert', async () => {
      await homeScreen.CGMPill.tap();
      await action.scrollUntilVisible(cgmSimulatorScreen.IssueAlertsButton, 'up');
      await cgmSimulatorScreen.IssueAlertsButton.tap();
      await cgmSimulatorScreen.IssueAnImmediateAlertButton.tap();
      await action.waitForElementToBeVisible(cgmSimulatorScreen.ImmediateAlertDismissButton, 5000);
    });
    it('dismisses alert and checks for pump pill status', async () => {
      await cgmSimulatorScreen.ImmediateAlertDismissButton.tap();
      await cgmSimulatorScreen.DoneButton.tap();
      await expect(cgmSimulatorScreen.ImmediateAlertStatus).toExist();
    });
    it('resets simulator', async () => {
      await homeScreen.CGMPill.tap();
      await action.scrollUntilVisible(cgmSimulatorScreen.IssueAlertsButton, 'up');
      await cgmSimulatorScreen.IssueAlertsButton.tap();
      await cgmSimulatorScreen.RetractAlertsButton.tap();
      await cgmSimulatorScreen.DoneButton.tap();
      await expect(cgmSimulatorScreen.ImmediateAlertStatus).toBeNotVisible();
    });
  });
});
