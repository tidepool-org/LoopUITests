const match = require('../match');
const action = require('../action');
const base = require('../base/index');

class SuspendThresholdScreen extends base.EntryScreen {
    constructor(language, config) {
        super({
            screenText: language.settingsScreen.SuspendThresholdScreen,
            generalText: language.general,
            header: {
                backLabel: language.general.Cancel,
            },
            open: {
                isBtn: false,
                label: language.settingsScreen.SuspendThresholdScreen.Header,
            },
        });
        this.bgUnitsLabel = language.settingsScreen.SuspendThresholdScreen.BGUnits;
        this.config = config;
    }
    OpenButton() {
        return match.accessible.ClickableLabel(this.openLabel).atIndex(1);
    }
    /**
     * @override so we access the header by label
     */
    Header() {
        return match.accessible.TextLabel(this.screenText.Header).atIndex(1);
    }
    async OpenPicker() {
        await match.accessible.TextLabel(this.bgUnitsLabel).atIndex(0).tap();
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
    async Open() {
        await super.Open();
        return this;
    }
}

module.exports = SuspendThresholdScreen;
