const { base } = require('../base/index');

class SupportScreen extends base.Screen {
    constructor(language) {
        super({
            openClickableLabel: 'Support',
            generalText: language.general,
            backLabel: 'Settings',
        });
    }
}

module.exports = {
    SupportScreen
};
