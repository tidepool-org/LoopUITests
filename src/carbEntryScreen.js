const match = require('./match');
const { base } = require('./base/index');

class CarbEntryScreen extends base.Screen {
    constructor(language) {
        super({
            openLabel: language.carbEntryScreen.AddMeal,
            screenTxt: language.carbEntryScreen,
            generalTxt: language.general,
        });
    }
    /**
     * @override so we access the correct CancelButton
     */
    CancelButton() {
        return match.accessible.ButtonBarButton(this.generalTxt.Cancel);
    }
    AmountConsumedLabel() {
        return match.accessible.Label(this.screenTxt.AmountConsumed);
    }
    DateLabel() {
        return match.accessible.Label(this.screenTxt.Date);
    }
    FoodTypeLabel() {
        return match.accessible.Label(this.screenTxt.FoodType);
    }
    AbsorptionTimeLabel() {
        return match.accessible.Label(this.screenTxt.AbsorptionTime);
    }
    DisabledContinueButton() {
        return match.accessible.DisabledButtonBarButton(this.generalTxt.Continue);
    }
    ContinueMainButton() {
        return match.accessible.SetupButton(this.generalTxt.Continue);
    }
    DisabledContinueMainButton() {
        return match.accessible.DisabledSetupButton(this.generalTxt.Continue);
    }
    async ContinueToBolus() {
        await this.Continue();
    }
    SaveWithoutBolusButton() {
        return match.accessible.Button(this.screenTxt.SaveWithoutBolusing);
    }
    async SaveWithoutBolus() {
        await this.SaveWithoutBolusButton().tap();
    }
    async ExpectPredictedGlucoseWarning(glucoseValueAndUnits) {
        const predictedGlucoseWarning = `⚠ Predicted glucose of ${glucoseValueAndUnits} is below your suspend threshold setting.`;
        await expect(match.accessible.Label(predictedGlucoseWarning)).toExist();
    }
    AbsorptionTimeMessage() {
        return match.accessible.Label(this.screenTxt.AbsorptionMessage);
    }
    async ExpectAbsorptionTimeMessage() {
        await expect(this.AbsorptionTimeMessage()).toExist();
    }
    async SetCarbs(amount) {
        await match.UITextField().clearText();
        await match.UITextField().typeText(String(amount));
        await match.UITextField().tapReturnKey();
    }
    async SetDate(amount) {
        await match.UITextField().clearText();
        await match.UITextField().typeText(String(amount));
        await match.UITextField().tapReturnKey();

    }
    async SetAbsortionTime(hours) {
        await match.UITextField().clearText();
        await match.UITextField().typeText(String(hours));
        await match.UITextField().tapReturnKey();
    }
}

module.exports = { CarbEntryScreen };
