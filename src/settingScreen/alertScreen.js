const { base } = require('../base/index');

class AlertScreen extends base.Screen {
    constructor(language) {
        super({
            openClickableLabel: 'Alert Permissions',
            generalText: language.general,
            backLabel: 'Settings',
        });
    }
    async Open() {
        return this.OpenButton().atIndex(1).tap();
    }
}

module.exports = {
    AlertScreen
};
