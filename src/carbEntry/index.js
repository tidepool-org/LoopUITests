const match = require('../match');
const base = require('../base/index');
const Bolus = require('../bolus/index');
const MealBolusScreen = require('./mealBolusScreen');

class CarbEntryScreen extends base.Screen {
  constructor(language) {
    super({
      screenText: language.screenText,
      generalText: language.generalText,
      header: {
        backLabel: language.generalText.Cancel,
      },
      open: {
        isBtn: true,
        label: language.screenText.AddMeal,
      },
    });
    this._mealBolusScreen = new MealBolusScreen({ general: language.generalText, screen: language.screenText });
  }

  get AmountConsumedLabel() {
    return match.accessible.TextLabel(this.screenText.AmountConsumed);
  }

  get TimeLabel() {
    return match.accessible.ClickableLabel(this.screenText.Time);
  }

  get FoodTypeLabel() {
    return match.accessible.ClickableLabel(this.screenText.FoodType);
  }

  get AbsorptionTimeLabel() {
    return match.accessible.ClickableLabel(this.screenText.AbsorptionTime);
  }

  get ContinueMainButton() {
    return match.accessible.Button(this.generalText.Continue).atIndex(2);
  }

  get AbsorptionTimeMessage() {
    return match.accessible.TextLabel(this.screenText.AbsorptionMessage);
  }

  async ContinueToBolus() {
    await this.ContinueMainButton.tap();
    return this._mealBolusScreen;
  }

  async ExpectAbsorptionTimeMessage() {
    await expect(this.AbsorptionTimeMessage).toExist();
  }

  async SetCarbs(amount) {
    var carbsField = match.UITextField();
    await carbsField.clearText();
    await carbsField.typeText(String(amount));
    await carbsField.tapReturnKey();
  }

  async SetDate(date) {
    var dateField = match.UITextField();
    await dateField.clearText();
    await dateField.typeText(String(date));
    await dateField.tapReturnKey();
  }

  async SetAbsortionTime(hours) {
    var absortionField = match.UITextField();
    await absortionField.clearText();
    await absortionField.typeText(String(hours));
    await absortionField.tapReturnKey();
  }
}

module.exports = {
  CarbEntryScreen,
};
