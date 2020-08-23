const action = require('../action');
const match = require('../match');
const base = require('../base/index');

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
    OpenButton() {
        return match.accessible.ClickableLabel(this.openLabel).atIndex(0);
    }
    InfoLabel() {
        return match.accessible.TextLabel(this.screenText.Info).atIndex(0);
    }
    /**
     * @override so we access the header by label
     */
    Header() {
        return match.accessible.TextLabel(this.screenText.Header).atIndex(0);
    }
    _parts(rate) {
        return String(rate).split('.');
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
        let expectedParts = this._parts(rate.expected.unitsPerHour);

        if (rate.current) {
            let currentParts = this._parts(rate.current.unitsPerHour);
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
    async Open() {
        await super.Open();
        return this;
    }
}

module.exports = BasalRatesScreen;
