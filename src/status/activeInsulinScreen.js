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
  //TODO: not accessible
  get Header() {
    return match.Label(this.screenText.Header);
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

var _screenTests = function ({ app }) {
  describe("Active Insulin Chart", () => {
    let screen;
    var openScreen = async function () {
      let statusScreen = await app.OpenStatusScreen();
      screen = await statusScreen.OpenActiveInsulinChart();
      return screen;
    };
    base.screenTests({
      openScreenFunc: openScreen,
      skipClose: true,
    });
    describe("custom", () => {
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
    });
    it("can close", async () => {
      await screen.BackButton.tap();
    });
  });
};

module.exports = {
  Screen: ActiveInsulinScreen,
  tests: _screenTests,
};
