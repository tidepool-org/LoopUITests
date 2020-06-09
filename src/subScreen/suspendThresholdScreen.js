const match = require('../match');
const action = require('../action');

const { BaseEntryScreen } = require('./baseEntryScreen');

class SuspendThresholdScreen extends BaseEntryScreen {
    constructor(language, config) {
        super(language, {
            HeaderLabel: language.suspendThresholdSettingScreen.SuspendThreshold,
            InfoLabel: language.suspendThresholdSettingScreen.SuspendThresholdInfo,
        });
        this.bgUnitsLabel = language.suspendThresholdSettingScreen.BGUnits;
        this.config = config;
    }
    async OpenPicker() {
        await match.accessible.Label(this.bgUnitsLabel).atIndex(0).tap();
    }
    async SwipePickerToMaxValue() {
        await action.SwipePickerUp(3);
    }
    async SwipePickerToMinValue() {
        await action.SwipePickerDown(3);
    }
    /**
     * @param {object} threshold
     * @param {object} threshold.expected
     * @param {number} threshold.expected.value
     * @param {object} threshold.current optional
     **/
    async ApplyOne(threshold) {
        if (threshold.current) {
            await action.ScrollPickerToValue(threshold.current.value, threshold.expected.value);
        } else {
            await action.ScrollPickerToValue(this.config.defaultStart, threshold.expected.value);
        }
    }
}

module.exports = {
    SuspendThresholdScreen
};
