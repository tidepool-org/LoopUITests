const match = require('../match');
const action = require('../action');

class SuspendThresholdScreen {
    constructor(language) {
        this.language = language;
    }
    Header() {
        return match.accessible.Header(this.language.settingsScreen.SuspendThreshold);
    }
    CancelButton() {
        return match.accessible.ButtonBarButton(this.language.general.Cancel);
    }
    SaveButton() {
        return match.accessible.Button(this.language.general.Save);
    }
    GuardrailWarningIconPicker() {
        return match.accessible.Image(this.language.alerts.ExclamationMark).atIndex(0);
    }
    GuardrailWarningIconSave() {
        return match.accessible.Image(this.language.alerts.ExclamationMark).atIndex(1);
    }
    GuardrailWarningText(text) {
        return match.accessible.Label(text);
    }
    async Save() {
        await this.SaveButton().tap();
    }
    async Cancel() {
        await this.CancelButton().tap();
    }
    async OpenPicker() {
        await match.accessible.Label(this.language.units.Glucose).atIndex(0).tap();
    }
    async SwipePickerToMaxValue() {
        await action.SwipePickerUp(3);
    }
    async SwipePickerToMinValue() {
        await action.SwipePickerDown(3);
    }
    /**
     * @param {object} threshold
     * @param {number} threshold.value
     * @param {number} startAt optional, starting point on the picker
     **/
    async Apply(threshold, startAt) {
        if (threshold) {
            await action.ScrollPickerToValue(startAt, threshold.value);
        }
    }
}

module.exports = {
    SuspendThresholdScreen
};
