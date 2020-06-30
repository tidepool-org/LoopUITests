const match = require('../match');

class IssueReportScreen {
    constructor(language) {
        this.language = language;
    }
    Header() {
        return match.accessible.Header(this.language.settingsScreen.IssueReport);
    }
    BackButton() {
        return match.accessible.BackButton(this.language.settingsScreen.Settings);
    }
    async Close() {
        await this.BackButton().tap();
    }
}

module.exports = {
    IssueReportScreen
};
