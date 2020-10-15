const match = require('../match');

class Header {
    constructor(language, devices) {
        this._language = language;
        this._devices = devices;
    }
    get Devices() {
        return this._devices;
    }
    get PumpErrorLabel() {
        return match.accessible.ClickableLabel(this._language.statusScreen.PumpError);
    }
    get PumpOcclusionLabel() {
        return match.accessible.ClickableLabel(this._language.statusScreen.PumpOcclusion);
    }
    get CGMSignalLossLabel() {
        return match.accessible.ClickableLabel(this._language.statusScreen.HUD.CGMSignalLoss);
    }
    get PumpCommsIssueLabel() {
        return match.accessible.ClickableLabel(this._language.statusScreen.HUD.PumpCommsIssue);
    }
    get PumpNoInsulinLabel() {
        return match.accessible.ClickableLabel(this._language.statusScreen.HUD.PumpNoInsulin);
    }
    get CGMErrorLabel() {
        return match.accessible.ClickableLabel(this._language.statusScreen.CGMError);
    }
    get CGMAlertLabel() {
        return match.accessible.ClickableLabel(this._language.statusScreen.HUD.CGMGenericAlert);
    }
    get LoopIcon() {
        return match.loop.Icon();
    }
    get EnterBloodGlucoseButton() {
        return match.accessible.TextLabel(this._language.statusScreen.HUD.BGTapToAdd).atIndex(0);
    }
    get NoRecentBloodGlucoseLabel() {
        return match.accessible.TextLabel(this._language.statusScreen.HUD.BGNoRecent).atIndex(0);
    }
    async Loop() {
        await this.LoopIcon.tap();
    }
    async CloseLoopAlert() {
        await match.accessible.Button(this._language.general.OK).tap();
    }
    async ExpectLoopNotYetRun() {
        await expect(match.loop.Icon()).toHaveLabel(this._language.statusScreen.LoopWaitingForFirstRun);
    }
    async ExpectLoopIcon(label) {
        await expect(match.loop.Icon()).toHaveLabel(label);
    }
    async ExpectLoopStatusCarbsAlert() {
        await this.Loop();
        await expect(match.accessible.AlertLabel(this._language.general.Alert.MissingCarbEffects)).toExist();
        await this.CloseLoopAlert();
    }
    async ExpectLoopStatusInsulinAlert() {
        await this.Loop();
        await expect(match.accessible.AlertLabel(this._language.general.Alert.MissingInsulinEffects)).toExist();
        await this.CloseLoopAlert();
    }
    async ExpectLoopStatusConfigurationAlert() {
        await this.Loop();
        await expect(match.accessible.AlertLabel(this._language.general.Alert.ConfigurationError)).toExist();
        await this.CloseLoopAlert();
    }
    async ExpectLoopStatusGlucoseDataAlert() {
        await this.Loop();
        await expect(match.accessible.AlertLabel(this._language.general.Alert.MissingGlucoseData)).toExist();
        await this.CloseLoopAlert();
    }
    async ExpectLoopIconAlert() {
        await this.Loop();
        await expect(match.accessible.Button(this._language.general.OK)).toBeVisible();
        await this.CloseLoopAlert();
    }
    async ExpectNoLoopIconAlert() {
        await this.Loop();
        await expect(match.accessible.Alert()).toNotExist();
    }
}

module.exports = Header;
