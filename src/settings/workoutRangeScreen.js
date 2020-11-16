const match = require("../match");
const base = require("../base/index");
const _baseThreapyScreenTests = require("./utils").baseThreapyScreenTests;

class WorkoutRangeScreen extends base.EntriesScreen {
  constructor(language, config) {
    super(
      {
        screenText: language.settingsScreen.WorkoutRangeScreen,
        generalText: language.general,
        header: {
          backLabel: language.settingsScreen.TherapySettingsScreen.Header,
        },
        open: {
          isBtn: false,
          label: language.settingsScreen.WorkoutRangeScreen.Header,
        },
      },
      config
    );
  }
  get BackButton() {
    return match.accessible.BackButton(this.backLabel);
  }
  get OpenButton() {
    return match.accessible.ClickableLabel(this.openLabel).atIndex(1);
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
    var openScreenFunc = async function () {
      let therapySettingsScreen = testData.app.TherapySettingsScreen;
      let screen = await therapySettingsScreen.OpenWorkoutRangeScreen();
      return screen;
    };
    _baseThreapyScreenTests(testData, openScreenFunc);
  });
};

module.exports = {
  Screen: WorkoutRangeScreen,
  tests: screenTests,
};
