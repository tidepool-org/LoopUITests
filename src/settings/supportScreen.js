const base = require('../base/index');

class SupportScreen extends base.Screen {
    constructor(language) {
        super({
            generalText: language.general,
            open: {
                isBtn: true,
                label: 'Support',
            },
            header: {
                backLabel: 'Settings',
            },
        });
    }
}

module.exports = SupportScreen;
