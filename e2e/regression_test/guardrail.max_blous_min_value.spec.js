const { loop } = require('../../src/index');

describe('guardrail settings max bolus minimum allowed is 0 units', () => {
    afterAll(async () => {
        await loop.RemoveData();
    });
    it('open settings add pump simulator, set max bolus as 0 units', async () => {
        await loop.Launch();
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                SetDeliveryLimits: { maxBolus: '0.0', maxBasalRate: '1.0' }
            }
        });
    });
    it('close settings', async () => {
        await loop.screens.settings.Close();
    });
});

