const { setup, loopSettings, screen } = require('../../src/index');

describe('gaurdrail correction range minimum warning is set to 70', () => {
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
    it('set correction range minimum warning to 70 ', async () => {
        await screen.settings.SetCorrectionRanges([
            { time: '12:00 AM', min: '70', max: '180' }
        ]);
    });
    it('close settings', async () => {
        await screen.settings.Close();
    });
});

