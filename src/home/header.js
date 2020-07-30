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
}

module.exports = {
    Header
};
