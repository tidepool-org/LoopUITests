const { loop } = require('../../src/index');

describe('guard rail correction range maximum warning is set to 120', () => {
    afterAll(async () => {
        await loop.RemoveData();
    });
    it('open settings add pump simulator, set correction range maximum to 120', async () => {
        await loop.Launch();
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                SetCorrectionRanges: [{ time: '12:00 AM', min: '119', max: '120' }]
            }
        });
    });
    it('close settings', async () => {
        await loop.screens.settings.Close();
    });
});

