const action = require('../action');

const { BaseEntriesScreen } = require('./baseEntriesScreen');

class CarbRatioScreen extends BaseEntriesScreen {
    constructor(language, config) {
        super(language, {
            HeaderLabel: language.carbRatioSettingsScreen.CarbRatios,
            InfoLabel: language.carbRatioSettingsScreen.CarbRatioInfo,
        });
        this.config = config;
    }
    /**
     * @param {Object} ratio
     * @param {Object} ratio.expected
     * @param {String} ratio.expected.time
     * @param {String} ratio.expected.carbGramsPerInsulinUnit
     * @param {Object} ratio.current optional
     */
    async ApplyOne(ratio) {
        const pickerID = 'quantity_picker'
        const wholePart = 0;
        let expectedParts = String(ratio.expected.carbGramsPerInsulinUnit).split('.');

        if (ratio.current) {
            let currentParts = String(ratio.current.carbGramsPerInsulinUnit).split('.');
            await action.ScrollQuantityPicker(Number(currentParts[wholePart]), Number(expectedParts[wholePart]), pickerID);
        } else {
            await action.ScrollQuantityPicker(this.config.defaultWhole, Number(expectedParts[wholePart]), pickerID);
        }
    }
    /**
     * @param {Array} ratios
     */
    async ApplyAll(ratios) {
        await this.Add();
        for (let index = 0; index < ratios.length; index++) {
            var current;
            let expected = ratios[index];
            if (index > 0) {
                current = ratios[index - 1];
            }
            await this.ApplyOne({ expected, current });
            await this.AddNewEntry();
        }
    }
}

module.exports = {
    CarbRatioScreen
};
