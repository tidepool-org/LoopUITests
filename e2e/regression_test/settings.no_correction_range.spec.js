const { setup, loopSettings, HomeScreen, FilterSettings, SettingDefault, SettingType } = require('../../src/index');

describe('Closed loop is not allowed when settings', () => {
    var home;
    beforeAll(async () => {
        await setup.LaunchLoop();
        home = new HomeScreen();
    });
    it('are not applied for correction ranges', async () => {
        let config = {
            scenario: 'flat_cgm_trace',
            settings: FilterSettings(SettingDefault, [SettingType.CorrectionRanges])
        };
        await loopSettings.Configure(config);
    });
    it('should not be in closed loop mode', async () => {
        await home.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        await home.ExpectLoophomeAlert('Configuration Error: Check Settings');
    });
});
