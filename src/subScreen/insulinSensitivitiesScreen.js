const match = require('../match');
const action = require('../action');
const config = require('../config');

class InsulinSensitivitiesScreen {
    constructor(language) {
        this.language = language;
    }
    Header() {
        return match.accessible.Header(this.language.settingsScreen.InsulinSensitivities);
    }
    BackButton() {
        return match.accessible.BackButton(this.language.settingsScreen.Settings);
    }
    CancelButton() {
        return match.accessible.ButtonBarButton(this.language.general.Cancel);
    }
    SaveButton() {
        return match.accessible.Label(this.language.general.Save);
    }
    AddButton() {
        return match.accessible.ButtonBarButton(this.language.general.Add);
    }
    InfoLabel() {
        return match.accessible.Label(this.language.settingsScreen.InsulinSensitivityInfo);
    }
    async Cancel() {
        await this.CancelButton().tap();
    }
    async Close() {
        await this.BackButton().tap();
    }
    async Save() {
        await this.SaveButton().tap();
    }
    async ApplyAll(sensitivities) {
        if (sensitivities) {
            for (let index = 0; index < sensitivities.length; index++) {
                await this.Apply(sensitivities[index]);
            }
        }
    }
    /**
     * @param {Object} sensitivity
     * @param {String} sensitivity.time
     * @param {String} sensitivity.bgValuePerInsulinUnit
     */
    async Apply(sensitivity) {
        await this.AddButton().tap();
        //select time unless this is the first Insulin Sensitivitiy we have set...
        if (sensitivity.time != "12:00 AM") {
            await match.accessible.Label(`${sensitivity.time}`).atIndex(0).tap();
        }
        await action.SetPickerValue(1, `${sensitivity.bgValuePerInsulinUnit} ${config.insulinSensitivitiesUnits}`);
    }
    /**
     * @param {Object} sensitivity
     * @param {String} sensitivity.time
     * @param {String} sensitivity.bgValuePerInsulinUnit
     */
    async Edit(sensitivity) {
        await match.accessible.Label(`${sensitivity.time}`).atIndex(0).tap();
        await action.SetPickerValue(1, `${sensitivity.bgValuePerInsulinUnit} ${config.insulinSensitivitiesUnits}`);
    }
}

module.exports = {
    InsulinSensitivitiesScreen
};
