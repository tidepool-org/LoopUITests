const match = require('../match');

class Header {
    constructor(language) {
        this.language = language;
    }
    AddPumpButton() {
        return match.accessible.ClickableLabel(this.language.homeScreen.AddPump);
    }
    async AddPump() {
        return this.AddPumpButton().tap();
    }
    PumpErrorButton() {
        return match.accessible.ClickableLabel(this.language.homeScreen.PumpError);
    }
    async PumpError() {
        return this.PumpErrorButton().tap();
    }
    AddCGMButton() {
        return match.accessible.ClickableLabel(this.language.homeScreen.AddCGM);
    }
    async AddCGM() {
        return this.AddCGMButton().tap();
    }
    CGMErrorButton() {
        return match.accessible.ClickableLabel(this.language.homeScreen.CGMError);
    }
    async CGMError() {
        return this.CGMErrorButton().tap();
    }
    LoopIcon() {
        match.loop.Icon();
    }
    async Loop() {
        await this.LoopIcon().tap();
    }
}

module.exports = {
    Header
};
