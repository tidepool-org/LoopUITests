const match = require('../match');
const base = require('../base/index');

class PumpSimulatorScreen extends base.Screen {
    constructor(language) {
        super({
            screenText: language.device.PumpSimulatorScreen,
            generalText: language.general,
            header: {
                backLabel: language.general.Done,
            },
            scroll: {
                visibleBottomLabel: language.device.PumpSimulatorScreen.DeletePump,
                visibleTopLabel: language.device.PumpSimulatorScreen.SuspendDelivery,
            },
        });
    }
    ConfigurationHeader() {
        return match.accessible.Header(this.screenText.ConfigurationHeader).atIndex(0);
    }
    ReservoirRemainingLabel() {
        return match.accessible.TextLabel(this.screenText.ReservoirRemaining);
    }
    BatteryRemainingLabel() {
        return match.accessible.TextLabel(this.screenText.BatteryRemaining);
    }
    ErrorOnTempBasalLabel() {
        return match.accessible.TextLabel(this.screenText.ErrorOnTempBasal);
    }
    ErrorOnTempBasalSwitch() {
        return match.accessible.SwitchButton(this.screenText.ErrorOnTempBasal);
    }
    ErrorOnBolusLabel() {
        return match.accessible.TextLabel(this.screenText.ErrorOnBolus);
    }
    ErrorOnBolusSwitch() {
        return match.accessible.SwitchButton(this.screenText.ErrorOnBolus);
    }
    ErrorOnSuspendLabel() {
        return match.accessible.TextLabel(this.screenText.ErrorOnSuspend);
    }
    ErrorOnSuspendSwitch() {
        return match.accessible.SwitchButton(this.screenText.ErrorOnSuspend);
    }
    ErrorOnResumeLabel() {
        return match.accessible.TextLabel(this.screenText.ErrorOnResume);
    }
    ErrorOnResumeSwitch() {
        return match.accessible.SwitchButton(this.screenText.ErrorOnResume);
    }
    NextDeliveryCommandUncertainSwitch() {
        return match.accessible.SwitchButton(this.screenText.NextDeliveryCommandUncertain);
    }
    DeletePumpLabel() {
        return match.accessible.TextLabel(this.screenText.DeletePump);
    }
    DeletePumpConfirmationLabel() {
        return match.accessible.AlertButton(this.screenText.DeletePump);
    }
    SuspendDeliveryButton() {
        return match.accessible.TextLabel(this.screenText.SuspendDelivery);
    }
    ResumeDeliveryButton() {
        return match.accessible.TextLabel(this.screenText.ResumeDelivery);
    }
    DetectOcclusionButton() {
        return match.accessible.TextLabel(this.screenText.DetectOcclusion);
    }
    async DetectOcclusionError() {
        return this.DetectOcclusionButton().tap();
    }
    ResolveOcclusionButton() {
        return match.accessible.TextLabel(this.screenText.ResolveOcclusion);
    }
    async ResolveOcclusionError() {
        return this.ResolveOcclusionButton().tap();
    }
    CausePumpErrorButton() {
        return match.accessible.TextLabel(this.screenText.CausePumpError);
    }
    async CausePumpError() {
        return this.CausePumpErrorButton().tap();
    }
    ResolvePumpErrorButton() {
        return match.accessible.TextLabel(this.screenText.ResolvePumpError);
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
     * @param {boolean} settings.nextDeliveryCommandUncertain
     * @param {number} settings.reservoirRemaining
     * @param {number} settings.batteryRemaining
     */
    async Apply(settings) {
        await this.SetErrorOnBolus(settings.errorOnBolus);
        await this.SetErrorOnTempBasal(settings.errorOnTempBasal);
        await this.SetErrorOnSuspend(settings.errorOnSuspend);
        await this.SetErrorOnResume(settings.errorOnResume);
        await this.SetNextDeliveryCommandUncertain(settings.nextDeliveryCommandUncertain);
        await this.ApplyBatteryRemaining(settings.batteryRemaining);
        await this.ApplyReservoirRemaining(settings.reservoirRemaining);
    }
    async SetErrorOnBolus(turnOn) {
        if (turnOn == null) {
            return;
        }
        let allReadyOn = await this.IsOn(this.ErrorOnBolusSwitch());
        if (turnOn == true) {
            if (allReadyOn == false) {
                await this.ErrorOnBolusSwitch().tap();
            }
        } else if (turnOn == false) {
            if (allReadyOn == true) {
                await this.ErrorOnBolusSwitch().tap();
            }
        }
    }
    async SetErrorOnTempBasal(turnOn) {
        if (turnOn == null) {
            return;
        }
        let allReadyOn = await this.IsOn(this.ErrorOnTempBasalSwitch());
        if (turnOn == true) {
            if (allReadyOn == false) {
                await this.ErrorOnTempBasalSwitch().tap();
            }
        } else if (turnOn == false) {
            if (allReadyOn == true) {
                await this.ErrorOnTempBasalSwitch().tap();
            }
        }
    }
    async SetErrorOnSuspend(turnOn) {
        if (turnOn == null) {
            return;
        }
        let allReadyOn = await this.IsOn(this.ErrorOnSuspendSwitch());
        if (turnOn == true) {
            if (allReadyOn == false) {
                await this.ErrorOnSuspendSwitch().tap();
            }
        } else if (turnOn == false) {
            if (allReadyOn == true) {
                await this.ErrorOnSuspendSwitch().tap();
            }
        }
    }
    async SetErrorOnResume(turnOn) {
        if (turnOn == null) {
            return;
        }
        let allReadyOn = await this.IsOn(this.ErrorOnResumeSwitch());
        if (turnOn == true) {
            if (allReadyOn == false) {
                await this.ErrorOnResumeSwitch().tap();
            }
        } else if (turnOn == false) {
            if (allReadyOn == true) {
                await this.ErrorOnResumeSwitch().tap();
            }
        }
    }
    async SetNextDeliveryCommandUncertain(turnOn) {
        if (turnOn == null) {
            return;
        }
        let allReadyOn = await this.IsOn(this.NextDeliveryCommandUncertainSwitch());
        if (turnOn == true) {
            if (allReadyOn == false) {
                await this.NextDeliveryCommandUncertainSwitch().tap();
            }
        } else if (turnOn == false) {
            if (allReadyOn == true) {
                await this.NextDeliveryCommandUncertainSwitch().tap();
            }
        }
    }
    async _backToPumpSimulator() {
        await match.accessible.ButtonBarButton(this.screenText.PumpSettings).tap();
    }
    async _setValue(val) {
        var valField = match.UITextField();
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

module.exports = PumpSimulatorScreen;
