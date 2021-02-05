const action = require("../../action");
const match = require("../../match");
const base = require("../base/index");

class CorrectionRangeScreen extends base.EntriesScreen {
  constructor(language, config) {
    super(
      {
        screenText: language.screenText,
        generalText: language.generalText,
        header: {
          backLabel: language.backLabel,
        },
        open: {
          isBtn: false,
          label: language.screenText.Header,
        },
      },
      config
    );
  }
  get LowCorrectionValueGuardrailMessage() {
    return this.GuardrailMessage(
      this.screenText.LowCorrectionValueGuardrailMessage
    );
  }
  get HighCorrectionValueGuardrailMessage() {
    return this.GuardrailMessage(
      this.screenText.HighCorrectionValueGuardrailMessage
    );
  }
  /**
   * @param {Object} range
   * @param {Object} range.expected
   * @param {String} range.expected.time
   * @param {String} range.expected.max
   * @param {String} range.expected.min
   * @param {Object} range.current optional
   */
  async ApplyOne(range) {
    let currentMax = this.config.maxStart;
    let currentMin = this.config.minStart;

    if (range.current) {
      currentMax = range.current.max;
      currentMin = range.current.min;
    }
    await action.ScrollMaxMinPicker(currentMax, range.expected.max, false);
    await action.ScrollMaxMinPicker(currentMin, range.expected.min, true);
  }
  /**
   * @param {Array} ranges
   */
  async ApplyAll(ranges) {
    await this.PlusButton.tap();
    for (let index = 0; index < ranges.length; index++) {
      var current;
      let expected = ranges[index];
      if (index > 0) {
        current = ranges[index - 1];
      }
      await this.ApplyOne({ expected, current });
      await this.AddButton.tap();
    }
  }
  async SetPickerTime(value) {
    await match.accessible.PickerLabel(value).atIndex(1).tap();
  }
}

var screenTests = function (testData) {
  describe("Correction Range Screen", () => {
    let screen;
    var openScreen = async function () {
      let therapySettingsScreen = testData.app.TherapySettingsScreen;
      screen = await therapySettingsScreen.OpenCorrectionRangeScreen();
      return screen;
    };
    base.entriesTests({
      openScreenFunc: openScreen,
      checkEditing: testData.checkEditing,
    });
  });
};

module.exports = {
  Screen: CorrectionRangeScreen,
  tests: screenTests,
};
