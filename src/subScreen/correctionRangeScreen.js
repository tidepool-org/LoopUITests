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
     * @param {Object} range
     * @param {Object} range.expected
     * @param {String} range.expected.time
     * @param {String} range.expected.max
     * @param {String} range.expected.min
     * @param {Object} range.current optional
     */
    async ApplyOne(range) {
        if (range.current) {
            await action.ScrollQuantityPicker(range.current.max, range.expected.max, maxGlucosePickerID);
            await action.ScrollQuantityPicker(range.current.min, range.expected.min, minGlucosePickerID);
        } else {
            await action.ScrollQuantityPicker(this.config.defaultMaxStart, range.expected.max, maxGlucosePickerID);
            await action.ScrollQuantityPicker(this.config.defaultMinStart, range.expected.min, minGlucosePickerID);
        }
    }
    /**
     * @param {Array} ranges
     */
    async ApplyAll(ranges) {
        await this.Add();
        for (let index = 0; index < ranges.length; index++) {
            var current;
            let expected = ranges[index];
            if (index > 0) {
                current = ranges[index - 1];
            }
            await this.ApplyOne({ expected, current });
            await this.AddNewEntry();
        }
    }
}

module.exports = {
    CorrectionRangeScreen
};
