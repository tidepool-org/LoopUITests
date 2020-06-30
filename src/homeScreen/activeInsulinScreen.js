const match = require('../match');

class ActiveInsulinScreen {
    constructor(language) {
        this.language = language.homeScreen.ActiveInsulinScreen;
        this.language.general = language.general;
    }
    Header() {
        return match.accessible.Header(this.language.InsulinDelivery);
    }
    IOBLabel() {
        return match.accessible.Label(this.language.IOB);
    }
    TotalLabel() {
        return match.accessible.Label(this.language.Total);
    }
    EventHistoryLabel() {
        return match.accessible.Label(this.language.EventHistory);
    }
    ReservoirLabel() {
        return match.accessible.Label(this.language.Reservoir);
    }
    BackButton() {
        return match.accessible.BackButton(this.language.general.Status);
    }
    async Close() {
        await this.BackButton().tap();
    }
}

module.exports = {
    ActiveInsulinScreen
};
