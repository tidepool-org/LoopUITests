const { limits } = require('../../src/index');

var maxBolusTests = (test) => {
    var screen;
    it('open', async () => {
        screen = await test.settingsScreen.OpenDeliveryLimitsScreen();
    });
    it('cannot set above the max limit', async () => {
        await screen.Apply({
            maxBolus: limits.bolusDelivery.max.limit + limits.bolusDelivery.step,
            maxBasalRate: '1.0'
        });
        //TODO assert on warning
    });
    it('can set at max limit', async () => {
        await screen.Apply({
            maxBolus: limits.bolusDelivery.max.limit,
            maxBasalRate: '1.0'
        });
        //TODO assert on warning
    });
    it('can set at max warning', async () => {
        await screen.Apply({
            maxBolus: limits.bolusDelivery.max.warning,
            maxBasalRate: '1.0'
        });
        //TODO assert on warning
    });
    it('can set below max warning', async () => {
        await screen.Apply({
            maxBolus: limits.bolusDelivery.max.warning - limits.bolusDelivery.step,
            maxBasalRate: '1.0'
        });
        //TODO assert NO warning
    });
    it('can above min limit', async () => {
        await screen.Apply({
            maxBolus: limits.bolusDelivery.min.limit + limits.bolusDelivery.step,
            maxBasalRate: '1.0'
        });
        //TODO assert NO warning
    });
    it('can set at min limit', async () => {
        await screen.Apply({
            maxBolus: limits.bolusDelivery.min.limit,
            maxBasalRate: '1.0'
        });
        //TODO assert on warning
    });
    it('cannot set below the min limit', async () => {
        await screen.Apply({
            maxBolus: limits.bolusDelivery.min.limit - limits.bolusDelivery.step,
            maxBasalRate: '1.0'
        });
        //TODO assert on warning
    });
    it('close', async () => {
        await screen.Close();
    });
}

module.exports = { maxBolusTests };
