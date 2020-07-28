const match = require('../match');
const { base } = require('../base/index');

class InsulinModelScreen extends base.Screen {
    constructor(language) {
        super({
            screenText: language.settingsScreen.InsulinModelScreen,
            generalText: language.general,
            openLabel: language.settingsScreen.InsulinModelScreen.Header,
            backLabel: language.general.Close,
        });
    }
    async Apply(model) {
        if (model) {
            await match.accessible.ClickableLabel(model).tap();
        }
    }
}

module.exports = {
    InsulinModelScreen
};
