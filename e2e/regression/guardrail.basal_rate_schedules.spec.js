const { Test, screenName, limits } = require('../../src/index');

describe('guardrail basal rate schedules', () => {
    var test;
    it('should setup with pump simulator', async () => {
        test = new Test()
            .withSettings({ AddPumpSimulator: true })
            .withStartScreen(screenName.settings);
        await test.prepare();
    });
    it('can set maximum units with warning', async () => {
        await test.settingsScreen.SetBasalRates(
            [{ time: '12:00 AM', unitsPerHour: limits.basalRates.max.maximum }],
            { fromSettings: true, toSettings: false }
        );
        //TODO assert on warning
    });
    it('can set below maximum units without warning', async () => {
        await test.settingsScreen.SetBasalRates(
            [{ time: '12:30 AM', unitsPerHour: limits.basalRates.max.maximum - limits.basalRates.unitIncrement }],
            { fromSettings: false, toSettings: false }
        );
        //TODO assert NO warning
    });
    it('can set above minimum units without warning', async () => {
        await test.settingsScreen.SetBasalRates(
            [{ time: '1:00 AM', unitsPerHour: limits.basalRates.min.minimum + limits.basalRates.unitIncrement }],
            { fromSettings: false, toSettings: false }
        );
        //TODO assert NO warning
    });
    it('can set at minimum units with warning', async () => {
        await test.settingsScreen.SetBasalRates(
            [{ time: '1:30 AM', unitsPerHour: limits.basalRates.min.minimum }],
            { fromSettings: false, toSettings: false }
        );
        //TODO assert on warning
    });
    it('cannot set above maximum units', async () => {
        try {
            await test.settingsScreen.SetBasalRates(
                [{ time: '2:00 AM', unitsPerHour: limits.basalRates.max.maximum + limits.basalRates.unitIncrement }],
                { fromSettings: false, toSettings: false }
            );
        } catch (error) {
            //TODO assert cannot be set
        }
    });
    it('cannot set below the minimum units', async () => {
        try {
            await test.settingsScreen.SetBasalRates(
                [{ time: '2:00 AM', unitsPerHour: limits.basalRates.min.minimum - limits.basalRates.unitIncrement }],
                { fromSettings: false, toSettings: false }
            );
        } catch (error) {
            //TODO assert cannot be set
        }
    });
});

