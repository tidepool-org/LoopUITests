const match = require('../match');

class Screen {
    /**
     * @param {object} parentScreen
     * @param {string} parentScreen.openLabel
     * @param {string} parentScreen.backLabel
     * @param {object} parentScreen.screenTxt
     * @param {object} parentScreen.generalTxt
     */
    constructor(parentScreen) {
        this.openLabel = parentScreen.openLabel;
        this.backLabel = parentScreen.backLabel;
        this.screenTxt = parentScreen.screenTxt;
        this.generalTxt = parentScreen.generalTxt;
    }
    Header() {
        return match.accessible.Header(this.screenTxt.Header);
    }
    CancelButton() {
        return match.accessible.ButtonBarButton(this.generalTxt.Cancel);
    }
    BackButton() {
        if (this.backLabel) {
            return match.accessible.ButtonBarButton(this.backLabel);
        }
        return this.CancelButton();
    }
    ContinueButton() {
        return match.accessible.ButtonBarButton(this.generalTxt.Continue);
    }
    OpenButton() {
        return match.accessible.Button(this.openLabel);
    }
    async Open() {
        return this.OpenButton().tap();
    }
    async Cancel() {
        return this.CancelButton().tap();
    }
    async Back() {
        return this.BackButton().tap();
    }
    async Continue() {
        return this.ContinueButton().tap();
    }
}

module.exports = {
    Screen
};
