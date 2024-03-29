const match = require('../match');
const action = require('../action');
const base = require('../base/index');
const _numericPartsFromString = require('./utils').numericPartsFromString;

class DeliveryLimitsScreen extends base.EntryScreen {
  constructor(language, config) {
    super({
      screenText: language.screenText,
      generalText: language.generalText,
      open: {
        isBtn: false,
        label: language.screenText.Header,
      },
      header: {
        backLabel: language.backLabel,
      },
    });
    this.config = config;
  }

  get MaxBasalRateLabel() {
    return match.Label(this.screenText.MaxBasalRate);
  }

  get MaxBasalRateInfo() {
    return match.Label(this.screenText.MaxBasalRateInfo);
  }

  get MaxBolusLabel() {
    return match.Label(this.screenText.MaxBolus);
  }

  get MaxBolusInfo() {
    return match.Label(this.screenText.MaxBolusInfo);
  }

  get LowMaxBasalRateGuardrailMessage() {
    return this.GuardrailMessage(
      this.screenText.LowMaxBasalRateGuardrailMessage,
    );
  }

  get HighMaxBasalRateGuardrailMessage() {
    return this.GuardrailMessage(
      this.screenText.HighMaxBasalRateGuardrailMessage,
    );
  }

  get LowBolusAmountGuardrailMessage() {
    return this.GuardrailMessage(
      this.screenText.LowBolusAmountGuardrailMessage,
    );
  }

  get HighBolusAmountGuardrailMessage() {
    return this.GuardrailMessage(
      this.screenText.HighBolusAmountGuardrailMessage,
    );
  }

  async OpenBasalRatePicker() {
    await this.MaxBasalRateLabel.tap({ x: 20, y: 20 });
  }

  async OpenBolusPicker() {
    await this.MaxBolusLabel.tap({ x: 20, y: 20 });
  }

  /**
   * @param {Object} bolus
   * @param {String} bolus.expected.amount
   * @param {String} bolus.current.amount optional
   */
  async ApplyBolus(bolus) {
    let currentParts = [this.config.bolus.startWhole];
    if (bolus.current) {
      currentParts = _numericPartsFromString(bolus.current.amount);
    }
    let expectedParts = _numericPartsFromString(bolus.expected.amount);
    await action.ScrollDecimalPicker(currentParts[0], expectedParts[0]);
  }

  /**
   * @param {Object} basal
   * @param {String} basal.expected.rate
   * @param {String} basal.current.rate optional
   */
  async ApplyBasal(basal) {
    let currentParts = [this.config.basalRate.startWhole];
    if (basal.current) {
      currentParts = _numericPartsFromString(basal.current.rate);
    }
    let expectedParts = _numericPartsFromString(basal.expected.rate);
    await action.ScrollDecimalPicker(currentParts[0], expectedParts[0]);
  }
}

module.exports = {
  Screen: DeliveryLimitsScreen,
};
