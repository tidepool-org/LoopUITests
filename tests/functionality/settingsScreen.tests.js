var settingsScreenFunctionalityTests = (test) => {
    var settingsScreen;
    it('can open the settings', async () => {
        settingsScreen = await test.OpenSettingsScreen();
    });
    describe('general', () => {
        it('set to closed loop', async () => {
            await settingsScreen.SetClosedLoop();
        });
        it('set to open loop', async () => {
            await settingsScreen.SetOpenLoop();
        });
    });
    describe('cgm', () => {
        it('can be added', async () => {
            await settingsScreen.AddCGMSimulator();
        });
        it('can configure simulator', async () => {
            let screen = await settingsScreen.OpenCGMSimulatorScreen();
            await screen.Apply(test.settingDefault.CGMSimulatorSettings);
            await screen.Close();
        });
    });
    describe('issue report', () => {
        var screen;
        it('can be opened', async () => {
            screen = await settingsScreen.OpenIssueReportScreen();
        });
        it('can closed', async () => {
            await screen.Close();
        });
    });
    describe('pump', () => {
        it('can be added', async () => {
            await settingsScreen.AddPumpSimulator();
        });
        it.skip('set suspend threshold', async () => {
            let screen = await settingsScreen.OpenSuspendThresholdScreen();
            await screen.OpenPicker();
            await screen.ApplyOne(test.settingDefault.SuspendThreshold);
            await screen.SaveAndClose();
        });
        //TODO: update when gaurdrails work is complete
        it.skip('set basal rates', async () => {
            let screen = await settingsScreen.OpenBasalRatesScreen();
            await screen.ApplyAll(test.settingDefault.BasalRates);
            await screen.Save();
            await screen.Close();
        });
        it('set delivery limits', async () => {
            let screen = await settingsScreen.OpenDeliveryLimitsScreen();
            await screen.Apply(test.settingDefault.DeliveryLimits);
            await screen.Save();
            await screen.Close();
        });
        it('set insulin model', async () => {
            let screen = await settingsScreen.OpenInsulinModelScreen();
            await screen.Apply(test.settingDefault.InsulinModel);
            await screen.Close();

        });
        it('set insulin sensitivites', async () => {
            let screen = await settingsScreen.OpenInsulinSensitivitiesScreen();
            await screen.ApplyAll(test.settingDefault.InsulinSensitivities);
            await screen.SaveAndClose();

        });
        it('set correction range', async () => {
            let screen = await settingsScreen.OpenCorrectionRangeScreen();
            await screen.ApplyAll(test.settingDefault.CorrectionRanges);
            await screen.SaveAndClose();
        });
        it('set carb ratios', async () => {
            let screen = await settingsScreen.OpenCarbRatioScreen();
            await screen.ApplyAll(test.settingDefault.CarbRatios);
            await screen.SaveAndClose();
        });
        it('data can be removed', async () => {
            await settingsScreen.RemovePumpData();
        });
        it('pump can be removed', async () => {
            let screen = await this.OpenPumpSimulatorScreen();
            await screen.RemoveSimulator();
        });
    });
    it('can close the settings', async () => {
        await settingsScreen.Close();
    });
};

module.exports = {
    settingsScreenFunctionalityTests
};
