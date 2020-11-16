const match = require("../match");
const base = require("../base/index");

class ActiveInsulinScreen extends base.Screen {
  constructor(language) {
    super({
      screenText: language.screenText,
      generalText: language.generalText,
      header: {
        backLabel: language.generalText.Status,
      },
      open: {
        isBtn: false,
        label: language.screenText.Header,
      },
    });
  }
  get IOBLabel() {
    return match.accessible.TextLabel(this.screenText.IOB);
  }
  get TotalLabel() {
    return match.accessible.TextLabel(this.screenText.Total);
  }
  get EventHistoryLabel() {
    return match.accessible.TextLabel(this.screenText.EventHistory);
  }
  get ReservoirLabel() {
    return match.accessible.TextLabel(this.screenText.Reservoir);
  }
}

var screenTests = (testData) => {
  describe("Active Insulin Chart", () => {
    let screen;
    it("can open", async () => {
      let statusScreen = await testData.app.OpenStatusScreen();
      screen = await statusScreen.OpenActiveInsulinChart();
    });
    it("has a header", async () => {
      await expect(screen.Header).toBeVisible();
    });
    it("has a IOB Label", async () => {
      await expect(screen.IOBLabel).toBeVisible();
    });
    it("has a Total Label", async () => {
      await expect(screen.TotalLabel).toBeVisible();
    });
    it("has an Event History Label", async () => {
      await expect(screen.EventHistoryLabel).toBeVisible();
    });
    it("has a Reservoir Label", async () => {
      await expect(screen.ReservoirLabel).toBeVisible();
    });
    it("can close", async () => {
      await screen.BackButton.tap();
    });
  });
};

module.exports = {
  Screen: ActiveInsulinScreen,
  tests: screenTests,
};
