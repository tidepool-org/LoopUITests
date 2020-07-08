const match = require('../match');
const { Screen } = require('./screen');


class EntriesScreen extends Screen {
    /**
    * @param {object} parentScreen
    * @param {string} parentScreen.openLabel
    * @param {string} parentScreen.backLabel
    * @param {object} parentScreen.screenText
    * @param {object} parentScreen.generalText
    * @param {object} config
    */
    constructor(parentScreen, config) {
        super(parentScreen);
        this.config = config;
    }
    InfoLabel() {
        return match.accessible.Label(this.screenText.Info);
    }
    PlusButton() {
        return match.accessible.Button(this.generalText.ButtonLabel.Plus);
    }
    EditButton() {
        return match.accessible.Button(this.generalText.Edit);
    }
    SaveButton() {
        return match.accessible.Label(this.generalText.Save);
    }
    AddNewEntryButton() {
        return match.accessible.Button(this.generalText.Add);
    }
    CancelNewEntryButton() {
        return match.accessible.Button(this.generalText.Cancel);
    }
    NewEntryLabel() {
        return match.accessible.Label(this.generalText.NewEntry);
    }
    InfoButton() {
        return match.accessible.Button(this.generalText.ButtonLabel.InfoCircle);
    }
    /**
     *
     * @param {object} entry
     * @param {number} entry.index
     */
    GuardrailWarningIconPicker(entry) {
        let scheduleItemMask = `schedule_item_${entry.index}`;
        return match.accessible.ImageAndId(this.generalText.Alert.ExclamationMark, scheduleItemMask);
    }
    async Add() {
        await this.PlusButton().tap();
    }
    async Edit() {
        await this.EditButton().tap();
    }
    async CancelNewEntry() {
        await this.CancelNewEntryButton().tap();
    }
    async AddNewEntry() {
        await this.AddNewEntryButton().tap();
    }
    async SaveAndClose() {
        await this.SaveButton().tap();
    }
}

module.exports = {
    EntriesScreen
};
