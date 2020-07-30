const { base } = require('../base/index');
const match = require('../match');

class AlertScreen extends base.Screen {
    constructor(language) {
        super({
            openClickableLabel: 'Alert Permissions',
            generalText: language.general,
            backLabel: 'Settings',
        });
    }
    OpenButton() {
        return match.accessible.ClickableLabel(this.openClickableLabel).atIndex(1);
    }
}

module.exports = {
    AlertScreen
};
