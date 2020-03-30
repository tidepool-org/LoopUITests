const { loop } = require('../../src/index');

describe('Closed loop is allowed when', () => {
    let config = {
        scenario: 'flat_cgm_trace',
        settings: loop.settings.default
    };
    afterAll(async () => {
        await loop.app.RemoveData();
    });
    it('we apply all settings', async () => {
        await loop.app.Launch().then(() => loop.app.Configure(config));
    });
    it('should not be in closed loop mode', async () => {
        await loop.screen.home.ExpectLoopNotYetRun();
    });
    it('should advance the scenario so we are looping', async () => {
        await loop.app.AdvanceScenario(config.scenario, '1');
    });
    it('should have no status alert', async () => {
        await loop.screen.home.ExpectNoLoopStatusAlert();
    });
});
