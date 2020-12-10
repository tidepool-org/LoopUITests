const match = require("../match");
const base = require("../base/index");

class ActiveCarbohydratesScreen extends base.Screen {
  constructor(language) {
    super({
      screenText: language.screenText,
      generalText: language.generalText,
      header: {
        backLabel: language.generalText.Status,
      },
      open: {
        isBtn: false,
        label: language.screenText.ActiveCarbohydrates,
      },
    });
  }
  //TODO: not accessible
  get Header() {
    return match.Label(this.screenText.Header);
  }
  get GramsActiveCarbsLabel() {
    return match.Label(this.screenText.GramsActiveCarbs);
  }
  get GramsTotalCarbsLabel() {
    return match.Label(this.screenText.GramsTotalCarbs);
  }
  get GlucoseChangeLabel() {
    return match.Label(this.screenText.GlucoseChange);
  }
  get ObservedLabel() {
    return match.Label(this.screenText.Observed);
  }
  get PredictedLabel() {
    return match.Label(this.screenText.Predicted);
  }
}

var _screenTests = function ({ app }) {
  describe("Active Carbohydrates Chart", () => {
    let screen;
    var openScreen = async function () {
      let statusScreen = await app.OpenStatusScreen();
      screen = await statusScreen.OpenActiveCarbohydratesChart();
      return screen;
    };
    base.screenTests({
      openScreenFunc: openScreen,
      skipClose: true,
    });
    describe("custom", () => {
      it("has a Grams Active Carbs Label", async () => {
        await expect(screen.GramsActiveCarbsLabel).toBeVisible();
      });
      it("has a Grams Total Carbs Label", async () => {
        await expect(screen.GramsTotalCarbsLabel).toBeVisible();
      });
      it("has an Glucose Change Label", async () => {
        await expect(screen.GlucoseChangeLabel).toBeVisible();
      });
      it("has a Observed Label", async () => {
        await expect(screen.ObservedLabel).toBeVisible();
      });
      it("has a Predicted Label", async () => {
        await expect(screen.PredictedLabel).toBeVisible();
      });
    });
    it("can close", async () => {
      await screen.BackButton.tap();
    });
  });
};
module.exports = {
  Screen: ActiveCarbohydratesScreen,
  tests: _screenTests,
};
