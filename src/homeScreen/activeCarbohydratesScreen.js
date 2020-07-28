const match = require('../match');

const { base } = require('../base/index');

class ActiveCarbohydratesScreen extends base.Screen {
    constructor(language) {
        super({
            openClickableLabel: language.homeScreen.ActiveCarbohydratesScreen.ActiveCarbohydrates,
            screenText: language.homeScreen.ActiveCarbohydratesScreen,
            generalText: language.general,
            backLabel: language.general.Status,
        });
    }
    COBLabel() {
        return match.accessible.TextLabel(this.screenText.COB);
    }
    TotalLabel() {
        return match.accessible.TextLabel(this.screenText.Total);
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

module.exports = {
    ActiveCarbohydratesScreen
};
