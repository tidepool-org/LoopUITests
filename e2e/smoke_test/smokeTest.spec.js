const { setup, screen, SettingDefault } = require('../../src/index');

describe('smoke test', () => {
    beforeAll(async () => {
        await setup.LaunchLoop();
    });
    describe('home screen', () => {
        it('has Active Carbohydrates section', async () => {
            await screen.home.OpenActiveCarbohydratesChart();
            await screen.home.CloseChart();
        });
        it('has Active Insulin section', async () => {
            await screen.home.OpenActiveInsulinChart();
            await screen.home.CloseChart();
        });
        it('has Insulin Delivery section', async () => {
            await screen.home.OpenInsulinDeliveryChart();
            await screen.home.CloseChart();
        });
        it('has Glucose section', async () => {
            await screen.home.OpenGlucoseChart();
            await screen.home.CloseChart();
        });
        it('has Loop icon', async () => {
            await screen.home.ExpectLoopNotYetRun();
        });
        it('has Loop icon has alert when not setup', async () => {
            await screen.home.ExpectLoopStatusGlucoseDataAlert();
        });
    });
    describe('settings', () => {
        beforeAll(async () => {
            await screen.settings.Open();
        });
        afterAll(async () => {
            await screen.settings.Close();
        });
        describe('general', () => {
            it('can be go set to closed loop', async () => {
                await screen.settings.SetClosedLoop();
            });
            it('can be go set to open loop', async () => {
                await screen.settings.SetOpenLoop();
            });
            it('can issue a report', async () => {
                await screen.settings.IssueReportLabel();
            });
        });
        describe('cgm', () => {
            it('can be added', async () => {
                await screen.settings.AddCGMSimulator();
            });
            it('can configure simulator', async () => {
                await screen.settings.SetCGMSimulatorSettings(SettingDefault.CGMSimulatorSettings);
            });
        });
        describe('pump', () => {
            it('can be added', async () => {
                await screen.settings.AddPumpSimulator();
            });
            it('set suspend threshold', async () => {
                await screen.settings.SetSuspendThreshold(SettingDefault.SuspendThreshold);
            });
            it('set basal rates', async () => {
                await screen.settings.SetBasalRates(SettingDefault.BasalRates);
            });
            it('set delivery limits', async () => {
                await screen.settings.SetDeliveryLimits(SettingDefault.DeliveryLimits);
            });
            it('set insulin model', async () => {
                await screen.settings.SetInsulinModel(SettingDefault.InsulinModel);
            });
            it('set carb ratios', async () => {
                await screen.settings.SetCarbRatios(SettingDefault.CarbRatios);
            });
            it('set insulin sensitivites', async () => {
                await screen.settings.SetInsulinSensitivities(SettingDefault.InsulinSensitivities);
            });
            it('set correction range', async () => {
                await screen.settings.SetCorrectionRanges([{ time: '12:00 AM', min: '150', max: '170' }]);
            });
        });
    });
    describe('carb entry', () => {
        it('can be opened', async () => {
            await screen.carbEntry.Open();
        });
        it('can be canecled', async () => {
            await screen.carbEntry.Cancel();
        });
        it('can be set and saved without a bolus', async () => {
            await screen.carbEntry.Open();
            await screen.carbEntry.SetCarbs('30');
            await screen.carbEntry.ContinueToBolus();
            await screen.carbEntry.SaveWithoutBolus();
        });
        it('can be set and canceled', async () => {
            await screen.carbEntry.Open();
            await screen.carbEntry.SetCarbs('20');
            await screen.carbEntry.Cancel();
        });
    });
    describe('bolus', () => {
        it('can be opened', async () => {
            await screen.bolus.Open();
        });
        it('can be canceled', async () => {
            await screen.bolus.Cancel();
        });
    });
    describe.skip('temporary override', () => {
        it('can be opened', async () => {
            await screen.overrides.Open();
        });
        it('can be canceled', async () => {
            await screen.overrides.Cancel();
        });
    });
    describe('cleanup', () => {
        it('opening settings', async () => {
            await screen.settings.Open();
        });
        it('can remove pump data', async () => {
            await screen.settings.RemovePumpData();
        });
        it('can remove pump', async () => {
            await screen.settings.RemovePump();
        });
        it('can remove CGM data', async () => {
            await screen.settings.RemoveCGMData();
        });
        it('can remove CGM', async () => {
            await screen.settings.RemoveCGM();
        });
        it('closing settings', async () => {
            await screen.settings.Close();
        });
    });
});
