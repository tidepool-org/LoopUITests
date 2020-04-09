const { loop } = require('../../src/index');

describe('guardrail insulin sensitivities', () => {
    it('cannot set 501 units', async () => {
        await loop.Launch();
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                InsulinSensitivities: [{ time: '12:00 AM', bgValuePerInsulinUnit: '501' }],
            }
        });
    });
    it('set 500 units, warning', async () => {
        await loop.Launch();
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                InsulinSensitivities: [{ time: '12:00 AM', bgValuePerInsulinUnit: '500' }],
            }
        });
        //TODO assert on warning
    });
    it('set 400 units, warning', async () => {
        await loop.Launch();
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                InsulinSensitivities: [{ time: '12:00 AM', bgValuePerInsulinUnit: '400' }],
            }
        });
        //TODO assert on warning
    });
    it('set 15 units, warning', async () => {
        await loop.Launch();
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                InsulinSensitivities: [{ time: '12:00 AM', bgValuePerInsulinUnit: '15' }],
            }
        });
        //TODO assert on warning
    });
    it('set 10 units, warning', async () => {
        await loop.Launch();
        await loop.Configure({
            settings: {
                AddPumpSimulator: true,
                InsulinSensitivities: [{ time: '12:00 AM', bgValuePerInsulinUnit: '10' }],
            }
        });
        //TODO assert on warning
    });
});

