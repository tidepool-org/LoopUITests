const action = require("../action");
const match = require("../match");
const base = require("../base/index");

class InsulinSensitivitiesScreen extends base.EntriesScreen {
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
  get LowInsulinSensitivityGuardrailMessage() {
    return this.GuardrailMessage(
      this.screenText.LowInsulinSensitivityGuardrailMessage
    );
  }
  get HighInsulinSensitivityGuardrailMessage() {
    return this.GuardrailMessage(
      this.screenText.HighInsulinSensitivityGuardrailMessage
    );
  }
  /**
   * @param {Object} sensitivity
   * @param {Object} sensitivity.expected
   * @param {String} sensitivity.expected.time
   * @param {String} sensitivity.expected.bgValuePerInsulinUnit
   * @param {Object} sensitivity.current optional
   */
  async ApplyOne(sensitivity) {
    let currentValuePerInsulinUnit = this.config.start;
    if (sensitivity.current) {
      currentValuePerInsulinUnit = sensitivity.current.bgValuePerInsulinUnit;
    }
    await action.ScrollIntegerPicker(
      currentValuePerInsulinUnit,
      sensitivity.expected.bgValuePerInsulinUnit
    );
  }
  /**
   * @param {Array} sensitivities
   */
  async ApplyAll(sensitivities) {
    await this.PlusButton.tap();
    for (let index = 0; index < sensitivities.length; index++) {
      var current;
      let expected = sensitivities[index];
      if (index > 0) {
        current = sensitivities[index - 1];
      }
      await this.ApplyOne({ expected, current });
      await this.AddButton.tap();
    }
  }
}

var screenTests = function (testData) {
  describe("Insulin Sensitivities Screen", () => {
    let screen;
    var openScreen = async function () {
      let therapySettingsScreen = testData.app.TherapySettingsScreen;
      screen = await therapySettingsScreen.OpenInsulinSensitivitiesScreen();
      return screen;
    };
    base.entriesTests({
      openScreenFunc: openScreen,
      checkEditing: testData.checkEditing,
    });
  });
};

module.exports = {
  Screen: InsulinSensitivitiesScreen,
  tests: screenTests,
};
