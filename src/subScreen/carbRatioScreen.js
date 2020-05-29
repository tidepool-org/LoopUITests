const action = require('../action');

const { BaseEntriesScreen } = require('./baseEntriesScreen');

class CarbRatioScreen extends BaseEntriesScreen {
    constructor(language, config) {
        super(language, {
            HeaderLabel: language.settingsScreen.CarbRatios,
            InfoLabel: language.settingsScreen.CarbRatioInfo,
        });
        this.config = config;
    }
    /**
     * @param {Object} expectedRatio
     * @param {String} expectedRatio.time
     * @param {String} expectedRatio.carbGramsPerInsulinUnit
     * @param {Object} currentRatio optional
     */
    async ApplyOne(expectedRatio, currentRatio) {
        const pickerID = 'quantity_picker'
        const wholePart = 0;
        const decimalPart = 1;
        let expectedParts = String(expectedRatio.carbGramsPerInsulinUnit).split('.');

        if (currentRatio) {
            let currentParts = String(currentRatio.carbGramsPerInsulinUnit).split('.');
            await action.ScrollQuantityPicker(Number(currentParts[wholePart]), Number(expectedParts[wholePart]), pickerID);
            //await action.ScrollQuantityPicker(Number(currentParts[decimalPart]), Number(expectedParts[decimalPart]), pickerID);
        } else {
            await action.ScrollQuantityPicker(this.config.defaultWhole, Number(expectedParts[wholePart]), pickerID);
            //await action.ScrollQuantityPicker(this.config.defaultDecimal, expectedParts[decimalPart], pickerID);
        }
    }
    /**
     * @param {Array} ratios
     */
    async ApplyAll(ratios) {
        await this.Add();
        for (let index = 0; index < ratios.length; index++) {
            var existing;
            let expected = ratios[index];
            if (index > 0) {
                existing = ratios[index - 1];
            }
            await this.ApplyOne(expected, existing);
            await this.AddNewEntry();
        }
    }
}

module.exports = {
    CarbRatioScreen
};
