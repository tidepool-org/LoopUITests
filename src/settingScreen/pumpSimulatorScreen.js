const element = require('detox').element;
const match = require('../match');

class PumpSimulatorScreen {
    constructor(language) {
        this.language = language.settingsScreen.PumpSimulatorScreen;
        this.language.general = language.general;
        this.language.ConfigHeader = language.settingsScreen.Configuration;
    }
    Header() {
        return match.accessible.Header(this.language.PumpSettings);
    }
    DoneButton() {
        try {
            return match.accessible.Button(this.language.general.Done).atIndex(0);
        } catch (error) {
            return match.accessible.Button(this.language.general.Done).atIndex(1);
        }
    }
    ConfigurationHeader() {
        return match.accessible.Header(this.language.ConfigHeader).atIndex(0);
    }
    ReservoirRemainingLabel() {
        return match.accessible.Label(this.language.ReservoirRemaining);
    }
    BatteryRemainingLabel() {
        return match.accessible.Label(this.language.BatteryRemaining);
    }
    ErrorOnTempBasalLabel() {
        return match.accessible.Label(this.language.ErrorOnTempBasal);
    }
    async _isErrorOnTempBasal() {
        try {
            await waitFor(this.ErrorOnTempBasalToggel()).toHaveValue('1').withTimeout(2000);
            return true;
        } catch (error) {
            return false;
        }
    }
    ErrorOnTempBasalToggel() {
        return match.accessible.Button(this.language.ErrorOnTempBasal);
    }
    ErrorOnBolusLabel() {
        return match.accessible.Label(this.language.ErrorOnBolus);
    }
    async _isErrorOnBolus() {
        try {
            await waitFor(this.ErrorOnBolusToggel()).toHaveValue('1').withTimeout(2000);
            return true;
        } catch (error) {
            return false;
        }
    }
    ErrorOnBolusToggel() {
        return match.accessible.Button(this.language.ErrorOnBolus);
    }
    ErrorOnSuspendLabel() {
        return match.accessible.Label(this.language.ErrorOnSuspend);
    }
    async _isErrorOnSuspend() {
        try {
            await waitFor(this.ErrorOnSuspendToggel()).toHaveValue('1').withTimeout(2000);
            return true;
        } catch (error) {
            return false;
        }
    }
    ErrorOnSuspendToggel() {
        return match.accessible.Button(this.language.ErrorOnSuspend);
    }
    ErrorOnResumeLabel() {
        return match.accessible.Label(this.language.ErrorOnResume);
    }
    async _isErrorOnResume() {
        try {
            await waitFor(this.ErrorOnResumeToggel()).toHaveValue('1').withTimeout(2000);
            return true;
        } catch (error) {
            return false;
        }
    }
    ErrorOnResumeToggel() {
        return match.accessible.Button(this.language.ErrorOnResume);
    }
    DeletePumpLabel() {
        return match.accessible.Label(this.language.DeletePump);
    }
    DeletePumpConfirmationLabel() {
        return match.accessible.Label(this.language.DeletePump).atIndex(1);
    }
    SuspendDeliveryButton() {
        return match.accessible.Label(this.language.SuspendDelivery);
    }
    ResumeDeliveryButton() {
        return match.accessible.Label(this.language.ResumeDelivery);
    }
    DetectOcclusionButton() {
        return match.accessible.Label(this.language.DetectOcclusion);
    }
    ResolveOcclusionButton() {
        return match.accessible.Label(this.language.ResolveOcclusion);
    }
    CausePumpErrorButton() {
        return match.accessible.Label(this.language.CausePumpError);
    }
    async CausePumpError() {
        return this.CausePumpErrorButton().tap();
    }
    ResolvePumpErrorButton() {
        return match.accessible.Label(this.language.ResolvePumpError);
    }
    async ResolvePumpError() {
        return this.ResolvePumpErrorButton().tap();
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
        await this.SetErrorOnBolus(settings.errorOnBolus);
        await this.SetErrorOnTempBasal(settings.errorOnTempBasal);
        await this.SetErrorOnSuspend(settings.errorOnSuspend);
        await this.SetErrorOnResume(settings.errorOnResume);
        await this.ApplyBatteryRemaining(settings.batteryRemaining);
        await this.ApplyReservoirRemaining(settings.reservoirRemaining);
    }
    async SetErrorOnBolus(turnOn) {
        let allReadyOn = await this._isErrorOnBolus();
        if (turnOn == true) {
            if (allReadyOn == false) {
                await this.ErrorOnBolusToggel().tap();
            }
        } else if (turnOn == false) {
            if (allReadyOn == true) {
                await this.ErrorOnBolusToggel().tap();
            }
        }
    }
    async SetErrorOnTempBasal(turnOn) {
        let allReadyOn = await this._isErrorOnTempBasal();
        if (turnOn == true) {
            if (allReadyOn == false) {
                await this.ErrorOnTempBasalToggel().tap();
            }
        } else if (turnOn == false) {
            if (allReadyOn == true) {
                await this.ErrorOnTempBasalToggel().tap();
            }
        }
    }
    async SetErrorOnSuspend(turnOn) {
        let allReadyOn = await this._isErrorOnSuspend();
        if (turnOn == true) {
            if (allReadyOn == false) {
                await this.ErrorOnSuspendToggel().tap();
            }
        } else if (turnOn == false) {
            if (allReadyOn == true) {
                await this.ErrorOnSuspendToggel().tap();
            }
        }
    }
    async SetErrorOnResume(turnOn) {
        let allReadyOn = await this._isErrorOnResume();
        if (turnOn == true) {
            if (allReadyOn == false) {
                await this.ErrorOnResumeToggel().tap();
            }
        } else if (turnOn == false) {
            if (allReadyOn == true) {
                await this.ErrorOnResumeToggel().tap();
            }
        }
    }
    async _backToPumpSimulator() {
        await match.accessible.BackButton(this.language.PumpSettings).tap();
    }
    async _setValue(val) {
        await element(by.type('UITextField')).clearText();
        await element(by.type('UITextField')).typeText(String(val));
    }
    async ApplyBatteryRemaining(percent) {
        if (percent) {
            if (percent > 100 || percent < 0) {
                console.log('battery remaining percent must be in the range of 0-100');
                return;
            }
            await this.BatteryRemainingLabel().tap();
            await this._setValue(percent);
            await this._backToPumpSimulator();
        }
    }
    async ApplyReservoirRemaining(units) {
        if (units) {
            if (units > 200 || units < 0) {
                console.log('reservoir remaining units must be in the range of 0-200');
                return;
            }
            await this.ReservoirRemainingLabel().tap();
            await this._setValue(units);
            await this._backToPumpSimulator();
        }
    }
    async Close() {
        await this.DoneButton().tap();
    }
    async ResumeDelivery() {
        await this.ResumeDeliveryButton().tap();
    }
    async SuspendDelivery() {
        await this.SuspendDeliveryButton().tap();
    }
    async RemoveSimulator() {
        await this.ScrollToBottom();
        await this.DeletePumpLabel().tap();
        await this.DeletePumpConfirmationLabel().tap();
    }
    async HasAlert() {
        await expect(match.accessible.Alert()).toExist();
    }
    async DismissAlert() {
        await match.accessible.AlertButton(this.language.general.OK).tap();
    }
    async ScrollToBottom() {
        try {
            await expect(this.DeletePumpLabel()).toBeVisible();
        } catch (err) {
            await this.ConfigurationHeader().swipe('up', 'fast');
        }
    }
    async ScrollToTop() {
        try {
            await expect(this.SuspendDelivery()).toBeVisible();
        } catch (err) {
            await this.ErrorOnBolusLabel().swipe('down', 'fast');
        }
    }
}

module.exports = {
    PumpSimulatorScreen
};
