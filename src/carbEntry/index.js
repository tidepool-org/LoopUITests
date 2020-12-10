const match = require("../match");
const base = require("../base/index");
const Bolus = require("../bolus/index");

const _testHasAPrefex = "has a";

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
    //this._mealBolusScreen = new MealBolusScreen(language);
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
    //return this._mealBolusScreen;
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

var screenTests = (app) => {
  describe("Carb Entry Screen", () => {
    let screen;
    let inClosedLoopMode;
    it("can open", async () => {
      screen = await app.OpenBolusScreen();
      inClosedLoopMode = await app.inClosedLoopMode;
    });
    it(`${_testHasAPrefex} Back Button`, async () => {
      await expect(screen.BackButton).toBeVisible();
    });
    it(`${_testHasAPrefex} Amount Consumed Label`, async () => {
      await expect(screen.AmountConsumedLabel).toBeVisible();
    });
    it(`${_testHasAPrefex} Time Label`, async () => {
      await expect(screen.TimeLabel).toBeVisible();
    });
    it(`${_testHasAPrefex} Food Type Label`, async () => {
      await expect(screen.FoodTypeLabel).toBeVisible();
    });
    it(`${_testHasAPrefex} Absorption Time Label`, async () => {
      await expect(screen.AbsorptionTimeLabel).toBeVisible();
    });
    if (!inClosedLoopMode) {
      describe("when in open loop mode", () => {
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
      });
    }
  });
};

module.exports = {
  CarbEntryScreen: CarbEntryScreen,
  screenTests: screenTests,
};
