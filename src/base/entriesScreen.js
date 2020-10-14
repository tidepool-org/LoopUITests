const match = require('../match');
const Screen = require('./screen');


class EntriesScreen extends Screen {
    constructor(parentScreen, config) {
        parentScreen.header.editable = true;
        super(parentScreen);
        this.config = config;
    }
    get InfoLabel() {
        return match.accessible.TextLabel(this.screenText.Info);
    }
    get CancelNewEntryButton() {
        return match.accessible.Button(this.generalText.Cancel);
    }
    get NewEntryLabel() {
        return match.accessible.ClickableLabel(this.generalText.NewEntry);
    }
    get InfoButton() {
        return match.accessible.Button(this.generalText.ButtonLabel.InfoCircle);
    }
    get BackButton() {
        return match.accessible.Button(this.backLabel);
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
    GuardrailMessage(text) {
        return match.accessible.TextLabel(text);
    }
    async OpenPicker(value) {
        await match.accessible.TextLabel(String(value)).tap();
    }
}

module.exports = EntriesScreen;
