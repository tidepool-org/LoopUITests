const { limits } = require('../../src/index');

var basalRateScheduleTests = (test) => {
    var screen;
    it('open', async () => {
        screen = await test.settingsScreen.OpenBasalRatesScreen();
    });
    it('cannot set above max limit', async () => {
        try {
            await screen.Apply({ time: '12:00 AM', unitsPerHour: limits.basalRates.max.limit + limits.basalRates.step });
        } catch (error) {
            await screen.Save();
            //TODO assert cannot be set
        }
    });
    it('can set max limit', async () => {
        await screen.Edit({ time: '12:00 AM', unitsPerHour: limits.basalRates.max.limit });
        await screen.Save();
        //TODO assert on warning
    });
    it('can set max warning', async () => {
        await screen.Edit({ time: '12:00 AM', unitsPerHour: limits.basalRates.max.warning });
        await screen.Save();
        //TODO assert on warning
    });
    it('can set below max warning', async () => {
        await screen.Edit({ time: '12:00 AM', unitsPerHour: limits.basalRates.max.warning - limits.basalRates.step });
        await screen.Save();
        //TODO assert NO warning
    });
    it('can set above min ', async () => {
        await screen.Edit({ time: '12:00 AM', unitsPerHour: limits.basalRates.min.limit + limits.basalRates.step });
        await screen.Save();
        //TODO assert NO warning
    });
    it('can set at min', async () => {
        await screen.Edit({ time: '12:00 AM', unitsPerHour: limits.basalRates.min.limit });
        await screen.Save();
        //TODO assert on warning
    });
    it('cannot set below the min limit', async () => {
        try {
            await screen.Edit({ time: '12:00 AM', unitsPerHour: limits.basalRates.min.limit - limits.basalRates.step });
        } catch (error) {
            //TODO assert cannot be set
            await screen.Save();
        }
    });
    it('close', async () => {
        await screen.Close();
    });
};

module.exports = { basalRateScheduleTests };
