const match = require("../match");
const base = require("../base/index");

class InsulinModelScreen extends base.EntryScreen {
  constructor(language) {
    super({
      screenText: language.screenText,
      generalText: language.generalText,
      header: {
        backLabel: language.generalText.Back,
      },
      open: {
        isBtn: false,
        label: language.screenText.Header,
      },
    });
  }
  // get InfoLabel() {
  //   return match.accessible.TextLabel(this.screenText.Info);
  // }
  // get OpenButton() {
  //   return match.accessible.ClickableLabel(this.openLabel);
  // }
  // /**
  //  * @override so we access the header by label
  //  */
  // get Header() {
  //   return match.accessible.TextLabel(this.screenText.Header).atIndex(0);
  // }
  async Apply(model) {
    if (model) {
      await match.accessible.ClickableLabel(model).tap();
    }
  }
}

var screenTests = function (testData) {
  describe("Insulin Model Screen", () => {
    let screen;
    var openScreen = async function () {
      let therapySettingsScreen = testData.app.TherapySettingsScreen;
      screen = await therapySettingsScreen.OpenInsulinModelScreen();
      return screen;
    };
    base.entryTests({
      openScreenFunc: openScreen,
      checkEditing: testData.checkEditing,
    });
  });
};

module.exports = {
  Screen: InsulinModelScreen,
  tests: screenTests,
};
