const match = require('../match');
const base = require('../base/index');

class MealBolusScreen extends base.Screen {
    constructor(language) {
        super({
            screenText: language.carbEntryScreen.MealBolusScreen,
            generalText: language.general,
            header: {
                backLabel: language.carbEntryScreen.MealBolusScreen.CarbEntry,
            },
            open: {
                isBtn: false,
                label: language.general.Continue,
            },
        });
    }
    CarbEntryLabel() {
        return match.accessible.TextLabel(this.screenText.CarbEntry);
    }
    BolusLabel() {
        return match.accessible.TextLabel(this.screenText.Bolus);
    }
    BolusUnits() {
        return match.accessible.TextLabel(this.screenText.Unit).atIndex(0);
    }
    RecommendedLabel() {
        return match.accessible.TextLabel(this.screenText.Recommended);
    }
    RecommendedBolusLabel() {
        return match.accessible.TextLabel(this.screenText.RecommendedBolus);
    }
    RecommendedBolusUnits() {
        return match.accessible.TextLabel(this.screenText.Unit).atIndex(1);
    }
    ActiveCarbsLabel() {
        return match.accessible.TextLabel(this.screenText.ActiveCarbs);
    }
    BolusSummaryHeader() {
        return match.accessible.TextLabel(this.screenText.BolusSummary);
    }
    GlucoseHeader() {
        return match.accessible.TextLabel(this.screenText.Glucose).atIndex(1);
    }
    SaveAndDeliverButton() {
        return match.accessible.Button(this.screenText.SaveAndDeliver);
    }
    SaveWithoutBolusButton() {
        return match.accessible.Button(this.screenText.SaveWithoutBolusing);
    }
    async SaveWithoutBolus() {
        await this.SaveWithoutBolusButton().tap();
    }
    async SaveAndDeliver() {
        await this.SaveAndDeliverButton().tap();
    }
    async ExpectPredictedGlucoseWarning(glucoseValueAndUnits) {
        const predictedGlucoseWarning = `⚠ Predicted glucose of ${glucoseValueAndUnits} is below your suspend threshold setting.`;
        await expect(match.accessible.TextLabel(predictedGlucoseWarning)).toExist();
    }
}

module.exports = MealBolusScreen;
