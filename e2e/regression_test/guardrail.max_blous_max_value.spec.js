const { loop } = require('../../src/index');

describe('guardrail settings max bolus is set to pump maximum of 30 units', () => {
    afterAll(async () => {
        await loop.RemoveData();
    });
    it('open settings add pump simulator, set max bolus as 30 units', async () => {
        await loop.Launch();
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                SetDeliveryLimits: { maxBolus: '30.0', maxBasalRate: '1.0' }
            }
        });
    });
    it('close settings', async () => {
        await loop.screens.settings.Close()
    });
});

