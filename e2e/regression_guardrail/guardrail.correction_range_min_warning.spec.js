const { loop } = require('../../src/index');

describe('guardrail correction range minimum warning is set to 70', () => {
    it('launch loop', async () => {
        await loop.Launch();
    });
    it('open settings add pump simulator, set correction range minimum warning to 70 ', async () => {
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                CorrectionRanges: [{ time: '12:00 AM', min: '70', max: '180' }]
            }
        });
    });
});

