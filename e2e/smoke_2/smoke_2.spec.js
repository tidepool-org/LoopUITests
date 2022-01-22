const { Config } = require('../../src/config/index');
const { Test } = require('../../src/test');

describe('accessibility', () => {
  var test = new Test();
  var config = new Config();
  var screen;
  var homeScreen;
  it('prepare test', async () => {
    config = await config.prepare();
    test = test.setup({
      language: config.text,
      screenDefaults: config.screenDefaults,
      limits: config.limits,
      authentication: { faceid: true },
      enableTherapySettings: true,
    });
    await test.prepare();
    homeScreen = await test.OpenStatusScreen();
  });
  describe('home Screen', () => {
    it('has a Active Carbohydrates Label', async () => {
      await expect(homeScreen.ActiveCarbohydratesLabel).toBeVisible();
    });
    it('has a Active Insulin Label', async () => {
      await expect(homeScreen.ActiveInsulinLabel).toBeVisible();
    });
    it('has a Insulin Delivery Label', async () => {
      await expect(homeScreen.InsulinDeliveryLabel).toBeVisible();
    });
    it('has a Glucose Label', async () => {
      await expect(homeScreen.GlucoseLabel).toBeVisible();
    });
    it('has a Settings Button', async () => {
      await expect(homeScreen.SettingsButton).toBeVisible();
    });
    it('has a Add Meal Button', async () => {
      await expect(homeScreen.AddMealButton).toBeVisible();
    });
    it('has a Bolus Button', async () => {
      await expect(homeScreen.BolusButton).toBeVisible();
    });
    describe('HUD', () => {
      it('add pump button', async () => {
        await expect(homeScreen.HeaderSection.Devices.AddPumpButton).toBeVisible();
      });
      it('add CGM button', async () => {
        await expect(homeScreen.HeaderSection.Devices.AddCGMButton).toBeVisible();
      });
      it('Loop button', async () => {
        await expect(homeScreen.HeaderSection.LoopIcon).toBeVisible();
      });
      it('Tap to add blood glucose button', async () => {
        await expect(
          homeScreen.HeaderSection.EnterBloodGlucoseButton,
        ).toExist();
      });
      it('No recent blood glucose label', async () => {
        await expect(
          homeScreen.HeaderSection.NoRecentBloodGlucoseLabel,
        ).toExist();
      });
    });
  });
  describe('Insulin Delivery Chart', () => {
    it('opens insulin delivery chart screen', async () => {
      screen = await homeScreen.OpenInsulinDeliveryChart();
    });
    it('has a Header', async () => {
      await expect(screen.Header).toBeVisible();
    });
    it('has a IOB Label', async () => {
      await expect(screen.IOBLabel).toBeVisible();
    });
    it('has a Total Label', async () => {
      await expect(screen.TotalLabel).toBeVisible();
    });
    it('has an Event History Label', async () => {
      await expect(screen.EventHistoryLabel).toBeVisible();
    });
    it('can close', async () => {
      await screen.BackButton.tap();
    });
  });
  describe('Active Carbohydrates Chart', () => {
    it('opens Active Carbohydrates Chart Screen', async () => {
      screen = await homeScreen.OpenActiveCarbohydratesChart();
    });
    it('has a Header', async () => {
      await expect(screen.Header).toBeVisible();
    });
    it('has a Grams Total Carbs Label', async () => {
      await expect(screen.GramsTotalCarbsLabel).toBeVisible();
    });
    it('has an Glucose Change Label', async () => {
      await expect(screen.GlucoseChangeLabel).toBeVisible();
    });
    it('has a Observed Label', async () => {
      await expect(screen.ObservedLabel).toBeVisible();
    });
    it('has a Predicted Label', async () => {
      await expect(screen.PredictedLabel).toBeVisible();
    });
    it('can close', async () => {
      await screen.BackButton.tap();
    });
  });
  describe('Active Insulin Chart', () => {
    it('opens Active Insulin Chart Screen', async () => {
      screen = await homeScreen.OpenActiveInsulinChart();
    });
    it('has a Header', async () => {
      await expect(screen.Header).toBeVisible();
    });
    it('has a IOB Label', async () => {
      await expect(screen.IOBLabel).toBeVisible();
    });
    it('has a Total Label', async () => {
      await expect(screen.TotalLabel).toBeVisible();
    });
    it('has an Event History Label', async () => {
      await expect(screen.EventHistoryLabel).toBeVisible();
    });
    it('can close', async () => {
      await screen.BackButton.tap();
    });
  });
});
