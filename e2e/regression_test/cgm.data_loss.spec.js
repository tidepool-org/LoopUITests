const { loop } = require('../../src/index');

describe.skip('Closed loop is stopped when we have cgm data loss', () => {
    let config = {
        scenario: 'flat_cgm_trace',
        settings: loop.settings.default,
    };
    beforeAll(async () => {
        await (await loop.app.Launch()).AndConfigure(config);
    });
    afterAll(async () => {
        await loop.app.RemoveData();
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
    it('cgm data is turned off', async () => {
        await loop.screen.settings.SetCGMSimulatorSettings({ modelData: { bgValues: [], model: loop.settings.cgmModel.None } })
    });
    it('should have CGM data status alert', async () => {
        await loop.screen.home.ExpectLoopStatusGlucoseDataAlert();
    });
});
