const action = require('../action');
const { base } = require('../base/index');

const maxGlucosePickerID = 'max_glucose_picker';
const minGlucosePickerID = 'min_glucose_picker';

class CorrectionRangeScreen extends base.EntriesScreen {
    constructor(language, config) {
        super({
            screenTxt: language.settingsScreen.CorrectionRangeScreen,
            generalTxt: language.general,
            openLabel: language.settingsScreen.CorrectionRangeScreen.Header,
            backLabel: language.general.Cancel,
        }, config);
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
            await action.ScrollQuantityPicker(
                range.current.max,
                range.expected.max,
                { pickerID: maxGlucosePickerID, useItemID: false, smallStep: false }
            );
            await action.ScrollQuantityPicker(
                range.current.min,
                range.expected.min,
                { pickerID: minGlucosePickerID, useItemID: false, smallStep: false }
            );
        } else {
            await action.ScrollQuantityPicker(
                this.config.maxStart,
                range.expected.max,
                { pickerID: maxGlucosePickerID, useItemID: false, smallStep: false }
            );
            await action.ScrollQuantityPicker(
                this.config.minStart,
                range.expected.min,
                { pickerID: minGlucosePickerID, useItemID: false, smallStep: false }
            );
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
