const { setup, pump, cgm, match, settings } = require('../../../../../src/index');

describe('Pump Settings', () => {
    beforeAll(async () => {
        await setup.LaunchLoop();
        await setup.LoadScenarios(device.id);
        await cgm.Add();
        await pump.Add();
    });
    describe('Closed loop is not allowed', () => {
        describe('When delivery limits are not set', () => {
            beforeAll(async () => {
                await setup.LoadScenario('flat_cgm');
            });
            it('should NOT set the suspend threshold', async () => {
                await settings.Suspend('75');
            });
            it('should have correction range set', async () => {
                await settings.CorrectionRanges([{time: '12:00 AM', min:'179',max:'180'}]);
            });
            it('should set the basal rates', async () => {
                await settings.BasalRates('0.1')
            });
            it('should not set the max basal rate delivery limits', async () => {
                await settings.DeliveryLimits('', '10.0');
            });
            it('should set the insulin model', async () => {
                await settings.InsulinModel(settings.InsulinModels.RapidAdults);
            });
            it('should set the carb ratios', async () => {
                await settings.CarbRatios('8');
            });
            it('should set insulin sensitivites set', async () => {
                await settings.InsulinSensitivities('500');
            });
            it('should toggle on closed loop', async () => {
                await settings.ClosedLoop();
            });
            it('should not be in closed loop mode', async () => {
                await expect(match.loop.Icon()).toHaveLabel('Waiting for first run');
            });
            it('should show configuration error that indicates why not in closed loop mode', async () => {
                await match.loop.Icon().tap();
                await waitFor(match.accessible.AlertLabel('Configuration Error: Check Settings')).toExist().withTimeout(2000);
                await match.accessible.Button('OK').tap();
            });
        });
    });
});

