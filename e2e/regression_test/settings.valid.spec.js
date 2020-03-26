const { setup, loopSettings, screen, SettingDefault } = require('../../src/index');

describe('Closed loop is allowed when', () => {
    let config = {
        scenario: 'flat_cgm_trace',
        settings: SettingDefault,
    };
    beforeAll(async () => {
        await setup.LaunchLoop();
    });
    afterAll(async () => {
        await loopSettings.RemoveData();
    });
    it('we apply all settings', async () => {
        await loopSettings.Configure(config);
    });
    it('should not be in closed loop mode', async () => {
        await screen.home.ExpectLoopNotYetRun();
    });
    it('should advance the scenario so we are looping', async () => {
        await setup.AdvanceScenario(config.scenario, '1');
    });
    it('should have no status alert', async () => {
        await screen.home.ExpectNoLoopStatusAlert();
    });
});
