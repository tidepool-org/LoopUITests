const action = require('../action');
const match = require('../match');
const base = require('../base/index');

class CorrectionRangeScreen extends base.EntriesScreen {
    constructor(language, config) {
        super({
            screenText: language.settingsScreen.CorrectionRangeScreen,
            generalText: language.general,
            header: {
                backLabel: language.settingsScreen.TherapySettingsScreen.Header,
            },
            open: {
                isBtn: false,
                label: language.settingsScreen.CorrectionRangeScreen.Header,
            },
        }, config);
    }
    get BackButton() {
        return match.accessible.Button(this.backLabel).atIndex(0);
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
        return match.accessible.TextLabel(this.screenText.Header).atIndex(1);
    }
    get LowCorrectionValueGuardrailMessage() {
        return this.GuardrailMessage(this.screenText.LowCorrectionValueGuardrailMessage);
    }
    get HighCorrectionValueGuardrailMessage() {
        return this.GuardrailMessage(this.screenText.HighCorrectionValueGuardrailMessage);
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
        let currentMax = this.config.maxStart;
        let currentMin = this.config.minStart;

        if (range.current) {
            currentMax = range.current.max;
            currentMin = range.current.min;
        }
        await action.ScrollMaxMinPicker(
            currentMax,
            range.expected.max,
            false,
        );
        await action.ScrollMaxMinPicker(
            currentMin,
            range.expected.min,
            true,
        );
    }
    /**
     * @param {Array} ranges
     */
    async ApplyAll(ranges) {
        await this.PlusButton.tap();
        for (let index = 0; index < ranges.length; index++) {
            var current;
            let expected = ranges[index];
            if (index > 0) {
                current = ranges[index - 1];
            }
            await this.ApplyOne({ expected, current });
            await this.Add();
        }
    }
    async Open() {
        await super.Open();
        return this;
    }
}

module.exports = CorrectionRangeScreen;
