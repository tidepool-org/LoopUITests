const { limits } = require('../../src/index');

var basalRateSchedules = (test) => {
    it('can set max limit', async () => {
        await test.settingsScreen.SetBasalRates(
            [{ time: '12:00 AM', unitsPerHour: limits.basalRates.max.limit }],
            { fromSettings: true, toSettings: false }
        );
        //TODO assert on warning
    });
    it('can set max warning', async () => {
        await test.settingsScreen.SetBasalRates(
            [{ time: '12:30 AM', unitsPerHour: limits.basalRates.max.warning - limits.basalRates.step }],
            { fromSettings: false, toSettings: false }
        );
        //TODO assert warning
    });
    it('can set below max warning', async () => {
        await test.settingsScreen.SetBasalRates(
            [{ time: '12:30 AM', unitsPerHour: limits.basalRates.max.warning - limits.basalRates.step }],
            { fromSettings: false, toSettings: false }
        );
        //TODO assert NO warning
    });
    it('can set above min ', async () => {
        await test.settingsScreen.SetBasalRates(
            [{ time: '1:00 AM', unitsPerHour: limits.basalRates.min.limit + limits.basalRates.step }],
            { fromSettings: false, toSettings: false }
        );
        //TODO assert NO warning
    });
    it('can set at min', async () => {
        await test.settingsScreen.SetBasalRates(
            [{ time: '1:30 AM', unitsPerHour: limits.basalRates.min.limit }],
            { fromSettings: false, toSettings: false }
        );
        //TODO assert on warning
    });
    it('cannot set above max limit', async () => {
        try {
            await test.settingsScreen.SetBasalRates(
                [{ time: '2:00 AM', unitsPerHour: limits.basalRates.max.limit + limits.basalRates.step }],
                { fromSettings: false, toSettings: false }
            );
        } catch (error) {
            //TODO assert cannot be set
        }
    });
    it('cannot set below the min limit', async () => {
        try {
            await test.settingsScreen.SetBasalRates(
                [{ time: '2:00 AM', unitsPerHour: limits.basalRates.min.limit - limits.basalRates.step }],
                { fromSettings: false, toSettings: false }
            );
        } catch (error) {
            //TODO assert cannot be set
        }
    });
};

module.exports = { basalRateSchedules };
