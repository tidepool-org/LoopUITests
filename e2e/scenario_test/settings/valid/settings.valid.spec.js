const { setup, match, settings, loopSettings } = require('../../../../src/index');

describe('Pump Settings', () => {
    beforeAll(async () => {
        await setup.LaunchLoop();
    });
    describe('Closed loop allowed', () => {
        it('should configure loop applying all settings', async () => {
            let config = {
                scenario: 'flat_cgm',
                settings: settings.Filter(settings.Defaults)
            };
            await loopSettings.Configure(config);
        });
        it('should not be in closed loop mode yet', async () => {
            await expect(match.loop.Icon()).toHaveLabel('Waiting for first run');
        });
        it.skip('should show no alert when tapping loop icon', async () => {
            //TODO: need a valid way to assert we are in closed loop mode
            await waitFor(match.loop.Icon()).toBeVisible().withTimeout(2000);
            await match.loop.Icon().tap();
        });
    });
});