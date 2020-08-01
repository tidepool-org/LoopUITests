
const match = require('../match');
const { base } = require('../base/index');
const { AddPresetScreen } = require('./addPresetScreen');

class CustomPresetScreen extends base.Screen {
    constructor(language) {
        super({
            screenText: language.customPresetScreen,
            generalText: language.general,
            open: {
                isBtn: true,
                label: language.customPresetScreen.WorkoutTargets,
            },
            header: {
                editable: true,
                backLabel: language.general.Cancel,
            },
        });
        this.addPresetScreen = new AddPresetScreen(language);
    }
    /**
     * @override Screen.BackButton()
     * */
    BackButton() {
        return match.accessible.ButtonBarButton(this.backLabel);
    }
}

module.exports = { CustomPresetScreen };
