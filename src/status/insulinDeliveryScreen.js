const match = require('../match');
const base = require('../base/index');

class InsulinDeliveryScreen extends base.Screen {
    constructor(language) {
        super({
            screenText: language.statusScreen.InsulinDeliveryScreen,
            generalText: language.general,
            header: {
                backLabel: language.general.Status,
            },
            open: {
                isBtn: false,
                label: language.statusScreen.InsulinDeliveryScreen.Header,
            },
        });
    }
    get IOBLabel() {
        return match.accessible.TextLabel(this.screenText.IOB);
    }
    get TotalLabel() {
        return match.accessible.TextLabel(this.screenText.Total);
    }
    get EventHistoryLabel() {
        return match.accessible.TextLabel(this.screenText.EventHistory);
    }
    get ReservoirLabel() {
        return match.accessible.TextLabel(this.screenText.Reservoir);
    }
}

module.exports = InsulinDeliveryScreen;
