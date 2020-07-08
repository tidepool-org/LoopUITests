var maxTempBasalRate = (test) => {
    var testDefaultBolus = 1.0;
    var screen;
    var screenLimit;
    beforeAll(async () => {
        screen = await test.settingsScreen.OpenDeliveryLimitsScreen();
        screenLimit = test.limits.basalDelivery;
    });
    it('set below max limit', async () => {
        await screen.Apply({
            maxBolus: testDefaultBolus,
            maxBasalRate: screenLimit.max.limit - screenLimit.step
        });
        //TODO assert NO warning
    });
    it('set at max limit', async () => {
        await screen.Apply({
            maxBolus: testDefaultBolus,
            maxBasalRate: screenLimit.max.limit
        });
        //TODO assert on warning
    });
    it('cannot above max limit', async () => {
        await screen.Apply({
            maxBolus: testDefaultBolus,
            maxBasalRate: screenLimit.max.limit + screenLimit.step
        });
        //TODO assert warning
    });
    it('can close screen', async () => {
        await screen.Close();
    });
};

module.exports = { maxTempBasalRate };
