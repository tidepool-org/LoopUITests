const { loop } = require('../../src/index');

describe('Scheduled basal rate cannot be higher than the max basal rate', () => {
    afterAll(async () => {
        await loop.app.RemoveData();
    });
    it('setup without Insulin Sensitivities applied', async () => {
        var misMatchedBasalSettings = loop.settings.default;
        misMatchedBasalSettings.DeliveryLimits = { maxBasalRate: '1.0', maxBolus: '10.0' };
        misMatchedBasalSettings.BasalRates = [{ time: '12:00 AM', unitsPerHour: '1.1' }];
        await loop.app.Launch().then(() => loop.app.Configure({
            scenario: 'flat_cgm_trace',
            settings: misMatchedBasalSettings
        }));
    });
    it('should show error that indicates why not in closed loop mode', async () => {
        await loop.screen.home.ExpectLoopStatusConfigurationAlert();
    });
});

