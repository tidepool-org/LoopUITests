const match = require('./match');
const { base } = require('./base/index');

class CarbEntryScreen extends base.Screen {
    constructor(language) {
        super({
            openLabel: language.carbEntryScreen.AddMeal,
            screenText: language.carbEntryScreen,
            generalText: language.general,
        });
    }
    /**
     * @override so we access the correct CancelButton
     */
    CancelButton() {
        return match.accessible.ButtonBarButton(this.generalText.Cancel);
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
    DisabledContinueButton() {
        return match.accessible.DisabledButtonBarButton(this.generalText.Continue);
    }
    ContinueMainButton() {
        return match.accessible.SetupButton(this.generalText.Continue);
    }
    DisabledContinueMainButton() {
        return match.accessible.DisabledSetupButton(this.generalText.Continue);
    }
    async ContinueToBolus() {
        await this.Continue();
    }
    SaveWithoutBolusButton() {
        return match.accessible.Button(this.screenText.SaveWithoutBolusing);
    }
    async SaveWithoutBolus() {
        await this.SaveWithoutBolusButton().tap();
    }
    async ExpectPredictedGlucoseWarning(glucoseValueAndUnits) {
        const predictedGlucoseWarning = `⚠ Predicted glucose of ${glucoseValueAndUnits} is below your suspend threshold setting.`;
        await expect(match.accessible.TextLabel(predictedGlucoseWarning)).toExist();
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
