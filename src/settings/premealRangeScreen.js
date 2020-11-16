const match = require("../match");
const base = require("../base/index");
const _baseThreapyScreenTests = require("./utils").baseThreapyScreenTests;

class PremealRangeScreen extends base.EntriesScreen {
  constructor(language, config) {
    super(
      {
        screenText: language.settingsScreen.PremealRangeScreen,
        generalText: language.general,
        header: {
          backLabel: language.settingsScreen.TherapySettingsScreen.Header,
        },
        open: {
          isBtn: false,
          label: language.settingsScreen.PremealRangeScreen.Header,
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
  describe("Premeal Range Screen", () => {
    var openScreenFunc = async function () {
      let therapySettingsScreen = testData.app.TherapySettingsScreen;
      let screen = await therapySettingsScreen.OpenPreMealRangeScreen();
      return screen;
    };
    _baseThreapyScreenTests(testData, openScreenFunc);
  });
};

module.exports = {
  Screen: PremealRangeScreen,
  tests: screenTests,
};
