const action = require('../action');
const match = require('../match');
const { base } = require('../base/index');

class BasalRatesScreen extends base.EntriesScreen {
    constructor(language, config) {
        super({
            screenText: language.settingsScreen.BasalRatesScreen,
            generalText: language.general,
            open: {
                isBtn: false,
                label: language.settingsScreen.BasalRatesScreen.Header,
            },
            header: {
                backLabel: language.general.Cancel,
            },
        }, config);
        this.unitsLabel = language.settingsScreen.BasalRatesScreen.Units;
    }
    /**
     * @override so we access the header by label
     */
    Header() {
        return match.accessible.TextLabel(this.screenText.Header).atIndex(0);
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
