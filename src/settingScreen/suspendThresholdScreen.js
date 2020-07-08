const match = require('../match');
const action = require('../action');
const { base } = require('../base/index');

class SuspendThresholdScreen extends base.EntryScreen {
    constructor(language, config) {
        super({
            screenTxt: language.settingsScreen.SuspendThresholdScreen,
            generalTxt: language.general,
            openLabel: language.settingsScreen.SuspendThresholdScreen.Header,
            backLabel: language.general.Cancel,
        });
        this.bgUnitsLabel = language.settingsScreen.SuspendThresholdScreen.BGUnits;
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
            await action.ScrollPickerToValue(this.config.start, threshold.expected.value);
        }
    }
}

module.exports = {
    SuspendThresholdScreen
};
