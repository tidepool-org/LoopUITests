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
    get GramsActiveCarbsLabel() {
        return match.accessible.TextLabel(this.screenText.GramsActiveCarbs);
    }
    get GramsTotalCarbsLabel() {
        return match.accessible.TextLabel(this.screenText.GramsTotalCarbs);
    }
    get GlucoseChangeLabel() {
        return match.accessible.TextLabel(this.screenText.GlucoseChange);
    }
    get ObservedLabel() {
        return match.accessible.TextLabel(this.screenText.Observed);
    }
    get PredictedLabel() {
        return match.accessible.TextLabel(this.screenText.Predicted);
    }
}

module.exports = ActiveCarbohydratesScreen;
