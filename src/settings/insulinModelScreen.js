const match = require('../match');
const base = require('../base/index');
const _baseThreapyScreenTests = require("./utils").baseThreapyScreenTests;

class InsulinModelScreen extends base.Screen {
    constructor(language) {
        super({
            screenText: language.settingsScreen.InsulinModelScreen,
            generalText: language.general,
            header: {
                backLabel: language.general.Back,
            },
            open: {
                isBtn: false,
                label: language.settingsScreen.InsulinModelScreen.Header,
            },
        });
    }
    get InfoLabel() {
        return match.accessible.TextLabel(this.screenText.Info);
    }
    get OpenButton() {
        return match.accessible.ClickableLabel(this.openLabel).atIndex(1);
    }
    async Apply(model) {
        if (model) {
            await match.accessible.ClickableLabel(model).tap();
        }
    }
}

var screenTests = function (testData) {
    describe("Insulin Model Screen", () => {
      var openScreenFunc = async function () {
        let therapySettingsScreen = testData.app.TherapySettingsScreen;
        let screen = await therapySettingsScreen.OpenInsulinModelScreen();
        return screen;
      };
      _baseThreapyScreenTests(testData, openScreenFunc);
    });
  };
  
  module.exports = {
    Screen: InsulinModelScreen,
    tests: screenTests,
  };
  
