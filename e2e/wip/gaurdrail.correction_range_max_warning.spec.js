const { setup, loopSettings, screen } = require('../../src/index');

describe('gaurdrail correction range maximum warning is set to 120', () => {
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
    it('set correction range maximum to 120 ', async () => {
        await screen.settings.SetCorrectionRanges([{ time: '12:00 AM', min: '119', max: '120' }]);
    });
    it('close settings', async () => {
        await screen.settings.Close();
    });
});

