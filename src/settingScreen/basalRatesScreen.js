const action = require('../action');

const { BaseEntriesScreen } = require('./baseEntriesScreen');

class BasalRatesScreen extends BaseEntriesScreen {
    constructor(language, config) {
        super(language, config, {
            HeaderLabel: language.settingsScreen.BasalRatesScreen.BasalRates,
            InfoLabel: language.settingsScreen.BasalRatesScreen.BasalRatesInfo,
        });
        this.unitsLabel = language.settingsScreen.BasalRatesScreen.Units;
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
            await action.ScrollQuantityPicker(
                Number(currentParts[wholePart]),
                Number(expectedParts[wholePart]),
                { pickerID: pickerID, useItemID: false, smallStep: false }
            );
        } else {
            await action.ScrollQuantityPicker(
                this.config.startWhole,
                Number(expectedParts[wholePart]),
                { pickerID: pickerID, useItemID: false, smallStep: false }
            );
        }
    }
    /**
     * @param {Array} rates
     */
    async ApplyAll(rates) {
        await super.ApplyAll(rates, this.ApplyOne);
    }
}

module.exports = {
    BasalRatesScreen
};
