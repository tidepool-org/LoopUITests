const { Config } = require('../../src/config/index');
const { Test } = require('../../src/test');

describe('accessibility', () => {
  var test = new Test();
  var config = new Config();
  var screen;
  var therapySettingsScreen;
  it('prepare test', async () => {
    config = await config.prepare();
    test = test.setup({
      language: config.text,
      screenDefaults: config.screenDefaults,
      enableTherapySettings: true,
      simulators: { cgm: true, pump: true },
    });
    await test.prepare();
  });
  it('opens therapy settings screen', async () => {
    therapySettingsScreen = await test.OpenTherapySettingsScreen();
  });
  describe('Glucose Safety Limit Screen', () => {
    it('open screen', async () => {
      screen = await therapySettingsScreen.OpenGlucoseSafetyLimitScreen();
    });
    it('has a Header', async () => {
      await expect(screen.Header).toBeVisible();
    });
    it('has a Save Button', async () => {
      await expect(screen.SaveButton).toBeVisible();
    });
    it('has a Back Button', async () => {
      await expect(screen.BackButton).toBeVisible();
    });
    it('has a Info Label', async () => {
      await expect(screen.InfoLabel).toBeVisible();
    });
    it('has a Info Button', async () => {
      await expect(screen.InfoButton).toBeVisible();
    });
    it('can close', async () => {
      await screen.BackButton.tap();
    });
  });
  describe('Correction Range Screen', () => {
    it('open screen', async () => {
      screen = await therapySettingsScreen.OpenCorrectionRangeScreen();
    });
    it('has a Header', async () => {
      await expect(screen.Header).toBeVisible();
    });
    it('has a Save Button', async () => {
      await expect(screen.SaveButton).toBeVisible();
    });
    it('has a Back Button', async () => {
      await expect(screen.BackButton).toBeVisible();
    });
    it('has a Info Label', async () => {
      await expect(screen.InfoLabel).toBeVisible();
    });
    it('has a Info Button', async () => {
      await expect(screen.InfoButton).toBeVisible();
    });
    it('has a Edit Button', async () => {
      await expect(screen.EditButton).toBeVisible();
    });
    it('can close', async () => {
      await screen.BackButton.tap();
    });
  });
  describe('Premeal Range Screen', () => {
    it('open screen', async () => {
      screen = await therapySettingsScreen.OpenPreMealRangeScreen();
    });
    it('has a Header', async () => {
      await expect(screen.Header).toBeVisible();
    });
    it('has a Save Button', async () => {
      await expect(screen.SaveButton).toBeVisible();
    });
    it('has a Back Button', async () => {
      await expect(screen.BackButton).toBeVisible();
    });
    it('has a Info Label', async () => {
      await expect(screen.InfoLabel).toBeVisible();
    });
    it('has a Info Button', async () => {
      await expect(screen.InfoButton).toBeVisible();
    });
    it('can close', async () => {
      await screen.BackButton.tap();
    });
  });
  describe('Workout Range Screen', () => {
    it('open screen', async () => {
      screen = await therapySettingsScreen.OpenWorkoutRangeScreen();
    });
    it('has a Header', async () => {
      await expect(screen.Header).toBeVisible();
    });
    it('has a Save Button', async () => {
      await expect(screen.SaveButton).toBeVisible();
    });
    it('has a Back Button', async () => {
      await expect(screen.BackButton).toBeVisible();
    });
    it('has a Info Label', async () => {
      await expect(screen.InfoLabel).toBeVisible();
    });
    it('has a Info Button', async () => {
      await expect(screen.InfoButton).toBeVisible();
    });
    it('can close', async () => {
      await screen.BackButton.tap();
    });
  });
  describe('Carb Ratio Screen', () => {
    it('open screen', async () => {
      screen = await therapySettingsScreen.OpenCarbRatioScreen();
    });
    it('has a Header', async () => {
      await expect(screen.Header).toBeVisible();
    });
    it('has a Save Button', async () => {
      await expect(screen.SaveButton).toBeVisible();
    });
    it('has a Back Button', async () => {
      await expect(screen.BackButton).toBeVisible();
    });
    it('has a Info Label', async () => {
      await expect(screen.InfoLabel).toBeVisible();
    });
    it('has a Info Button', async () => {
      await expect(screen.InfoButton).toBeVisible();
    });
    it('can close', async () => {
      await screen.BackButton.tap();
    });
  });
  describe('Basal Rates Screen', () => {
    it('open screen', async () => {
      screen = await therapySettingsScreen.OpenBasalRateScreen();
    });
    it('has a Header', async () => {
      await expect(screen.Header).toBeVisible();
    });
    it('has a Save Button', async () => {
      await expect(screen.SaveButton).toBeVisible();
    });
    it('has a Back Button', async () => {
      await expect(screen.BackButton).toBeVisible();
    });
    it('has a Info Label', async () => {
      await expect(screen.InfoLabel).toBeVisible();
    });
    it('has a Info Button', async () => {
      await expect(screen.InfoButton).toBeVisible();
    });
    it('can close', async () => {
      await screen.BackButton.tap();
    });
  });
  describe('Delivery Limits Screen', () => {
    it('open screen', async () => {
      screen = await therapySettingsScreen.OpenDeliveryLimitsScreen();
    });
    it('has a Header', async () => {
      await expect(screen.Header).toBeVisible();
    });
    it('has a Save Button', async () => {
      await expect(screen.SaveButton).toBeVisible();
    });
    it('has a Back Button', async () => {
      await expect(screen.BackButton).toBeVisible();
    });
    it('has a Max Basal Rate Info', async () => {
      await expect(screen.MaxBasalRateInfo).toBeVisible();
    });
    it('has a Max Basal Rate Label', async () => {
      await expect(screen.MaxBasalRateLabel).toBeVisible();
    });
    it('has a Max Bolus Info', async () => {
      await expect(screen.MaxBolusInfo).toBeVisible();
    });
    it('has a Max Bolus Label', async () => {
      await expect(screen.MaxBolusLabel).toBeVisible();
    });
    it('can close', async () => {
      await screen.BackButton.tap();
    });
  });
  describe('Insulin Model Screen', () => {
    it('open screen', async () => {
      screen = await therapySettingsScreen.OpenInsulinModelScreen();
    });
    it('has a Header', async () => {
      await expect(screen.Header).toBeVisible();
    });
    it('has a Save Button', async () => {
      await expect(screen.SaveButton).toBeVisible();
    });
    it('has a Back Button', async () => {
      await expect(screen.BackButton).toBeVisible();
    });
    it('has a Info Label', async () => {
      await expect(screen.InfoLabel).toBeVisible();
    });
    it('has a Info Button', async () => {
      await expect(screen.InfoButton).toBeVisible();
    });
    it('can close', async () => {
      await screen.BackButton.tap();
    });
  });
  describe('Insulin Sensitivities Screen', () => {
    it('open screen', async () => {
      screen = await therapySettingsScreen.OpenInsulinSensitivitiesScreen();
    });
    it('has a Header', async () => {
      await expect(screen.Header).toBeVisible();
    });
    it('has a Save Button', async () => {
      await expect(screen.SaveButton).toBeVisible();
    });
    it('has a Back Button', async () => {
      await expect(screen.BackButton).toBeVisible();
    });
    it('has a Info Label', async () => {
      await expect(screen.InfoLabel).toBeVisible();
    });
    it('has a Info Button', async () => {
      await expect(screen.InfoButton).toBeVisible();
    });
    it('can close', async () => {
      await screen.BackButton.tap();
    });
  });
});
