const { loop } = require('../../src/index');

describe('guardrail settings max basal rate', () => {
    beforeAll(async () => {
        await loop.Launch();
        await loop.Configure({ settings: { AddPumpSimulator: true }, startScreen: loop.screens.name.settings });
    });

    it('set 35 units', async () => {
        await loop.screens.settings.SetDeliveryLimits({ maxBolus: '1.0', maxBasalRate: '35.0' });
        //TODO assert on warning
    });
    it('cannot set 36 units', async () => {
        await loop.screens.settings.SetDeliveryLimits({ maxBolus: '1.0', maxBasalRate: '36.0' });
        //TODO assert warning
    });
});

