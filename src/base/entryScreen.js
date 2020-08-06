const match = require('../match');
const Screen = require('./screen');

class EntryScreen extends Screen {
    /**
     * @param {object} parentScreen
     * @param {string} parentScreen.openLabel
     * @param {string} parentScreen.backLabel
     * @param {object} parentScreen.screenText
     * @param {object} parentScreen.generalText
     */
    constructor(parentScreen) {
        parentScreen.header.editable = true;
        super(parentScreen);
    }
    InfoLabel() {
        return match.accessible.TextLabel(this.screenText.Info);
    }
    InfoButton() {
        return match.accessible.Button(this.generalText.ButtonLabel.InfoCircle);
    }
    GuardrailWarningIconPicker() {
        return match.accessible.Image(this.generalText.Alert.ExclamationMark).atIndex(0);
    }
    GuardrailMessage(text) {
        return match.accessible.TextLabel(text);
    }
}

module.exports = EntryScreen;
