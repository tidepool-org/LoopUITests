const match = require('../match');
const base = require('../base/index');

class DexcomG6Screen extends base.Screen {
    constructor(language) {
        super({
            screenText: language.settingsScreen.G6Screen,
            generalText: language.general,
            header: {
                backLabel: language.general.Cancel,
            },
        });
    }
    /**
     * @override Screen.BackButton()
     **/
    BackButton() {
        return match.accessible.Button(this.backLabel);
    }
    DeviceImage() {
        return match.accessible.Image(this.screenText.DeviceImage);
    }
    EnterCodeButton() {
        return match.accessible.Button(this.screenText.EnterCode);
    }
    NoCodeButton() {
        return match.accessible.Button(this.screenText.NoCode);
    }
}

module.exports = DexcomG6Screen;
