
const match = require('../match');
const base = require('../base/index');

class AddPresetScreen extends base.Screen {
    constructor(language) {
        super({
            screenText: language.customPresetScreen,
            generalText: language.general,
            open: {
                isBtn: false,
                label: language.customPresetScreen.WorkoutTargets,
            },
            header: {
                editable: true,
                backLabel: language.general.Cancel,
            },
        });
    }
    /**
     * @override Screen.BackButtonControl()
     * */
    BackButtonControl() {
        return match.accessible.ButtonBarButton(this.backLabel);
    }
}

module.exports = AddPresetScreen;
