const match = require("../match");
const action = require("../action");
const base = require("../base/index");

class SuspendThresholdScreen extends base.EntryScreen {
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
  get LowSuspendThresholdGuardrailMessage() {
    return this.GuardrailMessage(
      this.screenText.LowSuspendThresholdGuardrailMessage
    );
  }
  get HighSuspendThresholdGuardrailMessage() {
    return this.GuardrailMessage(
      this.screenText.HighSuspendThresholdGuardrailMessage
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
  describe("Suspend Threshold Screen", () => {
    let screen;
    var openScreen = async function () {
      let therapySettingsScreen = testData.app.TherapySettingsScreen;
      screen = await therapySettingsScreen.OpenSuspendThresholdScreen();
      return screen;
    };
    base.entryTests({
      openScreenFunc: openScreen,
      checkEditing: testData.checkEditing,
    });
  });
};

module.exports = {
  Screen: SuspendThresholdScreen,
  tests: screenTests,
};
