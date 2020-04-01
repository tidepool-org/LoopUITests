const { loop } = require('../../src/index');

describe('guardrail settings max bolus minimum allowed is 0 units', () => {
    it('launch loop', async () => {
        await loop.Launch();
    });
    it('open settings add pump simulator, set max bolus as 0 units', async () => {
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                DeliveryLimits: { maxBolus: '0.0', maxBasalRate: '1.0' }
            }
        });
    });
});

