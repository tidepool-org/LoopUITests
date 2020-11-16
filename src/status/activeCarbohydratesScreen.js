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
  get OpenButton() {
    return match.accessible.TextLabel(this.screenText.ActiveCarbohydrates);
  }
  get GramsActiveCarbsLabel() {
    return match.accessible.TextLabel(this.screenText.GramsActiveCarbs);
  }
  get GramsTotalCarbsLabel() {
    return match.accessible.TextLabel(this.screenText.GramsTotalCarbs);
  }
  get GlucoseChangeLabel() {
    return match.accessible.TextLabel(this.screenText.GlucoseChange);
  }
  get ObservedLabel() {
    return match.accessible.TextLabel(this.screenText.Observed);
  }
  get PredictedLabel() {
    return match.accessible.TextLabel(this.screenText.Predicted);
  }
}
var screenTests = (testData) => {
  describe("Active Carbohydrates Chart", () => {
    let screen;
    it("can open", async () => {
      let statusScreen = await testData.app.OpenStatusScreen();
      screen = await statusScreen.OpenActiveCarbohydratesChart();
    });
    it("has a header", async () => {
      await expect(screen.Header).toBeVisible();
    });
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
    it("close", async () => {
      await screen.BackButton.tap();
    });
  });
};
module.exports = {
  Screen: ActiveCarbohydratesScreen,
  tests: screenTests,
};
