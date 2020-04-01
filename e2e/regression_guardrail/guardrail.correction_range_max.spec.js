const { loop } = require('../../src/index');

describe('guardrail correction range maximum is set to 180', () => {
    it('launch loop', async () => {
        await loop.Launch();
    });
    it('open settings add pump simulator, set correction range maximum to 180', async () => {
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                CorrectionRanges: [{ time: '12:00 AM', min: '179', max: '180' }]
            }
        });
    });
});

