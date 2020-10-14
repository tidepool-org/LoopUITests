const match = require('../match');
const action = require('../action');
const base = require('../base/index');

class SuspendThresholdScreen extends base.EntryScreen {
    constructor(language, config) {
        super({
            screenText: language.settingsScreen.SuspendThresholdScreen,
            generalText: language.general,
            header: {
                backLabel: language.settingsScreen.TherapySettingsScreen.Header,
            },
            open: {
                isBtn: false,
                label: language.settingsScreen.SuspendThresholdScreen.Header,
            },
        });
        this.bgUnitsLabel = language.settingsScreen.SuspendThresholdScreen.BGUnits;
        this.config = config;
    }
    get OpenButton() {
        return match.accessible.ClickableLabel(this.openLabel).atIndex(1);
    }
    get InfoLabel() {
        return match.accessible.TextLabel(this.screenText.Info);
    }
    /**
     * @override so we access the header by label
     */
    get Header() {
        return match.accessible.TextLabel(this.screenText.Header).atIndex(0);
    }
    get LowSuspendThresholdGuardrailMessage() {
        return this.GuardrailMessage(this.screenText.LowSuspendThresholdGuardrailMessage);
    }
    get HighSuspendThresholdGuardrailMessage() {
        return this.GuardrailMessage(this.screenText.HighSuspendThresholdGuardrailMessage);
    }
    /**
     * @param {object} threshold
     * @param {object} threshold.expected
     * @param {number} threshold.expected.value
     * @param {object} threshold.current optional
     **/
    async ApplyOne(threshold) {
        let currentValue = this.config.start;
        if (threshold.current) {
            currentValue = threshold.current.value;
        }
        await action.ScrollIntegerPicker(
            currentValue,
            threshold.expected.value,
        );

    }
    async Open() {
        await super.Open();
        return this;
    }
}

module.exports = SuspendThresholdScreen;
