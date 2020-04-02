const { loop } = require('../../src/index');

describe('max temp basal for corrections is either pump maximum or 35 u/hr if the pump doesn’t have a maximum', () => {
    it('launch loop', async () => {
        await loop.Launch();
    });
    it('open settings add pump simulator, max basal rate set over 35 units', async () => {
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                DeliveryLimits: { maxBolus: '1.0', maxBasalRate: '45.0' }
            }
        });
    });
});

