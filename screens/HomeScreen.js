const match = require('../utilities/match');

module.exports = class HomeScreen {
  constructor(language) {
    this.language = language;
  }

  get ActiveCarbohydratesChart() {
    return match.Label(this.language.HomeScreen.ActiveCarbohydrates);
  }

  get ActiveInsulinChart() {
    return match.Label(this.language.HomeScreen.ActiveInsulinChart);
  }

  get AddCGMSimulatorButton() {
    return match.accessible.Button(this.language.HomeScreen.AddCGMMenu.CGMSimulator);
  }

  get AddMealButton() {
    return match.accessible.ButtonBarButton(this.language.HomeScreen.ButtonBar.AddMeal);
  }

  get AddMockTherapySettingsButton() {
    return match.accessible.Button(this.language.HomeScreen.DebugMenu.MockTherapySettings);
  }

  get AddPumpSimulatorButton() {
    return match.accessible.Button(this.language.HomeScreen.AddPumpMenu.PumpSimulator);
  }

  get BolusButton() {
    return match.accessible.ButtonBarButton(this.language.HomeScreen.ButtonBar.Bolus);
  }

  get CGMPill() {
    return match.Label(this.language.HomeScreen.HUD.CGMPill);
  }

  get ClosedLoopOnMessage() {
    return match.Label(this.language.HomeScreen.HUD.ClosedLoopOn);
  }

  get DismissButton() {
    return match.accessible.Button(this.language.HomeScreen.HUD.Dismiss);
  }

  get GlucoseChart() {
    return match.Label(this.language.HomeScreen.GlucoseChart);
  }

  get InsulinDeliveryChart() {
    return match.Label(this.language.HomeScreen.InsulinDeliveryChart);
  }

  get LoopIcon() {
    return match.Type(this.language.HomeScreen.HUD.LoopIcon);
  }

  get NoInsulinStatus() {
    return match.ByParent(this.language.HomeScreen.HUD.NoInsulinStatus, this.language.HomeScreen.HUD.PumpPill);
  }

  get PreMealTargetsButton() {
    return match.accessible.ButtonBarButton(this.language.HomeScreen.ButtonBar.PreMealTargets);
  }

  get PodReservoirIcon() {
    return match.Id(this.language.HomeScreen.HUD.PodReservoirIcon);
  }

  get PumpErrorStatus() {
    return match.ByParent(this.language.HomeScreen.HUD.PumpErrorStatus, this.language.HomeScreen.HUD.PumpPill);
  }

  get PumpOcclusionStatus() {
    return match.ByParent(this.language.HomeScreen.HUD.PumpOcclusionStatus, this.language.HomeScreen.HUD.PumpPill);
  }

  get PumpPill() {
    return match.Label(this.language.HomeScreen.HUD.PumpPill);
  }

  get SettingsButton() {
    return match.accessible.ButtonBarButton(this.language.HomeScreen.ButtonBar.Settings);
  }

  get TempBannerBolus() {
    return match.Label(this.language.HomeScreen.TempBannerBolus);
  }

  get TempBannerInsulinSuspended() {
    return match.Label(this.language.HomeScreen.TempBannerInsulinSuspended);
  }

  get WorkoutTargets() {
    return match.accessible.ButtonBarButton(this.language.HomeScreen.ButtonBar.WorkoutTargets);
  }
};
