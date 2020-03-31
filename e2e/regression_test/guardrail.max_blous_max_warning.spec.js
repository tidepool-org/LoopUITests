const { loop } = require('../../src/index');

describe('guardrail settings max bolus warns at 20 units', () => {
    afterAll(async () => {
        await loop.RemoveData();
    });
    it('open settings add pump simulator, set max bolus as 20 units', async () => {
        await loop.Launch();
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                SetDeliveryLimits: { maxBolus: '20.0', maxBasalRate: '1.0' }
            }
        });
    });
    it('close settings', async () => {
        await loop.screens.settings.Close();
    });
});

