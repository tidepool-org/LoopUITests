const { setup, loopSettings, screen } = require('../../src/index');

describe('gaurdrail correction range maximum is set to 180', () => {
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
    it('set correction range maximum to 180 ', async () => {
        await screen.settings.SetCorrectionRanges([{ time: '12:00 AM', min: '179', max: '180' }]);
    });
    it('close settings', async () => {
        await screen.settings.Close();
    });
});

