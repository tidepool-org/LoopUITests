const { setup, match, settings, loopSettings } = require('../../../../src/index');

describe('Pump Settings', () => {
    beforeAll(async () => {
        await setup.LaunchLoop();
    });
    describe('Closed loop allowed', () => {
        let config = {
            scenario: 'flat_cgm_trace',
            settings: settings.Defaults,
        };
        it('should configure loop applying all settings', async () => {
            await loopSettings.Configure(config);
        });
        it('should advance the scenario so we are looping', async () => {
            await setup.AdvanceScenario(config.scenario,'1');
        });
        it('should not be in closed loop mode yet', async () => {
            await expect(match.loop.Icon()).toHaveLabel('Waiting for first run');
        });
        it('should show no alert when tapping loop icon', async () => {
            //TODO: need a valid way to assert we are in closed loop mode
            await match.loop.Icon().tap();
        });
    });
});