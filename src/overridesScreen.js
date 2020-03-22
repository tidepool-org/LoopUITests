const match = require('./match');
const { label } = require('./labels');

class OverridesScreen {
    /**
     * @example await overrides.Open();
     */
    async Open() {
        try {
            //assume we are starting from the open screen
            await match.accessible.Button(label.overridesScreen.WorkoutTargets).tap();
        } catch (err) { } //catch and continue
    }
    /**
     * @example await overrides.Cancel();
     */
    async Cancel() {
        await match.accessible.ButtonBarButton(label.general.Cancel).tap();
    }
}

module.exports = { OverridesScreen };
