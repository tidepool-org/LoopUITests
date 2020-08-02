const action = require('../action');
const match = require('../match');
const { base } = require('../base/index');

const pickerID = 'quantity_picker';

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
                backLabel: language.general.Cancel,
            },
        }, config);
    }
    /**
     * @override so we access the header by label
     */
    Header() {
        return match.accessible.TextLabel(this.screenText.Header).atIndex(1);
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
                { pickerID: pickerID, useItemID: true, smallStep: false }
            );
        } else {
            await action.ScrollQuantityPicker(
                this.config.start,
                sensitivity.expected.bgValuePerInsulinUnit,
                { pickerID: pickerID, useItemID: true, smallStep: false }
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
            await this.Add();
        }
    }
}

module.exports = {
    InsulinSensitivitiesScreen
};
