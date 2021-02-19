const match = require('../utilities/match');

module.exports = class CGMSimulatorScreen {
  constructor(language) {
    this.language = language;
  }

  get AddCGMSimulatorButton() {
    return match.accessible.Button(this.language.CGMSimulatorScreen.AddCGMButton);
  }

  get ConstantModelButton() {
    return match.Label(this.language.CGMSimulatorScreen.ConstantModel);
  }

  get BackButton() {
    return match.accessible.ButtonBarButton(this.language.General.Back);
  }

  get BacktoCGMSettingsButton() {
    return match.accessible.ButtonBarButton(this.language.CGMSimulatorScreen.BackToCGMSettings);
  }

  get BackfillGlucoseButton() {
    return match.Label(this.language.CGMSimulatorScreen.BackfillGlucose);
  }

  get DismissAlertButton() {
    return match.accessible.Button(this.language.CGMSimulatorScreen.DismissAlert);
  }

  get DoneButton() {
    return match.accessible.ButtonBarButton(this.language.CGMSimulatorScreen.Done);
  }

  get ImmediateAlertDismissButton() {
    return match.accessible.Button(this.language.CGMSimulatorScreen.ImmediateAlertDismiss);
  }

  get ImmediateAlertStatus() {
    return match.Label(this.language.CGMSimulatorScreen.ImmediateAlertStatus);
  }

  get IssueAlertsButton() {
    return match.Label(this.language.CGMSimulatorScreen.IssueAlerts);
  }

  get IssueAnImmediateAlertButton() {
    return match.Label(this.language.CGMSimulatorScreen.IssueAnImmediateAlert);
  }

  get MeasurementFrequencyButton() {
    return match.Text(this.language.CGMSimulatorScreen.MeasurementFrequency, 0);
  }

  get SaveButton() {
    return match.accessible.ButtonBarButton(this.language.CGMSimulatorScreen.Save);
  }

  get SignalLossButton() {
    return match.Text(this.language.CGMSimulatorScreen.SignalLoss, 0);
  }

  get SignalLossLabel() {
    return match.Label(this.language.CGMSimulatorScreen.SignalLoss);
  }

  get SecondsButton() {
    return match.Text(this.language.CGMSimulatorScreen.Seconds, 0);
  }
};
