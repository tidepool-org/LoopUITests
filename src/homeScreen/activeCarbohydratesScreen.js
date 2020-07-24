const match = require('../match');

class ActiveCarbohydratesScreen {
    constructor(language) {
        this.language = language.homeScreen.ActiveCarbohydratesScreen;
        this.language.general = language.general;
    }
    Header() {
        return match.accessible.Header(this.language.Carbohydrates);
    }
    COBLabel() {
        return match.accessible.TextLabel(this.language.COB);
    }
    TotalLabel() {
        return match.accessible.TextLabel(this.language.Total);
    }
    GlucoseChangeLabel() {
        return match.accessible.TextLabel(this.language.GlucoseChange);
    }
    ObservedLabel() {
        return match.accessible.TextLabel(this.language.Observed);
    }
    PredictedLabel() {
        return match.accessible.TextLabel(this.language.Predicted);
    }
    BackButton() {
        return match.accessible.BackButton(this.language.general.Status);
    }
    async Close() {
        await this.BackButton().tap();
    }
}

module.exports = {
    ActiveCarbohydratesScreen
};
