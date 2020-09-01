const match = require('../match');

const base = require('../base/index');

class ActiveCarbohydratesScreen extends base.Screen {
    constructor(language) {
        super({
            screenText: language.homeScreen.ActiveCarbohydratesScreen,
            generalText: language.general,
            header: {
                backLabel: language.general.Status,
            },
            open: {
                isBtn: false,
                label: language.homeScreen.ActiveCarbohydratesScreen.ActiveCarbohydrates,
            },
        });
    }
    GramsActiveCarbsLabel() {
        return match.accessible.TextLabel(this.screenText.GramsActiveCarbs);
    }
    GramsTotalCarbsLabel() {
        return match.accessible.TextLabel(this.screenText.GramsTotalCarbs);
    }
    GlucoseChangeLabel() {
        return match.accessible.TextLabel(this.screenText.GlucoseChange);
    }
    ObservedLabel() {
        return match.accessible.TextLabel(this.screenText.Observed);
    }
    PredictedLabel() {
        return match.accessible.TextLabel(this.screenText.Predicted);
    }
}

module.exports = ActiveCarbohydratesScreen;
