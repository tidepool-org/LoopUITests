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
        applySettings.CorrectionRanges = [{ time: '12:00 AM', min: '120', max: '140' }];
        applySettings.SuspendThreshold = { value: '150' };
        await loopSettings.Configure({
            scenario: 'flat_cgm_trace',
            settings: applySettings
        });
    });
    it('should not be in closed loop mode', async () => {
        await screen.home.ExpectLoopNotYetRun();
    });
    it('should show no alert error', async () => {
        await screen.home.ExpectNoLoopStatusAlert();
    });
    it('should show no alert error', async () => {
        await screen.bolus.Open();

    });
});
