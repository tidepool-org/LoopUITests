const match = require('./match');
const { settingsSubScreen } = require('./settingScreen/index');

class SettingsScreen {
    constructor(language, screenDefaults) {
        this.language = language;
        this.cgmSimulatorScreen = new settingsSubScreen.CGMSimulatorScreen(language);
        this.basalRatesScreen = new settingsSubScreen.BasalRatesScreen(language);
        this.deliveryLimitsScreen = new settingsSubScreen.DeliveryLimitsScreen(language);
        this.issueReportScreen = new settingsSubScreen.IssueReportScreen(language);
        this.insulinModelScreen = new settingsSubScreen.InsulinModelScreen(language);
        this.pumpSimulatorScreen = new settingsSubScreen.PumpSimulatorScreen(language);
        this.insulinSensitivitiesScreen = new settingsSubScreen.InsulinSensitivitiesScreen(language, screenDefaults.insulinSensitivity);
        this.correctionRangeScreen = new settingsSubScreen.CorrectionRangeScreen(language, screenDefaults.correctionRange);
        this.suspendThresholdScreen = new settingsSubScreen.SuspendThresholdScreen(language, screenDefaults.suspendThreshold);
        this.carbRatioScreen = new settingsSubScreen.CarbRatioScreen(language, screenDefaults.carbRatio);
    }
    async Open() {
        await match.accessible.ButtonBarButton(this.language.settingsScreen.Settings).tap();
    }
    async Close() {
        await this.DoneButton().tap();
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
    async OpenPumpSimulatorScreen() {
        await this.ScrollToTop();
        await match.accessible.Id('Simulator Small').tap();
        return this.pumpSimulatorScreen;
    }
    async OpenCGMSimulatorScreen() {
        await this.ScrollToTop();
        await this.CGMSimulatorLabel().tap();
        return this.cgmSimulatorScreen;
    }
    async OpenDeliveryLimitsScreen() {
        await this.DeliveryLimitsLabel().tap();
        return this.deliveryLimitsScreen;
    }
    async OpenInsulinSensitivitiesScreen() {
        await this.ScrollToBottom();
        await this.InsulinSensitivitiesLabel().tap();
        return this.insulinSensitivitiesScreen;
    }
    async OpenCorrectionRangeScreen() {
        await this.ScrollToTop();
        await this.CorrectionRangeLabel().tap();
        return this.correctionRangeScreen;
    }
    async OpenCarbRatioScreen() {
        await this.ScrollToBottom();
        await this.CarbRatiosLabel().tap();
        return this.carbRatioScreen;
    }
    async OpenSuspendThresholdScreen() {
        await this.SuspendThresholdLabel().tap();
        return this.suspendThresholdScreen;
    }
    DoneButton() {
        try {
            return match.accessible.ButtonBarButton(this.language.general.Done);
        } catch (error) {
            //sometimes there are multiples?
            return match.accessible.ButtonBarButton(this.language.general.Done).atIndex(0);
        }
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
        return match.accessible.Label(this.language.suspendThresholdSettingScreen.SuspendThreshold)
    }
    DeliveryLimitsLabel() {
        try {
            return match.accessible.Label(this.language.settingsScreen.DeliveryLimits);
        } catch (error) {
            //sometimes there are multiples?
            return match.accessible.Label(this.language.settingsScreen.DeliveryLimits).atIndex(1);
        }
    }
    InsulinModelLabel() {
        return match.accessible.Label(this.language.settingsScreen.InsulinModel)
    }
    CarbRatiosLabel() {
        return match.accessible.Label(this.language.carbRatioSettingsScreen.CarbRatios)
    }
    InsulinSensitivitiesLabel() {
        return match.accessible.Label(this.language.settingsScreen.InsulinSensitivities).atIndex(1);
    }
    CorrectionRangeLabel() {
        try {
            return match.accessible.Label(this.language.settingsScreen.CorrectionRange);
        } catch (error) {
            return match.accessible.Label(this.language.settingsScreen.CorrectionRange).atIndex(0);
        }
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
    RemoveCGMDataLabel() {
        return match.accessible.Label(this.language.settingsScreen.DeleteCGMData).atIndex(0);
    }
    RemoveCGMDataConfirmationLabel() {
        return match.accessible.Label(this.language.settingsScreen.DeleteCGMData).atIndex(1);
    }
    RemovePumpDataLabel() {
        return match.accessible.Label(this.language.settingsScreen.DeletePumpData).atIndex(0);
    }
    RemovePumpDataConfirmationLabel() {
        return match.accessible.Label(this.language.settingsScreen.DeletePumpData).atIndex(1);
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
            await match.accessible.Header(this.language.settingsScreen.Services).swipe('down', 'fast');
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
            await screen.SaveAndClose();
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
            await screen.SaveAndClose();
        }
        if (values.CarbRatios) {
            let screen = this.OpenCarbRatioScreen();
            await screen.ApplyAll(values.CarbRatios);
            await screen.SaveAndClose();
        }

        if (values.SuspendThreshold) {
            let screen = this.OpenSuspendThresholdScreen();
            await screen.Apply(values.SuspendThreshold);
            await screen.SaveAndClose();
        }

        if (values.InsulinModel) {
            let screen = this.OpenInsulinModelScreen();
            await screen.Apply(values.InsulinModel);
            await screen.Close();
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
    async RemoveCGMData() {
        await this.ScrollToBottom();
        //TODO static text and not a button?
        await this.RemoveCGMDataLabel().tap();
        await this.RemoveCGMDataConfirmationLabel().tap();
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
    async RemovePumpData() {
        await this.ScrollToBottom();
        //TODO static text and not a button?
        await this.RemovePumpDataLabel().tap();
        await this.RemovePumpDataConfirmationLabel().tap();
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
