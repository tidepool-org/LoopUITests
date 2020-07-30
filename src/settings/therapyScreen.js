const { base } = require('../base/index');

class TherapyScreen extends base.Screen {
    constructor(language) {
        super({
            openClickableLabel: 'chevron.right',
            screenText: language.homeScreen.ActiveCarbohydratesScreen,
            generalText: language.general,
            backLabel: 'Settings',
        });
    }
}

module.exports = {
    TherapyScreen
};
