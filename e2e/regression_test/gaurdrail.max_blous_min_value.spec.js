const { loop } = require('../../src/index');

describe('gaurdrail settings max bolus minimum allowed is 0 units', () => {
    afterAll(async () => {
        await loop.app.RemoveData();
    });
    it('open settings add pump simulator, set max bolus as 0 units', async () => {
        await (await loop.app.Launch()).AndConfigure(
            {
                settings: {
                    AddPumpSimulator: true,
                    SetDeliveryLimits: { maxBolus: '0.0', maxBasalRate: '1.0' }
                }
            }
        );
    });
    it('close settings', async () => {
        await loop.screen.settings.Close();
    });
});

