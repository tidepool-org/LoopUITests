/* eslint-disable vars-on-top */
const match = require('../match');

const GlucoseScreen = require('./glucoseScreen');
const ActiveInsulinScreen = require('./activeInsulinScreen').Screen;
const InsulinDeliveryScreen = require('./insulinDeliveryScreen').Screen;
const ActiveCarbohydratesScreen = require('./activeCarbohydratesScreen').Screen;
const Header = require('./header');
const SettingsScreen = require('../settings/index');
const Meal = require('../carbEntry/index');
const Bolus = require('../bolus/index');

const CustomPresetScreen = require('../customPreset/index');

const Devices = require('../devices/index');

class StatusScreen {
  constructor(language, settingsScreenDefaults) {
    this._glucoseScreen = new GlucoseScreen(language);
    this._activeInsulinScreen = new ActiveInsulinScreen({
      generalText: language.general,
      screenText: language.statusScreen.ActiveInsulinScreen,
    });
    this._insulinDeliveryScreen = new InsulinDeliveryScreen({
      generalText: language.general,
      screenText: language.statusScreen.InsulinDeliveryScreen,
    });
    this._activeCarbohydratesScreen = new ActiveCarbohydratesScreen({
      generalText: language.general,
      screenText: language.statusScreen.ActiveCarbohydratesScreen,
    });
    this._settingsScreen = new SettingsScreen(
      language,
      new Devices(language, false),
      settingsScreenDefaults,
    );
    this._bolusScreen = new Bolus.BolusScreen({
      generalText: language.general,
      screenText: language.bolusScreen.MainScreen,
    });
    this._simpleBolusCalculatorScreen = new Bolus.SimpleBolusCalculatorScreen({
      generalText: language.general,
      screenText: language.bolusScreen.SimpleBolusCalculatorScreen,
    });
    this._simpleMealBolusCalculatorScreen = new Bolus.SimpleMealBolusCalculatorScreen(
      {
        generalText: language.general,
        screenText: language.bolusScreen.SimpleMealBolusCalculatorScreen,
      },
    );
    this._carbEntryScreen = new Meal.CarbEntryScreen({
      generalText: language.general,
      screenText: language.carbEntryScreen,
    });
    this._customPresetScreen = new CustomPresetScreen(language);
    this._headerSection = new Header(language, new Devices(language, true));
  }

  get HeaderSection() {
    return this._headerSection;
  }

  get ActiveCarbohydratesLabel() {
    return this._activeCarbohydratesScreen.OpenButton;
  }

  get ActiveInsulinLabel() {
    return this._activeInsulinScreen.OpenButton;
  }

  get InsulinDeliveryLabel() {
    return this._insulinDeliveryScreen.OpenButton;
  }

  get GlucoseLabel() {
    return this._glucoseScreen.OpenButton;
  }

  get SettingsButton() {
    return this._settingsScreen.OpenButton;
  }

  get CustomPresetButton() {
    return this._customPresetScreen.OpenButton;
  }

  get AddMealButton() {
    return this._carbEntryScreen.OpenButton;
  }

  get BolusButton() {
    return this._bolusScreen.OpenButton;
  }

  Alert(label) {
    return match.accessible.AlertLabel(label);
  }

  async OpenActiveCarbohydratesChart() {
    await this.ActiveCarbohydratesLabel.tap();
    return this._activeCarbohydratesScreen;
  }

  async OpenActiveInsulinChart() {
    await this.ActiveInsulinLabel.tap();
    return this._activeInsulinScreen;
  }

  async OpenInsulinDeliveryChart() {
    await this.InsulinDeliveryLabel.tap();
    return this._insulinDeliveryScreen;
  }

  async OpenGlucoseChart() {
    await this.GlucoseLabel.tap();
    return this._glucoseScreen;
  }

  get SettingsScreen() {
    return this._settingsScreen;
  }

  async OpenSettingsScreen() {
    await this.SettingsButton.tap();
    return this.SettingsScreen;
  }

  async OpenCarbEntryScreen(looping) {
    await this.AddMealButton.tap();
    if (looping) {
      return this._carbEntryScreen;
    }
    return this._simpleMealBolusCalculatorScreen;
  }

  async OpenBolusScreen(looping) {
    await this.BolusButton.tap();
    if (looping) {
      return this._bolusScreen;
    }
    return this._simpleBolusCalculatorScreen;
  }

  async OpenCustomPresetScreen() {
    await this.CustomPresetButton.tap();
    return this._customPresetScreen;
  }
}

var _screenTests = (testData) => {
  describe('Status Screen', () => {
    var screen;
    it('has a Active Carbohydrates Label', async () => {
      screen = await testData.app.OpenStatusScreen();
    });
    it('has a Active Carbohydrates Label', async () => {
      await expect(screen.ActiveCarbohydratesLabel).toBeVisible();
    });
    it('has a Active Insulin Label', async () => {
      await expect(screen.ActiveInsulinLabel).toBeVisible();
    });
    it('has a Insulin Delivery Label', async () => {
      await expect(screen.InsulinDeliveryLabel).toBeVisible();
    });
    it('has a Glucose Label', async () => {
      await expect(screen.GlucoseLabel).toBeVisible();
    });
    it('has a Settings Button', async () => {
      await expect(screen.SettingsButton).toBeVisible();
    });
    it('has a Add Meal Button', async () => {
      await expect(screen.AddMealButton).toBeVisible();
    });
    it('has a Bolus Button', async () => {
      await expect(screen.BolusButton).toBeVisible();
    });
    describe('HUD', () => {
      it('add pump button', async () => {
        await expect(screen.HeaderSection.Devices.AddPumpButton).toBeVisible();
      });
      it('add CGM button', async () => {
        await expect(screen.HeaderSection.Devices.AddCGMButton).toBeVisible();
      });
      it('Loop button', async () => {
        await expect(screen.HeaderSection.LoopIcon).toBeVisible();
      });
      it('Tap to add blood glucose button', async () => {
        await expect(
          screen.HeaderSection.EnterBloodGlucoseButton,
        ).toBeVisible();
      });
      it('No recent blood glucose label', async () => {
        await expect(
          screen.HeaderSection.NoRecentBloodGlucoseLabel,
        ).toBeVisible();
      });
    });
  });
};

module.exports = {
  Screen: StatusScreen,
  tests: _screenTests,
};
