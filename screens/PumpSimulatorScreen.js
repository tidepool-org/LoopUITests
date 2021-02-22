const match = require('../utilities/match');

module.exports = class PumpSimulatorScreen {
  constructor(language) {
    this.language = language;
  }

  get AcceptAlertButton() {
    return match.accessible.Button(this.language.PumpSimulatorScreen.AcceptAlert);
  }

  get BackToPumpSettingsButton() {
    return match.accessible.ButtonBarButton(this.language.PumpSimulatorScreen.BackToPumpSettings);
  }

  get CausePumpErrorButton() {
    return match.Label(this.language.PumpSimulatorScreen.CausePumpError);
  }

  get DetectOcclusionButton() {
    return match.Label(this.language.PumpSimulatorScreen.DetectOcclusion);
  }

  get DoneButton() {
    return match.accessible.ButtonBarButton(this.language.PumpSimulatorScreen.Done);
  }

  get ErrorOnSuspendToggle() {
    return match.accessible.SwitchButton(this.language.PumpSimulatorScreen.ErrorOnSuspend);
  }

  get InsulinSuspendedStatus() {
    return match.ByParent(this.language.PumpSimulatorScreen.InsulinSuspendedStatus, this.language.HomeScreen.HUD.PumpPill);
  }

  get ReservoirRemainingButton() {
    return match.Label(this.language.PumpSimulatorScreen.ReservoirRemaining);
  }

  get ReservoirTextField() {
    return match.UITextField();
  }

  get ResolveOcclusionErrorButton() {
    return match.Label(this.language.PumpSimulatorScreen.ResolveOcclusion);
  }

  get ResolvePumpErrorButton() {
    return match.Label(this.language.PumpSimulatorScreen.ResolvePumpError);
  }

  get SuspendDeliveryButton() {
    return match.Label(this.language.PumpSimulatorScreen.Suspend);
  }
};
