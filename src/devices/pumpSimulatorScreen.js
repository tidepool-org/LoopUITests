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
        });
    }
    get ConfigurationHeader() {
        return match.accessible.Header(this.screenText.ConfigurationHeader).atIndex(0);
    }
    get ReservoirRemainingLabel() {
        return match.Label(this.screenText.ReservoirRemaining);
    }
    get BatteryRemainingLabel() {
        return match.accessible.TextLabel(this.screenText.BatteryRemaining);
    }
    get ErrorOnTempBasalLabel() {
        return match.accessible.TextLabel(this.screenText.ErrorOnTempBasal);
    }
    get ErrorOnTempBasalSwitch() {
        return match.accessible.SwitchButton(this.screenText.ErrorOnTempBasal);
    }
    get ErrorOnBolusLabel() {
        return match.accessible.TextLabel(this.screenText.ErrorOnBolus);
    }
    get ErrorOnBolusSwitch() {
        return match.accessible.SwitchButton(this.screenText.ErrorOnBolus);
    }
    get ErrorOnSuspendLabel() {
        return match.accessible.TextLabel(this.screenText.ErrorOnSuspend);
    }
    get ErrorOnSuspendSwitch() {
        return match.accessible.SwitchButton(this.screenText.ErrorOnSuspend);
    }
    get ErrorOnResumeLabel() {
        return match.accessible.TextLabel(this.screenText.ErrorOnResume);
    }
    get ErrorOnResumeSwitch() {
        return match.accessible.SwitchButton(this.screenText.ErrorOnResume);
    }
    get NextDeliveryCommandUncertainSwitch() {
        return match.accessible.SwitchButton(this.screenText.NextDeliveryCommandUncertain);
    }
    get DeletePumpLabel() {
        return match.accessible.TextLabel(this.screenText.DeletePump);
    }
    get DeletePumpConfirmationLabel() {
        return match.accessible.AlertButton(this.screenText.DeletePump);
    }
    get SuspendDeliveryButton() {
        return match.Label(this.screenText.SuspendDelivery);
    }
    get ResumeDeliveryButton() {
        return match.accessible.TextLabel(this.screenText.ResumeDelivery);
    }
    get DetectOcclusionButton() {
        return match.Label(this.screenText.DetectOcclusion);
    }
    get ResolveOcclusionButton() {
        return match.Label(this.screenText.ResolveOcclusion);
    }
    get CausePumpErrorButton() {
        return match.Label(this.screenText.CausePumpError);
    }
    get ResolvePumpErrorButton() {
        return match.Label(this.screenText.ResolvePumpError);
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
        let allReadyOn = await this.IsOn(this.ErrorOnBolusSwitch);
        if (turnOn == true) {
            if (allReadyOn == false) {
                await this.ErrorOnBolusSwitch.tap();
            }
        } else if (turnOn == false) {
            if (allReadyOn == true) {
                await this.ErrorOnBolusSwitch.tap();
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
        let allReadyOn = await this.IsOn(this.ErrorOnSuspendSwitch);
        if (turnOn == true) {
            if (allReadyOn == false) {
                await this.ErrorOnSuspendSwitch.tap();
            }
        } else if (turnOn == false) {
            if (allReadyOn == true) {
                await this.ErrorOnSuspendSwitch.tap();
            }
        }
    }
    async SetErrorOnResume(turnOn) {
        if (turnOn == null) {
            return;
        }
        let allReadyOn = await this.IsOn(this.ErrorOnResumeSwitch);
        if (turnOn == true) {
            if (allReadyOn == false) {
                await this.ErrorOnResumeSwitch.tap();
            }
        } else if (turnOn == false) {
            if (allReadyOn == true) {
                await this.ErrorOnResumeSwitch.tap();
            }
        }
    }
    async SetNextDeliveryCommandUncertain(turnOn) {
        if (turnOn == null) {
            return;
        }
        let allReadyOn = await this.IsOn(this.NextDeliveryCommandUncertainSwitch);
        if (turnOn == true) {
            if (allReadyOn == false) {
                await this.NextDeliveryCommandUncertainSwitch.tap();
            }
        } else if (turnOn == false) {
            if (allReadyOn == true) {
                await this.NextDeliveryCommandUncertainSwitch.tap();
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
        await this.BatteryRemainingLabel.tap();
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
        await this.ReservoirRemainingLabel.tap();
        await this._setValue(units);
        await this._backToPumpSimulator();
    }
    async RemoveSimulator() {
        await this.SwipeUpUntilVisible(this.DeletePumpLabel);
        await this.DeletePumpLabel.tap();
        await this.DeletePumpConfirmationLabel.tap();
    }
    async HasAlert() {
        await expect(match.accessible.Alert()).toExist();
    }
    get OKDismissAlertButton() {
        return match.accessible.AlertButton(this.generalText.OK);
    }
    get DoneButton() {
        return match.accessible.ButtonBarButton(this.generalText.Done)
    }
}

module.exports = PumpSimulatorScreen;
