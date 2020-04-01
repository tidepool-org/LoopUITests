const { loop } = require('../../src/index');

describe('guardrail set correction range minimum is set to 60', () => {
    it('launch loop', async () => {
        await loop.Launch();
    });
    it('open settings add pump simulator, set correction range minimum to 60', async () => {
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                CorrectionRanges: [{ time: '12:00 AM', min: '60', max: '180' }]
            }
        });
    });
});

