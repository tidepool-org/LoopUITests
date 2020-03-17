const { setup, loopSettings, screen, SettingDefault } = require('../../src/index');

describe('Closed loop is not allowed when settings', () => {
    beforeAll(async () => {
        await setup.LaunchLoop();
    });
    afterAll(async () => {
        await loopSettings.RemoveData();
    });
    it('are applied with correction ranges below suspend threshold', async () => {
        let applySettings = SettingDefault;
        applySettings.SuspendThreshold = { value: '161' };
        await loopSettings.Configure({
            scenario: 'flat_cgm_trace',
            settings: applySettings
        });
    });
    it('should not be in closed loop mode', async () => {
        await screen.home.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        await screen.home.ExpectLoopStatusAlert('Configuration Error: Check Settings');
    });
});
