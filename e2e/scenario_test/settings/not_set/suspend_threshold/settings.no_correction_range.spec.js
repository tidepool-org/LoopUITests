const { setup, pump, cgm, match, settings } = require('../../../../../src/index');

describe('Pump Settings', () => {
    beforeAll(async () => {
        await setup.LaunchLoop();
        await setup.LoadScenarios(device.id);
        await cgm.Add();
        await pump.Add();
    });
    // afterAll(async () => {
    //     await cgm.Remove();
    //     await pump.Remove();
    // });
    describe('Closed loop is not allowed', () => {
        describe('When suspend threshold is not set', () => {
            beforeAll(async () => {
                await setup.LoadScenario('flat_cgm');
            });
            // afterAll(async () => {
            //     await cgm.RemoveData();
            //     await pump.RemoveData();
            // });
            it('should NOT set the suspend threshold', async () => {
                await settings.CheckSuspend('');
            });
            it('should have correction range set', async () => {
                await settings.CorrectionRanges([{time: '12:00 AM', min:'179',max:'180'}]);
            });
            it('should set the basal rates', async () => {
                await settings.BasalRates('0.1');
            });
            it('should set the delivery limits', async () => {
                await settings.DeliveryLimits('0.5', '10.0');
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
                await expect(element(by.label('Waiting for first run').and(by.type('LoopUI.LoopCompletionHUDView')))).toExist();
            });
            it.skip('should show configuration error that indicates why not in closed loop mode', async () => {
                await element(by.label('Waiting for first run').and(by.type('LoopUI.LoopCompletionHUDView'))).tap();
                await expect(match.accessible.Label('Configuration Error: Check Settings')).toExist();
                await match.accessible.Button('OK').tap();
            });

        });
    });
});

