const match = require('../match');
const { Screen } = require('./screen');


class EntriesScreen extends Screen {
    /**
    * @param {object} parentScreen
    * @param {string} parentScreen.openLabel
    * @param {string} parentScreen.backLabel
    * @param {object} parentScreen.screenTxt
    * @param {object} parentScreen.generalTxt
    * @param {object} config
    */
    constructor(parentScreen, config) {
        super(parentScreen);
        this.config = config;
    }
    InfoLabel() {
        return match.accessible.Label(this.screenTxt.Info);
    }
    PlusButton() {
        return match.accessible.Button(this.generalTxt.ButtonLabel.Plus);
    }
    EditButton() {
        return match.accessible.Button(this.generalTxt.Edit);
    }
    SaveButton() {
        return match.accessible.Label(this.generalTxt.Save);
    }
    AddNewEntryButton() {
        return match.accessible.Button(this.generalTxt.Add);
    }
    CancelNewEntryButton() {
        return match.accessible.Button(this.generalTxt.Cancel);
    }
    NewEntryLabel() {
        return match.accessible.Label(this.generalTxt.NewEntry);
    }
    InfoButton() {
        return match.accessible.Button(this.generalTxt.ButtonLabel.InfoCircle);
    }
    /**
     *
     * @param {object} entry
     * @param {number} entry.index
     */
    GuardrailWarningIconPicker(entry) {
        let scheduleItemMask = `schedule_item_${entry.index}`;
        return match.accessible.ImageAndId(this.generalTxt.Alert.ExclamationMark, scheduleItemMask);
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
