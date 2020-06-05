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
     * @param {object} expectedThreshold
     * @param {number} expectedThreshold.value
     * @param {object} currentThreshold optional
     **/
    async ApplyOne(expectedThreshold, currentThreshold) {
        if (currentThreshold) {
            await action.ScrollPickerToValue(currentThreshold.value, expectedThreshold.value);
        } else {
            await action.ScrollPickerToValue(this.config.start, expectedThreshold.value);
        }
    }
}

module.exports = {
    SuspendThresholdScreen
};
