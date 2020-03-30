const { loop } = require('../../src/index');

describe('gaurdrail settings max bolus is set to pump maximum of 30 units', () => {
    afterAll(async () => {
        await loopSettings.RemoveData();
    });
    it('open settings add pump simulator, set max bolus as 30 units', async () => {
        await (await loop.app.Launch()).AndConfigure(
            {
                settings: {
                    AddPumpSimulator: true,
                    SetDeliveryLimits: { maxBolus: '30.0', maxBasalRate: '1.0' }
                }
            }
        );
    });
    it('close settings', async () => {
        await screen.settings.Close();
    });
});

