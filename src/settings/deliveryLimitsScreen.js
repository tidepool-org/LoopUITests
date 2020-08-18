const match = require('../match');
const action = require('../action');
const base = require('../base/index');

class DeliveryLimitsScreen extends base.EntryScreen {
    constructor(language, config) {
        super({
            screenText: language.settingsScreen.DeliveryLimitsScreen,
            generalText: language.general,
            open: {
                isBtn: false,
                label: language.settingsScreen.DeliveryLimitsScreen.Header,
            },
            header: {
                backLabel: language.general.Cancel,
            },
        });
        this.config = config;
    }
    OpenButton() {
        return match.accessible.ClickableLabel(this.openLabel).atIndex(1);
    }
    /**
     * @override so we access the header by label
     */
    Header() {
        return match.accessible.TextLabel(this.screenText.Header).atIndex(0);
    }
    _limitParts(limitAmount) {
        return String(limitAmount).split('.');
    }
    async _set(expected, current, id) {
        await action.ScrollQuantityPicker(
            current[0],
            expected[0],
            { pickerID: id, useItemID: true, smallStep: false }
        );
    }
    MaxBasalRateLabel() {
        return match.accessible.TextLabel(this.screenText.MaxBasalRate);
    }
    MaxBasalRateInfo() {
        return match.accessible.TextLabel(this.screenText.MaxBasalRateInfo);
    }
    MaxBolusLabel() {
        return match.accessible.TextLabel(this.screenText.MaxBolus);
    }
    MaxBolusInfo() {
        return match.accessible.TextLabel(this.screenText.MaxBolusInfo);
    }
    async Open() {
        await super.Open();
        return this;
    }
    async OpenBasalRatePicker() {
        await this.MaxBasalRateLabel().tap();
    }
    async OpenBolusPicker() {
        await this.MaxBolusLabel().tap();
    }
    /**
     * @param {Object} bolus
     * @param {String} bolus.expected.amount
     * @param {String} bolus.current.amount optional
     */
    async ApplyBolus(bolus) {
        let currentParts = [this.config.bolus.startWhole];
        if (bolus.current) {
            currentParts = this._limitParts(bolus.current.amount);
        }
        let expectedParts = this._limitParts(bolus.expected.amount);
        await this._set(expectedParts, currentParts, 'max_bolus_picker');
    }
    /**
     * @param {Object} basal
     * @param {String} basal.expected.rate
     * @param {String} basal.current.rate optional
     */
    async ApplyBasal(basal) {
        let currentParts = [this.config.basalRate.startWhole];
        if (basal.current) {
            currentParts = this._limitParts(basal.current.rate);
        }
        let expectedParts = this._limitParts(basal.expected.rate);
        await this._set(expectedParts, currentParts, 'max_basal_picker');
    }
}

module.exports = DeliveryLimitsScreen;
