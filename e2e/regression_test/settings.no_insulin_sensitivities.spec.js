const { setup, loopSettings, screen, FilterSettings, SettingDefault, SettingType } = require('../../src/index');

describe('Closed loop is not allowed when settings', () => {
    beforeAll(async () => {
        await setup.LaunchLoop();
    });
    afterAll(async () => {
        await loopSettings.RemoveData();
    });
    it('are not applied for insulin sensitivities', async () => {
        await loopSettings.Configure({
            scenario: 'flat_cgm_trace',
            settings: FilterSettings(SettingDefault, [SettingType.InsulinSensitivities])
        });
    });
    it('should not be in closed loop mode', async () => {
        await screen.home.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        await screen.home.ExpectLoopStatusAlert('Missing Data: Carb Effects');
    });
});

