const { base } = require('../base/index');

class TherapyScreen extends base.Screen {
    constructor(language) {
        super({
            screenText: language.homeScreen.ActiveCarbohydratesScreen,
            generalText: language.general,
            header: {
                backLabel: 'Settings',
            },
            open: {
                isBtn: true,
                label: 'chevron.right',
            },
        });
    }
}

module.exports = {
    TherapyScreen
};
