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
        return match.accessible.Button(this.language.general.Cancel);
    }
    SaveButton() {
        return match.accessible.Label(this.language.general.Save);
    }
    PlusButton() {
        return match.accessible.Button(this.language.buttonLabel.Plus);
    }
    AddNewEntryButton() {
        return match.accessible.Button(this.language.general.Add);
    }
    CancelNewEntryButton() {
        return match.accessible.Button(this.language.general.Cancel);
    }
    NewEntryLabel() {
        return match.accessible.Label('New Entry');
    }
    NewEntryTimeLabel() {
        return match.accessible.Label('Time');
    }
    EditButton() {
        return match.accessible.Button(this.language.general.Edit);
    }
    InfoButton() {
        return match.accessible.Button(this.language.buttonLabel.InfoCircle);
    }
    InfoLabel() {
        return match.accessible.Label(this.language.settingsScreen.InsulinSensitivityInfo);
    }
    GuardrailWarningIconPicker() {
        return match.accessible.Image(this.language.alerts.ExclamationMark).atIndex(0);
    }
    GuardrailWarningIconSave() {
        return match.accessible.Image(this.language.alerts.ExclamationMark).atIndex(1);
    }
    async Add() {
        await this.PlusButton().tap();
    }
    async Edit() {
        await this.EditButton().tap();
    }
    async Cancel() {
        await this.CancelButton().tap();
    }
    async CancelNewEntry() {
        await this.CancelNewEntryButton().tap();
    }
    async AddNewEntry() {
        await this.AddNewEntryButton().tap();
    }
    async Save() {
        await this.SaveButton().tap();
    }
    /**
     * @param {Object} sensitivity
     * @param {String} sensitivity.time
     * @param {String} sensitivity.bgValuePerInsulinUnit
     */
    async Apply(sensitivity) {
        //select time unless this is the first Insulin Sensitivitiy we have set...
        if (sensitivity.time != "12:00 AM") {
            await action.ScrollPickerToValue("12:00 AM", `${sensitivity.time}`);
        }

        //assumption this is new and starts at 500

        await action.ScrollPickerToValue(500, `${sensitivity.bgValuePerInsulinUnit}`);

        //await action.SetPickerValue(1, `${sensitivity.bgValuePerInsulinUnit} ${config.insulinSensitivitiesUnits}`);
    }
    /**
     * @param {Object} sensitivity
     * @param {String} sensitivity.time
     * @param {String} sensitivity.bgValuePerInsulinUnit
     */
    async Edit(sensitivity, fromSensitivity) {
        await match.accessible.Label(`${fromSensitivity.time}`).tap();
        await action.ScrollPickerToValue(`${fromSensitivity.time}`, `${sensitivity.time}`);
        await action.ScrollPickerToValue(`${fromSensitivity.bgValuePerInsulinUnit}`, `${sensitivity.bgValuePerInsulinUnit}`);
    }
}

module.exports = {
    InsulinSensitivitiesScreen
};
