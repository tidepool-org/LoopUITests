const match = require('../match');
const Screen = require('./screen');

class EntryScreen extends Screen {
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
    CancelNewEntryButton() {
        return match.accessible.Button(this.generalText.Cancel);
    }
    async OpenPicker(value) {
        await match.accessible.TextLabel(String(value)).tap();
    }
    async CancelNewEntry() {
        await this.CancelNewEntryButton().tap();
    }
}

module.exports = EntryScreen;
