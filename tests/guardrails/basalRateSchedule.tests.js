var basalRateScheduleTests = (test) => {
    var screen;
    var screenLimit;
    beforeAll(async () => {
        screen = await test.settingsScreen.OpenBasalRatesScreen();
        screenLimit = test.limits.basalRates;
    });
    afterAll(async () => {
        await screen.Close();
    });
    it('cannot set above max limit', async () => {
        try {
            await screen.Apply({ time: '12:00 AM', unitsPerHour: screenLimit.max.limit + screenLimit.step });
        } catch (error) {
            await screen.Save();
            //TODO assert cannot be set
        }
    });
    it('can set max limit', async () => {
        await screen.Edit({ time: '12:00 AM', unitsPerHour: screenLimit.max.limit });
        await screen.Save();
        //TODO assert on warning
    });
    it('can set max warning', async () => {
        await screen.Edit({ time: '12:00 AM', unitsPerHour: screenLimit.max.warning });
        await screen.Save();
        //TODO assert on warning
    });
    it('can set below max warning', async () => {
        await screen.Edit({ time: '12:00 AM', unitsPerHour: screenLimit.max.warning - screenLimit.step });
        await screen.Save();
        //TODO assert NO warning
    });
    it('can set above min ', async () => {
        await screen.Edit({ time: '12:00 AM', unitsPerHour: screenLimit.min.limit + screenLimit.step });
        await screen.Save();
        //TODO assert NO warning
    });
    it('can set at min', async () => {
        await screen.Edit({ time: '12:00 AM', unitsPerHour: screenLimit.min.limit });
        await screen.Save();
        //TODO assert on warning
    });
    it('cannot set below the min limit', async () => {
        try {
            await screen.Edit({ time: '12:00 AM', unitsPerHour: screenLimit.min.limit - screenLimit.step });
        } catch (error) {
            //TODO assert cannot be set
            await screen.Save();
        }
    });
};

module.exports = { basalRateScheduleTests };
