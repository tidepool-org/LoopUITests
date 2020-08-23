const match = require('../match');
const base = require('../base/index');

class InsulinModelScreen extends base.Screen {
    constructor(language) {
        super({
            screenText: language.settingsScreen.InsulinModelScreen,
            generalText: language.general,
            header: {
                backLabel: language.general.Close,
            },
            open: {
                isBtn: false,
                label: language.settingsScreen.InsulinModelScreen.Header,
            },
        });
    }
    InfoLabel() {
        return match.accessible.TextLabel(this.screenText.Info);
    }
    OpenButton() {
        return match.accessible.ClickableLabel(this.openLabel).atIndex(1);
    }
    async Apply(model) {
        if (model) {
            await match.accessible.ClickableLabel(model).tap();
        }
    }
}

module.exports = InsulinModelScreen;
