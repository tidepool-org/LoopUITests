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
        await this.CancelHeaderButton().tap();
    }
    /**
     * @example await overrides.Add();
     */
    async Add() {
        await this.AddHeaderButton().tap();
    }
    /**
     * @example await overrides.Edit();
     */
    async Edit() {
        await this.EditHeaderButton().tap();
    }
    CustomPresetHeader() {
        return match.accessible.Header(label.overridesScreen.CustomPreset);
    }
    CancelHeaderButton() {
        return match.accessible.ButtonBarButton(label.general.Cancel);
    }
    EditHeaderButton() {
        return match.accessible.ButtonBarButton(label.general.Edit);
    }
    AddHeaderButton() {
        return match.accessible.ButtonBarButton(label.general.Add);
    }
    AddPresetMessage() {
        return match.accessible.Label(label.overridesScreen.AddPresetMessage);
    }
}

module.exports = { OverridesScreen };
