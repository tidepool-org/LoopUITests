const { loop } = require('../../src/index');

describe('guardrail settings max bolus warns at 20 units', () => {
    it('launch loop', async () => {
        await loop.Launch();
    });
    it('open settings add pump simulator, set max bolus as 20 units', async () => {
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                DeliveryLimits: { maxBolus: '20.0', maxBasalRate: '1.0' }
            }
        });
    });
});

