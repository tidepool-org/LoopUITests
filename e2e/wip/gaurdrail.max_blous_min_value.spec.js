const { setup, loopSettings, screen } = require('../../src/index');

describe('gaurdrail settings max bolus minimum allowed is 0 units', () => {
    beforeAll(async () => {
        await setup.LaunchLoop();
    });
    afterAll(async () => {
        await loopSettings.RemoveData();
    });
    it('open settings and add pump simulator', async () => {
        await screen.settings.Open();
        await screen.settings.AddPumpSimulator();
    });
    it('set max bolus as 0 units ', async () => {
        await screen.settings.SetDeliveryLimits({ maxBolus: '0.0', maxBasalRate: '1.0' })
    });
    it('close settings', async () => {
        await screen.settings.Close();
    });
});

