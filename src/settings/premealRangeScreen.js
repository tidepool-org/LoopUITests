const match = require('../match');
const base = require('../base/index');

class PremealRangeScreen extends base.EntriesScreen {
    constructor(language, config) {
        super({
            screenText: language.settingsScreen.PremealRangeScreen,
            generalText: language.general,
            header: {
                backLabel: language.general.Cancel,
            },
            open: {
                isBtn: false,
                label: language.settingsScreen.PremealRangeScreen.Header,
            },
        }, config);
    }
    /**
     * @override so we access the header by label
     */
    Header() {
        return match.accessible.TextLabel(this.screenText.Header);
    }
    async Open() {
        await super.Open();
        return this;
    }
}

module.exports = PremealRangeScreen;
