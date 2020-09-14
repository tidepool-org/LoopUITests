const match = require('../match');
const Screen = require('./screen');


class EntriesScreen extends Screen {
    constructor(parentScreen, config) {
        parentScreen.header.editable = true;
        super(parentScreen);
        this.config = config;
    }
    InfoLabel() {
        return match.accessible.TextLabel(this.screenText.Info);
    }
    CancelNewEntryButton() {
        return match.accessible.Button(this.generalText.Cancel);
    }
    NewEntryLabel() {
        return match.accessible.ClickableLabel(this.generalText.NewEntry);
    }
    InfoButton() {
        return match.accessible.Button(this.generalText.ButtonLabel.InfoCircle);
    }
    BackButton() {
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
    async CancelNewEntry() {
        await this.CancelNewEntryButton().tap();
    }
    async OpenPicker(value) {
        await match.accessible.TextLabel(String(value)).tap();
    }
}

module.exports = EntriesScreen;
