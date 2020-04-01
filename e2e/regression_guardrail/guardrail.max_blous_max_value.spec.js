const { loop } = require('../../src/index');

describe('guardrail settings max bolus is set to pump maximum of 30 units', () => {
    it('launch loop', async () => {
        await loop.Launch();
    });
    it('open settings add pump simulator, set max bolus as 30 units', async () => {
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                DeliveryLimits: { maxBolus: '30.0', maxBasalRate: '1.0' }
            }
        });
    });
});

