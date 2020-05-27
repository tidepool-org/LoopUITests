const match = require('../match');

class PumpSimulatorScreen {
    constructor(language) {
        this.language = language;
    }
    Header() {
        return match.accessible.Header(this.language.pumpSimulatorSettingsScreen.PumpSettings);
    }
    DoneButton() {
        return match.accessible.Button(this.language.general.Done);
    }
    ConfigurationHeader() {
        return match.accessible.Header(this.language.settingsScreen.Configuration);
    }
    RemainingReservoirLabel() {
        return match.accessible.Label(this.language.pumpSimulatorSettingsScreen.PumpSettings);
    }
    RemainingBatteryLabel() {
        return match.accessible.Label(this.language.pumpSimulatorSettingsScreen.RemainingBattery);
    }
    ErrorOnTempBasalLabel() {
        return match.accessible.Label(this.language.pumpSimulatorSettingsScreen.ErrorOnTempBasal);
    }
    async _isErrorOnTempBasal() {
        try {
            await waitFor(this.ErrorOnTempBasalButton()).toHaveValue('1').withTimeout(2000);
            return true;
        } catch (error) {
            return false;
        }
    }
    ErrorOnTempBasalButton() {
        return match.accessible.Button(this.language.pumpSimulatorSettingsScreen.ErrorOnTempBasal);
    }
    //
    ErrorOnBolusLabel() {
        return match.accessible.Label(this.language.pumpSimulatorSettingsScreen.ErrorOnBolus);
    }
    async _isErrorOnBolus() {
        try {
            await waitFor(this.ErrorOnBolusButton()).toHaveValue('1').withTimeout(2000);
            return true;
        } catch (error) {
            return false;
        }
    }
    ErrorOnBolusButton() {
        return match.accessible.Button(this.language.pumpSimulatorSettingsScreen.ErrorOnBolus);
    }
    ErrorOnSuspendLabel() {
        return match.accessible.Label(this.language.pumpSimulatorSettingsScreen.ErrorOnSuspend);
    }
    async _isErrorOnSuspend() {
        try {
            await waitFor(this.ErrorOnSuspendButton()).toHaveValue('1').withTimeout(2000);
            return true;
        } catch (error) {
            return false;
        }
    }
    ErrorOnSuspendButton() {
        return match.accessible.Button(this.language.pumpSimulatorSettingsScreen.ErrorOnSuspend);
    }
    ErrorOnResumeLabel() {
        return match.accessible.Label(this.language.pumpSimulatorSettingsScreen.ErrorOnResume);
    }
    async _isErrorOnResume() {
        try {
            await waitFor(this.ErrorOnResumeButton()).toHaveValue('1').withTimeout(2000);
            return true;
        } catch (error) {
            return false;
        }
    }
    ErrorOnResumeButton() {
        return match.accessible.Button(this.language.pumpSimulatorSettingsScreen.ErrorOnResume);
    }
    DeletePumpLabel() {
        return match.accessible.Label(this.language.pumpSimulatorSettingsScreen.DeletePump);
    }
    SuspendDeliveryButton() {
        return match.accessible.Button(this.language.pumpSimulatorSettingsScreen.SuspendDelivery);
    }
    ResumeDeliveryButton() {
        return match.accessible.Button(this.language.pumpSimulatorSettingsScreen.ResumeDelivery);
    }
    /**
     * @param {object} settings
     * @param {boolean} settings.errorOnBolus
     * @param {boolean} settings.errorOnTempBasal
     * @param {boolean} settings.errorOnSuspend
     * @param {boolean} settings.errorOnResume
     * @param {number} settings.remainingReservoir
     * @param {number} settings.remainingBattery
     */
    async Apply(settings) {
        if (settings.errorOnBolus) {
            await this.ErrorOnBolusOn();
        } else if (!settings.errorOnBolus) {
            await this.ErrorOnBolusOff();
        }
        if (settings.errorOnTempBasal) {
            await this.ErrorOnTempBasalOn();
        } else if (!settings.errorOnTempBasal) {
            await this.ErrorOnTempBasalOff();
        }
        if (settings.errorOnResume) {
            await this.ErrorOnResumeOn();
        } else if (!settings.errorOnResume) {
            await this.ErrorOnResumeOff();
        }
        if (settings.errorOnSuspend) {
            await this.ErrorOnSuspendOn();
        } else if (!settings.errorOnSuspend) {
            await this.ErrorOnSuspendOff();
        }
    }
    async ErrorOnBolusOn() {
        if (await this._isErrorOnBolus()) {
            return;
        }
        await this.ErrorOnBolusButton().tap();
    }
    async ErrorOnBolusOff() {
        if (await this._isErrorOnBolus()) {
            await this.ErrorOnBolusButton().tap();
        }
        return;
    }
    async ErrorOnTempBasalOn() {
        if (await this._isErrorOnTempBasal()) {
            return;
        }
        await this.ErrorOnTempBasalButton().tap();
    }
    async ErrorOnTempBasalOff() {
        if (await this._isErrorOnTempBasal()) {
            await this.ErrorOnTempBasalButton().tap();
        }
        return;
    }
    async ErrorOnSuspendOn() {
        if (await this._isErrorOnSuspend()) {
            return;
        }
        await this.ErrorOnSuspendButton().tap();
    }
    async ErrorOnSuspendOff() {
        if (await this._isErrorOnSuspend()) {
            await this.ErrorOnSuspendButton().tap();
        }
        return;
    }
    async ErrorOnResumeOn() {
        if (await this._isErrorOnResume()) {
            return;
        }
        await this.ErrorOnResumeButton().tap();
    }
    async ErrorOnResumeOff() {
        if (await this._isErrorOnResume()) {
            await this.ErrorOnResumeButton().tap();
        }
        return;
    }
    async Close() {
        await this.DoneButton().atIndex(0).tap();
    }
    async ResumeDelivery() {
        await this.ResumeDeliveryButton().tap();
    }
    async SuspendDelivery() {
        await this.SuspendDeliveryButton().tap();
    }
    async DeletePump() {
        await this.DeletePumpLabel().tap();
        await this.DeletePumpLabel().atIndex(1).tap();
    }

}

module.exports = {
    PumpSimulatorScreen
};
