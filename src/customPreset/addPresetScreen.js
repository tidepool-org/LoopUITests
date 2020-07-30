
const match = require('../match');
const { base } = require('../base/index');

class AddPresetScreen extends base.Screen {
    constructor(language) {
        super({
            openLabel: language.customPresetScreen.WorkoutTargets,
            screenText: language.customPresetScreen,
            generalText: language.general,
            editable: true,
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
