/* eslint-disable no-unused-vars */
const match = require('../../src/match');

/* eslint-disable no-undef */
module.exports = (test) => {
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
};
