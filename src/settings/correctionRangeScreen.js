const action = require('../action');
const match = require('../match');
const base = require('../base/index');

const maxGlucosePickerID = 'max_glucose_picker';
const minGlucosePickerID = 'min_glucose_picker';

class CorrectionRangeScreen extends base.EntriesScreen {
    constructor(language, config) {
        super({
            screenText: language.settingsScreen.CorrectionRangeScreen,
            generalText: language.general,
            header: {
                backLabel: language.general.Cancel,
            },
            open: {
                isBtn: false,
                label: language.settingsScreen.CorrectionRangeScreen.Header,
            },
        }, config);
    }
    /**
     * @override so we access the header by label
     */
    Header() {
        return match.accessible.TextLabel(this.screenText.Header);
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
        await this.AddAction();
        for (let index = 0; index < ranges.length; index++) {
            var current;
            let expected = ranges[index];
            if (index > 0) {
                current = ranges[index - 1];
            }
            await this.ApplyOne({ expected, current });
            await this.AddAction();
        }
    }
}

module.exports = CorrectionRangeScreen;
