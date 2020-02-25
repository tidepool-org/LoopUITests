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
            it('enable all settings', async () => {
                await settings.Apply(settings.Defaults);
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