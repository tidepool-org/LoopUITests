const { loop } = require('../../src/index');

describe('guardrail set correction range minimum is set to 60', () => {
    afterAll(async () => {
        await loop.RemoveData();
    });
    it('open settings add pump simulator, set correction range minimum to 60', async () => {
        await loop.Launch()
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                SetCorrectionRanges: [{ time: '12:00 AM', min: '60', max: '180' }]
            }
        });
    });
    it('close settings', async () => {
        await loop.screens.settings.Close();
    });
});

