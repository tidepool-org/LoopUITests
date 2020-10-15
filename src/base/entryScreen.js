const match = require('../match');
const Screen = require('./screen');

class EntryScreen extends Screen {
    constructor(parentScreen) {
        parentScreen.header.editable = true;
        super(parentScreen);
    }
    get InfoLabel() {
        return match.accessible.TextLabel(this.screenText.Info);
    }
    get InfoButton() {
        return match.accessible.Button(this.generalText.ButtonLabel.InfoCircle);
    }
    get GuardrailWarningIconPicker() {
        return match.accessible.Image(this.generalText.Alert.ExclamationMark).atIndex(0);
    }
    get CancelNewEntryButton() {
        return match.accessible.Button(this.generalText.Cancel);
    }
    GuardrailMessage(text) {
        return match.accessible.TextLabel(text);
    }
    async OpenPicker(value) {
        await match.accessible.TextLabel(String(value)).tap();
    }
}

module.exports = EntryScreen;
