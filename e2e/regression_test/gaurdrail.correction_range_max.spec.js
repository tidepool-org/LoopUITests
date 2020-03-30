const { loop } = require('../../src/index');

describe('gaurdrail correction range maximum is set to 180', () => {
    afterAll(async () => {
        await loop.app.RemoveData();
    });
    it('open settings add pump simulator, set correction range maximum to 180', async () => {
        await loop.app.Launch().then(() => loop.app.Configure({
            settings: {
                AddPumpSimulator: true,
                SetCorrectionRanges: [{ time: '12:00 AM', min: '179', max: '180' }]
            }
        }));
    });
    it('close settings', async () => {
        await loop.screen.settings.Close();
    });
});

