const { setup, pump, cgm, match, settings } = require('../../../../../src/index');

describe('Pump Settings', () => {
    beforeAll(async () => {
        await setup.LaunchLoop();
        await setup.LoadDeviceScenariosFromDisk(device.id);
        await cgm.AddSimulator();
        await pump.AddSimulator();
    });
    describe('Closed loop is not allowed', () => {
        describe('When basal rates are not set', () => {
            beforeAll(async () => {
                await setup.LoadScenario('flat_cgm');
            });
            // it('should NOT set the suspend threshold', async () => {
            //     await settings.Suspend('65');
            // });
            // it('should have correction range set', async () => {
            //     await settings.CorrectionRanges([{time: '12:00 AM', min:'179',max:'180'}]);
            // });
            // it.skip('should set the basal rates', async () => {
            //     await settings.BasalRates('0.1');
            // });
            // it('should set the delivery limits', async () => {
            //     await settings.DeliveryLimits('0.5', '10.0');
            // });
            // it('should set the insulin model', async () => {
            //     await settings.InsulinModel(settings.InsulinModels.RapidAdults);
            // });
            // it('should set the carb ratios', async () => {
            //     await settings.CarbRatios('8');
            // });
            // it('should set insulin sensitivites set', async () => {
            //     await settings.InsulinSensitivities('500');
            // });
            it('should set all apart from the basal rates ', async () => {
                await settings.ApplyUsingDefaults(settings.Setting.BasalRates);
            });
            it('should toggle on closed loop', async () => {
                await settings.ClosedLoop();
            });
            it('should not be in closed loop mode', async () => {
                await expect(match.loop.Icon()).toHaveLabel('Waiting for first run');
            });
            it('should show error that indicates why not in closed loop mode', async () => {
                await match.loop.Icon().tap();
                await waitFor(match.accessible.AlertLabel('Missing Data: Insulin Effects')).toExist().withTimeout(2000);
                await match.accessible.Button('OK').tap();
            });

        });
    });
});

