const { loop } = require('../../src/index');

describe('gaurdrail set correction range minimum is set to 60', () => {
    afterAll(async () => {
        await loopSettings.RemoveData();
    });
    it('open settings add pump simulator, set correction range minimum to 60', async () => {
        await loop.app.Launch().then(() => loop.app.Configure({
            settings: {
                AddPumpSimulator: true,
                SetCorrectionRanges: [{ time: '12:00 AM', min: '60', max: '180' }]
            }
        }));
    });
    it('close settings', async () => {
        await screen.settings.Close();
    });
});

