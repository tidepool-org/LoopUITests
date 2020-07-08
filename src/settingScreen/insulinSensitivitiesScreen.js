const action = require('../action');
const { base } = require('../base/index');

const pickerID = 'quantity_picker';

class InsulinSensitivitiesScreen extends base.EntriesScreen {
    constructor(language, config) {
        super({
            screenTxt: language.settingsScreen.InsulinSensitivitiesScreen,
            generalTxt: language.general,
            openLabel: language.settingsScreen.InsulinSensitivitiesScreen.Header,
            backLabel: language.general.Cancel,
        }, config);
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
        await this.Add();
        for (let index = 0; index < sensitivities.length; index++) {
            var current;
            let expected = sensitivities[index];
            if (index > 0) {
                current = sensitivities[index - 1];
            }
            await this.ApplyOne({ expected, current });
            await this.AddNewEntry();
        }
    }
}

module.exports = {
    InsulinSensitivitiesScreen
};
