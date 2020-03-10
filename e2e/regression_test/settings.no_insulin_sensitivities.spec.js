const { setup, loopSettings, Status, FilterSettings, SettingDefault, SettingType } = require('../../src/index');

describe('Closed loop is not allowed when settings', () => {
    var status;
    beforeAll(async () => {
        await setup.LaunchLoop();
        status = new Status();
    });
    it('are not applied for insulin sensitivities', async () => {
        let config = {
            scenario: 'flat_cgm_trace',
            settings: FilterSettings(SettingDefault, [SettingType.InsulinSensitivities])
        };
        await loopSettings.Configure(config);
    });
    it('should not be in closed loop mode', async () => {
        await status.ExpectLoopNotYetRun();
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        await status.ExpectLoopStatusAlert('Missing Data: Carb Effects');
    });
});

