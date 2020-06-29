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
        return match.accessible.Label(this.language.COB);
    }
    TotalLabel() {
        return match.accessible.Label(this.language.Total);
    }
    GlucoseChangeLabel() {
        return match.accessible.Label(this.language.GlucoseChange);
    }
    ObservedLabel() {
        return match.accessible.Label(this.language.Observed);
    }
    PredictedLabel() {
        return match.accessible.Label(this.language.Predicted);
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
