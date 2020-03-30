const { loop } = require('../../src/index');

describe('gaurdrail settings max bolus warns at 20 units', () => {
    afterAll(async () => {
        await loop.app.RemoveData();
    });
    it('open settings add pump simulator, set max bolus as 20 units', async () => {
        await (await loop.app.Launch()).AndConfigure(
            {
                settings: {
                    AddPumpSimulator: true,
                    SetDeliveryLimits: { maxBolus: '20.0', maxBasalRate: '1.0' }
                }
            }
        );
    });
    it('close settings', async () => {
        await loop.screen.settings.Close();
    });
});

