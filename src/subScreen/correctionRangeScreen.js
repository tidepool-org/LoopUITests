const action = require('../action');

const { BaseEntriesScreen } = require('./baseEntriesScreen');

const maxGlucosePickerID = 'max_glucose_picker';
const minGlucosePickerID = 'min_glucose_picker';

class CorrectionRangeScreen extends BaseEntriesScreen {
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
    async ApplyOne(expectedRange, currentRange) {
        if (currentRange) {
            await action.ScrollQuantityPicker(currentRange.max, expectedRange.max, maxGlucosePickerID);
            await action.ScrollQuantityPicker(currentRange.min, expectedRange.min, minGlucosePickerID);
        } else {
            await action.ScrollQuantityPicker(this.config.maxStart, expectedRange.max, maxGlucosePickerID);
            await action.ScrollQuantityPicker(this.config.minStart, expectedRange.min, minGlucosePickerID);
        }
    }
    /**
     * @param {Array} ranges
     */
    async ApplyAll(ranges) {
        await this.Add();
        for (let index = 0; index < ranges.length; index++) {
            var existing;
            let expected = ranges[index];
            if (index > 0) {
                existing = ranges[index - 1];
            }
            await this.ApplyOne(expected, existing);
            await this.AddNewEntry();
        }
    }
}

module.exports = {
    CorrectionRangeScreen
};
