const { setup, pump, cgm, match, settings } = require('../../../../src/index');

describe('Pump Settings', () => {
    beforeAll(async () => {
        await setup.LaunchLoop();
        await setup.LoadDeviceScenariosFromDisk(device.id);
        await cgm.AddSimulator();
        await pump.AddSimulator();
    });
    describe('Closed loop allowed', () => {
        describe('When all settings enabled', () => {
            beforeAll(async () => {
                await setup.LoadScenario('flat_cgm');
            });
            // it('should have correction range set', async () => {
            //     await settings.CorrectionRanges([{ time: '12:00 AM', min: '179', max: '180' }]);
            // });
            // it('should set the suspend threshold', async () => {
            //     await settings.Suspend('130');
            // });
            // it('should set the basal rates', async () => {
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
            it('enable all settings', async () => {
                await settings.ApplyUsingDefaults();
            });
            it('should toggle on closed loop', async () => {
                await settings.ClosedLoop();
            });
            it('should not be in closed loop mode yet', async () => {
                await expect(match.loop.Icon()).toHaveLabel('Waiting for first run');
            });
            it.skip('should show no alert when tapping loop icon', async () => {
                //TODO: need a valid way to assert we are in closed loop mode
                await match.loop.Icon().tap();
            });
        });
    });
});