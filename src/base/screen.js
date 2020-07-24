const match = require('../match');
const action = require('../action');

class Screen {
    /**
     * @param {object} parentScreen
     * @param {string} parentScreen.openLabel not required if `openClickableLabel` given
     * @param {string} parentScreen.openClickableLabel not required if `openLabel` given
     * @param {string} parentScreen.backLabel
     * @param {object} parentScreen.screenText
     * @param {object} parentScreen.generalText
     * @param {object} parentScreen.visibleBottomLabel optional, label that should be visible if your at the bottom of the screen
     * @param {object} parentScreen.visibleTopLabel optional, label that should be visible if your at the top of the screen
     */
    constructor(parentScreen) {
        this.openLabel = parentScreen.openLabel;
        this.openClickableLabel = parentScreen.openClickableLabel;
        this.backLabel = parentScreen.backLabel;
        this.screenText = parentScreen.screenText;
        this.generalText = parentScreen.generalText;
        this.visibleBottomLabel = parentScreen.visibleBottomLabel;
        this.visibleTopLabel = parentScreen.visibleTopLabel;
    }
    Header() {
        return match.accessible.Header(this.screenText.Header);
    }
    CancelButton() {
        return match.accessible.Button(this.generalText.Cancel);
    }
    BackButton() {
        if (this.backLabel) {
            return match.accessible.BackButton(this.backLabel);
        }
        return this.CancelButton();
    }
    ContinueButton() {
        return match.accessible.ButtonBarButton(this.generalText.Continue);
    }
    OpenButton() {
        if (this.openLabel) {
            return match.accessible.Button(this.openLabel);
        }
        return match.accessible.ClickableLabel(this.openClickableLabel);
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
    async ScrollToBottom() {
        if (this.visibleBottomLabel == null) {
            return;
        }
        console.log('ScrollToBottom ', this.visibleBottomLabel)
        try {
            await expect(match.accessible.TextLabel(this.visibleBottomLabel)).toBeVisible();
        } catch (err) {
            await action.ScrollToBottom();
        }
    }
    async ScrollToTop() {
        if (this.visibleTopLabel == null) {
            return;
        }
        console.log('ScrollToTop ', this.visibleTopLabel)
        try {
            await expect(match.accessible.TextLabel(this.visibleTopLabel)).toBeVisible();
        } catch (err) {
            await action.ScrollToTop();
        }
    }
}

module.exports = {
    Screen
};
