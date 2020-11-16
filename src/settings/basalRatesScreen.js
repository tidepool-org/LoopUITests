const action = require("../action");
const match = require("../match");
const base = require("../base/index");
const _numericPartsFromString = require("./utils").numericPartsFromString;
const _baseThreapyScreenTests = require("./utils").baseThreapyScreenTests;

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
  /**
   * @override
   */
  get BackButton() {
    return match.accessible.BackButton(this.backLabel);
  }
  get OpenButton() {
    return match.accessible.ClickableLabel(this.openLabel).atIndex(0);
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

var screenTests = function (testData) {
  describe("Basal Rates Screen", () => {
    var openScreenFunc = async function () {
      let therapySettingsScreen = testData.app.TherapySettingsScreen;
      screen = await therapySettingsScreen.OpenBasalRateScreen();
      return screen;
    };
    _baseThreapyScreenTests(testData, openScreenFunc);
  });
};

module.exports = {
  Screen: BasalRatesScreen,
  tests: screenTests,
};
