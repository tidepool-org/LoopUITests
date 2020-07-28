const match = require('../match');
const { base } = require('../base/index');

class InsulinDeliveryScreen extends base.Screen {
    constructor(language) {
        super({
            openClickableLabel: language.homeScreen.InsulinDeliveryScreen.Header,
            screenText: language.homeScreen.InsulinDeliveryScreen,
            generalText: language.general,
            backLabel: language.general.Status,
        });
    }
    IOBLabel() {
        return match.accessible.TextLabel(this.screenText.IOB);
    }
    TotalLabel() {
        return match.accessible.TextLabel(this.screenText.Total);
    }
    EventHistoryLabel() {
        return match.accessible.TextLabel(this.screenText.EventHistory);
    }
    ReservoirLabel() {
        return match.accessible.TextLabel(this.screenText.Reservoir);
    }
}

module.exports = {
    InsulinDeliveryScreen
};
