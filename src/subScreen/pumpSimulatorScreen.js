const element = require('detox').element;
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
    ReservoirRemainingLabel() {
        return match.accessible.Label(this.language.pumpSimulatorSettingsScreen.ReservoirRemaining);
    }
    BatteryRemainingLabel() {
        return match.accessible.Label(this.language.pumpSimulatorSettingsScreen.BatteryRemaining);
    }
    ErrorOnTempBasalLabel() {
        return match.accessible.Label(this.language.pumpSimulatorSettingsScreen.ErrorOnTempBasal);
    }
    async _isErrorOnTempBasal() {
        try {
            await expect(this.ErrorOnTempBasalButton()).toHaveValue('1');
            return true;
        } catch (error) {
            return false;
        }
    }
    ErrorOnTempBasalButton() {
        return match.accessible.Button(this.language.pumpSimulatorSettingsScreen.ErrorOnTempBasal);
    }
    ErrorOnBolusLabel() {
        return match.accessible.Label(this.language.pumpSimulatorSettingsScreen.ErrorOnBolus);
    }
    async _isErrorOnBolus() {
        try {
            await expect(this.ErrorOnTempBasalButton()).toHaveValue('1');
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
            await expect(this.ErrorOnTempBasalButton()).toHaveValue('1');
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
            await expect(this.ErrorOnTempBasalButton()).toHaveValue('1');
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
     * @param {number} settings.reservoirRemaining
     * @param {number} settings.batteryRemaining
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
        if (settings.batteryRemaining) {
            await this.ApplyBatteryRemaining(settings.batteryRemaining);
        }
        if (settings.reservoirRemaining) {
            await this.ApplyReservoirRemaining(settings.reservoirRemaining);
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
    async _backToPumpSimulator() {
        await match.accessible.BackButton(this.language.pumpSimulatorSettingsScreen.PumpSettings).tap();
    }
    async _setValue(val) {
        await element(by.type('UITextField')).clearText();
        await element(by.type('UITextField')).typeText(String(val));
    }
    async ApplyBatteryRemaining(percent) {
        if (percent > 100 || percent < 0) {
            console.log('battery remaining percent must be in the range of 0-100');
            return;
        }
        await this.BatteryRemainingLabel().tap();
        await this._setValue(percent);
        await this._backToPumpSimulator();
    }
    async ApplyReservoirRemaining(units) {
        if (units > 200 || units < 0) {
            console.log('reservoir remaining units must be in the range of 0-200');
            return;
        }
        await this.ReservoirRemainingLabel().tap();
        await this._setValue(units);
        await this._backToPumpSimulator();
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
