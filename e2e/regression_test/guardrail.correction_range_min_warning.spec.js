const { loop } = require('../../src/index');

describe('guardrail correction range minimum warning is set to 70', () => {
    afterAll(async () => {
        await loop.RemoveData();
    });
    it('open settings add pump simulator, set correction range minimum warning to 70 ', async () => {
        await loop.Launch();
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                SetCorrectionRanges: [{ time: '12:00 AM', min: '70', max: '180' }]
            }
        });
    });
    it('close settings', async () => {
        await loop.screens.settings.Close();
    });
});

