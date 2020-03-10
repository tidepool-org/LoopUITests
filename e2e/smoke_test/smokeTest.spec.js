const { setup, Carbs, Status, Bolus, Overrides, Settings, SettingDefault, CGMModel, CGMEffect } = require('../../src/index');

describe('smoke test', () => {
    var settings;
    var carbs;
    var bolus;
    var overrides;
    var status;
    beforeAll(async () => {
        await setup.LaunchLoop();
        settings = new Settings();
        carbs = new Carbs();
        bolus = new Bolus();
        overrides = new Overrides();
        status = new Status();
    });
    describe('status screen', () => {
        it('has Active Carbohydrates section', async () => {
            await status.OpenActiveCarbohydratesChart();
            await status.CloseChart();
        });
        it('has Active Insulin section', async () => {
            await status.OpenActiveInsulinChart();
            await status.CloseChart();
        });
        it('has Insulin Delivery section', async () => {
            await status.OpenInsulinDeliveryChart();
            await status.CloseChart();
        });
        it('has Glucose section', async () => {
            await status.OpenGlucoseChart();
            await status.CloseChart();
        });
        it('has Loop icon', async () => {
            await status.ExpectLoopNotYetRun();
        });
        it('has Loop icon has alert when not setup', async () => {
            await status.ExpectLoopStatusAlert('Missing Data: Glucose Data Not Available');
        });
    });
    describe('settings', () => {
        beforeAll(async () => {
            await settings.Open();
        });
        afterAll(async () => {
            await settings.Close();
        });

        describe('general', () => {
            it('can be go set to closed loop', async () => {
                await settings.ClosedLoop();
            });
            it('can be go set to open loop', async () => {
                await settings.OpenLoop();
            });
            it('can issue a report', async () => {
                await settings.IssueReport();
            });
        });
        describe('cgm', () => {
            it('can be added', async () => {
                await settings.AddCGMSimulator();
            });
            it('can configure simulator model', async () => {
                await settings.SetCGMModel(CGMModel.Constant, ['114']);
            });
            it('can configure simulator effect', async () => {
                await settings.SetCGMEffect(CGMEffect.GlucoseNoise);
            });
        });
        describe('pump', () => {
            it('can be added', async () => {
                await settings.AddPumpSimulator();
            });
            it('set suspend threshold', async () => {
                await settings.SetSuspendThreshold(SettingDefault.SuspendThreshold);
            });
            it('set basal rates', async () => {
                await settings.SetBasalRates(SettingDefault.BasalRates);
            });
            it('set delivery limits', async () => {
                await settings.SetDeliveryLimits(SettingDefault.DeliveryLimits);
            });
            it('set insulin model', async () => {
                await settings.SetInsulinModel(SettingDefault.InsulinModel);
            });
            it('set carb ratios', async () => {
                await settings.SetCarbRatios(SettingDefault.CarbRatios);
            });
            it('set insulin sensitivites', async () => {
                await settings.SetInsulinSensitivities(SettingDefault.InsulinSensitivities);
            });
            it('set correction range', async () => {
                await settings.SetCorrectionRanges(SettingDefault.CorrectionRanges);
            });
        });
    });
    describe('carbs', () => {
        it('can be opened', async () => {
            await carbs.Open();
        });
        it('can be canecled', async () => {
            await carbs.Cancel();
        });
        it('can be set and saved without a bolus', async () => {
            await carbs.Open();
            await carbs.SetCarbs('30');
            await carbs.SaveWithoutBolus();
        });
        it('can be set and canceled', async () => {
            await carbs.Open();
            await carbs.SetCarbs('20');
            await carbs.Cancel();
        });
    });
    describe('bolus', () => {
        it('can be opened', async () => {
            await bolus.Open();
        });
        it('can be canceled', async () => {
            await bolus.Cancel();
        });
    });
    describe('temporary override', () => {
        it('can be opened', async () => {
            await overrides.Open();
        });
        it('can be canceled', async () => {
            await overrides.Cancel();
        });
    });
    describe('cleanup', () => {
        it('opening settings', async () => {
            await settings.Open();
        });
        it('can remove pump data', async () => {
            await settings.RemovePumpData();
        });
        it('can remove pump', async () => {
            await settings.RemovePump();
        });
        it('can remove CGM data', async () => {
            await settings.RemoveCGMData();
        });
        it('can remove CGM', async () => {
            await settings.RemoveCGM();
        });
        it('closing settings', async () => {
            await settings.Close();
        });
    });
});
