const { setting } = require('../../src/index');

var homeScreen = (test) => {
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
    it('has Loop icon has alert when not setup', async () => {
        await test.homeScreen.ExpectLoopStatusGlucoseDataAlert();
    });
};

var settingsScreen = (test) => {
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
            await test.settingsScreen.SetCGMSimulatorSettings(setting.default.CGMSimulatorSettings);
        });
    });
    describe('pump', () => {
        it('can be added', async () => {
            await test.settingsScreen.AddPumpSimulator();
        });
        it.skip('set suspend threshold', async () => {
            await test.settingsScreen.SetSuspendThreshold(setting.default.SuspendThreshold);
        });
        it('set basal rates', async () => {
            await test.settingsScreen.SetBasalRates(setting.default.BasalRates);
        });
        it('set delivery limits', async () => {
            await test.settingsScreen.SetDeliveryLimits(setting.default.DeliveryLimits);
        });
        it('set insulin model', async () => {
            await test.settingsScreen.SetInsulinModel(setting.default.InsulinModel);
        });
        it('set carb ratios', async () => {
            await test.settingsScreen.SetCarbRatios(setting.default.CarbRatios);
        });
        it('set insulin sensitivites', async () => {
            await test.settingsScreen.SetInsulinSensitivities(setting.default.InsulinSensitivities);
        });
        it('set correction range', async () => {
            await test.settingsScreen.SetCorrectionRanges([{ time: '12:00 AM', min: '150', max: '170' }]);
        });
    });
    it('can close the settings', async () => {
        await test.settingsScreen.Close();
    });
};


var carbEntryScreen = (test) => {
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

var cleanup = (test) => {
    it('open settings', async () => {
        await test.settingsScreen.Open();
    });
    it('remove pump data', async () => {
        await test.settingsScreen.RemovePumpData();
    });
    it('remove pump', async () => {
        await test.settingsScreen.RemovePump();
    });
    it('remove CGM data', async () => {
        await test.settingsScreen.RemoveCGMData();
    });
    it.skip('remove CGM', async () => {
        await test.settingsScreen.RemoveCGM();
    });
    it('close settings', async () => {
        await test.settingsScreen.Close();
    });
};

var generalTests = {
    settingsScreen,
    homeScreen,
    carbEntryScreen,
    cleanup
};


module.exports = {
    generalTests
};
