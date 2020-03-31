const { loop } = require('../../src/index');

describe('Closed loop is allowed when', () => {
    let config = {
        scenario: 'flat_cgm_trace',
        settings: loop.settings.default
    };
    afterAll(async () => {
        await loop.RemoveData();
    });
    it('we apply all settings', async () => {
        await loop.Launch();
        await loop.Configure(config);
    });
    it('should not be in closed loop mode', async () => {
        await loop.screens.home.ExpectLoopNotYetRun();
    });
    it('should advance the scenario so we are looping', async () => {
        await loop.AdvanceScenario(config.scenario, '1');
    });
    it('should have no status alert', async () => {
        await loop.screens.home.ExpectNoLoopStatusAlert();
    });
});
