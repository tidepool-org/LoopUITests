const match = require("../../match");
const base = require("../base/index");

class PremealRangeScreen extends base.EntriesScreen {
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
}

var screenTests = function (testData) {
  describe("Premeal Range Screen", () => {
    let screen;
    var openScreen = async function () {
      let therapySettingsScreen = testData.app.TherapySettingsScreen;
      screen = await therapySettingsScreen.OpenPreMealRangeScreen();
      return screen;
    };
    base.entriesTests({
      openScreenFunc: openScreen,
      checkEditing: testData.checkEditing,
    });
  });
};

module.exports = {
  Screen: PremealRangeScreen,
  tests: screenTests,
};
