const base = require('../base/index');
const match = require('../match');

class AlertScreen extends base.Screen {
    constructor(language) {
        super({
            generalText: language.general,
            header: {
                backLabel: 'Settings',
            },
            open: {
                isBtn: false,
                label: 'Alert Permissions',
            },
        });
    }
    OpenButtonControl() {
        return match.accessible.ClickableLabel(this.openLabel).atIndex(1);
    }
}

module.exports = AlertScreen;
