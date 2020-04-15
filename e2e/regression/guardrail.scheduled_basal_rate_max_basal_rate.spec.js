const { loop } = require('../../src/index');

describe('guardrail settings basal rate cannot be higher than the max basal rate', () => {
    it('launch loop', async () => {
        await loop.Launch();
    });
    it('configure with delivery limits', async () => {
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                DeliveryLimits: { maxBasalRate: '1.0', maxBolus: '10.0' },
            },
            startScreen: loop.screens.name.settings,
        });
    });
    it('set basal rate higher than max basal rate', async () => {
        await loop.screens.settings.SetBasalRates([{ time: '12:00 AM', unitsPerHour: '1.1' }]);
        //TODO assert warning
    });
});

