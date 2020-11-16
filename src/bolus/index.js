const match = require("../match");
const base = require("../base/index");
const _testHasAPrefex = "has a";

class _baseBolusScreen extends base.Screen {
  constructor(language) {
    super({
      screenText: language.screenText,
      generalText: language.generalText,
      header: {
        backLabel: language.generalText.Cancel,
      },
      open: {
        isBtn: true,
        label: language.screenText.Header,
      },
    });
  }
  get DoneButton() {
    return match.accessible.Button(this.generalText.Done).atIndex(0);
  }
  get DeliverButton() {
    return match.accessible.Button(this.screenText.Deliver);
  }
  get EnterBolusButton() {
    return match.accessible.Button(this.screenText.EnterBolus);
  }
  get BolusLabel() {
    return match.accessible.TextLabel(this.screenText.Header);
  }
  get BolusUnits() {
    return match.accessible.TextLabel(this.screenText.Unit).atIndex(0);
  }
  get RecommendedLabel() {
    return match.accessible.TextLabel(this.screenText.Recommended);
  }
  get RecommendedBolusLabel() {
    return match.accessible.TextLabel(this.screenText.RecommendedBolus);
  }
  get RecommendedBolusUnits() {
    return match.accessible.TextLabel(this.screenText.Unit).atIndex(1);
  }

  get ActiveCarbsLabel() {
    return match.accessible.TextLabel(this.screenText.ActiveCarbs);
  }
  get BolusSummaryHeader() {
    return match.accessible.TextLabel(this.screenText.BolusSummary);
  }
  get GlucoseHeader() {
    return match.accessible.TextLabel(this.screenText.Glucose).atIndex(1);
  }
  async Deliver() {
    await this.DoneButton.tap();
    await this.DeliverButton.longPress();
  }
  async EnterBolus() {
    await this.EnterBolusButton.tapReturnKey();
  }
  async SetBolusAmount(units) {
    var bolusAmountField = match.UITextField();
    await bolusAmountField.clearText();
    await bolusAmountField.typeText(String(units));
    await bolusAmountField.tapReturnKey();
  }
}

class BolusScreen extends base.Screen {
  constructor(language) {
    super({
      screenText: language.screenText,
      generalText: language.generalText,
      header: {
        backLabel: language.generalText.Cancel,
      },
      open: {
        isBtn: true,
        label: language.screenText.Header,
      },
    });
  }
  get DoneButton() {
    return match.accessible.Button(this.generalText.Done).atIndex(0);
  }
  get DeliverButton() {
    return match.accessible.Button(this.screenText.Deliver);
  }
  get EnterBolusButton() {
    return match.accessible.Button(this.screenText.EnterBolus);
  }
  get BolusLabel() {
    return match.accessible.TextLabel(this.screenText.Header);
  }
  get BolusUnits() {
    return match.accessible.TextLabel(this.screenText.Unit).atIndex(0);
  }
  get RecommendedLabel() {
    return match.accessible.TextLabel(this.screenText.Recommended);
  }
  get RecommendedBolusLabel() {
    return match.accessible.TextLabel(this.screenText.RecommendedBolus);
  }
  get RecommendedBolusUnits() {
    return match.accessible.TextLabel(this.screenText.Unit).atIndex(1);
  }
  get ActiveCarbsLabel() {
    return match.accessible.TextLabel(this.screenText.ActiveCarbs);
  }
  get BolusSummaryHeader() {
    return match.accessible.TextLabel(this.screenText.BolusSummary);
  }
  get GlucoseHeader() {
    return match.accessible.TextLabel(this.screenText.Glucose).atIndex(1);
  }
  async Deliver() {
    await this.DoneButton.tap();
    await this.DeliverButton.longPress();
  }
  async EnterBolus() {
    await this.EnterBolusButton.tapReturnKey();
  }
  async SetBolusAmount(units) {
    var bolusAmountField = match.UITextField();
    await bolusAmountField.clearText();
    await bolusAmountField.typeText(String(units));
    await bolusAmountField.tapReturnKey();
  }
}

