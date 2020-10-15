const action = require('../action');
const match = require('../match');
const base = require('../base/index');
const { numericPartsFromString } = require('./utils');

class CarbRatioScreen extends base.EntriesScreen {
    constructor(language, config) {
        super({
            screenText: language.settingsScreen.CarbRatioScreen,
            generalText: language.general,
            open: {
                isBtn: false,
                label: language.settingsScreen.CarbRatioScreen.Header,
            },
            header: {
                backLabel: language.settingsScreen.TherapySettingsScreen.Header,
            },
        }, config);
    }
    get OpenButton() {
        return match.accessible.ClickableLabel(this.openLabel).atIndex(0);
    }
    get InfoLabel() {
        return match.accessible.TextLabel(this.screenText.Info).atIndex(0);
    }
    /**
     * @override
     */
    get BackButton() {
        return match.accessible.BackButton(this.backLabel);
    }
    /**
     * @override so we access the header by label
     */
    get Header() {
        return match.accessible.TextLabel(this.screenText.Header).atIndex(1);
    }
    get HighCarbRatioGuardrailMessage() {
        return this.GuardrailMessage(this.screenText.HighCarbRatioGuardrailMessage);
    }
    get LowCarbRatioGuardrailMessage() {
        return this.GuardrailMessage(this.screenText.LowCarbRatioGuardrailMessage);
    }
    /**
     * @param {Object} ratio
     * @param {Object} ratio.expected
     * @param {String} ratio.expected.time
     * @param {String} ratio.expected.carbGramsPerInsulinUnit
     * @param {Object} ratio.current optional
     */
    async ApplyOne(ratio) {
        const wholePart = 0;
        let expectedParts = numericPartsFromString(ratio.expected.carbGramsPerInsulinUnit);
        let currentValue = this.config.startWhole;
        if (ratio.current) {
            let currentParts = numericPartsFromString(ratio.current.carbGramsPerInsulinUnit);
            currentValue = Number(currentParts[wholePart]);
        }
        await action.ScrollDecimalPicker(
            currentValue,
            Number(expectedParts[wholePart]),
        );
    }
    /**
     * @param {Array} ratios
     */
    async ApplyAll(ratios) {
        await this.PlusButton.tap();
        for (let index = 0; index < ratios.length; index++) {
            var current;
            let expected = ratios[index];
            if (index > 0) {
                current = ratios[index - 1];
            }
            await this.ApplyOne({ expected, current });
            await this.AddButton.tap();
        }
    }
}

module.exports = CarbRatioScreen;
