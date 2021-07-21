const base = require("../base/index");
const match = require("../match");

const BasalRatesScreen = require("./basalRatesScreen").Screen;
const CarbRatioScreen = require("./carbRatioScreen").Screen;
const CorrectionRangeScreen = require("./correctionRangeScreen").Screen;
const DeliveryLimitsScreen = require("./deliveryLimitsScreen").Screen;
const InsulinModelScreen = require("./insulinModelScreen").Screen;
const InsulinSensitivitiesScreen = require("./insulinSensitivitiesScreen")
  .Screen;
const PremealRangeScreen = require("./premealRangeScreen").Screen;
const GlucoseSafetyLimitScreen = require("./glucoseSafetyLimitScreen").Screen;
const WorkoutRangeScreen = require("./workoutRangeScreen").Screen;

module.exports = class TherapyScreen extends base.Screen {
  constructor(language, config) {
    super({
      screenText: language.settingsScreen.TherapySettingsScreen,
      generalText: language.general,
      header: {
        backLabel: language.general.Done,
      },
      open: {
        isBtn: true,
        label:
          language.settingsScreen.TherapySettingsScreen.Header +
          ", " +
          language.settingsScreen.TherapySettingsScreen.Info,
      },
    });
    this._basalRatesScreen = new BasalRatesScreen(
      {
        screenText: language.settingsScreen.BasalRatesScreen,
        generalText: language.general,
        backLabel: language.settingsScreen.TherapySettingsScreen.Header,
      },
      config.basalRate
    );
    this._carbRatioScreen = new CarbRatioScreen(
      {
        screenText: language.settingsScreen.CarbRatioScreen,
        generalText: language.general,
        backLabel: language.settingsScreen.TherapySettingsScreen.Header,
      },
      config.carbRatio
    );
    this._correctionRangeScreen = new CorrectionRangeScreen(
      {
        screenText: language.settingsScreen.CorrectionRangeScreen,
        generalText: language.general,
        backLabel: language.settingsScreen.TherapySettingsScreen.Header,
      },
      config.correctionRange
    );
    this._deliveryLimitsScreen = new DeliveryLimitsScreen(
      {
        screenText: language.settingsScreen.DeliveryLimitsScreen,
        generalText: language.general,
        backLabel: language.settingsScreen.TherapySettingsScreen.Header,
      },
      config.deliveryLimit
    );
    this._insulinModelScreen = new InsulinModelScreen({
      screenText: language.settingsScreen.InsulinModelScreen,
      generalText: language.general,
      backLabel: language.settingsScreen.TherapySettingsScreen.Header,
    });
    this._insulinSensitivitiesScreen = new InsulinSensitivitiesScreen(
      {
        screenText: language.settingsScreen.InsulinSensitivitiesScreen,
        generalText: language.general,
        backLabel: language.settingsScreen.TherapySettingsScreen.Header,
      },
      config.insulinSensitivity
    );
    this._glucoseSafetyLimitScreen = new GlucoseSafetyLimitScreen(
      {
        screenText: language.settingsScreen.GlucoseSafetyLimitScreen,
        generalText: language.general,
        backLabel: language.settingsScreen.TherapySettingsScreen.Header,
      },
      config.glucoseSafetyLimit
    );
    this._workoutRangeScreen = new WorkoutRangeScreen({
      screenText: language.settingsScreen.WorkoutRangeScreen,
      generalText: language.general,
      backLabel: language.settingsScreen.TherapySettingsScreen.Header,
    });
    this._premealRangeScreen = new PremealRangeScreen({
      screenText: language.settingsScreen.PremealRangeScreen,
      generalText: language.general,
      backLabel: language.settingsScreen.TherapySettingsScreen.Header,
    });
  }
  /**
   * @override
   */
  get BackButton() {
    return match.accessible.Button(this.generalText.Done).atIndex(0);
  }
  get GlucoseSafetyLimitLabel() {
    return this._glucoseSafetyLimitScreen.OpenButton;
  }
  get GlucoseSafetyLimitInfo() {
    return this._glucoseSafetyLimitScreen.InfoLabel;
  }
  get CorrectionRangeLabel() {
    return this._correctionRangeScreen.OpenButton;
  }
  get CorrectionRangeInfo() {
    return this._correctionRangeScreen.InfoLabel;
  }
  get PreMealRangeLabel() {
    return this._premealRangeScreen.OpenButton;
  }
  get PreMealRangeInfo() {
    return this._premealRangeScreen.InfoLabel;
  }
  get WorkoutRangeLabel() {
    return this._workoutRangeScreen.OpenButton;
  }
  get WorkoutRangeInfo() {
    return this._workoutRangeScreen.InfoLabel;
  }
  get BasalRateLabel() {
    return this._basalRatesScreen.OpenButton;
  }
  get BasalRateInfo() {
    return this._basalRatesScreen.InfoLabel;
  }
  get DeliveryLimitsLabel() {
    return this._deliveryLimitsScreen.OpenButton;
  }
  get DeliveryLimitsMaxBasalRateLabel() {
    return this._deliveryLimitsScreen.MaxBasalRateLabel;
  }
  get DeliveryLimitsMaxBolusLabel() {
    return this._deliveryLimitsScreen.MaxBolusLabel;
  }
  get DeliveryLimitsInfo() {
    return this._deliveryLimitsScreen.InfoLabel;
  }
  get InsulinModelLabel() {
    return this._insulinModelScreen.OpenButton;
  }
  get InsulinModelInfo() {
    return this._insulinModelScreen.InfoLabel;
  }
  get CarbRatiosLabel() {
    return this._carbRatioScreen.OpenButton;
  }
  get CarbRatiosInfo() {
    return this._carbRatioScreen.InfoLabel;
  }
  get InsulinSensitivitiesLabel() {
    return this._insulinSensitivitiesScreen.OpenButton;
  }
  get InsulinSensitivitiesInfo() {
    return this._insulinSensitivitiesScreen.InfoLabel;
  }
  async ReturnToHomeScreen() {
    await this.CloseModal();
    await match.accessible.Button(this.generalText.Done).tap();
  }
  async OpenInsulinSensitivitiesScreen() {
    await this.SwipeUpUntilVisible(this.InsulinSensitivitiesLabel);
    // tapping coordinates by-passes visibility check
    await this.InsulinSensitivitiesLabel.tap({"x":20,"y":20});
    return this._insulinSensitivitiesScreen;
  }
  async OpenCarbRatioScreen() {
    await this.SwipeUpUntilVisible(this.CarbRatiosLabel);
    // tapping coordinates by-passes visibility check
    await this.CarbRatiosLabel.tap({"x":20,"y":20});
    return this._carbRatioScreen;
  }
  async OpenInsulinModelScreen() {
    await this.SwipeUpUntilVisible(this.InsulinModelLabel);
    // tapping coordinates by-passes visibility check
    await this.InsulinModelLabel.tap({"x":20,"y":20});
    return this._insulinModelScreen;
  }
  get DeliveryLimitsScreen() {
    return this._deliveryLimitsScreen;
  }
  async OpenDeliveryLimitsScreen() {
    await this.SwipeUpUntilVisible(this.DeliveryLimitsMaxBolusLabel);
    // tapping coordinates by-passes visibility check
    await this.DeliveryLimitsLabel.tap({"x":20,"y":20});
    return this.DeliveryLimitsScreen;
  }
  async OpenBasalRateScreen() {
    await this.SwipeUpUntilVisible(this.BasalRateLabel);
    // tapping coordinates by-passes visibility check
    await this.BasalRateLabel.tap({"x":20,"y":20});
    return this._basalRatesScreen;
  }
  async OpenWorkoutRangeScreen() {
    await this.SwipeUpUntilVisible(this.WorkoutRangeLabel);
    // tapping coordinates by-passes visibility check
    await this.WorkoutRangeLabel.tap({"x":20,"y":20});
    return this._workoutRangeScreen;
  }
  async OpenPreMealRangeScreen() {
    await this.SwipeUpUntilVisible(this.PreMealRangeLabel);
    // tapping coordinates by-passes visibility check
    await this.PreMealRangeLabel.tap({"x":20,"y":20});
    return this._premealRangeScreen;
  }
  async OpenCorrectionRangeScreen() {
    await this.CorrectionRangeLabel.tap();
    return this._correctionRangeScreen;
  }
  async OpenGlucoseSafetyLimitScreen() {
    await this.GlucoseSafetyLimitLabel.tap();
    return this._glucoseSafetyLimitScreen;
  }
};
