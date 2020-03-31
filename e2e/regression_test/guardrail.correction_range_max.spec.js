const { loop } = require('../../src/index');

describe('guardrail correction range maximum is set to 180', () => {
    afterAll(async () => {
        await loop.RemoveData();
    });
    it('open settings add pump simulator, set correction range maximum to 180', async () => {
        await loop.Launch()
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                SetCorrectionRanges: [{ time: '12:00 AM', min: '179', max: '180' }]
            }
        });
    });
    it('close settings', async () => {
        await loop.screens.settings.Close();
    });
});

