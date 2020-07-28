
const match = require('./match');
const { base } = require('./base/index');

class CustomPresetScreen extends base.Screen {
    constructor(language) {
        super({
            openLabel: language.customPresetScreen.Header,
            screenText: language.customPresetScreen,
            generalText: language.general,
        });
    }
}

module.exports = { CustomPresetScreen };
