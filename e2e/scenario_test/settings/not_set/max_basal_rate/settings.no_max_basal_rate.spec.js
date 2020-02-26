const { setup, pump, cgm, match, settings } = require('../../../../../src/index');

describe.skip('Pump Settings', () => {
    beforeAll(async () => {
        await setup.LaunchLoop();
        await setup.LoadScenarios(device.id);
        await cgm.Add();
        await pump.Add();
    });
    //The Pump simulator means we can't set delivary limits independant of each other yet
    describe('Closed loop is not allowed', () => {
        describe('When delivery limits are not set', () => {
            beforeAll(async () => {
                await setup.LoadScenario('flat_cgm');
            });
            it('should set all apart from max basal rate delivery limit', async () => {
                await settings.Apply(settings.Filter(['DeliveryLimits']));
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

