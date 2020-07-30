
const match = require('../match');
const { base } = require('../base/index');
const { AddPresetScreen } = require('./addPresetScreen');

class CustomPresetScreen extends base.Screen {
    constructor(language) {
        super({
            openLabel: language.customPresetScreen.WorkoutTargets,
            screenText: language.customPresetScreen,
            generalText: language.general,
            editable: true,
        });
        this.addPresetScreen = new AddPresetScreen(language);
    }
    /**
     * @override so we access the correct CancelButton
     */
    CancelButton() {
        return match.accessible.ButtonBarButton(this.generalText.Cancel);
    }
}

module.exports = { CustomPresetScreen };
