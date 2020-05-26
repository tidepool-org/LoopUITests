const { setting, limits } = require('../../src/index');

var settingsScreenFunctionalityTests = (test) => {
    it('can open the settings', async () => {
        await test.settingsScreen.Open();
    });
    describe('general', () => {
        it('set to closed loop', async () => {
            await test.settingsScreen.SetClosedLoop();
        });
        it('set to open loop', async () => {
            await test.settingsScreen.SetOpenLoop();
        });
    });
    describe('cgm', () => {
        it('can be added', async () => {
            await test.settingsScreen.AddCGMSimulator();
        });
        it('can configure simulator', async () => {
            let screen = await test.settingsScreen.OpenCGMSimulatorScreen();
            await screen.Apply(setting.default.CGMSimulatorSettings);
            await screen.Close();
        });
    });
    describe('issue report', () => {
        var screen;
        it('can be opened', async () => {
            screen = await test.settingsScreen.OpenIssueReportScreen();
        });
        it('can closed', async () => {
            await screen.Close();
        });
    });
    describe('pump', () => {
        it('can be added', async () => {
            await test.settingsScreen.AddPumpSimulator();
        });
        it('set suspend threshold', async () => {
            let screen = await test.settingsScreen.OpenSuspendThresholdScreen();
            await screen.OpenPicker();
            await screen.Apply({ value: limits.suspendThreshold.min.noWarning }, 80);
            await screen.Save();
        });
        it('set basal rates', async () => {
            let screen = await test.settingsScreen.OpenBasalRatesScreen();
            await screen.ApplyAll(setting.default.BasalRates);
            await screen.Save();
            await screen.Close();
        });
        it('set delivery limits', async () => {
            let screen = await test.settingsScreen.OpenDeliveryLimitsScreen();
            await screen.Apply(setting.default.DeliveryLimits);
            await screen.Save();
            await screen.Close();
        });
        it('set insulin model', async () => {
            let screen = await test.settingsScreen.OpenInsulinModelScreen();
            await screen.Apply(setting.default.InsulinModel);
            await screen.Close();

        });
        it('set insulin sensitivites', async () => {
            let screen = await test.settingsScreen.OpenInsulinSensitivitiesScreen();
            await screen.Add();
            await screen.Apply(setting.default.InsulinSensitivities[0]);
            await screen.AddNewEntry();
            await screen.Save();

        });
        it('set correction range', async () => {
            let screen = await test.settingsScreen.OpenCorrectionRangeScreen();
            await screen.Add();
            await screen.Apply(setting.default.CorrectionRanges[0]);
            await screen.AddNewEntry();
            await screen.Save();
        });

        //TODO: update when development work complete
        it.skip('set carb ratios', async () => {
            let screen = await test.settingsScreen.OpenCarbRatiosScreen();
            await screen.ApplyAll(setting.default.CarbRatios);
            await screen.Close();
        });
    });
    it('can close the settings', async () => {
        await test.settingsScreen.Close();
    });
};

module.exports = {
    settingsScreenFunctionalityTests
};
