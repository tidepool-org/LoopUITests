const match = require('./match');

class BaseScreen {
    /**
     * @param {object} parentScreen
     * @param {string} parentScreen.headerLabel
     * @param {string} parentScreen.openScreenLabel
     * @param {object} parentScreen.screenTxt
     * @param {object} parentScreen.generalTxt
     */
    constructor(parentScreen) {
        this.headerLabel = parentScreen.headerLabel;
        this.openScreenLabel = parentScreen.openScreenLabel;
        this.screenTxt = parentScreen.screenTxt;
        this.generalTxt = parentScreen.generalTxt;
    }
    Header() {
        return match.accessible.Header(this.headerLabel);
    }
    CancelButton() {
        return match.accessible.ButtonBarButton(this.generalTxt.Cancel);
    }
    ContinueButton() {
        return match.accessible.ButtonBarButton(this.generalTxt.Continue);
    }
    OpenButton() {
        return match.accessible.Button(this.openScreenLabel);
    }
    async Open() {
        return this.OpenButton().tap();
    }
    async Cancel() {
        return this.CancelButton().tap();
    }
    async Continue() {
        return this.ContinueButton().tap();
    }
}

module.exports = {
    BaseScreen
};
