const match = require('../match');

class BaseScreen {
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
    PlusButton() {
        return match.accessible.Button(this.language.buttonLabel.Plus);
    }
    EditButton() {
        return match.accessible.Button(this.language.general.Edit);
    }
    SaveButton() {
        return match.accessible.Label(this.language.general.Save);
    }
    AddNewEntryButton() {
        return match.accessible.Button(this.language.general.Add);
    }
    CancelNewEntryButton() {
        return match.accessible.Button(this.language.general.Cancel);
    }
    NewEntryLabel() {
        return match.accessible.Label(this.language.general.NewEntry);
    }
    InfoButton() {
        return match.accessible.Button(this.language.buttonLabel.InfoCircle);
    }
    GuardrailWarningIconPicker(itemNumber) {
        let scheduleItemMask = `schedule_item_${itemNumber}`;
        return match.accessible.ImageAndId(this.language.alerts.ExclamationMark, scheduleItemMask);
    }
    async Add() {
        await this.PlusButton().tap();
    }
    async Edit() {
        await this.EditButton().tap();
    }
    async Cancel() {
        await this.CancelButton().tap();
    }
    async CancelNewEntry() {
        await this.CancelNewEntryButton().tap();
    }
    async AddNewEntry() {
        await this.AddNewEntryButton().tap();
    }
    async Save() {
        await this.SaveButton().tap();
    }
}

module.exports = {
    BaseScreen
};
