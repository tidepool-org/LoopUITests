const match = require('../match');
const action = require('../action');
const base = require('../base/index');
const { numericPartsFromString } = require('./utils');

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
    get BackButton() {
        return match.accessible.BackButton(this.backLabel);
    }
    get OpenButton() {
        return match.accessible.ClickableLabel(this.openLabel).atIndex(1);
    }
    get InfoLabel() {
        return match.accessible.TextLabel(this.screenText.Info).atIndex(0);
    }
    /**
     * @override so we access the header by label
     */
    get Header() {
        return match.accessible.TextLabel(this.screenText.Header).atIndex(0);
    }
    get MaxBasalRateLabel() {
        return match.accessible.TextLabel(this.screenText.MaxBasalRate);
    }
    get MaxBasalRateInfo() {
        return match.accessible.TextLabel(this.screenText.MaxBasalRateInfo);
    }
    get MaxBolusLabel() {
        return match.accessible.TextLabel(this.screenText.MaxBolus);
    }
    get MaxBolusInfo() {
        return match.accessible.TextLabel(this.screenText.MaxBolusInfo);
    }
    get LowMaxBasalRateGuardrailMessage() {
        return this.GuardrailMessage(this.screenText.LowMaxBasalRateGuardrailMessage);
    }
    get HighMaxBasalRateGuardrailMessage() {
        return this.GuardrailMessage(this.screenText.HighMaxBasalRateGuardrailMessage);
    }
    get LowBolusAmountGuardrailMessage() {
        return this.GuardrailMessage(this.screenText.LowBolusAmountGuardrailMessage);
    }
    get HighBolusAmountGuardrailMessage() {
        return this.GuardrailMessage(this.screenText.HighBolusAmountGuardrailMessage);
    }
    async Open() {
        await super.Open();
        return this;
    }
    async OpenBasalRatePicker() {
        await this.MaxBasalRateLabel.tap();
    }
    async OpenBolusPicker() {
        await this.MaxBolusLabel.tap();
    }
    /**
     * @param {Object} bolus
     * @param {String} bolus.expected.amount
     * @param {String} bolus.current.amount optional
     */
    async ApplyBolus(bolus) {
        let currentParts = [this.config.bolus.startWhole];
        if (bolus.current) {
            currentParts = numericPartsFromString(bolus.current.amount);
        }
        let expectedParts = numericPartsFromString(bolus.expected.amount);
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
            currentParts = numericPartsFromString(basal.current.rate);
        }
        let expectedParts = numericPartsFromString(basal.expected.rate);
        await action.ScrollDecimalPicker(
            currentParts[0],
            expectedParts[0],
        );
    }
}

module.exports = DeliveryLimitsScreen;
