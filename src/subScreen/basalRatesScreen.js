const match = require('../match');
const action = require('../action');
const config = require('../config');

class BasalRatesScreen {
    constructor(language) {
        this.language = language;
    }
    Header() {
        return match.accessible.Header(this.language.settingsScreen.BasalRates);
    }
    BackButton() {
        return match.accessible.BackButton(this.language.settingsScreen.Settings);
    }
    SaveButton() {
        return match.accessible.Label(this.language.settingsScreen.SaveToSimulator);
    }
    AddButton() {
        return match.accessible.ButtonBarButton(this.language.general.Add);
    }
    async Save() {
        await this.SaveButton().tap();
    }
    async Close() {
        await this.BackButton().tap();
    }
    /**
     * @summary basal rate to be set. NOTE: it is assumed that the rates are given in order of time
    * @param {Object} rate
     * @param {String} rate.time
     * @param {String} rate.unitsPerHour
     */
    async Apply(rate) {
        if (rate) {
            await this.AddButton().tap();
            await match.accessible.Label(`${rate.time}`).atIndex(0).tap();
            await action.SetPickerValue(1, `${rate.unitsPerHour} ${config.basalRatesUnits}`);
        }
    }
    /**
     * @summary basal rates to be set. NOTE: it is assumed that the rates are given in order of time
     * @param {Array} rates [{time:'12:00 AM', unitsPerHour:'0.1'}]
     */
    async ApplyAll(rates) {
        if (rates) {
            for (let index = 0; index < rates.length; index++) {
                await this.Apply(rates[index]);
            }
        }
    }
    /**
     * @summary basal rate to be set {time:'12:00 AM', unitsPerHour:'0.1'}
     * @param {Object} rate
     * @param {String} rate.time
     * @param {String} rate.unitsPerHour
     */
    async Edit(rate) {
        if (rate) {
            await match.accessible.Label(`${rate.time}`).atIndex(0).tap();
            await action.SetPickerValue(1, `${rate.unitsPerHour} ${config.basalRatesUnits}`);
        }
    }
}

module.exports = {
    BasalRatesScreen
};
