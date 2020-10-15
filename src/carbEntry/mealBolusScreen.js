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
    get CarbEntryLabel() {
        return match.accessible.TextLabel(this.screenText.CarbEntry);
    }
    get BolusLabel() {
        return match.accessible.TextLabel(this.screenText.Bolus);
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
    get SaveAndDeliverButton() {
        return match.accessible.Button(this.screenText.SaveAndDeliver);
    }
    get SaveWithoutBolusButton() {
        return match.accessible.Button(this.screenText.SaveWithoutBolusing);
    }
    async ExpectPredictedGlucoseWarning(glucoseValueAndUnits) {
        const predictedGlucoseWarning = `⚠ Predicted glucose of ${glucoseValueAndUnits} is below your suspend threshold setting.`;
        await expect(match.accessible.TextLabel(predictedGlucoseWarning)).toExist();
    }
}

module.exports = MealBolusScreen;
