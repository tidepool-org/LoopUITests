const { setup, loopSettings, screen, SettingDefault } = require('../../src/index');

describe('Scheduled basal rate cannot be higher than the max basal rate', () => {
    beforeAll(async () => {
        await setup.LaunchLoop();
    });
    afterAll(async () => {
        await loopSettings.RemoveData();
    });
    it('configure settings with basal rate higher than max', async () => {
        var misMatchedBasalSettings = SettingDefault;
        misMatchedBasalSettings.DeliveryLimits = { maxBasalRate: '1.0', maxBolus: '10.0' };
        misMatchedBasalSettings.BasalRates = [{ time: '12:00 AM', unitsPerHour: '1.1' }];

        await loopSettings.Configure({
            scenario: 'flat_cgm_trace',
            settings: misMatchedBasalSettings,
        });
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        await screen.home.ExpectLoopStatusConfigurationAlert();
    });
});

