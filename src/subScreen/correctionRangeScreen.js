const match = require('../match');
const action = require('../action');

const { BaseScreen } = require('./baseScreen');

const maxGlucosePickerID = 'max_glucose_picker';
const minGlucosePickerID = 'min_glucose_picker';

class CorrectionRangeScreen extends BaseScreen {
    constructor(language, config) {
        super(language, {
            HeaderLabel: language.settingsScreen.CorrectionRange,
            InfoLabel: language.settingsScreen.CorrectionRangeInfo,
        });
        this.config = config;
    }
    /**
     * @param {Object} expectedRange
     * @param {String} expectedRange.time
     * @param {String} expectedRange.max
     * @param {String} expectedRange.min
     * @param {Object} currentRange optional
     */
    async Apply(expectedRange, currentRange) {
        if (currentRange) {
            await action.ScrollQuantityPicker(currentRange.max, expectedRange.max, maxGlucosePickerID);
            await action.ScrollQuantityPicker(currentRange.min, expectedRange.min, minGlucosePickerID);
        } else {
            await action.ScrollQuantityPicker(this.config.maxStart, expectedRange.max, maxGlucosePickerID);
            await action.ScrollQuantityPicker(this.config.minStart, expectedRange.min, minGlucosePickerID);
        }
    }
}

module.exports = {
    CorrectionRangeScreen
};
