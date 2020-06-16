const action = require('../action');

const { BaseEntriesScreen } = require('./baseEntriesScreen');

class BasalRatesScreen extends BaseEntriesScreen {
    constructor(language, config) {
        super(language, {
            HeaderLabel: language.basalRatesSettingScreen.BasalRates,
            InfoLabel: language.basalRatesSettingScreen.BasalRatesInfo,
        });
        this.unitsLabel = language.basalRatesSettingScreen.Units;
        this.config = config;
    }
    /**
     * @param {Object} rate
     * @param {Object} rate.expected
     * @param {String} rate.expected.time
     * @param {number} range.expected.unitsPerHour
     * @param {Object} rate.current optional
     */
    async ApplyOne(rate) {
        const pickerID = 'quantity_picker'
        const wholePart = 0;
        let expectedParts = String(rate.expected.unitsPerHour).split('.');

        if (rate.current) {
            let currentParts = String(rate.current.unitsPerHour).split('.');
            await action.ScrollQuantityPicker(Number(currentParts[wholePart]), Number(expectedParts[wholePart]), pickerID);
        } else {
            await action.ScrollQuantityPicker(this.config.startWhole, Number(expectedParts[wholePart]), pickerID);
        }
    }
    /**
     * @param {Array} ratios
     */
    async ApplyAll(ratios) {
        super.ApplyAll(ratios, this.ApplyOne);
    }
}

module.exports = {
    BasalRatesScreen
};
