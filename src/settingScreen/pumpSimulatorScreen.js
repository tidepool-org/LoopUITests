const element = require('detox').element;
const match = require('../match');
const action = require('../action');

const { base } = require('../base/index');

class PumpSimulatorScreen extends base.Screen {
    constructor(language) {
        super({
            screenText: language.settingsScreen.PumpSimulatorScreen,
            generalText: language.general,
            backLabel: language.general.Done,
            visibleBottomLabel: language.settingsScreen.PumpSimulatorScreen.DeletePump,
            visibleTopLabel: language.settingsScreen.PumpSimulatorScreen.SuspendDelivery,
        });
    }
    DoneButton() {
        try {
            return match.accessible.Button(this.generalText.Done).atIndex(0);
        } catch (error) {
            return match.accessible.Button(this.generalText.Done).atIndex(1);
        }
    }
    ConfigurationHeader() {
        return match.accessible.Header(this.screenText.ConfigurationHeader).atIndex(0);
    }
    ReservoirRemainingLabel() {
        return match.accessible.Label(this.screenText.ReservoirRemaining);
    }
    BatteryRemainingLabel() {
        return match.accessible.Label(this.screenText.BatteryRemaining);
    }
    ErrorOnTempBasalLabel() {
        return match.accessible.Label(this.screenText.ErrorOnTempBasal);
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
        return match.accessible.Button(this.screenText.ErrorOnTempBasal);
    }
    ErrorOnBolusLabel() {
        return match.accessible.Label(this.screenText.ErrorOnBolus);
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
        return match.accessible.Button(this.screenText.ErrorOnBolus);
    }
    ErrorOnSuspendLabel() {
        return match.accessible.Label(this.screenText.ErrorOnSuspend);
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
        return match.accessible.Button(this.screenText.ErrorOnSuspend);
    }
    ErrorOnResumeLabel() {
        return match.accessible.Label(this.screenText.ErrorOnResume);
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
        return match.accessible.Button(this.screenText.ErrorOnResume);
    }
    DeletePumpLabel() {
        return match.accessible.Label(this.screenText.DeletePump);
    }
    DeletePumpConfirmationLabel() {
        return match.accessible.AlertButton(this.screenText.DeletePump);
    }
    SuspendDeliveryButton() {
        return match.accessible.Label(this.screenText.SuspendDelivery);
    }
    ResumeDeliveryButton() {
        return match.accessible.Label(this.screenText.ResumeDelivery);
    }
    DetectOcclusionButton() {
        return match.accessible.Label(this.screenText.DetectOcclusion);
    }
    ResolveOcclusionButton() {
        return match.accessible.Label(this.screenText.ResolveOcclusion);
    }
    CausePumpErrorButton() {
        return match.accessible.Label(this.screenText.CausePumpError);
    }
    async CausePumpError() {
        return this.CausePumpErrorButton().tap();
    }
    ResolvePumpErrorButton() {
        return match.accessible.Label(this.screenText.ResolvePumpError);
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
        if (turnOn == null) {
            return;
        }
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
        if (turnOn == null) {
            return;
        }
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
        if (turnOn == null) {
            return;
        }
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
        if (turnOn == null) {
            return;
        }
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
        await match.accessible.BackButton(this.screenText.PumpSettings).tap();
    }
    async _setValue(val) {
        var valField = element(by.type('UITextField'));
        await valField.clearText();
        await valField.typeText(String(val));
    }
    async ApplyBatteryRemaining(percent) {
        if (percent == null) {
            return;
        }
        if (percent > 100 || percent < 0) {
            console.log('battery remaining percent must be in the range of 0-100');
            return;
        }
        await this.BatteryRemainingLabel().tap();
        await this._setValue(percent);
        await this._backToPumpSimulator();
    }
    async ApplyReservoirRemaining(units) {
        if (units == null) {
            return;
        }
        if (units > 200 || units < 0) {
            console.log('reservoir remaining units must be in the range of 0-200');
            return;
        }
        await this.ReservoirRemainingLabel().tap();
        await this._setValue(units);
        await this._backToPumpSimulator();
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
        await match.accessible.AlertButton(this.generalText.OK).tap();
    }
}

module.exports = {
    PumpSimulatorScreen
};
