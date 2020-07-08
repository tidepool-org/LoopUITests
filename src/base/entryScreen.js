const match = require('../match');
const { Screen } = require('./screen');

class EntryScreen extends Screen {
    /**
     * @param {object} parentScreen
     * @param {string} parentScreen.openLabel
     * @param {string} parentScreen.backLabel
     * @param {object} parentScreen.screenTxt
     * @param {object} parentScreen.generalTxt
     */
    constructor(parentScreen) {
        super(parentScreen);
    }
    InfoLabel() {
        return match.accessible.Label(this.screenTxt.Info);
    }
    SaveButton() {
        return match.accessible.Label(this.generalTxt.Save);
    }
    InfoButton() {
        return match.accessible.Button(this.generalTxt.ButtonLabel.InfoCircle);
    }
    GuardrailWarningIconPicker() {
        return match.accessible.Image(this.generalTxt.Alert.ExclamationMark).atIndex(0);
    }
    async SaveAndClose() {
        await this.SaveButton().tap();
    }
}

module.exports = {
    EntryScreen
};
