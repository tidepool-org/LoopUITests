const match = require('../match');
const action = require('../action');
const { BaseScreen } = require('./baseScreen');

const pickerID = 'quantity_picker';

class InsulinSensitivitiesScreen extends BaseScreen {
    constructor(language, config) {
        super(language, {
            HeaderLabel: language.settingsScreen.InsulinSensitivities,
            InfoLabel: language.settingsScreen.InsulinSensitivityInfo,
        });
        this.config = config;
    }
    /**
     * @param {Object} expectedSensitivity
     * @param {String} expectedSensitivity.time
     * @param {String} expectedSensitivity.bgValuePerInsulinUnit
     * @param {Object} currentSensitivity optional
     */
    async Apply(expectedSensitivity, currentSensitivity) {
        if (currentSensitivity) {
            await action.ScrollQuantityPicker(
                currentSensitivity.bgValuePerInsulinUnit,
                expectedSensitivity.bgValuePerInsulinUnit,
                pickerID,
            );
        } else {
            await action.ScrollQuantityPicker(
                this.config.maxStart,
                expectedSensitivity.bgValuePerInsulinUnit,
                pickerID,
            );
        }
    }
    /**
     * @param {Object} expectedSensitivity
     * @param {String} expectedSensitivity.time
     * @param {String} expectedSensitivity.bgValuePerInsulinUnit
     * @param {Object} currentSensitivity optional
     */
    async Edit(expectedSensitivity, currentSensitivity) {
        await match.accessible.Label(`${currentSensitivity.time}`).tap();
        await action.ScrollPickerToValue(`${currentSensitivity.time}`, `${expectedSensitivity.time}`);
        await action.ScrollQuantityPicker(
            currentSensitivity.bgValuePerInsulinUnit,
            expectedSensitivity.bgValuePerInsulinUnit,
            pickerID,
        );
    }
}

module.exports = {
    InsulinSensitivitiesScreen
};
