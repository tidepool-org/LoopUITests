const { setup, loopSettings, HomeScreen, FilterSettings, SettingDefault, SettingType } = require('../../src/index');

describe('Closed loop is not allowed when settings', () => {
    var home;
    beforeAll(async () => {
        await setup.LaunchLoop();
        home = new HomeScreen();
    });
    it('are not applied for insulin sensitivities', async () => {
        let config = {
            scenario: 'flat_cgm_trace',
            settings: FilterSettings(SettingDefault, [SettingType.InsulinSensitivities])
        };
        await loopSettings.Configure(config);
    });
    it('should not be in closed loop mode', async () => {
        await home.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        await home.ExpectLoophomeAlert('Missing Data: Carb Effects');
    });
});

