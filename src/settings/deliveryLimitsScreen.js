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
                backLabel: language.settingsScreen.TherapySettingsScreen.Header,
            },
        });
        this.config = config;
    }
    BackButton() {
        return match.accessible.BackButton(this.backLabel);
    }
    OpenButton() {
        return match.accessible.ClickableLabel(this.openLabel).atIndex(1);
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
    _limitParts(limitAmount) {
        return String(limitAmount).split('.');
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
    LowMaxBasalRateGuardrailMessage() {
        return this.GuardrailMessage(this.screenText.LowMaxBasalRateGuardrailMessage);
    }
    HighMaxBasalRateGuardrailMessage() {
        return this.GuardrailMessage(this.screenText.HighMaxBasalRateGuardrailMessage);
    }
    LowBolusAmountGuardrailMessage() {
        return this.GuardrailMessage(this.screenText.LowBolusAmountGuardrailMessage);
    }
    HighBolusAmountGuardrailMessage() {
        return this.GuardrailMessage(this.screenText.HighBolusAmountGuardrailMessage);
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
        await action.ScrollDecimalPicker(
            currentParts[0],
            expectedParts[0],
        );
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
        await action.ScrollDecimalPicker(
            currentParts[0],
            expectedParts[0],
        );
    }
}

module.exports = DeliveryLimitsScreen;
