const { loop } = require('../../src/index');

describe('smoke test', () => {
    beforeAll(async () => {
        await loop.Launch();
    });
    describe('home screen', () => {
        it('has Active Carbohydrates section', async () => {
            await loop.screens.home.OpenActiveCarbohydratesChart();
            await loop.screens.home.CloseChart();
        });
        it('has Active Insulin section', async () => {
            await loop.screens.home.OpenActiveInsulinChart();
            await loop.screens.home.CloseChart();
        });
        it('has Insulin Delivery section', async () => {
            await loop.screens.home.OpenInsulinDeliveryChart();
            await loop.screens.home.CloseChart();
        });
        it('has Glucose section', async () => {
            await loop.screens.home.OpenGlucoseChart();
            await loop.screens.home.CloseChart();
        });
        it('has Loop icon', async () => {
            await loop.screens.home.ExpectLoopNotYetRun();
        });
        it('has Loop icon has alert when not setup', async () => {
            await loop.screens.home.ExpectLoopStatusGlucoseDataAlert();
        });
    });
    describe('settings', () => {
        beforeAll(async () => {
            await loop.screens.settings.Open();
        });
        afterAll(async () => {
            await loop.screens.settings.Close();
        });
        describe('general', () => {
            it('can be go set to closed loop', async () => {
                await loop.screens.settings.SetClosedLoop();
            });
            it('can be go set to open loop', async () => {
                await loop.screens.settings.SetOpenLoop();
            });
            it('can issue a report', async () => {
                loop.screens.settings.IssueReportLabel();
            });
        });
        describe('cgm', () => {
            it('can be added', async () => {
                await loop.screens.settings.AddCGMSimulator();
            });
            it('can configure simulator', async () => {
                await loop.screens.settings.SetCGMSimulatorSettings(loop.settings.default.CGMSimulatorSettings);
            });
        });
        describe('pump', () => {
            it('can be added', async () => {
                await loop.screens.settings.AddPumpSimulator();
            });
            it('set suspend threshold', async () => {
                await loop.screens.settings.SetSuspendThreshold(loop.settings.default.SuspendThreshold);
            });
            it('set basal rates', async () => {
                await loop.screens.settings.SetBasalRates(loop.settings.default.BasalRates);
            });
            it('set delivery limits', async () => {
                await loop.screens.settings.SetDeliveryLimits(loop.settings.default.DeliveryLimits);
            });
            it('set insulin model', async () => {
                await loop.screens.settings.SetInsulinModel(loop.settings.default.InsulinModel);
            });
            it('set carb ratios', async () => {
                await loop.screens.settings.SetCarbRatios(loop.settings.default.CarbRatios);
            });
            it('set insulin sensitivites', async () => {
                await loop.screens.settings.SetInsulinSensitivities(loop.settings.default.InsulinSensitivities);
            });
            it('set correction range', async () => {
                await loop.screens.settings.SetCorrectionRanges([{ time: '12:00 AM', min: '150', max: '170' }]);
            });
        });
    });
    describe('carb entry', () => {
        it('can be opened', async () => {
            await loop.screens.carbEntry.Open();
        });
        it('can be canecled', async () => {
            await loop.screens.carbEntry.Cancel();
        });
        it('can be set and saved without a bolus', async () => {
            await loop.screens.carbEntry.Open();
            await loop.screens.carbEntry.SetCarbs('30');
            await loop.screens.carbEntry.ContinueToBolus();
            await loop.screens.carbEntry.SaveWithoutBolus();
        });
        it('can be set and canceled', async () => {
            await loop.screens.carbEntry.Open();
            await loop.screens.carbEntry.SetCarbs('20');
            await loop.screens.carbEntry.Cancel();
        });
    });
    describe('bolus', () => {
        it('can be opened', async () => {
            await loop.screens.bolus.Open();
        });
        it('can be canceled', async () => {
            await loop.screens.bolus.Cancel();
        });
    });
    describe('cleanup', () => {
        it('opening settings', async () => {
            await loop.screens.settings.Open();
        });
        it('can remove pump data', async () => {
            await loop.screens.settings.RemovePumpData();
        });
        it('can remove pump', async () => {
            await loop.screens.settings.RemovePump();
        });
        it('can remove CGM data', async () => {
            await loop.screens.settings.RemoveCGMData();
        });
        it('can remove CGM', async () => {
            await loop.screens.settings.RemoveCGM();
        });
        it('closing settings', async () => {
            await loop.screens.settings.Close();
        });
    });
});
