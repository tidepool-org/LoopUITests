const match = require('../match');
const base = require('../base/index');

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
    await this.DeliverButton.tap({ x: 20, y: 20 });
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
        label: 'Add Meal',
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

module.exports = {
  SimpleBolusCalculatorScreen,
  SimpleMealBolusCalculatorScreen,
  BolusScreen,
};
