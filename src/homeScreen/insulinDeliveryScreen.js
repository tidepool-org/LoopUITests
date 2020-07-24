const match = require('../match');

class InsulinDeliveryScreen {
    constructor(language) {
        this.language = language.homeScreen.InsulinDeliveryScreen;
        this.language.general = language.general;
    }
    Header() {
        return match.accessible.Header(this.language.InsulinDelivery);
    }
    IOBLabel() {
        return match.accessible.TextLabel(this.language.IOB);
    }
    TotalLabel() {
        return match.accessible.TextLabel(this.language.Total);
    }
    EventHistoryLabel() {
        return match.accessible.TextLabel(this.language.EventHistory);
    }
    ReservoirLabel() {
        return match.accessible.TextLabel(this.language.Reservoir);
    }
    BackButton() {
        return match.accessible.BackButton(this.language.general.Status);
    }
    async Close() {
        await this.BackButton().tap();
    }
}

module.exports = {
    InsulinDeliveryScreen
};
