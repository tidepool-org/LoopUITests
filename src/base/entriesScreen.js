const match = require('../match');
const Screen = require('./screen');


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
}

module.exports = EntriesScreen;
