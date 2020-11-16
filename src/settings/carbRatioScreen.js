const action = require("../action");
const match = require("../match");
const base = require("../base/index");
const _numericPartsFromString = require("./utils").numericPartsFromString;
const _baseThreapyScreenTests = require("./utils").baseThreapyScreenTests;

class CarbRatioScreen extends base.EntriesScreen {
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
  }
  get OpenButton() {
    return match.accessible.ClickableLabel(this.openLabel).atIndex(0);
  }
  get InfoLabel() {
    return match.accessible.TextLabel(this.screenText.Info).atIndex(0);
  }
  get BackButton() {
    return match.accessible.BackButton(this.backLabel);
  }
  get Header() {
    return match.accessible.TextLabel(this.screenText.Header).atIndex(1);
  }
  get HighCarbRatioGuardrailMessage() {
    return this.GuardrailMessage(this.screenText.HighCarbRatioGuardrailMessage);
  }
  get LowCarbRatioGuardrailMessage() {
    return this.GuardrailMessage(this.screenText.LowCarbRatioGuardrailMessage);
  }
  /**
   * @param {Object} ratio
   * @param {Object} ratio.expected
   * @param {String} ratio.expected.time
   * @param {String} ratio.expected.carbGramsPerInsulinUnit
   * @param {Object} ratio.current optional
   */
  async ApplyOne(ratio) {
    const wholePart = 0;
    let expectedParts = _numericPartsFromString(
      ratio.expected.carbGramsPerInsulinUnit
    );
    let currentValue = this.config.startWhole;
    if (ratio.current) {
      let currentParts = _numericPartsFromString(
        ratio.current.carbGramsPerInsulinUnit
      );
      currentValue = Number(currentParts[wholePart]);
    }
    await action.ScrollDecimalPicker(
      currentValue,
      Number(expectedParts[wholePart])
    );
  }
  /**
   * @param {Array} ratios
   */
  async ApplyAll(ratios) {
    await this.PlusButton.tap();
    for (let index = 0; index < ratios.length; index++) {
      var current;
      let expected = ratios[index];
      if (index > 0) {
        current = ratios[index - 1];
      }
      await this.ApplyOne({ expected, current });
      await this.AddButton.tap();
    }
  }
}

var screenTests = function (testData) {
  describe("Carb Ratio Screen", () => {
    var openScreenFunc = async function () {
      let therapySettingsScreen = testData.app.TherapySettingsScreen;
      let screen = await therapySettingsScreen.OpenCarbRatioScreen();
      return screen;
    };
    _baseThreapyScreenTests(testData, openScreenFunc);
  });
};

module.exports = {
  Screen: CarbRatioScreen,
  tests: screenTests,
};
