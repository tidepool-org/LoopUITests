const match = require('../match');

class Header {
    constructor(language, devices) {
        this._language = language;
        this.Devices = devices;
    }
    get PumpErrorLabel() {
        return match.accessible.ClickableLabel(this._language.homeScreen.PumpError);
    }
    get PumpOcclusionLabel() {
        return match.accessible.ClickableLabel(this._language.homeScreen.PumpOcclusion);
    }
    get CGMSignalLossLabel() {
        return match.accessible.ClickableLabel('Signal Loss');
    }
    get PumpCommsIssueLabel() {
        return match.accessible.ClickableLabel('Comms Issue');
    }
    get PumpNoInsulinLabel() {
        return match.accessible.ClickableLabel('No Insulin');
    }
    get CGMErrorLabel() {
        return match.accessible.ClickableLabel(this._language.homeScreen.CGMError);
    }
    get CGMAlertLabel() {
        return match.accessible.ClickableLabel('Alert: FG Title');
    }
    get LoopIcon() {
        return match.loop.Icon();
    }
    async Loop() {
        await this.LoopIcon.tap();
    }
    async CloseLoopAlert() {
        await match.accessible.Button(this._language.general.OK).tap();
    }
    async ExpectLoopNotYetRun() {
        await expect(match.loop.Icon()).toHaveLabel(this._language.homeScreen.LoopWaitingForFirstRun);
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
