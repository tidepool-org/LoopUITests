const match = require('../match');
const action = require('../action');
const { BaseEntriesScreen } = require('./baseEntriesScreen');

const pickerID = 'quantity_picker';

class InsulinSensitivitiesScreen extends BaseEntriesScreen {
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
    async ApplyOne(expectedSensitivity, currentSensitivity) {
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
     * @param {Array} sensitivities
     */
    async ApplyAll(sensitivities) {
        await this.Add();
        for (let index = 0; index < sensitivities.length; index++) {
            var existing;
            let expected = sensitivities[index];
            if (index > 0) {
                existing = sensitivities[index - 1];
            }
            await this.ApplyOne(expected, existing);
            await this.AddNewEntry();
        }
    }
}

module.exports = {
    InsulinSensitivitiesScreen
};
