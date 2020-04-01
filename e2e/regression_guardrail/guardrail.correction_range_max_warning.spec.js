const { loop } = require('../../src/index');

describe('guard rail correction range maximum warning is set to 120', () => {
    it('launch loop', async () => {
        await loop.Launch();
    });
    it('open settings add pump simulator, set correction range maximum to 120', async () => {
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                CorrectionRanges: [{ time: '12:00 AM', min: '119', max: '120' }]
            }
        });
    });
});

