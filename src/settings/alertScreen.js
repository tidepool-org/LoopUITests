const { base } = require('../base/index');
const match = require('../match');

class AlertScreen extends base.Screen {
    constructor(language) {
        super({
            generalText: language.general,
            header: {
                backLabel: 'Settings',
            },
            open: {
                isBtn: true,
                label: 'Alert Permissions',
            },
        });
    }
    OpenButton() {
        return match.accessible.ClickableLabel(this.openClickableLabel).atIndex(1);
    }
}

module.exports = {
    AlertScreen
};
