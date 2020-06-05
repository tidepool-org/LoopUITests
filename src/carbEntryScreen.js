const match = require('./match');

class CarbEntryScreen {
    constructor(language) {
        this.language = language.carbEntryScreen;
        this.language.general = language.general;
    }
    /**
     * @example await carbs.Open();
     */
    async Open() {
        try {
            //assume we are starting from the open screen
            await match.accessible.Button(this.language.AddMeal).tap();
        } catch (err) { } //catch and continue
    }
    /**
     * @example await carbs.Cancel();
     */
    async Cancel() {
        await this.CancelHeaderButton().tap();
    }
    CancelHeaderButton() {
        return match.accessible.ButtonBarButton(this.language.general.Cancel);
    }
    AddCarbEntryHeader() {
        return match.accessible.Header(this.language.AddCarbEntry);
    }
    AmountConsumedLabel() {
        return match.accessible.Label(this.language.AmountConsumed);
    }
    DateLabel() {
        return match.accessible.Label(this.language.Date);
    }
    FoodTypeLabel() {
        return match.accessible.Label(this.language.FoodType);
    }
    AbsorptionTimeLabel() {
        return match.accessible.Label(this.language.AbsorptionTime);
    }
    /**
     * @example  carbs.ContinueButton();
     */
    ContinueHeaderButton() {
        return match.accessible.ButtonBarButton(this.language.general.Continue);
    }
    /**
     * @example  carbs.DisabledContinueButton();
     */
    DisabledContinueHeaderButton() {
        return match.accessible.DisabledButtonBarButton(this.language.general.Continue);
    }
    /**
     * @example  carbs.ContinueMainButton();
     */
    ContinueMainButton() {
        return match.accessible.SetupButton(this.language.general.Continue);
    }
    /**
     * @example  carbs.DisabledContinueMainButton();
     */
    DisabledContinueMainButton() {
        return match.accessible.DisabledSetupButton(this.language.general.Continue);
    }
    /**
     * @example await carbs.ContinueToBolus();
     */
    async ContinueToBolus() {
        await this.ContinueHeaderButton().tap();
    }
    /**
     * @example carbs.SaveWithoutBolusButton();
     */
    SaveWithoutBolusButton() {
        return match.accessible.Button(this.language.SaveWithoutBolusing);
    }
    /**
     * @example await carbs.SaveWithoutBolus();
     */
    async SaveWithoutBolus() {
        await this.SaveWithoutBolusButton().tap();
    }
    /**
     * @param {string} glucoseValueAndUnits
     * @example await carbs.ExpectPredictedGlucoseWarning('110 mg/dL');
     */
    async ExpectPredictedGlucoseWarning(glucoseValueAndUnits) {
        const predictedGlucoseWarning = `⚠ Predicted glucose of ${glucoseValueAndUnits} is below your suspend threshold setting.`;
        await expect(match.accessible.Label(predictedGlucoseWarning)).toExist();
    }
    /**
     * @example carbs.AbsorptionTimeMessage();
     */
    AbsorptionTimeMessage() {
        return match.accessible.Label(this.language.AbsorptionMessage);
    }
    /**
     * @example await carbs.ExpectAbsorptionTimeMessage();
     */
    async ExpectAbsorptionTimeMessage() {
        await expect(this.AbsorptionTimeMessage()).toExist();
    }
    /**
     * @summary add a meal entry
     * @param {string} amount
     * @example await carbs.SetCarbs('30');
     */
    async SetCarbs(amount) {
        //TODO: we need a better way to find this
        await match.UITextField().clearText();
        await match.UITextField().typeText(amount);
    }
    /**
     * @summary set the date / time for the given carbs
     * @param {string} date
     * @example await carbs.SetDate('30');
     */
    async SetDate(amount) {
        //TODO: we need a better way to find this
        await match.UITextField().clearText();
        await match.UITextField().typeText(amount);
    }
    /**
     * @summary set the absortion time for the given carbs
     * @param {string} hours
     * @example await carbs.SetAbsortionTime('1');
     */
    async SetAbsortionTime(hours) {
        //TODO: we need a better way to find this
        await match.UITextField().clearText();
        await match.UITextField().typeText(amount);
    }
}

module.exports = { CarbEntryScreen };
