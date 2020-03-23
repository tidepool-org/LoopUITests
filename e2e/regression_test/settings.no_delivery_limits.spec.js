const { setup, loopSettings, screen, FilterSettings, SettingDefault, SettingType } = require('../../src/index');

describe('Closed loop is not allowed when settings', () => {
    beforeAll(async () => {
        await setup.LaunchLoop();
    });
    afterAll(async () => {
        await loopSettings.RemoveData();
    });
    it('are not applied for delivery limits', async () => {
        await loopSettings.Configure({
            scenario: 'flat_cgm_trace',
            settings: FilterSettings(SettingDefault, [SettingType.DeliveryLimits])
        });
    });
    it('should not be in closed loop mode', async () => {
        await screen.home.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        await screen.home.ExpectLoopStatusConfigurationAlert();
    });
});

