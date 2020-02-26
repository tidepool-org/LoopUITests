const { setup, match, settings, loopSettings} = require('../../../../../src/index');

describe('Pump Settings', () => {
    beforeAll(async () => {
        await setup.LaunchLoop();
    });
    describe('Closed loop is not allowed', () => {
        it('should configure loop for test', async () => {
            let config = {
                scenario: 'flat_cgm',
                settings: settings.Filter(settings.Defaults,[settings.Type.DeliveryLimits])
            };
            await loopSettings.Configure(config);
        });
        describe('When delivery limits are not set', () => {
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

