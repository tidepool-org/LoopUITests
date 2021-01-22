const match = require("../match");
const action = require("../action");
const base = require("../base/index");

class GlucoseSafetyLimitScreen extends base.EntryScreen {
  constructor(language, config) {
    super({
      screenText: language.screenText,
      generalText: language.generalText,
      header: {
        backLabel: language.backLabel,
      },
      open: {
        isBtn: false,
        label: language.screenText.Header,
      },
    });
    this.bgUnitsLabel = language.screenText.BGUnits;
    this.config = config;
  }
  get LowGlucoseSafetyLimitGuardrailMessage() {
    return this.GuardrailMessage(
      this.screenText.LowGlucoseSafetyLimitGuardrailMessage
    );
  }
  get HighGlucoseSafetyLimitGuardrailMessage() {
    return this.GuardrailMessage(
      this.screenText.HighGlucoseSafetyLimitGuardrailMessage
    );
  }
  /**
   * @param {object} threshold
   * @param {object} threshold.expected
   * @param {number} threshold.expected.value
   * @param {object} threshold.current optional
   **/
  async ApplyOne(threshold) {
    let currentValue = this.config.start;
    if (threshold.current) {
      currentValue = threshold.current.value;
    }
    await action.ScrollIntegerPicker(currentValue, threshold.expected.value);
  }
}

var screenTests = function (testData) {
  describe("Glucose Safety Limit Screen", () => {
    let screen;
    var openScreen = async function () {
      let therapySettingsScreen = testData.app.TherapySettingsScreen;
      screen = await therapySettingsScreen.OpenGlucoseSafetyLimitScreen();
      return screen;
    };
    base.entryTests({
      openScreenFunc: openScreen,
      checkEditing: testData.checkEditing,
    });
  });
};

module.exports = {
  Screen: GlucoseSafetyLimitScreen,
  tests: screenTests,
};
