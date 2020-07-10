const action = require('../action');
const match = require('../match');
const { base } = require('../base/index');

class DeliveryLimitsScreen extends base.EntryScreen {
    constructor(language, config) {
        super({
            screenText: language.settingsScreen.DeliveryLimitsScreen,
            generalText: language.general,
            openLabel: language.settingsScreen.SuspendThresholdScreen.Header,
            backLabel: language.general.Cancel,
        });
        this.config = config;
    }
    /**
     * @override so we access the correct CancelButton
     */
    CancelButton() {
        return match.accessible.ButtonBarButton(this.generalText.Cancel);
    }
    /**
     * @override so we access the header by label
     */
    Header() {
        return match.accessible.Label(this.screenText.Header).atIndex(0);
    }
    _limitParts(limitAmount) {
        return String(limitAmount).split('.');
    }
    async _set(expected, current) {
        //TODO: need to sort out interaction with app
        // await action.ScrollQuantityPicker(
        //     current[0],
        //     expected[0],
        //     { pickerID: 'quantity_picker', useItemID: true, smallStep: true }
        // );
    }
    MaxBasalRateLabel() {
        return match.accessible.Label(this.screenText.MaxBasalRate);
    }
    MaxBasalRateInfo() {
        return match.accessible.Label(this.screenText.MaxBasalRateInfo);
    }
    MaxBolusLabel() {
        return match.accessible.Label(this.screenText.MaxBolus);
    }
    MaxBolusInfo() {
        return match.accessible.Label(this.screenText.MaxBolusInfo);
    }
    async OpenBasalRatePicker() {
        await this.MaxBasalRateLabel().tap();
    }
    async OpenBolusPicker() {
        await this.MaxBolusLabel().tap();
    }
    /**
     * @param {Object} limits
     * @param {Object} limits.basal
     * @param {String} limits.basal.expected.rate
     * @param {String} limits.basal.current.rate optional
     * @param {Object} limits.bolus
     * @param {String} limits.bolus.expected.amount
     * @param {String} limits.bolus.current.amount optional
     */
    async ApplyOne(limits) {
        if (limits.basal) {
            let currentParts = [this.config.basalRate.startWhole];
            if (limits.basal.current) {
                currentParts = this._limitParts(limits.basal.current.rate);
            }
            let expectedParts = this._limitParts(limits.basal.expected.rate);
            await this._set(expectedParts, currentParts);
        }
        if (limits.bolus) {
            let currentParts = [this.config.bolus.startWhole];
            if (limits.bolus.current) {
                currentParts = this._limitParts(limits.bolus.current.amount);
            }
            let expectedParts = this._limitParts(limits.bolus.expected.amount);
            await this._set(expectedParts, currentParts);
        }
    }
}

module.exports = {
    DeliveryLimitsScreen
};
