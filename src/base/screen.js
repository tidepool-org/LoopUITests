const match = require('../match');

class Screen {
    /**
     * @param {object} parentScreen
     * @param {string} parentScreen.openLabel
     * @param {string} parentScreen.backLabel
     * @param {object} parentScreen.screenText
     * @param {object} parentScreen.generalText
     */
    constructor(parentScreen) {
        this.openLabel = parentScreen.openLabel;
        this.backLabel = parentScreen.backLabel;
        this.screenText = parentScreen.screenText;
        this.generalText = parentScreen.generalText;
    }
    Header() {
        return match.accessible.Header(this.screenText.Header);
    }
    CancelButton() {
        return match.accessible.Button(this.generalText.Cancel);
    }
    BackButton() {
        if (this.backLabel) {
            return match.accessible.ButtonBarButton(this.backLabel);
        }
        return this.CancelButton();
    }
    ContinueButton() {
        return match.accessible.ButtonBarButton(this.generalText.Continue);
    }
    OpenButton() {
        return match.accessible.Button(this.openLabel);
    }
    async Open() {
        return this.OpenButton().tap();
    }
    async CancelAndClose() {
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
