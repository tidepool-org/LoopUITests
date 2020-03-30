const { loop } = require('../../src/index');

describe('gaurdrail correction range minimum warning is set to 70', () => {
    afterAll(async () => {
        await loop.app.RemoveData();
    });
    it('open settings add pump simulator, set correction range minimum warning to 70 ', async () => {
        await (await loop.app.Launch()).AndConfigure(
            {
                settings: {
                    AddPumpSimulator: true,
                    SetCorrectionRanges: [{ time: '12:00 AM', min: '70', max: '180' }]
                }
            }
        );
    });
    it('set correction range minimum warning to 70 ', async () => {
        await loop.screen.settings.SetCorrectionRanges([
            { time: '12:00 AM', min: '70', max: '180' }
        ]);
    });
    it('close settings', async () => {
        await screen.settings.Close();
    });
});

