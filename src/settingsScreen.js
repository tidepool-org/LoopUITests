const match = require('./match');
const { settingsSubScreen } = require('./subScreen/index');

class SettingsScreen {
    constructor(language) {
        this.language = language;
        this.cgmSimulatorScreen = new settingsSubScreen.CGMSimulatorScreen(language);
        this.basalRatesScreen = new settingsSubScreen.BasalRatesScreen(language);
        this.deliveryLimitsScreen = new settingsSubScreen.DeliveryLimitsScreen(language);
        this.carbRatiosScreen = new settingsSubScreen.CarbRatiosScreen(language);
        this.issueReportScreen = new settingsSubScreen.IssueReportScreen(language);
        this.insulinModelScreen = new settingsSubScreen.InsulinModelScreen(language);
        //TODO: decide where to set these configuration values
        this.insulinSensitivitiesScreen = new settingsSubScreen.InsulinSensitivitiesScreen(language, { maxStart: 500 });
        this.correctionRangeScreen = new settingsSubScreen.CorrectionRangeScreen(language, { maxStart: 120, minStart: 100 });
        this.suspendThresholdScreen = new settingsSubScreen.SuspendThresholdScreen(language, { start: 80 });
    }
    async _selectPumpSimulator() {
        await match.accessible.Id('Simulator Small').tap();
    }
    async Open() {
        await match.accessible.ButtonBarButton(this.language.settingsScreen.Settings).tap();
    }
    async Close() {
        try {
            await this.DoneButton().tap();
        } catch (error) {
            //sometimes there are multiples?
            await this.DoneButton().atIndex(0).tap();
        }
    }
    async OpenInsulinModelScreen() {
        await this.InsulinModelLabel().tap();
        return this.insulinModelScreen;
    }
    async OpenIssueReportScreen() {
        await this.IssueReportLabel().tap();
        return this.issueReportScreen;
    }
    async OpenBasalRatesScreen() {
        await this.BasalRatesLabel().tap();
        return this.basalRatesScreen;
    }
    async OpenCGMSimulatorScreen() {
        await this.ScrollToTop();
        await this.CGMSimulatorLabel().tap();
        return this.cgmSimulatorScreen;
    }
    async OpenDeliveryLimitsScreen() {
        try {
            await this.DeliveryLimitsLabel().tap();
        } catch (error) {
            //sometimes there are multiples?
            await this.DeliveryLimitsLabel().atIndex(1).tap();
        }
        return this.deliveryLimitsScreen;
    }
    async OpenInsulinSensitivitiesScreen() {
        await this.ScrollToBottom();
        await this.InsulinSensitivitiesLabel().atIndex(1).tap();
        return this.insulinSensitivitiesScreen;
    }
    async OpenCorrectionRangeScreen() {
        await this.ScrollToTop();
        try {
            await this.CorrectionRangeLabel().tap();
        } catch (error) {
            await this.CorrectionRangeLabel().atIndex(0).tap();
        }
        return this.correctionRangeScreen;
    }
    async OpenCarbRatiosScreen() {
        await this.CarbRatiosLabel().tap();
        return this.carbRatiosScreen;
    }
    async OpenSuspendThresholdScreen() {
        await this.SuspendThresholdLabel().tap();
        return this.suspendThresholdScreen;
    }
    DoneButton() {
        return match.accessible.ButtonBarButton(this.language.general.Done);
    }
    ConfigurationHeader() {
        return match.accessible.Header(this.language.settingsScreen.Configuration);
    }
    ServicesHeader() {
        return match.accessible.Header(this.language.settingsScreen.Services);
    }
    PumpHeader() {
        return match.accessible.Header(this.language.settingsScreen.Pump);
    }
    ContinuousGlucoseMonitorHeader() {
        return match.accessible.Header(this.language.settingsScreen.ContinuousGlucoseMonitor);
    }
    SettingsHeader() {
        return match.accessible.Header(this.language.settingsScreen.Settings);
    }
    BasalRatesLabel() {
        return match.accessible.Label(this.language.settingsScreen.BasalRates)
    }
    SuspendThresholdLabel() {
        return match.accessible.Label(this.language.settingsScreen.SuspendThreshold)
    }
    DeliveryLimitsLabel() {
        return match.accessible.Label(this.language.settingsScreen.DeliveryLimits)
    }
    InsulinModelLabel() {
        return match.accessible.Label(this.language.settingsScreen.InsulinModel)
    }
    CarbRatiosLabel() {
        return match.accessible.Label(this.language.settingsScreen.CarbRatios)
    }
    InsulinSensitivitiesLabel() {
        return match.accessible.Label(this.language.settingsScreen.InsulinSensitivities)
    }
    CorrectionRangeLabel() {
        return match.accessible.Label(this.language.settingsScreen.CorrectionRange);
    }
    ClosedLoopButton() {
        return match.accessible.Button(this.language.settingsScreen.ClosedLoop);
    }
    IssueReportLabel() {
        return match.accessible.Label(this.language.settingsScreen.IssueReport);
    }
    AddPumpLabel() {
        return match.accessible.Label(this.language.settingsScreen.AddPump);
    }
    PumpSimulatorLabel() {
        return match.accessible.LabelAndId(this.language.settingsScreen.Simulator, 'Simulator Small');
    }
    AddCGMLabel() {
        return match.accessible.Label(this.language.settingsScreen.AddCGM);
    }
    CGMSimulatorLabel() {
        try {
            return match.accessible.Label(this.language.settingsScreen.Simulator).atIndex(1);
        } catch (err) {
            try {
                return match.accessible.Label(this.language.settingsScreen.Simulator).atIndex(0);
            } catch (err2) {
                return match.accessible.Label(this.language.settingsScreen.Simulator).atIndex(2);
            }
        }
    }
    async ScrollToBottom() {
        try {
            await expect(match.accessible.Label(this.language.settingsScreen.Services)).toBeVisible();
        } catch (err) {
            await match.accessible.Header(this.language.settingsScreen.Configuration).swipe('up', 'fast');
        }
    }
    async ScrollToTop() {
        try {
            await expect(match.accessible.Label(this.language.settingsScreen.ClosedLoop)).toBeVisible();
        } catch (err) {
            await match.accessible.Label(this.language.settingsScreen.Services).swipe('down', 'fast');
        }
    }
    /**
     * @summary helper function to set settings by applying configured values
     * @param  values list of settings that will not be applied
     */
    async Apply(values) {
        if (values.AddCGMSimulator) {
            await this.AddCGMSimulator();
        }
        if (values.AddPumpSimulator) {
            await this.AddPumpSimulator();
        }
        if (values.CGMSimulatorSettings) {
            let screen = this.OpenCGMSimulatorScreen();
            await screen.Apply(values.CGMSimulatorSettings);
            await screen.Close();
        }
        if (values.CorrectionRanges) {
            let screen = this.OpenCorrectionRangeScreen();
            await screen.ApplyAll(values.CorrectionRanges);
            await screen.Save();
            await screen.Close();
        }
        if (values.BasalRates) {
            let screen = this.OpenBasalRatesScreen();
            await screen.ApplyAll(values.BasalRates);
            await screen.Save();
            await screen.Close();
        }
        if (values.DeliveryLimits) {
            let screen = this.OpenDeliveryLimitsScreen();
            await screen.Apply(values.DeliveryLimits);
            await screen.Save();
            await screen.Close();
        }
        if (values.InsulinSensitivities) {
            let screen = this.OpenInsulinSensitivitiesScreen();
            await screen.ApplyAll(values.InsulinSensitivities);
            await screen.Save();
            await screen.Close();
        }
        if (values.CarbRatios) {
            let screen = this.OpenCarbRatiosScreen();
            await screen.ApplyAll(values.CarbRatios);
            await screen.Close();
        }

        if (values.SuspendThreshold) {
            let screen = this.OpenSuspendThresholdScreen();
            await screen.Apply(values.SuspendThreshold);
            await screen.Save()
        }

        if (values.InsulinModel) {
            let screen = this.OpenInsulinModelScreen();
            await screen.Apply(values.InsulinModel);
            await screen.Close()
        }

        if (values.ClosedLoop) {
            if (values.ClosedLoop == true) {
                await this.SetClosedLoop();
            } else if (values.ClosedLoop == false) {
                await this.SetOpenLoop();
            }
        }
    }
    async SetClosedLoop() {
        await this.ScrollToTop();
        //NOTE: not elegant but try catch approach is used by others in detox tests
        try {
            await this.ClosedLoopButton().tap();
            await waitFor(this.ClosedLoopButton()).toHaveValue('1').withTimeout(2000);
        } catch (err) {
            await waitFor(this.ClosedLoopButton()).toHaveValue('0').withTimeout(2000);
            await this.ClosedLoopButton().tap();
        }
    }
    async SetOpenLoop() {
        await this.ScrollToTop();
        //NOTE: not elegant but try catch approach is used by others in detox tests
        try {
            await this.ClosedLoopButton().tap();
            await waitFor(this.ClosedLoopButton()).toHaveValue('0').withTimeout(2000);
        } catch (err) {
            await waitFor(this.ClosedLoopButton()).toHaveValue('1').withTimeout(2000);
            await this.ClosedLoopButton().tap();
        }
    }
    async AddCGMSimulator() {
        await this.AddCGMLabel().tap();
        await match.accessible.Button(this.language.settingsScreen.Simulator).tap();
    }
    async RemoveCGM() {
        await this.ScrollToTop();
        await this.cgmSimulatorScreen.Open();
        await this.cgmSimulatorScreen.RemoveSimulator();
        await this.cgmSimulatorScreen.Close();
    }
    async RemoveCGMData() {
        await this.ScrollToBottom();
        //TODO static text and not a button?
        await match.accessible.Label(this.language.settingsScreen.DeleteCGMData).atIndex(0).tap();
        await match.accessible.Label(this.language.settingsScreen.DeleteCGMData).atIndex(1).tap();
    }
    async AddPumpSimulator() {
        try {
            await this.AddPumpLabel().atIndex(1).tap();
        } catch (err) {
            await this.AddPumpLabel().atIndex(0).tap();
        }
        await match.accessible.Button(this.language.settingsScreen.Simulator).tap();
        await match.accessible.Button(this.language.general.Continue).tap();
    }
    async RemovePump() {
        await this.ScrollToTop();
        await this._selectPumpSimulator();
        //TODO static text and not a button?
        await match.accessible.Label(this.language.settingsScreen.DeletePump).tap();
        await match.accessible.Label(this.language.settingsScreen.DeletePump).atIndex(1).tap();
    }
    async RemovePumpData() {
        await this.ScrollToBottom();
        //TODO static text and not a button?
        await match.accessible.Label(this.language.settingsScreen.DeletePumpData).atIndex(0).tap();
        await match.accessible.Label(this.language.settingsScreen.DeletePumpData).atIndex(1).tap();
    }
    async HasAlert() {
        await expect(match.accessible.Alert()).toExist();
    }
    async DismissAlert() {
        await match.accessible.AlertButton(this.language.general.OK).tap();
    }
}

module.exports = {
    SettingsScreen
};
