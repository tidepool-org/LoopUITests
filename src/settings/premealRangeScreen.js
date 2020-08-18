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
    OpenButton() {
        return match.accessible.ClickableLabel(this.openLabel).atIndex(1);
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
