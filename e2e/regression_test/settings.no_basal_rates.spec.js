const { setup, match, settings, loopSettings } = require('../../src/index');

describe('Closed loop is not allowed when settings', () => {
    beforeAll(async () => {
        await setup.LaunchLoop();
    });
    // afterAll(async () => {
    //     await device.uninstallApp();
    // });
    it('are not applied for basal rates', async () => {
        let config = {
            scenario: 'flat_cgm_trace',
            settings: settings.Filter(settings.Defaults, [settings.Type.BasalRates])
        };
        await loopSettings.Configure(config);
    });
    it('should not be in closed loop mode', async () => {
        await expect(match.loop.Icon()).toHaveLabel('Waiting for first run');
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        await waitFor(match.loop.Icon()).toBeVisible().withTimeout(2000);
        await match.loop.Icon().tap();
        await waitFor(match.accessible.AlertLabel('Missing Data: Insulin Effects')).toExist().withTimeout(2000);
        await match.accessible.Button('OK').tap();
    });
});