class SimpleBolusCalculatorScreen extends base.Screen {
  constructor(language) {
    super({
      generalText: language.generalText,
      screenText: language.screenText,
      header: {
        backLabel: language.generalText.Cancel,
      },
      open: {
        isBtn: true,
        label: language.screenText.Bolus,
      },
    });
  }
  get EnterBolusButton() {
    return match.accessible.Button(this.screenText.EnterBolus);
  }
  get DeliverButton() {
    return match.accessible.Button(this.screenText.Deliver);
  }
  get OpenLoopInfoLabel() {
    return match.accessible.TextLabel(this.screenText.Info);
  }
  get OpenLoopInfoButton() {
    return match.accessible.Button(this.generalText.ButtonLabel.InfoCircle);
  }
  get CurrentGlucoseLabel() {
    return match.accessible.TextLabel(this.screenText.CurrentGlucose);
  }
  get CurrentGlucoseUnitsLabel() {
    return match.accessible.TextLabel(this.generalText.GlucoseUnitLabel);
  }
  get RecommendedBolusLabel() {
    return match.accessible.TextLabel(this.screenText.RecommendedBolus);
  }
  get RecommendedBolusUnitsLabel() {
    return match.accessible
      .TextLabel(this.generalText.InsulinUnitLabel)
      .atIndex(0);
  }
  get BolusLabel() {
    return match.accessible.TextLabel(this.screenText.Bolus);
  }
  get BolusUnitsLabel() {
    return match.accessible
      .TextLabel(this.generalText.InsulinUnitLabel)
      .atIndex(1);
  }
}

class SimpleMealBolusCalculatorScreen extends SimpleBolusCalculatorScreen {
  constructor(language) {
    super({
      generalText: language.generalText,
      screenText: language.screenText,
      header: {
        backLabel: language.generalText.Cancel,
      },
      open: {
        isBtn: true,
        label: "Add Meal",
      },
    });
  }
  get CarbohydratesLabel() {
    return match.accessible.TextLabel(this.screenText.Carbohydrates);
  }
  get CarbohydratesUnitsLabel() {
    return match.accessible.TextLabel(this.generalText.CarbohydratesUnitLabel);
  }
}

var screenTests = (testData) => {
  describe(testData.name, () => {
    let screen;
    let inClosedLoopMode;
    it("can open", async () => {
      if (testData.bolusForMeal) {
        screen = await testData.app.OpenCarbEntryScreen();
      } else {
        screen = await testData.app.OpenBolusScreen();
      }
      inClosedLoopMode = await testData.app.inClosedLoopMode;
      if (testData.closedLoop != inClosedLoopMode) {
        return new Error(
          `assumption is we are in closed loop is: ${closedLoop} `
        );
      }
    });
    if (!inClosedLoopMode) {
      it(`${_testHasAPrefex} Back Button`, async () => {
        await expect(screen.BackButton).toBeVisible();
      });
      it(`${_testHasAPrefex} Recommended Bolus Label`, async () => {
        await expect(screen.RecommendedBolusLabel).toBeVisible();
      });
      it(`${_testHasAPrefex} Recommended Bolus Units Label`, async () => {
        await expect(screen.RecommendedBolusUnitsLabel).toBeVisible();
      });
      it(`${_testHasAPrefex} Bolus Label`, async () => {
        await expect(screen.BolusLabel).toBeVisible();
      });
      it(`${_testHasAPrefex} Bolus Units Label`, async () => {
        await expect(screen.BolusUnitsLabel).toBeVisible();
      });
      it(`${_testHasAPrefex} Open Loop Info Label`, async () => {
        await expect(screen.OpenLoopInfoLabel).toBeVisible();
      });
      it(`${_testHasAPrefex} Open Loop Info Button`, async () => {
        await expect(screen.OpenLoopInfoButton).toBeVisible();
      });
      it(`${_testHasAPrefex} Current Glucose Label`, async () => {
        await expect(screen.CurrentGlucoseLabel).toBeVisible();
      });
      it(`${_testHasAPrefex} Current Glucose Units Label`, async () => {
        await expect(screen.CurrentGlucoseUnitsLabel).toBeVisible();
      });
      if (testData.bolusForMeal) {
        it(`${_testHasAPrefex} Carbohydrates Label`, async () => {
          await expect(screen.CarbohydratesLabel).toBeVisible();
        });
        it(`${_testHasAPrefex} Carbohydrates Units Label`, async () => {
          await expect(screen.CarbohydratesUnitsLabel).toBeVisible();
        });
      }
    }
    it("close", async () => {
      await screen.BackButton.tap();
    });
  });
};

module.exports = {
  SimpleBolusCalculatorScreen: SimpleBolusCalculatorScreen,
  SimpleMealBolusCalculatorScreen: SimpleMealBolusCalculatorScreen,
  BolusScreen: BolusScreen,
  tests: screenTests,
};
