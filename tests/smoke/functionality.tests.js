const { setting, limits } = require('../../src/index');

var homeScreenFunctionalityTests = (test) => {
    it('has Active Carbohydrates section', async () => {
        await test.homeScreen.OpenActiveCarbohydratesChart();
        await test.homeScreen.CloseChart();
    });
    it('has Active Insulin section', async () => {
        await test.homeScreen.OpenActiveInsulinChart();
        await test.homeScreen.CloseChart();
    });
    it('has Insulin Delivery section', async () => {
        await test.homeScreen.OpenInsulinDeliveryChart();
        await test.homeScreen.CloseChart();
    });
    it('has Glucose section', async () => {
        await test.homeScreen.OpenGlucoseChart();
        await test.homeScreen.CloseChart();
    });
    it('has Loop icon', async () => {
        await test.homeScreen.ExpectLoopNotYetRun();
    });
    it.skip('has Loop icon has alert when not setup', async () => {
        await test.homeScreen.ExpectLoopStatusGlucoseDataAlert();
    });
};

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
        it('open issue report', async () => {
            await test.settingsScreen.OpenIssueReport();
        });
        it('close issue report', async () => {
            await test.settingsScreen.CloseIssueReport();
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
            await test.settingsScreen.SetInsulinModel(setting.default.InsulinModel);
        });
        //TODO: update when development work complete
        it.skip('set carb ratios', async () => {
            let screen = await test.settingsScreen.OpenCarbRatiosScreen();
            await screen.ApplyAll(setting.default.CarbRatios);
            await screen.Close();
        });
        //TODO: update when development work complete
        it.skip('set insulin sensitivites', async () => {
            let screen = await test.settingsScreen.OpenInsulinSensitivitiesScreen();
            await screen.ApplyAll(setting.default.InsulinSensitivities);
            await screen.Save();
            await screen.Close();
        });
        //TODO: update when development work complete
        it.skip('set correction range', async () => {
            let screen = await test.settingsScreen.OpenCorrectionRangeScreen();
            await screen.OpenPicker();
            await screen.SetTime('12:00 AM');
            await screen.Apply({
                min: limits.correctionRange.max.limit,
                max: limits.correctionRange.max.limit,
            });
            await screen.Save();
            await screen.Close();
        });
    });
    it('can close the settings', async () => {
        await test.settingsScreen.Close();
    });
};

var carbEntryScreenFunctionalityTests = (test) => {
    it('open dialog', async () => {
        await test.carbEntryScreen.Open();
    });
    it('cancel dialog', async () => {
        await test.carbEntryScreen.Cancel();
    });
    it('set carbs and save without a bolus', async () => {
        await test.carbEntryScreen.Open();
        await test.carbEntryScreen.SetCarbs('30');
        await test.carbEntryScreen.ContinueToBolus();
        await test.carbEntryScreen.SaveWithoutBolus();
    });
};

var cleanupFunctionalityTests = (test) => {
    it('open settings', async () => {
        await test.settingsScreen.Open();
    });
    it('remove pump data', async () => {
        await test.settingsScreen.RemovePumpData();
    });
    it('remove pump', async () => {
        await test.settingsScreen.RemovePump();
    });
    it.skip('remove CGM data', async () => {
        await test.settingsScreen.RemoveCGMData();
    });
    it.skip('remove CGM', async () => {
        await test.settingsScreen.RemoveCGM();
    });
    it('close settings', async () => {
        await test.settingsScreen.Close();
    });
};

module.exports = {
    settingsScreenFunctionalityTests,
    homeScreenFunctionalityTests,
    carbEntryScreenFunctionalityTests,
    cleanupFunctionalityTests
};
