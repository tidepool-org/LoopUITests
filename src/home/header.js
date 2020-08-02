const match = require('../match');

class Header {
    constructor(language, devices) {
        this.language = language;
        this.devices = devices;
    }
    Devices() {
        return this.devices;
    }
    PumpErrorButton() {
        return match.accessible.ClickableLabel(this.language.homeScreen.PumpError);
    }
    async PumpError() {
        await this.PumpErrorButton().tap();
    }
    CGMErrorButton() {
        return match.accessible.ClickableLabel(this.language.homeScreen.CGMError);
    }
    async CGMError() {
        await this.CGMErrorButton().tap();
    }
    LoopIcon() {
        return match.loop.Icon();
    }
    async Loop() {
        await this.LoopIcon().tap();
    }
    async CloseLoopAlert() {
        await match.accessible.Button(this.language.general.OK).tap();
    }
    async ExpectLoopNotYetRun() {
        await expect(match.loop.Icon()).toHaveLabel(this.language.homeScreen.LoopWaitingForFirstRun);
    }
    async ExpectLoopStatusCarbsAlert() {
        await this.Loop();
        await expect(match.accessible.AlertLabel(this.language.general.Alert.MissingCarbEffects)).toExist();
        await this.CloseLoopAlert();
    }
    async ExpectLoopStatusInsulinAlert() {
        await this.Loop();
        await expect(match.accessible.AlertLabel(this.language.general.Alert.MissingInsulinEffects)).toExist();
        await this.CloseLoopAlert();
    }
    async ExpectLoopStatusConfigurationAlert() {
        await this.Loop();
        await expect(match.accessible.AlertLabel(this.language.general.Alert.ConfigurationError)).toExist();
        await this.CloseLoopAlert();
    }
    async ExpectLoopStatusGlucoseDataAlert() {
        await this.Loop();
        await expect(match.accessible.AlertLabel(this.language.general.Alert.MissingGlucoseData)).toExist();
        await this.CloseLoopAlert();
    }
    async ExpectSuccessfulLoop() {
        await this.Loop();
        await expect(match.accessible.Alert()).toNotExist();
    }
}

module.exports = {
    Header
};
