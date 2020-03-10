const match = require('./match');
const { Label, TempOverrideLabel } = require('./labels');

class Overrides {
    /**
     * @example await overrides.Open();
     */
    async Open() {
        try {
            //assume we are starting from the open screen
            await match.accessible.Button(TempOverrideLabel.WorkoutTargets).tap();
        } catch (err) { } //catch and continue
    }
    /**
     * @example await overrides.Cancel();
     */
    async Cancel() {
        await match.accessible.ButtonBarButton(Label.Cancel).tap();
    }
}

module.exports = { Overrides };
