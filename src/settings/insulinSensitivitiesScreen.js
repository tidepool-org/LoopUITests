const action = require('../action');
const match = require('../match');
const base = require('../base/index');

class InsulinSensitivitiesScreen extends base.EntriesScreen {
    constructor(language, config) {
        super({
            screenText: language.settingsScreen.InsulinSensitivitiesScreen,
            generalText: language.general,
            open: {
                isBtn: false,
                label: language.settingsScreen.InsulinSensitivitiesScreen.Header,
            },
            header: {
                backLabel: language.settingsScreen.TherapySettingsScreen.Header,
            },
        }, config);
    }
    get BackButton() {
        return match.accessible.BackButton(this.backLabel);
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
    get LowInsulinSensitivityGuardrailMessage() {
        return this.GuardrailMessage(this.screenText.LowInsulinSensitivityGuardrailMessage);
    }
    get HighInsulinSensitivityGuardrailMessage() {
        return this.GuardrailMessage(this.screenText.HighInsulinSensitivityGuardrailMessage);
    }
    /**
     * @param {Object} sensitivity
     * @param {Object} sensitivity.expected
     * @param {String} sensitivity.expected.time
     * @param {String} sensitivity.expected.bgValuePerInsulinUnit
     * @param {Object} sensitivity.current optional
     */
    async ApplyOne(sensitivity) {
        let currentValuePerInsulinUnit = this.config.start;
        if (sensitivity.current) {
            currentValuePerInsulinUnit = sensitivity.current.bgValuePerInsulinUnit;
        }
        await action.ScrollIntegerPicker(
            currentValuePerInsulinUnit,
            sensitivity.expected.bgValuePerInsulinUnit
        );
    }
    /**
     * @param {Array} sensitivities
     */
    async ApplyAll(sensitivities) {
        await this.PlusButton.tap();
        for (let index = 0; index < sensitivities.length; index++) {
            var current;
            let expected = sensitivities[index];
            if (index > 0) {
                current = sensitivities[index - 1];
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

module.exports = InsulinSensitivitiesScreen;
