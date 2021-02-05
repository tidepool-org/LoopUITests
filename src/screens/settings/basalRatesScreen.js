const action = require("../../action");
const match = require("../../match");
const base = require("../base/index");
const _numericPartsFromString = require("./utils").numericPartsFromString;

class BasalRatesScreen extends base.EntriesScreen {
  constructor(language, config) {
    super(
      {
        screenText: language.screenText,
        generalText: language.generalText,
        open: {
          isBtn: false,
          label: language.screenText.Header,
        },
        header: {
          backLabel: language.backLabel,
        },
      },
      config
    );
    this.unitsLabel = language.screenText.Units;
  }
  get NoBasalInsulinGuardrailMessage() {
    return this.GuardrailMessage(
      this.screenText.NoBasalInsulinGuardrailMessage
    );
  }

  /**
   * @param {Object} rate
   * @param {Object} rate.expected
   * @param {String} rate.expected.time
   * @param {number} range.expected.unitsPerHour
   * @param {Object} rate.current optional
   */
  async ApplyOne(rate) {
    const wholePart = 0;
    let expectedParts = _numericPartsFromString(rate.expected.unitsPerHour);
    let currentValue = this.config.startWhole;
    if (rate.current) {
      let currentParts = _numericPartsFromString(rate.current.unitsPerHour);
      currentValue = Number(currentParts[wholePart]);
    }
    await action.ScrollDecimalPicker(
      currentValue,
      Number(expectedParts[wholePart])
    );
  }
  /**
   * @param {Array} rates
   */
  async ApplyAll(rates) {
    await super.ApplyAll(rates, this.ApplyOne);
  }
}

var screenTests = async function (testData) {
  describe("Basal Rates Screen", () => {
    let screen;
    var openScreen = async function () {
      let therapySettingsScreen = testData.app.TherapySettingsScreen;
      screen = await therapySettingsScreen.OpenBasalRateScreen();
      return screen;
    };
    base.entriesTests({
      openScreenFunc: openScreen,
      checkEditing: testData.checkEditing,
    });
  });
};

module.exports = {
  Screen: BasalRatesScreen,
  tests: screenTests,
};
