const match = require('../match');
const base = require('../base/index');

class WorkoutRangeScreen extends base.EntriesScreen {
    constructor(language, config) {
        super({
            screenText: language.settingsScreen.WorkoutRangeScreen,
            generalText: language.general,
            header: {
                backLabel: language.general.Cancel,
            },
            open: {
                isBtn: false,
                label: language.settingsScreen.WorkoutRangeScreen.Header,
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

module.exports = WorkoutRangeScreen;
