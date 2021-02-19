const match = require('../utilities/match');

module.exports = class PumpSimulatorScreen {
  constructor(language) {
    this.language = language;
  }

  get AcceptAlertButton() {
    return match.accessible.Button(this.language.PumpSimulatorScreen.AcceptAlert);
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

  get InsulinSuspendedTemporaryStatusBanner() {
    return match.Label(this.language.PumpSimulatorScreen.InsulinSuspendedStatusBanner);
  }

  get SuspendDeliveryButton() {
    return match.Label(this.language.PumpSimulatorScreen.SuspendButton);
  }
};
