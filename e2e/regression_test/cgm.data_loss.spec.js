const { setup, loopSettings, screen, SettingDefault, CGMModel } = require('../../src/index');

describe.skip('Closed loop is stopped when we have cgm data loss', () => {
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
    it('cgm data is turned off', async () => {
        await screen.settings.SetCGMSimulatorSettings({ modelData: { bgValues: [], model: CGMModel.None } })
    });
    it('should have CGM data status alert', async () => {
        await screen.home.ExpectLoopStatusGlucoseDataAlert();
    });
});
