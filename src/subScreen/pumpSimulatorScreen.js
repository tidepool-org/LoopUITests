const match = require('../match');

class PumpSimulatorScreen {
    constructor(language) {
        this.language = language;
    }
    Header() {
        return match.accessible.Header(this.language.settingsScreen.BasalRates);
    }
    DoneButton() {
        return match.accessible.BackButton(this.language.general.Done);
    }
    DeletePumpButton() {
        return match.accessible.Label(this.language.settingsScreen.DeletePump)
    }
    CancelDeletePumpButton() {
        return match.accessible.Label(this.language.general.Cancel)
    }
    ReserviorRemainingLabel() {
        return match.accessible.Label(this.language.pumpSimulatorScreen.ReserviorRemaining);
    }
    BatteryRemainingLabel() {
        return match.accessible.Label(this.language.pumpSimulatorScreen.BatteryRemaining);
    }
    ErrorOnTempBasalLabel() {
        return match.accessible.Label(this.language.pumpSimulatorScreen.ErrorOnTempBasal);
    }
    ErrorOnBolusLabel() {
        return match.accessible.Label(this.language.pumpSimulatorScreen.ErrorOnBolus);
    }
    ErrorOnSuspendLabel() {
        return match.accessible.Label(this.language.pumpSimulatorScreen.ErrorOnSuspend);
    }
    ErrorOnResumeLabel() {
        return match.accessible.Label(this.language.pumpSimulatorScreen.ErrorOnResume);
    }
    async DeletePump() {
        await this.DeletePumpButton().atIndex(0).tap();
    }
    async ConfirmDeletePump() {
        await this.DeletePumpButton().atIndex(1).tap();
    }
    async CancelDeletePump() {
        await this.DeletePumpButton().tap();
    }
    async Close() {
        await this.DoneButton().tap();
    }
}

module.exports = {
    PumpSimulatorScreen
};
