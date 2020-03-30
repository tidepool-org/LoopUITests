const { loop } = require('../../src/index');

describe('smoke test', () => {
    beforeAll(async () => {
        await loop.app.Launch();
    });
    describe('home screen', () => {
        it('has Active Carbohydrates section', async () => {
            await loop.screen.home.OpenActiveCarbohydratesChart();
            await loop.screen.home.CloseChart();
        });
        it('has Active Insulin section', async () => {
            await loop.screen.home.OpenActiveInsulinChart();
            await loop.screen.home.CloseChart();
        });
        it('has Insulin Delivery section', async () => {
            await loop.screen.home.OpenInsulinDeliveryChart();
            await loop.screen.home.CloseChart();
        });
        it('has Glucose section', async () => {
            await loop.screen.home.OpenGlucoseChart();
            await loop.screen.home.CloseChart();
        });
        it('has Loop icon', async () => {
            await loop.screen.home.ExpectLoopNotYetRun();
        });
        it('has Loop icon has alert when not setup', async () => {
            await loop.screen.home.ExpectLoopStatusGlucoseDataAlert();
        });
    });
    describe('settings', () => {
        beforeAll(async () => {
            await loop.screen.settings.Open();
        });
        afterAll(async () => {
            await loop.screen.settings.Close();
        });
        describe('general', () => {
            it('can be go set to closed loop', async () => {
                await loop.screen.settings.SetClosedLoop();
            });
            it('can be go set to open loop', async () => {
                await loop.screen.settings.SetOpenLoop();
            });
            it('can issue a report', async () => {
                await loop.screen.settings.IssueReportLabel();
            });
        });
        describe('cgm', () => {
            it('can be added', async () => {
                await loop.screen.settings.AddCGMSimulator();
            });
            it('can configure simulator', async () => {
                await loop.screen.settings.SetCGMSimulatorSettings(SettingDefault.CGMSimulatorSettings);
            });
        });
        describe('pump', () => {
            it('can be added', async () => {
                await loop.screen.settings.AddPumpSimulator();
            });
            it('set suspend threshold', async () => {
                await loop.screen.settings.SetSuspendThreshold(SettingDefault.SuspendThreshold);
            });
            it('set basal rates', async () => {
                await loop.screen.settings.SetBasalRates(SettingDefault.BasalRates);
            });
            it('set delivery limits', async () => {
                await loop.screen.settings.SetDeliveryLimits(SettingDefault.DeliveryLimits);
            });
            it('set insulin model', async () => {
                await loop.screen.settings.SetInsulinModel(SettingDefault.InsulinModel);
            });
            it('set carb ratios', async () => {
                await loop.screen.settings.SetCarbRatios(SettingDefault.CarbRatios);
            });
            it('set insulin sensitivites', async () => {
                await loop.screen.settings.SetInsulinSensitivities(SettingDefault.InsulinSensitivities);
            });
            it('set correction range', async () => {
                await loop.screen.settings.SetCorrectionRanges([{ time: '12:00 AM', min: '150', max: '170' }]);
            });
        });
    });
    describe('carb entry', () => {
        it('can be opened', async () => {
            await loop.screen.carbEntry.Open();
        });
        it('can be canecled', async () => {
            await loop.screen.carbEntry.Cancel();
        });
        it('can be set and saved without a bolus', async () => {
            await loop.screen.carbEntry.Open();
            await loop.screen.carbEntry.SetCarbs('30');
            await loop.screen.carbEntry.ContinueToBolus();
            await loop.screen.carbEntry.SaveWithoutBolus();
        });
        it('can be set and canceled', async () => {
            await loop.screen.carbEntry.Open();
            await loop.screen.carbEntry.SetCarbs('20');
            await loop.screen.carbEntry.Cancel();
        });
    });
    describe('bolus', () => {
        it('can be opened', async () => {
            await loop.screen.bolus.Open();
        });
        it('can be canceled', async () => {
            await loop.screen.bolus.Cancel();
        });
    });
    describe('cleanup', () => {
        it('opening settings', async () => {
            await loop.screen.settings.Open();
        });
        it('can remove pump data', async () => {
            await loop.screen.settings.RemovePumpData();
        });
        it('can remove pump', async () => {
            await loop.screen.settings.RemovePump();
        });
        it('can remove CGM data', async () => {
            await loop.screen.settings.RemoveCGMData();
        });
        it('can remove CGM', async () => {
            await loop.screen.settings.RemoveCGM();
        });
        it('closing settings', async () => {
            await loop.screen.settings.Close();
        });
    });
});
