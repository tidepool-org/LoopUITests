const { setup, match, settings, loopSettings} = require('../../../../src/index');

describe('Pump Settings', () => {
    beforeAll(async () => {
        await setup.LaunchLoop();
    });
    describe('Closed loop allowed', () => {
        describe('When all settings enabled', () => {
            it('should configure loop for test', async () => {
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
                await match.loop.Icon().tap();
            });
        });
    });
});