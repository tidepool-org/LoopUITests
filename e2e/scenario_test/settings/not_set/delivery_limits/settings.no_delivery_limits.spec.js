const { setup, pump, cgm, match, settings } = require('../../../../../src/index');

describe('Pump Settings', () => {
    beforeAll(async () => {
        await setup.LaunchLoop();
        await setup.LoadDeviceScenariosFromDisk(device.id);
        await cgm.AddSimulator();
        await pump.AddSimulator();
    });
    describe('Closed loop is not allowed', () => {
        describe('When delivery limits are not set', () => {
            beforeAll(async () => {
                await setup.LoadScenario('flat_cgm');
            });
            it('should set all apart from delivery limits', async () => {
                await settings.Apply(settings.Filter(['DeliveryLimits']));
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

