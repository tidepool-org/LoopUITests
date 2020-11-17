const match = require("../match");
const base = require("../base/index");
const _baseThreapyScreenTests = require("./utils").baseThreapyScreenTests;

class WorkoutRangeScreen extends base.EntriesScreen {
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
  get BackButton() {
    return match.accessible.BackButton(this.backLabel);
  }
  get OpenButton() {
    return match.accessible.ClickableLabel(this.openLabel);
  }
  get InfoLabel() {
    return match.accessible.TextLabel(this.screenText.Info);
  }
  /**
   * @override so we access the header by label
   */
  get Header() {
    return match.accessible.TextLabel(this.screenText.Header);
  }
}
var screenTests = function (testData) {
  describe("Workout Range Screen", () => {
    let screen;
    var openScreen = async function () {
      let therapySettingsScreen = testData.app.TherapySettingsScreen;
      screen = await therapySettingsScreen.OpenWorkoutRangeScreen();
      return screen;
    };
    _baseThreapyScreenTests({
      openScreenFunc: openScreen,
      checkEditing: testData.checkEditing,
      checkInfo: testData.checkInfo,
    });
  });
};

module.exports = {
  Screen: WorkoutRangeScreen,
  tests: screenTests,
};
