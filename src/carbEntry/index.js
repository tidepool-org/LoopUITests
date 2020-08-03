const match = require('../match');

const { base } = require('../base/index');
const { MealBolusScreen } = require('./mealBolusScreen');

class CarbEntryScreen extends base.Screen {
    constructor(language) {
        super({
            screenText: language.carbEntryScreen,
            generalText: language.general,
            header: {
                backLabel: language.general.Cancel,
            },
            open: {
                isBtn: true,
                label: language.carbEntryScreen.AddMeal,
            },
        });
        this.mealBolusScreen = new MealBolusScreen(language);
    }
    /**
     * @override Screen.BackButton()
     * */
    BackButton() {
        return match.accessible.ButtonBarButton(this.backLabel);
    }
    AmountConsumedLabel() {
        return match.accessible.TextLabel(this.screenText.AmountConsumed);
    }
    DateLabel() {
        return match.accessible.ClickableLabel(this.screenText.Date);
    }
    FoodTypeLabel() {
        return match.accessible.ClickableLabel(this.screenText.FoodType);
    }
    AbsorptionTimeLabel() {
        return match.accessible.ClickableLabel(this.screenText.AbsorptionTime);
    }
    ContinueMainButton() {
        return match.accessible.SetupButton(this.generalText.Continue);
    }
    async Continue() {
        await this.ContinueMainButton().tap();
        return this.mealBolusScreen;
    }
    AbsorptionTimeMessage() {
        return match.accessible.TextLabel(this.screenText.AbsorptionMessage);
    }
    async ExpectAbsorptionTimeMessage() {
        await expect(this.AbsorptionTimeMessage()).toExist();
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

module.exports = { CarbEntryScreen };
