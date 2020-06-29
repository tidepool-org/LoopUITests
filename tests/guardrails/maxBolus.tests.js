var maxBolus = (test) => {
    var testDefaultMaxBasalRate = 1.0;
    var screen;
    var screenLimit;
    beforeAll(async () => {
        screen = await test.settingsScreen.OpenDeliveryLimitsScreen();
        screenLimit = test.limits.bolusDelivery;
    });
    afterAll(async () => {
        await screen.Close();
    });
    it('cannot set above the max limit', async () => {
        await screen.Apply({
            maxBolus: screenLimit.max.limit + screenLimit.step,
            maxBasalRate: testDefaultMaxBasalRate
        });
        //TODO assert on warning
    });
    it('can set at max limit', async () => {
        await screen.Apply({
            maxBolus: screenLimit.max.limit,
            maxBasalRate: testDefaultMaxBasalRate
        });
        //TODO assert on warning
    });
    it('can set at max warning', async () => {
        await screen.Apply({
            maxBolus: screenLimit.max.warning,
            maxBasalRate: testDefaultMaxBasalRate
        });
        //TODO assert on warning
    });
    it('can set below max warning', async () => {
        await screen.Apply({
            maxBolus: screenLimit.max.warning - screenLimit.step,
            maxBasalRate: testDefaultMaxBasalRate
        });
        //TODO assert NO warning
    });
    it('can above min limit', async () => {
        await screen.Apply({
            maxBolus: screenLimit.min.limit + screenLimit.step,
            maxBasalRate: testDefaultMaxBasalRate
        });
        //TODO assert NO warning
    });
    it('can set at min limit', async () => {
        await screen.Apply({
            maxBolus: screenLimit.min.limit,
            maxBasalRate: testDefaultMaxBasalRate
        });
        //TODO assert on warning
    });
    it('cannot set below the min limit', async () => {
        await screen.Apply({
            maxBolus: screenLimit.min.limit - screenLimit.step,
            maxBasalRate: testDefaultMaxBasalRate
        });
        //TODO assert on warning
    });
}

module.exports = { maxBolus };
