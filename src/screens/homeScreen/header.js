const match = require("../../match");

class Header {
  constructor(language, devices) {
    this._language = language;
    this._devices = devices;
  }
  get Devices() {
    return this._devices;
  }
  get PumpErrorLabel() {
    return match.Label(
      this._language.homeScreen.PumpError
    );
  }
  get PumpOcclusionLabel() {
    return match.Label(
      this._language.homeScreen.PumpOcclusion
    );
  }
  get CGMSignalLossLabel() {
    return match.Label(
      this._language.homeScreen.HUD.CGMSignalLoss
    );
  }
  get PumpCommsIssueLabel() {
    return match.accessible.ClickableLabel(
      this._language.homeScreen.HUD.PumpCommsIssue
    );
  }
  get PumpNoInsulinLabel() {
    return match.Label(
      this._language.homeScreen.HUD.PumpNoInsulin
    );
  }
  get CGMErrorLabel() {
    return match.accessible.ClickableLabel(
      this._language.homeScreen.CGMError
    );
  }
  get CGMAlertLabel() {
    return match.Label(
      this._language.homeScreen.HUD.CGMGenericAlert
    );
  }
  get LoopIcon() {
    return match.loop.Icon();
  }
  get EnterBloodGlucoseButton() {
    return match.Label(this._language.homeScreen.HUD.BGTapToAdd).atIndex(0);
  }
  get NoRecentBloodGlucoseLabel() {
    return match.Label(this._language.homeScreen.HUD.BGNoRecent).atIndex(0);
  }
  async Loop() {
    await this.LoopIcon.tap();
  }
  async CloseLoopAlert() {
    await match.accessible.Button(this._language.general.OK).tap();
  }
  async ExpectLoopNotYetRun() {
    await expect(match.loop.Icon()).toHaveLabel(
      this._language.homeScreen.LoopWaitingForFirstRun
    );
  }
  async ExpectLoopIcon(label) {
    await expect(match.loop.Icon()).toHaveLabel(label);
  }
  async ExpectLoopStatusCarbsAlert() {
    await this.Loop();
    await expect(
      match.accessible.AlertLabel(
        this._language.general.Alert.MissingCarbEffects
      )
    ).toExist();
    await this.CloseLoopAlert();
  }
  async ExpectLoopStatusInsulinAlert() {
    await this.Loop();
    await expect(
      match.accessible.AlertLabel(
        this._language.general.Alert.MissingInsulinEffects
      )
    ).toExist();
    await this.CloseLoopAlert();
  }
  async ExpectLoopStatusConfigurationAlert() {
    await this.Loop();
    await expect(
      match.accessible.AlertLabel(
        this._language.general.Alert.ConfigurationError
      )
    ).toExist();
    await this.CloseLoopAlert();
  }
  async ExpectLoopStatusGlucoseDataAlert() {
    await this.Loop();
    await expect(
      match.accessible.AlertLabel(
        this._language.general.Alert.MissingGlucoseData
      )
    ).toBeVisible();
    await this.CloseLoopAlert();
  }
  async ExpectLoopIconAlert() {
    await this.Loop();
    await expect(
      match.accessible.Button(this._language.general.OK)
    ).toBeVisible();
    await this.CloseLoopAlert();
  }
  async ExpectNoLoopIconAlert() {
    await this.Loop();
    await expect(match.accessible.Alert()).toNotExist();
  }
  async ExpectClosedLoopGreenAlert() {
    await this.Loop();
    await expect(match.Label(this._language.homeScreen.HUD.ClosedLoopGreen)).toBeVisible();
    await match.accessible.Button(this._language.general.Dismiss).tap();
  }
}

module.exports = Header;
