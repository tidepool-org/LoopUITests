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
     * @param {Object} sensitivity
     * @param {Object} sensitivity.expected
     * @param {String} sensitivity.expected.time
     * @param {String} sensitivity.expected.bgValuePerInsulinUnit
     * @param {Object} sensitivity.current optional
     */
    async ApplyOne(sensitivity) {
        if (sensitivity.current) {
            await action.ScrollQuantityPicker(
                sensitivity.current.bgValuePerInsulinUnit,
                sensitivity.expected.bgValuePerInsulinUnit,
                pickerID,
                true,
            );
        } else {
            await action.ScrollQuantityPicker(
                this.config.start,
                sensitivity.expected.bgValuePerInsulinUnit,
                pickerID,
                true,
            );
        }
    }
    /**
     * @param {Array} sensitivities
     */
    async ApplyAll(sensitivities) {
        await super.ApplyAll(sensitivities, this.ApplyOne);
    }
}

module.exports = {
    InsulinSensitivitiesScreen
};
