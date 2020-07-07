const match = require('../match');

class EntryScreen {
    constructor(language, parentScreen) {
        this.language = language;
        this.parentScreen = parentScreen;
    }
    Header() {
        return match.accessible.Header(this.parentScreen.HeaderLabel);
    }
    InfoLabel() {
        return match.accessible.Label(this.parentScreen.InfoLabel);
    }
    CancelButton() {
        return match.accessible.Button(this.language.general.Cancel);
    }
    SaveButton() {
        return match.accessible.Label(this.language.general.Save);
    }
    InfoButton() {
        return match.accessible.Button(this.language.buttonLabel.InfoCircle);
    }
    GuardrailWarningIconPicker() {
        return match.accessible.Image(this.language.alerts.ExclamationMark).atIndex(0);
    }
    async Cancel() {
        await this.CancelButton().atIndex(0).tap();
    }
    async SaveAndClose() {
        await this.SaveButton().tap();
    }
}

module.exports = {
    EntryScreen
};
