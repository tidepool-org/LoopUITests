const match = require('../match');
const action = require('../action');
const { indexForTime } = require('../properties');
const config = require('../config');

class CorrectionRangeScreen {
    constructor(language) {
        this.language = language;
    }
    Header() {
        return match.accessible.Header(this.language.settingsScreen.CorrectionRange);
    }
    BackButton() {
        return match.accessible.BackButton(this.language.settingsScreen.Settings);
    }
    CancelButton() {
        return match.accessible.ButtonBarButton(this.language.general.Cancel);
    }
    SaveButton() {
        return match.accessible.Label(this.language.general.Save);
    }
    AddButton() {
        return match.accessible.ButtonBarButton(this.language.general.Add);
    }
    PreMealOverrideButton() {
        return match.accessible.Label(this.language.settingsScreen.PreMeal);
    }
    async OpenPicker() {
        await this.AddButton().tap();
    }
    async Close() {
        await this.BackButton().tap();
    }
    async Save() {
        await this.SaveButton().tap();
    }
    async Cancel() {
        await this.CancelButton().tap();
    }
    async ApplyAll(ranges) {
        for (let index = 0; index < ranges.length; index++) {
            await this.Apply(ranges[index]);
        }
    }
    async SetTime(time) {
        let pickerIndex = indexForTime(time);
        await match.accessible.Label(`${time}`).atIndex(pickerIndex).tap();
    }
    /**
     * @param {Object} range
     * @param {String} range.max
     * @param {String} range.min
     */
    async Apply(range) {
        await action.ScrollCorrectionRangePickers(range, config.correctionRangesMaximum);
    }
    /**
     * @param {Object} override
     * @param {String} override.max
     * @param {String} override.min
     */
    async ApplyPreMealOverride(override) {
        await this.PreMealOverrideButton().tap();
        const minimumColumn = 2;
        const maximumColumn = 0;
        await action.SetPickerValue(maximumColumn, override.max);
        await action.SetPickerValue(minimumColumn, override.min);
    }
}

module.exports = {
    CorrectionRangeScreen
};
