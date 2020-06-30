const match = require('../match');

class InsulinModelScreen {
    constructor(language) {
        this.language = language;
    }
    Header() {
        return match.accessible.Header(this.language.settingsScreen.InsulinModel);
    }
    BackButton() {
        return match.accessible.BackButton(this.language.settingsScreen.Settings);
    }
    async Close() {
        await this.BackButton().tap();
    }
    async Apply(model) {
        if (model) {
            await match.accessible.Text(model).tap();
        }
    }
}

module.exports = {
    InsulinModelScreen
};
