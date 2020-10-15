const match = require('../match');
const base = require('../base/index');

class ActiveInsulinScreen extends base.Screen {
    constructor(language) {
        super({
            screenText: language.statusScreen.ActiveInsulinScreen,
            generalText: language.general,
            header: {
                backLabel: language.general.Status,
            },
            open: {
                isBtn: false,
                label: language.statusScreen.ActiveInsulinScreen.Header,
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

module.exports = ActiveInsulinScreen;
