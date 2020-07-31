
const match = require('../match');
const { base } = require('../base/index');

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
            },
        });
    }
    /**
     * @override so we access the correct CancelButton
     */
    CancelButton() {
        return match.accessible.ButtonBarButton(this.generalText.Cancel);
    }
}

module.exports = { AddPresetScreen };
