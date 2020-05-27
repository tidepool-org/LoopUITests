const match = require('../match');

class PumpSimulatorScreen {
    constructor(language) {
        this.language = language;
    }
    Header() {
        return match.accessible.Header(this.language.pumpSimulatorSettingsScreen.PumpSettings);
    }
    DoneButton() {
        return match.accessible.BackButton(this.language.general.Done);
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
    ErrorOnBolusLabel() {
        return match.accessible.Label(this.language.pumpSimulatorSettingsScreen.ErrorOnBolus);
    }
    ErrorOnSuspendLabel() {
        return match.accessible.Label(this.language.pumpSimulatorSettingsScreen.ErrorOnSuspend);
    }
    ErrorOnResumeLabel() {
        return match.accessible.Label(this.language.pumpSimulatorSettingsScreen.ErrorOnResume);
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



    async Close() {
        await this.DoneButton().tap();
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
