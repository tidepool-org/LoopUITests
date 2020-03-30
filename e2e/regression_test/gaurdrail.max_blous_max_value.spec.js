const { loop } = require('../../src/index');

describe('gaurdrail settings max bolus is set to pump maximum of 30 units', () => {
    afterAll(async () => {
        await loopSettings.RemoveData();
    });
    it('open settings add pump simulator, set max bolus as 30 units', async () => {
        await loop.app.Launch().then(() => loop.app.Configure({
            settings: {
                AddPumpSimulator: true,
                SetDeliveryLimits: { maxBolus: '30.0', maxBasalRate: '1.0' }
            }
        }));
    });
    it('close settings', await screen.settings.Close());
});

