const match = require('../match');
const { base } = require('../base/index');

class ActiveInsulinScreen extends base.Screen {
    constructor(language) {
        super({
            screenText: language.homeScreen.ActiveInsulinScreen,
            generalText: language.general,
            header: {
                backLabel: language.general.Status,
            },
            open: {
                isBtn: false,
                label: language.homeScreen.ActiveInsulinScreen.Header,
            },
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
    ActiveInsulinScreen
};
