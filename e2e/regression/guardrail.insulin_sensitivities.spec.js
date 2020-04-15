const { loop } = require('../../src/index');

describe('guardrail insulin sensitivities', () => {
    beforeAll(async () => {
        await loop.Launch();
        await loop.Configure({ settings: { AddPumpSimulator: true }, startScreen: loop.screens.name.settings });
    });

    it('set 500 units, warning', async () => {
        await loop.screens.settings.SetInsulinSensitivities([{ time: '12:00 AM', bgValuePerInsulinUnit: '500' }]);
        //TODO assert on warning
    });
    it('set 400 units, warning', async () => {
        await loop.screens.settings.SetInsulinSensitivities([{ time: '12:30 AM', bgValuePerInsulinUnit: '400' }]);
        //TODO assert on warning
    });
    it('set 15 units, warning', async () => {
        await loop.screens.settings.SetInsulinSensitivities([{ time: '1:00 AM', bgValuePerInsulinUnit: '15' }]);
        //TODO assert on warning
    });
    it('set 10 units, warning', async () => {
        await loop.screens.settings.SetInsulinSensitivities([{ time: '1:30 AM', bgValuePerInsulinUnit: '10' }]);
        //TODO assert on warning
    });
    it('cannot set 9 units', async () => {
        try {
            await loop.screens.settings.SetInsulinSensitivities([{ time: '2:00 PM', bgValuePerInsulinUnit: '9' }]);
        } catch (error) {
            //TODO assert cannot be set
        }
    });
    it('cannot set 501 units', async () => {
        try {
            await loop.screens.settings.SetInsulinSensitivities([{ time: '2:30 PM', bgValuePerInsulinUnit: '501' }]);
        } catch (error) {
            //TODO assert cannot be set
        }
    });
});

